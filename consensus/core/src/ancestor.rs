// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

use std::{collections::HashMap, sync::Arc};

use consensus_config::AuthorityIndex;
use parking_lot::Mutex;
use tokio::time::{Duration, Instant};
use tracing::info;

use crate::{context::Context, leader_scoring::ReputationScores, round_prober::QuorumRound};

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub(crate) enum AncestorState {
    Include,
    Exclude(u64),
}
struct AncestorInfo {
    state: AncestorState,
    lock_expiry_time: Option<Instant>,
}

impl AncestorInfo {
    fn new() -> Self {
        Self {
            state: AncestorState::Include,
            lock_expiry_time: None,
        }
    }
}

pub struct AncestorStateManager {
    context: Arc<Context>,
    state_map: Arc<Mutex<HashMap<AuthorityIndex, AncestorInfo>>>,
    pub(crate) quorum_round_per_authority: Vec<QuorumRound>,
    pub(crate) propagation_scores: ReputationScores,
}

impl AncestorStateManager {
    const STATE_LOCK_DURATION: Duration = Duration::from_secs(30);
    const NETWORK_QUORUM_ROUND_LAG_THRESHOLD: u32 = 1;
    pub(crate) const EXCLUSION_THRESHOLD_PERCENTAGE: u64 = 10;

    pub fn new(context: Arc<Context>, propagation_scores: ReputationScores) -> Self {
        let mut ancestors = HashMap::new();
        for (id, _) in context.committee.authorities() {
            ancestors.insert(id, AncestorInfo::new());
        }

        let quorum_round_per_authority = vec![(0, 0); context.committee.size()];
        Self {
            context,
            state_map: Arc::new(Mutex::new(ancestors)),
            propagation_scores,
            quorum_round_per_authority,
        }
    }

    pub(crate) fn set_quorum_round_per_authority(&mut self, quorum_rounds: Vec<QuorumRound>) {
        info!("Quorum round per authority set to: {quorum_rounds:?}");
        self.quorum_round_per_authority = quorum_rounds;
    }

    pub(crate) fn set_propagation_scores(&mut self, scores: ReputationScores) {
        self.propagation_scores = scores;
    }

    /// Updates the state of all ancestors based on the latest scores and quorum rounds
    pub(crate) fn update_all_ancestors_state(&self) {
        // If round prober has not run yet and we don't have network quorum round,
        // it is okay because network_low_quorum_round will be zero and we will
        // include all ancestors until we get more information.
        let network_low_quorum_round = self.calculate_network_low_quorum_round();
        let propagation_scores_by_authority = self
            .propagation_scores
            .scores_per_authority
            .iter()
            .enumerate()
            .map(|(idx, score)| {
                (
                    self.context
                        .committee
                        .to_authority_index(idx)
                        .expect("Index should be valid"),
                    score,
                )
            })
            .collect::<Vec<_>>();

        // If propagation scores are not ready because the first 300 commits have not
        // happened, this is okay as we will only start excluding ancestors after that
        // point in time.
        for (authority_id, score) in propagation_scores_by_authority {
            let (authority_low_quorum_round, _high) = self.quorum_round_per_authority[authority_id];

            self.update_state(
                authority_id,
                *score,
                authority_low_quorum_round,
                network_low_quorum_round,
            );
        }
    }

    /// Updates the state of the given authority based on current scores and quorum rounds.
    fn update_state(
        &self,
        authority_id: AuthorityIndex,
        propagation_score: u64,
        authority_low_quorum_round: u32,
        network_low_quorum_round: u32,
    ) {
        let mut state_map = self.state_map.lock();
        let ancestor_info = state_map.get_mut(&authority_id).expect(&format!(
            "Expected authority_id {authority_id} to be initialized in state_map",
        ));

        // Check if the lock period has expired
        if let Some(expiry) = ancestor_info.lock_expiry_time {
            if Instant::now() < expiry {
                // If still locked, return without making any changes
                return;
            } else {
                // Lock has expired so we should make sure to reset it.
                ancestor_info.lock_expiry_time = None;
            }
        }

        let low_score_threshold =
            (self.propagation_scores.high_score() * Self::EXCLUSION_THRESHOLD_PERCENTAGE) / 100;

        match ancestor_info.state {
            // Check conditions to switch to EXCLUDE state
            AncestorState::Include => {
                if propagation_score <= low_score_threshold {
                    ancestor_info.state = AncestorState::Exclude(propagation_score);
                    ancestor_info.lock_expiry_time =
                        Some(Instant::now() + Self::STATE_LOCK_DURATION);
                    info!(
                        "Authority {authority_id} moved to EXCLUDE state with score {propagation_score} and locked for {:?}",
                        Self::STATE_LOCK_DURATION
                    );
                }
            }
            // Check conditions to switch back to INCLUDE state
            AncestorState::Exclude(_) => {
                if propagation_score > low_score_threshold
                    || authority_low_quorum_round
                        >= (network_low_quorum_round - Self::NETWORK_QUORUM_ROUND_LAG_THRESHOLD)
                {
                    ancestor_info.state = AncestorState::Include;
                    ancestor_info.lock_expiry_time =
                        Some(Instant::now() + Self::STATE_LOCK_DURATION);
                    info!(
                        "Authority {authority_id} moved to INCLUDE state and locked for {:?}.",
                        Self::STATE_LOCK_DURATION
                    );
                }
            }
        }
    }

    /// Calculate the network's low quorum round from 2f+1 authorities by stake,
    /// where low quorum round is the highest round a block has been seen by 2f+1
    /// authorities.
    fn calculate_network_low_quorum_round(&self) -> u32 {
        let committee = &self.context.committee;
        let quorum_threshold = committee.quorum_threshold();
        let mut low_quorum_rounds_with_stake = self
            .quorum_round_per_authority
            .iter()
            .zip(committee.authorities())
            .map(|((low, _high), (_, authority))| (*low, authority.stake))
            .collect::<Vec<_>>();
        low_quorum_rounds_with_stake.sort();

        let mut total_stake = 0;
        let mut network_low_quorum_round = 0;

        for (round, stake) in low_quorum_rounds_with_stake.iter().rev() {
            let reached_quorum_before = total_stake >= quorum_threshold;
            total_stake += stake;
            if !reached_quorum_before && total_stake >= quorum_threshold {
                network_low_quorum_round = *round;
                break;
            }
        }

        network_low_quorum_round
    }

    /// Retrieve states for all authorities
    pub fn get_all_states(&self) -> HashMap<AuthorityIndex, AncestorState> {
        let state_map = self.state_map.lock();
        state_map
            .iter()
            .map(|(&id, info)| (id, info.state))
            .collect()
    }
}
