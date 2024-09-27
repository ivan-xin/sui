searchState.loadedDescShard("sui_core", 0, "Implements generic pre- and post-processing. Since this is …\nPrometheus metrics which can be displayed in Grafana, …\nALL_OBJ_VER determines whether we want to store all past …\nA wrapper to make Orphan Rule happy\na Trait object for <code>Signer</code> that is:\nbytecode verifier metrics for tracking timeouts\nChecks multiple object locks exist. Returns …\nConsensus handler metrics\nCreates and execute the advance epoch transaction to …\nReturns true if there are no objects in the database\nThe object ID for gas can be any object ID, even for an …\nReturns true if we have an effects structure for this …\nAdds certificates to transaction manager for ordered …\nExecutes a certificate for its effects.\nAttempts to acquire execution lock for an executable …\nAcquires the execution lock for the duration of a …\nReturn the object with version less then or eq to the …\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nExecutes a transaction that’s known to have correct …\nGet the set of system packages that are compiled in to …\nChain Identifier is the digest of the genesis checkpoint.\nReturns the latest object we have for this object_id in …\nReturns the latest object reference if and only if the …\nReturns the latest object reference we have for this …\nRead an object and return it, or Ok(None) if the object …\nGet many objects\nThis function aims to serve rpc reads on past objects and …\nGet the signed effects of the given transaction. If the …\nThis function reads the DB directly to get the system …\nGet the TransactionEnvelope that currently locks the given …\nMake a status response for a transaction\nInitiate a new transaction.\nNOTE: this function is only to be used for fuzzing and …\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nLoad the current epoch store. This can change during …\nThis is a temporary method to be used when we enable …\nGiven a list of transaction digests, returns a list of the …\nGiven a list of transaction digests, returns a list of the …\nCount of multisig signatures\nThe name of this authority.\nReturns future containing the state hash for the given …\nOpen an authority store by directory path. If the store is …\nOpen authority store without any operations that require …\nCurrent overload status in this authority. Updated …\nAdvance the epoch store to the next epoch for testing only.\nThis function is called at the end of epoch for each …\nThe signature key of the authority.\nOrdinarily, protocol upgrades occur when 2f + 1 + (f * …\nTest only wrapper for <code>try_execute_immediately()</code> above, …\nInternal logic to execute a certificate.\nUpdates the state resulting from the execution of a …\nCount of zklogin signatures\nAuthorityEpochTables contains tables that contain data …\nCreate config structs for configuring DBMap tables\nCreate an intermediate struct used to open the DBMap …\nA will-be-cancelled transaction. It’ll still go through …\nEverything else, e.g. AuthorityCapabilities, …\nConsensusStats is versioned because we may iterate on the …\nThe transaction should be re-processed at a future commit, …\nThe consensus message was ignored (e.g. because it has …\nA system message in consensus was ignored (e.g. because of …\nA message was processed which updates randomness state.\nAn executable transaction (can be a user tx or a system tx)\nLock a sequence number for the shared objects of the input …\nAcquire the lock for a tx without writing to the WAL.\n<code>pending_certificates</code> table related methods. Should only be …\nGiven list of certificates, assign versions for all shared …\nBuild a config\nCount the keys in this table Tables must be opened in read …\nReturns a list of the tables name and type pairs\nDump all key-value pairs in the page at the given table …\nReturns <code>&amp;Arc&lt;EpochStartConfiguration&gt;</code> User can treat this …\nNotify epoch is terminated, can only be called once on …\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nThis opens the DB in read only mode and returns a struct …\nCalled when transaction outputs are committed to disk\nInitialize to defaults\nWhen submitting a certificate caller <strong>must</strong> provide a …\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCheck whether any certificates were processed by consensus.\nCheck whether any certificates were processed by consensus.\nCheck whether certificate was processed by consensus. For …\nThe round number of the last committed leader.\nReturns future containing the state digest for the given …\nOpen in read only mode. No limitation on number of …\nOpens a set of tables in read-write mode Only one process …\nOpens a set of tables in transactional read-write mode …\nRegister genesis checkpoint in builder DB\nRecord most recently advertised capabilities of all …\nRecord most recently advertised capabilities of all …\nWARNING: This method is very subtle and can corrupt the …\nMaps checkpoint sequence number to the running …\nThe index of the last sub-DAG that was executed (either …\nGet key value sizes from the db Tables must be opened in …\nThe index of the last transaction was executed (used for …\nGet notified when transactions get executed as part of a …\nTry catch up with primary for all tables. This can be a …\nNote: caller usually need to call …\nWaits for the notification about epoch termination\nThis function executes given future until epoch_terminated …\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nPrunes old object versions based on effects from all …\nPrunes old data based on effects from all checkpoints from …\nAuthorityPerpetualTables contains data that must be …\nCreate config structs for configuring DBMap tables\nOptions to apply to every column family of the <code>perpetual</code> …\nCreate an intermediate struct used to open the DBMap …\nBuild a config\nCount the keys in this table Tables must be opened in read …\nReturns a list of the tables name and type pairs\nDump all key-value pairs in the page at the given table …\nWhether to enable write stalling on all column families.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nRead an object and return it, or Ok(None) if the object …\nThis opens the DB in read only mode and returns a struct …\nInitialize to defaults\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nOpen in read only mode. No limitation on number of …\nOpens a set of tables in read-write mode Only one process …\nOpens a set of tables in transactional read-write mode …\nGet key value sizes from the db Tables must be opened in …\nTry catch up with primary for all tables. This can be a …\nMetadata of stored moved object\nForked version of <code>sui_types::object::Data</code> Adds extra enum …\nSeparately stored move object\nEnum wrapper for versioning\nForked version of <code>sui_types::object::Object</code> Used for …\nEnum wrapper for versioning\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nReturns the new package’s ID and the upgrade cap object …\nParameters of the epoch fixed at epoch start.\nFor situations in which there is no config available (e.g. …\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\n<code>ToString::to_string</code>, but without panic on OOM.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nReturns the argument unchanged.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nWhen providing a network config, we will use the \\node_idx …\nReturns the argument unchanged.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nPrometheus metrics which can be displayed in Grafana, …\nHow to talk to this committee.\nOur Sui committee.\nStore here for clone during re-config.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nQuery the object with highest version number from the …\nGet the latest system state object from the authorities. …\nThis function tries to get SignedTransaction OR …\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nMetrics\nCreate a new network authority aggregator by reading the …\nSubmits the transaction to a quorum of validators to make …\nThis function recreates AuthorityAggregator with the given …\nCreate a new AuthorityAggregator using information from …\nMetric base for the purpose of creating new safe clients …\n<code>ToString::to_string</code>, but without panic on OOM.\n<code>ToString::to_string</code>, but without panic on OOM.\nFor more human readable metrics reporting. It’s OK for …\nWhether this certificate is newly created by aggregating …\nReturns the argument unchanged.\nExecute a certificate.\nExecute a certificate.\nExecute a certificate.\nHandle Object information requests for this account.\nHandle Object information requests for this account.\nHandle Object information requests for this account.\nExecute a Soft Bundle with multiple certificates.\nInitiate a new transaction to a Sui or Primary account.\nInitiate a new transfer to a Sui or Primary account.\nHandle Object information requests for this account.\nHandle Object information requests for this account.\nCalls <code>U::from(self)</code>.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nThis is a service used to communicate with other pieces of …\nCreate config structs for configuring DBMap tables\nCreate an intermediate struct used to open the DBMap …\nBuild a config\nCheckpointExecutor is a Node component that executes all …\nCount the keys in this table Tables must be opened in read …\nReturns a list of the tables name and type pairs\nDump all key-value pairs in the page at the given table …\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nGiven the epoch ID, and the last checkpoint of the epoch, …\nThis opens the DB in read only mode and returns a struct …\nInitialize to defaults\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nOpen in read only mode. No limitation on number of …\nOpens a set of tables in read-write mode Only one process …\nOpens a set of tables in transactional read-write mode …\nRe-executes all transactions from all local, uncertified …\nSets highest executed checkpoint to any value.\nGet key value sizes from the db Tables must be opened in …\nTry catch up with primary for all tables. This can be a …\nCheck whether <code>checkpoint</code> is the last checkpoint of the …\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nEnsure that all checkpoints in the current epoch will be …\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nSubmit Sui certificates to the consensus.\nA map from authority name to peer id\nPerforms weakly consistent checks on internal buffers to …\nValidate that all current expectations for all methods have\nCurrent connection statuses forwarded from the connection …\nCreate an <code>Expectation</code> for mocking the <code>submit_to_consensus</code> …\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nMake a new Consensus adapter instance.\nCreate a new mock object with no expectations.\nThis method blocks until transaction is persisted in local …\nExpectation type for methods that return a <code>&#39;static</code> type. …\nReturns the argument unchanged.\nAdd this expectation to a <code>Sequence</code>.\nCalls <code>U::from(self)</code>.\nForbid this expectation from ever being called.\nCreate a new, default, <code>Expectation</code>\nExpect this expectation to be called exactly once.  …\nReturn a constant value from the <code>Expectation</code>\nSingle-threaded version of <code>return_const</code>.  This is useful …\nSupply an <code>FnOnce</code> closure that will provide the return …\nSingle-threaded version of <code>return_once</code>.  This is useful for\nSupply a closure that will provide the return value for …\nSingle-threaded version of <code>returning</code>. Can be used when the …\nRestrict the number of times that that this method may be …\nSet matching crieteria for this Expectation.\nSet a matching function for this Expectation.\nSingle-threaded version of <code>withf</code>. Can be used when the …\nRepresents the information from the current consensus …\nConsensus handler used by Mysticeti. Since Mysticeti repo …\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nReturns the last subdag index processed by the handler.\nUsed by Sui validator to start consensus protocol for each …\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nNOTE: Mysticeti protocol key uses Ed25519 instead of BLS. …\nConsensusThroughputCalculator is calculating the …\nThe ConsensusThroughputProfiler is responsible for …\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nResolves the throughput profile that corresponds to the …\nThe lower range of the throughput that this profile is …\nAllows verifying the validity of transactions\nReturns the argument unchanged.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nReturns the argument unchanged.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCreate config structs for configuring DBMap tables\nCreate an intermediate struct used to open the DBMap …\nBuild a config\nCount the keys in this table Tables must be opened in read …\nReturns a list of the tables name and type pairs\nDump all key-value pairs in the page at the given table …\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturn the committee specified by <code>epoch</code>. If <code>epoch</code> is <code>None</code>, …\nThis opens the DB in read only mode and returns a struct …\nInitialize to defaults\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nOpen in read only mode. No limitation on number of …\nOpens a set of tables in read-write mode Only one process …\nOpens a set of tables in transactional read-write mode …\nGet key value sizes from the db Tables must be opened in …\nTry catch up with primary for all tables. This can be a …\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nThis method will remove all epoch data stores and …\nWhen building the last checkpoint of the epoch, we execute …\nThe current epoch ID. This is updated only when the …\nCurrent voting right of the validator in the protocol. …\nBuffer stake current in effect for this epoch\nNumber of checkpoints in the epoch.\nThe interval from when the epoch is closed to when we …\nThe interval from when the epoch begins (i.e. right after …\nThe interval from when the epoch is closed to when we …\nThe duration from when the epoch is closed (i.e. validator …\nThe amount of time taken to complete random beacon DKG …\nThe amount of time taken to complete first phase of the …\nThe amount of time taken from epoch start to completion of …\nSet to 1 if the random beacon DKG protocol failed for the …\nThe amount of time taken to start first phase of the …\nThe number of shares held by this node after the random …\nThe interval from when the epoch is closed to when we …\nTotal duration of the epoch. This is measured from when …\nTotal amount of gas rewards (i.e. computation gas cost) in …\nNumber of transactions in the epoch.\nThe total duration when this validator is halted, and …\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nWhether we are running in safe mode where reward …\nAdds a received VersionedDkgMessage to the randomness DKG …\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nStarts the process of generating the given RandomnessRound.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nNotifies the associated randomness manager that randomness …\nGenerates a new RandomnessReporter for reporting observed …\nSends the initial dkg::Message to begin the randomness DKG …\nReturns the argument unchanged.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nAttempt to acquire object locks for all of the owned input …\nShould only be used for sui-tool or tests. Nodes must use …\nDurably commit the outputs of the given transactions to …\nReturn the object with version less then or eq to the …\nReturns the argument unchanged.\nReturns the argument unchanged.\nIf the shared object was deleted, return deletion info for …\nReturn the watermark for the highest checkpoint for which …\nIf the shared object was deleted, return deletion info for …\nGet the latest marker for a given object.\nGet the marker at a specific version\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nThis is a temporary method to be used when we enable …\nLoad a list of objects from the store by object reference. …\nUsed by transaction manager to determine if input objects …\nDurably commit transactions (but not their outputs) to the …\nReconfigure the cache itself. TODO: this is only needed …\nWrite the output of a transaction.\nMemoryCache is a cache for the transaction execution which …\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nRateTracker tracks events in a rolling window, and …\nReturns the argument unchanged.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCreate a new RateTracker to track event rate …\nReturns the rate of events.\nRecords an event at current time.\nRecords an event at time <code>now</code>.\nReturns the argument unchanged.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nTrack the size of the module cache.\nGets a client to submit transactions to Mysticeti, or …\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nWhether the authority is overloaded.\nThe calculated percentage of transactions to drop.\nCreate a new <code>QuorumDriverHandler</code> based on the same …\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nUsed in tests when smaller number of retries is desired\nA dummy ReconfigObserver for testing.\nA ReconfigObserver that subscribes to a reconfig channel …\nReturns the argument unchanged.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCreate config structs for configuring DBMap tables\nCreate an intermediate struct used to open the DBMap …\nBuild a config\nCount the keys in this table Tables must be opened in read …\nDump all key-value pairs in the page at the given table …\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nInitialize to defaults\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nOpen in read only mode. No limitation on number of …\nGet key value sizes from the db Tables must be opened in …\nTry catch up with primary for all tables. This can be a …\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nSee <code>SafeClientMetrics::new</code> for description of each metrics.\nPrometheus metrics which can be displayed in Grafana, …\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nExecute a certificate.\nExecute a certificate.\nInitiate a new transfer to a Sui or Primary account.\nHandle Transaction information requests for a given digest.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nVerifies signatures in ways that faster than verifying …\nVerifies all certificates - if any fail return error.\nVerifies certificates in batch mode, but returns a …\nReturns the argument unchanged.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nVerifies one cert asynchronously, in a batch.\nexposed as a public method for the benchmarks\nVerifies all certs, returns Ok only if all are valid.\nSerializable representation of the ObjectRef of an object …\nAccumulates the effects of a single checkpoint and …\nAccumulates given effects and returns the accumulator …\nUnions all checkpoint accumulators at the end of the epoch …\nReturns the result of accumulating the live object set, …\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nThis function is only called in older protocol versions, …\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nReturns the argument unchanged.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nThe Streamer splits a mpsc channel into multiple mpsc …\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nSubscribe to the data stream filtered by the filter object.\nReturns the argument unchanged.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nExecute a certificate.\nHandle Object information requests for this account.\nInitiate a new transaction to a Sui or Primary account.\nHandle Object information requests for this account.\nHandle Object information requests for this account.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nMake a cert using an arbitrarily large committee.\nMake a dummy tx that uses random object refs.\nHandle check with dry-run mode considered\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nDirect access api for test verification\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nPrometheus metrics which can be displayed in Grafana, …\nReturns the argument unchanged.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nThe <code>ValidatorTxFinalizer</code> is responsible for finalizing …\nReturns the argument unchanged.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nIncremental delay for validators to wake up to finalize a …\nThis is a very expensive function that verifies some of …")