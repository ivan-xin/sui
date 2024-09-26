// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

use crate::checkpoint_fetcher::archival_fetcher::ArchivalFetcher;
use crate::checkpoint_fetcher::file_fetcher::FileFetcher;
use crate::checkpoint_fetcher::hybrid_fetcher::HybridFetcher;
use crate::checkpoint_fetcher::rest_fetcher::RestFetcher;
use backoff::backoff::Backoff;
use futures::StreamExt;
use mysten_metrics::spawn_monitored_task;
use std::path::PathBuf;
use std::sync::Arc;
use std::time::Duration;
use sui_types::full_checkpoint_content::CheckpointData;
use sui_types::messages_checkpoint::CheckpointSequenceNumber;
use tap::Pipe;
use tokio::sync::mpsc;

mod archival_fetcher;
mod file_fetcher;
mod hybrid_fetcher;
mod rest_fetcher;

#[async_trait::async_trait]
trait CheckpointFetcherTrait: Sync + Send {
    /// Given a sequence number, fetches the corresponding checkpoint data.
    /// Returns the checkpoint data and the size of the response in bytes.
    async fn fetch_checkpoint(
        &self,
        sequence_number: CheckpointSequenceNumber,
    ) -> anyhow::Result<(Arc<CheckpointData>, usize)>;
}

#[derive(Clone)]
pub struct CheckpointFetcher {
    file_fetcher: Arc<FileFetcher>,
    remote_fetcher: Option<Arc<dyn CheckpointFetcherTrait>>,
}

impl CheckpointFetcher {
    pub fn new(
        path: PathBuf,
        url: Option<String>,
        remote_store_options: Vec<(String, String)>,
        timeout_secs: u64,
    ) -> Self {
        let file_fetcher = Arc::new(FileFetcher::new(path));
        let remote_fetcher = if let Some(url) = url {
            let remote_fetcher: Arc<dyn CheckpointFetcherTrait> =
                if let Some((fn_url, remote_url)) = url.split_once('|') {
                    let archival_fetcher = ArchivalFetcher::new(
                        remote_url.to_string(),
                        remote_store_options,
                        timeout_secs,
                    )
                    .expect("failed to create remote store client");
                    let rest_fetcher = RestFetcher::new(fn_url.to_string());
                    Arc::new(HybridFetcher::new(archival_fetcher, rest_fetcher))
                } else if url.ends_with("/rest") {
                    Arc::new(RestFetcher::new(url))
                } else {
                    Arc::new(
                        ArchivalFetcher::new(url, remote_store_options, timeout_secs)
                            .expect("failed to create remote store client"),
                    )
                };
            Some(remote_fetcher)
        } else {
            None
        };
        Self {
            file_fetcher,
            remote_fetcher,
        }
    }

    pub async fn start_fetching_checkpoints(
        self,
        batch_size: usize,
        start_checkpoint: CheckpointSequenceNumber,
    ) -> mpsc::Receiver<anyhow::Result<(Arc<CheckpointData>, usize)>> {
        let (sender, receiver) = mpsc::channel(batch_size);
        spawn_monitored_task!(async move {
            let mut checkpoint_stream = (start_checkpoint..u64::MAX)
                .map(|checkpoint_number| self.clone().fetch_checkpoint(checkpoint_number))
                .pipe(futures::stream::iter)
                .buffered(batch_size);

            while let Some(checkpoint) = checkpoint_stream.next().await {
                if sender.send(checkpoint).await.is_err() {
                    tracing::error!("Remote reader dropped");
                    break;
                }
            }
        });
        receiver
    }

    async fn remote_fetch_checkpoint(
        remote_fetcher: &Arc<dyn CheckpointFetcherTrait>,
        sequence_number: CheckpointSequenceNumber,
    ) -> anyhow::Result<(Arc<CheckpointData>, usize)> {
        let mut backoff = backoff::ExponentialBackoff::default();
        backoff.max_elapsed_time = Some(Duration::from_secs(60));
        backoff.initial_interval = Duration::from_millis(100);
        backoff.current_interval = backoff.initial_interval;
        backoff.multiplier = 1.0;
        loop {
            match remote_fetcher.fetch_checkpoint(sequence_number).await {
                Ok(data) => return Ok(data),
                Err(err) => match backoff.next_backoff() {
                    Some(duration) => {
                        if !err.to_string().contains("404") {
                            tracing::debug!(
                                "CheckpointFetcher retry in {} ms. Error is {:?}",
                                duration.as_millis(),
                                err
                            );
                        }
                        tokio::time::sleep(duration).await
                    }
                    None => return Err(err),
                },
            }
        }
    }

    async fn fetch_checkpoint(
        self,
        sequence_number: CheckpointSequenceNumber,
    ) -> anyhow::Result<(Arc<CheckpointData>, usize)> {
        match self.file_fetcher.fetch_checkpoint(sequence_number).await {
            Ok(data) => Ok(data),
            Err(err) => {
                if let Some(remote_fetcher) = &self.remote_fetcher {
                    Self::remote_fetch_checkpoint(remote_fetcher, sequence_number).await
                } else {
                    Err(err)
                }
            }
        }
    }
}
