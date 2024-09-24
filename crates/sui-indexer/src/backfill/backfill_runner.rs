// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

use crate::backfill::backfill_task::{BackfillTask, ProcessedResult};
use crate::config::BackFillConfig;
use crate::database::ConnectionPool;
use futures::StreamExt;
use std::collections::BTreeSet;
use std::ops::RangeInclusive;
use std::sync::Arc;
use std::time::Instant;
use tokio::sync::{mpsc, Mutex};
use tokio_stream::wrappers::ReceiverStream;

pub struct BackfillRunner {}

impl BackfillRunner {
    /// Main function to run the parallel queries and batch processing.
    pub async fn run<T: BackfillTask<O>, O: Send + 'static>(
        pool: ConnectionPool,
        config: BackFillConfig,
        total_range: RangeInclusive<usize>,
    ) {
        let cur_time = Instant::now();
        // Keeps track of the checkpoint ranges (using starting checkpoint number)
        // that are in progress.
        let in_progress = Arc::new(Mutex::new(BTreeSet::new()));

        // Create a channel to send processed results
        let (tx, rx) = mpsc::channel::<ProcessedResult<O>>(10000);

        // Spawn tasks to batch commit the processed results
        let pool_clone = pool.clone();

        // Convert the receiver into a stream
        let result_stream = ReceiverStream::new(rx);

        let in_progress_clone = in_progress.clone();
        let concurrency = config.max_concurrency;
        // Use for_each_concurrent to process batches with limited concurrency
        let commit_handle = tokio::spawn(async move {
            result_stream
                .for_each_concurrent(concurrency, |result| {
                    let pool_clone = pool_clone.clone();
                    let in_progress_clone = in_progress_clone.clone();
                    async move {
                        let range = result.range.clone();
                        // Commit the results to the database
                        T::commit_db(pool_clone, result).await;

                        println!("Finished range: {:?}.", range);
                        in_progress_clone.lock().await.remove(range.start());
                        let cur_min_in_progress =
                            in_progress_clone.lock().await.iter().next().cloned();
                        println!(
                            "Minimum checkpoint number still in progress: {:?}.",
                            cur_min_in_progress
                        );
                    }
                })
                .await;
        });

        // Generate chunks from the total range
        let chunks = create_chunks(total_range.clone(), config.chunk_size);

        // Create a stream from the ranges
        let stream = tokio_stream::iter(chunks);

        let pool_clone = pool.clone();

        // Process chunks in parallel, limiting the number of concurrent query tasks
        stream
            .for_each_concurrent(concurrency, move |range| {
                let pool_clone = pool_clone.clone();
                let tx_clone = tx.clone();
                let in_progress_clone = in_progress.clone();

                async move {
                    in_progress_clone.lock().await.insert(*range.start());
                    // Query the database for the given range
                    let output = T::query_db(pool_clone, &range).await;
                    // Send the processed results to the channel
                    tx_clone
                        .send(ProcessedResult { output, range })
                        .await
                        .unwrap();
                }
            })
            .await;

        // Wait for commit tasks to finish
        commit_handle.await.unwrap();

        println!("Finished backfilling in {:?}", cur_time.elapsed());
    }
}

/// Creates chunks based on the total range and chunk size.
fn create_chunks(
    total_range: RangeInclusive<usize>,
    chunk_size: usize,
) -> Vec<RangeInclusive<usize>> {
    let end = *total_range.end();
    total_range
        .step_by(chunk_size)
        .map(|chunk_start| {
            let chunk_end = std::cmp::min(chunk_start + chunk_size - 1, end);
            chunk_start..=chunk_end
        })
        .collect()
}
