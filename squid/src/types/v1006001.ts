import {sts, Result, Option, Bytes, BitSequence} from './support'

export const Weight: sts.Type<Weight> = sts.struct(() => {
    return  {
        refTime: sts.bigint(),
        proofSize: sts.bigint(),
    }
})

export interface Weight {
    refTime: bigint
    proofSize: bigint
}

export const Timepoint: sts.Type<Timepoint> = sts.struct(() => {
    return  {
        height: sts.number(),
        index: sts.number(),
    }
})

export interface Timepoint {
    height: number
    index: number
}

export const AccountId32 = sts.bytes()

export const Call: sts.Type<Call> = sts.closedEnum(() => {
    return  {
        AssetRate: AssetRateCall,
        Auctions: AuctionsCall,
        Babe: BabeCall,
        Balances: BalancesCall,
        Beefy: BeefyCall,
        Bounties: BountiesCall,
        ChildBounties: ChildBountiesCall,
        Claims: ClaimsCall,
        Configuration: ConfigurationCall,
        ConvictionVoting: ConvictionVotingCall,
        Coretime: CoretimeCall,
        Crowdloan: CrowdloanCall,
        ElectionProviderMultiPhase: ElectionProviderMultiPhaseCall,
        FastUnstake: FastUnstakeCall,
        FellowshipCollective: FellowshipCollectiveCall,
        FellowshipReferenda: FellowshipReferendaCall,
        Grandpa: GrandpaCall,
        Hrmp: HrmpCall,
        Indices: IndicesCall,
        Initializer: InitializerCall,
        MessageQueue: MessageQueueCall,
        Multisig: MultisigCall,
        Nis: NisCall,
        NisCounterpartBalances: NisCounterpartBalancesCall,
        NominationPools: NominationPoolsCall,
        OnDemandAssignmentProvider: OnDemandAssignmentProviderCall,
        ParaInclusion: ParaInclusionCall,
        ParaInherent: ParaInherentCall,
        Parameters: ParametersCall,
        Paras: ParasCall,
        ParasDisputes: ParasDisputesCall,
        ParasShared: ParasSharedCall,
        ParasSlashing: ParasSlashingCall,
        Preimage: PreimageCall,
        Proxy: ProxyCall,
        Recovery: RecoveryCall,
        Referenda: ReferendaCall,
        Registrar: RegistrarCall,
        Scheduler: SchedulerCall,
        Session: SessionCall,
        Slots: SlotsCall,
        Society: SocietyCall,
        Staking: StakingCall,
        System: SystemCall,
        Timestamp: TimestampCall,
        Treasury: TreasuryCall,
        Utility: UtilityCall,
        Vesting: VestingCall,
        VoterList: VoterListCall,
        Whitelist: WhitelistCall,
        XcmPallet: XcmPalletCall,
    }
})

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export const XcmPalletCall: sts.Type<XcmPalletCall> = sts.closedEnum(() => {
    return  {
        add_authorized_alias: sts.enumStruct({
            aliaser: VersionedLocation,
            expires: sts.option(() => sts.bigint()),
        }),
        claim_assets: sts.enumStruct({
            assets: VersionedAssets,
            beneficiary: VersionedLocation,
        }),
        execute: sts.enumStruct({
            message: Type_465,
            maxWeight: Weight,
        }),
        force_default_xcm_version: sts.enumStruct({
            maybeXcmVersion: sts.option(() => sts.number()),
        }),
        force_subscribe_version_notify: sts.enumStruct({
            location: VersionedLocation,
        }),
        force_suspension: sts.enumStruct({
            suspended: sts.boolean(),
        }),
        force_unsubscribe_version_notify: sts.enumStruct({
            location: VersionedLocation,
        }),
        force_xcm_version: sts.enumStruct({
            location: V5Location,
            version: sts.number(),
        }),
        limited_reserve_transfer_assets: sts.enumStruct({
            dest: VersionedLocation,
            beneficiary: VersionedLocation,
            assets: VersionedAssets,
            feeAssetItem: sts.number(),
            weightLimit: V3WeightLimit,
        }),
        limited_teleport_assets: sts.enumStruct({
            dest: VersionedLocation,
            beneficiary: VersionedLocation,
            assets: VersionedAssets,
            feeAssetItem: sts.number(),
            weightLimit: V3WeightLimit,
        }),
        remove_all_authorized_aliases: sts.unit(),
        remove_authorized_alias: sts.enumStruct({
            aliaser: VersionedLocation,
        }),
        reserve_transfer_assets: sts.enumStruct({
            dest: VersionedLocation,
            beneficiary: VersionedLocation,
            assets: VersionedAssets,
            feeAssetItem: sts.number(),
        }),
        send: sts.enumStruct({
            dest: VersionedLocation,
            message: VersionedXcm,
        }),
        teleport_assets: sts.enumStruct({
            dest: VersionedLocation,
            beneficiary: VersionedLocation,
            assets: VersionedAssets,
            feeAssetItem: sts.number(),
        }),
        transfer_assets: sts.enumStruct({
            dest: VersionedLocation,
            beneficiary: VersionedLocation,
            assets: VersionedAssets,
            feeAssetItem: sts.number(),
            weightLimit: V3WeightLimit,
        }),
        transfer_assets_using_type_and_then: sts.enumStruct({
            dest: VersionedLocation,
            assets: VersionedAssets,
            assetsTransferType: TransferType,
            remoteFeesId: VersionedAssetId,
            feesTransferType: TransferType,
            customXcmOnDest: VersionedXcm,
            weightLimit: V3WeightLimit,
        }),
    }
})

export const VersionedAssetId: sts.Type<VersionedAssetId> = sts.closedEnum(() => {
    return  {
        V3: V3AssetId,
        V4: V4AssetId,
        V5: V5AssetId,
    }
})

export const V5AssetId: sts.Type<V5AssetId> = sts.struct(() => {
    return  {
        parents: sts.number(),
        interior: V5Junctions,
    }
})

export const V5Junctions: sts.Type<V5Junctions> = sts.closedEnum(() => {
    return  {
        Here: sts.unit(),
        X1: sts.array(() => V5Junction),
        X2: sts.array(() => V5Junction),
        X3: sts.array(() => V5Junction),
        X4: sts.array(() => V5Junction),
        X5: sts.array(() => V5Junction),
        X6: sts.array(() => V5Junction),
        X7: sts.array(() => V5Junction),
        X8: sts.array(() => V5Junction),
    }
})

export const V5Junction: sts.Type<V5Junction> = sts.closedEnum(() => {
    return  {
        AccountId32: sts.enumStruct({
            network: sts.option(() => V5NetworkId),
            id: sts.bytes(),
        }),
        AccountIndex64: sts.enumStruct({
            network: sts.option(() => V5NetworkId),
            index: sts.bigint(),
        }),
        AccountKey20: sts.enumStruct({
            network: sts.option(() => V5NetworkId),
            key: sts.bytes(),
        }),
        GeneralIndex: sts.bigint(),
        GeneralKey: sts.enumStruct({
            length: sts.number(),
            data: sts.bytes(),
        }),
        GlobalConsensus: V5NetworkId,
        OnlyChild: sts.unit(),
        PalletInstance: sts.number(),
        Parachain: sts.number(),
        Plurality: sts.enumStruct({
            id: V3BodyId,
            part: V3BodyPart,
        }),
    }
})

export const V3BodyPart: sts.Type<V3BodyPart> = sts.closedEnum(() => {
    return  {
        AtLeastProportion: sts.enumStruct({
            nom: sts.number(),
            denom: sts.number(),
        }),
        Fraction: sts.enumStruct({
            nom: sts.number(),
            denom: sts.number(),
        }),
        Members: sts.enumStruct({
            count: sts.number(),
        }),
        MoreThanProportion: sts.enumStruct({
            nom: sts.number(),
            denom: sts.number(),
        }),
        Voice: sts.unit(),
    }
})

export type V3BodyPart = V3BodyPart_AtLeastProportion | V3BodyPart_Fraction | V3BodyPart_Members | V3BodyPart_MoreThanProportion | V3BodyPart_Voice

export interface V3BodyPart_AtLeastProportion {
    __kind: 'AtLeastProportion'
    nom: number
    denom: number
}

export interface V3BodyPart_Fraction {
    __kind: 'Fraction'
    nom: number
    denom: number
}

export interface V3BodyPart_Members {
    __kind: 'Members'
    count: number
}

export interface V3BodyPart_MoreThanProportion {
    __kind: 'MoreThanProportion'
    nom: number
    denom: number
}

export interface V3BodyPart_Voice {
    __kind: 'Voice'
}

export const V3BodyId: sts.Type<V3BodyId> = sts.closedEnum(() => {
    return  {
        Administration: sts.unit(),
        Defense: sts.unit(),
        Executive: sts.unit(),
        Index: sts.number(),
        Judicial: sts.unit(),
        Legislative: sts.unit(),
        Moniker: sts.bytes(),
        Technical: sts.unit(),
        Treasury: sts.unit(),
        Unit: sts.unit(),
    }
})

export type V3BodyId = V3BodyId_Administration | V3BodyId_Defense | V3BodyId_Executive | V3BodyId_Index | V3BodyId_Judicial | V3BodyId_Legislative | V3BodyId_Moniker | V3BodyId_Technical | V3BodyId_Treasury | V3BodyId_Unit

export interface V3BodyId_Administration {
    __kind: 'Administration'
}

export interface V3BodyId_Defense {
    __kind: 'Defense'
}

export interface V3BodyId_Executive {
    __kind: 'Executive'
}

export interface V3BodyId_Index {
    __kind: 'Index'
    value: number
}

export interface V3BodyId_Judicial {
    __kind: 'Judicial'
}

export interface V3BodyId_Legislative {
    __kind: 'Legislative'
}

export interface V3BodyId_Moniker {
    __kind: 'Moniker'
    value: Bytes
}

export interface V3BodyId_Technical {
    __kind: 'Technical'
}

export interface V3BodyId_Treasury {
    __kind: 'Treasury'
}

export interface V3BodyId_Unit {
    __kind: 'Unit'
}

export const V5NetworkId: sts.Type<V5NetworkId> = sts.closedEnum(() => {
    return  {
        BitcoinCash: sts.unit(),
        BitcoinCore: sts.unit(),
        ByFork: sts.enumStruct({
            blockNumber: sts.bigint(),
            blockHash: sts.bytes(),
        }),
        ByGenesis: sts.bytes(),
        Ethereum: sts.enumStruct({
            chainId: sts.bigint(),
        }),
        Kusama: sts.unit(),
        Polkadot: sts.unit(),
        PolkadotBulletin: sts.unit(),
    }
})

export type V5NetworkId = V5NetworkId_BitcoinCash | V5NetworkId_BitcoinCore | V5NetworkId_ByFork | V5NetworkId_ByGenesis | V5NetworkId_Ethereum | V5NetworkId_Kusama | V5NetworkId_Polkadot | V5NetworkId_PolkadotBulletin

export interface V5NetworkId_BitcoinCash {
    __kind: 'BitcoinCash'
}

export interface V5NetworkId_BitcoinCore {
    __kind: 'BitcoinCore'
}

export interface V5NetworkId_ByFork {
    __kind: 'ByFork'
    blockNumber: bigint
    blockHash: Bytes
}

export interface V5NetworkId_ByGenesis {
    __kind: 'ByGenesis'
    value: Bytes
}

export interface V5NetworkId_Ethereum {
    __kind: 'Ethereum'
    chainId: bigint
}

export interface V5NetworkId_Kusama {
    __kind: 'Kusama'
}

export interface V5NetworkId_Polkadot {
    __kind: 'Polkadot'
}

export interface V5NetworkId_PolkadotBulletin {
    __kind: 'PolkadotBulletin'
}

export type V5Junction = V5Junction_AccountId32 | V5Junction_AccountIndex64 | V5Junction_AccountKey20 | V5Junction_GeneralIndex | V5Junction_GeneralKey | V5Junction_GlobalConsensus | V5Junction_OnlyChild | V5Junction_PalletInstance | V5Junction_Parachain | V5Junction_Plurality

export interface V5Junction_AccountId32 {
    __kind: 'AccountId32'
    network?: (V5NetworkId | undefined)
    id: Bytes
}

export interface V5Junction_AccountIndex64 {
    __kind: 'AccountIndex64'
    network?: (V5NetworkId | undefined)
    index: bigint
}

export interface V5Junction_AccountKey20 {
    __kind: 'AccountKey20'
    network?: (V5NetworkId | undefined)
    key: Bytes
}

export interface V5Junction_GeneralIndex {
    __kind: 'GeneralIndex'
    value: bigint
}

export interface V5Junction_GeneralKey {
    __kind: 'GeneralKey'
    length: number
    data: Bytes
}

export interface V5Junction_GlobalConsensus {
    __kind: 'GlobalConsensus'
    value: V5NetworkId
}

export interface V5Junction_OnlyChild {
    __kind: 'OnlyChild'
}

export interface V5Junction_PalletInstance {
    __kind: 'PalletInstance'
    value: number
}

export interface V5Junction_Parachain {
    __kind: 'Parachain'
    value: number
}

export interface V5Junction_Plurality {
    __kind: 'Plurality'
    id: V3BodyId
    part: V3BodyPart
}

export type V5Junctions = V5Junctions_Here | V5Junctions_X1 | V5Junctions_X2 | V5Junctions_X3 | V5Junctions_X4 | V5Junctions_X5 | V5Junctions_X6 | V5Junctions_X7 | V5Junctions_X8

export interface V5Junctions_Here {
    __kind: 'Here'
}

export interface V5Junctions_X1 {
    __kind: 'X1'
    value: V5Junction[]
}

export interface V5Junctions_X2 {
    __kind: 'X2'
    value: V5Junction[]
}

export interface V5Junctions_X3 {
    __kind: 'X3'
    value: V5Junction[]
}

export interface V5Junctions_X4 {
    __kind: 'X4'
    value: V5Junction[]
}

export interface V5Junctions_X5 {
    __kind: 'X5'
    value: V5Junction[]
}

export interface V5Junctions_X6 {
    __kind: 'X6'
    value: V5Junction[]
}

export interface V5Junctions_X7 {
    __kind: 'X7'
    value: V5Junction[]
}

export interface V5Junctions_X8 {
    __kind: 'X8'
    value: V5Junction[]
}

export interface V5AssetId {
    parents: number
    interior: V5Junctions
}

export const V4AssetId: sts.Type<V4AssetId> = sts.struct(() => {
    return  {
        parents: sts.number(),
        interior: V4Junctions,
    }
})

export const V4Junctions: sts.Type<V4Junctions> = sts.closedEnum(() => {
    return  {
        Here: sts.unit(),
        X1: sts.array(() => V4Junction),
        X2: sts.array(() => V4Junction),
        X3: sts.array(() => V4Junction),
        X4: sts.array(() => V4Junction),
        X5: sts.array(() => V4Junction),
        X6: sts.array(() => V4Junction),
        X7: sts.array(() => V4Junction),
        X8: sts.array(() => V4Junction),
    }
})

export const V4Junction: sts.Type<V4Junction> = sts.closedEnum(() => {
    return  {
        AccountId32: sts.enumStruct({
            network: sts.option(() => V4NetworkId),
            id: sts.bytes(),
        }),
        AccountIndex64: sts.enumStruct({
            network: sts.option(() => V4NetworkId),
            index: sts.bigint(),
        }),
        AccountKey20: sts.enumStruct({
            network: sts.option(() => V4NetworkId),
            key: sts.bytes(),
        }),
        GeneralIndex: sts.bigint(),
        GeneralKey: sts.enumStruct({
            length: sts.number(),
            data: sts.bytes(),
        }),
        GlobalConsensus: V4NetworkId,
        OnlyChild: sts.unit(),
        PalletInstance: sts.number(),
        Parachain: sts.number(),
        Plurality: sts.enumStruct({
            id: V3BodyId,
            part: V3BodyPart,
        }),
    }
})

export const V4NetworkId: sts.Type<V4NetworkId> = sts.closedEnum(() => {
    return  {
        BitcoinCash: sts.unit(),
        BitcoinCore: sts.unit(),
        ByFork: sts.enumStruct({
            blockNumber: sts.bigint(),
            blockHash: sts.bytes(),
        }),
        ByGenesis: sts.bytes(),
        Ethereum: sts.enumStruct({
            chainId: sts.bigint(),
        }),
        Kusama: sts.unit(),
        Polkadot: sts.unit(),
        PolkadotBulletin: sts.unit(),
        Rococo: sts.unit(),
        Westend: sts.unit(),
        Wococo: sts.unit(),
    }
})

export type V4NetworkId = V4NetworkId_BitcoinCash | V4NetworkId_BitcoinCore | V4NetworkId_ByFork | V4NetworkId_ByGenesis | V4NetworkId_Ethereum | V4NetworkId_Kusama | V4NetworkId_Polkadot | V4NetworkId_PolkadotBulletin | V4NetworkId_Rococo | V4NetworkId_Westend | V4NetworkId_Wococo

export interface V4NetworkId_BitcoinCash {
    __kind: 'BitcoinCash'
}

export interface V4NetworkId_BitcoinCore {
    __kind: 'BitcoinCore'
}

export interface V4NetworkId_ByFork {
    __kind: 'ByFork'
    blockNumber: bigint
    blockHash: Bytes
}

export interface V4NetworkId_ByGenesis {
    __kind: 'ByGenesis'
    value: Bytes
}

export interface V4NetworkId_Ethereum {
    __kind: 'Ethereum'
    chainId: bigint
}

export interface V4NetworkId_Kusama {
    __kind: 'Kusama'
}

export interface V4NetworkId_Polkadot {
    __kind: 'Polkadot'
}

export interface V4NetworkId_PolkadotBulletin {
    __kind: 'PolkadotBulletin'
}

export interface V4NetworkId_Rococo {
    __kind: 'Rococo'
}

export interface V4NetworkId_Westend {
    __kind: 'Westend'
}

export interface V4NetworkId_Wococo {
    __kind: 'Wococo'
}

export type V4Junction = V4Junction_AccountId32 | V4Junction_AccountIndex64 | V4Junction_AccountKey20 | V4Junction_GeneralIndex | V4Junction_GeneralKey | V4Junction_GlobalConsensus | V4Junction_OnlyChild | V4Junction_PalletInstance | V4Junction_Parachain | V4Junction_Plurality

export interface V4Junction_AccountId32 {
    __kind: 'AccountId32'
    network?: (V4NetworkId | undefined)
    id: Bytes
}

export interface V4Junction_AccountIndex64 {
    __kind: 'AccountIndex64'
    network?: (V4NetworkId | undefined)
    index: bigint
}

export interface V4Junction_AccountKey20 {
    __kind: 'AccountKey20'
    network?: (V4NetworkId | undefined)
    key: Bytes
}

export interface V4Junction_GeneralIndex {
    __kind: 'GeneralIndex'
    value: bigint
}

export interface V4Junction_GeneralKey {
    __kind: 'GeneralKey'
    length: number
    data: Bytes
}

export interface V4Junction_GlobalConsensus {
    __kind: 'GlobalConsensus'
    value: V4NetworkId
}

export interface V4Junction_OnlyChild {
    __kind: 'OnlyChild'
}

export interface V4Junction_PalletInstance {
    __kind: 'PalletInstance'
    value: number
}

export interface V4Junction_Parachain {
    __kind: 'Parachain'
    value: number
}

export interface V4Junction_Plurality {
    __kind: 'Plurality'
    id: V3BodyId
    part: V3BodyPart
}

export type V4Junctions = V4Junctions_Here | V4Junctions_X1 | V4Junctions_X2 | V4Junctions_X3 | V4Junctions_X4 | V4Junctions_X5 | V4Junctions_X6 | V4Junctions_X7 | V4Junctions_X8

export interface V4Junctions_Here {
    __kind: 'Here'
}

export interface V4Junctions_X1 {
    __kind: 'X1'
    value: V4Junction[]
}

export interface V4Junctions_X2 {
    __kind: 'X2'
    value: V4Junction[]
}

export interface V4Junctions_X3 {
    __kind: 'X3'
    value: V4Junction[]
}

export interface V4Junctions_X4 {
    __kind: 'X4'
    value: V4Junction[]
}

export interface V4Junctions_X5 {
    __kind: 'X5'
    value: V4Junction[]
}

export interface V4Junctions_X6 {
    __kind: 'X6'
    value: V4Junction[]
}

export interface V4Junctions_X7 {
    __kind: 'X7'
    value: V4Junction[]
}

export interface V4Junctions_X8 {
    __kind: 'X8'
    value: V4Junction[]
}

export interface V4AssetId {
    parents: number
    interior: V4Junctions
}

export const V3AssetId: sts.Type<V3AssetId> = sts.closedEnum(() => {
    return  {
        Abstract: sts.bytes(),
        Concrete: V3MultiLocation,
    }
})

export const V3MultiLocation: sts.Type<V3MultiLocation> = sts.struct(() => {
    return  {
        parents: sts.number(),
        interior: V3Junctions,
    }
})

export const V3Junctions: sts.Type<V3Junctions> = sts.closedEnum(() => {
    return  {
        Here: sts.unit(),
        X1: V3Junction,
        X2: sts.tuple(() => [V3Junction, V3Junction]),
        X3: sts.tuple(() => [V3Junction, V3Junction, V3Junction]),
        X4: sts.tuple(() => [V3Junction, V3Junction, V3Junction, V3Junction]),
        X5: sts.tuple(() => [V3Junction, V3Junction, V3Junction, V3Junction, V3Junction]),
        X6: sts.tuple(() => [V3Junction, V3Junction, V3Junction, V3Junction, V3Junction, V3Junction]),
        X7: sts.tuple(() => [V3Junction, V3Junction, V3Junction, V3Junction, V3Junction, V3Junction, V3Junction]),
        X8: sts.tuple(() => [V3Junction, V3Junction, V3Junction, V3Junction, V3Junction, V3Junction, V3Junction, V3Junction]),
    }
})

export const V3Junction: sts.Type<V3Junction> = sts.closedEnum(() => {
    return  {
        AccountId32: sts.enumStruct({
            network: sts.option(() => V3NetworkId),
            id: sts.bytes(),
        }),
        AccountIndex64: sts.enumStruct({
            network: sts.option(() => V3NetworkId),
            index: sts.bigint(),
        }),
        AccountKey20: sts.enumStruct({
            network: sts.option(() => V3NetworkId),
            key: sts.bytes(),
        }),
        GeneralIndex: sts.bigint(),
        GeneralKey: sts.enumStruct({
            length: sts.number(),
            data: sts.bytes(),
        }),
        GlobalConsensus: V3NetworkId,
        OnlyChild: sts.unit(),
        PalletInstance: sts.number(),
        Parachain: sts.number(),
        Plurality: sts.enumStruct({
            id: V3BodyId,
            part: V3BodyPart,
        }),
    }
})

export const V3NetworkId: sts.Type<V3NetworkId> = sts.closedEnum(() => {
    return  {
        BitcoinCash: sts.unit(),
        BitcoinCore: sts.unit(),
        ByFork: sts.enumStruct({
            blockNumber: sts.bigint(),
            blockHash: sts.bytes(),
        }),
        ByGenesis: sts.bytes(),
        Ethereum: sts.enumStruct({
            chainId: sts.bigint(),
        }),
        Kusama: sts.unit(),
        Polkadot: sts.unit(),
        PolkadotBulletin: sts.unit(),
        Rococo: sts.unit(),
        Westend: sts.unit(),
        Wococo: sts.unit(),
    }
})

export type V3NetworkId = V3NetworkId_BitcoinCash | V3NetworkId_BitcoinCore | V3NetworkId_ByFork | V3NetworkId_ByGenesis | V3NetworkId_Ethereum | V3NetworkId_Kusama | V3NetworkId_Polkadot | V3NetworkId_PolkadotBulletin | V3NetworkId_Rococo | V3NetworkId_Westend | V3NetworkId_Wococo

export interface V3NetworkId_BitcoinCash {
    __kind: 'BitcoinCash'
}

export interface V3NetworkId_BitcoinCore {
    __kind: 'BitcoinCore'
}

export interface V3NetworkId_ByFork {
    __kind: 'ByFork'
    blockNumber: bigint
    blockHash: Bytes
}

export interface V3NetworkId_ByGenesis {
    __kind: 'ByGenesis'
    value: Bytes
}

export interface V3NetworkId_Ethereum {
    __kind: 'Ethereum'
    chainId: bigint
}

export interface V3NetworkId_Kusama {
    __kind: 'Kusama'
}

export interface V3NetworkId_Polkadot {
    __kind: 'Polkadot'
}

export interface V3NetworkId_PolkadotBulletin {
    __kind: 'PolkadotBulletin'
}

export interface V3NetworkId_Rococo {
    __kind: 'Rococo'
}

export interface V3NetworkId_Westend {
    __kind: 'Westend'
}

export interface V3NetworkId_Wococo {
    __kind: 'Wococo'
}

export type V3Junction = V3Junction_AccountId32 | V3Junction_AccountIndex64 | V3Junction_AccountKey20 | V3Junction_GeneralIndex | V3Junction_GeneralKey | V3Junction_GlobalConsensus | V3Junction_OnlyChild | V3Junction_PalletInstance | V3Junction_Parachain | V3Junction_Plurality

export interface V3Junction_AccountId32 {
    __kind: 'AccountId32'
    network?: (V3NetworkId | undefined)
    id: Bytes
}

export interface V3Junction_AccountIndex64 {
    __kind: 'AccountIndex64'
    network?: (V3NetworkId | undefined)
    index: bigint
}

export interface V3Junction_AccountKey20 {
    __kind: 'AccountKey20'
    network?: (V3NetworkId | undefined)
    key: Bytes
}

export interface V3Junction_GeneralIndex {
    __kind: 'GeneralIndex'
    value: bigint
}

export interface V3Junction_GeneralKey {
    __kind: 'GeneralKey'
    length: number
    data: Bytes
}

export interface V3Junction_GlobalConsensus {
    __kind: 'GlobalConsensus'
    value: V3NetworkId
}

export interface V3Junction_OnlyChild {
    __kind: 'OnlyChild'
}

export interface V3Junction_PalletInstance {
    __kind: 'PalletInstance'
    value: number
}

export interface V3Junction_Parachain {
    __kind: 'Parachain'
    value: number
}

export interface V3Junction_Plurality {
    __kind: 'Plurality'
    id: V3BodyId
    part: V3BodyPart
}

export type V3Junctions = V3Junctions_Here | V3Junctions_X1 | V3Junctions_X2 | V3Junctions_X3 | V3Junctions_X4 | V3Junctions_X5 | V3Junctions_X6 | V3Junctions_X7 | V3Junctions_X8

export interface V3Junctions_Here {
    __kind: 'Here'
}

export interface V3Junctions_X1 {
    __kind: 'X1'
    value: V3Junction
}

export interface V3Junctions_X2 {
    __kind: 'X2'
    value: [V3Junction, V3Junction]
}

export interface V3Junctions_X3 {
    __kind: 'X3'
    value: [V3Junction, V3Junction, V3Junction]
}

export interface V3Junctions_X4 {
    __kind: 'X4'
    value: [V3Junction, V3Junction, V3Junction, V3Junction]
}

export interface V3Junctions_X5 {
    __kind: 'X5'
    value: [V3Junction, V3Junction, V3Junction, V3Junction, V3Junction]
}

export interface V3Junctions_X6 {
    __kind: 'X6'
    value: [V3Junction, V3Junction, V3Junction, V3Junction, V3Junction, V3Junction]
}

export interface V3Junctions_X7 {
    __kind: 'X7'
    value: [V3Junction, V3Junction, V3Junction, V3Junction, V3Junction, V3Junction, V3Junction]
}

export interface V3Junctions_X8 {
    __kind: 'X8'
    value: [V3Junction, V3Junction, V3Junction, V3Junction, V3Junction, V3Junction, V3Junction, V3Junction]
}

export interface V3MultiLocation {
    parents: number
    interior: V3Junctions
}

export type V3AssetId = V3AssetId_Abstract | V3AssetId_Concrete

export interface V3AssetId_Abstract {
    __kind: 'Abstract'
    value: Bytes
}

export interface V3AssetId_Concrete {
    __kind: 'Concrete'
    value: V3MultiLocation
}

export type VersionedAssetId = VersionedAssetId_V3 | VersionedAssetId_V4 | VersionedAssetId_V5

export interface VersionedAssetId_V3 {
    __kind: 'V3'
    value: V3AssetId
}

export interface VersionedAssetId_V4 {
    __kind: 'V4'
    value: V4AssetId
}

export interface VersionedAssetId_V5 {
    __kind: 'V5'
    value: V5AssetId
}

export const TransferType: sts.Type<TransferType> = sts.closedEnum(() => {
    return  {
        DestinationReserve: sts.unit(),
        LocalReserve: sts.unit(),
        RemoteReserve: VersionedLocation,
        Teleport: sts.unit(),
    }
})

export type TransferType = TransferType_DestinationReserve | TransferType_LocalReserve | TransferType_RemoteReserve | TransferType_Teleport

export interface TransferType_DestinationReserve {
    __kind: 'DestinationReserve'
}

export interface TransferType_LocalReserve {
    __kind: 'LocalReserve'
}

export interface TransferType_RemoteReserve {
    __kind: 'RemoteReserve'
    value: VersionedLocation
}

export interface TransferType_Teleport {
    __kind: 'Teleport'
}

export type VersionedLocation = VersionedLocation_V3 | VersionedLocation_V4 | VersionedLocation_V5

export interface VersionedLocation_V3 {
    __kind: 'V3'
    value: V3MultiLocation
}

export interface VersionedLocation_V4 {
    __kind: 'V4'
    value: V4Location
}

export interface VersionedLocation_V5 {
    __kind: 'V5'
    value: V5Location
}

export interface V5Location {
    parents: number
    interior: V5Junctions
}

export interface V4Location {
    parents: number
    interior: V4Junctions
}

export const VersionedXcm: sts.Type<VersionedXcm> = sts.closedEnum(() => {
    return  {
        V3: sts.array(() => V3Instruction),
        V4: sts.array(() => V4Instruction),
        V5: sts.array(() => V5Instruction),
    }
})

export const V5Instruction: sts.Type<V5Instruction> = sts.closedEnum(() => {
    return  {
        AliasOrigin: V5Location,
        BurnAsset: sts.array(() => V5Asset),
        BuyExecution: sts.enumStruct({
            fees: V5Asset,
            weightLimit: V3WeightLimit,
        }),
        ClaimAsset: sts.enumStruct({
            assets: sts.array(() => V5Asset),
            ticket: V5Location,
        }),
        ClearError: sts.unit(),
        ClearOrigin: sts.unit(),
        ClearTopic: sts.unit(),
        ClearTransactStatus: sts.unit(),
        DepositAsset: sts.enumStruct({
            assets: V5AssetFilter,
            beneficiary: V5Location,
        }),
        DepositReserveAsset: sts.enumStruct({
            assets: V5AssetFilter,
            dest: V5Location,
            xcm: sts.array(() => V5Instruction),
        }),
        DescendOrigin: V5Junctions,
        ExchangeAsset: sts.enumStruct({
            give: V5AssetFilter,
            want: sts.array(() => V5Asset),
            maximal: sts.boolean(),
        }),
        ExecuteWithOrigin: sts.enumStruct({
            descendantOrigin: sts.option(() => V5Junctions),
            xcm: sts.array(() => V5Instruction),
        }),
        ExpectAsset: sts.array(() => V5Asset),
        ExpectError: sts.option(() => sts.tuple(() => [sts.number(), V5Error])),
        ExpectOrigin: sts.option(() => V5Location),
        ExpectPallet: sts.enumStruct({
            index: sts.number(),
            name: sts.bytes(),
            moduleName: sts.bytes(),
            crateMajor: sts.number(),
            minCrateMinor: sts.number(),
        }),
        ExpectTransactStatus: V3MaybeErrorCode,
        ExportMessage: sts.enumStruct({
            network: V5NetworkId,
            destination: V5Junctions,
            xcm: sts.array(() => V5Instruction),
        }),
        HrmpChannelAccepted: sts.enumStruct({
            recipient: sts.number(),
        }),
        HrmpChannelClosing: sts.enumStruct({
            initiator: sts.number(),
            sender: sts.number(),
            recipient: sts.number(),
        }),
        HrmpNewChannelOpenRequest: sts.enumStruct({
            sender: sts.number(),
            maxMessageSize: sts.number(),
            maxCapacity: sts.number(),
        }),
        InitiateReserveWithdraw: sts.enumStruct({
            assets: V5AssetFilter,
            reserve: V5Location,
            xcm: sts.array(() => V5Instruction),
        }),
        InitiateTeleport: sts.enumStruct({
            assets: V5AssetFilter,
            dest: V5Location,
            xcm: sts.array(() => V5Instruction),
        }),
        InitiateTransfer: sts.enumStruct({
            destination: V5Location,
            remoteFees: sts.option(() => V5AssetTransferFilter),
            preserveOrigin: sts.boolean(),
            assets: sts.array(() => V5AssetTransferFilter),
            remoteXcm: sts.array(() => V5Instruction),
        }),
        LockAsset: sts.enumStruct({
            asset: V5Asset,
            unlocker: V5Location,
        }),
        NoteUnlockable: sts.enumStruct({
            asset: V5Asset,
            owner: V5Location,
        }),
        PayFees: sts.enumStruct({
            asset: V5Asset,
        }),
        QueryPallet: sts.enumStruct({
            moduleName: sts.bytes(),
            responseInfo: V5QueryResponseInfo,
        }),
        QueryResponse: sts.enumStruct({
            queryId: sts.bigint(),
            response: V5Response,
            maxWeight: Weight,
            querier: sts.option(() => V5Location),
        }),
        ReceiveTeleportedAsset: sts.array(() => V5Asset),
        RefundSurplus: sts.unit(),
        ReportError: V5QueryResponseInfo,
        ReportHolding: sts.enumStruct({
            responseInfo: V5QueryResponseInfo,
            assets: V5AssetFilter,
        }),
        ReportTransactStatus: V5QueryResponseInfo,
        RequestUnlock: sts.enumStruct({
            asset: V5Asset,
            locker: V5Location,
        }),
        ReserveAssetDeposited: sts.array(() => V5Asset),
        SetAppendix: sts.array(() => V5Instruction),
        SetErrorHandler: sts.array(() => V5Instruction),
        SetFeesMode: sts.enumStruct({
            jitWithdraw: sts.boolean(),
        }),
        SetHints: sts.enumStruct({
            hints: sts.array(() => V5Hint),
        }),
        SetTopic: sts.bytes(),
        SubscribeVersion: sts.enumStruct({
            queryId: sts.bigint(),
            maxResponseWeight: Weight,
        }),
        Transact: sts.enumStruct({
            originKind: V3OriginKind,
            fallbackMaxWeight: sts.option(() => Weight),
            call: DoubleEncoded,
        }),
        TransferAsset: sts.enumStruct({
            assets: sts.array(() => V5Asset),
            beneficiary: V5Location,
        }),
        TransferReserveAsset: sts.enumStruct({
            assets: sts.array(() => V5Asset),
            dest: V5Location,
            xcm: sts.array(() => V5Instruction),
        }),
        Trap: sts.bigint(),
        UniversalOrigin: V5Junction,
        UnlockAsset: sts.enumStruct({
            asset: V5Asset,
            target: V5Location,
        }),
        UnpaidExecution: sts.enumStruct({
            weightLimit: V3WeightLimit,
            checkOrigin: sts.option(() => V5Location),
        }),
        UnsubscribeVersion: sts.unit(),
        WithdrawAsset: sts.array(() => V5Asset),
    }
})

export const DoubleEncoded: sts.Type<DoubleEncoded> = sts.struct(() => {
    return  {
        encoded: sts.bytes(),
    }
})

export interface DoubleEncoded {
    encoded: Bytes
}

export const V3OriginKind: sts.Type<V3OriginKind> = sts.closedEnum(() => {
    return  {
        Native: sts.unit(),
        SovereignAccount: sts.unit(),
        Superuser: sts.unit(),
        Xcm: sts.unit(),
    }
})

export type V3OriginKind = V3OriginKind_Native | V3OriginKind_SovereignAccount | V3OriginKind_Superuser | V3OriginKind_Xcm

export interface V3OriginKind_Native {
    __kind: 'Native'
}

export interface V3OriginKind_SovereignAccount {
    __kind: 'SovereignAccount'
}

export interface V3OriginKind_Superuser {
    __kind: 'Superuser'
}

export interface V3OriginKind_Xcm {
    __kind: 'Xcm'
}

export const V5Hint: sts.Type<V5Hint> = sts.closedEnum(() => {
    return  {
        AssetClaimer: sts.enumStruct({
            location: V5Location,
        }),
    }
})

export type V5Hint = V5Hint_AssetClaimer

export interface V5Hint_AssetClaimer {
    __kind: 'AssetClaimer'
    location: V5Location
}

export const V5Response: sts.Type<V5Response> = sts.closedEnum(() => {
    return  {
        Assets: sts.array(() => V5Asset),
        DispatchResult: V3MaybeErrorCode,
        ExecutionResult: sts.option(() => sts.tuple(() => [sts.number(), V5Error])),
        Null: sts.unit(),
        PalletsInfo: sts.array(() => V5PalletInfo),
        Version: sts.number(),
    }
})

export const V5PalletInfo: sts.Type<V5PalletInfo> = sts.struct(() => {
    return  {
        index: sts.number(),
        name: sts.bytes(),
        moduleName: sts.bytes(),
        major: sts.number(),
        minor: sts.number(),
        patch: sts.number(),
    }
})

export interface V5PalletInfo {
    index: number
    name: Bytes
    moduleName: Bytes
    major: number
    minor: number
    patch: number
}

export type V5Response = V5Response_Assets | V5Response_DispatchResult | V5Response_ExecutionResult | V5Response_Null | V5Response_PalletsInfo | V5Response_Version

export interface V5Response_Assets {
    __kind: 'Assets'
    value: V5Asset[]
}

export interface V5Response_DispatchResult {
    __kind: 'DispatchResult'
    value: V3MaybeErrorCode
}

export interface V5Response_ExecutionResult {
    __kind: 'ExecutionResult'
    value?: ([number, V5Error] | undefined)
}

export interface V5Response_Null {
    __kind: 'Null'
}

export interface V5Response_PalletsInfo {
    __kind: 'PalletsInfo'
    value: V5PalletInfo[]
}

export interface V5Response_Version {
    __kind: 'Version'
    value: number
}

export type V5Error = V5Error_AssetNotFound | V5Error_BadOrigin | V5Error_Barrier | V5Error_DestinationUnsupported | V5Error_ExceedsMaxMessageSize | V5Error_ExceedsStackLimit | V5Error_ExpectationFalse | V5Error_ExportError | V5Error_FailedToDecode | V5Error_FailedToTransactAsset | V5Error_FeesNotMet | V5Error_HoldingWouldOverflow | V5Error_InvalidLocation | V5Error_LocationCannotHold | V5Error_LocationFull | V5Error_LocationNotInvertible | V5Error_LockError | V5Error_MaxWeightInvalid | V5Error_NameMismatch | V5Error_NoDeal | V5Error_NoPermission | V5Error_NotDepositable | V5Error_NotHoldingFees | V5Error_NotWithdrawable | V5Error_Overflow | V5Error_PalletNotFound | V5Error_ReanchorFailed | V5Error_TooExpensive | V5Error_TooManyAssets | V5Error_Transport | V5Error_Trap | V5Error_Unanchored | V5Error_UnhandledXcmVersion | V5Error_Unimplemented | V5Error_UnknownClaim | V5Error_Unroutable | V5Error_UntrustedReserveLocation | V5Error_UntrustedTeleportLocation | V5Error_VersionIncompatible | V5Error_WeightLimitReached | V5Error_WeightNotComputable

export interface V5Error_AssetNotFound {
    __kind: 'AssetNotFound'
}

export interface V5Error_BadOrigin {
    __kind: 'BadOrigin'
}

export interface V5Error_Barrier {
    __kind: 'Barrier'
}

export interface V5Error_DestinationUnsupported {
    __kind: 'DestinationUnsupported'
}

export interface V5Error_ExceedsMaxMessageSize {
    __kind: 'ExceedsMaxMessageSize'
}

export interface V5Error_ExceedsStackLimit {
    __kind: 'ExceedsStackLimit'
}

export interface V5Error_ExpectationFalse {
    __kind: 'ExpectationFalse'
}

export interface V5Error_ExportError {
    __kind: 'ExportError'
}

export interface V5Error_FailedToDecode {
    __kind: 'FailedToDecode'
}

export interface V5Error_FailedToTransactAsset {
    __kind: 'FailedToTransactAsset'
}

export interface V5Error_FeesNotMet {
    __kind: 'FeesNotMet'
}

export interface V5Error_HoldingWouldOverflow {
    __kind: 'HoldingWouldOverflow'
}

export interface V5Error_InvalidLocation {
    __kind: 'InvalidLocation'
}

export interface V5Error_LocationCannotHold {
    __kind: 'LocationCannotHold'
}

export interface V5Error_LocationFull {
    __kind: 'LocationFull'
}

export interface V5Error_LocationNotInvertible {
    __kind: 'LocationNotInvertible'
}

export interface V5Error_LockError {
    __kind: 'LockError'
}

export interface V5Error_MaxWeightInvalid {
    __kind: 'MaxWeightInvalid'
}

export interface V5Error_NameMismatch {
    __kind: 'NameMismatch'
}

export interface V5Error_NoDeal {
    __kind: 'NoDeal'
}

export interface V5Error_NoPermission {
    __kind: 'NoPermission'
}

export interface V5Error_NotDepositable {
    __kind: 'NotDepositable'
}

export interface V5Error_NotHoldingFees {
    __kind: 'NotHoldingFees'
}

export interface V5Error_NotWithdrawable {
    __kind: 'NotWithdrawable'
}

export interface V5Error_Overflow {
    __kind: 'Overflow'
}

export interface V5Error_PalletNotFound {
    __kind: 'PalletNotFound'
}

export interface V5Error_ReanchorFailed {
    __kind: 'ReanchorFailed'
}

export interface V5Error_TooExpensive {
    __kind: 'TooExpensive'
}

export interface V5Error_TooManyAssets {
    __kind: 'TooManyAssets'
}

export interface V5Error_Transport {
    __kind: 'Transport'
}

export interface V5Error_Trap {
    __kind: 'Trap'
    value: bigint
}

export interface V5Error_Unanchored {
    __kind: 'Unanchored'
}

export interface V5Error_UnhandledXcmVersion {
    __kind: 'UnhandledXcmVersion'
}

export interface V5Error_Unimplemented {
    __kind: 'Unimplemented'
}

export interface V5Error_UnknownClaim {
    __kind: 'UnknownClaim'
}

export interface V5Error_Unroutable {
    __kind: 'Unroutable'
}

export interface V5Error_UntrustedReserveLocation {
    __kind: 'UntrustedReserveLocation'
}

export interface V5Error_UntrustedTeleportLocation {
    __kind: 'UntrustedTeleportLocation'
}

export interface V5Error_VersionIncompatible {
    __kind: 'VersionIncompatible'
}

export interface V5Error_WeightLimitReached {
    __kind: 'WeightLimitReached'
    value: Weight
}

export interface V5Error_WeightNotComputable {
    __kind: 'WeightNotComputable'
}

export type V3MaybeErrorCode = V3MaybeErrorCode_Error | V3MaybeErrorCode_Success | V3MaybeErrorCode_TruncatedError

export interface V3MaybeErrorCode_Error {
    __kind: 'Error'
    value: Bytes
}

export interface V3MaybeErrorCode_Success {
    __kind: 'Success'
}

export interface V3MaybeErrorCode_TruncatedError {
    __kind: 'TruncatedError'
    value: Bytes
}

export interface V5Asset {
    id: V5AssetId
    fun: V5Fungibility
}

export type V5Fungibility = V5Fungibility_Fungible | V5Fungibility_NonFungible

export interface V5Fungibility_Fungible {
    __kind: 'Fungible'
    value: bigint
}

export interface V5Fungibility_NonFungible {
    __kind: 'NonFungible'
    value: V5AssetInstance
}

export type V5AssetInstance = V5AssetInstance_Array16 | V5AssetInstance_Array32 | V5AssetInstance_Array4 | V5AssetInstance_Array8 | V5AssetInstance_Index | V5AssetInstance_Undefined

export interface V5AssetInstance_Array16 {
    __kind: 'Array16'
    value: Bytes
}

export interface V5AssetInstance_Array32 {
    __kind: 'Array32'
    value: Bytes
}

export interface V5AssetInstance_Array4 {
    __kind: 'Array4'
    value: Bytes
}

export interface V5AssetInstance_Array8 {
    __kind: 'Array8'
    value: Bytes
}

export interface V5AssetInstance_Index {
    __kind: 'Index'
    value: bigint
}

export interface V5AssetInstance_Undefined {
    __kind: 'Undefined'
}

export const V5QueryResponseInfo: sts.Type<V5QueryResponseInfo> = sts.struct(() => {
    return  {
        destination: V5Location,
        queryId: sts.bigint(),
        maxWeight: Weight,
    }
})

export interface V5QueryResponseInfo {
    destination: V5Location
    queryId: bigint
    maxWeight: Weight
}

export const V5AssetTransferFilter: sts.Type<V5AssetTransferFilter> = sts.closedEnum(() => {
    return  {
        ReserveDeposit: V5AssetFilter,
        ReserveWithdraw: V5AssetFilter,
        Teleport: V5AssetFilter,
    }
})

export type V5AssetTransferFilter = V5AssetTransferFilter_ReserveDeposit | V5AssetTransferFilter_ReserveWithdraw | V5AssetTransferFilter_Teleport

export interface V5AssetTransferFilter_ReserveDeposit {
    __kind: 'ReserveDeposit'
    value: V5AssetFilter
}

export interface V5AssetTransferFilter_ReserveWithdraw {
    __kind: 'ReserveWithdraw'
    value: V5AssetFilter
}

export interface V5AssetTransferFilter_Teleport {
    __kind: 'Teleport'
    value: V5AssetFilter
}

export type V5AssetFilter = V5AssetFilter_Definite | V5AssetFilter_Wild

export interface V5AssetFilter_Definite {
    __kind: 'Definite'
    value: V5Asset[]
}

export interface V5AssetFilter_Wild {
    __kind: 'Wild'
    value: V5WildAsset
}

export type V5WildAsset = V5WildAsset_All | V5WildAsset_AllCounted | V5WildAsset_AllOf | V5WildAsset_AllOfCounted

export interface V5WildAsset_All {
    __kind: 'All'
}

export interface V5WildAsset_AllCounted {
    __kind: 'AllCounted'
    value: number
}

export interface V5WildAsset_AllOf {
    __kind: 'AllOf'
    id: V5AssetId
    fun: V5WildFungibility
}

export interface V5WildAsset_AllOfCounted {
    __kind: 'AllOfCounted'
    id: V5AssetId
    fun: V5WildFungibility
    count: number
}

export type V5WildFungibility = V5WildFungibility_Fungible | V5WildFungibility_NonFungible

export interface V5WildFungibility_Fungible {
    __kind: 'Fungible'
}

export interface V5WildFungibility_NonFungible {
    __kind: 'NonFungible'
}

export const V3MaybeErrorCode: sts.Type<V3MaybeErrorCode> = sts.closedEnum(() => {
    return  {
        Error: sts.bytes(),
        Success: sts.unit(),
        TruncatedError: sts.bytes(),
    }
})

export const V5Error: sts.Type<V5Error> = sts.closedEnum(() => {
    return  {
        AssetNotFound: sts.unit(),
        BadOrigin: sts.unit(),
        Barrier: sts.unit(),
        DestinationUnsupported: sts.unit(),
        ExceedsMaxMessageSize: sts.unit(),
        ExceedsStackLimit: sts.unit(),
        ExpectationFalse: sts.unit(),
        ExportError: sts.unit(),
        FailedToDecode: sts.unit(),
        FailedToTransactAsset: sts.unit(),
        FeesNotMet: sts.unit(),
        HoldingWouldOverflow: sts.unit(),
        InvalidLocation: sts.unit(),
        LocationCannotHold: sts.unit(),
        LocationFull: sts.unit(),
        LocationNotInvertible: sts.unit(),
        LockError: sts.unit(),
        MaxWeightInvalid: sts.unit(),
        NameMismatch: sts.unit(),
        NoDeal: sts.unit(),
        NoPermission: sts.unit(),
        NotDepositable: sts.unit(),
        NotHoldingFees: sts.unit(),
        NotWithdrawable: sts.unit(),
        Overflow: sts.unit(),
        PalletNotFound: sts.unit(),
        ReanchorFailed: sts.unit(),
        TooExpensive: sts.unit(),
        TooManyAssets: sts.unit(),
        Transport: sts.unit(),
        Trap: sts.bigint(),
        Unanchored: sts.unit(),
        UnhandledXcmVersion: sts.unit(),
        Unimplemented: sts.unit(),
        UnknownClaim: sts.unit(),
        Unroutable: sts.unit(),
        UntrustedReserveLocation: sts.unit(),
        UntrustedTeleportLocation: sts.unit(),
        VersionIncompatible: sts.unit(),
        WeightLimitReached: Weight,
        WeightNotComputable: sts.unit(),
    }
})

export const V5AssetFilter: sts.Type<V5AssetFilter> = sts.closedEnum(() => {
    return  {
        Definite: sts.array(() => V5Asset),
        Wild: V5WildAsset,
    }
})

export const V5WildAsset: sts.Type<V5WildAsset> = sts.closedEnum(() => {
    return  {
        All: sts.unit(),
        AllCounted: sts.number(),
        AllOf: sts.enumStruct({
            id: V5AssetId,
            fun: V5WildFungibility,
        }),
        AllOfCounted: sts.enumStruct({
            id: V5AssetId,
            fun: V5WildFungibility,
            count: sts.number(),
        }),
    }
})

export const V5WildFungibility: sts.Type<V5WildFungibility> = sts.closedEnum(() => {
    return  {
        Fungible: sts.unit(),
        NonFungible: sts.unit(),
    }
})

export const V5Asset: sts.Type<V5Asset> = sts.struct(() => {
    return  {
        id: V5AssetId,
        fun: V5Fungibility,
    }
})

export const V5Fungibility: sts.Type<V5Fungibility> = sts.closedEnum(() => {
    return  {
        Fungible: sts.bigint(),
        NonFungible: V5AssetInstance,
    }
})

export const V5AssetInstance: sts.Type<V5AssetInstance> = sts.closedEnum(() => {
    return  {
        Array16: sts.bytes(),
        Array32: sts.bytes(),
        Array4: sts.bytes(),
        Array8: sts.bytes(),
        Index: sts.bigint(),
        Undefined: sts.unit(),
    }
})

export type V5Instruction = V5Instruction_AliasOrigin | V5Instruction_BurnAsset | V5Instruction_BuyExecution | V5Instruction_ClaimAsset | V5Instruction_ClearError | V5Instruction_ClearOrigin | V5Instruction_ClearTopic | V5Instruction_ClearTransactStatus | V5Instruction_DepositAsset | V5Instruction_DepositReserveAsset | V5Instruction_DescendOrigin | V5Instruction_ExchangeAsset | V5Instruction_ExecuteWithOrigin | V5Instruction_ExpectAsset | V5Instruction_ExpectError | V5Instruction_ExpectOrigin | V5Instruction_ExpectPallet | V5Instruction_ExpectTransactStatus | V5Instruction_ExportMessage | V5Instruction_HrmpChannelAccepted | V5Instruction_HrmpChannelClosing | V5Instruction_HrmpNewChannelOpenRequest | V5Instruction_InitiateReserveWithdraw | V5Instruction_InitiateTeleport | V5Instruction_InitiateTransfer | V5Instruction_LockAsset | V5Instruction_NoteUnlockable | V5Instruction_PayFees | V5Instruction_QueryPallet | V5Instruction_QueryResponse | V5Instruction_ReceiveTeleportedAsset | V5Instruction_RefundSurplus | V5Instruction_ReportError | V5Instruction_ReportHolding | V5Instruction_ReportTransactStatus | V5Instruction_RequestUnlock | V5Instruction_ReserveAssetDeposited | V5Instruction_SetAppendix | V5Instruction_SetErrorHandler | V5Instruction_SetFeesMode | V5Instruction_SetHints | V5Instruction_SetTopic | V5Instruction_SubscribeVersion | V5Instruction_Transact | V5Instruction_TransferAsset | V5Instruction_TransferReserveAsset | V5Instruction_Trap | V5Instruction_UniversalOrigin | V5Instruction_UnlockAsset | V5Instruction_UnpaidExecution | V5Instruction_UnsubscribeVersion | V5Instruction_WithdrawAsset

export interface V5Instruction_AliasOrigin {
    __kind: 'AliasOrigin'
    value: V5Location
}

export interface V5Instruction_BurnAsset {
    __kind: 'BurnAsset'
    value: V5Asset[]
}

export interface V5Instruction_BuyExecution {
    __kind: 'BuyExecution'
    fees: V5Asset
    weightLimit: V3WeightLimit
}

export interface V5Instruction_ClaimAsset {
    __kind: 'ClaimAsset'
    assets: V5Asset[]
    ticket: V5Location
}

export interface V5Instruction_ClearError {
    __kind: 'ClearError'
}

export interface V5Instruction_ClearOrigin {
    __kind: 'ClearOrigin'
}

export interface V5Instruction_ClearTopic {
    __kind: 'ClearTopic'
}

export interface V5Instruction_ClearTransactStatus {
    __kind: 'ClearTransactStatus'
}

export interface V5Instruction_DepositAsset {
    __kind: 'DepositAsset'
    assets: V5AssetFilter
    beneficiary: V5Location
}

export interface V5Instruction_DepositReserveAsset {
    __kind: 'DepositReserveAsset'
    assets: V5AssetFilter
    dest: V5Location
    xcm: V5Instruction[]
}

export interface V5Instruction_DescendOrigin {
    __kind: 'DescendOrigin'
    value: V5Junctions
}

export interface V5Instruction_ExchangeAsset {
    __kind: 'ExchangeAsset'
    give: V5AssetFilter
    want: V5Asset[]
    maximal: boolean
}

export interface V5Instruction_ExecuteWithOrigin {
    __kind: 'ExecuteWithOrigin'
    descendantOrigin?: (V5Junctions | undefined)
    xcm: V5Instruction[]
}

export interface V5Instruction_ExpectAsset {
    __kind: 'ExpectAsset'
    value: V5Asset[]
}

export interface V5Instruction_ExpectError {
    __kind: 'ExpectError'
    value?: ([number, V5Error] | undefined)
}

export interface V5Instruction_ExpectOrigin {
    __kind: 'ExpectOrigin'
    value?: (V5Location | undefined)
}

export interface V5Instruction_ExpectPallet {
    __kind: 'ExpectPallet'
    index: number
    name: Bytes
    moduleName: Bytes
    crateMajor: number
    minCrateMinor: number
}

export interface V5Instruction_ExpectTransactStatus {
    __kind: 'ExpectTransactStatus'
    value: V3MaybeErrorCode
}

export interface V5Instruction_ExportMessage {
    __kind: 'ExportMessage'
    network: V5NetworkId
    destination: V5Junctions
    xcm: V5Instruction[]
}

export interface V5Instruction_HrmpChannelAccepted {
    __kind: 'HrmpChannelAccepted'
    recipient: number
}

export interface V5Instruction_HrmpChannelClosing {
    __kind: 'HrmpChannelClosing'
    initiator: number
    sender: number
    recipient: number
}

export interface V5Instruction_HrmpNewChannelOpenRequest {
    __kind: 'HrmpNewChannelOpenRequest'
    sender: number
    maxMessageSize: number
    maxCapacity: number
}

export interface V5Instruction_InitiateReserveWithdraw {
    __kind: 'InitiateReserveWithdraw'
    assets: V5AssetFilter
    reserve: V5Location
    xcm: V5Instruction[]
}

export interface V5Instruction_InitiateTeleport {
    __kind: 'InitiateTeleport'
    assets: V5AssetFilter
    dest: V5Location
    xcm: V5Instruction[]
}

export interface V5Instruction_InitiateTransfer {
    __kind: 'InitiateTransfer'
    destination: V5Location
    remoteFees?: (V5AssetTransferFilter | undefined)
    preserveOrigin: boolean
    assets: V5AssetTransferFilter[]
    remoteXcm: V5Instruction[]
}

export interface V5Instruction_LockAsset {
    __kind: 'LockAsset'
    asset: V5Asset
    unlocker: V5Location
}

export interface V5Instruction_NoteUnlockable {
    __kind: 'NoteUnlockable'
    asset: V5Asset
    owner: V5Location
}

export interface V5Instruction_PayFees {
    __kind: 'PayFees'
    asset: V5Asset
}

export interface V5Instruction_QueryPallet {
    __kind: 'QueryPallet'
    moduleName: Bytes
    responseInfo: V5QueryResponseInfo
}

export interface V5Instruction_QueryResponse {
    __kind: 'QueryResponse'
    queryId: bigint
    response: V5Response
    maxWeight: Weight
    querier?: (V5Location | undefined)
}

export interface V5Instruction_ReceiveTeleportedAsset {
    __kind: 'ReceiveTeleportedAsset'
    value: V5Asset[]
}

export interface V5Instruction_RefundSurplus {
    __kind: 'RefundSurplus'
}

export interface V5Instruction_ReportError {
    __kind: 'ReportError'
    value: V5QueryResponseInfo
}

export interface V5Instruction_ReportHolding {
    __kind: 'ReportHolding'
    responseInfo: V5QueryResponseInfo
    assets: V5AssetFilter
}

export interface V5Instruction_ReportTransactStatus {
    __kind: 'ReportTransactStatus'
    value: V5QueryResponseInfo
}

export interface V5Instruction_RequestUnlock {
    __kind: 'RequestUnlock'
    asset: V5Asset
    locker: V5Location
}

export interface V5Instruction_ReserveAssetDeposited {
    __kind: 'ReserveAssetDeposited'
    value: V5Asset[]
}

export interface V5Instruction_SetAppendix {
    __kind: 'SetAppendix'
    value: V5Instruction[]
}

export interface V5Instruction_SetErrorHandler {
    __kind: 'SetErrorHandler'
    value: V5Instruction[]
}

export interface V5Instruction_SetFeesMode {
    __kind: 'SetFeesMode'
    jitWithdraw: boolean
}

export interface V5Instruction_SetHints {
    __kind: 'SetHints'
    hints: V5Hint[]
}

export interface V5Instruction_SetTopic {
    __kind: 'SetTopic'
    value: Bytes
}

export interface V5Instruction_SubscribeVersion {
    __kind: 'SubscribeVersion'
    queryId: bigint
    maxResponseWeight: Weight
}

export interface V5Instruction_Transact {
    __kind: 'Transact'
    originKind: V3OriginKind
    fallbackMaxWeight?: (Weight | undefined)
    call: DoubleEncoded
}

export interface V5Instruction_TransferAsset {
    __kind: 'TransferAsset'
    assets: V5Asset[]
    beneficiary: V5Location
}

export interface V5Instruction_TransferReserveAsset {
    __kind: 'TransferReserveAsset'
    assets: V5Asset[]
    dest: V5Location
    xcm: V5Instruction[]
}

export interface V5Instruction_Trap {
    __kind: 'Trap'
    value: bigint
}

export interface V5Instruction_UniversalOrigin {
    __kind: 'UniversalOrigin'
    value: V5Junction
}

export interface V5Instruction_UnlockAsset {
    __kind: 'UnlockAsset'
    asset: V5Asset
    target: V5Location
}

export interface V5Instruction_UnpaidExecution {
    __kind: 'UnpaidExecution'
    weightLimit: V3WeightLimit
    checkOrigin?: (V5Location | undefined)
}

export interface V5Instruction_UnsubscribeVersion {
    __kind: 'UnsubscribeVersion'
}

export interface V5Instruction_WithdrawAsset {
    __kind: 'WithdrawAsset'
    value: V5Asset[]
}

export type V3WeightLimit = V3WeightLimit_Limited | V3WeightLimit_Unlimited

export interface V3WeightLimit_Limited {
    __kind: 'Limited'
    value: Weight
}

export interface V3WeightLimit_Unlimited {
    __kind: 'Unlimited'
}

export const V4Instruction: sts.Type<V4Instruction> = sts.closedEnum(() => {
    return  {
        AliasOrigin: V4Location,
        BurnAsset: sts.array(() => V4Asset),
        BuyExecution: sts.enumStruct({
            fees: V4Asset,
            weightLimit: V3WeightLimit,
        }),
        ClaimAsset: sts.enumStruct({
            assets: sts.array(() => V4Asset),
            ticket: V4Location,
        }),
        ClearError: sts.unit(),
        ClearOrigin: sts.unit(),
        ClearTopic: sts.unit(),
        ClearTransactStatus: sts.unit(),
        DepositAsset: sts.enumStruct({
            assets: V4AssetFilter,
            beneficiary: V4Location,
        }),
        DepositReserveAsset: sts.enumStruct({
            assets: V4AssetFilter,
            dest: V4Location,
            xcm: sts.array(() => V4Instruction),
        }),
        DescendOrigin: V4Junctions,
        ExchangeAsset: sts.enumStruct({
            give: V4AssetFilter,
            want: sts.array(() => V4Asset),
            maximal: sts.boolean(),
        }),
        ExpectAsset: sts.array(() => V4Asset),
        ExpectError: sts.option(() => sts.tuple(() => [sts.number(), V3Error])),
        ExpectOrigin: sts.option(() => V4Location),
        ExpectPallet: sts.enumStruct({
            index: sts.number(),
            name: sts.bytes(),
            moduleName: sts.bytes(),
            crateMajor: sts.number(),
            minCrateMinor: sts.number(),
        }),
        ExpectTransactStatus: V3MaybeErrorCode,
        ExportMessage: sts.enumStruct({
            network: V4NetworkId,
            destination: V4Junctions,
            xcm: sts.array(() => V4Instruction),
        }),
        HrmpChannelAccepted: sts.enumStruct({
            recipient: sts.number(),
        }),
        HrmpChannelClosing: sts.enumStruct({
            initiator: sts.number(),
            sender: sts.number(),
            recipient: sts.number(),
        }),
        HrmpNewChannelOpenRequest: sts.enumStruct({
            sender: sts.number(),
            maxMessageSize: sts.number(),
            maxCapacity: sts.number(),
        }),
        InitiateReserveWithdraw: sts.enumStruct({
            assets: V4AssetFilter,
            reserve: V4Location,
            xcm: sts.array(() => V4Instruction),
        }),
        InitiateTeleport: sts.enumStruct({
            assets: V4AssetFilter,
            dest: V4Location,
            xcm: sts.array(() => V4Instruction),
        }),
        LockAsset: sts.enumStruct({
            asset: V4Asset,
            unlocker: V4Location,
        }),
        NoteUnlockable: sts.enumStruct({
            asset: V4Asset,
            owner: V4Location,
        }),
        QueryPallet: sts.enumStruct({
            moduleName: sts.bytes(),
            responseInfo: V4QueryResponseInfo,
        }),
        QueryResponse: sts.enumStruct({
            queryId: sts.bigint(),
            response: V4Response,
            maxWeight: Weight,
            querier: sts.option(() => V4Location),
        }),
        ReceiveTeleportedAsset: sts.array(() => V4Asset),
        RefundSurplus: sts.unit(),
        ReportError: V4QueryResponseInfo,
        ReportHolding: sts.enumStruct({
            responseInfo: V4QueryResponseInfo,
            assets: V4AssetFilter,
        }),
        ReportTransactStatus: V4QueryResponseInfo,
        RequestUnlock: sts.enumStruct({
            asset: V4Asset,
            locker: V4Location,
        }),
        ReserveAssetDeposited: sts.array(() => V4Asset),
        SetAppendix: sts.array(() => V4Instruction),
        SetErrorHandler: sts.array(() => V4Instruction),
        SetFeesMode: sts.enumStruct({
            jitWithdraw: sts.boolean(),
        }),
        SetTopic: sts.bytes(),
        SubscribeVersion: sts.enumStruct({
            queryId: sts.bigint(),
            maxResponseWeight: Weight,
        }),
        Transact: sts.enumStruct({
            originKind: V3OriginKind,
            requireWeightAtMost: Weight,
            call: DoubleEncoded,
        }),
        TransferAsset: sts.enumStruct({
            assets: sts.array(() => V4Asset),
            beneficiary: V4Location,
        }),
        TransferReserveAsset: sts.enumStruct({
            assets: sts.array(() => V4Asset),
            dest: V4Location,
            xcm: sts.array(() => V4Instruction),
        }),
        Trap: sts.bigint(),
        UniversalOrigin: V4Junction,
        UnlockAsset: sts.enumStruct({
            asset: V4Asset,
            target: V4Location,
        }),
        UnpaidExecution: sts.enumStruct({
            weightLimit: V3WeightLimit,
            checkOrigin: sts.option(() => V4Location),
        }),
        UnsubscribeVersion: sts.unit(),
        WithdrawAsset: sts.array(() => V4Asset),
    }
})

export const V4Response: sts.Type<V4Response> = sts.closedEnum(() => {
    return  {
        Assets: sts.array(() => V4Asset),
        DispatchResult: V3MaybeErrorCode,
        ExecutionResult: sts.option(() => sts.tuple(() => [sts.number(), V3Error])),
        Null: sts.unit(),
        PalletsInfo: sts.array(() => V4PalletInfo),
        Version: sts.number(),
    }
})

export const V4PalletInfo: sts.Type<V4PalletInfo> = sts.struct(() => {
    return  {
        index: sts.number(),
        name: sts.bytes(),
        moduleName: sts.bytes(),
        major: sts.number(),
        minor: sts.number(),
        patch: sts.number(),
    }
})

export interface V4PalletInfo {
    index: number
    name: Bytes
    moduleName: Bytes
    major: number
    minor: number
    patch: number
}

export type V4Response = V4Response_Assets | V4Response_DispatchResult | V4Response_ExecutionResult | V4Response_Null | V4Response_PalletsInfo | V4Response_Version

export interface V4Response_Assets {
    __kind: 'Assets'
    value: V4Asset[]
}

export interface V4Response_DispatchResult {
    __kind: 'DispatchResult'
    value: V3MaybeErrorCode
}

export interface V4Response_ExecutionResult {
    __kind: 'ExecutionResult'
    value?: ([number, V3Error] | undefined)
}

export interface V4Response_Null {
    __kind: 'Null'
}

export interface V4Response_PalletsInfo {
    __kind: 'PalletsInfo'
    value: V4PalletInfo[]
}

export interface V4Response_Version {
    __kind: 'Version'
    value: number
}

export type V3Error = V3Error_AssetNotFound | V3Error_BadOrigin | V3Error_Barrier | V3Error_DestinationUnsupported | V3Error_ExceedsMaxMessageSize | V3Error_ExceedsStackLimit | V3Error_ExpectationFalse | V3Error_ExportError | V3Error_FailedToDecode | V3Error_FailedToTransactAsset | V3Error_FeesNotMet | V3Error_HoldingWouldOverflow | V3Error_InvalidLocation | V3Error_LocationCannotHold | V3Error_LocationFull | V3Error_LocationNotInvertible | V3Error_LockError | V3Error_MaxWeightInvalid | V3Error_NameMismatch | V3Error_NoDeal | V3Error_NoPermission | V3Error_NotDepositable | V3Error_NotHoldingFees | V3Error_NotWithdrawable | V3Error_Overflow | V3Error_PalletNotFound | V3Error_ReanchorFailed | V3Error_TooExpensive | V3Error_Transport | V3Error_Trap | V3Error_Unanchored | V3Error_UnhandledXcmVersion | V3Error_Unimplemented | V3Error_UnknownClaim | V3Error_Unroutable | V3Error_UntrustedReserveLocation | V3Error_UntrustedTeleportLocation | V3Error_VersionIncompatible | V3Error_WeightLimitReached | V3Error_WeightNotComputable

export interface V3Error_AssetNotFound {
    __kind: 'AssetNotFound'
}

export interface V3Error_BadOrigin {
    __kind: 'BadOrigin'
}

export interface V3Error_Barrier {
    __kind: 'Barrier'
}

export interface V3Error_DestinationUnsupported {
    __kind: 'DestinationUnsupported'
}

export interface V3Error_ExceedsMaxMessageSize {
    __kind: 'ExceedsMaxMessageSize'
}

export interface V3Error_ExceedsStackLimit {
    __kind: 'ExceedsStackLimit'
}

export interface V3Error_ExpectationFalse {
    __kind: 'ExpectationFalse'
}

export interface V3Error_ExportError {
    __kind: 'ExportError'
}

export interface V3Error_FailedToDecode {
    __kind: 'FailedToDecode'
}

export interface V3Error_FailedToTransactAsset {
    __kind: 'FailedToTransactAsset'
}

export interface V3Error_FeesNotMet {
    __kind: 'FeesNotMet'
}

export interface V3Error_HoldingWouldOverflow {
    __kind: 'HoldingWouldOverflow'
}

export interface V3Error_InvalidLocation {
    __kind: 'InvalidLocation'
}

export interface V3Error_LocationCannotHold {
    __kind: 'LocationCannotHold'
}

export interface V3Error_LocationFull {
    __kind: 'LocationFull'
}

export interface V3Error_LocationNotInvertible {
    __kind: 'LocationNotInvertible'
}

export interface V3Error_LockError {
    __kind: 'LockError'
}

export interface V3Error_MaxWeightInvalid {
    __kind: 'MaxWeightInvalid'
}

export interface V3Error_NameMismatch {
    __kind: 'NameMismatch'
}

export interface V3Error_NoDeal {
    __kind: 'NoDeal'
}

export interface V3Error_NoPermission {
    __kind: 'NoPermission'
}

export interface V3Error_NotDepositable {
    __kind: 'NotDepositable'
}

export interface V3Error_NotHoldingFees {
    __kind: 'NotHoldingFees'
}

export interface V3Error_NotWithdrawable {
    __kind: 'NotWithdrawable'
}

export interface V3Error_Overflow {
    __kind: 'Overflow'
}

export interface V3Error_PalletNotFound {
    __kind: 'PalletNotFound'
}

export interface V3Error_ReanchorFailed {
    __kind: 'ReanchorFailed'
}

export interface V3Error_TooExpensive {
    __kind: 'TooExpensive'
}

export interface V3Error_Transport {
    __kind: 'Transport'
}

export interface V3Error_Trap {
    __kind: 'Trap'
    value: bigint
}

export interface V3Error_Unanchored {
    __kind: 'Unanchored'
}

export interface V3Error_UnhandledXcmVersion {
    __kind: 'UnhandledXcmVersion'
}

export interface V3Error_Unimplemented {
    __kind: 'Unimplemented'
}

export interface V3Error_UnknownClaim {
    __kind: 'UnknownClaim'
}

export interface V3Error_Unroutable {
    __kind: 'Unroutable'
}

export interface V3Error_UntrustedReserveLocation {
    __kind: 'UntrustedReserveLocation'
}

export interface V3Error_UntrustedTeleportLocation {
    __kind: 'UntrustedTeleportLocation'
}

export interface V3Error_VersionIncompatible {
    __kind: 'VersionIncompatible'
}

export interface V3Error_WeightLimitReached {
    __kind: 'WeightLimitReached'
    value: Weight
}

export interface V3Error_WeightNotComputable {
    __kind: 'WeightNotComputable'
}

export interface V4Asset {
    id: V4AssetId
    fun: V4Fungibility
}

export type V4Fungibility = V4Fungibility_Fungible | V4Fungibility_NonFungible

export interface V4Fungibility_Fungible {
    __kind: 'Fungible'
    value: bigint
}

export interface V4Fungibility_NonFungible {
    __kind: 'NonFungible'
    value: V4AssetInstance
}

export type V4AssetInstance = V4AssetInstance_Array16 | V4AssetInstance_Array32 | V4AssetInstance_Array4 | V4AssetInstance_Array8 | V4AssetInstance_Index | V4AssetInstance_Undefined

export interface V4AssetInstance_Array16 {
    __kind: 'Array16'
    value: Bytes
}

export interface V4AssetInstance_Array32 {
    __kind: 'Array32'
    value: Bytes
}

export interface V4AssetInstance_Array4 {
    __kind: 'Array4'
    value: Bytes
}

export interface V4AssetInstance_Array8 {
    __kind: 'Array8'
    value: Bytes
}

export interface V4AssetInstance_Index {
    __kind: 'Index'
    value: bigint
}

export interface V4AssetInstance_Undefined {
    __kind: 'Undefined'
}

export const V4QueryResponseInfo: sts.Type<V4QueryResponseInfo> = sts.struct(() => {
    return  {
        destination: V4Location,
        queryId: sts.bigint(),
        maxWeight: Weight,
    }
})

export interface V4QueryResponseInfo {
    destination: V4Location
    queryId: bigint
    maxWeight: Weight
}

export const V3Error: sts.Type<V3Error> = sts.closedEnum(() => {
    return  {
        AssetNotFound: sts.unit(),
        BadOrigin: sts.unit(),
        Barrier: sts.unit(),
        DestinationUnsupported: sts.unit(),
        ExceedsMaxMessageSize: sts.unit(),
        ExceedsStackLimit: sts.unit(),
        ExpectationFalse: sts.unit(),
        ExportError: sts.unit(),
        FailedToDecode: sts.unit(),
        FailedToTransactAsset: sts.unit(),
        FeesNotMet: sts.unit(),
        HoldingWouldOverflow: sts.unit(),
        InvalidLocation: sts.unit(),
        LocationCannotHold: sts.unit(),
        LocationFull: sts.unit(),
        LocationNotInvertible: sts.unit(),
        LockError: sts.unit(),
        MaxWeightInvalid: sts.unit(),
        NameMismatch: sts.unit(),
        NoDeal: sts.unit(),
        NoPermission: sts.unit(),
        NotDepositable: sts.unit(),
        NotHoldingFees: sts.unit(),
        NotWithdrawable: sts.unit(),
        Overflow: sts.unit(),
        PalletNotFound: sts.unit(),
        ReanchorFailed: sts.unit(),
        TooExpensive: sts.unit(),
        Transport: sts.unit(),
        Trap: sts.bigint(),
        Unanchored: sts.unit(),
        UnhandledXcmVersion: sts.unit(),
        Unimplemented: sts.unit(),
        UnknownClaim: sts.unit(),
        Unroutable: sts.unit(),
        UntrustedReserveLocation: sts.unit(),
        UntrustedTeleportLocation: sts.unit(),
        VersionIncompatible: sts.unit(),
        WeightLimitReached: Weight,
        WeightNotComputable: sts.unit(),
    }
})

export const V4AssetFilter: sts.Type<V4AssetFilter> = sts.closedEnum(() => {
    return  {
        Definite: sts.array(() => V4Asset),
        Wild: V4WildAsset,
    }
})

export const V4WildAsset: sts.Type<V4WildAsset> = sts.closedEnum(() => {
    return  {
        All: sts.unit(),
        AllCounted: sts.number(),
        AllOf: sts.enumStruct({
            id: V4AssetId,
            fun: V4WildFungibility,
        }),
        AllOfCounted: sts.enumStruct({
            id: V4AssetId,
            fun: V4WildFungibility,
            count: sts.number(),
        }),
    }
})

export const V4WildFungibility: sts.Type<V4WildFungibility> = sts.closedEnum(() => {
    return  {
        Fungible: sts.unit(),
        NonFungible: sts.unit(),
    }
})

export type V4WildFungibility = V4WildFungibility_Fungible | V4WildFungibility_NonFungible

export interface V4WildFungibility_Fungible {
    __kind: 'Fungible'
}

export interface V4WildFungibility_NonFungible {
    __kind: 'NonFungible'
}

export type V4WildAsset = V4WildAsset_All | V4WildAsset_AllCounted | V4WildAsset_AllOf | V4WildAsset_AllOfCounted

export interface V4WildAsset_All {
    __kind: 'All'
}

export interface V4WildAsset_AllCounted {
    __kind: 'AllCounted'
    value: number
}

export interface V4WildAsset_AllOf {
    __kind: 'AllOf'
    id: V4AssetId
    fun: V4WildFungibility
}

export interface V4WildAsset_AllOfCounted {
    __kind: 'AllOfCounted'
    id: V4AssetId
    fun: V4WildFungibility
    count: number
}

export type V4AssetFilter = V4AssetFilter_Definite | V4AssetFilter_Wild

export interface V4AssetFilter_Definite {
    __kind: 'Definite'
    value: V4Asset[]
}

export interface V4AssetFilter_Wild {
    __kind: 'Wild'
    value: V4WildAsset
}

export const V4Asset: sts.Type<V4Asset> = sts.struct(() => {
    return  {
        id: V4AssetId,
        fun: V4Fungibility,
    }
})

export const V4Fungibility: sts.Type<V4Fungibility> = sts.closedEnum(() => {
    return  {
        Fungible: sts.bigint(),
        NonFungible: V4AssetInstance,
    }
})

export const V4AssetInstance: sts.Type<V4AssetInstance> = sts.closedEnum(() => {
    return  {
        Array16: sts.bytes(),
        Array32: sts.bytes(),
        Array4: sts.bytes(),
        Array8: sts.bytes(),
        Index: sts.bigint(),
        Undefined: sts.unit(),
    }
})

export const V4Location: sts.Type<V4Location> = sts.struct(() => {
    return  {
        parents: sts.number(),
        interior: V4Junctions,
    }
})

export type V4Instruction = V4Instruction_AliasOrigin | V4Instruction_BurnAsset | V4Instruction_BuyExecution | V4Instruction_ClaimAsset | V4Instruction_ClearError | V4Instruction_ClearOrigin | V4Instruction_ClearTopic | V4Instruction_ClearTransactStatus | V4Instruction_DepositAsset | V4Instruction_DepositReserveAsset | V4Instruction_DescendOrigin | V4Instruction_ExchangeAsset | V4Instruction_ExpectAsset | V4Instruction_ExpectError | V4Instruction_ExpectOrigin | V4Instruction_ExpectPallet | V4Instruction_ExpectTransactStatus | V4Instruction_ExportMessage | V4Instruction_HrmpChannelAccepted | V4Instruction_HrmpChannelClosing | V4Instruction_HrmpNewChannelOpenRequest | V4Instruction_InitiateReserveWithdraw | V4Instruction_InitiateTeleport | V4Instruction_LockAsset | V4Instruction_NoteUnlockable | V4Instruction_QueryPallet | V4Instruction_QueryResponse | V4Instruction_ReceiveTeleportedAsset | V4Instruction_RefundSurplus | V4Instruction_ReportError | V4Instruction_ReportHolding | V4Instruction_ReportTransactStatus | V4Instruction_RequestUnlock | V4Instruction_ReserveAssetDeposited | V4Instruction_SetAppendix | V4Instruction_SetErrorHandler | V4Instruction_SetFeesMode | V4Instruction_SetTopic | V4Instruction_SubscribeVersion | V4Instruction_Transact | V4Instruction_TransferAsset | V4Instruction_TransferReserveAsset | V4Instruction_Trap | V4Instruction_UniversalOrigin | V4Instruction_UnlockAsset | V4Instruction_UnpaidExecution | V4Instruction_UnsubscribeVersion | V4Instruction_WithdrawAsset

export interface V4Instruction_AliasOrigin {
    __kind: 'AliasOrigin'
    value: V4Location
}

export interface V4Instruction_BurnAsset {
    __kind: 'BurnAsset'
    value: V4Asset[]
}

export interface V4Instruction_BuyExecution {
    __kind: 'BuyExecution'
    fees: V4Asset
    weightLimit: V3WeightLimit
}

export interface V4Instruction_ClaimAsset {
    __kind: 'ClaimAsset'
    assets: V4Asset[]
    ticket: V4Location
}

export interface V4Instruction_ClearError {
    __kind: 'ClearError'
}

export interface V4Instruction_ClearOrigin {
    __kind: 'ClearOrigin'
}

export interface V4Instruction_ClearTopic {
    __kind: 'ClearTopic'
}

export interface V4Instruction_ClearTransactStatus {
    __kind: 'ClearTransactStatus'
}

export interface V4Instruction_DepositAsset {
    __kind: 'DepositAsset'
    assets: V4AssetFilter
    beneficiary: V4Location
}

export interface V4Instruction_DepositReserveAsset {
    __kind: 'DepositReserveAsset'
    assets: V4AssetFilter
    dest: V4Location
    xcm: V4Instruction[]
}

export interface V4Instruction_DescendOrigin {
    __kind: 'DescendOrigin'
    value: V4Junctions
}

export interface V4Instruction_ExchangeAsset {
    __kind: 'ExchangeAsset'
    give: V4AssetFilter
    want: V4Asset[]
    maximal: boolean
}

export interface V4Instruction_ExpectAsset {
    __kind: 'ExpectAsset'
    value: V4Asset[]
}

export interface V4Instruction_ExpectError {
    __kind: 'ExpectError'
    value?: ([number, V3Error] | undefined)
}

export interface V4Instruction_ExpectOrigin {
    __kind: 'ExpectOrigin'
    value?: (V4Location | undefined)
}

export interface V4Instruction_ExpectPallet {
    __kind: 'ExpectPallet'
    index: number
    name: Bytes
    moduleName: Bytes
    crateMajor: number
    minCrateMinor: number
}

export interface V4Instruction_ExpectTransactStatus {
    __kind: 'ExpectTransactStatus'
    value: V3MaybeErrorCode
}

export interface V4Instruction_ExportMessage {
    __kind: 'ExportMessage'
    network: V4NetworkId
    destination: V4Junctions
    xcm: V4Instruction[]
}

export interface V4Instruction_HrmpChannelAccepted {
    __kind: 'HrmpChannelAccepted'
    recipient: number
}

export interface V4Instruction_HrmpChannelClosing {
    __kind: 'HrmpChannelClosing'
    initiator: number
    sender: number
    recipient: number
}

export interface V4Instruction_HrmpNewChannelOpenRequest {
    __kind: 'HrmpNewChannelOpenRequest'
    sender: number
    maxMessageSize: number
    maxCapacity: number
}

export interface V4Instruction_InitiateReserveWithdraw {
    __kind: 'InitiateReserveWithdraw'
    assets: V4AssetFilter
    reserve: V4Location
    xcm: V4Instruction[]
}

export interface V4Instruction_InitiateTeleport {
    __kind: 'InitiateTeleport'
    assets: V4AssetFilter
    dest: V4Location
    xcm: V4Instruction[]
}

export interface V4Instruction_LockAsset {
    __kind: 'LockAsset'
    asset: V4Asset
    unlocker: V4Location
}

export interface V4Instruction_NoteUnlockable {
    __kind: 'NoteUnlockable'
    asset: V4Asset
    owner: V4Location
}

export interface V4Instruction_QueryPallet {
    __kind: 'QueryPallet'
    moduleName: Bytes
    responseInfo: V4QueryResponseInfo
}

export interface V4Instruction_QueryResponse {
    __kind: 'QueryResponse'
    queryId: bigint
    response: V4Response
    maxWeight: Weight
    querier?: (V4Location | undefined)
}

export interface V4Instruction_ReceiveTeleportedAsset {
    __kind: 'ReceiveTeleportedAsset'
    value: V4Asset[]
}

export interface V4Instruction_RefundSurplus {
    __kind: 'RefundSurplus'
}

export interface V4Instruction_ReportError {
    __kind: 'ReportError'
    value: V4QueryResponseInfo
}

export interface V4Instruction_ReportHolding {
    __kind: 'ReportHolding'
    responseInfo: V4QueryResponseInfo
    assets: V4AssetFilter
}

export interface V4Instruction_ReportTransactStatus {
    __kind: 'ReportTransactStatus'
    value: V4QueryResponseInfo
}

export interface V4Instruction_RequestUnlock {
    __kind: 'RequestUnlock'
    asset: V4Asset
    locker: V4Location
}

export interface V4Instruction_ReserveAssetDeposited {
    __kind: 'ReserveAssetDeposited'
    value: V4Asset[]
}

export interface V4Instruction_SetAppendix {
    __kind: 'SetAppendix'
    value: V4Instruction[]
}

export interface V4Instruction_SetErrorHandler {
    __kind: 'SetErrorHandler'
    value: V4Instruction[]
}

export interface V4Instruction_SetFeesMode {
    __kind: 'SetFeesMode'
    jitWithdraw: boolean
}

export interface V4Instruction_SetTopic {
    __kind: 'SetTopic'
    value: Bytes
}

export interface V4Instruction_SubscribeVersion {
    __kind: 'SubscribeVersion'
    queryId: bigint
    maxResponseWeight: Weight
}

export interface V4Instruction_Transact {
    __kind: 'Transact'
    originKind: V3OriginKind
    requireWeightAtMost: Weight
    call: DoubleEncoded
}

export interface V4Instruction_TransferAsset {
    __kind: 'TransferAsset'
    assets: V4Asset[]
    beneficiary: V4Location
}

export interface V4Instruction_TransferReserveAsset {
    __kind: 'TransferReserveAsset'
    assets: V4Asset[]
    dest: V4Location
    xcm: V4Instruction[]
}

export interface V4Instruction_Trap {
    __kind: 'Trap'
    value: bigint
}

export interface V4Instruction_UniversalOrigin {
    __kind: 'UniversalOrigin'
    value: V4Junction
}

export interface V4Instruction_UnlockAsset {
    __kind: 'UnlockAsset'
    asset: V4Asset
    target: V4Location
}

export interface V4Instruction_UnpaidExecution {
    __kind: 'UnpaidExecution'
    weightLimit: V3WeightLimit
    checkOrigin?: (V4Location | undefined)
}

export interface V4Instruction_UnsubscribeVersion {
    __kind: 'UnsubscribeVersion'
}

export interface V4Instruction_WithdrawAsset {
    __kind: 'WithdrawAsset'
    value: V4Asset[]
}

export const V3Instruction: sts.Type<V3Instruction> = sts.closedEnum(() => {
    return  {
        AliasOrigin: V3MultiLocation,
        BurnAsset: sts.array(() => V3MultiAsset),
        BuyExecution: sts.enumStruct({
            fees: V3MultiAsset,
            weightLimit: V3WeightLimit,
        }),
        ClaimAsset: sts.enumStruct({
            assets: sts.array(() => V3MultiAsset),
            ticket: V3MultiLocation,
        }),
        ClearError: sts.unit(),
        ClearOrigin: sts.unit(),
        ClearTopic: sts.unit(),
        ClearTransactStatus: sts.unit(),
        DepositAsset: sts.enumStruct({
            assets: V3MultiAssetFilter,
            beneficiary: V3MultiLocation,
        }),
        DepositReserveAsset: sts.enumStruct({
            assets: V3MultiAssetFilter,
            dest: V3MultiLocation,
            xcm: sts.array(() => V3Instruction),
        }),
        DescendOrigin: V3Junctions,
        ExchangeAsset: sts.enumStruct({
            give: V3MultiAssetFilter,
            want: sts.array(() => V3MultiAsset),
            maximal: sts.boolean(),
        }),
        ExpectAsset: sts.array(() => V3MultiAsset),
        ExpectError: sts.option(() => sts.tuple(() => [sts.number(), V3Error])),
        ExpectOrigin: sts.option(() => V3MultiLocation),
        ExpectPallet: sts.enumStruct({
            index: sts.number(),
            name: sts.bytes(),
            moduleName: sts.bytes(),
            crateMajor: sts.number(),
            minCrateMinor: sts.number(),
        }),
        ExpectTransactStatus: V3MaybeErrorCode,
        ExportMessage: sts.enumStruct({
            network: V3NetworkId,
            destination: V3Junctions,
            xcm: sts.array(() => V3Instruction),
        }),
        HrmpChannelAccepted: sts.enumStruct({
            recipient: sts.number(),
        }),
        HrmpChannelClosing: sts.enumStruct({
            initiator: sts.number(),
            sender: sts.number(),
            recipient: sts.number(),
        }),
        HrmpNewChannelOpenRequest: sts.enumStruct({
            sender: sts.number(),
            maxMessageSize: sts.number(),
            maxCapacity: sts.number(),
        }),
        InitiateReserveWithdraw: sts.enumStruct({
            assets: V3MultiAssetFilter,
            reserve: V3MultiLocation,
            xcm: sts.array(() => V3Instruction),
        }),
        InitiateTeleport: sts.enumStruct({
            assets: V3MultiAssetFilter,
            dest: V3MultiLocation,
            xcm: sts.array(() => V3Instruction),
        }),
        LockAsset: sts.enumStruct({
            asset: V3MultiAsset,
            unlocker: V3MultiLocation,
        }),
        NoteUnlockable: sts.enumStruct({
            asset: V3MultiAsset,
            owner: V3MultiLocation,
        }),
        QueryPallet: sts.enumStruct({
            moduleName: sts.bytes(),
            responseInfo: V3QueryResponseInfo,
        }),
        QueryResponse: sts.enumStruct({
            queryId: sts.bigint(),
            response: V3Response,
            maxWeight: Weight,
            querier: sts.option(() => V3MultiLocation),
        }),
        ReceiveTeleportedAsset: sts.array(() => V3MultiAsset),
        RefundSurplus: sts.unit(),
        ReportError: V3QueryResponseInfo,
        ReportHolding: sts.enumStruct({
            responseInfo: V3QueryResponseInfo,
            assets: V3MultiAssetFilter,
        }),
        ReportTransactStatus: V3QueryResponseInfo,
        RequestUnlock: sts.enumStruct({
            asset: V3MultiAsset,
            locker: V3MultiLocation,
        }),
        ReserveAssetDeposited: sts.array(() => V3MultiAsset),
        SetAppendix: sts.array(() => V3Instruction),
        SetErrorHandler: sts.array(() => V3Instruction),
        SetFeesMode: sts.enumStruct({
            jitWithdraw: sts.boolean(),
        }),
        SetTopic: sts.bytes(),
        SubscribeVersion: sts.enumStruct({
            queryId: sts.bigint(),
            maxResponseWeight: Weight,
        }),
        Transact: sts.enumStruct({
            originKind: V3OriginKind,
            requireWeightAtMost: Weight,
            call: DoubleEncoded,
        }),
        TransferAsset: sts.enumStruct({
            assets: sts.array(() => V3MultiAsset),
            beneficiary: V3MultiLocation,
        }),
        TransferReserveAsset: sts.enumStruct({
            assets: sts.array(() => V3MultiAsset),
            dest: V3MultiLocation,
            xcm: sts.array(() => V3Instruction),
        }),
        Trap: sts.bigint(),
        UniversalOrigin: V3Junction,
        UnlockAsset: sts.enumStruct({
            asset: V3MultiAsset,
            target: V3MultiLocation,
        }),
        UnpaidExecution: sts.enumStruct({
            weightLimit: V3WeightLimit,
            checkOrigin: sts.option(() => V3MultiLocation),
        }),
        UnsubscribeVersion: sts.unit(),
        WithdrawAsset: sts.array(() => V3MultiAsset),
    }
})

export const V3Response: sts.Type<V3Response> = sts.closedEnum(() => {
    return  {
        Assets: sts.array(() => V3MultiAsset),
        DispatchResult: V3MaybeErrorCode,
        ExecutionResult: sts.option(() => sts.tuple(() => [sts.number(), V3Error])),
        Null: sts.unit(),
        PalletsInfo: sts.array(() => V3PalletInfo),
        Version: sts.number(),
    }
})

export const V3PalletInfo: sts.Type<V3PalletInfo> = sts.struct(() => {
    return  {
        index: sts.number(),
        name: BoundedVec,
        moduleName: BoundedVec,
        major: sts.number(),
        minor: sts.number(),
        patch: sts.number(),
    }
})

export const BoundedVec = sts.bytes()

export interface V3PalletInfo {
    index: number
    name: BoundedVec
    moduleName: BoundedVec
    major: number
    minor: number
    patch: number
}

export type BoundedVec = Bytes

export type V3Response = V3Response_Assets | V3Response_DispatchResult | V3Response_ExecutionResult | V3Response_Null | V3Response_PalletsInfo | V3Response_Version

export interface V3Response_Assets {
    __kind: 'Assets'
    value: V3MultiAsset[]
}

export interface V3Response_DispatchResult {
    __kind: 'DispatchResult'
    value: V3MaybeErrorCode
}

export interface V3Response_ExecutionResult {
    __kind: 'ExecutionResult'
    value?: ([number, V3Error] | undefined)
}

export interface V3Response_Null {
    __kind: 'Null'
}

export interface V3Response_PalletsInfo {
    __kind: 'PalletsInfo'
    value: V3PalletInfo[]
}

export interface V3Response_Version {
    __kind: 'Version'
    value: number
}

export interface V3MultiAsset {
    id: V3AssetId
    fun: V3Fungibility
}

export type V3Fungibility = V3Fungibility_Fungible | V3Fungibility_NonFungible

export interface V3Fungibility_Fungible {
    __kind: 'Fungible'
    value: bigint
}

export interface V3Fungibility_NonFungible {
    __kind: 'NonFungible'
    value: V3AssetInstance
}

export type V3AssetInstance = V3AssetInstance_Array16 | V3AssetInstance_Array32 | V3AssetInstance_Array4 | V3AssetInstance_Array8 | V3AssetInstance_Index | V3AssetInstance_Undefined

export interface V3AssetInstance_Array16 {
    __kind: 'Array16'
    value: Bytes
}

export interface V3AssetInstance_Array32 {
    __kind: 'Array32'
    value: Bytes
}

export interface V3AssetInstance_Array4 {
    __kind: 'Array4'
    value: Bytes
}

export interface V3AssetInstance_Array8 {
    __kind: 'Array8'
    value: Bytes
}

export interface V3AssetInstance_Index {
    __kind: 'Index'
    value: bigint
}

export interface V3AssetInstance_Undefined {
    __kind: 'Undefined'
}

export const V3QueryResponseInfo: sts.Type<V3QueryResponseInfo> = sts.struct(() => {
    return  {
        destination: V3MultiLocation,
        queryId: sts.bigint(),
        maxWeight: Weight,
    }
})

export interface V3QueryResponseInfo {
    destination: V3MultiLocation
    queryId: bigint
    maxWeight: Weight
}

export const V3MultiAssetFilter: sts.Type<V3MultiAssetFilter> = sts.closedEnum(() => {
    return  {
        Definite: sts.array(() => V3MultiAsset),
        Wild: V3WildMultiAsset,
    }
})

export const V3WildMultiAsset: sts.Type<V3WildMultiAsset> = sts.closedEnum(() => {
    return  {
        All: sts.unit(),
        AllCounted: sts.number(),
        AllOf: sts.enumStruct({
            id: V3AssetId,
            fun: V3WildFungibility,
        }),
        AllOfCounted: sts.enumStruct({
            id: V3AssetId,
            fun: V3WildFungibility,
            count: sts.number(),
        }),
    }
})

export const V3WildFungibility: sts.Type<V3WildFungibility> = sts.closedEnum(() => {
    return  {
        Fungible: sts.unit(),
        NonFungible: sts.unit(),
    }
})

export type V3WildFungibility = V3WildFungibility_Fungible | V3WildFungibility_NonFungible

export interface V3WildFungibility_Fungible {
    __kind: 'Fungible'
}

export interface V3WildFungibility_NonFungible {
    __kind: 'NonFungible'
}

export type V3WildMultiAsset = V3WildMultiAsset_All | V3WildMultiAsset_AllCounted | V3WildMultiAsset_AllOf | V3WildMultiAsset_AllOfCounted

export interface V3WildMultiAsset_All {
    __kind: 'All'
}

export interface V3WildMultiAsset_AllCounted {
    __kind: 'AllCounted'
    value: number
}

export interface V3WildMultiAsset_AllOf {
    __kind: 'AllOf'
    id: V3AssetId
    fun: V3WildFungibility
}

export interface V3WildMultiAsset_AllOfCounted {
    __kind: 'AllOfCounted'
    id: V3AssetId
    fun: V3WildFungibility
    count: number
}

export type V3MultiAssetFilter = V3MultiAssetFilter_Definite | V3MultiAssetFilter_Wild

export interface V3MultiAssetFilter_Definite {
    __kind: 'Definite'
    value: V3MultiAsset[]
}

export interface V3MultiAssetFilter_Wild {
    __kind: 'Wild'
    value: V3WildMultiAsset
}

export const V3MultiAsset: sts.Type<V3MultiAsset> = sts.struct(() => {
    return  {
        id: V3AssetId,
        fun: V3Fungibility,
    }
})

export const V3Fungibility: sts.Type<V3Fungibility> = sts.closedEnum(() => {
    return  {
        Fungible: sts.bigint(),
        NonFungible: V3AssetInstance,
    }
})

export const V3AssetInstance: sts.Type<V3AssetInstance> = sts.closedEnum(() => {
    return  {
        Array16: sts.bytes(),
        Array32: sts.bytes(),
        Array4: sts.bytes(),
        Array8: sts.bytes(),
        Index: sts.bigint(),
        Undefined: sts.unit(),
    }
})

export type V3Instruction = V3Instruction_AliasOrigin | V3Instruction_BurnAsset | V3Instruction_BuyExecution | V3Instruction_ClaimAsset | V3Instruction_ClearError | V3Instruction_ClearOrigin | V3Instruction_ClearTopic | V3Instruction_ClearTransactStatus | V3Instruction_DepositAsset | V3Instruction_DepositReserveAsset | V3Instruction_DescendOrigin | V3Instruction_ExchangeAsset | V3Instruction_ExpectAsset | V3Instruction_ExpectError | V3Instruction_ExpectOrigin | V3Instruction_ExpectPallet | V3Instruction_ExpectTransactStatus | V3Instruction_ExportMessage | V3Instruction_HrmpChannelAccepted | V3Instruction_HrmpChannelClosing | V3Instruction_HrmpNewChannelOpenRequest | V3Instruction_InitiateReserveWithdraw | V3Instruction_InitiateTeleport | V3Instruction_LockAsset | V3Instruction_NoteUnlockable | V3Instruction_QueryPallet | V3Instruction_QueryResponse | V3Instruction_ReceiveTeleportedAsset | V3Instruction_RefundSurplus | V3Instruction_ReportError | V3Instruction_ReportHolding | V3Instruction_ReportTransactStatus | V3Instruction_RequestUnlock | V3Instruction_ReserveAssetDeposited | V3Instruction_SetAppendix | V3Instruction_SetErrorHandler | V3Instruction_SetFeesMode | V3Instruction_SetTopic | V3Instruction_SubscribeVersion | V3Instruction_Transact | V3Instruction_TransferAsset | V3Instruction_TransferReserveAsset | V3Instruction_Trap | V3Instruction_UniversalOrigin | V3Instruction_UnlockAsset | V3Instruction_UnpaidExecution | V3Instruction_UnsubscribeVersion | V3Instruction_WithdrawAsset

export interface V3Instruction_AliasOrigin {
    __kind: 'AliasOrigin'
    value: V3MultiLocation
}

export interface V3Instruction_BurnAsset {
    __kind: 'BurnAsset'
    value: V3MultiAsset[]
}

export interface V3Instruction_BuyExecution {
    __kind: 'BuyExecution'
    fees: V3MultiAsset
    weightLimit: V3WeightLimit
}

export interface V3Instruction_ClaimAsset {
    __kind: 'ClaimAsset'
    assets: V3MultiAsset[]
    ticket: V3MultiLocation
}

export interface V3Instruction_ClearError {
    __kind: 'ClearError'
}

export interface V3Instruction_ClearOrigin {
    __kind: 'ClearOrigin'
}

export interface V3Instruction_ClearTopic {
    __kind: 'ClearTopic'
}

export interface V3Instruction_ClearTransactStatus {
    __kind: 'ClearTransactStatus'
}

export interface V3Instruction_DepositAsset {
    __kind: 'DepositAsset'
    assets: V3MultiAssetFilter
    beneficiary: V3MultiLocation
}

export interface V3Instruction_DepositReserveAsset {
    __kind: 'DepositReserveAsset'
    assets: V3MultiAssetFilter
    dest: V3MultiLocation
    xcm: V3Instruction[]
}

export interface V3Instruction_DescendOrigin {
    __kind: 'DescendOrigin'
    value: V3Junctions
}

export interface V3Instruction_ExchangeAsset {
    __kind: 'ExchangeAsset'
    give: V3MultiAssetFilter
    want: V3MultiAsset[]
    maximal: boolean
}

export interface V3Instruction_ExpectAsset {
    __kind: 'ExpectAsset'
    value: V3MultiAsset[]
}

export interface V3Instruction_ExpectError {
    __kind: 'ExpectError'
    value?: ([number, V3Error] | undefined)
}

export interface V3Instruction_ExpectOrigin {
    __kind: 'ExpectOrigin'
    value?: (V3MultiLocation | undefined)
}

export interface V3Instruction_ExpectPallet {
    __kind: 'ExpectPallet'
    index: number
    name: Bytes
    moduleName: Bytes
    crateMajor: number
    minCrateMinor: number
}

export interface V3Instruction_ExpectTransactStatus {
    __kind: 'ExpectTransactStatus'
    value: V3MaybeErrorCode
}

export interface V3Instruction_ExportMessage {
    __kind: 'ExportMessage'
    network: V3NetworkId
    destination: V3Junctions
    xcm: V3Instruction[]
}

export interface V3Instruction_HrmpChannelAccepted {
    __kind: 'HrmpChannelAccepted'
    recipient: number
}

export interface V3Instruction_HrmpChannelClosing {
    __kind: 'HrmpChannelClosing'
    initiator: number
    sender: number
    recipient: number
}

export interface V3Instruction_HrmpNewChannelOpenRequest {
    __kind: 'HrmpNewChannelOpenRequest'
    sender: number
    maxMessageSize: number
    maxCapacity: number
}

export interface V3Instruction_InitiateReserveWithdraw {
    __kind: 'InitiateReserveWithdraw'
    assets: V3MultiAssetFilter
    reserve: V3MultiLocation
    xcm: V3Instruction[]
}

export interface V3Instruction_InitiateTeleport {
    __kind: 'InitiateTeleport'
    assets: V3MultiAssetFilter
    dest: V3MultiLocation
    xcm: V3Instruction[]
}

export interface V3Instruction_LockAsset {
    __kind: 'LockAsset'
    asset: V3MultiAsset
    unlocker: V3MultiLocation
}

export interface V3Instruction_NoteUnlockable {
    __kind: 'NoteUnlockable'
    asset: V3MultiAsset
    owner: V3MultiLocation
}

export interface V3Instruction_QueryPallet {
    __kind: 'QueryPallet'
    moduleName: Bytes
    responseInfo: V3QueryResponseInfo
}

export interface V3Instruction_QueryResponse {
    __kind: 'QueryResponse'
    queryId: bigint
    response: V3Response
    maxWeight: Weight
    querier?: (V3MultiLocation | undefined)
}

export interface V3Instruction_ReceiveTeleportedAsset {
    __kind: 'ReceiveTeleportedAsset'
    value: V3MultiAsset[]
}

export interface V3Instruction_RefundSurplus {
    __kind: 'RefundSurplus'
}

export interface V3Instruction_ReportError {
    __kind: 'ReportError'
    value: V3QueryResponseInfo
}

export interface V3Instruction_ReportHolding {
    __kind: 'ReportHolding'
    responseInfo: V3QueryResponseInfo
    assets: V3MultiAssetFilter
}

export interface V3Instruction_ReportTransactStatus {
    __kind: 'ReportTransactStatus'
    value: V3QueryResponseInfo
}

export interface V3Instruction_RequestUnlock {
    __kind: 'RequestUnlock'
    asset: V3MultiAsset
    locker: V3MultiLocation
}

export interface V3Instruction_ReserveAssetDeposited {
    __kind: 'ReserveAssetDeposited'
    value: V3MultiAsset[]
}

export interface V3Instruction_SetAppendix {
    __kind: 'SetAppendix'
    value: V3Instruction[]
}

export interface V3Instruction_SetErrorHandler {
    __kind: 'SetErrorHandler'
    value: V3Instruction[]
}

export interface V3Instruction_SetFeesMode {
    __kind: 'SetFeesMode'
    jitWithdraw: boolean
}

export interface V3Instruction_SetTopic {
    __kind: 'SetTopic'
    value: Bytes
}

export interface V3Instruction_SubscribeVersion {
    __kind: 'SubscribeVersion'
    queryId: bigint
    maxResponseWeight: Weight
}

export interface V3Instruction_Transact {
    __kind: 'Transact'
    originKind: V3OriginKind
    requireWeightAtMost: Weight
    call: DoubleEncoded
}

export interface V3Instruction_TransferAsset {
    __kind: 'TransferAsset'
    assets: V3MultiAsset[]
    beneficiary: V3MultiLocation
}

export interface V3Instruction_TransferReserveAsset {
    __kind: 'TransferReserveAsset'
    assets: V3MultiAsset[]
    dest: V3MultiLocation
    xcm: V3Instruction[]
}

export interface V3Instruction_Trap {
    __kind: 'Trap'
    value: bigint
}

export interface V3Instruction_UniversalOrigin {
    __kind: 'UniversalOrigin'
    value: V3Junction
}

export interface V3Instruction_UnlockAsset {
    __kind: 'UnlockAsset'
    asset: V3MultiAsset
    target: V3MultiLocation
}

export interface V3Instruction_UnpaidExecution {
    __kind: 'UnpaidExecution'
    weightLimit: V3WeightLimit
    checkOrigin?: (V3MultiLocation | undefined)
}

export interface V3Instruction_UnsubscribeVersion {
    __kind: 'UnsubscribeVersion'
}

export interface V3Instruction_WithdrawAsset {
    __kind: 'WithdrawAsset'
    value: V3MultiAsset[]
}

export type VersionedXcm = VersionedXcm_V3 | VersionedXcm_V4 | VersionedXcm_V5

export interface VersionedXcm_V3 {
    __kind: 'V3'
    value: V3Instruction[]
}

export interface VersionedXcm_V4 {
    __kind: 'V4'
    value: V4Instruction[]
}

export interface VersionedXcm_V5 {
    __kind: 'V5'
    value: V5Instruction[]
}

export const V3WeightLimit: sts.Type<V3WeightLimit> = sts.closedEnum(() => {
    return  {
        Limited: Weight,
        Unlimited: sts.unit(),
    }
})

export const V5Location: sts.Type<V5Location> = sts.struct(() => {
    return  {
        parents: sts.number(),
        interior: V5Junctions,
    }
})

export const Type_465: sts.Type<Type_465> = sts.closedEnum(() => {
    return  {
        V3: sts.array(() => Type_468),
        V4: sts.array(() => Type_472),
        V5: sts.array(() => Type_475),
    }
})

export const Type_475: sts.Type<Type_475> = sts.closedEnum(() => {
    return  {
        AliasOrigin: V5Location,
        BurnAsset: sts.array(() => V5Asset),
        BuyExecution: sts.enumStruct({
            fees: V5Asset,
            weightLimit: V3WeightLimit,
        }),
        ClaimAsset: sts.enumStruct({
            assets: sts.array(() => V5Asset),
            ticket: V5Location,
        }),
        ClearError: sts.unit(),
        ClearOrigin: sts.unit(),
        ClearTopic: sts.unit(),
        ClearTransactStatus: sts.unit(),
        DepositAsset: sts.enumStruct({
            assets: V5AssetFilter,
            beneficiary: V5Location,
        }),
        DepositReserveAsset: sts.enumStruct({
            assets: V5AssetFilter,
            dest: V5Location,
            xcm: sts.array(() => V5Instruction),
        }),
        DescendOrigin: V5Junctions,
        ExchangeAsset: sts.enumStruct({
            give: V5AssetFilter,
            want: sts.array(() => V5Asset),
            maximal: sts.boolean(),
        }),
        ExecuteWithOrigin: sts.enumStruct({
            descendantOrigin: sts.option(() => V5Junctions),
            xcm: sts.array(() => Type_475),
        }),
        ExpectAsset: sts.array(() => V5Asset),
        ExpectError: sts.option(() => sts.tuple(() => [sts.number(), V5Error])),
        ExpectOrigin: sts.option(() => V5Location),
        ExpectPallet: sts.enumStruct({
            index: sts.number(),
            name: sts.bytes(),
            moduleName: sts.bytes(),
            crateMajor: sts.number(),
            minCrateMinor: sts.number(),
        }),
        ExpectTransactStatus: V3MaybeErrorCode,
        ExportMessage: sts.enumStruct({
            network: V5NetworkId,
            destination: V5Junctions,
            xcm: sts.array(() => V5Instruction),
        }),
        HrmpChannelAccepted: sts.enumStruct({
            recipient: sts.number(),
        }),
        HrmpChannelClosing: sts.enumStruct({
            initiator: sts.number(),
            sender: sts.number(),
            recipient: sts.number(),
        }),
        HrmpNewChannelOpenRequest: sts.enumStruct({
            sender: sts.number(),
            maxMessageSize: sts.number(),
            maxCapacity: sts.number(),
        }),
        InitiateReserveWithdraw: sts.enumStruct({
            assets: V5AssetFilter,
            reserve: V5Location,
            xcm: sts.array(() => V5Instruction),
        }),
        InitiateTeleport: sts.enumStruct({
            assets: V5AssetFilter,
            dest: V5Location,
            xcm: sts.array(() => V5Instruction),
        }),
        InitiateTransfer: sts.enumStruct({
            destination: V5Location,
            remoteFees: sts.option(() => V5AssetTransferFilter),
            preserveOrigin: sts.boolean(),
            assets: sts.array(() => V5AssetTransferFilter),
            remoteXcm: sts.array(() => V5Instruction),
        }),
        LockAsset: sts.enumStruct({
            asset: V5Asset,
            unlocker: V5Location,
        }),
        NoteUnlockable: sts.enumStruct({
            asset: V5Asset,
            owner: V5Location,
        }),
        PayFees: sts.enumStruct({
            asset: V5Asset,
        }),
        QueryPallet: sts.enumStruct({
            moduleName: sts.bytes(),
            responseInfo: V5QueryResponseInfo,
        }),
        QueryResponse: sts.enumStruct({
            queryId: sts.bigint(),
            response: V5Response,
            maxWeight: Weight,
            querier: sts.option(() => V5Location),
        }),
        ReceiveTeleportedAsset: sts.array(() => V5Asset),
        RefundSurplus: sts.unit(),
        ReportError: V5QueryResponseInfo,
        ReportHolding: sts.enumStruct({
            responseInfo: V5QueryResponseInfo,
            assets: V5AssetFilter,
        }),
        ReportTransactStatus: V5QueryResponseInfo,
        RequestUnlock: sts.enumStruct({
            asset: V5Asset,
            locker: V5Location,
        }),
        ReserveAssetDeposited: sts.array(() => V5Asset),
        SetAppendix: sts.array(() => Type_475),
        SetErrorHandler: sts.array(() => Type_475),
        SetFeesMode: sts.enumStruct({
            jitWithdraw: sts.boolean(),
        }),
        SetHints: sts.enumStruct({
            hints: sts.array(() => V5Hint),
        }),
        SetTopic: sts.bytes(),
        SubscribeVersion: sts.enumStruct({
            queryId: sts.bigint(),
            maxResponseWeight: Weight,
        }),
        Transact: sts.enumStruct({
            originKind: V3OriginKind,
            fallbackMaxWeight: sts.option(() => Weight),
            call: Type_469,
        }),
        TransferAsset: sts.enumStruct({
            assets: sts.array(() => V5Asset),
            beneficiary: V5Location,
        }),
        TransferReserveAsset: sts.enumStruct({
            assets: sts.array(() => V5Asset),
            dest: V5Location,
            xcm: sts.array(() => V5Instruction),
        }),
        Trap: sts.bigint(),
        UniversalOrigin: V5Junction,
        UnlockAsset: sts.enumStruct({
            asset: V5Asset,
            target: V5Location,
        }),
        UnpaidExecution: sts.enumStruct({
            weightLimit: V3WeightLimit,
            checkOrigin: sts.option(() => V5Location),
        }),
        UnsubscribeVersion: sts.unit(),
        WithdrawAsset: sts.array(() => V5Asset),
    }
})

export const Type_469: sts.Type<Type_469> = sts.struct(() => {
    return  {
        encoded: sts.bytes(),
    }
})

export interface Type_469 {
    encoded: Bytes
}

export type Type_475 = Type_475_AliasOrigin | Type_475_BurnAsset | Type_475_BuyExecution | Type_475_ClaimAsset | Type_475_ClearError | Type_475_ClearOrigin | Type_475_ClearTopic | Type_475_ClearTransactStatus | Type_475_DepositAsset | Type_475_DepositReserveAsset | Type_475_DescendOrigin | Type_475_ExchangeAsset | Type_475_ExecuteWithOrigin | Type_475_ExpectAsset | Type_475_ExpectError | Type_475_ExpectOrigin | Type_475_ExpectPallet | Type_475_ExpectTransactStatus | Type_475_ExportMessage | Type_475_HrmpChannelAccepted | Type_475_HrmpChannelClosing | Type_475_HrmpNewChannelOpenRequest | Type_475_InitiateReserveWithdraw | Type_475_InitiateTeleport | Type_475_InitiateTransfer | Type_475_LockAsset | Type_475_NoteUnlockable | Type_475_PayFees | Type_475_QueryPallet | Type_475_QueryResponse | Type_475_ReceiveTeleportedAsset | Type_475_RefundSurplus | Type_475_ReportError | Type_475_ReportHolding | Type_475_ReportTransactStatus | Type_475_RequestUnlock | Type_475_ReserveAssetDeposited | Type_475_SetAppendix | Type_475_SetErrorHandler | Type_475_SetFeesMode | Type_475_SetHints | Type_475_SetTopic | Type_475_SubscribeVersion | Type_475_Transact | Type_475_TransferAsset | Type_475_TransferReserveAsset | Type_475_Trap | Type_475_UniversalOrigin | Type_475_UnlockAsset | Type_475_UnpaidExecution | Type_475_UnsubscribeVersion | Type_475_WithdrawAsset

export interface Type_475_AliasOrigin {
    __kind: 'AliasOrigin'
    value: V5Location
}

export interface Type_475_BurnAsset {
    __kind: 'BurnAsset'
    value: V5Asset[]
}

export interface Type_475_BuyExecution {
    __kind: 'BuyExecution'
    fees: V5Asset
    weightLimit: V3WeightLimit
}

export interface Type_475_ClaimAsset {
    __kind: 'ClaimAsset'
    assets: V5Asset[]
    ticket: V5Location
}

export interface Type_475_ClearError {
    __kind: 'ClearError'
}

export interface Type_475_ClearOrigin {
    __kind: 'ClearOrigin'
}

export interface Type_475_ClearTopic {
    __kind: 'ClearTopic'
}

export interface Type_475_ClearTransactStatus {
    __kind: 'ClearTransactStatus'
}

export interface Type_475_DepositAsset {
    __kind: 'DepositAsset'
    assets: V5AssetFilter
    beneficiary: V5Location
}

export interface Type_475_DepositReserveAsset {
    __kind: 'DepositReserveAsset'
    assets: V5AssetFilter
    dest: V5Location
    xcm: V5Instruction[]
}

export interface Type_475_DescendOrigin {
    __kind: 'DescendOrigin'
    value: V5Junctions
}

export interface Type_475_ExchangeAsset {
    __kind: 'ExchangeAsset'
    give: V5AssetFilter
    want: V5Asset[]
    maximal: boolean
}

export interface Type_475_ExecuteWithOrigin {
    __kind: 'ExecuteWithOrigin'
    descendantOrigin?: (V5Junctions | undefined)
    xcm: Type_475[]
}

export interface Type_475_ExpectAsset {
    __kind: 'ExpectAsset'
    value: V5Asset[]
}

export interface Type_475_ExpectError {
    __kind: 'ExpectError'
    value?: ([number, V5Error] | undefined)
}

export interface Type_475_ExpectOrigin {
    __kind: 'ExpectOrigin'
    value?: (V5Location | undefined)
}

export interface Type_475_ExpectPallet {
    __kind: 'ExpectPallet'
    index: number
    name: Bytes
    moduleName: Bytes
    crateMajor: number
    minCrateMinor: number
}

export interface Type_475_ExpectTransactStatus {
    __kind: 'ExpectTransactStatus'
    value: V3MaybeErrorCode
}

export interface Type_475_ExportMessage {
    __kind: 'ExportMessage'
    network: V5NetworkId
    destination: V5Junctions
    xcm: V5Instruction[]
}

export interface Type_475_HrmpChannelAccepted {
    __kind: 'HrmpChannelAccepted'
    recipient: number
}

export interface Type_475_HrmpChannelClosing {
    __kind: 'HrmpChannelClosing'
    initiator: number
    sender: number
    recipient: number
}

export interface Type_475_HrmpNewChannelOpenRequest {
    __kind: 'HrmpNewChannelOpenRequest'
    sender: number
    maxMessageSize: number
    maxCapacity: number
}

export interface Type_475_InitiateReserveWithdraw {
    __kind: 'InitiateReserveWithdraw'
    assets: V5AssetFilter
    reserve: V5Location
    xcm: V5Instruction[]
}

export interface Type_475_InitiateTeleport {
    __kind: 'InitiateTeleport'
    assets: V5AssetFilter
    dest: V5Location
    xcm: V5Instruction[]
}

export interface Type_475_InitiateTransfer {
    __kind: 'InitiateTransfer'
    destination: V5Location
    remoteFees?: (V5AssetTransferFilter | undefined)
    preserveOrigin: boolean
    assets: V5AssetTransferFilter[]
    remoteXcm: V5Instruction[]
}

export interface Type_475_LockAsset {
    __kind: 'LockAsset'
    asset: V5Asset
    unlocker: V5Location
}

export interface Type_475_NoteUnlockable {
    __kind: 'NoteUnlockable'
    asset: V5Asset
    owner: V5Location
}

export interface Type_475_PayFees {
    __kind: 'PayFees'
    asset: V5Asset
}

export interface Type_475_QueryPallet {
    __kind: 'QueryPallet'
    moduleName: Bytes
    responseInfo: V5QueryResponseInfo
}

export interface Type_475_QueryResponse {
    __kind: 'QueryResponse'
    queryId: bigint
    response: V5Response
    maxWeight: Weight
    querier?: (V5Location | undefined)
}

export interface Type_475_ReceiveTeleportedAsset {
    __kind: 'ReceiveTeleportedAsset'
    value: V5Asset[]
}

export interface Type_475_RefundSurplus {
    __kind: 'RefundSurplus'
}

export interface Type_475_ReportError {
    __kind: 'ReportError'
    value: V5QueryResponseInfo
}

export interface Type_475_ReportHolding {
    __kind: 'ReportHolding'
    responseInfo: V5QueryResponseInfo
    assets: V5AssetFilter
}

export interface Type_475_ReportTransactStatus {
    __kind: 'ReportTransactStatus'
    value: V5QueryResponseInfo
}

export interface Type_475_RequestUnlock {
    __kind: 'RequestUnlock'
    asset: V5Asset
    locker: V5Location
}

export interface Type_475_ReserveAssetDeposited {
    __kind: 'ReserveAssetDeposited'
    value: V5Asset[]
}

export interface Type_475_SetAppendix {
    __kind: 'SetAppendix'
    value: Type_475[]
}

export interface Type_475_SetErrorHandler {
    __kind: 'SetErrorHandler'
    value: Type_475[]
}

export interface Type_475_SetFeesMode {
    __kind: 'SetFeesMode'
    jitWithdraw: boolean
}

export interface Type_475_SetHints {
    __kind: 'SetHints'
    hints: V5Hint[]
}

export interface Type_475_SetTopic {
    __kind: 'SetTopic'
    value: Bytes
}

export interface Type_475_SubscribeVersion {
    __kind: 'SubscribeVersion'
    queryId: bigint
    maxResponseWeight: Weight
}

export interface Type_475_Transact {
    __kind: 'Transact'
    originKind: V3OriginKind
    fallbackMaxWeight?: (Weight | undefined)
    call: Type_469
}

export interface Type_475_TransferAsset {
    __kind: 'TransferAsset'
    assets: V5Asset[]
    beneficiary: V5Location
}

export interface Type_475_TransferReserveAsset {
    __kind: 'TransferReserveAsset'
    assets: V5Asset[]
    dest: V5Location
    xcm: V5Instruction[]
}

export interface Type_475_Trap {
    __kind: 'Trap'
    value: bigint
}

export interface Type_475_UniversalOrigin {
    __kind: 'UniversalOrigin'
    value: V5Junction
}

export interface Type_475_UnlockAsset {
    __kind: 'UnlockAsset'
    asset: V5Asset
    target: V5Location
}

export interface Type_475_UnpaidExecution {
    __kind: 'UnpaidExecution'
    weightLimit: V3WeightLimit
    checkOrigin?: (V5Location | undefined)
}

export interface Type_475_UnsubscribeVersion {
    __kind: 'UnsubscribeVersion'
}

export interface Type_475_WithdrawAsset {
    __kind: 'WithdrawAsset'
    value: V5Asset[]
}

export const Type_472: sts.Type<Type_472> = sts.closedEnum(() => {
    return  {
        AliasOrigin: V4Location,
        BurnAsset: sts.array(() => V4Asset),
        BuyExecution: sts.enumStruct({
            fees: V4Asset,
            weightLimit: V3WeightLimit,
        }),
        ClaimAsset: sts.enumStruct({
            assets: sts.array(() => V4Asset),
            ticket: V4Location,
        }),
        ClearError: sts.unit(),
        ClearOrigin: sts.unit(),
        ClearTopic: sts.unit(),
        ClearTransactStatus: sts.unit(),
        DepositAsset: sts.enumStruct({
            assets: V4AssetFilter,
            beneficiary: V4Location,
        }),
        DepositReserveAsset: sts.enumStruct({
            assets: V4AssetFilter,
            dest: V4Location,
            xcm: sts.array(() => V4Instruction),
        }),
        DescendOrigin: V4Junctions,
        ExchangeAsset: sts.enumStruct({
            give: V4AssetFilter,
            want: sts.array(() => V4Asset),
            maximal: sts.boolean(),
        }),
        ExpectAsset: sts.array(() => V4Asset),
        ExpectError: sts.option(() => sts.tuple(() => [sts.number(), V3Error])),
        ExpectOrigin: sts.option(() => V4Location),
        ExpectPallet: sts.enumStruct({
            index: sts.number(),
            name: sts.bytes(),
            moduleName: sts.bytes(),
            crateMajor: sts.number(),
            minCrateMinor: sts.number(),
        }),
        ExpectTransactStatus: V3MaybeErrorCode,
        ExportMessage: sts.enumStruct({
            network: V4NetworkId,
            destination: V4Junctions,
            xcm: sts.array(() => V4Instruction),
        }),
        HrmpChannelAccepted: sts.enumStruct({
            recipient: sts.number(),
        }),
        HrmpChannelClosing: sts.enumStruct({
            initiator: sts.number(),
            sender: sts.number(),
            recipient: sts.number(),
        }),
        HrmpNewChannelOpenRequest: sts.enumStruct({
            sender: sts.number(),
            maxMessageSize: sts.number(),
            maxCapacity: sts.number(),
        }),
        InitiateReserveWithdraw: sts.enumStruct({
            assets: V4AssetFilter,
            reserve: V4Location,
            xcm: sts.array(() => V4Instruction),
        }),
        InitiateTeleport: sts.enumStruct({
            assets: V4AssetFilter,
            dest: V4Location,
            xcm: sts.array(() => V4Instruction),
        }),
        LockAsset: sts.enumStruct({
            asset: V4Asset,
            unlocker: V4Location,
        }),
        NoteUnlockable: sts.enumStruct({
            asset: V4Asset,
            owner: V4Location,
        }),
        QueryPallet: sts.enumStruct({
            moduleName: sts.bytes(),
            responseInfo: V4QueryResponseInfo,
        }),
        QueryResponse: sts.enumStruct({
            queryId: sts.bigint(),
            response: V4Response,
            maxWeight: Weight,
            querier: sts.option(() => V4Location),
        }),
        ReceiveTeleportedAsset: sts.array(() => V4Asset),
        RefundSurplus: sts.unit(),
        ReportError: V4QueryResponseInfo,
        ReportHolding: sts.enumStruct({
            responseInfo: V4QueryResponseInfo,
            assets: V4AssetFilter,
        }),
        ReportTransactStatus: V4QueryResponseInfo,
        RequestUnlock: sts.enumStruct({
            asset: V4Asset,
            locker: V4Location,
        }),
        ReserveAssetDeposited: sts.array(() => V4Asset),
        SetAppendix: sts.array(() => Type_472),
        SetErrorHandler: sts.array(() => Type_472),
        SetFeesMode: sts.enumStruct({
            jitWithdraw: sts.boolean(),
        }),
        SetTopic: sts.bytes(),
        SubscribeVersion: sts.enumStruct({
            queryId: sts.bigint(),
            maxResponseWeight: Weight,
        }),
        Transact: sts.enumStruct({
            originKind: V3OriginKind,
            requireWeightAtMost: Weight,
            call: Type_469,
        }),
        TransferAsset: sts.enumStruct({
            assets: sts.array(() => V4Asset),
            beneficiary: V4Location,
        }),
        TransferReserveAsset: sts.enumStruct({
            assets: sts.array(() => V4Asset),
            dest: V4Location,
            xcm: sts.array(() => V4Instruction),
        }),
        Trap: sts.bigint(),
        UniversalOrigin: V4Junction,
        UnlockAsset: sts.enumStruct({
            asset: V4Asset,
            target: V4Location,
        }),
        UnpaidExecution: sts.enumStruct({
            weightLimit: V3WeightLimit,
            checkOrigin: sts.option(() => V4Location),
        }),
        UnsubscribeVersion: sts.unit(),
        WithdrawAsset: sts.array(() => V4Asset),
    }
})

export type Type_472 = Type_472_AliasOrigin | Type_472_BurnAsset | Type_472_BuyExecution | Type_472_ClaimAsset | Type_472_ClearError | Type_472_ClearOrigin | Type_472_ClearTopic | Type_472_ClearTransactStatus | Type_472_DepositAsset | Type_472_DepositReserveAsset | Type_472_DescendOrigin | Type_472_ExchangeAsset | Type_472_ExpectAsset | Type_472_ExpectError | Type_472_ExpectOrigin | Type_472_ExpectPallet | Type_472_ExpectTransactStatus | Type_472_ExportMessage | Type_472_HrmpChannelAccepted | Type_472_HrmpChannelClosing | Type_472_HrmpNewChannelOpenRequest | Type_472_InitiateReserveWithdraw | Type_472_InitiateTeleport | Type_472_LockAsset | Type_472_NoteUnlockable | Type_472_QueryPallet | Type_472_QueryResponse | Type_472_ReceiveTeleportedAsset | Type_472_RefundSurplus | Type_472_ReportError | Type_472_ReportHolding | Type_472_ReportTransactStatus | Type_472_RequestUnlock | Type_472_ReserveAssetDeposited | Type_472_SetAppendix | Type_472_SetErrorHandler | Type_472_SetFeesMode | Type_472_SetTopic | Type_472_SubscribeVersion | Type_472_Transact | Type_472_TransferAsset | Type_472_TransferReserveAsset | Type_472_Trap | Type_472_UniversalOrigin | Type_472_UnlockAsset | Type_472_UnpaidExecution | Type_472_UnsubscribeVersion | Type_472_WithdrawAsset

export interface Type_472_AliasOrigin {
    __kind: 'AliasOrigin'
    value: V4Location
}

export interface Type_472_BurnAsset {
    __kind: 'BurnAsset'
    value: V4Asset[]
}

export interface Type_472_BuyExecution {
    __kind: 'BuyExecution'
    fees: V4Asset
    weightLimit: V3WeightLimit
}

export interface Type_472_ClaimAsset {
    __kind: 'ClaimAsset'
    assets: V4Asset[]
    ticket: V4Location
}

export interface Type_472_ClearError {
    __kind: 'ClearError'
}

export interface Type_472_ClearOrigin {
    __kind: 'ClearOrigin'
}

export interface Type_472_ClearTopic {
    __kind: 'ClearTopic'
}

export interface Type_472_ClearTransactStatus {
    __kind: 'ClearTransactStatus'
}

export interface Type_472_DepositAsset {
    __kind: 'DepositAsset'
    assets: V4AssetFilter
    beneficiary: V4Location
}

export interface Type_472_DepositReserveAsset {
    __kind: 'DepositReserveAsset'
    assets: V4AssetFilter
    dest: V4Location
    xcm: V4Instruction[]
}

export interface Type_472_DescendOrigin {
    __kind: 'DescendOrigin'
    value: V4Junctions
}

export interface Type_472_ExchangeAsset {
    __kind: 'ExchangeAsset'
    give: V4AssetFilter
    want: V4Asset[]
    maximal: boolean
}

export interface Type_472_ExpectAsset {
    __kind: 'ExpectAsset'
    value: V4Asset[]
}

export interface Type_472_ExpectError {
    __kind: 'ExpectError'
    value?: ([number, V3Error] | undefined)
}

export interface Type_472_ExpectOrigin {
    __kind: 'ExpectOrigin'
    value?: (V4Location | undefined)
}

export interface Type_472_ExpectPallet {
    __kind: 'ExpectPallet'
    index: number
    name: Bytes
    moduleName: Bytes
    crateMajor: number
    minCrateMinor: number
}

export interface Type_472_ExpectTransactStatus {
    __kind: 'ExpectTransactStatus'
    value: V3MaybeErrorCode
}

export interface Type_472_ExportMessage {
    __kind: 'ExportMessage'
    network: V4NetworkId
    destination: V4Junctions
    xcm: V4Instruction[]
}

export interface Type_472_HrmpChannelAccepted {
    __kind: 'HrmpChannelAccepted'
    recipient: number
}

export interface Type_472_HrmpChannelClosing {
    __kind: 'HrmpChannelClosing'
    initiator: number
    sender: number
    recipient: number
}

export interface Type_472_HrmpNewChannelOpenRequest {
    __kind: 'HrmpNewChannelOpenRequest'
    sender: number
    maxMessageSize: number
    maxCapacity: number
}

export interface Type_472_InitiateReserveWithdraw {
    __kind: 'InitiateReserveWithdraw'
    assets: V4AssetFilter
    reserve: V4Location
    xcm: V4Instruction[]
}

export interface Type_472_InitiateTeleport {
    __kind: 'InitiateTeleport'
    assets: V4AssetFilter
    dest: V4Location
    xcm: V4Instruction[]
}

export interface Type_472_LockAsset {
    __kind: 'LockAsset'
    asset: V4Asset
    unlocker: V4Location
}

export interface Type_472_NoteUnlockable {
    __kind: 'NoteUnlockable'
    asset: V4Asset
    owner: V4Location
}

export interface Type_472_QueryPallet {
    __kind: 'QueryPallet'
    moduleName: Bytes
    responseInfo: V4QueryResponseInfo
}

export interface Type_472_QueryResponse {
    __kind: 'QueryResponse'
    queryId: bigint
    response: V4Response
    maxWeight: Weight
    querier?: (V4Location | undefined)
}

export interface Type_472_ReceiveTeleportedAsset {
    __kind: 'ReceiveTeleportedAsset'
    value: V4Asset[]
}

export interface Type_472_RefundSurplus {
    __kind: 'RefundSurplus'
}

export interface Type_472_ReportError {
    __kind: 'ReportError'
    value: V4QueryResponseInfo
}

export interface Type_472_ReportHolding {
    __kind: 'ReportHolding'
    responseInfo: V4QueryResponseInfo
    assets: V4AssetFilter
}

export interface Type_472_ReportTransactStatus {
    __kind: 'ReportTransactStatus'
    value: V4QueryResponseInfo
}

export interface Type_472_RequestUnlock {
    __kind: 'RequestUnlock'
    asset: V4Asset
    locker: V4Location
}

export interface Type_472_ReserveAssetDeposited {
    __kind: 'ReserveAssetDeposited'
    value: V4Asset[]
}

export interface Type_472_SetAppendix {
    __kind: 'SetAppendix'
    value: Type_472[]
}

export interface Type_472_SetErrorHandler {
    __kind: 'SetErrorHandler'
    value: Type_472[]
}

export interface Type_472_SetFeesMode {
    __kind: 'SetFeesMode'
    jitWithdraw: boolean
}

export interface Type_472_SetTopic {
    __kind: 'SetTopic'
    value: Bytes
}

export interface Type_472_SubscribeVersion {
    __kind: 'SubscribeVersion'
    queryId: bigint
    maxResponseWeight: Weight
}

export interface Type_472_Transact {
    __kind: 'Transact'
    originKind: V3OriginKind
    requireWeightAtMost: Weight
    call: Type_469
}

export interface Type_472_TransferAsset {
    __kind: 'TransferAsset'
    assets: V4Asset[]
    beneficiary: V4Location
}

export interface Type_472_TransferReserveAsset {
    __kind: 'TransferReserveAsset'
    assets: V4Asset[]
    dest: V4Location
    xcm: V4Instruction[]
}

export interface Type_472_Trap {
    __kind: 'Trap'
    value: bigint
}

export interface Type_472_UniversalOrigin {
    __kind: 'UniversalOrigin'
    value: V4Junction
}

export interface Type_472_UnlockAsset {
    __kind: 'UnlockAsset'
    asset: V4Asset
    target: V4Location
}

export interface Type_472_UnpaidExecution {
    __kind: 'UnpaidExecution'
    weightLimit: V3WeightLimit
    checkOrigin?: (V4Location | undefined)
}

export interface Type_472_UnsubscribeVersion {
    __kind: 'UnsubscribeVersion'
}

export interface Type_472_WithdrawAsset {
    __kind: 'WithdrawAsset'
    value: V4Asset[]
}

export const Type_468: sts.Type<Type_468> = sts.closedEnum(() => {
    return  {
        AliasOrigin: V3MultiLocation,
        BurnAsset: sts.array(() => V3MultiAsset),
        BuyExecution: sts.enumStruct({
            fees: V3MultiAsset,
            weightLimit: V3WeightLimit,
        }),
        ClaimAsset: sts.enumStruct({
            assets: sts.array(() => V3MultiAsset),
            ticket: V3MultiLocation,
        }),
        ClearError: sts.unit(),
        ClearOrigin: sts.unit(),
        ClearTopic: sts.unit(),
        ClearTransactStatus: sts.unit(),
        DepositAsset: sts.enumStruct({
            assets: V3MultiAssetFilter,
            beneficiary: V3MultiLocation,
        }),
        DepositReserveAsset: sts.enumStruct({
            assets: V3MultiAssetFilter,
            dest: V3MultiLocation,
            xcm: sts.array(() => V3Instruction),
        }),
        DescendOrigin: V3Junctions,
        ExchangeAsset: sts.enumStruct({
            give: V3MultiAssetFilter,
            want: sts.array(() => V3MultiAsset),
            maximal: sts.boolean(),
        }),
        ExpectAsset: sts.array(() => V3MultiAsset),
        ExpectError: sts.option(() => sts.tuple(() => [sts.number(), V3Error])),
        ExpectOrigin: sts.option(() => V3MultiLocation),
        ExpectPallet: sts.enumStruct({
            index: sts.number(),
            name: sts.bytes(),
            moduleName: sts.bytes(),
            crateMajor: sts.number(),
            minCrateMinor: sts.number(),
        }),
        ExpectTransactStatus: V3MaybeErrorCode,
        ExportMessage: sts.enumStruct({
            network: V3NetworkId,
            destination: V3Junctions,
            xcm: sts.array(() => V3Instruction),
        }),
        HrmpChannelAccepted: sts.enumStruct({
            recipient: sts.number(),
        }),
        HrmpChannelClosing: sts.enumStruct({
            initiator: sts.number(),
            sender: sts.number(),
            recipient: sts.number(),
        }),
        HrmpNewChannelOpenRequest: sts.enumStruct({
            sender: sts.number(),
            maxMessageSize: sts.number(),
            maxCapacity: sts.number(),
        }),
        InitiateReserveWithdraw: sts.enumStruct({
            assets: V3MultiAssetFilter,
            reserve: V3MultiLocation,
            xcm: sts.array(() => V3Instruction),
        }),
        InitiateTeleport: sts.enumStruct({
            assets: V3MultiAssetFilter,
            dest: V3MultiLocation,
            xcm: sts.array(() => V3Instruction),
        }),
        LockAsset: sts.enumStruct({
            asset: V3MultiAsset,
            unlocker: V3MultiLocation,
        }),
        NoteUnlockable: sts.enumStruct({
            asset: V3MultiAsset,
            owner: V3MultiLocation,
        }),
        QueryPallet: sts.enumStruct({
            moduleName: sts.bytes(),
            responseInfo: V3QueryResponseInfo,
        }),
        QueryResponse: sts.enumStruct({
            queryId: sts.bigint(),
            response: V3Response,
            maxWeight: Weight,
            querier: sts.option(() => V3MultiLocation),
        }),
        ReceiveTeleportedAsset: sts.array(() => V3MultiAsset),
        RefundSurplus: sts.unit(),
        ReportError: V3QueryResponseInfo,
        ReportHolding: sts.enumStruct({
            responseInfo: V3QueryResponseInfo,
            assets: V3MultiAssetFilter,
        }),
        ReportTransactStatus: V3QueryResponseInfo,
        RequestUnlock: sts.enumStruct({
            asset: V3MultiAsset,
            locker: V3MultiLocation,
        }),
        ReserveAssetDeposited: sts.array(() => V3MultiAsset),
        SetAppendix: sts.array(() => Type_468),
        SetErrorHandler: sts.array(() => Type_468),
        SetFeesMode: sts.enumStruct({
            jitWithdraw: sts.boolean(),
        }),
        SetTopic: sts.bytes(),
        SubscribeVersion: sts.enumStruct({
            queryId: sts.bigint(),
            maxResponseWeight: Weight,
        }),
        Transact: sts.enumStruct({
            originKind: V3OriginKind,
            requireWeightAtMost: Weight,
            call: Type_469,
        }),
        TransferAsset: sts.enumStruct({
            assets: sts.array(() => V3MultiAsset),
            beneficiary: V3MultiLocation,
        }),
        TransferReserveAsset: sts.enumStruct({
            assets: sts.array(() => V3MultiAsset),
            dest: V3MultiLocation,
            xcm: sts.array(() => V3Instruction),
        }),
        Trap: sts.bigint(),
        UniversalOrigin: V3Junction,
        UnlockAsset: sts.enumStruct({
            asset: V3MultiAsset,
            target: V3MultiLocation,
        }),
        UnpaidExecution: sts.enumStruct({
            weightLimit: V3WeightLimit,
            checkOrigin: sts.option(() => V3MultiLocation),
        }),
        UnsubscribeVersion: sts.unit(),
        WithdrawAsset: sts.array(() => V3MultiAsset),
    }
})

export type Type_468 = Type_468_AliasOrigin | Type_468_BurnAsset | Type_468_BuyExecution | Type_468_ClaimAsset | Type_468_ClearError | Type_468_ClearOrigin | Type_468_ClearTopic | Type_468_ClearTransactStatus | Type_468_DepositAsset | Type_468_DepositReserveAsset | Type_468_DescendOrigin | Type_468_ExchangeAsset | Type_468_ExpectAsset | Type_468_ExpectError | Type_468_ExpectOrigin | Type_468_ExpectPallet | Type_468_ExpectTransactStatus | Type_468_ExportMessage | Type_468_HrmpChannelAccepted | Type_468_HrmpChannelClosing | Type_468_HrmpNewChannelOpenRequest | Type_468_InitiateReserveWithdraw | Type_468_InitiateTeleport | Type_468_LockAsset | Type_468_NoteUnlockable | Type_468_QueryPallet | Type_468_QueryResponse | Type_468_ReceiveTeleportedAsset | Type_468_RefundSurplus | Type_468_ReportError | Type_468_ReportHolding | Type_468_ReportTransactStatus | Type_468_RequestUnlock | Type_468_ReserveAssetDeposited | Type_468_SetAppendix | Type_468_SetErrorHandler | Type_468_SetFeesMode | Type_468_SetTopic | Type_468_SubscribeVersion | Type_468_Transact | Type_468_TransferAsset | Type_468_TransferReserveAsset | Type_468_Trap | Type_468_UniversalOrigin | Type_468_UnlockAsset | Type_468_UnpaidExecution | Type_468_UnsubscribeVersion | Type_468_WithdrawAsset

export interface Type_468_AliasOrigin {
    __kind: 'AliasOrigin'
    value: V3MultiLocation
}

export interface Type_468_BurnAsset {
    __kind: 'BurnAsset'
    value: V3MultiAsset[]
}

export interface Type_468_BuyExecution {
    __kind: 'BuyExecution'
    fees: V3MultiAsset
    weightLimit: V3WeightLimit
}

export interface Type_468_ClaimAsset {
    __kind: 'ClaimAsset'
    assets: V3MultiAsset[]
    ticket: V3MultiLocation
}

export interface Type_468_ClearError {
    __kind: 'ClearError'
}

export interface Type_468_ClearOrigin {
    __kind: 'ClearOrigin'
}

export interface Type_468_ClearTopic {
    __kind: 'ClearTopic'
}

export interface Type_468_ClearTransactStatus {
    __kind: 'ClearTransactStatus'
}

export interface Type_468_DepositAsset {
    __kind: 'DepositAsset'
    assets: V3MultiAssetFilter
    beneficiary: V3MultiLocation
}

export interface Type_468_DepositReserveAsset {
    __kind: 'DepositReserveAsset'
    assets: V3MultiAssetFilter
    dest: V3MultiLocation
    xcm: V3Instruction[]
}

export interface Type_468_DescendOrigin {
    __kind: 'DescendOrigin'
    value: V3Junctions
}

export interface Type_468_ExchangeAsset {
    __kind: 'ExchangeAsset'
    give: V3MultiAssetFilter
    want: V3MultiAsset[]
    maximal: boolean
}

export interface Type_468_ExpectAsset {
    __kind: 'ExpectAsset'
    value: V3MultiAsset[]
}

export interface Type_468_ExpectError {
    __kind: 'ExpectError'
    value?: ([number, V3Error] | undefined)
}

export interface Type_468_ExpectOrigin {
    __kind: 'ExpectOrigin'
    value?: (V3MultiLocation | undefined)
}

export interface Type_468_ExpectPallet {
    __kind: 'ExpectPallet'
    index: number
    name: Bytes
    moduleName: Bytes
    crateMajor: number
    minCrateMinor: number
}

export interface Type_468_ExpectTransactStatus {
    __kind: 'ExpectTransactStatus'
    value: V3MaybeErrorCode
}

export interface Type_468_ExportMessage {
    __kind: 'ExportMessage'
    network: V3NetworkId
    destination: V3Junctions
    xcm: V3Instruction[]
}

export interface Type_468_HrmpChannelAccepted {
    __kind: 'HrmpChannelAccepted'
    recipient: number
}

export interface Type_468_HrmpChannelClosing {
    __kind: 'HrmpChannelClosing'
    initiator: number
    sender: number
    recipient: number
}

export interface Type_468_HrmpNewChannelOpenRequest {
    __kind: 'HrmpNewChannelOpenRequest'
    sender: number
    maxMessageSize: number
    maxCapacity: number
}

export interface Type_468_InitiateReserveWithdraw {
    __kind: 'InitiateReserveWithdraw'
    assets: V3MultiAssetFilter
    reserve: V3MultiLocation
    xcm: V3Instruction[]
}

export interface Type_468_InitiateTeleport {
    __kind: 'InitiateTeleport'
    assets: V3MultiAssetFilter
    dest: V3MultiLocation
    xcm: V3Instruction[]
}

export interface Type_468_LockAsset {
    __kind: 'LockAsset'
    asset: V3MultiAsset
    unlocker: V3MultiLocation
}

export interface Type_468_NoteUnlockable {
    __kind: 'NoteUnlockable'
    asset: V3MultiAsset
    owner: V3MultiLocation
}

export interface Type_468_QueryPallet {
    __kind: 'QueryPallet'
    moduleName: Bytes
    responseInfo: V3QueryResponseInfo
}

export interface Type_468_QueryResponse {
    __kind: 'QueryResponse'
    queryId: bigint
    response: V3Response
    maxWeight: Weight
    querier?: (V3MultiLocation | undefined)
}

export interface Type_468_ReceiveTeleportedAsset {
    __kind: 'ReceiveTeleportedAsset'
    value: V3MultiAsset[]
}

export interface Type_468_RefundSurplus {
    __kind: 'RefundSurplus'
}

export interface Type_468_ReportError {
    __kind: 'ReportError'
    value: V3QueryResponseInfo
}

export interface Type_468_ReportHolding {
    __kind: 'ReportHolding'
    responseInfo: V3QueryResponseInfo
    assets: V3MultiAssetFilter
}

export interface Type_468_ReportTransactStatus {
    __kind: 'ReportTransactStatus'
    value: V3QueryResponseInfo
}

export interface Type_468_RequestUnlock {
    __kind: 'RequestUnlock'
    asset: V3MultiAsset
    locker: V3MultiLocation
}

export interface Type_468_ReserveAssetDeposited {
    __kind: 'ReserveAssetDeposited'
    value: V3MultiAsset[]
}

export interface Type_468_SetAppendix {
    __kind: 'SetAppendix'
    value: Type_468[]
}

export interface Type_468_SetErrorHandler {
    __kind: 'SetErrorHandler'
    value: Type_468[]
}

export interface Type_468_SetFeesMode {
    __kind: 'SetFeesMode'
    jitWithdraw: boolean
}

export interface Type_468_SetTopic {
    __kind: 'SetTopic'
    value: Bytes
}

export interface Type_468_SubscribeVersion {
    __kind: 'SubscribeVersion'
    queryId: bigint
    maxResponseWeight: Weight
}

export interface Type_468_Transact {
    __kind: 'Transact'
    originKind: V3OriginKind
    requireWeightAtMost: Weight
    call: Type_469
}

export interface Type_468_TransferAsset {
    __kind: 'TransferAsset'
    assets: V3MultiAsset[]
    beneficiary: V3MultiLocation
}

export interface Type_468_TransferReserveAsset {
    __kind: 'TransferReserveAsset'
    assets: V3MultiAsset[]
    dest: V3MultiLocation
    xcm: V3Instruction[]
}

export interface Type_468_Trap {
    __kind: 'Trap'
    value: bigint
}

export interface Type_468_UniversalOrigin {
    __kind: 'UniversalOrigin'
    value: V3Junction
}

export interface Type_468_UnlockAsset {
    __kind: 'UnlockAsset'
    asset: V3MultiAsset
    target: V3MultiLocation
}

export interface Type_468_UnpaidExecution {
    __kind: 'UnpaidExecution'
    weightLimit: V3WeightLimit
    checkOrigin?: (V3MultiLocation | undefined)
}

export interface Type_468_UnsubscribeVersion {
    __kind: 'UnsubscribeVersion'
}

export interface Type_468_WithdrawAsset {
    __kind: 'WithdrawAsset'
    value: V3MultiAsset[]
}

export type Type_465 = Type_465_V3 | Type_465_V4 | Type_465_V5

export interface Type_465_V3 {
    __kind: 'V3'
    value: Type_468[]
}

export interface Type_465_V4 {
    __kind: 'V4'
    value: Type_472[]
}

export interface Type_465_V5 {
    __kind: 'V5'
    value: Type_475[]
}

export const VersionedAssets: sts.Type<VersionedAssets> = sts.closedEnum(() => {
    return  {
        V3: sts.array(() => V3MultiAsset),
        V4: sts.array(() => V4Asset),
        V5: sts.array(() => V5Asset),
    }
})

export type VersionedAssets = VersionedAssets_V3 | VersionedAssets_V4 | VersionedAssets_V5

export interface VersionedAssets_V3 {
    __kind: 'V3'
    value: V3MultiAsset[]
}

export interface VersionedAssets_V4 {
    __kind: 'V4'
    value: V4Asset[]
}

export interface VersionedAssets_V5 {
    __kind: 'V5'
    value: V5Asset[]
}

export const VersionedLocation: sts.Type<VersionedLocation> = sts.closedEnum(() => {
    return  {
        V3: V3MultiLocation,
        V4: V4Location,
        V5: V5Location,
    }
})

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export type XcmPalletCall = XcmPalletCall_add_authorized_alias | XcmPalletCall_claim_assets | XcmPalletCall_execute | XcmPalletCall_force_default_xcm_version | XcmPalletCall_force_subscribe_version_notify | XcmPalletCall_force_suspension | XcmPalletCall_force_unsubscribe_version_notify | XcmPalletCall_force_xcm_version | XcmPalletCall_limited_reserve_transfer_assets | XcmPalletCall_limited_teleport_assets | XcmPalletCall_remove_all_authorized_aliases | XcmPalletCall_remove_authorized_alias | XcmPalletCall_reserve_transfer_assets | XcmPalletCall_send | XcmPalletCall_teleport_assets | XcmPalletCall_transfer_assets | XcmPalletCall_transfer_assets_using_type_and_then

/**
 * Authorize another `aliaser` location to alias into the local `origin` making this call.
 * The `aliaser` is only authorized until the provided `expiry` block number.
 * The call can also be used for a previously authorized alias in order to update its
 * `expiry` block number.
 * 
 * Usually useful to allow your local account to be aliased into from a remote location
 * also under your control (like your account on another chain).
 * 
 * WARNING: make sure the caller `origin` (you) trusts the `aliaser` location to act in
 * their/your name. Once authorized using this call, the `aliaser` can freely impersonate
 * `origin` in XCM programs executed on the local chain.
 */
export interface XcmPalletCall_add_authorized_alias {
    __kind: 'add_authorized_alias'
    aliaser: VersionedLocation
    expires?: (bigint | undefined)
}

/**
 * Claims assets trapped on this pallet because of leftover assets during XCM execution.
 * 
 * - `origin`: Anyone can call this extrinsic.
 * - `assets`: The exact assets that were trapped. Use the version to specify what version
 * was the latest when they were trapped.
 * - `beneficiary`: The location/account where the claimed assets will be deposited.
 */
export interface XcmPalletCall_claim_assets {
    __kind: 'claim_assets'
    assets: VersionedAssets
    beneficiary: VersionedLocation
}

/**
 * Execute an XCM message from a local, signed, origin.
 * 
 * An event is deposited indicating whether `msg` could be executed completely or only
 * partially.
 * 
 * No more than `max_weight` will be used in its attempted execution. If this is less than
 * the maximum amount of weight that the message could take to be executed, then no
 * execution attempt will be made.
 */
export interface XcmPalletCall_execute {
    __kind: 'execute'
    message: Type_465
    maxWeight: Weight
}

/**
 * Set a safe XCM version (the version that XCM should be encoded with if the most recent
 * version a destination can accept is unknown).
 * 
 * - `origin`: Must be an origin specified by AdminOrigin.
 * - `maybe_xcm_version`: The default XCM encoding version, or `None` to disable.
 */
export interface XcmPalletCall_force_default_xcm_version {
    __kind: 'force_default_xcm_version'
    maybeXcmVersion?: (number | undefined)
}

/**
 * Ask a location to notify us regarding their XCM version and any changes to it.
 * 
 * - `origin`: Must be an origin specified by AdminOrigin.
 * - `location`: The location to which we should subscribe for XCM version notifications.
 */
export interface XcmPalletCall_force_subscribe_version_notify {
    __kind: 'force_subscribe_version_notify'
    location: VersionedLocation
}

/**
 * Set or unset the global suspension state of the XCM executor.
 * 
 * - `origin`: Must be an origin specified by AdminOrigin.
 * - `suspended`: `true` to suspend, `false` to resume.
 */
export interface XcmPalletCall_force_suspension {
    __kind: 'force_suspension'
    suspended: boolean
}

/**
 * Require that a particular destination should no longer notify us regarding any XCM
 * version changes.
 * 
 * - `origin`: Must be an origin specified by AdminOrigin.
 * - `location`: The location to which we are currently subscribed for XCM version
 *   notifications which we no longer desire.
 */
export interface XcmPalletCall_force_unsubscribe_version_notify {
    __kind: 'force_unsubscribe_version_notify'
    location: VersionedLocation
}

/**
 * Extoll that a particular destination can be communicated with through a particular
 * version of XCM.
 * 
 * - `origin`: Must be an origin specified by AdminOrigin.
 * - `location`: The destination that is being described.
 * - `xcm_version`: The latest version of XCM that `location` supports.
 */
export interface XcmPalletCall_force_xcm_version {
    __kind: 'force_xcm_version'
    location: V5Location
    version: number
}

/**
 * Transfer some assets from the local chain to the destination chain through their local,
 * destination or remote reserve.
 * 
 * `assets` must have same reserve location and may not be teleportable to `dest`.
 *  - `assets` have local reserve: transfer assets to sovereign account of destination
 *    chain and forward a notification XCM to `dest` to mint and deposit reserve-based
 *    assets to `beneficiary`.
 *  - `assets` have destination reserve: burn local assets and forward a notification to
 *    `dest` chain to withdraw the reserve assets from this chain's sovereign account and
 *    deposit them to `beneficiary`.
 *  - `assets` have remote reserve: burn local assets, forward XCM to reserve chain to move
 *    reserves from this chain's SA to `dest` chain's SA, and forward another XCM to `dest`
 *    to mint and deposit reserve-based assets to `beneficiary`.
 * 
 * Fee payment on the destination side is made from the asset in the `assets` vector of
 * index `fee_asset_item`, up to enough to pay for `weight_limit` of weight. If more weight
 * is needed than `weight_limit`, then the operation will fail and the sent assets may be
 * at risk.
 * 
 * - `origin`: Must be capable of withdrawing the `assets` and executing XCM.
 * - `dest`: Destination context for the assets. Will typically be `[Parent,
 *   Parachain(..)]` to send from parachain to parachain, or `[Parachain(..)]` to send from
 *   relay to parachain.
 * - `beneficiary`: A beneficiary location for the assets in the context of `dest`. Will
 *   generally be an `AccountId32` value.
 * - `assets`: The assets to be withdrawn. This should include the assets used to pay the
 *   fee on the `dest` (and possibly reserve) chains.
 * - `fee_asset_item`: The index into `assets` of the item which should be used to pay
 *   fees.
 * - `weight_limit`: The remote-side weight limit, if any, for the XCM fee purchase.
 */
export interface XcmPalletCall_limited_reserve_transfer_assets {
    __kind: 'limited_reserve_transfer_assets'
    dest: VersionedLocation
    beneficiary: VersionedLocation
    assets: VersionedAssets
    feeAssetItem: number
    weightLimit: V3WeightLimit
}

/**
 * Teleport some assets from the local chain to some destination chain.
 * 
 * Fee payment on the destination side is made from the asset in the `assets` vector of
 * index `fee_asset_item`, up to enough to pay for `weight_limit` of weight. If more weight
 * is needed than `weight_limit`, then the operation will fail and the sent assets may be
 * at risk.
 * 
 * - `origin`: Must be capable of withdrawing the `assets` and executing XCM.
 * - `dest`: Destination context for the assets. Will typically be `[Parent,
 *   Parachain(..)]` to send from parachain to parachain, or `[Parachain(..)]` to send from
 *   relay to parachain.
 * - `beneficiary`: A beneficiary location for the assets in the context of `dest`. Will
 *   generally be an `AccountId32` value.
 * - `assets`: The assets to be withdrawn. This should include the assets used to pay the
 *   fee on the `dest` chain.
 * - `fee_asset_item`: The index into `assets` of the item which should be used to pay
 *   fees.
 * - `weight_limit`: The remote-side weight limit, if any, for the XCM fee purchase.
 */
export interface XcmPalletCall_limited_teleport_assets {
    __kind: 'limited_teleport_assets'
    dest: VersionedLocation
    beneficiary: VersionedLocation
    assets: VersionedAssets
    feeAssetItem: number
    weightLimit: V3WeightLimit
}

/**
 * Remove all previously authorized `aliaser`s that can alias into the local `origin`
 * making this call.
 */
export interface XcmPalletCall_remove_all_authorized_aliases {
    __kind: 'remove_all_authorized_aliases'
}

/**
 * Remove a previously authorized `aliaser` from the list of locations that can alias into
 * the local `origin` making this call.
 */
export interface XcmPalletCall_remove_authorized_alias {
    __kind: 'remove_authorized_alias'
    aliaser: VersionedLocation
}

/**
 * Transfer some assets from the local chain to the destination chain through their local,
 * destination or remote reserve.
 * 
 * `assets` must have same reserve location and may not be teleportable to `dest`.
 *  - `assets` have local reserve: transfer assets to sovereign account of destination
 *    chain and forward a notification XCM to `dest` to mint and deposit reserve-based
 *    assets to `beneficiary`.
 *  - `assets` have destination reserve: burn local assets and forward a notification to
 *    `dest` chain to withdraw the reserve assets from this chain's sovereign account and
 *    deposit them to `beneficiary`.
 *  - `assets` have remote reserve: burn local assets, forward XCM to reserve chain to move
 *    reserves from this chain's SA to `dest` chain's SA, and forward another XCM to `dest`
 *    to mint and deposit reserve-based assets to `beneficiary`.
 * 
 * **This function is deprecated: Use `limited_reserve_transfer_assets` instead.**
 * 
 * Fee payment on the destination side is made from the asset in the `assets` vector of
 * index `fee_asset_item`. The weight limit for fees is not provided and thus is unlimited,
 * with all fees taken as needed from the asset.
 * 
 * - `origin`: Must be capable of withdrawing the `assets` and executing XCM.
 * - `dest`: Destination context for the assets. Will typically be `[Parent,
 *   Parachain(..)]` to send from parachain to parachain, or `[Parachain(..)]` to send from
 *   relay to parachain.
 * - `beneficiary`: A beneficiary location for the assets in the context of `dest`. Will
 *   generally be an `AccountId32` value.
 * - `assets`: The assets to be withdrawn. This should include the assets used to pay the
 *   fee on the `dest` (and possibly reserve) chains.
 * - `fee_asset_item`: The index into `assets` of the item which should be used to pay
 *   fees.
 */
export interface XcmPalletCall_reserve_transfer_assets {
    __kind: 'reserve_transfer_assets'
    dest: VersionedLocation
    beneficiary: VersionedLocation
    assets: VersionedAssets
    feeAssetItem: number
}

export interface XcmPalletCall_send {
    __kind: 'send'
    dest: VersionedLocation
    message: VersionedXcm
}

/**
 * Teleport some assets from the local chain to some destination chain.
 * 
 * **This function is deprecated: Use `limited_teleport_assets` instead.**
 * 
 * Fee payment on the destination side is made from the asset in the `assets` vector of
 * index `fee_asset_item`. The weight limit for fees is not provided and thus is unlimited,
 * with all fees taken as needed from the asset.
 * 
 * - `origin`: Must be capable of withdrawing the `assets` and executing XCM.
 * - `dest`: Destination context for the assets. Will typically be `[Parent,
 *   Parachain(..)]` to send from parachain to parachain, or `[Parachain(..)]` to send from
 *   relay to parachain.
 * - `beneficiary`: A beneficiary location for the assets in the context of `dest`. Will
 *   generally be an `AccountId32` value.
 * - `assets`: The assets to be withdrawn. This should include the assets used to pay the
 *   fee on the `dest` chain.
 * - `fee_asset_item`: The index into `assets` of the item which should be used to pay
 *   fees.
 */
export interface XcmPalletCall_teleport_assets {
    __kind: 'teleport_assets'
    dest: VersionedLocation
    beneficiary: VersionedLocation
    assets: VersionedAssets
    feeAssetItem: number
}

/**
 * Transfer some assets from the local chain to the destination chain through their local,
 * destination or remote reserve, or through teleports.
 * 
 * Fee payment on the destination side is made from the asset in the `assets` vector of
 * index `fee_asset_item` (hence referred to as `fees`), up to enough to pay for
 * `weight_limit` of weight. If more weight is needed than `weight_limit`, then the
 * operation will fail and the sent assets may be at risk.
 * 
 * `assets` (excluding `fees`) must have same reserve location or otherwise be teleportable
 * to `dest`, no limitations imposed on `fees`.
 *  - for local reserve: transfer assets to sovereign account of destination chain and
 *    forward a notification XCM to `dest` to mint and deposit reserve-based assets to
 *    `beneficiary`.
 *  - for destination reserve: burn local assets and forward a notification to `dest` chain
 *    to withdraw the reserve assets from this chain's sovereign account and deposit them
 *    to `beneficiary`.
 *  - for remote reserve: burn local assets, forward XCM to reserve chain to move reserves
 *    from this chain's SA to `dest` chain's SA, and forward another XCM to `dest` to mint
 *    and deposit reserve-based assets to `beneficiary`.
 *  - for teleports: burn local assets and forward XCM to `dest` chain to mint/teleport
 *    assets and deposit them to `beneficiary`.
 * 
 * - `origin`: Must be capable of withdrawing the `assets` and executing XCM.
 * - `dest`: Destination context for the assets. Will typically be `X2(Parent,
 *   Parachain(..))` to send from parachain to parachain, or `X1(Parachain(..))` to send
 *   from relay to parachain.
 * - `beneficiary`: A beneficiary location for the assets in the context of `dest`. Will
 *   generally be an `AccountId32` value.
 * - `assets`: The assets to be withdrawn. This should include the assets used to pay the
 *   fee on the `dest` (and possibly reserve) chains.
 * - `fee_asset_item`: The index into `assets` of the item which should be used to pay
 *   fees.
 * - `weight_limit`: The remote-side weight limit, if any, for the XCM fee purchase.
 */
export interface XcmPalletCall_transfer_assets {
    __kind: 'transfer_assets'
    dest: VersionedLocation
    beneficiary: VersionedLocation
    assets: VersionedAssets
    feeAssetItem: number
    weightLimit: V3WeightLimit
}

/**
 * Transfer assets from the local chain to the destination chain using explicit transfer
 * types for assets and fees.
 * 
 * `assets` must have same reserve location or may be teleportable to `dest`. Caller must
 * provide the `assets_transfer_type` to be used for `assets`:
 *  - `TransferType::LocalReserve`: transfer assets to sovereign account of destination
 *    chain and forward a notification XCM to `dest` to mint and deposit reserve-based
 *    assets to `beneficiary`.
 *  - `TransferType::DestinationReserve`: burn local assets and forward a notification to
 *    `dest` chain to withdraw the reserve assets from this chain's sovereign account and
 *    deposit them to `beneficiary`.
 *  - `TransferType::RemoteReserve(reserve)`: burn local assets, forward XCM to `reserve`
 *    chain to move reserves from this chain's SA to `dest` chain's SA, and forward another
 *    XCM to `dest` to mint and deposit reserve-based assets to `beneficiary`. Typically
 *    the remote `reserve` is Asset Hub.
 *  - `TransferType::Teleport`: burn local assets and forward XCM to `dest` chain to
 *    mint/teleport assets and deposit them to `beneficiary`.
 * 
 * On the destination chain, as well as any intermediary hops, `BuyExecution` is used to
 * buy execution using transferred `assets` identified by `remote_fees_id`.
 * Make sure enough of the specified `remote_fees_id` asset is included in the given list
 * of `assets`. `remote_fees_id` should be enough to pay for `weight_limit`. If more weight
 * is needed than `weight_limit`, then the operation will fail and the sent assets may be
 * at risk.
 * 
 * `remote_fees_id` may use different transfer type than rest of `assets` and can be
 * specified through `fees_transfer_type`.
 * 
 * The caller needs to specify what should happen to the transferred assets once they reach
 * the `dest` chain. This is done through the `custom_xcm_on_dest` parameter, which
 * contains the instructions to execute on `dest` as a final step.
 *   This is usually as simple as:
 *   `Xcm(vec![DepositAsset { assets: Wild(AllCounted(assets.len())), beneficiary }])`,
 *   but could be something more exotic like sending the `assets` even further.
 * 
 * - `origin`: Must be capable of withdrawing the `assets` and executing XCM.
 * - `dest`: Destination context for the assets. Will typically be `[Parent,
 *   Parachain(..)]` to send from parachain to parachain, or `[Parachain(..)]` to send from
 *   relay to parachain, or `(parents: 2, (GlobalConsensus(..), ..))` to send from
 *   parachain across a bridge to another ecosystem destination.
 * - `assets`: The assets to be withdrawn. This should include the assets used to pay the
 *   fee on the `dest` (and possibly reserve) chains.
 * - `assets_transfer_type`: The XCM `TransferType` used to transfer the `assets`.
 * - `remote_fees_id`: One of the included `assets` to be used to pay fees.
 * - `fees_transfer_type`: The XCM `TransferType` used to transfer the `fees` assets.
 * - `custom_xcm_on_dest`: The XCM to be executed on `dest` chain as the last step of the
 *   transfer, which also determines what happens to the assets on the destination chain.
 * - `weight_limit`: The remote-side weight limit, if any, for the XCM fee purchase.
 */
export interface XcmPalletCall_transfer_assets_using_type_and_then {
    __kind: 'transfer_assets_using_type_and_then'
    dest: VersionedLocation
    assets: VersionedAssets
    assetsTransferType: TransferType
    remoteFeesId: VersionedAssetId
    feesTransferType: TransferType
    customXcmOnDest: VersionedXcm
    weightLimit: V3WeightLimit
}

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export const WhitelistCall: sts.Type<WhitelistCall> = sts.closedEnum(() => {
    return  {
        dispatch_whitelisted_call: sts.enumStruct({
            callHash: H256,
            callEncodedLen: sts.number(),
            callWeightWitness: Weight,
        }),
        dispatch_whitelisted_call_with_preimage: sts.enumStruct({
            call: Call,
        }),
        remove_whitelisted_call: sts.enumStruct({
            callHash: H256,
        }),
        whitelist_call: sts.enumStruct({
            callHash: H256,
        }),
    }
})

export const H256 = sts.bytes()

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export type WhitelistCall = WhitelistCall_dispatch_whitelisted_call | WhitelistCall_dispatch_whitelisted_call_with_preimage | WhitelistCall_remove_whitelisted_call | WhitelistCall_whitelist_call

export interface WhitelistCall_dispatch_whitelisted_call {
    __kind: 'dispatch_whitelisted_call'
    callHash: H256
    callEncodedLen: number
    callWeightWitness: Weight
}

export interface WhitelistCall_dispatch_whitelisted_call_with_preimage {
    __kind: 'dispatch_whitelisted_call_with_preimage'
    call: Call
}

export interface WhitelistCall_remove_whitelisted_call {
    __kind: 'remove_whitelisted_call'
    callHash: H256
}

export interface WhitelistCall_whitelist_call {
    __kind: 'whitelist_call'
    callHash: H256
}

export type H256 = Bytes

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export const VoterListCall: sts.Type<VoterListCall> = sts.closedEnum(() => {
    return  {
        put_in_front_of: sts.enumStruct({
            lighter: MultiAddress,
        }),
        put_in_front_of_other: sts.enumStruct({
            heavier: MultiAddress,
            lighter: MultiAddress,
        }),
        rebag: sts.enumStruct({
            dislocated: MultiAddress,
        }),
    }
})

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export type VoterListCall = VoterListCall_put_in_front_of | VoterListCall_put_in_front_of_other | VoterListCall_rebag

/**
 * Move the caller's Id directly in front of `lighter`.
 * 
 * The dispatch origin for this call must be _Signed_ and can only be called by the Id of
 * the account going in front of `lighter`. Fee is payed by the origin under all
 * circumstances.
 * 
 * Only works if:
 * 
 * - both nodes are within the same bag,
 * - and `origin` has a greater `Score` than `lighter`.
 */
export interface VoterListCall_put_in_front_of {
    __kind: 'put_in_front_of'
    lighter: MultiAddress
}

/**
 * Same as [`Pallet::put_in_front_of`], but it can be called by anyone.
 * 
 * Fee is paid by the origin under all circumstances.
 */
export interface VoterListCall_put_in_front_of_other {
    __kind: 'put_in_front_of_other'
    heavier: MultiAddress
    lighter: MultiAddress
}

/**
 * Declare that some `dislocated` account has, through rewards or penalties, sufficiently
 * changed its score that it should properly fall into a different bag than its current
 * one.
 * 
 * Anyone can call this function about any potentially dislocated account.
 * 
 * Will always update the stored score of `dislocated` to the correct score, based on
 * `ScoreProvider`.
 * 
 * If `dislocated` does not exists, it returns an error.
 */
export interface VoterListCall_rebag {
    __kind: 'rebag'
    dislocated: MultiAddress
}

export type MultiAddress = MultiAddress_Address20 | MultiAddress_Address32 | MultiAddress_Id | MultiAddress_Index | MultiAddress_Raw

export interface MultiAddress_Address20 {
    __kind: 'Address20'
    value: Bytes
}

export interface MultiAddress_Address32 {
    __kind: 'Address32'
    value: Bytes
}

export interface MultiAddress_Id {
    __kind: 'Id'
    value: AccountId32
}

export interface MultiAddress_Index {
    __kind: 'Index'
}

export interface MultiAddress_Raw {
    __kind: 'Raw'
    value: Bytes
}

export type AccountId32 = Bytes

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export const VestingCall: sts.Type<VestingCall> = sts.closedEnum(() => {
    return  {
        force_remove_vesting_schedule: sts.enumStruct({
            target: MultiAddress,
            scheduleIndex: sts.number(),
        }),
        force_vested_transfer: sts.enumStruct({
            source: MultiAddress,
            target: MultiAddress,
            schedule: VestingInfo,
        }),
        merge_schedules: sts.enumStruct({
            schedule1Index: sts.number(),
            schedule2Index: sts.number(),
        }),
        vest: sts.unit(),
        vest_other: sts.enumStruct({
            target: MultiAddress,
        }),
        vested_transfer: sts.enumStruct({
            target: MultiAddress,
            schedule: VestingInfo,
        }),
    }
})

export const VestingInfo: sts.Type<VestingInfo> = sts.struct(() => {
    return  {
        locked: sts.bigint(),
        perBlock: sts.bigint(),
        startingBlock: sts.number(),
    }
})

export interface VestingInfo {
    locked: bigint
    perBlock: bigint
    startingBlock: number
}

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export type VestingCall = VestingCall_force_remove_vesting_schedule | VestingCall_force_vested_transfer | VestingCall_merge_schedules | VestingCall_vest | VestingCall_vest_other | VestingCall_vested_transfer

/**
 * Force remove a vesting schedule
 * 
 * The dispatch origin for this call must be _Root_.
 * 
 * - `target`: An account that has a vesting schedule
 * - `schedule_index`: The vesting schedule index that should be removed
 */
export interface VestingCall_force_remove_vesting_schedule {
    __kind: 'force_remove_vesting_schedule'
    target: MultiAddress
    scheduleIndex: number
}

/**
 * Force a vested transfer.
 * 
 * The dispatch origin for this call must be _Root_.
 * 
 * - `source`: The account whose funds should be transferred.
 * - `target`: The account that should be transferred the vested funds.
 * - `schedule`: The vesting schedule attached to the transfer.
 * 
 * Emits `VestingCreated`.
 * 
 * NOTE: This will unlock all schedules through the current block.
 * 
 * ## Complexity
 * - `O(1)`.
 */
export interface VestingCall_force_vested_transfer {
    __kind: 'force_vested_transfer'
    source: MultiAddress
    target: MultiAddress
    schedule: VestingInfo
}

/**
 * Merge two vesting schedules together, creating a new vesting schedule that unlocks over
 * the highest possible start and end blocks. If both schedules have already started the
 * current block will be used as the schedule start; with the caveat that if one schedule
 * is finished by the current block, the other will be treated as the new merged schedule,
 * unmodified.
 * 
 * NOTE: If `schedule1_index == schedule2_index` this is a no-op.
 * NOTE: This will unlock all schedules through the current block prior to merging.
 * NOTE: If both schedules have ended by the current block, no new schedule will be created
 * and both will be removed.
 * 
 * Merged schedule attributes:
 * - `starting_block`: `MAX(schedule1.starting_block, scheduled2.starting_block,
 *   current_block)`.
 * - `ending_block`: `MAX(schedule1.ending_block, schedule2.ending_block)`.
 * - `locked`: `schedule1.locked_at(current_block) + schedule2.locked_at(current_block)`.
 * 
 * The dispatch origin for this call must be _Signed_.
 * 
 * - `schedule1_index`: index of the first schedule to merge.
 * - `schedule2_index`: index of the second schedule to merge.
 */
export interface VestingCall_merge_schedules {
    __kind: 'merge_schedules'
    schedule1Index: number
    schedule2Index: number
}

/**
 * Unlock any vested funds of the sender account.
 * 
 * The dispatch origin for this call must be _Signed_ and the sender must have funds still
 * locked under this pallet.
 * 
 * Emits either `VestingCompleted` or `VestingUpdated`.
 * 
 * ## Complexity
 * - `O(1)`.
 */
export interface VestingCall_vest {
    __kind: 'vest'
}

/**
 * Unlock any vested funds of a `target` account.
 * 
 * The dispatch origin for this call must be _Signed_.
 * 
 * - `target`: The account whose vested funds should be unlocked. Must have funds still
 * locked under this pallet.
 * 
 * Emits either `VestingCompleted` or `VestingUpdated`.
 * 
 * ## Complexity
 * - `O(1)`.
 */
export interface VestingCall_vest_other {
    __kind: 'vest_other'
    target: MultiAddress
}

/**
 * Create a vested transfer.
 * 
 * The dispatch origin for this call must be _Signed_.
 * 
 * - `target`: The account receiving the vested funds.
 * - `schedule`: The vesting schedule attached to the transfer.
 * 
 * Emits `VestingCreated`.
 * 
 * NOTE: This will unlock all schedules through the current block.
 * 
 * ## Complexity
 * - `O(1)`.
 */
export interface VestingCall_vested_transfer {
    __kind: 'vested_transfer'
    target: MultiAddress
    schedule: VestingInfo
}

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export const UtilityCall: sts.Type<UtilityCall> = sts.closedEnum(() => {
    return  {
        as_derivative: sts.enumStruct({
            index: sts.number(),
            call: Call,
        }),
        batch: sts.enumStruct({
            calls: sts.array(() => Call),
        }),
        batch_all: sts.enumStruct({
            calls: sts.array(() => Call),
        }),
        dispatch_as: sts.enumStruct({
            asOrigin: OriginCaller,
            call: Call,
        }),
        dispatch_as_fallible: sts.enumStruct({
            asOrigin: OriginCaller,
            call: Call,
        }),
        force_batch: sts.enumStruct({
            calls: sts.array(() => Call),
        }),
        if_else: sts.enumStruct({
            main: Call,
            fallback: Call,
        }),
        with_weight: sts.enumStruct({
            call: Call,
            weight: Weight,
        }),
    }
})

export const OriginCaller: sts.Type<OriginCaller> = sts.closedEnum(() => {
    return  {
        Origins: Origin,
        ParachainsOrigin: Type_161,
        XcmPallet: Type_163,
        system: RawOrigin,
    }
})

export const RawOrigin: sts.Type<RawOrigin> = sts.closedEnum(() => {
    return  {
        None: sts.unit(),
        Root: sts.unit(),
        Signed: AccountId32,
    }
})

export type RawOrigin = RawOrigin_None | RawOrigin_Root | RawOrigin_Signed

export interface RawOrigin_None {
    __kind: 'None'
}

export interface RawOrigin_Root {
    __kind: 'Root'
}

export interface RawOrigin_Signed {
    __kind: 'Signed'
    value: AccountId32
}

export const Type_163: sts.Type<Type_163> = sts.closedEnum(() => {
    return  {
        Response: V5Location,
        Xcm: V5Location,
    }
})

export type Type_163 = Type_163_Response | Type_163_Xcm

export interface Type_163_Response {
    __kind: 'Response'
    value: V5Location
}

export interface Type_163_Xcm {
    __kind: 'Xcm'
    value: V5Location
}

export const Type_161: sts.Type<Type_161> = sts.closedEnum(() => {
    return  {
        Parachain: Id,
    }
})

export const Id = sts.number()

export type Type_161 = Type_161_Parachain

export interface Type_161_Parachain {
    __kind: 'Parachain'
    value: Id
}

export type Id = number

export const Origin: sts.Type<Origin> = sts.closedEnum(() => {
    return  {
        AuctionAdmin: sts.unit(),
        BigSpender: sts.unit(),
        BigTipper: sts.unit(),
        Fellows: sts.unit(),
        Fellowship1Dan: sts.unit(),
        Fellowship2Dan: sts.unit(),
        Fellowship3Dan: sts.unit(),
        Fellowship4Dan: sts.unit(),
        Fellowship5Dan: sts.unit(),
        Fellowship6Dan: sts.unit(),
        Fellowship7Dan: sts.unit(),
        Fellowship8Dan: sts.unit(),
        Fellowship9Dan: sts.unit(),
        FellowshipAdmin: sts.unit(),
        FellowshipExperts: sts.unit(),
        FellowshipInitiates: sts.unit(),
        FellowshipMasters: sts.unit(),
        GeneralAdmin: sts.unit(),
        LeaseAdmin: sts.unit(),
        MediumSpender: sts.unit(),
        ReferendumCanceller: sts.unit(),
        ReferendumKiller: sts.unit(),
        SmallSpender: sts.unit(),
        SmallTipper: sts.unit(),
        StakingAdmin: sts.unit(),
        Treasurer: sts.unit(),
        WhitelistedCaller: sts.unit(),
        WishForChange: sts.unit(),
    }
})

export type Origin = Origin_AuctionAdmin | Origin_BigSpender | Origin_BigTipper | Origin_Fellows | Origin_Fellowship1Dan | Origin_Fellowship2Dan | Origin_Fellowship3Dan | Origin_Fellowship4Dan | Origin_Fellowship5Dan | Origin_Fellowship6Dan | Origin_Fellowship7Dan | Origin_Fellowship8Dan | Origin_Fellowship9Dan | Origin_FellowshipAdmin | Origin_FellowshipExperts | Origin_FellowshipInitiates | Origin_FellowshipMasters | Origin_GeneralAdmin | Origin_LeaseAdmin | Origin_MediumSpender | Origin_ReferendumCanceller | Origin_ReferendumKiller | Origin_SmallSpender | Origin_SmallTipper | Origin_StakingAdmin | Origin_Treasurer | Origin_WhitelistedCaller | Origin_WishForChange

export interface Origin_AuctionAdmin {
    __kind: 'AuctionAdmin'
}

export interface Origin_BigSpender {
    __kind: 'BigSpender'
}

export interface Origin_BigTipper {
    __kind: 'BigTipper'
}

export interface Origin_Fellows {
    __kind: 'Fellows'
}

export interface Origin_Fellowship1Dan {
    __kind: 'Fellowship1Dan'
}

export interface Origin_Fellowship2Dan {
    __kind: 'Fellowship2Dan'
}

export interface Origin_Fellowship3Dan {
    __kind: 'Fellowship3Dan'
}

export interface Origin_Fellowship4Dan {
    __kind: 'Fellowship4Dan'
}

export interface Origin_Fellowship5Dan {
    __kind: 'Fellowship5Dan'
}

export interface Origin_Fellowship6Dan {
    __kind: 'Fellowship6Dan'
}

export interface Origin_Fellowship7Dan {
    __kind: 'Fellowship7Dan'
}

export interface Origin_Fellowship8Dan {
    __kind: 'Fellowship8Dan'
}

export interface Origin_Fellowship9Dan {
    __kind: 'Fellowship9Dan'
}

export interface Origin_FellowshipAdmin {
    __kind: 'FellowshipAdmin'
}

export interface Origin_FellowshipExperts {
    __kind: 'FellowshipExperts'
}

export interface Origin_FellowshipInitiates {
    __kind: 'FellowshipInitiates'
}

export interface Origin_FellowshipMasters {
    __kind: 'FellowshipMasters'
}

export interface Origin_GeneralAdmin {
    __kind: 'GeneralAdmin'
}

export interface Origin_LeaseAdmin {
    __kind: 'LeaseAdmin'
}

export interface Origin_MediumSpender {
    __kind: 'MediumSpender'
}

export interface Origin_ReferendumCanceller {
    __kind: 'ReferendumCanceller'
}

export interface Origin_ReferendumKiller {
    __kind: 'ReferendumKiller'
}

export interface Origin_SmallSpender {
    __kind: 'SmallSpender'
}

export interface Origin_SmallTipper {
    __kind: 'SmallTipper'
}

export interface Origin_StakingAdmin {
    __kind: 'StakingAdmin'
}

export interface Origin_Treasurer {
    __kind: 'Treasurer'
}

export interface Origin_WhitelistedCaller {
    __kind: 'WhitelistedCaller'
}

export interface Origin_WishForChange {
    __kind: 'WishForChange'
}

export type OriginCaller = OriginCaller_Origins | OriginCaller_ParachainsOrigin | OriginCaller_XcmPallet | OriginCaller_system

export interface OriginCaller_Origins {
    __kind: 'Origins'
    value: Origin
}

export interface OriginCaller_ParachainsOrigin {
    __kind: 'ParachainsOrigin'
    value: Type_161
}

export interface OriginCaller_XcmPallet {
    __kind: 'XcmPallet'
    value: Type_163
}

export interface OriginCaller_system {
    __kind: 'system'
    value: RawOrigin
}

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export type UtilityCall = UtilityCall_as_derivative | UtilityCall_batch | UtilityCall_batch_all | UtilityCall_dispatch_as | UtilityCall_dispatch_as_fallible | UtilityCall_force_batch | UtilityCall_if_else | UtilityCall_with_weight

/**
 * Send a call through an indexed pseudonym of the sender.
 * 
 * Filter from origin are passed along. The call will be dispatched with an origin which
 * use the same filter as the origin of this call.
 * 
 * NOTE: If you need to ensure that any account-based filtering is not honored (i.e.
 * because you expect `proxy` to have been used prior in the call stack and you do not want
 * the call restrictions to apply to any sub-accounts), then use `as_multi_threshold_1`
 * in the Multisig pallet instead.
 * 
 * NOTE: Prior to version *12, this was called `as_limited_sub`.
 * 
 * The dispatch origin for this call must be _Signed_.
 */
export interface UtilityCall_as_derivative {
    __kind: 'as_derivative'
    index: number
    call: Call
}

/**
 * Send a batch of dispatch calls.
 * 
 * May be called from any origin except `None`.
 * 
 * - `calls`: The calls to be dispatched from the same origin. The number of call must not
 *   exceed the constant: `batched_calls_limit` (available in constant metadata).
 * 
 * If origin is root then the calls are dispatched without checking origin filter. (This
 * includes bypassing `frame_system::Config::BaseCallFilter`).
 * 
 * ## Complexity
 * - O(C) where C is the number of calls to be batched.
 * 
 * This will return `Ok` in all circumstances. To determine the success of the batch, an
 * event is deposited. If a call failed and the batch was interrupted, then the
 * `BatchInterrupted` event is deposited, along with the number of successful calls made
 * and the error of the failed call. If all were successful, then the `BatchCompleted`
 * event is deposited.
 */
export interface UtilityCall_batch {
    __kind: 'batch'
    calls: Call[]
}

/**
 * Send a batch of dispatch calls and atomically execute them.
 * The whole transaction will rollback and fail if any of the calls failed.
 * 
 * May be called from any origin except `None`.
 * 
 * - `calls`: The calls to be dispatched from the same origin. The number of call must not
 *   exceed the constant: `batched_calls_limit` (available in constant metadata).
 * 
 * If origin is root then the calls are dispatched without checking origin filter. (This
 * includes bypassing `frame_system::Config::BaseCallFilter`).
 * 
 * ## Complexity
 * - O(C) where C is the number of calls to be batched.
 */
export interface UtilityCall_batch_all {
    __kind: 'batch_all'
    calls: Call[]
}

/**
 * Dispatches a function call with a provided origin.
 * 
 * The dispatch origin for this call must be _Root_.
 * 
 * ## Complexity
 * - O(1).
 */
export interface UtilityCall_dispatch_as {
    __kind: 'dispatch_as'
    asOrigin: OriginCaller
    call: Call
}

/**
 * Dispatches a function call with a provided origin.
 * 
 * Almost the same as [`Pallet::dispatch_as`] but forwards any error of the inner call.
 * 
 * The dispatch origin for this call must be _Root_.
 */
export interface UtilityCall_dispatch_as_fallible {
    __kind: 'dispatch_as_fallible'
    asOrigin: OriginCaller
    call: Call
}

/**
 * Send a batch of dispatch calls.
 * Unlike `batch`, it allows errors and won't interrupt.
 * 
 * May be called from any origin except `None`.
 * 
 * - `calls`: The calls to be dispatched from the same origin. The number of call must not
 *   exceed the constant: `batched_calls_limit` (available in constant metadata).
 * 
 * If origin is root then the calls are dispatch without checking origin filter. (This
 * includes bypassing `frame_system::Config::BaseCallFilter`).
 * 
 * ## Complexity
 * - O(C) where C is the number of calls to be batched.
 */
export interface UtilityCall_force_batch {
    __kind: 'force_batch'
    calls: Call[]
}

/**
 * Dispatch a fallback call in the event the main call fails to execute.
 * May be called from any origin except `None`.
 * 
 * This function first attempts to dispatch the `main` call.
 * If the `main` call fails, the `fallback` is attemted.
 * if the fallback is successfully dispatched, the weights of both calls
 * are accumulated and an event containing the main call error is deposited.
 * 
 * In the event of a fallback failure the whole call fails
 * with the weights returned.
 * 
 * - `main`: The main call to be dispatched. This is the primary action to execute.
 * - `fallback`: The fallback call to be dispatched in case the `main` call fails.
 * 
 * ## Dispatch Logic
 * - If the origin is `root`, both the main and fallback calls are executed without
 *   applying any origin filters.
 * - If the origin is not `root`, the origin filter is applied to both the `main` and
 *   `fallback` calls.
 * 
 * ## Use Case
 * - Some use cases might involve submitting a `batch` type call in either main, fallback
 *   or both.
 */
export interface UtilityCall_if_else {
    __kind: 'if_else'
    main: Call
    fallback: Call
}

/**
 * Dispatch a function call with a specified weight.
 * 
 * This function does not check the weight of the call, and instead allows the
 * Root origin to specify the weight of the call.
 * 
 * The dispatch origin for this call must be _Root_.
 */
export interface UtilityCall_with_weight {
    __kind: 'with_weight'
    call: Call
    weight: Weight
}

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export const TreasuryCall: sts.Type<TreasuryCall> = sts.closedEnum(() => {
    return  {
        check_status: sts.enumStruct({
            index: sts.number(),
        }),
        payout: sts.enumStruct({
            index: sts.number(),
        }),
        remove_approval: sts.enumStruct({
            proposalId: sts.number(),
        }),
        spend: sts.enumStruct({
            assetKind: VersionedLocatableAsset,
            amount: sts.bigint(),
            beneficiary: VersionedLocation,
            validFrom: sts.option(() => sts.number()),
        }),
        spend_local: sts.enumStruct({
            amount: sts.bigint(),
            beneficiary: MultiAddress,
        }),
        void_spend: sts.enumStruct({
            index: sts.number(),
        }),
    }
})

export const VersionedLocatableAsset: sts.Type<VersionedLocatableAsset> = sts.closedEnum(() => {
    return  {
        V3: sts.enumStruct({
            location: V3MultiLocation,
            assetId: V3AssetId,
        }),
        V4: sts.enumStruct({
            location: V4Location,
            assetId: V4AssetId,
        }),
        V5: sts.enumStruct({
            location: V5Location,
            assetId: V5AssetId,
        }),
    }
})

export type VersionedLocatableAsset = VersionedLocatableAsset_V3 | VersionedLocatableAsset_V4 | VersionedLocatableAsset_V5

export interface VersionedLocatableAsset_V3 {
    __kind: 'V3'
    location: V3MultiLocation
    assetId: V3AssetId
}

export interface VersionedLocatableAsset_V4 {
    __kind: 'V4'
    location: V4Location
    assetId: V4AssetId
}

export interface VersionedLocatableAsset_V5 {
    __kind: 'V5'
    location: V5Location
    assetId: V5AssetId
}

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export type TreasuryCall = TreasuryCall_check_status | TreasuryCall_payout | TreasuryCall_remove_approval | TreasuryCall_spend | TreasuryCall_spend_local | TreasuryCall_void_spend

/**
 * Check the status of the spend and remove it from the storage if processed.
 * 
 * ## Dispatch Origin
 * 
 * Must be signed.
 * 
 * ## Details
 * 
 * The status check is a prerequisite for retrying a failed payout.
 * If a spend has either succeeded or expired, it is removed from the storage by this
 * function. In such instances, transaction fees are refunded.
 * 
 * ### Parameters
 * - `index`: The spend index.
 * 
 * ## Events
 * 
 * Emits [`Event::PaymentFailed`] if the spend payout has failed.
 * Emits [`Event::SpendProcessed`] if the spend payout has succeed.
 */
export interface TreasuryCall_check_status {
    __kind: 'check_status'
    index: number
}

/**
 * Claim a spend.
 * 
 * ## Dispatch Origin
 * 
 * Must be signed
 * 
 * ## Details
 * 
 * Spends must be claimed within some temporal bounds. A spend may be claimed within one
 * [`Config::PayoutPeriod`] from the `valid_from` block.
 * In case of a payout failure, the spend status must be updated with the `check_status`
 * dispatchable before retrying with the current function.
 * 
 * ### Parameters
 * - `index`: The spend index.
 * 
 * ## Events
 * 
 * Emits [`Event::Paid`] if successful.
 */
export interface TreasuryCall_payout {
    __kind: 'payout'
    index: number
}

/**
 * Force a previously approved proposal to be removed from the approval queue.
 * 
 * ## Dispatch Origin
 * 
 * Must be [`Config::RejectOrigin`].
 * 
 * ## Details
 * 
 * The original deposit will no longer be returned.
 * 
 * ### Parameters
 * - `proposal_id`: The index of a proposal
 * 
 * ### Complexity
 * - O(A) where `A` is the number of approvals
 * 
 * ### Errors
 * - [`Error::ProposalNotApproved`]: The `proposal_id` supplied was not found in the
 *   approval queue, i.e., the proposal has not been approved. This could also mean the
 *   proposal does not exist altogether, thus there is no way it would have been approved
 *   in the first place.
 */
export interface TreasuryCall_remove_approval {
    __kind: 'remove_approval'
    proposalId: number
}

/**
 * Propose and approve a spend of treasury funds.
 * 
 * ## Dispatch Origin
 * 
 * Must be [`Config::SpendOrigin`] with the `Success` value being at least
 * `amount` of `asset_kind` in the native asset. The amount of `asset_kind` is converted
 * for assertion using the [`Config::BalanceConverter`].
 * 
 * ## Details
 * 
 * Create an approved spend for transferring a specific `amount` of `asset_kind` to a
 * designated beneficiary. The spend must be claimed using the `payout` dispatchable within
 * the [`Config::PayoutPeriod`].
 * 
 * ### Parameters
 * - `asset_kind`: An indicator of the specific asset class to be spent.
 * - `amount`: The amount to be transferred from the treasury to the `beneficiary`.
 * - `beneficiary`: The beneficiary of the spend.
 * - `valid_from`: The block number from which the spend can be claimed. It can refer to
 *   the past if the resulting spend has not yet expired according to the
 *   [`Config::PayoutPeriod`]. If `None`, the spend can be claimed immediately after
 *   approval.
 * 
 * ## Events
 * 
 * Emits [`Event::AssetSpendApproved`] if successful.
 */
export interface TreasuryCall_spend {
    __kind: 'spend'
    assetKind: VersionedLocatableAsset
    amount: bigint
    beneficiary: VersionedLocation
    validFrom?: (number | undefined)
}

/**
 * Propose and approve a spend of treasury funds.
 * 
 * ## Dispatch Origin
 * 
 * Must be [`Config::SpendOrigin`] with the `Success` value being at least `amount`.
 * 
 * ### Details
 * NOTE: For record-keeping purposes, the proposer is deemed to be equivalent to the
 * beneficiary.
 * 
 * ### Parameters
 * - `amount`: The amount to be transferred from the treasury to the `beneficiary`.
 * - `beneficiary`: The destination account for the transfer.
 * 
 * ## Events
 * 
 * Emits [`Event::SpendApproved`] if successful.
 */
export interface TreasuryCall_spend_local {
    __kind: 'spend_local'
    amount: bigint
    beneficiary: MultiAddress
}

/**
 * Void previously approved spend.
 * 
 * ## Dispatch Origin
 * 
 * Must be [`Config::RejectOrigin`].
 * 
 * ## Details
 * 
 * A spend void is only possible if the payout has not been attempted yet.
 * 
 * ### Parameters
 * - `index`: The spend index.
 * 
 * ## Events
 * 
 * Emits [`Event::AssetSpendVoided`] if successful.
 */
export interface TreasuryCall_void_spend {
    __kind: 'void_spend'
    index: number
}

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export const TimestampCall: sts.Type<TimestampCall> = sts.closedEnum(() => {
    return  {
        set: sts.enumStruct({
            now: sts.bigint(),
        }),
    }
})

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export type TimestampCall = TimestampCall_set

/**
 * Set the current time.
 * 
 * This call should be invoked exactly once per block. It will panic at the finalization
 * phase, if this call hasn't been invoked by that time.
 * 
 * The timestamp should be greater than the previous one by the amount specified by
 * [`Config::MinimumPeriod`].
 * 
 * The dispatch origin for this call must be _None_.
 * 
 * This dispatch class is _Mandatory_ to ensure it gets executed in the block. Be aware
 * that changing the complexity of this call could result exhausting the resources in a
 * block to execute any other calls.
 * 
 * ## Complexity
 * - `O(1)` (Note that implementations of `OnTimestampSet` must also be `O(1)`)
 * - 1 storage read and 1 storage mutation (codec `O(1)` because of `DidUpdate::take` in
 *   `on_finalize`)
 * - 1 event handler `on_timestamp_set`. Must be `O(1)`.
 */
export interface TimestampCall_set {
    __kind: 'set'
    now: bigint
}

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export const SystemCall: sts.Type<SystemCall> = sts.closedEnum(() => {
    return  {
        apply_authorized_upgrade: sts.enumStruct({
            code: sts.bytes(),
        }),
        authorize_upgrade: sts.enumStruct({
            codeHash: H256,
        }),
        authorize_upgrade_without_checks: sts.enumStruct({
            codeHash: H256,
        }),
        kill_prefix: sts.enumStruct({
            prefix: sts.bytes(),
            subkeys: sts.number(),
        }),
        kill_storage: sts.enumStruct({
            keys: sts.array(() => sts.bytes()),
        }),
        remark: sts.enumStruct({
            remark: sts.bytes(),
        }),
        remark_with_event: sts.enumStruct({
            remark: sts.bytes(),
        }),
        set_code: sts.enumStruct({
            code: sts.bytes(),
        }),
        set_code_without_checks: sts.enumStruct({
            code: sts.bytes(),
        }),
        set_heap_pages: sts.enumStruct({
            pages: sts.bigint(),
        }),
        set_storage: sts.enumStruct({
            items: sts.array(() => sts.tuple(() => [sts.bytes(), sts.bytes()])),
        }),
    }
})

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export type SystemCall = SystemCall_apply_authorized_upgrade | SystemCall_authorize_upgrade | SystemCall_authorize_upgrade_without_checks | SystemCall_kill_prefix | SystemCall_kill_storage | SystemCall_remark | SystemCall_remark_with_event | SystemCall_set_code | SystemCall_set_code_without_checks | SystemCall_set_heap_pages | SystemCall_set_storage

/**
 * Provide the preimage (runtime binary) `code` for an upgrade that has been authorized.
 * 
 * If the authorization required a version check, this call will ensure the spec name
 * remains unchanged and that the spec version has increased.
 * 
 * Depending on the runtime's `OnSetCode` configuration, this function may directly apply
 * the new `code` in the same block or attempt to schedule the upgrade.
 * 
 * All origins are allowed.
 */
export interface SystemCall_apply_authorized_upgrade {
    __kind: 'apply_authorized_upgrade'
    code: Bytes
}

/**
 * Authorize an upgrade to a given `code_hash` for the runtime. The runtime can be supplied
 * later.
 * 
 * This call requires Root origin.
 */
export interface SystemCall_authorize_upgrade {
    __kind: 'authorize_upgrade'
    codeHash: H256
}

/**
 * Authorize an upgrade to a given `code_hash` for the runtime. The runtime can be supplied
 * later.
 * 
 * WARNING: This authorizes an upgrade that will take place without any safety checks, for
 * example that the spec name remains the same and that the version number increases. Not
 * recommended for normal use. Use `authorize_upgrade` instead.
 * 
 * This call requires Root origin.
 */
export interface SystemCall_authorize_upgrade_without_checks {
    __kind: 'authorize_upgrade_without_checks'
    codeHash: H256
}

/**
 * Kill all storage items with a key that starts with the given prefix.
 * 
 * **NOTE:** We rely on the Root origin to provide us the number of subkeys under
 * the prefix we are removing to accurately calculate the weight of this function.
 */
export interface SystemCall_kill_prefix {
    __kind: 'kill_prefix'
    prefix: Bytes
    subkeys: number
}

/**
 * Kill some items from storage.
 */
export interface SystemCall_kill_storage {
    __kind: 'kill_storage'
    keys: Bytes[]
}

/**
 * Make some on-chain remark.
 * 
 * Can be executed by every `origin`.
 */
export interface SystemCall_remark {
    __kind: 'remark'
    remark: Bytes
}

/**
 * Make some on-chain remark and emit event.
 */
export interface SystemCall_remark_with_event {
    __kind: 'remark_with_event'
    remark: Bytes
}

/**
 * Set the new runtime code.
 */
export interface SystemCall_set_code {
    __kind: 'set_code'
    code: Bytes
}

/**
 * Set the new runtime code without doing any checks of the given `code`.
 * 
 * Note that runtime upgrades will not run if this is called with a not-increasing spec
 * version!
 */
export interface SystemCall_set_code_without_checks {
    __kind: 'set_code_without_checks'
    code: Bytes
}

/**
 * Set the number of pages in the WebAssembly environment's heap.
 */
export interface SystemCall_set_heap_pages {
    __kind: 'set_heap_pages'
    pages: bigint
}

/**
 * Set some items of storage.
 */
export interface SystemCall_set_storage {
    __kind: 'set_storage'
    items: [Bytes, Bytes][]
}

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export const StakingCall: sts.Type<StakingCall> = sts.closedEnum(() => {
    return  {
        bond: sts.enumStruct({
            value: sts.bigint(),
            payee: RewardDestination,
        }),
        bond_extra: sts.enumStruct({
            maxAdditional: sts.bigint(),
        }),
        cancel_deferred_slash: sts.enumStruct({
            era: sts.number(),
            slashIndices: sts.array(() => sts.number()),
        }),
        chill: sts.unit(),
        chill_other: sts.enumStruct({
            stash: AccountId32,
        }),
        deprecate_controller_batch: sts.enumStruct({
            controllers: sts.array(() => AccountId32),
        }),
        force_apply_min_commission: sts.enumStruct({
            validatorStash: AccountId32,
        }),
        force_new_era: sts.unit(),
        force_new_era_always: sts.unit(),
        force_no_eras: sts.unit(),
        force_unstake: sts.enumStruct({
            stash: AccountId32,
            numSlashingSpans: sts.number(),
        }),
        increase_validator_count: sts.enumStruct({
            additional: sts.number(),
        }),
        kick: sts.enumStruct({
            who: sts.array(() => MultiAddress),
        }),
        manual_slash: sts.enumStruct({
            validatorStash: AccountId32,
            era: sts.number(),
            slashFraction: Perbill,
        }),
        migrate_currency: sts.enumStruct({
            stash: AccountId32,
        }),
        nominate: sts.enumStruct({
            targets: sts.array(() => MultiAddress),
        }),
        payout_stakers: sts.enumStruct({
            validatorStash: AccountId32,
            era: sts.number(),
        }),
        payout_stakers_by_page: sts.enumStruct({
            validatorStash: AccountId32,
            era: sts.number(),
            page: sts.number(),
        }),
        reap_stash: sts.enumStruct({
            stash: AccountId32,
            numSlashingSpans: sts.number(),
        }),
        rebond: sts.enumStruct({
            value: sts.bigint(),
        }),
        restore_ledger: sts.enumStruct({
            stash: AccountId32,
            maybeController: sts.option(() => AccountId32),
            maybeTotal: sts.option(() => sts.bigint()),
            maybeUnlocking: sts.option(() => sts.array(() => UnlockChunk)),
        }),
        scale_validator_count: sts.enumStruct({
            factor: Percent,
        }),
        set_controller: sts.unit(),
        set_invulnerables: sts.enumStruct({
            invulnerables: sts.array(() => AccountId32),
        }),
        set_min_commission: sts.enumStruct({
            new: Perbill,
        }),
        set_payee: sts.enumStruct({
            payee: RewardDestination,
        }),
        set_staking_configs: sts.enumStruct({
            minNominatorBond: ConfigOp,
            minValidatorBond: ConfigOp,
            maxNominatorCount: Type_125,
            maxValidatorCount: Type_125,
            chillThreshold: Type_126,
            minCommission: Type_127,
            maxStakedRewards: Type_126,
        }),
        set_validator_count: sts.enumStruct({
            new: sts.number(),
        }),
        unbond: sts.enumStruct({
            value: sts.bigint(),
        }),
        update_payee: sts.enumStruct({
            controller: AccountId32,
        }),
        validate: sts.enumStruct({
            prefs: ValidatorPrefs,
        }),
        withdraw_unbonded: sts.enumStruct({
            numSlashingSpans: sts.number(),
        }),
    }
})

export const ValidatorPrefs: sts.Type<ValidatorPrefs> = sts.struct(() => {
    return  {
        commission: sts.number(),
        blocked: sts.boolean(),
    }
})

export interface ValidatorPrefs {
    commission: number
    blocked: boolean
}

export const Type_127: sts.Type<Type_127> = sts.closedEnum(() => {
    return  {
        Noop: sts.unit(),
        Remove: sts.unit(),
        Set: Perbill,
    }
})

export type Type_127 = Type_127_Noop | Type_127_Remove | Type_127_Set

export interface Type_127_Noop {
    __kind: 'Noop'
}

export interface Type_127_Remove {
    __kind: 'Remove'
}

export interface Type_127_Set {
    __kind: 'Set'
    value: Perbill
}

export type Perbill = number

export const Type_126: sts.Type<Type_126> = sts.closedEnum(() => {
    return  {
        Noop: sts.unit(),
        Remove: sts.unit(),
        Set: Percent,
    }
})

export type Type_126 = Type_126_Noop | Type_126_Remove | Type_126_Set

export interface Type_126_Noop {
    __kind: 'Noop'
}

export interface Type_126_Remove {
    __kind: 'Remove'
}

export interface Type_126_Set {
    __kind: 'Set'
    value: Percent
}

export type Percent = number

export const Type_125: sts.Type<Type_125> = sts.closedEnum(() => {
    return  {
        Noop: sts.unit(),
        Remove: sts.unit(),
        Set: sts.number(),
    }
})

export type Type_125 = Type_125_Noop | Type_125_Remove | Type_125_Set

export interface Type_125_Noop {
    __kind: 'Noop'
}

export interface Type_125_Remove {
    __kind: 'Remove'
}

export interface Type_125_Set {
    __kind: 'Set'
    value: number
}

export const ConfigOp: sts.Type<ConfigOp> = sts.closedEnum(() => {
    return  {
        Noop: sts.unit(),
        Remove: sts.unit(),
        Set: sts.bigint(),
    }
})

export type ConfigOp = ConfigOp_Noop | ConfigOp_Remove | ConfigOp_Set

export interface ConfigOp_Noop {
    __kind: 'Noop'
}

export interface ConfigOp_Remove {
    __kind: 'Remove'
}

export interface ConfigOp_Set {
    __kind: 'Set'
    value: bigint
}

export const Percent = sts.number()

export const UnlockChunk: sts.Type<UnlockChunk> = sts.struct(() => {
    return  {
        value: sts.bigint(),
        era: sts.number(),
    }
})

export interface UnlockChunk {
    value: bigint
    era: number
}

export const Perbill = sts.number()

export const RewardDestination: sts.Type<RewardDestination> = sts.closedEnum(() => {
    return  {
        Account: AccountId32,
        Controller: sts.unit(),
        None: sts.unit(),
        Staked: sts.unit(),
        Stash: sts.unit(),
    }
})

export type RewardDestination = RewardDestination_Account | RewardDestination_Controller | RewardDestination_None | RewardDestination_Staked | RewardDestination_Stash

export interface RewardDestination_Account {
    __kind: 'Account'
    value: AccountId32
}

export interface RewardDestination_Controller {
    __kind: 'Controller'
}

export interface RewardDestination_None {
    __kind: 'None'
}

export interface RewardDestination_Staked {
    __kind: 'Staked'
}

export interface RewardDestination_Stash {
    __kind: 'Stash'
}

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export type StakingCall = StakingCall_bond | StakingCall_bond_extra | StakingCall_cancel_deferred_slash | StakingCall_chill | StakingCall_chill_other | StakingCall_deprecate_controller_batch | StakingCall_force_apply_min_commission | StakingCall_force_new_era | StakingCall_force_new_era_always | StakingCall_force_no_eras | StakingCall_force_unstake | StakingCall_increase_validator_count | StakingCall_kick | StakingCall_manual_slash | StakingCall_migrate_currency | StakingCall_nominate | StakingCall_payout_stakers | StakingCall_payout_stakers_by_page | StakingCall_reap_stash | StakingCall_rebond | StakingCall_restore_ledger | StakingCall_scale_validator_count | StakingCall_set_controller | StakingCall_set_invulnerables | StakingCall_set_min_commission | StakingCall_set_payee | StakingCall_set_staking_configs | StakingCall_set_validator_count | StakingCall_unbond | StakingCall_update_payee | StakingCall_validate | StakingCall_withdraw_unbonded

/**
 * Take the origin account as a stash and lock up `value` of its balance. `controller` will
 * be the account that controls it.
 * 
 * `value` must be more than the `minimum_balance` specified by `T::Currency`.
 * 
 * The dispatch origin for this call must be _Signed_ by the stash account.
 * 
 * Emits `Bonded`.
 * ## Complexity
 * - Independent of the arguments. Moderate complexity.
 * - O(1).
 * - Three extra DB entries.
 * 
 * NOTE: Two of the storage writes (`Self::bonded`, `Self::payee`) are _never_ cleaned
 * unless the `origin` falls below _existential deposit_ (or equal to 0) and gets removed
 * as dust.
 */
export interface StakingCall_bond {
    __kind: 'bond'
    value: bigint
    payee: RewardDestination
}

/**
 * Add some extra amount that have appeared in the stash `free_balance` into the balance up
 * for staking.
 * 
 * The dispatch origin for this call must be _Signed_ by the stash, not the controller.
 * 
 * Use this if there are additional funds in your stash account that you wish to bond.
 * Unlike [`bond`](Self::bond) or [`unbond`](Self::unbond) this function does not impose
 * any limitation on the amount that can be added.
 * 
 * Emits `Bonded`.
 * 
 * ## Complexity
 * - Independent of the arguments. Insignificant complexity.
 * - O(1).
 */
export interface StakingCall_bond_extra {
    __kind: 'bond_extra'
    maxAdditional: bigint
}

/**
 * Cancel enactment of a deferred slash.
 * 
 * Can be called by the `T::AdminOrigin`.
 * 
 * Parameters: era and indices of the slashes for that era to kill.
 */
export interface StakingCall_cancel_deferred_slash {
    __kind: 'cancel_deferred_slash'
    era: number
    slashIndices: number[]
}

/**
 * Declare no desire to either validate or nominate.
 * 
 * Effects will be felt at the beginning of the next era.
 * 
 * The dispatch origin for this call must be _Signed_ by the controller, not the stash.
 * 
 * ## Complexity
 * - Independent of the arguments. Insignificant complexity.
 * - Contains one read.
 * - Writes are limited to the `origin` account key.
 */
export interface StakingCall_chill {
    __kind: 'chill'
}

/**
 * Declare a `controller` to stop participating as either a validator or nominator.
 * 
 * Effects will be felt at the beginning of the next era.
 * 
 * The dispatch origin for this call must be _Signed_, but can be called by anyone.
 * 
 * If the caller is the same as the controller being targeted, then no further checks are
 * enforced, and this function behaves just like `chill`.
 * 
 * If the caller is different than the controller being targeted, the following conditions
 * must be met:
 * 
 * * `controller` must belong to a nominator who has become non-decodable,
 * 
 * Or:
 * 
 * * A `ChillThreshold` must be set and checked which defines how close to the max
 *   nominators or validators we must reach before users can start chilling one-another.
 * * A `MaxNominatorCount` and `MaxValidatorCount` must be set which is used to determine
 *   how close we are to the threshold.
 * * A `MinNominatorBond` and `MinValidatorBond` must be set and checked, which determines
 *   if this is a person that should be chilled because they have not met the threshold
 *   bond required.
 * 
 * This can be helpful if bond requirements are updated, and we need to remove old users
 * who do not satisfy these requirements.
 */
export interface StakingCall_chill_other {
    __kind: 'chill_other'
    stash: AccountId32
}

/**
 * Updates a batch of controller accounts to their corresponding stash account if they are
 * not the same. Ignores any controller accounts that do not exist, and does not operate if
 * the stash and controller are already the same.
 * 
 * Effects will be felt instantly (as soon as this function is completed successfully).
 * 
 * The dispatch origin must be `T::AdminOrigin`.
 */
export interface StakingCall_deprecate_controller_batch {
    __kind: 'deprecate_controller_batch'
    controllers: AccountId32[]
}

/**
 * Force a validator to have at least the minimum commission. This will not affect a
 * validator who already has a commission greater than or equal to the minimum. Any account
 * can call this.
 */
export interface StakingCall_force_apply_min_commission {
    __kind: 'force_apply_min_commission'
    validatorStash: AccountId32
}

/**
 * Force there to be a new era at the end of the next session. After this, it will be
 * reset to normal (non-forced) behaviour.
 * 
 * The dispatch origin must be Root.
 * 
 * # Warning
 * 
 * The election process starts multiple blocks before the end of the era.
 * If this is called just before a new era is triggered, the election process may not
 * have enough blocks to get a result.
 * 
 * ## Complexity
 * - No arguments.
 * - Weight: O(1)
 */
export interface StakingCall_force_new_era {
    __kind: 'force_new_era'
}

/**
 * Force there to be a new era at the end of sessions indefinitely.
 * 
 * The dispatch origin must be Root.
 * 
 * # Warning
 * 
 * The election process starts multiple blocks before the end of the era.
 * If this is called just before a new era is triggered, the election process may not
 * have enough blocks to get a result.
 */
export interface StakingCall_force_new_era_always {
    __kind: 'force_new_era_always'
}

/**
 * Force there to be no new eras indefinitely.
 * 
 * The dispatch origin must be Root.
 * 
 * # Warning
 * 
 * The election process starts multiple blocks before the end of the era.
 * Thus the election process may be ongoing when this is called. In this case the
 * election will continue until the next era is triggered.
 * 
 * ## Complexity
 * - No arguments.
 * - Weight: O(1)
 */
export interface StakingCall_force_no_eras {
    __kind: 'force_no_eras'
}

/**
 * Force a current staker to become completely unstaked, immediately.
 * 
 * The dispatch origin must be Root.
 * 
 * ## Parameters
 * 
 * - `num_slashing_spans`: Refer to comments on [`Call::withdraw_unbonded`] for more
 * details.
 */
export interface StakingCall_force_unstake {
    __kind: 'force_unstake'
    stash: AccountId32
    numSlashingSpans: number
}

/**
 * Increments the ideal number of validators up to maximum of
 * `ElectionProviderBase::MaxWinners`.
 * 
 * The dispatch origin must be Root.
 * 
 * ## Complexity
 * Same as [`Self::set_validator_count`].
 */
export interface StakingCall_increase_validator_count {
    __kind: 'increase_validator_count'
    additional: number
}

/**
 * Remove the given nominations from the calling validator.
 * 
 * Effects will be felt at the beginning of the next era.
 * 
 * The dispatch origin for this call must be _Signed_ by the controller, not the stash.
 * 
 * - `who`: A list of nominator stash accounts who are nominating this validator which
 *   should no longer be nominating this validator.
 * 
 * Note: Making this call only makes sense if you first set the validator preferences to
 * block any further nominations.
 */
export interface StakingCall_kick {
    __kind: 'kick'
    who: MultiAddress[]
}

/**
 * This function allows governance to manually slash a validator and is a
 * **fallback mechanism**.
 * 
 * The dispatch origin must be `T::AdminOrigin`.
 * 
 * ## Parameters
 * - `validator_stash` - The stash account of the validator to slash.
 * - `era` - The era in which the validator was in the active set.
 * - `slash_fraction` - The percentage of the stake to slash, expressed as a Perbill.
 * 
 * ## Behavior
 * 
 * The slash will be applied using the standard slashing mechanics, respecting the
 * configured `SlashDeferDuration`.
 * 
 * This means:
 * - If the validator was already slashed by a higher percentage for the same era, this
 *   slash will have no additional effect.
 * - If the validator was previously slashed by a lower percentage, only the difference
 *   will be applied.
 * - The slash will be deferred by `SlashDeferDuration` eras before being enacted.
 */
export interface StakingCall_manual_slash {
    __kind: 'manual_slash'
    validatorStash: AccountId32
    era: number
    slashFraction: Perbill
}

/**
 * Removes the legacy Staking locks if they exist.
 * 
 * This removes the legacy lock on the stake with [`Config::OldCurrency`] and creates a
 * hold on it if needed. If all stake cannot be held, the best effort is made to hold as
 * much as possible. The remaining stake is forced withdrawn from the ledger.
 * 
 * The fee is waived if the migration is successful.
 */
export interface StakingCall_migrate_currency {
    __kind: 'migrate_currency'
    stash: AccountId32
}

/**
 * Declare the desire to nominate `targets` for the origin controller.
 * 
 * Effects will be felt at the beginning of the next era.
 * 
 * The dispatch origin for this call must be _Signed_ by the controller, not the stash.
 * 
 * ## Complexity
 * - The transaction's complexity is proportional to the size of `targets` (N)
 * which is capped at CompactAssignments::LIMIT (T::MaxNominations).
 * - Both the reads and writes follow a similar pattern.
 */
export interface StakingCall_nominate {
    __kind: 'nominate'
    targets: MultiAddress[]
}

/**
 * Pay out next page of the stakers behind a validator for the given era.
 * 
 * - `validator_stash` is the stash account of the validator.
 * - `era` may be any era between `[current_era - history_depth; current_era]`.
 * 
 * The origin of this call must be _Signed_. Any account can call this function, even if
 * it is not one of the stakers.
 * 
 * The reward payout could be paged in case there are too many nominators backing the
 * `validator_stash`. This call will payout unpaid pages in an ascending order. To claim a
 * specific page, use `payout_stakers_by_page`.`
 * 
 * If all pages are claimed, it returns an error `InvalidPage`.
 */
export interface StakingCall_payout_stakers {
    __kind: 'payout_stakers'
    validatorStash: AccountId32
    era: number
}

/**
 * Pay out a page of the stakers behind a validator for the given era and page.
 * 
 * - `validator_stash` is the stash account of the validator.
 * - `era` may be any era between `[current_era - history_depth; current_era]`.
 * - `page` is the page index of nominators to pay out with value between 0 and
 *   `num_nominators / T::MaxExposurePageSize`.
 * 
 * The origin of this call must be _Signed_. Any account can call this function, even if
 * it is not one of the stakers.
 * 
 * If a validator has more than [`Config::MaxExposurePageSize`] nominators backing
 * them, then the list of nominators is paged, with each page being capped at
 * [`Config::MaxExposurePageSize`.] If a validator has more than one page of nominators,
 * the call needs to be made for each page separately in order for all the nominators
 * backing a validator to receive the reward. The nominators are not sorted across pages
 * and so it should not be assumed the highest staker would be on the topmost page and vice
 * versa. If rewards are not claimed in [`Config::HistoryDepth`] eras, they are lost.
 */
export interface StakingCall_payout_stakers_by_page {
    __kind: 'payout_stakers_by_page'
    validatorStash: AccountId32
    era: number
    page: number
}

/**
 * Remove all data structures concerning a staker/stash once it is at a state where it can
 * be considered `dust` in the staking system. The requirements are:
 * 
 * 1. the `total_balance` of the stash is below existential deposit.
 * 2. or, the `ledger.total` of the stash is below existential deposit.
 * 3. or, existential deposit is zero and either `total_balance` or `ledger.total` is zero.
 * 
 * The former can happen in cases like a slash; the latter when a fully unbonded account
 * is still receiving staking rewards in `RewardDestination::Staked`.
 * 
 * It can be called by anyone, as long as `stash` meets the above requirements.
 * 
 * Refunds the transaction fees upon successful execution.
 * 
 * ## Parameters
 * 
 * - `num_slashing_spans`: Refer to comments on [`Call::withdraw_unbonded`] for more
 * details.
 */
export interface StakingCall_reap_stash {
    __kind: 'reap_stash'
    stash: AccountId32
    numSlashingSpans: number
}

/**
 * Rebond a portion of the stash scheduled to be unlocked.
 * 
 * The dispatch origin must be signed by the controller.
 * 
 * ## Complexity
 * - Time complexity: O(L), where L is unlocking chunks
 * - Bounded by `MaxUnlockingChunks`.
 */
export interface StakingCall_rebond {
    __kind: 'rebond'
    value: bigint
}

/**
 * Restores the state of a ledger which is in an inconsistent state.
 * 
 * The requirements to restore a ledger are the following:
 * * The stash is bonded; or
 * * The stash is not bonded but it has a staking lock left behind; or
 * * If the stash has an associated ledger and its state is inconsistent; or
 * * If the ledger is not corrupted *but* its staking lock is out of sync.
 * 
 * The `maybe_*` input parameters will overwrite the corresponding data and metadata of the
 * ledger associated with the stash. If the input parameters are not set, the ledger will
 * be reset values from on-chain state.
 */
export interface StakingCall_restore_ledger {
    __kind: 'restore_ledger'
    stash: AccountId32
    maybeController?: (AccountId32 | undefined)
    maybeTotal?: (bigint | undefined)
    maybeUnlocking?: (UnlockChunk[] | undefined)
}

/**
 * Scale up the ideal number of validators by a factor up to maximum of
 * `ElectionProviderBase::MaxWinners`.
 * 
 * The dispatch origin must be Root.
 * 
 * ## Complexity
 * Same as [`Self::set_validator_count`].
 */
export interface StakingCall_scale_validator_count {
    __kind: 'scale_validator_count'
    factor: Percent
}

/**
 * (Re-)sets the controller of a stash to the stash itself. This function previously
 * accepted a `controller` argument to set the controller to an account other than the
 * stash itself. This functionality has now been removed, now only setting the controller
 * to the stash, if it is not already.
 * 
 * Effects will be felt instantly (as soon as this function is completed successfully).
 * 
 * The dispatch origin for this call must be _Signed_ by the stash, not the controller.
 * 
 * ## Complexity
 * O(1)
 * - Independent of the arguments. Insignificant complexity.
 * - Contains a limited number of reads.
 * - Writes are limited to the `origin` account key.
 */
export interface StakingCall_set_controller {
    __kind: 'set_controller'
}

/**
 * Set the validators who cannot be slashed (if any).
 * 
 * The dispatch origin must be Root.
 */
export interface StakingCall_set_invulnerables {
    __kind: 'set_invulnerables'
    invulnerables: AccountId32[]
}

/**
 * Sets the minimum amount of commission that each validators must maintain.
 * 
 * This call has lower privilege requirements than `set_staking_config` and can be called
 * by the `T::AdminOrigin`. Root can always call this.
 */
export interface StakingCall_set_min_commission {
    __kind: 'set_min_commission'
    new: Perbill
}

/**
 * (Re-)set the payment target for a controller.
 * 
 * Effects will be felt instantly (as soon as this function is completed successfully).
 * 
 * The dispatch origin for this call must be _Signed_ by the controller, not the stash.
 * 
 * ## Complexity
 * - O(1)
 * - Independent of the arguments. Insignificant complexity.
 * - Contains a limited number of reads.
 * - Writes are limited to the `origin` account key.
 * ---------
 */
export interface StakingCall_set_payee {
    __kind: 'set_payee'
    payee: RewardDestination
}

/**
 * Update the various staking configurations .
 * 
 * * `min_nominator_bond`: The minimum active bond needed to be a nominator.
 * * `min_validator_bond`: The minimum active bond needed to be a validator.
 * * `max_nominator_count`: The max number of users who can be a nominator at once. When
 *   set to `None`, no limit is enforced.
 * * `max_validator_count`: The max number of users who can be a validator at once. When
 *   set to `None`, no limit is enforced.
 * * `chill_threshold`: The ratio of `max_nominator_count` or `max_validator_count` which
 *   should be filled in order for the `chill_other` transaction to work.
 * * `min_commission`: The minimum amount of commission that each validators must maintain.
 *   This is checked only upon calling `validate`. Existing validators are not affected.
 * 
 * RuntimeOrigin must be Root to call this function.
 * 
 * NOTE: Existing nominators and validators will not be affected by this update.
 * to kick people under the new limits, `chill_other` should be called.
 */
export interface StakingCall_set_staking_configs {
    __kind: 'set_staking_configs'
    minNominatorBond: ConfigOp
    minValidatorBond: ConfigOp
    maxNominatorCount: Type_125
    maxValidatorCount: Type_125
    chillThreshold: Type_126
    minCommission: Type_127
    maxStakedRewards: Type_126
}

/**
 * Sets the ideal number of validators.
 * 
 * The dispatch origin must be Root.
 * 
 * ## Complexity
 * O(1)
 */
export interface StakingCall_set_validator_count {
    __kind: 'set_validator_count'
    new: number
}

/**
 * Schedule a portion of the stash to be unlocked ready for transfer out after the bond
 * period ends. If this leaves an amount actively bonded less than
 * [`asset::existential_deposit`], then it is increased to the full amount.
 * 
 * The dispatch origin for this call must be _Signed_ by the controller, not the stash.
 * 
 * Once the unlock period is done, you can call `withdraw_unbonded` to actually move
 * the funds out of management ready for transfer.
 * 
 * No more than a limited number of unlocking chunks (see `MaxUnlockingChunks`)
 * can co-exists at the same time. If there are no unlocking chunks slots available
 * [`Call::withdraw_unbonded`] is called to remove some of the chunks (if possible).
 * 
 * If a user encounters the `InsufficientBond` error when calling this extrinsic,
 * they should call `chill` first in order to free up their bonded funds.
 * 
 * Emits `Unbonded`.
 * 
 * See also [`Call::withdraw_unbonded`].
 */
export interface StakingCall_unbond {
    __kind: 'unbond'
    value: bigint
}

/**
 * Migrates an account's `RewardDestination::Controller` to
 * `RewardDestination::Account(controller)`.
 * 
 * Effects will be felt instantly (as soon as this function is completed successfully).
 * 
 * This will waive the transaction fee if the `payee` is successfully migrated.
 */
export interface StakingCall_update_payee {
    __kind: 'update_payee'
    controller: AccountId32
}

/**
 * Declare the desire to validate for the origin controller.
 * 
 * Effects will be felt at the beginning of the next era.
 * 
 * The dispatch origin for this call must be _Signed_ by the controller, not the stash.
 */
export interface StakingCall_validate {
    __kind: 'validate'
    prefs: ValidatorPrefs
}

/**
 * Remove any unlocked chunks from the `unlocking` queue from our management.
 * 
 * This essentially frees up that balance to be used by the stash account to do whatever
 * it wants.
 * 
 * The dispatch origin for this call must be _Signed_ by the controller.
 * 
 * Emits `Withdrawn`.
 * 
 * See also [`Call::unbond`].
 * 
 * ## Parameters
 * 
 * - `num_slashing_spans` indicates the number of metadata slashing spans to clear when
 * this call results in a complete removal of all the data related to the stash account.
 * In this case, the `num_slashing_spans` must be larger or equal to the number of
 * slashing spans associated with the stash account in the [`SlashingSpans`] storage type,
 * otherwise the call will fail. The call weight is directly proportional to
 * `num_slashing_spans`.
 * 
 * ## Complexity
 * O(S) where S is the number of slashing spans to remove
 * NOTE: Weight annotation is the kill scenario, we refund otherwise.
 */
export interface StakingCall_withdraw_unbonded {
    __kind: 'withdraw_unbonded'
    numSlashingSpans: number
}

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export const SocietyCall: sts.Type<SocietyCall> = sts.closedEnum(() => {
    return  {
        bestow_membership: sts.enumStruct({
            candidate: AccountId32,
        }),
        bid: sts.enumStruct({
            value: sts.bigint(),
        }),
        claim_membership: sts.unit(),
        cleanup_candidacy: sts.enumStruct({
            candidate: AccountId32,
            max: sts.number(),
        }),
        cleanup_challenge: sts.enumStruct({
            challengeRound: sts.number(),
            max: sts.number(),
        }),
        defender_vote: sts.enumStruct({
            approve: sts.boolean(),
        }),
        dissolve: sts.unit(),
        drop_candidate: sts.enumStruct({
            candidate: AccountId32,
        }),
        found_society: sts.enumStruct({
            founder: MultiAddress,
            maxMembers: sts.number(),
            maxIntake: sts.number(),
            maxStrikes: sts.number(),
            candidateDeposit: sts.bigint(),
            rules: sts.bytes(),
        }),
        judge_suspended_member: sts.enumStruct({
            who: MultiAddress,
            forgive: sts.boolean(),
        }),
        kick_candidate: sts.enumStruct({
            candidate: AccountId32,
        }),
        payout: sts.unit(),
        punish_skeptic: sts.unit(),
        resign_candidacy: sts.unit(),
        set_parameters: sts.enumStruct({
            maxMembers: sts.number(),
            maxIntake: sts.number(),
            maxStrikes: sts.number(),
            candidateDeposit: sts.bigint(),
        }),
        unbid: sts.unit(),
        unvouch: sts.unit(),
        vote: sts.enumStruct({
            candidate: MultiAddress,
            approve: sts.boolean(),
        }),
        vouch: sts.enumStruct({
            who: MultiAddress,
            value: sts.bigint(),
            tip: sts.bigint(),
        }),
        waive_repay: sts.enumStruct({
            amount: sts.bigint(),
        }),
    }
})

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export type SocietyCall = SocietyCall_bestow_membership | SocietyCall_bid | SocietyCall_claim_membership | SocietyCall_cleanup_candidacy | SocietyCall_cleanup_challenge | SocietyCall_defender_vote | SocietyCall_dissolve | SocietyCall_drop_candidate | SocietyCall_found_society | SocietyCall_judge_suspended_member | SocietyCall_kick_candidate | SocietyCall_payout | SocietyCall_punish_skeptic | SocietyCall_resign_candidacy | SocietyCall_set_parameters | SocietyCall_unbid | SocietyCall_unvouch | SocietyCall_vote | SocietyCall_vouch | SocietyCall_waive_repay

/**
 * Transform an approved candidate into a member. Callable only by the Signed origin of the
 * Founder, only after the period for voting has ended and only when the candidate is not
 * clearly rejected.
 */
export interface SocietyCall_bestow_membership {
    __kind: 'bestow_membership'
    candidate: AccountId32
}

/**
 * A user outside of the society can make a bid for entry.
 * 
 * Payment: The group's Candidate Deposit will be reserved for making a bid. It is returned
 * when the bid becomes a member, or if the bid calls `unbid`.
 * 
 * The dispatch origin for this call must be _Signed_.
 * 
 * Parameters:
 * - `value`: A one time payment the bid would like to receive when joining the society.
 */
export interface SocietyCall_bid {
    __kind: 'bid'
    value: bigint
}

/**
 * Transform an approved candidate into a member. Callable only by the
 * the candidate, and only after the period for voting has ended.
 */
export interface SocietyCall_claim_membership {
    __kind: 'claim_membership'
}

/**
 * Remove up to `max` stale votes for the given `candidate`.
 * 
 * May be called by any Signed origin, but only after the candidate's candidacy is ended.
 */
export interface SocietyCall_cleanup_candidacy {
    __kind: 'cleanup_candidacy'
    candidate: AccountId32
    max: number
}

/**
 * Remove up to `max` stale votes for the defender in the given `challenge_round`.
 * 
 * May be called by any Signed origin, but only after the challenge round is ended.
 */
export interface SocietyCall_cleanup_challenge {
    __kind: 'cleanup_challenge'
    challengeRound: number
    max: number
}

/**
 * As a member, vote on the defender.
 * 
 * The dispatch origin for this call must be _Signed_ and a member.
 * 
 * Parameters:
 * - `approve`: A boolean which says if the candidate should be
 * approved (`true`) or rejected (`false`).
 */
export interface SocietyCall_defender_vote {
    __kind: 'defender_vote'
    approve: boolean
}

/**
 * Dissolve the society and remove all members.
 * 
 * The dispatch origin for this call must be Signed, and the signing account must be both
 * the `Founder` and the `Head`. This implies that it may only be done when there is one
 * member.
 */
export interface SocietyCall_dissolve {
    __kind: 'dissolve'
}

/**
 * Remove a `candidate`'s failed application from the society. Callable by any
 * signed origin but only at the end of the subsequent round and only for
 * a candidate with more rejections than approvals.
 * 
 * The bid deposit is lost and the voucher is banned.
 */
export interface SocietyCall_drop_candidate {
    __kind: 'drop_candidate'
    candidate: AccountId32
}

/**
 * Found the society.
 * 
 * This is done as a discrete action in order to allow for the
 * pallet to be included into a running chain and can only be done once.
 * 
 * The dispatch origin for this call must be from the _FounderSetOrigin_.
 * 
 * Parameters:
 * - `founder` - The first member and head of the newly founded society.
 * - `max_members` - The initial max number of members for the society.
 * - `max_intake` - The maximum number of candidates per intake period.
 * - `max_strikes`: The maximum number of strikes a member may get before they become
 *   suspended and may only be reinstated by the founder.
 * - `candidate_deposit`: The deposit required to make a bid for membership of the group.
 * - `rules` - The rules of this society concerning membership.
 * 
 * Complexity: O(1)
 */
export interface SocietyCall_found_society {
    __kind: 'found_society'
    founder: MultiAddress
    maxMembers: number
    maxIntake: number
    maxStrikes: number
    candidateDeposit: bigint
    rules: Bytes
}

/**
 * Allow suspension judgement origin to make judgement on a suspended member.
 * 
 * If a suspended member is forgiven, we simply add them back as a member, not affecting
 * any of the existing storage items for that member.
 * 
 * If a suspended member is rejected, remove all associated storage items, including
 * their payouts, and remove any vouched bids they currently have.
 * 
 * The dispatch origin for this call must be Signed from the Founder.
 * 
 * Parameters:
 * - `who` - The suspended member to be judged.
 * - `forgive` - A boolean representing whether the suspension judgement origin forgives
 *   (`true`) or rejects (`false`) a suspended member.
 */
export interface SocietyCall_judge_suspended_member {
    __kind: 'judge_suspended_member'
    who: MultiAddress
    forgive: boolean
}

/**
 * Remove the candidate's application from the society. Callable only by the Signed origin
 * of the Founder, only after the period for voting has ended, and only when they do not
 * have a clear approval.
 * 
 * Any bid deposit is lost and voucher is banned.
 */
export interface SocietyCall_kick_candidate {
    __kind: 'kick_candidate'
    candidate: AccountId32
}

/**
 * Transfer the first matured payout for the sender and remove it from the records.
 * 
 * NOTE: This extrinsic needs to be called multiple times to claim multiple matured
 * payouts.
 * 
 * Payment: The member will receive a payment equal to their first matured
 * payout to their free balance.
 * 
 * The dispatch origin for this call must be _Signed_ and a member with
 * payouts remaining.
 */
export interface SocietyCall_payout {
    __kind: 'payout'
}

/**
 * Punish the skeptic with a strike if they did not vote on a candidate. Callable by the
 * candidate.
 */
export interface SocietyCall_punish_skeptic {
    __kind: 'punish_skeptic'
}

/**
 * Remove the candidate's application from the society. Callable only by the candidate.
 * 
 * Any bid deposit is lost and voucher is banned.
 */
export interface SocietyCall_resign_candidacy {
    __kind: 'resign_candidacy'
}

/**
 * Change the maximum number of members in society and the maximum number of new candidates
 * in a single intake period.
 * 
 * The dispatch origin for this call must be Signed by the Founder.
 * 
 * Parameters:
 * - `max_members` - The maximum number of members for the society. This must be no less
 *   than the current number of members.
 * - `max_intake` - The maximum number of candidates per intake period.
 * - `max_strikes`: The maximum number of strikes a member may get before they become
 *   suspended and may only be reinstated by the founder.
 * - `candidate_deposit`: The deposit required to make a bid for membership of the group.
 */
export interface SocietyCall_set_parameters {
    __kind: 'set_parameters'
    maxMembers: number
    maxIntake: number
    maxStrikes: number
    candidateDeposit: bigint
}

/**
 * A bidder can remove their bid for entry into society.
 * By doing so, they will have their candidate deposit returned or
 * they will unvouch their voucher.
 * 
 * Payment: The bid deposit is unreserved if the user made a bid.
 * 
 * The dispatch origin for this call must be _Signed_ and a bidder.
 */
export interface SocietyCall_unbid {
    __kind: 'unbid'
}

/**
 * As a vouching member, unvouch a bid. This only works while vouched user is
 * only a bidder (and not a candidate).
 * 
 * The dispatch origin for this call must be _Signed_ and a vouching member.
 * 
 * Parameters:
 * - `pos`: Position in the `Bids` vector of the bid who should be unvouched.
 */
export interface SocietyCall_unvouch {
    __kind: 'unvouch'
}

/**
 * As a member, vote on a candidate.
 * 
 * The dispatch origin for this call must be _Signed_ and a member.
 * 
 * Parameters:
 * - `candidate`: The candidate that the member would like to bid on.
 * - `approve`: A boolean which says if the candidate should be approved (`true`) or
 *   rejected (`false`).
 */
export interface SocietyCall_vote {
    __kind: 'vote'
    candidate: MultiAddress
    approve: boolean
}

/**
 * As a member, vouch for someone to join society by placing a bid on their behalf.
 * 
 * There is no deposit required to vouch for a new bid, but a member can only vouch for
 * one bid at a time. If the bid becomes a suspended candidate and ultimately rejected by
 * the suspension judgement origin, the member will be banned from vouching again.
 * 
 * As a vouching member, you can claim a tip if the candidate is accepted. This tip will
 * be paid as a portion of the reward the member will receive for joining the society.
 * 
 * The dispatch origin for this call must be _Signed_ and a member.
 * 
 * Parameters:
 * - `who`: The user who you would like to vouch for.
 * - `value`: The total reward to be paid between you and the candidate if they become
 * a member in the society.
 * - `tip`: Your cut of the total `value` payout when the candidate is inducted into
 * the society. Tips larger than `value` will be saturated upon payout.
 */
export interface SocietyCall_vouch {
    __kind: 'vouch'
    who: MultiAddress
    value: bigint
    tip: bigint
}

/**
 * Repay the payment previously given to the member with the signed origin, remove any
 * pending payments, and elevate them from rank 0 to rank 1.
 */
export interface SocietyCall_waive_repay {
    __kind: 'waive_repay'
    amount: bigint
}

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export const SlotsCall: sts.Type<SlotsCall> = sts.closedEnum(() => {
    return  {
        clear_all_leases: sts.enumStruct({
            para: Id,
        }),
        force_lease: sts.enumStruct({
            para: Id,
            leaser: AccountId32,
            amount: sts.bigint(),
            periodBegin: sts.number(),
            periodCount: sts.number(),
        }),
        trigger_onboard: sts.enumStruct({
            para: Id,
        }),
    }
})

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export type SlotsCall = SlotsCall_clear_all_leases | SlotsCall_force_lease | SlotsCall_trigger_onboard

/**
 * Clear all leases for a Para Id, refunding any deposits back to the original owners.
 * 
 * The dispatch origin for this call must match `T::ForceOrigin`.
 */
export interface SlotsCall_clear_all_leases {
    __kind: 'clear_all_leases'
    para: Id
}

/**
 * Just a connect into the `lease_out` call, in case Root wants to force some lease to
 * happen independently of any other on-chain mechanism to use it.
 * 
 * The dispatch origin for this call must match `T::ForceOrigin`.
 */
export interface SlotsCall_force_lease {
    __kind: 'force_lease'
    para: Id
    leaser: AccountId32
    amount: bigint
    periodBegin: number
    periodCount: number
}

/**
 * Try to onboard a parachain that has a lease for the current lease period.
 * 
 * This function can be useful if there was some state issue with a para that should
 * have onboarded, but was unable to. As long as they have a lease period, we can
 * let them onboard from here.
 * 
 * Origin must be signed, but can be called by anyone.
 */
export interface SlotsCall_trigger_onboard {
    __kind: 'trigger_onboard'
    para: Id
}

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export const SessionCall: sts.Type<SessionCall> = sts.closedEnum(() => {
    return  {
        purge_keys: sts.unit(),
        set_keys: sts.enumStruct({
            keys: SessionKeys,
            proof: sts.bytes(),
        }),
    }
})

export const SessionKeys: sts.Type<SessionKeys> = sts.struct(() => {
    return  {
        grandpa: Public,
        babe: sts.bytes(),
        paraValidator: V8Public,
        paraAssignment: sts.bytes(),
        authorityDiscovery: sts.bytes(),
        beefy: sts.bytes(),
    }
})

export const V8Public = sts.bytes()

export const Public = sts.bytes()

export interface SessionKeys {
    grandpa: Public
    babe: Bytes
    paraValidator: V8Public
    paraAssignment: Bytes
    authorityDiscovery: Bytes
    beefy: Bytes
}

export type V8Public = Bytes

export type Public = Bytes

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export type SessionCall = SessionCall_purge_keys | SessionCall_set_keys

/**
 * Removes any session key(s) of the function caller.
 * 
 * This doesn't take effect until the next session.
 * 
 * The dispatch origin of this function must be Signed and the account must be either be
 * convertible to a validator ID using the chain's typical addressing system (this usually
 * means being a controller account) or directly convertible into a validator ID (which
 * usually means being a stash account).
 * 
 * ## Complexity
 * - `O(1)` in number of key types. Actual cost depends on the number of length of
 *   `T::Keys::key_ids()` which is fixed.
 */
export interface SessionCall_purge_keys {
    __kind: 'purge_keys'
}

/**
 * Sets the session key(s) of the function caller to `keys`.
 * Allows an account to set its session key prior to becoming a validator.
 * This doesn't take effect until the next session.
 * 
 * The dispatch origin of this function must be signed.
 * 
 * ## Complexity
 * - `O(1)`. Actual cost depends on the number of length of `T::Keys::key_ids()` which is
 *   fixed.
 */
export interface SessionCall_set_keys {
    __kind: 'set_keys'
    keys: SessionKeys
    proof: Bytes
}

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export const SchedulerCall: sts.Type<SchedulerCall> = sts.closedEnum(() => {
    return  {
        cancel: sts.enumStruct({
            when: sts.number(),
            index: sts.number(),
        }),
        cancel_named: sts.enumStruct({
            id: sts.bytes(),
        }),
        cancel_retry: sts.enumStruct({
            task: sts.tuple(() => [sts.number(), sts.number()]),
        }),
        cancel_retry_named: sts.enumStruct({
            id: sts.bytes(),
        }),
        schedule: sts.enumStruct({
            when: sts.number(),
            maybePeriodic: sts.option(() => sts.tuple(() => [sts.number(), sts.number()])),
            priority: sts.number(),
            call: Call,
        }),
        schedule_after: sts.enumStruct({
            after: sts.number(),
            maybePeriodic: sts.option(() => sts.tuple(() => [sts.number(), sts.number()])),
            priority: sts.number(),
            call: Call,
        }),
        schedule_named: sts.enumStruct({
            id: sts.bytes(),
            when: sts.number(),
            maybePeriodic: sts.option(() => sts.tuple(() => [sts.number(), sts.number()])),
            priority: sts.number(),
            call: Call,
        }),
        schedule_named_after: sts.enumStruct({
            id: sts.bytes(),
            after: sts.number(),
            maybePeriodic: sts.option(() => sts.tuple(() => [sts.number(), sts.number()])),
            priority: sts.number(),
            call: Call,
        }),
        set_retry: sts.enumStruct({
            task: sts.tuple(() => [sts.number(), sts.number()]),
            retries: sts.number(),
            period: sts.number(),
        }),
        set_retry_named: sts.enumStruct({
            id: sts.bytes(),
            retries: sts.number(),
            period: sts.number(),
        }),
    }
})

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export type SchedulerCall = SchedulerCall_cancel | SchedulerCall_cancel_named | SchedulerCall_cancel_retry | SchedulerCall_cancel_retry_named | SchedulerCall_schedule | SchedulerCall_schedule_after | SchedulerCall_schedule_named | SchedulerCall_schedule_named_after | SchedulerCall_set_retry | SchedulerCall_set_retry_named

/**
 * Cancel an anonymously scheduled task.
 */
export interface SchedulerCall_cancel {
    __kind: 'cancel'
    when: number
    index: number
}

/**
 * Cancel a named scheduled task.
 */
export interface SchedulerCall_cancel_named {
    __kind: 'cancel_named'
    id: Bytes
}

/**
 * Removes the retry configuration of a task.
 */
export interface SchedulerCall_cancel_retry {
    __kind: 'cancel_retry'
    task: [number, number]
}

/**
 * Cancel the retry configuration of a named task.
 */
export interface SchedulerCall_cancel_retry_named {
    __kind: 'cancel_retry_named'
    id: Bytes
}

/**
 * Anonymously schedule a task.
 */
export interface SchedulerCall_schedule {
    __kind: 'schedule'
    when: number
    maybePeriodic?: ([number, number] | undefined)
    priority: number
    call: Call
}

/**
 * Anonymously schedule a task after a delay.
 */
export interface SchedulerCall_schedule_after {
    __kind: 'schedule_after'
    after: number
    maybePeriodic?: ([number, number] | undefined)
    priority: number
    call: Call
}

/**
 * Schedule a named task.
 */
export interface SchedulerCall_schedule_named {
    __kind: 'schedule_named'
    id: Bytes
    when: number
    maybePeriodic?: ([number, number] | undefined)
    priority: number
    call: Call
}

/**
 * Schedule a named task after a delay.
 */
export interface SchedulerCall_schedule_named_after {
    __kind: 'schedule_named_after'
    id: Bytes
    after: number
    maybePeriodic?: ([number, number] | undefined)
    priority: number
    call: Call
}

/**
 * Set a retry configuration for a task so that, in case its scheduled run fails, it will
 * be retried after `period` blocks, for a total amount of `retries` retries or until it
 * succeeds.
 * 
 * Tasks which need to be scheduled for a retry are still subject to weight metering and
 * agenda space, same as a regular task. If a periodic task fails, it will be scheduled
 * normally while the task is retrying.
 * 
 * Tasks scheduled as a result of a retry for a periodic task are unnamed, non-periodic
 * clones of the original task. Their retry configuration will be derived from the
 * original task's configuration, but will have a lower value for `remaining` than the
 * original `total_retries`.
 */
export interface SchedulerCall_set_retry {
    __kind: 'set_retry'
    task: [number, number]
    retries: number
    period: number
}

/**
 * Set a retry configuration for a named task so that, in case its scheduled run fails, it
 * will be retried after `period` blocks, for a total amount of `retries` retries or until
 * it succeeds.
 * 
 * Tasks which need to be scheduled for a retry are still subject to weight metering and
 * agenda space, same as a regular task. If a periodic task fails, it will be scheduled
 * normally while the task is retrying.
 * 
 * Tasks scheduled as a result of a retry for a periodic task are unnamed, non-periodic
 * clones of the original task. Their retry configuration will be derived from the
 * original task's configuration, but will have a lower value for `remaining` than the
 * original `total_retries`.
 */
export interface SchedulerCall_set_retry_named {
    __kind: 'set_retry_named'
    id: Bytes
    retries: number
    period: number
}

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export const RegistrarCall: sts.Type<RegistrarCall> = sts.closedEnum(() => {
    return  {
        add_lock: sts.enumStruct({
            para: Id,
        }),
        deregister: sts.enumStruct({
            id: Id,
        }),
        force_register: sts.enumStruct({
            who: AccountId32,
            deposit: sts.bigint(),
            id: Id,
            genesisHead: HeadData,
            validationCode: ValidationCode,
        }),
        register: sts.enumStruct({
            id: Id,
            genesisHead: HeadData,
            validationCode: ValidationCode,
        }),
        remove_lock: sts.enumStruct({
            para: Id,
        }),
        reserve: sts.unit(),
        schedule_code_upgrade: sts.enumStruct({
            para: Id,
            newCode: ValidationCode,
        }),
        set_current_head: sts.enumStruct({
            para: Id,
            newHead: HeadData,
        }),
        swap: sts.enumStruct({
            id: Id,
            other: Id,
        }),
    }
})

export const ValidationCode = sts.bytes()

export const HeadData = sts.bytes()

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export type RegistrarCall = RegistrarCall_add_lock | RegistrarCall_deregister | RegistrarCall_force_register | RegistrarCall_register | RegistrarCall_remove_lock | RegistrarCall_reserve | RegistrarCall_schedule_code_upgrade | RegistrarCall_set_current_head | RegistrarCall_swap

/**
 * Add a manager lock from a para. This will prevent the manager of a
 * para to deregister or swap a para.
 * 
 * Can be called by Root, the parachain, or the parachain manager if the parachain is
 * unlocked.
 */
export interface RegistrarCall_add_lock {
    __kind: 'add_lock'
    para: Id
}

/**
 * Deregister a Para Id, freeing all data and returning any deposit.
 * 
 * The caller must be Root, the `para` owner, or the `para` itself. The para must be an
 * on-demand parachain.
 */
export interface RegistrarCall_deregister {
    __kind: 'deregister'
    id: Id
}

/**
 * Force the registration of a Para Id on the relay chain.
 * 
 * This function must be called by a Root origin.
 * 
 * The deposit taken can be specified for this registration. Any `ParaId`
 * can be registered, including sub-1000 IDs which are System Parachains.
 */
export interface RegistrarCall_force_register {
    __kind: 'force_register'
    who: AccountId32
    deposit: bigint
    id: Id
    genesisHead: HeadData
    validationCode: ValidationCode
}

/**
 * Register head data and validation code for a reserved Para Id.
 * 
 * ## Arguments
 * - `origin`: Must be called by a `Signed` origin.
 * - `id`: The para ID. Must be owned/managed by the `origin` signing account.
 * - `genesis_head`: The genesis head data of the parachain/thread.
 * - `validation_code`: The initial validation code of the parachain/thread.
 * 
 * ## Deposits/Fees
 * The account with the originating signature must reserve a deposit.
 * 
 * The deposit is required to cover the costs associated with storing the genesis head
 * data and the validation code.
 * This accounts for the potential to store validation code of a size up to the
 * `max_code_size`, as defined in the configuration pallet
 * 
 * Anything already reserved previously for this para ID is accounted for.
 * 
 * ## Events
 * The `Registered` event is emitted in case of success.
 */
export interface RegistrarCall_register {
    __kind: 'register'
    id: Id
    genesisHead: HeadData
    validationCode: ValidationCode
}

/**
 * Remove a manager lock from a para. This will allow the manager of a
 * previously locked para to deregister or swap a para without using governance.
 * 
 * Can only be called by the Root origin or the parachain.
 */
export interface RegistrarCall_remove_lock {
    __kind: 'remove_lock'
    para: Id
}

/**
 * Reserve a Para Id on the relay chain.
 * 
 * This function will reserve a new Para Id to be owned/managed by the origin account.
 * The origin account is able to register head data and validation code using `register` to
 * create an on-demand parachain. Using the Slots pallet, an on-demand parachain can then
 * be upgraded to a lease holding parachain.
 * 
 * ## Arguments
 * - `origin`: Must be called by a `Signed` origin. Becomes the manager/owner of the new
 *   para ID.
 * 
 * ## Deposits/Fees
 * The origin must reserve a deposit of `ParaDeposit` for the registration.
 * 
 * ## Events
 * The `Reserved` event is emitted in case of success, which provides the ID reserved for
 * use.
 */
export interface RegistrarCall_reserve {
    __kind: 'reserve'
}

/**
 * Schedule a parachain upgrade.
 * 
 * This will kick off a check of `new_code` by all validators. After the majority of the
 * validators have reported on the validity of the code, the code will either be enacted
 * or the upgrade will be rejected. If the code will be enacted, the current code of the
 * parachain will be overwritten directly. This means that any PoV will be checked by this
 * new code. The parachain itself will not be informed explicitly that the validation code
 * has changed.
 * 
 * Can be called by Root, the parachain, or the parachain manager if the parachain is
 * unlocked.
 */
export interface RegistrarCall_schedule_code_upgrade {
    __kind: 'schedule_code_upgrade'
    para: Id
    newCode: ValidationCode
}

/**
 * Set the parachain's current head.
 * 
 * Can be called by Root, the parachain, or the parachain manager if the parachain is
 * unlocked.
 */
export interface RegistrarCall_set_current_head {
    __kind: 'set_current_head'
    para: Id
    newHead: HeadData
}

/**
 * Swap a lease holding parachain with another parachain, either on-demand or lease
 * holding.
 * 
 * The origin must be Root, the `para` owner, or the `para` itself.
 * 
 * The swap will happen only if there is already an opposite swap pending. If there is not,
 * the swap will be stored in the pending swaps map, ready for a later confirmatory swap.
 * 
 * The `ParaId`s remain mapped to the same head data and code so external code can rely on
 * `ParaId` to be a long-term identifier of a notional "parachain". However, their
 * scheduling info (i.e. whether they're an on-demand parachain or lease holding
 * parachain), auction information and the auction deposit are switched.
 */
export interface RegistrarCall_swap {
    __kind: 'swap'
    id: Id
    other: Id
}

export type ValidationCode = Bytes

export type HeadData = Bytes

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export const ReferendaCall: sts.Type<ReferendaCall> = sts.closedEnum(() => {
    return  {
        cancel: sts.enumStruct({
            index: sts.number(),
        }),
        kill: sts.enumStruct({
            index: sts.number(),
        }),
        nudge_referendum: sts.enumStruct({
            index: sts.number(),
        }),
        one_fewer_deciding: sts.enumStruct({
            track: sts.number(),
        }),
        place_decision_deposit: sts.enumStruct({
            index: sts.number(),
        }),
        refund_decision_deposit: sts.enumStruct({
            index: sts.number(),
        }),
        refund_submission_deposit: sts.enumStruct({
            index: sts.number(),
        }),
        set_metadata: sts.enumStruct({
            index: sts.number(),
            maybeHash: sts.option(() => H256),
        }),
        submit: sts.enumStruct({
            proposalOrigin: OriginCaller,
            proposal: Bounded,
            enactmentMoment: DispatchTime,
        }),
    }
})

export const DispatchTime: sts.Type<DispatchTime> = sts.closedEnum(() => {
    return  {
        After: sts.number(),
        At: sts.number(),
    }
})

export type DispatchTime = DispatchTime_After | DispatchTime_At

export interface DispatchTime_After {
    __kind: 'After'
    value: number
}

export interface DispatchTime_At {
    __kind: 'At'
    value: number
}

export const Bounded: sts.Type<Bounded> = sts.closedEnum(() => {
    return  {
        Inline: sts.bytes(),
        Legacy: sts.enumStruct({
            hash: H256,
        }),
        Lookup: sts.enumStruct({
            hash: H256,
            len: sts.number(),
        }),
    }
})

export type Bounded = Bounded_Inline | Bounded_Legacy | Bounded_Lookup

export interface Bounded_Inline {
    __kind: 'Inline'
    value: Bytes
}

export interface Bounded_Legacy {
    __kind: 'Legacy'
    hash: H256
}

export interface Bounded_Lookup {
    __kind: 'Lookup'
    hash: H256
    len: number
}

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export type ReferendaCall = ReferendaCall_cancel | ReferendaCall_kill | ReferendaCall_nudge_referendum | ReferendaCall_one_fewer_deciding | ReferendaCall_place_decision_deposit | ReferendaCall_refund_decision_deposit | ReferendaCall_refund_submission_deposit | ReferendaCall_set_metadata | ReferendaCall_submit

/**
 * Cancel an ongoing referendum.
 * 
 * - `origin`: must be the `CancelOrigin`.
 * - `index`: The index of the referendum to be cancelled.
 * 
 * Emits `Cancelled`.
 */
export interface ReferendaCall_cancel {
    __kind: 'cancel'
    index: number
}

/**
 * Cancel an ongoing referendum and slash the deposits.
 * 
 * - `origin`: must be the `KillOrigin`.
 * - `index`: The index of the referendum to be cancelled.
 * 
 * Emits `Killed` and `DepositSlashed`.
 */
export interface ReferendaCall_kill {
    __kind: 'kill'
    index: number
}

/**
 * Advance a referendum onto its next logical state. Only used internally.
 * 
 * - `origin`: must be `Root`.
 * - `index`: the referendum to be advanced.
 */
export interface ReferendaCall_nudge_referendum {
    __kind: 'nudge_referendum'
    index: number
}

/**
 * Advance a track onto its next logical state. Only used internally.
 * 
 * - `origin`: must be `Root`.
 * - `track`: the track to be advanced.
 * 
 * Action item for when there is now one fewer referendum in the deciding phase and the
 * `DecidingCount` is not yet updated. This means that we should either:
 * - begin deciding another referendum (and leave `DecidingCount` alone); or
 * - decrement `DecidingCount`.
 */
export interface ReferendaCall_one_fewer_deciding {
    __kind: 'one_fewer_deciding'
    track: number
}

/**
 * Post the Decision Deposit for a referendum.
 * 
 * - `origin`: must be `Signed` and the account must have funds available for the
 *   referendum's track's Decision Deposit.
 * - `index`: The index of the submitted referendum whose Decision Deposit is yet to be
 *   posted.
 * 
 * Emits `DecisionDepositPlaced`.
 */
export interface ReferendaCall_place_decision_deposit {
    __kind: 'place_decision_deposit'
    index: number
}

/**
 * Refund the Decision Deposit for a closed referendum back to the depositor.
 * 
 * - `origin`: must be `Signed` or `Root`.
 * - `index`: The index of a closed referendum whose Decision Deposit has not yet been
 *   refunded.
 * 
 * Emits `DecisionDepositRefunded`.
 */
export interface ReferendaCall_refund_decision_deposit {
    __kind: 'refund_decision_deposit'
    index: number
}

/**
 * Refund the Submission Deposit for a closed referendum back to the depositor.
 * 
 * - `origin`: must be `Signed` or `Root`.
 * - `index`: The index of a closed referendum whose Submission Deposit has not yet been
 *   refunded.
 * 
 * Emits `SubmissionDepositRefunded`.
 */
export interface ReferendaCall_refund_submission_deposit {
    __kind: 'refund_submission_deposit'
    index: number
}

/**
 * Set or clear metadata of a referendum.
 * 
 * Parameters:
 * - `origin`: Must be `Signed` by a creator of a referendum or by anyone to clear a
 *   metadata of a finished referendum.
 * - `index`:  The index of a referendum to set or clear metadata for.
 * - `maybe_hash`: The hash of an on-chain stored preimage. `None` to clear a metadata.
 */
export interface ReferendaCall_set_metadata {
    __kind: 'set_metadata'
    index: number
    maybeHash?: (H256 | undefined)
}

/**
 * Propose a referendum on a privileged action.
 * 
 * - `origin`: must be `SubmitOrigin` and the account must have `SubmissionDeposit` funds
 *   available.
 * - `proposal_origin`: The origin from which the proposal should be executed.
 * - `proposal`: The proposal.
 * - `enactment_moment`: The moment that the proposal should be enacted.
 * 
 * Emits `Submitted`.
 */
export interface ReferendaCall_submit {
    __kind: 'submit'
    proposalOrigin: OriginCaller
    proposal: Bounded
    enactmentMoment: DispatchTime
}

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export const RecoveryCall: sts.Type<RecoveryCall> = sts.closedEnum(() => {
    return  {
        as_recovered: sts.enumStruct({
            account: MultiAddress,
            call: Call,
        }),
        cancel_recovered: sts.enumStruct({
            account: MultiAddress,
        }),
        claim_recovery: sts.enumStruct({
            account: MultiAddress,
        }),
        close_recovery: sts.enumStruct({
            rescuer: MultiAddress,
        }),
        create_recovery: sts.enumStruct({
            friends: sts.array(() => AccountId32),
            threshold: sts.number(),
            delayPeriod: sts.number(),
        }),
        initiate_recovery: sts.enumStruct({
            account: MultiAddress,
        }),
        remove_recovery: sts.unit(),
        set_recovered: sts.enumStruct({
            lost: MultiAddress,
            rescuer: MultiAddress,
        }),
        vouch_recovery: sts.enumStruct({
            lost: MultiAddress,
            rescuer: MultiAddress,
        }),
    }
})

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export type RecoveryCall = RecoveryCall_as_recovered | RecoveryCall_cancel_recovered | RecoveryCall_claim_recovery | RecoveryCall_close_recovery | RecoveryCall_create_recovery | RecoveryCall_initiate_recovery | RecoveryCall_remove_recovery | RecoveryCall_set_recovered | RecoveryCall_vouch_recovery

/**
 * Send a call through a recovered account.
 * 
 * The dispatch origin for this call must be _Signed_ and registered to
 * be able to make calls on behalf of the recovered account.
 * 
 * Parameters:
 * - `account`: The recovered account you want to make a call on-behalf-of.
 * - `call`: The call you want to make with the recovered account.
 */
export interface RecoveryCall_as_recovered {
    __kind: 'as_recovered'
    account: MultiAddress
    call: Call
}

/**
 * Cancel the ability to use `as_recovered` for `account`.
 * 
 * The dispatch origin for this call must be _Signed_ and registered to
 * be able to make calls on behalf of the recovered account.
 * 
 * Parameters:
 * - `account`: The recovered account you are able to call on-behalf-of.
 */
export interface RecoveryCall_cancel_recovered {
    __kind: 'cancel_recovered'
    account: MultiAddress
}

/**
 * Allow a successful rescuer to claim their recovered account.
 * 
 * The dispatch origin for this call must be _Signed_ and must be a "rescuer"
 * who has successfully completed the account recovery process: collected
 * `threshold` or more vouches, waited `delay_period` blocks since initiation.
 * 
 * Parameters:
 * - `account`: The lost account that you want to claim has been successfully recovered by
 *   you.
 */
export interface RecoveryCall_claim_recovery {
    __kind: 'claim_recovery'
    account: MultiAddress
}

/**
 * As the controller of a recoverable account, close an active recovery
 * process for your account.
 * 
 * Payment: By calling this function, the recoverable account will receive
 * the recovery deposit `RecoveryDeposit` placed by the rescuer.
 * 
 * The dispatch origin for this call must be _Signed_ and must be a
 * recoverable account with an active recovery process for it.
 * 
 * Parameters:
 * - `rescuer`: The account trying to rescue this recoverable account.
 */
export interface RecoveryCall_close_recovery {
    __kind: 'close_recovery'
    rescuer: MultiAddress
}

/**
 * Create a recovery configuration for your account. This makes your account recoverable.
 * 
 * Payment: `ConfigDepositBase` + `FriendDepositFactor` * #_of_friends balance
 * will be reserved for storing the recovery configuration. This deposit is returned
 * in full when the user calls `remove_recovery`.
 * 
 * The dispatch origin for this call must be _Signed_.
 * 
 * Parameters:
 * - `friends`: A list of friends you trust to vouch for recovery attempts. Should be
 *   ordered and contain no duplicate values.
 * - `threshold`: The number of friends that must vouch for a recovery attempt before the
 *   account can be recovered. Should be less than or equal to the length of the list of
 *   friends.
 * - `delay_period`: The number of blocks after a recovery attempt is initialized that
 *   needs to pass before the account can be recovered.
 */
export interface RecoveryCall_create_recovery {
    __kind: 'create_recovery'
    friends: AccountId32[]
    threshold: number
    delayPeriod: number
}

/**
 * Initiate the process for recovering a recoverable account.
 * 
 * Payment: `RecoveryDeposit` balance will be reserved for initiating the
 * recovery process. This deposit will always be repatriated to the account
 * trying to be recovered. See `close_recovery`.
 * 
 * The dispatch origin for this call must be _Signed_.
 * 
 * Parameters:
 * - `account`: The lost account that you want to recover. This account needs to be
 *   recoverable (i.e. have a recovery configuration).
 */
export interface RecoveryCall_initiate_recovery {
    __kind: 'initiate_recovery'
    account: MultiAddress
}

/**
 * Remove the recovery process for your account. Recovered accounts are still accessible.
 * 
 * NOTE: The user must make sure to call `close_recovery` on all active
 * recovery attempts before calling this function else it will fail.
 * 
 * Payment: By calling this function the recoverable account will unreserve
 * their recovery configuration deposit.
 * (`ConfigDepositBase` + `FriendDepositFactor` * #_of_friends)
 * 
 * The dispatch origin for this call must be _Signed_ and must be a
 * recoverable account (i.e. has a recovery configuration).
 */
export interface RecoveryCall_remove_recovery {
    __kind: 'remove_recovery'
}

/**
 * Allow ROOT to bypass the recovery process and set a rescuer account
 * for a lost account directly.
 * 
 * The dispatch origin for this call must be _ROOT_.
 * 
 * Parameters:
 * - `lost`: The "lost account" to be recovered.
 * - `rescuer`: The "rescuer account" which can call as the lost account.
 */
export interface RecoveryCall_set_recovered {
    __kind: 'set_recovered'
    lost: MultiAddress
    rescuer: MultiAddress
}

/**
 * Allow a "friend" of a recoverable account to vouch for an active recovery
 * process for that account.
 * 
 * The dispatch origin for this call must be _Signed_ and must be a "friend"
 * for the recoverable account.
 * 
 * Parameters:
 * - `lost`: The lost account that you want to recover.
 * - `rescuer`: The account trying to rescue the lost account that you want to vouch for.
 * 
 * The combination of these two parameters must point to an active recovery
 * process.
 */
export interface RecoveryCall_vouch_recovery {
    __kind: 'vouch_recovery'
    lost: MultiAddress
    rescuer: MultiAddress
}

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export const ProxyCall: sts.Type<ProxyCall> = sts.closedEnum(() => {
    return  {
        add_proxy: sts.enumStruct({
            delegate: MultiAddress,
            proxyType: ProxyType,
            delay: sts.number(),
        }),
        announce: sts.enumStruct({
            real: MultiAddress,
            callHash: H256,
        }),
        create_pure: sts.enumStruct({
            proxyType: ProxyType,
            delay: sts.number(),
            index: sts.number(),
        }),
        kill_pure: sts.enumStruct({
            spawner: MultiAddress,
            proxyType: ProxyType,
            index: sts.number(),
            height: sts.number(),
            extIndex: sts.number(),
        }),
        poke_deposit: sts.unit(),
        proxy: sts.enumStruct({
            real: MultiAddress,
            forceProxyType: sts.option(() => ProxyType),
            call: Call,
        }),
        proxy_announced: sts.enumStruct({
            delegate: MultiAddress,
            real: MultiAddress,
            forceProxyType: sts.option(() => ProxyType),
            call: Call,
        }),
        reject_announcement: sts.enumStruct({
            delegate: MultiAddress,
            callHash: H256,
        }),
        remove_announcement: sts.enumStruct({
            real: MultiAddress,
            callHash: H256,
        }),
        remove_proxies: sts.unit(),
        remove_proxy: sts.enumStruct({
            delegate: MultiAddress,
            proxyType: ProxyType,
            delay: sts.number(),
        }),
    }
})

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export type ProxyCall = ProxyCall_add_proxy | ProxyCall_announce | ProxyCall_create_pure | ProxyCall_kill_pure | ProxyCall_poke_deposit | ProxyCall_proxy | ProxyCall_proxy_announced | ProxyCall_reject_announcement | ProxyCall_remove_announcement | ProxyCall_remove_proxies | ProxyCall_remove_proxy

/**
 * Register a proxy account for the sender that is able to make calls on its behalf.
 * 
 * The dispatch origin for this call must be _Signed_.
 * 
 * Parameters:
 * - `proxy`: The account that the `caller` would like to make a proxy.
 * - `proxy_type`: The permissions allowed for this proxy account.
 * - `delay`: The announcement period required of the initial proxy. Will generally be
 * zero.
 */
export interface ProxyCall_add_proxy {
    __kind: 'add_proxy'
    delegate: MultiAddress
    proxyType: ProxyType
    delay: number
}

/**
 * Publish the hash of a proxy-call that will be made in the future.
 * 
 * This must be called some number of blocks before the corresponding `proxy` is attempted
 * if the delay associated with the proxy relationship is greater than zero.
 * 
 * No more than `MaxPending` announcements may be made at any one time.
 * 
 * This will take a deposit of `AnnouncementDepositFactor` as well as
 * `AnnouncementDepositBase` if there are no other pending announcements.
 * 
 * The dispatch origin for this call must be _Signed_ and a proxy of `real`.
 * 
 * Parameters:
 * - `real`: The account that the proxy will make a call on behalf of.
 * - `call_hash`: The hash of the call to be made by the `real` account.
 */
export interface ProxyCall_announce {
    __kind: 'announce'
    real: MultiAddress
    callHash: H256
}

/**
 * Spawn a fresh new account that is guaranteed to be otherwise inaccessible, and
 * initialize it with a proxy of `proxy_type` for `origin` sender.
 * 
 * Requires a `Signed` origin.
 * 
 * - `proxy_type`: The type of the proxy that the sender will be registered as over the
 * new account. This will almost always be the most permissive `ProxyType` possible to
 * allow for maximum flexibility.
 * - `index`: A disambiguation index, in case this is called multiple times in the same
 * transaction (e.g. with `utility::batch`). Unless you're using `batch` you probably just
 * want to use `0`.
 * - `delay`: The announcement period required of the initial proxy. Will generally be
 * zero.
 * 
 * Fails with `Duplicate` if this has already been called in this transaction, from the
 * same sender, with the same parameters.
 * 
 * Fails if there are insufficient funds to pay for deposit.
 */
export interface ProxyCall_create_pure {
    __kind: 'create_pure'
    proxyType: ProxyType
    delay: number
    index: number
}

/**
 * Removes a previously spawned pure proxy.
 * 
 * WARNING: **All access to this account will be lost.** Any funds held in it will be
 * inaccessible.
 * 
 * Requires a `Signed` origin, and the sender account must have been created by a call to
 * `pure` with corresponding parameters.
 * 
 * - `spawner`: The account that originally called `pure` to create this account.
 * - `index`: The disambiguation index originally passed to `pure`. Probably `0`.
 * - `proxy_type`: The proxy type originally passed to `pure`.
 * - `height`: The height of the chain when the call to `pure` was processed.
 * - `ext_index`: The extrinsic index in which the call to `pure` was processed.
 * 
 * Fails with `NoPermission` in case the caller is not a previously created pure
 * account whose `pure` call has corresponding parameters.
 */
export interface ProxyCall_kill_pure {
    __kind: 'kill_pure'
    spawner: MultiAddress
    proxyType: ProxyType
    index: number
    height: number
    extIndex: number
}

/**
 * Poke / Adjust deposits made for proxies and announcements based on current values.
 * This can be used by accounts to possibly lower their locked amount.
 * 
 * The dispatch origin for this call must be _Signed_.
 * 
 * The transaction fee is waived if the deposit amount has changed.
 * 
 * Emits `DepositPoked` if successful.
 */
export interface ProxyCall_poke_deposit {
    __kind: 'poke_deposit'
}

/**
 * Dispatch the given `call` from an account that the sender is authorised for through
 * `add_proxy`.
 * 
 * The dispatch origin for this call must be _Signed_.
 * 
 * Parameters:
 * - `real`: The account that the proxy will make a call on behalf of.
 * - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
 * - `call`: The call to be made by the `real` account.
 */
export interface ProxyCall_proxy {
    __kind: 'proxy'
    real: MultiAddress
    forceProxyType?: (ProxyType | undefined)
    call: Call
}

/**
 * Dispatch the given `call` from an account that the sender is authorized for through
 * `add_proxy`.
 * 
 * Removes any corresponding announcement(s).
 * 
 * The dispatch origin for this call must be _Signed_.
 * 
 * Parameters:
 * - `real`: The account that the proxy will make a call on behalf of.
 * - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
 * - `call`: The call to be made by the `real` account.
 */
export interface ProxyCall_proxy_announced {
    __kind: 'proxy_announced'
    delegate: MultiAddress
    real: MultiAddress
    forceProxyType?: (ProxyType | undefined)
    call: Call
}

/**
 * Remove the given announcement of a delegate.
 * 
 * May be called by a target (proxied) account to remove a call that one of their delegates
 * (`delegate`) has announced they want to execute. The deposit is returned.
 * 
 * The dispatch origin for this call must be _Signed_.
 * 
 * Parameters:
 * - `delegate`: The account that previously announced the call.
 * - `call_hash`: The hash of the call to be made.
 */
export interface ProxyCall_reject_announcement {
    __kind: 'reject_announcement'
    delegate: MultiAddress
    callHash: H256
}

/**
 * Remove a given announcement.
 * 
 * May be called by a proxy account to remove a call they previously announced and return
 * the deposit.
 * 
 * The dispatch origin for this call must be _Signed_.
 * 
 * Parameters:
 * - `real`: The account that the proxy will make a call on behalf of.
 * - `call_hash`: The hash of the call to be made by the `real` account.
 */
export interface ProxyCall_remove_announcement {
    __kind: 'remove_announcement'
    real: MultiAddress
    callHash: H256
}

/**
 * Unregister all proxy accounts for the sender.
 * 
 * The dispatch origin for this call must be _Signed_.
 * 
 * WARNING: This may be called on accounts created by `pure`, however if done, then
 * the unreserved fees will be inaccessible. **All access to this account will be lost.**
 */
export interface ProxyCall_remove_proxies {
    __kind: 'remove_proxies'
}

/**
 * Unregister a proxy account for the sender.
 * 
 * The dispatch origin for this call must be _Signed_.
 * 
 * Parameters:
 * - `proxy`: The account that the `caller` would like to remove as a proxy.
 * - `proxy_type`: The permissions currently enabled for the removed proxy account.
 */
export interface ProxyCall_remove_proxy {
    __kind: 'remove_proxy'
    delegate: MultiAddress
    proxyType: ProxyType
    delay: number
}

export type ProxyType = ProxyType_Any | ProxyType_Auction | ProxyType_CancelProxy | ProxyType_Governance | ProxyType_NominationPools | ProxyType_NonTransfer | ProxyType_ParaRegistration | ProxyType_Society | ProxyType_Spokesperson | ProxyType_Staking

export interface ProxyType_Any {
    __kind: 'Any'
}

export interface ProxyType_Auction {
    __kind: 'Auction'
}

export interface ProxyType_CancelProxy {
    __kind: 'CancelProxy'
}

export interface ProxyType_Governance {
    __kind: 'Governance'
}

export interface ProxyType_NominationPools {
    __kind: 'NominationPools'
}

export interface ProxyType_NonTransfer {
    __kind: 'NonTransfer'
}

export interface ProxyType_ParaRegistration {
    __kind: 'ParaRegistration'
}

export interface ProxyType_Society {
    __kind: 'Society'
}

export interface ProxyType_Spokesperson {
    __kind: 'Spokesperson'
}

export interface ProxyType_Staking {
    __kind: 'Staking'
}

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export const PreimageCall: sts.Type<PreimageCall> = sts.closedEnum(() => {
    return  {
        ensure_updated: sts.enumStruct({
            hashes: sts.array(() => H256),
        }),
        note_preimage: sts.enumStruct({
            bytes: sts.bytes(),
        }),
        request_preimage: sts.enumStruct({
            hash: H256,
        }),
        unnote_preimage: sts.enumStruct({
            hash: H256,
        }),
        unrequest_preimage: sts.enumStruct({
            hash: H256,
        }),
    }
})

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export type PreimageCall = PreimageCall_ensure_updated | PreimageCall_note_preimage | PreimageCall_request_preimage | PreimageCall_unnote_preimage | PreimageCall_unrequest_preimage

/**
 * Ensure that the bulk of pre-images is upgraded.
 * 
 * The caller pays no fee if at least 90% of pre-images were successfully updated.
 */
export interface PreimageCall_ensure_updated {
    __kind: 'ensure_updated'
    hashes: H256[]
}

/**
 * Register a preimage on-chain.
 * 
 * If the preimage was previously requested, no fees or deposits are taken for providing
 * the preimage. Otherwise, a deposit is taken proportional to the size of the preimage.
 */
export interface PreimageCall_note_preimage {
    __kind: 'note_preimage'
    bytes: Bytes
}

/**
 * Request a preimage be uploaded to the chain without paying any fees or deposits.
 * 
 * If the preimage requests has already been provided on-chain, we unreserve any deposit
 * a user may have paid, and take the control of the preimage out of their hands.
 */
export interface PreimageCall_request_preimage {
    __kind: 'request_preimage'
    hash: H256
}

/**
 * Clear an unrequested preimage from the runtime storage.
 * 
 * If `len` is provided, then it will be a much cheaper operation.
 * 
 * - `hash`: The hash of the preimage to be removed from the store.
 * - `len`: The length of the preimage of `hash`.
 */
export interface PreimageCall_unnote_preimage {
    __kind: 'unnote_preimage'
    hash: H256
}

/**
 * Clear a previously made request for a preimage.
 * 
 * NOTE: THIS MUST NOT BE CALLED ON `hash` MORE TIMES THAN `request_preimage`.
 */
export interface PreimageCall_unrequest_preimage {
    __kind: 'unrequest_preimage'
    hash: H256
}

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export const ParasSlashingCall: sts.Type<ParasSlashingCall> = sts.closedEnum(() => {
    return  {
        report_dispute_lost_unsigned: sts.enumStruct({
            disputeProof: DisputeProof,
            keyOwnerProof: MembershipProof,
        }),
    }
})

export const MembershipProof: sts.Type<MembershipProof> = sts.struct(() => {
    return  {
        session: sts.number(),
        trieNodes: sts.array(() => sts.bytes()),
        validatorCount: sts.number(),
    }
})

export interface MembershipProof {
    session: number
    trieNodes: Bytes[]
    validatorCount: number
}

export const DisputeProof: sts.Type<DisputeProof> = sts.struct(() => {
    return  {
        timeSlot: V8DisputesTimeSlot,
        kind: DisputeOffenceKind,
        validatorIndex: V8ValidatorIndex,
        validatorId: V8Public,
    }
})

export const V8ValidatorIndex = sts.number()

export const DisputeOffenceKind: sts.Type<DisputeOffenceKind> = sts.closedEnum(() => {
    return  {
        AgainstValid: sts.unit(),
        ForInvalidApproved: sts.unit(),
        ForInvalidBacked: sts.unit(),
    }
})

export type DisputeOffenceKind = DisputeOffenceKind_AgainstValid | DisputeOffenceKind_ForInvalidApproved | DisputeOffenceKind_ForInvalidBacked

export interface DisputeOffenceKind_AgainstValid {
    __kind: 'AgainstValid'
}

export interface DisputeOffenceKind_ForInvalidApproved {
    __kind: 'ForInvalidApproved'
}

export interface DisputeOffenceKind_ForInvalidBacked {
    __kind: 'ForInvalidBacked'
}

export const V8DisputesTimeSlot: sts.Type<V8DisputesTimeSlot> = sts.struct(() => {
    return  {
        sessionIndex: sts.number(),
        candidateHash: CandidateHash,
    }
})

export const CandidateHash = sts.bytes()

export interface V8DisputesTimeSlot {
    sessionIndex: number
    candidateHash: CandidateHash
}

export type CandidateHash = Bytes

export interface DisputeProof {
    timeSlot: V8DisputesTimeSlot
    kind: DisputeOffenceKind
    validatorIndex: V8ValidatorIndex
    validatorId: V8Public
}

export type V8ValidatorIndex = number

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export type ParasSlashingCall = ParasSlashingCall_report_dispute_lost_unsigned

export interface ParasSlashingCall_report_dispute_lost_unsigned {
    __kind: 'report_dispute_lost_unsigned'
    disputeProof: DisputeProof
    keyOwnerProof: MembershipProof
}

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export const ParasSharedCall: sts.Type<ParasSharedCall> = sts.closedEnum(() => {
    return  {
    }
})

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export type ParasSharedCall = never

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export const ParasDisputesCall: sts.Type<ParasDisputesCall> = sts.closedEnum(() => {
    return  {
        force_unfreeze: sts.unit(),
    }
})

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export type ParasDisputesCall = ParasDisputesCall_force_unfreeze

export interface ParasDisputesCall_force_unfreeze {
    __kind: 'force_unfreeze'
}

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export const ParasCall: sts.Type<ParasCall> = sts.closedEnum(() => {
    return  {
        add_trusted_validation_code: sts.enumStruct({
            validationCode: ValidationCode,
        }),
        force_note_new_head: sts.enumStruct({
            para: Id,
            newHead: HeadData,
        }),
        force_queue_action: sts.enumStruct({
            para: Id,
        }),
        force_schedule_code_upgrade: sts.enumStruct({
            para: Id,
            newCode: ValidationCode,
            relayParentNumber: sts.number(),
        }),
        force_set_current_code: sts.enumStruct({
            para: Id,
            newCode: ValidationCode,
        }),
        force_set_current_head: sts.enumStruct({
            para: Id,
            newHead: HeadData,
        }),
        force_set_most_recent_context: sts.enumStruct({
            para: Id,
            context: sts.number(),
        }),
        include_pvf_check_statement: sts.enumStruct({
            stmt: V8PvfCheckStatement,
            signature: V8Signature,
        }),
        poke_unused_validation_code: sts.enumStruct({
            validationCodeHash: ValidationCodeHash,
        }),
    }
})

export const ValidationCodeHash = sts.bytes()

export const V8Signature = sts.bytes()

export const V8PvfCheckStatement: sts.Type<V8PvfCheckStatement> = sts.struct(() => {
    return  {
        accept: sts.boolean(),
        subject: ValidationCodeHash,
        sessionIndex: sts.number(),
        validatorIndex: V8ValidatorIndex,
    }
})

export interface V8PvfCheckStatement {
    accept: boolean
    subject: ValidationCodeHash
    sessionIndex: number
    validatorIndex: V8ValidatorIndex
}

export type ValidationCodeHash = Bytes

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export type ParasCall = ParasCall_add_trusted_validation_code | ParasCall_force_note_new_head | ParasCall_force_queue_action | ParasCall_force_schedule_code_upgrade | ParasCall_force_set_current_code | ParasCall_force_set_current_head | ParasCall_force_set_most_recent_context | ParasCall_include_pvf_check_statement | ParasCall_poke_unused_validation_code

/**
 * Adds the validation code to the storage.
 * 
 * The code will not be added if it is already present. Additionally, if PVF pre-checking
 * is running for that code, it will be instantly accepted.
 * 
 * Otherwise, the code will be added into the storage. Note that the code will be added
 * into storage with reference count 0. This is to account the fact that there are no users
 * for this code yet. The caller will have to make sure that this code eventually gets
 * used by some parachain or removed from the storage to avoid storage leaks. For the
 * latter prefer to use the `poke_unused_validation_code` dispatchable to raw storage
 * manipulation.
 * 
 * This function is mainly meant to be used for upgrading parachains that do not follow
 * the go-ahead signal while the PVF pre-checking feature is enabled.
 */
export interface ParasCall_add_trusted_validation_code {
    __kind: 'add_trusted_validation_code'
    validationCode: ValidationCode
}

/**
 * Note a new block head for para within the context of the current block.
 */
export interface ParasCall_force_note_new_head {
    __kind: 'force_note_new_head'
    para: Id
    newHead: HeadData
}

/**
 * Put a parachain directly into the next session's action queue.
 * We can't queue it any sooner than this without going into the
 * initializer...
 */
export interface ParasCall_force_queue_action {
    __kind: 'force_queue_action'
    para: Id
}

/**
 * Schedule an upgrade as if it was scheduled in the given relay parent block.
 */
export interface ParasCall_force_schedule_code_upgrade {
    __kind: 'force_schedule_code_upgrade'
    para: Id
    newCode: ValidationCode
    relayParentNumber: number
}

/**
 * Set the storage for the parachain validation code immediately.
 */
export interface ParasCall_force_set_current_code {
    __kind: 'force_set_current_code'
    para: Id
    newCode: ValidationCode
}

/**
 * Set the storage for the current parachain head data immediately.
 */
export interface ParasCall_force_set_current_head {
    __kind: 'force_set_current_head'
    para: Id
    newHead: HeadData
}

/**
 * Set the storage for the current parachain head data immediately.
 */
export interface ParasCall_force_set_most_recent_context {
    __kind: 'force_set_most_recent_context'
    para: Id
    context: number
}

/**
 * Includes a statement for a PVF pre-checking vote. Potentially, finalizes the vote and
 * enacts the results if that was the last vote before achieving the supermajority.
 */
export interface ParasCall_include_pvf_check_statement {
    __kind: 'include_pvf_check_statement'
    stmt: V8PvfCheckStatement
    signature: V8Signature
}

/**
 * Remove the validation code from the storage iff the reference count is 0.
 * 
 * This is better than removing the storage directly, because it will not remove the code
 * that was suddenly got used by some parachain while this dispatchable was pending
 * dispatching.
 */
export interface ParasCall_poke_unused_validation_code {
    __kind: 'poke_unused_validation_code'
    validationCodeHash: ValidationCodeHash
}

export type V8Signature = Bytes

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export const ParametersCall: sts.Type<ParametersCall> = sts.closedEnum(() => {
    return  {
        set_parameter: sts.enumStruct({
            keyValue: RuntimeParameters,
        }),
    }
})

export const RuntimeParameters: sts.Type<RuntimeParameters> = sts.closedEnum(() => {
    return  {
        Inflation: Parameters,
        Treasury: Type_180,
    }
})

export const Type_180: sts.Type<Type_180> = sts.closedEnum(() => {
    return  {
        BurnDestination: sts.tuple(() => [BurnDestination, sts.enumOption(() => BurnDestinationAccount)]),
        BurnPortion: sts.tuple(() => [BurnPortion, sts.option(() => Permill)]),
    }
})

export const Permill = sts.number()

export const BurnPortion = sts.unit()

export const BurnDestinationAccount = sts.option(() => AccountId32)

export const BurnDestination = sts.unit()

export type Type_180 = Type_180_BurnDestination | Type_180_BurnPortion

export interface Type_180_BurnDestination {
    __kind: 'BurnDestination'
    value: [BurnDestination, Option<BurnDestinationAccount>]
}

export interface Type_180_BurnPortion {
    __kind: 'BurnPortion'
    value: [BurnPortion, (Permill | undefined)]
}

export type Permill = number

export type BurnPortion = null

export type BurnDestinationAccount = (AccountId32 | undefined)

export type BurnDestination = null

export const Parameters: sts.Type<Parameters> = sts.closedEnum(() => {
    return  {
        Falloff: sts.tuple(() => [Falloff, sts.option(() => Perquintill)]),
        IdealStake: sts.tuple(() => [IdealStake, sts.option(() => Perquintill)]),
        MaxInflation: sts.tuple(() => [MaxInflation, sts.option(() => Perquintill)]),
        MinInflation: sts.tuple(() => [MinInflation, sts.option(() => Perquintill)]),
        UseAuctionSlots: sts.tuple(() => [UseAuctionSlots, sts.option(() => sts.boolean())]),
    }
})

export const UseAuctionSlots = sts.unit()

export const MinInflation = sts.unit()

export const MaxInflation = sts.unit()

export const IdealStake = sts.unit()

export const Perquintill = sts.bigint()

export const Falloff = sts.unit()

export type Parameters = Parameters_Falloff | Parameters_IdealStake | Parameters_MaxInflation | Parameters_MinInflation | Parameters_UseAuctionSlots

export interface Parameters_Falloff {
    __kind: 'Falloff'
    value: [Falloff, (Perquintill | undefined)]
}

export interface Parameters_IdealStake {
    __kind: 'IdealStake'
    value: [IdealStake, (Perquintill | undefined)]
}

export interface Parameters_MaxInflation {
    __kind: 'MaxInflation'
    value: [MaxInflation, (Perquintill | undefined)]
}

export interface Parameters_MinInflation {
    __kind: 'MinInflation'
    value: [MinInflation, (Perquintill | undefined)]
}

export interface Parameters_UseAuctionSlots {
    __kind: 'UseAuctionSlots'
    value: [UseAuctionSlots, (boolean | undefined)]
}

export type UseAuctionSlots = null

export type MinInflation = null

export type MaxInflation = null

export type IdealStake = null

export type Perquintill = bigint

export type Falloff = null

export type RuntimeParameters = RuntimeParameters_Inflation | RuntimeParameters_Treasury

export interface RuntimeParameters_Inflation {
    __kind: 'Inflation'
    value: Parameters
}

export interface RuntimeParameters_Treasury {
    __kind: 'Treasury'
    value: Type_180
}

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export type ParametersCall = ParametersCall_set_parameter

/**
 * Set the value of a parameter.
 * 
 * The dispatch origin of this call must be `AdminOrigin` for the given `key`. Values be
 * deleted by setting them to `None`.
 */
export interface ParametersCall_set_parameter {
    __kind: 'set_parameter'
    keyValue: RuntimeParameters
}

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export const ParaInherentCall: sts.Type<ParaInherentCall> = sts.closedEnum(() => {
    return  {
        enter: sts.enumStruct({
            data: InherentData,
        }),
    }
})

export const InherentData: sts.Type<InherentData> = sts.struct(() => {
    return  {
        bitfields: sts.array(() => V8UncheckedSigned),
        backedCandidates: sts.array(() => BackedCandidate),
        disputes: sts.array(() => V8DisputeStatementSet),
        parentHeader: Header,
    }
})

export const Header: sts.Type<Header> = sts.struct(() => {
    return  {
        parentHash: H256,
        number: sts.number(),
        stateRoot: H256,
        extrinsicsRoot: H256,
        digest: Digest,
    }
})

export const Digest: sts.Type<Digest> = sts.struct(() => {
    return  {
        logs: sts.array(() => DigestItem),
    }
})

export const DigestItem: sts.Type<DigestItem> = sts.closedEnum(() => {
    return  {
        Consensus: sts.tuple(() => [sts.bytes(), sts.bytes()]),
        Other: sts.bytes(),
        PreRuntime: sts.tuple(() => [sts.bytes(), sts.bytes()]),
        RuntimeEnvironmentUpdated: sts.unit(),
        Seal: sts.tuple(() => [sts.bytes(), sts.bytes()]),
    }
})

export type DigestItem = DigestItem_Consensus | DigestItem_Other | DigestItem_PreRuntime | DigestItem_RuntimeEnvironmentUpdated | DigestItem_Seal

export interface DigestItem_Consensus {
    __kind: 'Consensus'
    value: [Bytes, Bytes]
}

export interface DigestItem_Other {
    __kind: 'Other'
    value: Bytes
}

export interface DigestItem_PreRuntime {
    __kind: 'PreRuntime'
    value: [Bytes, Bytes]
}

export interface DigestItem_RuntimeEnvironmentUpdated {
    __kind: 'RuntimeEnvironmentUpdated'
}

export interface DigestItem_Seal {
    __kind: 'Seal'
    value: [Bytes, Bytes]
}

export interface Digest {
    logs: DigestItem[]
}

export interface Header {
    parentHash: H256
    number: number
    stateRoot: H256
    extrinsicsRoot: H256
    digest: Digest
}

export const V8DisputeStatementSet: sts.Type<V8DisputeStatementSet> = sts.struct(() => {
    return  {
        candidateHash: CandidateHash,
        session: sts.number(),
        statements: sts.array(() => sts.tuple(() => [V8DisputeStatement, V8ValidatorIndex, V8Signature])),
    }
})

export const V8DisputeStatement: sts.Type<V8DisputeStatement> = sts.closedEnum(() => {
    return  {
        Invalid: V8InvalidDisputeStatementKind,
        Valid: V8ValidDisputeStatementKind,
    }
})

export const V8ValidDisputeStatementKind: sts.Type<V8ValidDisputeStatementKind> = sts.closedEnum(() => {
    return  {
        ApprovalChecking: sts.unit(),
        ApprovalCheckingMultipleCandidates: sts.array(() => CandidateHash),
        BackingSeconded: H256,
        BackingValid: H256,
        Explicit: sts.unit(),
    }
})

export type V8ValidDisputeStatementKind = V8ValidDisputeStatementKind_ApprovalChecking | V8ValidDisputeStatementKind_ApprovalCheckingMultipleCandidates | V8ValidDisputeStatementKind_BackingSeconded | V8ValidDisputeStatementKind_BackingValid | V8ValidDisputeStatementKind_Explicit

export interface V8ValidDisputeStatementKind_ApprovalChecking {
    __kind: 'ApprovalChecking'
}

export interface V8ValidDisputeStatementKind_ApprovalCheckingMultipleCandidates {
    __kind: 'ApprovalCheckingMultipleCandidates'
    value: CandidateHash[]
}

export interface V8ValidDisputeStatementKind_BackingSeconded {
    __kind: 'BackingSeconded'
    value: H256
}

export interface V8ValidDisputeStatementKind_BackingValid {
    __kind: 'BackingValid'
    value: H256
}

export interface V8ValidDisputeStatementKind_Explicit {
    __kind: 'Explicit'
}

export const V8InvalidDisputeStatementKind: sts.Type<V8InvalidDisputeStatementKind> = sts.closedEnum(() => {
    return  {
        Explicit: sts.unit(),
    }
})

export type V8InvalidDisputeStatementKind = V8InvalidDisputeStatementKind_Explicit

export interface V8InvalidDisputeStatementKind_Explicit {
    __kind: 'Explicit'
}

export type V8DisputeStatement = V8DisputeStatement_Invalid | V8DisputeStatement_Valid

export interface V8DisputeStatement_Invalid {
    __kind: 'Invalid'
    value: V8InvalidDisputeStatementKind
}

export interface V8DisputeStatement_Valid {
    __kind: 'Valid'
    value: V8ValidDisputeStatementKind
}

export interface V8DisputeStatementSet {
    candidateHash: CandidateHash
    session: number
    statements: [V8DisputeStatement, V8ValidatorIndex, V8Signature][]
}

export const BackedCandidate: sts.Type<BackedCandidate> = sts.struct(() => {
    return  {
        candidate: CommittedCandidateReceiptV2,
        validityVotes: sts.array(() => V8ValidityAttestation),
        validatorIndices: sts.bitseq(),
    }
})

export const V8ValidityAttestation: sts.Type<V8ValidityAttestation> = sts.closedEnum(() => {
    return  {
        Explicit: V8Signature,
        Implicit: V8Signature,
    }
})

export type V8ValidityAttestation = V8ValidityAttestation_Explicit | V8ValidityAttestation_Implicit

export interface V8ValidityAttestation_Explicit {
    __kind: 'Explicit'
    value: V8Signature
}

export interface V8ValidityAttestation_Implicit {
    __kind: 'Implicit'
    value: V8Signature
}

export const CommittedCandidateReceiptV2: sts.Type<CommittedCandidateReceiptV2> = sts.struct(() => {
    return  {
        descriptor: CandidateDescriptorV2,
        commitments: V8CandidateCommitments,
    }
})

export const V8CandidateCommitments: sts.Type<V8CandidateCommitments> = sts.struct(() => {
    return  {
        upwardMessages: sts.array(() => sts.bytes()),
        horizontalMessages: sts.array(() => OutboundHrmpMessage),
        newValidationCode: sts.option(() => ValidationCode),
        headData: HeadData,
        processedDownwardMessages: sts.number(),
        hrmpWatermark: sts.number(),
    }
})

export const OutboundHrmpMessage: sts.Type<OutboundHrmpMessage> = sts.struct(() => {
    return  {
        recipient: Id,
        data: sts.bytes(),
    }
})

export interface OutboundHrmpMessage {
    recipient: Id
    data: Bytes
}

export interface V8CandidateCommitments {
    upwardMessages: Bytes[]
    horizontalMessages: OutboundHrmpMessage[]
    newValidationCode?: (ValidationCode | undefined)
    headData: HeadData
    processedDownwardMessages: number
    hrmpWatermark: number
}

export const CandidateDescriptorV2: sts.Type<CandidateDescriptorV2> = sts.struct(() => {
    return  {
        paraId: Id,
        relayParent: H256,
        version: InternalVersion,
        coreIndex: sts.number(),
        sessionIndex: sts.number(),
        reserved1: sts.bytes(),
        persistedValidationDataHash: H256,
        povHash: H256,
        erasureRoot: H256,
        reserved2: sts.bytes(),
        paraHead: H256,
        validationCodeHash: ValidationCodeHash,
    }
})

export const InternalVersion = sts.number()

export interface CandidateDescriptorV2 {
    paraId: Id
    relayParent: H256
    version: InternalVersion
    coreIndex: number
    sessionIndex: number
    reserved1: Bytes
    persistedValidationDataHash: H256
    povHash: H256
    erasureRoot: H256
    reserved2: Bytes
    paraHead: H256
    validationCodeHash: ValidationCodeHash
}

export type InternalVersion = number

export interface CommittedCandidateReceiptV2 {
    descriptor: CandidateDescriptorV2
    commitments: V8CandidateCommitments
}

export interface BackedCandidate {
    candidate: CommittedCandidateReceiptV2
    validityVotes: V8ValidityAttestation[]
    validatorIndices: BitSequence
}

export const V8UncheckedSigned: sts.Type<V8UncheckedSigned> = sts.struct(() => {
    return  {
        payload: V8AvailabilityBitfield,
        validatorIndex: V8ValidatorIndex,
        signature: V8Signature,
    }
})

export const V8AvailabilityBitfield = sts.bitseq()

export interface V8UncheckedSigned {
    payload: V8AvailabilityBitfield
    validatorIndex: V8ValidatorIndex
    signature: V8Signature
}

export type V8AvailabilityBitfield = BitSequence

export interface InherentData {
    bitfields: V8UncheckedSigned[]
    backedCandidates: BackedCandidate[]
    disputes: V8DisputeStatementSet[]
    parentHeader: Header
}

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export type ParaInherentCall = ParaInherentCall_enter

/**
 * Enter the paras inherent. This will process bitfields and backed candidates.
 */
export interface ParaInherentCall_enter {
    __kind: 'enter'
    data: InherentData
}

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export const ParaInclusionCall: sts.Type<ParaInclusionCall> = sts.closedEnum(() => {
    return  {
    }
})

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export type ParaInclusionCall = never

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export const OnDemandAssignmentProviderCall: sts.Type<OnDemandAssignmentProviderCall> = sts.closedEnum(() => {
    return  {
        place_order_allow_death: sts.enumStruct({
            maxAmount: sts.bigint(),
            paraId: Id,
        }),
        place_order_keep_alive: sts.enumStruct({
            maxAmount: sts.bigint(),
            paraId: Id,
        }),
        place_order_with_credits: sts.enumStruct({
            maxAmount: sts.bigint(),
            paraId: Id,
        }),
    }
})

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export type OnDemandAssignmentProviderCall = OnDemandAssignmentProviderCall_place_order_allow_death | OnDemandAssignmentProviderCall_place_order_keep_alive | OnDemandAssignmentProviderCall_place_order_with_credits

/**
 * Create a single on demand core order.
 * Will use the spot price for the current block and will reap the account if needed.
 * 
 * Parameters:
 * - `origin`: The sender of the call, funds will be withdrawn from this account.
 * - `max_amount`: The maximum balance to withdraw from the origin to place an order.
 * - `para_id`: A `ParaId` the origin wants to provide blockspace for.
 * 
 * Errors:
 * - `InsufficientBalance`: from the Currency implementation
 * - `QueueFull`
 * - `SpotPriceHigherThanMaxAmount`
 * 
 * Events:
 * - `OnDemandOrderPlaced`
 */
export interface OnDemandAssignmentProviderCall_place_order_allow_death {
    __kind: 'place_order_allow_death'
    maxAmount: bigint
    paraId: Id
}

/**
 * Same as the [`place_order_allow_death`](Self::place_order_allow_death) call , but with a
 * check that placing the order will not reap the account.
 * 
 * Parameters:
 * - `origin`: The sender of the call, funds will be withdrawn from this account.
 * - `max_amount`: The maximum balance to withdraw from the origin to place an order.
 * - `para_id`: A `ParaId` the origin wants to provide blockspace for.
 * 
 * Errors:
 * - `InsufficientBalance`: from the Currency implementation
 * - `QueueFull`
 * - `SpotPriceHigherThanMaxAmount`
 * 
 * Events:
 * - `OnDemandOrderPlaced`
 */
export interface OnDemandAssignmentProviderCall_place_order_keep_alive {
    __kind: 'place_order_keep_alive'
    maxAmount: bigint
    paraId: Id
}

/**
 * Create a single on demand core order with credits.
 * Will charge the owner's on-demand credit account the spot price for the current block.
 * 
 * Parameters:
 * - `origin`: The sender of the call, on-demand credits will be withdrawn from this
 *   account.
 * - `max_amount`: The maximum number of credits to spend from the origin to place an
 *   order.
 * - `para_id`: A `ParaId` the origin wants to provide blockspace for.
 * 
 * Errors:
 * - `InsufficientCredits`
 * - `QueueFull`
 * - `SpotPriceHigherThanMaxAmount`
 * 
 * Events:
 * - `OnDemandOrderPlaced`
 */
export interface OnDemandAssignmentProviderCall_place_order_with_credits {
    __kind: 'place_order_with_credits'
    maxAmount: bigint
    paraId: Id
}

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export const NominationPoolsCall: sts.Type<NominationPoolsCall> = sts.closedEnum(() => {
    return  {
        adjust_pool_deposit: sts.enumStruct({
            poolId: sts.number(),
        }),
        apply_slash: sts.enumStruct({
            memberAccount: MultiAddress,
        }),
        bond_extra: sts.enumStruct({
            extra: BondExtra,
        }),
        bond_extra_other: sts.enumStruct({
            member: MultiAddress,
            extra: BondExtra,
        }),
        chill: sts.enumStruct({
            poolId: sts.number(),
        }),
        claim_commission: sts.enumStruct({
            poolId: sts.number(),
        }),
        claim_payout: sts.unit(),
        claim_payout_other: sts.enumStruct({
            other: AccountId32,
        }),
        create: sts.enumStruct({
            amount: sts.bigint(),
            root: MultiAddress,
            nominator: MultiAddress,
            bouncer: MultiAddress,
        }),
        create_with_pool_id: sts.enumStruct({
            amount: sts.bigint(),
            root: MultiAddress,
            nominator: MultiAddress,
            bouncer: MultiAddress,
            poolId: sts.number(),
        }),
        join: sts.enumStruct({
            amount: sts.bigint(),
            poolId: sts.number(),
        }),
        migrate_delegation: sts.enumStruct({
            memberAccount: MultiAddress,
        }),
        migrate_pool_to_delegate_stake: sts.enumStruct({
            poolId: sts.number(),
        }),
        nominate: sts.enumStruct({
            poolId: sts.number(),
            validators: sts.array(() => AccountId32),
        }),
        pool_withdraw_unbonded: sts.enumStruct({
            poolId: sts.number(),
            numSlashingSpans: sts.number(),
        }),
        set_claim_permission: sts.enumStruct({
            permission: ClaimPermission,
        }),
        set_commission: sts.enumStruct({
            poolId: sts.number(),
            newCommission: sts.option(() => sts.tuple(() => [Perbill, AccountId32])),
        }),
        set_commission_change_rate: sts.enumStruct({
            poolId: sts.number(),
            changeRate: CommissionChangeRate,
        }),
        set_commission_claim_permission: sts.enumStruct({
            poolId: sts.number(),
            permission: sts.option(() => CommissionClaimPermission),
        }),
        set_commission_max: sts.enumStruct({
            poolId: sts.number(),
            maxCommission: Perbill,
        }),
        set_configs: sts.enumStruct({
            minJoinBond: Type_305,
            minCreateBond: Type_305,
            maxPools: Type_306,
            maxMembers: Type_306,
            maxMembersPerPool: Type_306,
            globalMaxCommission: Type_307,
        }),
        set_metadata: sts.enumStruct({
            poolId: sts.number(),
            metadata: sts.bytes(),
        }),
        set_state: sts.enumStruct({
            poolId: sts.number(),
            state: PoolState,
        }),
        unbond: sts.enumStruct({
            memberAccount: MultiAddress,
            unbondingPoints: sts.bigint(),
        }),
        update_roles: sts.enumStruct({
            poolId: sts.number(),
            newRoot: Type_308,
            newNominator: Type_308,
            newBouncer: Type_308,
        }),
        withdraw_unbonded: sts.enumStruct({
            memberAccount: MultiAddress,
            numSlashingSpans: sts.number(),
        }),
    }
})

export const Type_308: sts.Type<Type_308> = sts.closedEnum(() => {
    return  {
        Noop: sts.unit(),
        Remove: sts.unit(),
        Set: AccountId32,
    }
})

export type Type_308 = Type_308_Noop | Type_308_Remove | Type_308_Set

export interface Type_308_Noop {
    __kind: 'Noop'
}

export interface Type_308_Remove {
    __kind: 'Remove'
}

export interface Type_308_Set {
    __kind: 'Set'
    value: AccountId32
}

export const PoolState: sts.Type<PoolState> = sts.closedEnum(() => {
    return  {
        Blocked: sts.unit(),
        Destroying: sts.unit(),
        Open: sts.unit(),
    }
})

export type PoolState = PoolState_Blocked | PoolState_Destroying | PoolState_Open

export interface PoolState_Blocked {
    __kind: 'Blocked'
}

export interface PoolState_Destroying {
    __kind: 'Destroying'
}

export interface PoolState_Open {
    __kind: 'Open'
}

export const Type_307: sts.Type<Type_307> = sts.closedEnum(() => {
    return  {
        Noop: sts.unit(),
        Remove: sts.unit(),
        Set: Perbill,
    }
})

export type Type_307 = Type_307_Noop | Type_307_Remove | Type_307_Set

export interface Type_307_Noop {
    __kind: 'Noop'
}

export interface Type_307_Remove {
    __kind: 'Remove'
}

export interface Type_307_Set {
    __kind: 'Set'
    value: Perbill
}

export const Type_306: sts.Type<Type_306> = sts.closedEnum(() => {
    return  {
        Noop: sts.unit(),
        Remove: sts.unit(),
        Set: sts.number(),
    }
})

export type Type_306 = Type_306_Noop | Type_306_Remove | Type_306_Set

export interface Type_306_Noop {
    __kind: 'Noop'
}

export interface Type_306_Remove {
    __kind: 'Remove'
}

export interface Type_306_Set {
    __kind: 'Set'
    value: number
}

export const Type_305: sts.Type<Type_305> = sts.closedEnum(() => {
    return  {
        Noop: sts.unit(),
        Remove: sts.unit(),
        Set: sts.bigint(),
    }
})

export type Type_305 = Type_305_Noop | Type_305_Remove | Type_305_Set

export interface Type_305_Noop {
    __kind: 'Noop'
}

export interface Type_305_Remove {
    __kind: 'Remove'
}

export interface Type_305_Set {
    __kind: 'Set'
    value: bigint
}

export const CommissionClaimPermission: sts.Type<CommissionClaimPermission> = sts.closedEnum(() => {
    return  {
        Account: AccountId32,
        Permissionless: sts.unit(),
    }
})

export type CommissionClaimPermission = CommissionClaimPermission_Account | CommissionClaimPermission_Permissionless

export interface CommissionClaimPermission_Account {
    __kind: 'Account'
    value: AccountId32
}

export interface CommissionClaimPermission_Permissionless {
    __kind: 'Permissionless'
}

export const CommissionChangeRate: sts.Type<CommissionChangeRate> = sts.struct(() => {
    return  {
        maxIncrease: Perbill,
        minDelay: sts.number(),
    }
})

export interface CommissionChangeRate {
    maxIncrease: Perbill
    minDelay: number
}

export const ClaimPermission: sts.Type<ClaimPermission> = sts.closedEnum(() => {
    return  {
        Permissioned: sts.unit(),
        PermissionlessAll: sts.unit(),
        PermissionlessCompound: sts.unit(),
        PermissionlessWithdraw: sts.unit(),
    }
})

export type ClaimPermission = ClaimPermission_Permissioned | ClaimPermission_PermissionlessAll | ClaimPermission_PermissionlessCompound | ClaimPermission_PermissionlessWithdraw

export interface ClaimPermission_Permissioned {
    __kind: 'Permissioned'
}

export interface ClaimPermission_PermissionlessAll {
    __kind: 'PermissionlessAll'
}

export interface ClaimPermission_PermissionlessCompound {
    __kind: 'PermissionlessCompound'
}

export interface ClaimPermission_PermissionlessWithdraw {
    __kind: 'PermissionlessWithdraw'
}

export const BondExtra: sts.Type<BondExtra> = sts.closedEnum(() => {
    return  {
        FreeBalance: sts.bigint(),
        Rewards: sts.unit(),
    }
})

export type BondExtra = BondExtra_FreeBalance | BondExtra_Rewards

export interface BondExtra_FreeBalance {
    __kind: 'FreeBalance'
    value: bigint
}

export interface BondExtra_Rewards {
    __kind: 'Rewards'
}

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export type NominationPoolsCall = NominationPoolsCall_adjust_pool_deposit | NominationPoolsCall_apply_slash | NominationPoolsCall_bond_extra | NominationPoolsCall_bond_extra_other | NominationPoolsCall_chill | NominationPoolsCall_claim_commission | NominationPoolsCall_claim_payout | NominationPoolsCall_claim_payout_other | NominationPoolsCall_create | NominationPoolsCall_create_with_pool_id | NominationPoolsCall_join | NominationPoolsCall_migrate_delegation | NominationPoolsCall_migrate_pool_to_delegate_stake | NominationPoolsCall_nominate | NominationPoolsCall_pool_withdraw_unbonded | NominationPoolsCall_set_claim_permission | NominationPoolsCall_set_commission | NominationPoolsCall_set_commission_change_rate | NominationPoolsCall_set_commission_claim_permission | NominationPoolsCall_set_commission_max | NominationPoolsCall_set_configs | NominationPoolsCall_set_metadata | NominationPoolsCall_set_state | NominationPoolsCall_unbond | NominationPoolsCall_update_roles | NominationPoolsCall_withdraw_unbonded

/**
 * Top up the deficit or withdraw the excess ED from the pool.
 * 
 * When a pool is created, the pool depositor transfers ED to the reward account of the
 * pool. ED is subject to change and over time, the deposit in the reward account may be
 * insufficient to cover the ED deficit of the pool or vice-versa where there is excess
 * deposit to the pool. This call allows anyone to adjust the ED deposit of the
 * pool by either topping up the deficit or claiming the excess.
 */
export interface NominationPoolsCall_adjust_pool_deposit {
    __kind: 'adjust_pool_deposit'
    poolId: number
}

/**
 * Apply a pending slash on a member.
 * 
 * Fails unless [`crate::pallet::Config::StakeAdapter`] is of strategy type:
 * [`adapter::StakeStrategyType::Delegate`].
 * 
 * The pending slash amount of the member must be equal or more than `ExistentialDeposit`.
 * This call can be dispatched permissionlessly (i.e. by any account). If the execution
 * is successful, fee is refunded and caller may be rewarded with a part of the slash
 * based on the [`crate::pallet::Config::StakeAdapter`] configuration.
 */
export interface NominationPoolsCall_apply_slash {
    __kind: 'apply_slash'
    memberAccount: MultiAddress
}

/**
 * Bond `extra` more funds from `origin` into the pool to which they already belong.
 * 
 * Additional funds can come from either the free balance of the account, of from the
 * accumulated rewards, see [`BondExtra`].
 * 
 * Bonding extra funds implies an automatic payout of all pending rewards as well.
 * See `bond_extra_other` to bond pending rewards of `other` members.
 */
export interface NominationPoolsCall_bond_extra {
    __kind: 'bond_extra'
    extra: BondExtra
}

/**
 * `origin` bonds funds from `extra` for some pool member `member` into their respective
 * pools.
 * 
 * `origin` can bond extra funds from free balance or pending rewards when `origin ==
 * other`.
 * 
 * In the case of `origin != other`, `origin` can only bond extra pending rewards of
 * `other` members assuming set_claim_permission for the given member is
 * `PermissionlessCompound` or `PermissionlessAll`.
 */
export interface NominationPoolsCall_bond_extra_other {
    __kind: 'bond_extra_other'
    member: MultiAddress
    extra: BondExtra
}

/**
 * Chill on behalf of the pool.
 * 
 * The dispatch origin of this call can be signed by the pool nominator or the pool
 * root role, same as [`Pallet::nominate`].
 * 
 * This directly forwards the call to an implementation of `StakingInterface` (e.g.,
 * `pallet-staking`) through [`Config::StakeAdapter`], on behalf of the bonded pool.
 * 
 * Under certain conditions, this call can be dispatched permissionlessly (i.e. by any
 * account).
 * 
 * # Conditions for a permissionless dispatch:
 * * When pool depositor has less than `MinNominatorBond` staked, otherwise pool members
 *   are unable to unbond.
 * 
 * # Conditions for permissioned dispatch:
 * * The caller is the pool's nominator or root.
 */
export interface NominationPoolsCall_chill {
    __kind: 'chill'
    poolId: number
}

/**
 * Claim pending commission.
 * 
 * The `root` role of the pool is _always_ allowed to claim the pool's commission.
 * 
 * If the pool has set `CommissionClaimPermission::Permissionless`, then any account can
 * trigger the process of claiming the pool's commission.
 * 
 * If the pool has set its `CommissionClaimPermission` to `Account(acc)`, then only
 * accounts
 * * `acc`, and
 * * the pool's root account
 * 
 * may call this extrinsic on behalf of the pool.
 * 
 * Pending commissions are paid out and added to the total claimed commission.
 * The total pending commission is reset to zero.
 */
export interface NominationPoolsCall_claim_commission {
    __kind: 'claim_commission'
    poolId: number
}

/**
 * A bonded member can use this to claim their payout based on the rewards that the pool
 * has accumulated since their last claimed payout (OR since joining if this is their first
 * time claiming rewards). The payout will be transferred to the member's account.
 * 
 * The member will earn rewards pro rata based on the members stake vs the sum of the
 * members in the pools stake. Rewards do not "expire".
 * 
 * See `claim_payout_other` to claim rewards on behalf of some `other` pool member.
 */
export interface NominationPoolsCall_claim_payout {
    __kind: 'claim_payout'
}

/**
 * `origin` can claim payouts on some pool member `other`'s behalf.
 * 
 * Pool member `other` must have a `PermissionlessWithdraw` or `PermissionlessAll` claim
 * permission for this call to be successful.
 */
export interface NominationPoolsCall_claim_payout_other {
    __kind: 'claim_payout_other'
    other: AccountId32
}

/**
 * Create a new delegation pool.
 * 
 * # Arguments
 * 
 * * `amount` - The amount of funds to delegate to the pool. This also acts of a sort of
 *   deposit since the pools creator cannot fully unbond funds until the pool is being
 *   destroyed.
 * * `index` - A disambiguation index for creating the account. Likely only useful when
 *   creating multiple pools in the same extrinsic.
 * * `root` - The account to set as [`PoolRoles::root`].
 * * `nominator` - The account to set as the [`PoolRoles::nominator`].
 * * `bouncer` - The account to set as the [`PoolRoles::bouncer`].
 * 
 * # Note
 * 
 * In addition to `amount`, the caller will transfer the existential deposit; so the caller
 * needs at have at least `amount + existential_deposit` transferable.
 */
export interface NominationPoolsCall_create {
    __kind: 'create'
    amount: bigint
    root: MultiAddress
    nominator: MultiAddress
    bouncer: MultiAddress
}

/**
 * Create a new delegation pool with a previously used pool id
 * 
 * # Arguments
 * 
 * same as `create` with the inclusion of
 * * `pool_id` - `A valid PoolId.
 */
export interface NominationPoolsCall_create_with_pool_id {
    __kind: 'create_with_pool_id'
    amount: bigint
    root: MultiAddress
    nominator: MultiAddress
    bouncer: MultiAddress
    poolId: number
}

/**
 * Stake funds with a pool. The amount to bond is delegated (or transferred based on
 * [`adapter::StakeStrategyType`]) from the member to the pool account and immediately
 * increases the pool's bond.
 * 
 * The method of transferring the amount to the pool account is determined by
 * [`adapter::StakeStrategyType`]. If the pool is configured to use
 * [`adapter::StakeStrategyType::Delegate`], the funds remain in the account of
 * the `origin`, while the pool gains the right to use these funds for staking.
 * 
 * # Note
 * 
 * * An account can only be a member of a single pool.
 * * An account cannot join the same pool multiple times.
 * * This call will *not* dust the member account, so the member must have at least
 *   `existential deposit + amount` in their account.
 * * Only a pool with [`PoolState::Open`] can be joined
 */
export interface NominationPoolsCall_join {
    __kind: 'join'
    amount: bigint
    poolId: number
}

/**
 * Migrates delegated funds from the pool account to the `member_account`.
 * 
 * Fails unless [`crate::pallet::Config::StakeAdapter`] is of strategy type:
 * [`adapter::StakeStrategyType::Delegate`].
 * 
 * This is a permission-less call and refunds any fee if claim is successful.
 * 
 * If the pool has migrated to delegation based staking, the staked tokens of pool members
 * can be moved and held in their own account. See [`adapter::DelegateStake`]
 */
export interface NominationPoolsCall_migrate_delegation {
    __kind: 'migrate_delegation'
    memberAccount: MultiAddress
}

/**
 * Migrate pool from [`adapter::StakeStrategyType::Transfer`] to
 * [`adapter::StakeStrategyType::Delegate`].
 * 
 * Fails unless [`crate::pallet::Config::StakeAdapter`] is of strategy type:
 * [`adapter::StakeStrategyType::Delegate`].
 * 
 * This call can be dispatched permissionlessly, and refunds any fee if successful.
 * 
 * If the pool has already migrated to delegation based staking, this call will fail.
 */
export interface NominationPoolsCall_migrate_pool_to_delegate_stake {
    __kind: 'migrate_pool_to_delegate_stake'
    poolId: number
}

/**
 * Nominate on behalf of the pool.
 * 
 * The dispatch origin of this call must be signed by the pool nominator or the pool
 * root role.
 * 
 * This directly forwards the call to an implementation of `StakingInterface` (e.g.,
 * `pallet-staking`) through [`Config::StakeAdapter`], on behalf of the bonded pool.
 * 
 * # Note
 * 
 * In addition to a `root` or `nominator` role of `origin`, the pool's depositor needs to
 * have at least `depositor_min_bond` in the pool to start nominating.
 */
export interface NominationPoolsCall_nominate {
    __kind: 'nominate'
    poolId: number
    validators: AccountId32[]
}

/**
 * Call `withdraw_unbonded` for the pools account. This call can be made by any account.
 * 
 * This is useful if there are too many unlocking chunks to call `unbond`, and some
 * can be cleared by withdrawing. In the case there are too many unlocking chunks, the user
 * would probably see an error like `NoMoreChunks` emitted from the staking system when
 * they attempt to unbond.
 */
export interface NominationPoolsCall_pool_withdraw_unbonded {
    __kind: 'pool_withdraw_unbonded'
    poolId: number
    numSlashingSpans: number
}

/**
 * Allows a pool member to set a claim permission to allow or disallow permissionless
 * bonding and withdrawing.
 * 
 * # Arguments
 * 
 * * `origin` - Member of a pool.
 * * `permission` - The permission to be applied.
 */
export interface NominationPoolsCall_set_claim_permission {
    __kind: 'set_claim_permission'
    permission: ClaimPermission
}

/**
 * Set the commission of a pool.
 * Both a commission percentage and a commission payee must be provided in the `current`
 * tuple. Where a `current` of `None` is provided, any current commission will be removed.
 * 
 * - If a `None` is supplied to `new_commission`, existing commission will be removed.
 */
export interface NominationPoolsCall_set_commission {
    __kind: 'set_commission'
    poolId: number
    newCommission?: ([Perbill, AccountId32] | undefined)
}

/**
 * Set the commission change rate for a pool.
 * 
 * Initial change rate is not bounded, whereas subsequent updates can only be more
 * restrictive than the current.
 */
export interface NominationPoolsCall_set_commission_change_rate {
    __kind: 'set_commission_change_rate'
    poolId: number
    changeRate: CommissionChangeRate
}

/**
 * Set or remove a pool's commission claim permission.
 * 
 * Determines who can claim the pool's pending commission. Only the `Root` role of the pool
 * is able to configure commission claim permissions.
 */
export interface NominationPoolsCall_set_commission_claim_permission {
    __kind: 'set_commission_claim_permission'
    poolId: number
    permission?: (CommissionClaimPermission | undefined)
}

/**
 * Set the maximum commission of a pool.
 * 
 * - Initial max can be set to any `Perbill`, and only smaller values thereafter.
 * - Current commission will be lowered in the event it is higher than a new max
 *   commission.
 */
export interface NominationPoolsCall_set_commission_max {
    __kind: 'set_commission_max'
    poolId: number
    maxCommission: Perbill
}

/**
 * Update configurations for the nomination pools. The origin for this call must be
 * [`Config::AdminOrigin`].
 * 
 * # Arguments
 * 
 * * `min_join_bond` - Set [`MinJoinBond`].
 * * `min_create_bond` - Set [`MinCreateBond`].
 * * `max_pools` - Set [`MaxPools`].
 * * `max_members` - Set [`MaxPoolMembers`].
 * * `max_members_per_pool` - Set [`MaxPoolMembersPerPool`].
 * * `global_max_commission` - Set [`GlobalMaxCommission`].
 */
export interface NominationPoolsCall_set_configs {
    __kind: 'set_configs'
    minJoinBond: Type_305
    minCreateBond: Type_305
    maxPools: Type_306
    maxMembers: Type_306
    maxMembersPerPool: Type_306
    globalMaxCommission: Type_307
}

/**
 * Set a new metadata for the pool.
 * 
 * The dispatch origin of this call must be signed by the bouncer, or the root role of the
 * pool.
 */
export interface NominationPoolsCall_set_metadata {
    __kind: 'set_metadata'
    poolId: number
    metadata: Bytes
}

/**
 * Set a new state for the pool.
 * 
 * If a pool is already in the `Destroying` state, then under no condition can its state
 * change again.
 * 
 * The dispatch origin of this call must be either:
 * 
 * 1. signed by the bouncer, or the root role of the pool,
 * 2. if the pool conditions to be open are NOT met (as described by `ok_to_be_open`), and
 *    then the state of the pool can be permissionlessly changed to `Destroying`.
 */
export interface NominationPoolsCall_set_state {
    __kind: 'set_state'
    poolId: number
    state: PoolState
}

/**
 * Unbond up to `unbonding_points` of the `member_account`'s funds from the pool. It
 * implicitly collects the rewards one last time, since not doing so would mean some
 * rewards would be forfeited.
 * 
 * Under certain conditions, this call can be dispatched permissionlessly (i.e. by any
 * account).
 * 
 * # Conditions for a permissionless dispatch.
 * 
 * * The pool is blocked and the caller is either the root or bouncer. This is refereed to
 *   as a kick.
 * * The pool is destroying and the member is not the depositor.
 * * The pool is destroying, the member is the depositor and no other members are in the
 *   pool.
 * 
 * ## Conditions for permissioned dispatch (i.e. the caller is also the
 * `member_account`):
 * 
 * * The caller is not the depositor.
 * * The caller is the depositor, the pool is destroying and no other members are in the
 *   pool.
 * 
 * # Note
 * 
 * If there are too many unlocking chunks to unbond with the pool account,
 * [`Call::pool_withdraw_unbonded`] can be called to try and minimize unlocking chunks.
 * The [`StakingInterface::unbond`] will implicitly call [`Call::pool_withdraw_unbonded`]
 * to try to free chunks if necessary (ie. if unbound was called and no unlocking chunks
 * are available). However, it may not be possible to release the current unlocking chunks,
 * in which case, the result of this call will likely be the `NoMoreChunks` error from the
 * staking system.
 */
export interface NominationPoolsCall_unbond {
    __kind: 'unbond'
    memberAccount: MultiAddress
    unbondingPoints: bigint
}

/**
 * Update the roles of the pool.
 * 
 * The root is the only entity that can change any of the roles, including itself,
 * excluding the depositor, who can never change.
 * 
 * It emits an event, notifying UIs of the role change. This event is quite relevant to
 * most pool members and they should be informed of changes to pool roles.
 */
export interface NominationPoolsCall_update_roles {
    __kind: 'update_roles'
    poolId: number
    newRoot: Type_308
    newNominator: Type_308
    newBouncer: Type_308
}

/**
 * Withdraw unbonded funds from `member_account`. If no bonded funds can be unbonded, an
 * error is returned.
 * 
 * Under certain conditions, this call can be dispatched permissionlessly (i.e. by any
 * account).
 * 
 * # Conditions for a permissionless dispatch
 * 
 * * The pool is in destroy mode and the target is not the depositor.
 * * The target is the depositor and they are the only member in the sub pools.
 * * The pool is blocked and the caller is either the root or bouncer.
 * 
 * # Conditions for permissioned dispatch
 * 
 * * The caller is the target and they are not the depositor.
 * 
 * # Note
 * 
 * - If the target is the depositor, the pool will be destroyed.
 * - If the pool has any pending slash, we also try to slash the member before letting them
 * withdraw. This calculation adds some weight overhead and is only defensive. In reality,
 * pool slashes must have been already applied via permissionless [`Call::apply_slash`].
 */
export interface NominationPoolsCall_withdraw_unbonded {
    __kind: 'withdraw_unbonded'
    memberAccount: MultiAddress
    numSlashingSpans: number
}

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export const NisCounterpartBalancesCall: sts.Type<NisCounterpartBalancesCall> = sts.closedEnum(() => {
    return  {
        burn: sts.enumStruct({
            value: sts.bigint(),
            keepAlive: sts.boolean(),
        }),
        force_adjust_total_issuance: sts.enumStruct({
            direction: AdjustmentDirection,
            delta: sts.bigint(),
        }),
        force_set_balance: sts.enumStruct({
            who: MultiAddress,
            newFree: sts.bigint(),
        }),
        force_transfer: sts.enumStruct({
            source: MultiAddress,
            dest: MultiAddress,
            value: sts.bigint(),
        }),
        force_unreserve: sts.enumStruct({
            who: MultiAddress,
            amount: sts.bigint(),
        }),
        transfer_all: sts.enumStruct({
            dest: MultiAddress,
            keepAlive: sts.boolean(),
        }),
        transfer_allow_death: sts.enumStruct({
            dest: MultiAddress,
            value: sts.bigint(),
        }),
        transfer_keep_alive: sts.enumStruct({
            dest: MultiAddress,
            value: sts.bigint(),
        }),
        upgrade_accounts: sts.enumStruct({
            who: sts.array(() => AccountId32),
        }),
    }
})

export const AdjustmentDirection: sts.Type<AdjustmentDirection> = sts.closedEnum(() => {
    return  {
        Decrease: sts.unit(),
        Increase: sts.unit(),
    }
})

export type AdjustmentDirection = AdjustmentDirection_Decrease | AdjustmentDirection_Increase

export interface AdjustmentDirection_Decrease {
    __kind: 'Decrease'
}

export interface AdjustmentDirection_Increase {
    __kind: 'Increase'
}

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export type NisCounterpartBalancesCall = NisCounterpartBalancesCall_burn | NisCounterpartBalancesCall_force_adjust_total_issuance | NisCounterpartBalancesCall_force_set_balance | NisCounterpartBalancesCall_force_transfer | NisCounterpartBalancesCall_force_unreserve | NisCounterpartBalancesCall_transfer_all | NisCounterpartBalancesCall_transfer_allow_death | NisCounterpartBalancesCall_transfer_keep_alive | NisCounterpartBalancesCall_upgrade_accounts

/**
 * Burn the specified liquid free balance from the origin account.
 * 
 * If the origin's account ends up below the existential deposit as a result
 * of the burn and `keep_alive` is false, the account will be reaped.
 * 
 * Unlike sending funds to a _burn_ address, which merely makes the funds inaccessible,
 * this `burn` operation will reduce total issuance by the amount _burned_.
 */
export interface NisCounterpartBalancesCall_burn {
    __kind: 'burn'
    value: bigint
    keepAlive: boolean
}

/**
 * Adjust the total issuance in a saturating way.
 * 
 * Can only be called by root and always needs a positive `delta`.
 * 
 * # Example
 */
export interface NisCounterpartBalancesCall_force_adjust_total_issuance {
    __kind: 'force_adjust_total_issuance'
    direction: AdjustmentDirection
    delta: bigint
}

/**
 * Set the regular balance of a given account.
 * 
 * The dispatch origin for this call is `root`.
 */
export interface NisCounterpartBalancesCall_force_set_balance {
    __kind: 'force_set_balance'
    who: MultiAddress
    newFree: bigint
}

/**
 * Exactly as `transfer_allow_death`, except the origin must be root and the source account
 * may be specified.
 */
export interface NisCounterpartBalancesCall_force_transfer {
    __kind: 'force_transfer'
    source: MultiAddress
    dest: MultiAddress
    value: bigint
}

/**
 * Unreserve some balance from a user by force.
 * 
 * Can only be called by ROOT.
 */
export interface NisCounterpartBalancesCall_force_unreserve {
    __kind: 'force_unreserve'
    who: MultiAddress
    amount: bigint
}

/**
 * Transfer the entire transferable balance from the caller account.
 * 
 * NOTE: This function only attempts to transfer _transferable_ balances. This means that
 * any locked, reserved, or existential deposits (when `keep_alive` is `true`), will not be
 * transferred by this function. To ensure that this function results in a killed account,
 * you might need to prepare the account by removing any reference counters, storage
 * deposits, etc...
 * 
 * The dispatch origin of this call must be Signed.
 * 
 * - `dest`: The recipient of the transfer.
 * - `keep_alive`: A boolean to determine if the `transfer_all` operation should send all
 *   of the funds the account has, causing the sender account to be killed (false), or
 *   transfer everything except at least the existential deposit, which will guarantee to
 *   keep the sender account alive (true).
 */
export interface NisCounterpartBalancesCall_transfer_all {
    __kind: 'transfer_all'
    dest: MultiAddress
    keepAlive: boolean
}

/**
 * Transfer some liquid free balance to another account.
 * 
 * `transfer_allow_death` will set the `FreeBalance` of the sender and receiver.
 * If the sender's account is below the existential deposit as a result
 * of the transfer, the account will be reaped.
 * 
 * The dispatch origin for this call must be `Signed` by the transactor.
 */
export interface NisCounterpartBalancesCall_transfer_allow_death {
    __kind: 'transfer_allow_death'
    dest: MultiAddress
    value: bigint
}

/**
 * Same as the [`transfer_allow_death`] call, but with a check that the transfer will not
 * kill the origin account.
 * 
 * 99% of the time you want [`transfer_allow_death`] instead.
 * 
 * [`transfer_allow_death`]: struct.Pallet.html#method.transfer
 */
export interface NisCounterpartBalancesCall_transfer_keep_alive {
    __kind: 'transfer_keep_alive'
    dest: MultiAddress
    value: bigint
}

/**
 * Upgrade a specified account.
 * 
 * - `origin`: Must be `Signed`.
 * - `who`: The account to be upgraded.
 * 
 * This will waive the transaction fee if at least all but 10% of the accounts needed to
 * be upgraded. (We let some not have to be upgraded just in order to allow for the
 * possibility of churn).
 */
export interface NisCounterpartBalancesCall_upgrade_accounts {
    __kind: 'upgrade_accounts'
    who: AccountId32[]
}

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export const NisCall: sts.Type<NisCall> = sts.closedEnum(() => {
    return  {
        communify: sts.enumStruct({
            index: sts.number(),
        }),
        fund_deficit: sts.unit(),
        place_bid: sts.enumStruct({
            amount: sts.bigint(),
            duration: sts.number(),
        }),
        privatize: sts.enumStruct({
            index: sts.number(),
        }),
        retract_bid: sts.enumStruct({
            amount: sts.bigint(),
            duration: sts.number(),
        }),
        thaw_communal: sts.enumStruct({
            index: sts.number(),
        }),
        thaw_private: sts.enumStruct({
            index: sts.number(),
            maybeProportion: sts.option(() => Perquintill),
        }),
    }
})

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export type NisCall = NisCall_communify | NisCall_fund_deficit | NisCall_place_bid | NisCall_privatize | NisCall_retract_bid | NisCall_thaw_communal | NisCall_thaw_private

/**
 * Make a private receipt communal and create fungible counterparts for its owner.
 */
export interface NisCall_communify {
    __kind: 'communify'
    index: number
}

/**
 * Ensure we have sufficient funding for all potential payouts.
 * 
 * - `origin`: Must be accepted by `FundOrigin`.
 */
export interface NisCall_fund_deficit {
    __kind: 'fund_deficit'
}

/**
 * Place a bid.
 * 
 * Origin must be Signed, and account must have at least `amount` in free balance.
 * 
 * - `amount`: The amount of the bid; these funds will be reserved, and if/when
 *   consolidated, removed. Must be at least `MinBid`.
 * - `duration`: The number of periods before which the newly consolidated bid may be
 *   thawed. Must be greater than 1 and no more than `QueueCount`.
 * 
 * Complexities:
 * - `Queues[duration].len()` (just take max).
 */
export interface NisCall_place_bid {
    __kind: 'place_bid'
    amount: bigint
    duration: number
}

/**
 * Make a communal receipt private and burn fungible counterparts from its owner.
 */
export interface NisCall_privatize {
    __kind: 'privatize'
    index: number
}

/**
 * Retract a previously placed bid.
 * 
 * Origin must be Signed, and the account should have previously issued a still-active bid
 * of `amount` for `duration`.
 * 
 * - `amount`: The amount of the previous bid.
 * - `duration`: The duration of the previous bid.
 */
export interface NisCall_retract_bid {
    __kind: 'retract_bid'
    amount: bigint
    duration: number
}

/**
 * Reduce or remove an outstanding receipt, placing the according proportion of funds into
 * the account of the owner.
 * 
 * - `origin`: Must be Signed and the account must be the owner of the fungible counterpart
 *   for receipt `index`.
 * - `index`: The index of the receipt.
 */
export interface NisCall_thaw_communal {
    __kind: 'thaw_communal'
    index: number
}

/**
 * Reduce or remove an outstanding receipt, placing the according proportion of funds into
 * the account of the owner.
 * 
 * - `origin`: Must be Signed and the account must be the owner of the receipt `index` as
 *   well as any fungible counterpart.
 * - `index`: The index of the receipt.
 * - `portion`: If `Some`, then only the given portion of the receipt should be thawed. If
 *   `None`, then all of it should be.
 */
export interface NisCall_thaw_private {
    __kind: 'thaw_private'
    index: number
    maybeProportion?: (Perquintill | undefined)
}

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export const MultisigCall: sts.Type<MultisigCall> = sts.closedEnum(() => {
    return  {
        approve_as_multi: sts.enumStruct({
            threshold: sts.number(),
            otherSignatories: sts.array(() => AccountId32),
            maybeTimepoint: sts.option(() => Timepoint),
            callHash: sts.bytes(),
            maxWeight: Weight,
        }),
        as_multi: sts.enumStruct({
            threshold: sts.number(),
            otherSignatories: sts.array(() => AccountId32),
            maybeTimepoint: sts.option(() => Timepoint),
            call: Call,
            maxWeight: Weight,
        }),
        as_multi_threshold_1: sts.enumStruct({
            otherSignatories: sts.array(() => AccountId32),
            call: Call,
        }),
        cancel_as_multi: sts.enumStruct({
            threshold: sts.number(),
            otherSignatories: sts.array(() => AccountId32),
            timepoint: Timepoint,
            callHash: sts.bytes(),
        }),
        poke_deposit: sts.enumStruct({
            threshold: sts.number(),
            otherSignatories: sts.array(() => AccountId32),
            callHash: sts.bytes(),
        }),
    }
})

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export type MultisigCall = MultisigCall_approve_as_multi | MultisigCall_as_multi | MultisigCall_as_multi_threshold_1 | MultisigCall_cancel_as_multi | MultisigCall_poke_deposit

/**
 * Register approval for a dispatch to be made from a deterministic composite account if
 * approved by a total of `threshold - 1` of `other_signatories`.
 * 
 * Payment: `DepositBase` will be reserved if this is the first approval, plus
 * `threshold` times `DepositFactor`. It is returned once this dispatch happens or
 * is cancelled.
 * 
 * The dispatch origin for this call must be _Signed_.
 * 
 * - `threshold`: The total number of approvals for this dispatch before it is executed.
 * - `other_signatories`: The accounts (other than the sender) who can approve this
 * dispatch. May not be empty.
 * - `maybe_timepoint`: If this is the first approval, then this must be `None`. If it is
 * not the first approval, then it must be `Some`, with the timepoint (block number and
 * transaction index) of the first approval transaction.
 * - `call_hash`: The hash of the call to be executed.
 * 
 * NOTE: If this is the final approval, you will want to use `as_multi` instead.
 * 
 * ## Complexity
 * - `O(S)`.
 * - Up to one balance-reserve or unreserve operation.
 * - One passthrough operation, one insert, both `O(S)` where `S` is the number of
 *   signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
 * - One encode & hash, both of complexity `O(S)`.
 * - Up to one binary search and insert (`O(logS + S)`).
 * - I/O: 1 read `O(S)`, up to 1 mutate `O(S)`. Up to one remove.
 * - One event.
 * - Storage: inserts one item, value size bounded by `MaxSignatories`, with a deposit
 *   taken for its lifetime of `DepositBase + threshold * DepositFactor`.
 */
export interface MultisigCall_approve_as_multi {
    __kind: 'approve_as_multi'
    threshold: number
    otherSignatories: AccountId32[]
    maybeTimepoint?: (Timepoint | undefined)
    callHash: Bytes
    maxWeight: Weight
}

/**
 * Register approval for a dispatch to be made from a deterministic composite account if
 * approved by a total of `threshold - 1` of `other_signatories`.
 * 
 * If there are enough, then dispatch the call.
 * 
 * Payment: `DepositBase` will be reserved if this is the first approval, plus
 * `threshold` times `DepositFactor`. It is returned once this dispatch happens or
 * is cancelled.
 * 
 * The dispatch origin for this call must be _Signed_.
 * 
 * - `threshold`: The total number of approvals for this dispatch before it is executed.
 * - `other_signatories`: The accounts (other than the sender) who can approve this
 * dispatch. May not be empty.
 * - `maybe_timepoint`: If this is the first approval, then this must be `None`. If it is
 * not the first approval, then it must be `Some`, with the timepoint (block number and
 * transaction index) of the first approval transaction.
 * - `call`: The call to be executed.
 * 
 * NOTE: Unless this is the final approval, you will generally want to use
 * `approve_as_multi` instead, since it only requires a hash of the call.
 * 
 * Result is equivalent to the dispatched result if `threshold` is exactly `1`. Otherwise
 * on success, result is `Ok` and the result from the interior call, if it was executed,
 * may be found in the deposited `MultisigExecuted` event.
 * 
 * ## Complexity
 * - `O(S + Z + Call)`.
 * - Up to one balance-reserve or unreserve operation.
 * - One passthrough operation, one insert, both `O(S)` where `S` is the number of
 *   signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
 * - One call encode & hash, both of complexity `O(Z)` where `Z` is tx-len.
 * - One encode & hash, both of complexity `O(S)`.
 * - Up to one binary search and insert (`O(logS + S)`).
 * - I/O: 1 read `O(S)`, up to 1 mutate `O(S)`. Up to one remove.
 * - One event.
 * - The weight of the `call`.
 * - Storage: inserts one item, value size bounded by `MaxSignatories`, with a deposit
 *   taken for its lifetime of `DepositBase + threshold * DepositFactor`.
 */
export interface MultisigCall_as_multi {
    __kind: 'as_multi'
    threshold: number
    otherSignatories: AccountId32[]
    maybeTimepoint?: (Timepoint | undefined)
    call: Call
    maxWeight: Weight
}

/**
 * Immediately dispatch a multi-signature call using a single approval from the caller.
 * 
 * The dispatch origin for this call must be _Signed_.
 * 
 * - `other_signatories`: The accounts (other than the sender) who are part of the
 * multi-signature, but do not participate in the approval process.
 * - `call`: The call to be executed.
 * 
 * Result is equivalent to the dispatched result.
 * 
 * ## Complexity
 * O(Z + C) where Z is the length of the call and C its execution weight.
 */
export interface MultisigCall_as_multi_threshold_1 {
    __kind: 'as_multi_threshold_1'
    otherSignatories: AccountId32[]
    call: Call
}

/**
 * Cancel a pre-existing, on-going multisig transaction. Any deposit reserved previously
 * for this operation will be unreserved on success.
 * 
 * The dispatch origin for this call must be _Signed_.
 * 
 * - `threshold`: The total number of approvals for this dispatch before it is executed.
 * - `other_signatories`: The accounts (other than the sender) who can approve this
 * dispatch. May not be empty.
 * - `timepoint`: The timepoint (block number and transaction index) of the first approval
 * transaction for this dispatch.
 * - `call_hash`: The hash of the call to be executed.
 * 
 * ## Complexity
 * - `O(S)`.
 * - Up to one balance-reserve or unreserve operation.
 * - One passthrough operation, one insert, both `O(S)` where `S` is the number of
 *   signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
 * - One encode & hash, both of complexity `O(S)`.
 * - One event.
 * - I/O: 1 read `O(S)`, one remove.
 * - Storage: removes one item.
 */
export interface MultisigCall_cancel_as_multi {
    __kind: 'cancel_as_multi'
    threshold: number
    otherSignatories: AccountId32[]
    timepoint: Timepoint
    callHash: Bytes
}

/**
 * Poke the deposit reserved for an existing multisig operation.
 * 
 * The dispatch origin for this call must be _Signed_ and must be the original depositor of
 * the multisig operation.
 * 
 * The transaction fee is waived if the deposit amount has changed.
 * 
 * - `threshold`: The total number of approvals needed for this multisig.
 * - `other_signatories`: The accounts (other than the sender) who are part of the
 *   multisig.
 * - `call_hash`: The hash of the call this deposit is reserved for.
 * 
 * Emits `DepositPoked` if successful.
 */
export interface MultisigCall_poke_deposit {
    __kind: 'poke_deposit'
    threshold: number
    otherSignatories: AccountId32[]
    callHash: Bytes
}

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export const MessageQueueCall: sts.Type<MessageQueueCall> = sts.closedEnum(() => {
    return  {
        execute_overweight: sts.enumStruct({
            messageOrigin: AggregateMessageOrigin,
            page: sts.number(),
            index: sts.number(),
            weightLimit: Weight,
        }),
        reap_page: sts.enumStruct({
            messageOrigin: AggregateMessageOrigin,
            pageIndex: sts.number(),
        }),
    }
})

export const AggregateMessageOrigin: sts.Type<AggregateMessageOrigin> = sts.closedEnum(() => {
    return  {
        Ump: UmpQueueId,
    }
})

export const UmpQueueId: sts.Type<UmpQueueId> = sts.closedEnum(() => {
    return  {
        Para: Id,
    }
})

export type UmpQueueId = UmpQueueId_Para

export interface UmpQueueId_Para {
    __kind: 'Para'
    value: Id
}

export type AggregateMessageOrigin = AggregateMessageOrigin_Ump

export interface AggregateMessageOrigin_Ump {
    __kind: 'Ump'
    value: UmpQueueId
}

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export type MessageQueueCall = MessageQueueCall_execute_overweight | MessageQueueCall_reap_page

/**
 * Execute an overweight message.
 * 
 * Temporary processing errors will be propagated whereas permanent errors are treated
 * as success condition.
 * 
 * - `origin`: Must be `Signed`.
 * - `message_origin`: The origin from which the message to be executed arrived.
 * - `page`: The page in the queue in which the message to be executed is sitting.
 * - `index`: The index into the queue of the message to be executed.
 * - `weight_limit`: The maximum amount of weight allowed to be consumed in the execution
 *   of the message.
 * 
 * Benchmark complexity considerations: O(index + weight_limit).
 */
export interface MessageQueueCall_execute_overweight {
    __kind: 'execute_overweight'
    messageOrigin: AggregateMessageOrigin
    page: number
    index: number
    weightLimit: Weight
}

/**
 * Remove a page which has no more messages remaining to be processed or is stale.
 */
export interface MessageQueueCall_reap_page {
    __kind: 'reap_page'
    messageOrigin: AggregateMessageOrigin
    pageIndex: number
}

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export const InitializerCall: sts.Type<InitializerCall> = sts.closedEnum(() => {
    return  {
        force_approve: sts.enumStruct({
            upTo: sts.number(),
        }),
    }
})

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export type InitializerCall = InitializerCall_force_approve

/**
 * Issue a signal to the consensus engine to forcibly act as though all parachain
 * blocks in all relay chain blocks up to and including the given number in the current
 * chain are valid and should be finalized.
 */
export interface InitializerCall_force_approve {
    __kind: 'force_approve'
    upTo: number
}

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export const IndicesCall: sts.Type<IndicesCall> = sts.closedEnum(() => {
    return  {
        claim: sts.enumStruct({
            index: sts.number(),
        }),
        force_transfer: sts.enumStruct({
            new: MultiAddress,
            index: sts.number(),
            freeze: sts.boolean(),
        }),
        free: sts.enumStruct({
            index: sts.number(),
        }),
        freeze: sts.enumStruct({
            index: sts.number(),
        }),
        poke_deposit: sts.enumStruct({
            index: sts.number(),
        }),
        transfer: sts.enumStruct({
            new: MultiAddress,
            index: sts.number(),
        }),
    }
})

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export type IndicesCall = IndicesCall_claim | IndicesCall_force_transfer | IndicesCall_free | IndicesCall_freeze | IndicesCall_poke_deposit | IndicesCall_transfer

/**
 * Assign an previously unassigned index.
 * 
 * Payment: `Deposit` is reserved from the sender account.
 * 
 * The dispatch origin for this call must be _Signed_.
 * 
 * - `index`: the index to be claimed. This must not be in use.
 * 
 * Emits `IndexAssigned` if successful.
 * 
 * ## Complexity
 * - `O(1)`.
 */
export interface IndicesCall_claim {
    __kind: 'claim'
    index: number
}

/**
 * Force an index to an account. This doesn't require a deposit. If the index is already
 * held, then any deposit is reimbursed to its current owner.
 * 
 * The dispatch origin for this call must be _Root_.
 * 
 * - `index`: the index to be (re-)assigned.
 * - `new`: the new owner of the index. This function is a no-op if it is equal to sender.
 * - `freeze`: if set to `true`, will freeze the index so it cannot be transferred.
 * 
 * Emits `IndexAssigned` if successful.
 * 
 * ## Complexity
 * - `O(1)`.
 */
export interface IndicesCall_force_transfer {
    __kind: 'force_transfer'
    new: MultiAddress
    index: number
    freeze: boolean
}

/**
 * Free up an index owned by the sender.
 * 
 * Payment: Any previous deposit placed for the index is unreserved in the sender account.
 * 
 * The dispatch origin for this call must be _Signed_ and the sender must own the index.
 * 
 * - `index`: the index to be freed. This must be owned by the sender.
 * 
 * Emits `IndexFreed` if successful.
 * 
 * ## Complexity
 * - `O(1)`.
 */
export interface IndicesCall_free {
    __kind: 'free'
    index: number
}

/**
 * Freeze an index so it will always point to the sender account. This consumes the
 * deposit.
 * 
 * The dispatch origin for this call must be _Signed_ and the signing account must have a
 * non-frozen account `index`.
 * 
 * - `index`: the index to be frozen in place.
 * 
 * Emits `IndexFrozen` if successful.
 * 
 * ## Complexity
 * - `O(1)`.
 */
export interface IndicesCall_freeze {
    __kind: 'freeze'
    index: number
}

/**
 * Poke the deposit reserved for an index.
 * 
 * The dispatch origin for this call must be _Signed_ and the signing account must have a
 * non-frozen account `index`.
 * 
 * The transaction fees is waived if the deposit is changed after poking/reconsideration.
 * 
 * - `index`: the index whose deposit is to be poked/reconsidered.
 * 
 * Emits `DepositPoked` if successful.
 */
export interface IndicesCall_poke_deposit {
    __kind: 'poke_deposit'
    index: number
}

/**
 * Assign an index already owned by the sender to another account. The balance reservation
 * is effectively transferred to the new account.
 * 
 * The dispatch origin for this call must be _Signed_.
 * 
 * - `index`: the index to be re-assigned. This must be owned by the sender.
 * - `new`: the new owner of the index. This function is a no-op if it is equal to sender.
 * 
 * Emits `IndexAssigned` if successful.
 * 
 * ## Complexity
 * - `O(1)`.
 */
export interface IndicesCall_transfer {
    __kind: 'transfer'
    new: MultiAddress
    index: number
}

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export const HrmpCall: sts.Type<HrmpCall> = sts.closedEnum(() => {
    return  {
        establish_channel_with_system: sts.enumStruct({
            targetSystemChain: Id,
        }),
        establish_system_channel: sts.enumStruct({
            sender: Id,
            recipient: Id,
        }),
        force_clean_hrmp: sts.enumStruct({
            para: Id,
            numInbound: sts.number(),
            numOutbound: sts.number(),
        }),
        force_open_hrmp_channel: sts.enumStruct({
            sender: Id,
            recipient: Id,
            maxCapacity: sts.number(),
            maxMessageSize: sts.number(),
        }),
        force_process_hrmp_close: sts.enumStruct({
            channels: sts.number(),
        }),
        force_process_hrmp_open: sts.enumStruct({
            channels: sts.number(),
        }),
        hrmp_accept_open_channel: sts.enumStruct({
            sender: Id,
        }),
        hrmp_cancel_open_request: sts.enumStruct({
            channelId: HrmpChannelId,
            openRequests: sts.number(),
        }),
        hrmp_close_channel: sts.enumStruct({
            channelId: HrmpChannelId,
        }),
        hrmp_init_open_channel: sts.enumStruct({
            recipient: Id,
            proposedMaxCapacity: sts.number(),
            proposedMaxMessageSize: sts.number(),
        }),
        poke_channel_deposits: sts.enumStruct({
            sender: Id,
            recipient: Id,
        }),
    }
})

export const HrmpChannelId: sts.Type<HrmpChannelId> = sts.struct(() => {
    return  {
        sender: Id,
        recipient: Id,
    }
})

export interface HrmpChannelId {
    sender: Id
    recipient: Id
}

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export type HrmpCall = HrmpCall_establish_channel_with_system | HrmpCall_establish_system_channel | HrmpCall_force_clean_hrmp | HrmpCall_force_open_hrmp_channel | HrmpCall_force_process_hrmp_close | HrmpCall_force_process_hrmp_open | HrmpCall_hrmp_accept_open_channel | HrmpCall_hrmp_cancel_open_request | HrmpCall_hrmp_close_channel | HrmpCall_hrmp_init_open_channel | HrmpCall_poke_channel_deposits

/**
 * Establish a bidirectional HRMP channel between a parachain and a system chain.
 * 
 * Arguments:
 * 
 * - `target_system_chain`: A system chain, `ParaId`.
 * 
 * The origin needs to be the parachain origin.
 */
export interface HrmpCall_establish_channel_with_system {
    __kind: 'establish_channel_with_system'
    targetSystemChain: Id
}

/**
 * Establish an HRMP channel between two system chains. If the channel does not already
 * exist, the transaction fees will be refunded to the caller. The system does not take
 * deposits for channels between system chains, and automatically sets the message number
 * and size limits to the maximum allowed by the network's configuration.
 * 
 * Arguments:
 * 
 * - `sender`: A system chain, `ParaId`.
 * - `recipient`: A system chain, `ParaId`.
 * 
 * Any signed origin can call this function, but _both_ inputs MUST be system chains. If
 * the channel does not exist yet, there is no fee.
 */
export interface HrmpCall_establish_system_channel {
    __kind: 'establish_system_channel'
    sender: Id
    recipient: Id
}

/**
 * This extrinsic triggers the cleanup of all the HRMP storage items that a para may have.
 * Normally this happens once per session, but this allows you to trigger the cleanup
 * immediately for a specific parachain.
 * 
 * Number of inbound and outbound channels for `para` must be provided as witness data.
 * 
 * Origin must be the `ChannelManager`.
 */
export interface HrmpCall_force_clean_hrmp {
    __kind: 'force_clean_hrmp'
    para: Id
    numInbound: number
    numOutbound: number
}

/**
 * Open a channel from a `sender` to a `recipient` `ParaId`. Although opened by governance,
 * the `max_capacity` and `max_message_size` are still subject to the Relay Chain's
 * configured limits.
 * 
 * Expected use is when one (and only one) of the `ParaId`s involved in the channel is
 * governed by the system, e.g. a system parachain.
 * 
 * Origin must be the `ChannelManager`.
 */
export interface HrmpCall_force_open_hrmp_channel {
    __kind: 'force_open_hrmp_channel'
    sender: Id
    recipient: Id
    maxCapacity: number
    maxMessageSize: number
}

/**
 * Force process HRMP close channel requests.
 * 
 * If there are pending HRMP close channel requests, you can use this function to process
 * all of those requests immediately.
 * 
 * Total number of closing channels must be provided as witness data.
 * 
 * Origin must be the `ChannelManager`.
 */
export interface HrmpCall_force_process_hrmp_close {
    __kind: 'force_process_hrmp_close'
    channels: number
}

/**
 * Force process HRMP open channel requests.
 * 
 * If there are pending HRMP open channel requests, you can use this function to process
 * all of those requests immediately.
 * 
 * Total number of opening channels must be provided as witness data.
 * 
 * Origin must be the `ChannelManager`.
 */
export interface HrmpCall_force_process_hrmp_open {
    __kind: 'force_process_hrmp_open'
    channels: number
}

/**
 * Accept a pending open channel request from the given sender.
 * 
 * The channel will be opened only on the next session boundary.
 */
export interface HrmpCall_hrmp_accept_open_channel {
    __kind: 'hrmp_accept_open_channel'
    sender: Id
}

/**
 * This cancels a pending open channel request. It can be canceled by either of the sender
 * or the recipient for that request. The origin must be either of those.
 * 
 * The cancellation happens immediately. It is not possible to cancel the request if it is
 * already accepted.
 * 
 * Total number of open requests (i.e. `HrmpOpenChannelRequestsList`) must be provided as
 * witness data.
 */
export interface HrmpCall_hrmp_cancel_open_request {
    __kind: 'hrmp_cancel_open_request'
    channelId: HrmpChannelId
    openRequests: number
}

/**
 * Initiate unilateral closing of a channel. The origin must be either the sender or the
 * recipient in the channel being closed.
 * 
 * The closure can only happen on a session change.
 */
export interface HrmpCall_hrmp_close_channel {
    __kind: 'hrmp_close_channel'
    channelId: HrmpChannelId
}

/**
 * Initiate opening a channel from a parachain to a given recipient with given channel
 * parameters.
 * 
 * - `proposed_max_capacity` - specifies how many messages can be in the channel at once.
 * - `proposed_max_message_size` - specifies the maximum size of the messages.
 * 
 * These numbers are a subject to the relay-chain configuration limits.
 * 
 * The channel can be opened only after the recipient confirms it and only on a session
 * change.
 */
export interface HrmpCall_hrmp_init_open_channel {
    __kind: 'hrmp_init_open_channel'
    recipient: Id
    proposedMaxCapacity: number
    proposedMaxMessageSize: number
}

/**
 * Update the deposits held for an HRMP channel to the latest `Configuration`. Channels
 * with system chains do not require a deposit.
 * 
 * Arguments:
 * 
 * - `sender`: A chain, `ParaId`.
 * - `recipient`: A chain, `ParaId`.
 * 
 * Any signed origin can call this function.
 */
export interface HrmpCall_poke_channel_deposits {
    __kind: 'poke_channel_deposits'
    sender: Id
    recipient: Id
}

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export const GrandpaCall: sts.Type<GrandpaCall> = sts.closedEnum(() => {
    return  {
        note_stalled: sts.enumStruct({
            delay: sts.number(),
            bestFinalizedBlockNumber: sts.number(),
        }),
        report_equivocation: sts.enumStruct({
            equivocationProof: Type_143,
            keyOwnerProof: MembershipProof,
        }),
        report_equivocation_unsigned: sts.enumStruct({
            equivocationProof: Type_143,
            keyOwnerProof: MembershipProof,
        }),
    }
})

export const Type_143: sts.Type<Type_143> = sts.struct(() => {
    return  {
        setId: sts.bigint(),
        equivocation: Equivocation,
    }
})

export const Equivocation: sts.Type<Equivocation> = sts.closedEnum(() => {
    return  {
        Precommit: Type_150,
        Prevote: Type_145,
    }
})

export const Type_145: sts.Type<Type_145> = sts.struct(() => {
    return  {
        roundNumber: sts.bigint(),
        identity: Public,
        first: sts.tuple(() => [Prevote, Signature]),
        second: sts.tuple(() => [Prevote, Signature]),
    }
})

export const Signature = sts.bytes()

export const Prevote: sts.Type<Prevote> = sts.struct(() => {
    return  {
        targetHash: H256,
        targetNumber: sts.number(),
    }
})

export interface Prevote {
    targetHash: H256
    targetNumber: number
}

export interface Type_145 {
    roundNumber: bigint
    identity: Public
    first: [Prevote, Signature]
    second: [Prevote, Signature]
}

export type Signature = Bytes

export const Type_150: sts.Type<Type_150> = sts.struct(() => {
    return  {
        roundNumber: sts.bigint(),
        identity: Public,
        first: sts.tuple(() => [Precommit, Signature]),
        second: sts.tuple(() => [Precommit, Signature]),
    }
})

export const Precommit: sts.Type<Precommit> = sts.struct(() => {
    return  {
        targetHash: H256,
        targetNumber: sts.number(),
    }
})

export interface Precommit {
    targetHash: H256
    targetNumber: number
}

export interface Type_150 {
    roundNumber: bigint
    identity: Public
    first: [Precommit, Signature]
    second: [Precommit, Signature]
}

export type Equivocation = Equivocation_Precommit | Equivocation_Prevote

export interface Equivocation_Precommit {
    __kind: 'Precommit'
    value: Type_150
}

export interface Equivocation_Prevote {
    __kind: 'Prevote'
    value: Type_145
}

export interface Type_143 {
    setId: bigint
    equivocation: Equivocation
}

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export type GrandpaCall = GrandpaCall_note_stalled | GrandpaCall_report_equivocation | GrandpaCall_report_equivocation_unsigned

/**
 * Note that the current authority set of the GRANDPA finality gadget has stalled.
 * 
 * This will trigger a forced authority set change at the beginning of the next session, to
 * be enacted `delay` blocks after that. The `delay` should be high enough to safely assume
 * that the block signalling the forced change will not be re-orged e.g. 1000 blocks.
 * The block production rate (which may be slowed down because of finality lagging) should
 * be taken into account when choosing the `delay`. The GRANDPA voters based on the new
 * authority will start voting on top of `best_finalized_block_number` for new finalized
 * blocks. `best_finalized_block_number` should be the highest of the latest finalized
 * block of all validators of the new authority set.
 * 
 * Only callable by root.
 */
export interface GrandpaCall_note_stalled {
    __kind: 'note_stalled'
    delay: number
    bestFinalizedBlockNumber: number
}

/**
 * Report voter equivocation/misbehavior. This method will verify the
 * equivocation proof and validate the given key ownership proof
 * against the extracted offender. If both are valid, the offence
 * will be reported.
 */
export interface GrandpaCall_report_equivocation {
    __kind: 'report_equivocation'
    equivocationProof: Type_143
    keyOwnerProof: MembershipProof
}

/**
 * Report voter equivocation/misbehavior. This method will verify the
 * equivocation proof and validate the given key ownership proof
 * against the extracted offender. If both are valid, the offence
 * will be reported.
 * 
 * This extrinsic must be called unsigned and it is expected that only
 * block authors will call it (validated in `ValidateUnsigned`), as such
 * if the block author is defined it will be defined as the equivocation
 * reporter.
 */
export interface GrandpaCall_report_equivocation_unsigned {
    __kind: 'report_equivocation_unsigned'
    equivocationProof: Type_143
    keyOwnerProof: MembershipProof
}

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export const FellowshipReferendaCall: sts.Type<FellowshipReferendaCall> = sts.closedEnum(() => {
    return  {
        cancel: sts.enumStruct({
            index: sts.number(),
        }),
        kill: sts.enumStruct({
            index: sts.number(),
        }),
        nudge_referendum: sts.enumStruct({
            index: sts.number(),
        }),
        one_fewer_deciding: sts.enumStruct({
            track: sts.number(),
        }),
        place_decision_deposit: sts.enumStruct({
            index: sts.number(),
        }),
        refund_decision_deposit: sts.enumStruct({
            index: sts.number(),
        }),
        refund_submission_deposit: sts.enumStruct({
            index: sts.number(),
        }),
        set_metadata: sts.enumStruct({
            index: sts.number(),
            maybeHash: sts.option(() => H256),
        }),
        submit: sts.enumStruct({
            proposalOrigin: OriginCaller,
            proposal: Bounded,
            enactmentMoment: DispatchTime,
        }),
    }
})

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export type FellowshipReferendaCall = FellowshipReferendaCall_cancel | FellowshipReferendaCall_kill | FellowshipReferendaCall_nudge_referendum | FellowshipReferendaCall_one_fewer_deciding | FellowshipReferendaCall_place_decision_deposit | FellowshipReferendaCall_refund_decision_deposit | FellowshipReferendaCall_refund_submission_deposit | FellowshipReferendaCall_set_metadata | FellowshipReferendaCall_submit

/**
 * Cancel an ongoing referendum.
 * 
 * - `origin`: must be the `CancelOrigin`.
 * - `index`: The index of the referendum to be cancelled.
 * 
 * Emits `Cancelled`.
 */
export interface FellowshipReferendaCall_cancel {
    __kind: 'cancel'
    index: number
}

/**
 * Cancel an ongoing referendum and slash the deposits.
 * 
 * - `origin`: must be the `KillOrigin`.
 * - `index`: The index of the referendum to be cancelled.
 * 
 * Emits `Killed` and `DepositSlashed`.
 */
export interface FellowshipReferendaCall_kill {
    __kind: 'kill'
    index: number
}

/**
 * Advance a referendum onto its next logical state. Only used internally.
 * 
 * - `origin`: must be `Root`.
 * - `index`: the referendum to be advanced.
 */
export interface FellowshipReferendaCall_nudge_referendum {
    __kind: 'nudge_referendum'
    index: number
}

/**
 * Advance a track onto its next logical state. Only used internally.
 * 
 * - `origin`: must be `Root`.
 * - `track`: the track to be advanced.
 * 
 * Action item for when there is now one fewer referendum in the deciding phase and the
 * `DecidingCount` is not yet updated. This means that we should either:
 * - begin deciding another referendum (and leave `DecidingCount` alone); or
 * - decrement `DecidingCount`.
 */
export interface FellowshipReferendaCall_one_fewer_deciding {
    __kind: 'one_fewer_deciding'
    track: number
}

/**
 * Post the Decision Deposit for a referendum.
 * 
 * - `origin`: must be `Signed` and the account must have funds available for the
 *   referendum's track's Decision Deposit.
 * - `index`: The index of the submitted referendum whose Decision Deposit is yet to be
 *   posted.
 * 
 * Emits `DecisionDepositPlaced`.
 */
export interface FellowshipReferendaCall_place_decision_deposit {
    __kind: 'place_decision_deposit'
    index: number
}

/**
 * Refund the Decision Deposit for a closed referendum back to the depositor.
 * 
 * - `origin`: must be `Signed` or `Root`.
 * - `index`: The index of a closed referendum whose Decision Deposit has not yet been
 *   refunded.
 * 
 * Emits `DecisionDepositRefunded`.
 */
export interface FellowshipReferendaCall_refund_decision_deposit {
    __kind: 'refund_decision_deposit'
    index: number
}

/**
 * Refund the Submission Deposit for a closed referendum back to the depositor.
 * 
 * - `origin`: must be `Signed` or `Root`.
 * - `index`: The index of a closed referendum whose Submission Deposit has not yet been
 *   refunded.
 * 
 * Emits `SubmissionDepositRefunded`.
 */
export interface FellowshipReferendaCall_refund_submission_deposit {
    __kind: 'refund_submission_deposit'
    index: number
}

/**
 * Set or clear metadata of a referendum.
 * 
 * Parameters:
 * - `origin`: Must be `Signed` by a creator of a referendum or by anyone to clear a
 *   metadata of a finished referendum.
 * - `index`:  The index of a referendum to set or clear metadata for.
 * - `maybe_hash`: The hash of an on-chain stored preimage. `None` to clear a metadata.
 */
export interface FellowshipReferendaCall_set_metadata {
    __kind: 'set_metadata'
    index: number
    maybeHash?: (H256 | undefined)
}

/**
 * Propose a referendum on a privileged action.
 * 
 * - `origin`: must be `SubmitOrigin` and the account must have `SubmissionDeposit` funds
 *   available.
 * - `proposal_origin`: The origin from which the proposal should be executed.
 * - `proposal`: The proposal.
 * - `enactment_moment`: The moment that the proposal should be enacted.
 * 
 * Emits `Submitted`.
 */
export interface FellowshipReferendaCall_submit {
    __kind: 'submit'
    proposalOrigin: OriginCaller
    proposal: Bounded
    enactmentMoment: DispatchTime
}

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export const FellowshipCollectiveCall: sts.Type<FellowshipCollectiveCall> = sts.closedEnum(() => {
    return  {
        add_member: sts.enumStruct({
            who: MultiAddress,
        }),
        cleanup_poll: sts.enumStruct({
            pollIndex: sts.number(),
            max: sts.number(),
        }),
        demote_member: sts.enumStruct({
            who: MultiAddress,
        }),
        exchange_member: sts.enumStruct({
            who: MultiAddress,
            newWho: MultiAddress,
        }),
        promote_member: sts.enumStruct({
            who: MultiAddress,
        }),
        remove_member: sts.enumStruct({
            who: MultiAddress,
            minRank: sts.number(),
        }),
        vote: sts.enumStruct({
            poll: sts.number(),
            aye: sts.boolean(),
        }),
    }
})

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export type FellowshipCollectiveCall = FellowshipCollectiveCall_add_member | FellowshipCollectiveCall_cleanup_poll | FellowshipCollectiveCall_demote_member | FellowshipCollectiveCall_exchange_member | FellowshipCollectiveCall_promote_member | FellowshipCollectiveCall_remove_member | FellowshipCollectiveCall_vote

/**
 * Introduce a new member.
 * 
 * - `origin`: Must be the `AddOrigin`.
 * - `who`: Account of non-member which will become a member.
 * 
 * Weight: `O(1)`
 */
export interface FellowshipCollectiveCall_add_member {
    __kind: 'add_member'
    who: MultiAddress
}

/**
 * Remove votes from the given poll. It must have ended.
 * 
 * - `origin`: Must be `Signed` by any account.
 * - `poll_index`: Index of a poll which is completed and for which votes continue to
 *   exist.
 * - `max`: Maximum number of vote items from remove in this call.
 * 
 * Transaction fees are waived if the operation is successful.
 * 
 * Weight `O(max)` (less if there are fewer items to remove than `max`).
 */
export interface FellowshipCollectiveCall_cleanup_poll {
    __kind: 'cleanup_poll'
    pollIndex: number
    max: number
}

/**
 * Decrement the rank of an existing member by one. If the member is already at rank zero,
 * then they are removed entirely.
 * 
 * - `origin`: Must be the `DemoteOrigin`.
 * - `who`: Account of existing member of rank greater than zero.
 * 
 * Weight: `O(1)`, less if the member's index is highest in its rank.
 */
export interface FellowshipCollectiveCall_demote_member {
    __kind: 'demote_member'
    who: MultiAddress
}

/**
 * Exchanges a member with a new account and the same existing rank.
 * 
 * - `origin`: Must be the `ExchangeOrigin`.
 * - `who`: Account of existing member of rank greater than zero to be exchanged.
 * - `new_who`: New Account of existing member of rank greater than zero to exchanged to.
 */
export interface FellowshipCollectiveCall_exchange_member {
    __kind: 'exchange_member'
    who: MultiAddress
    newWho: MultiAddress
}

/**
 * Increment the rank of an existing member by one.
 * 
 * - `origin`: Must be the `PromoteOrigin`.
 * - `who`: Account of existing member.
 * 
 * Weight: `O(1)`
 */
export interface FellowshipCollectiveCall_promote_member {
    __kind: 'promote_member'
    who: MultiAddress
}

/**
 * Remove the member entirely.
 * 
 * - `origin`: Must be the `RemoveOrigin`.
 * - `who`: Account of existing member of rank greater than zero.
 * - `min_rank`: The rank of the member or greater.
 * 
 * Weight: `O(min_rank)`.
 */
export interface FellowshipCollectiveCall_remove_member {
    __kind: 'remove_member'
    who: MultiAddress
    minRank: number
}

/**
 * Add an aye or nay vote for the sender to the given proposal.
 * 
 * - `origin`: Must be `Signed` by a member account.
 * - `poll`: Index of a poll which is ongoing.
 * - `aye`: `true` if the vote is to approve the proposal, `false` otherwise.
 * 
 * Transaction fees are be waived if the member is voting on any particular proposal
 * for the first time and the call is successful. Subsequent vote changes will charge a
 * fee.
 * 
 * Weight: `O(1)`, less if there was no previous vote on the poll by the member.
 */
export interface FellowshipCollectiveCall_vote {
    __kind: 'vote'
    poll: number
    aye: boolean
}

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export const FastUnstakeCall: sts.Type<FastUnstakeCall> = sts.closedEnum(() => {
    return  {
        control: sts.enumStruct({
            erasToCheck: sts.number(),
        }),
        deregister: sts.unit(),
        register_fast_unstake: sts.unit(),
    }
})

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export type FastUnstakeCall = FastUnstakeCall_control | FastUnstakeCall_deregister | FastUnstakeCall_register_fast_unstake

/**
 * Control the operation of this pallet.
 * 
 * ## Dispatch Origin
 * 
 * The dispatch origin of this call must be [`Config::ControlOrigin`].
 * 
 * ## Details
 * 
 * Can set the number of eras to check per block, and potentially other admin work.
 * 
 * ## Events
 * 
 * No events are emitted from this dispatch.
 */
export interface FastUnstakeCall_control {
    __kind: 'control'
    erasToCheck: number
}

/**
 * Deregister oneself from the fast-unstake.
 * 
 * ## Dispatch Origin
 * 
 * The dispatch origin of this call must be *signed* by whoever is permitted to call
 * unbond funds by the staking system. See [`Config::Staking`].
 * 
 * ## Details
 * 
 * This is useful if one is registered, they are still waiting, and they change their mind.
 * 
 * Note that the associated stash is still fully unbonded and chilled as a consequence of
 * calling [`Pallet::register_fast_unstake`]. Therefore, this should probably be followed
 * by a call to `rebond` in the staking system.
 * 
 * ## Events
 * 
 * Some events from the staking and currency system might be emitted.
 */
export interface FastUnstakeCall_deregister {
    __kind: 'deregister'
}

/**
 * Register oneself for fast-unstake.
 * 
 * ## Dispatch Origin
 * 
 * The dispatch origin of this call must be *signed* by whoever is permitted to call
 * unbond funds by the staking system. See [`Config::Staking`].
 * 
 * ## Details
 * 
 * The stash associated with the origin must have no ongoing unlocking chunks. If
 * successful, this will fully unbond and chill the stash. Then, it will enqueue the stash
 * to be checked in further blocks.
 * 
 * If by the time this is called, the stash is actually eligible for fast-unstake, then
 * they are guaranteed to remain eligible, because the call will chill them as well.
 * 
 * If the check works, the entire staking data is removed, i.e. the stash is fully
 * unstaked.
 * 
 * If the check fails, the stash remains chilled and waiting for being unbonded as in with
 * the normal staking system, but they lose part of their unbonding chunks due to consuming
 * the chain's resources.
 * 
 * ## Events
 * 
 * Some events from the staking and currency system might be emitted.
 */
export interface FastUnstakeCall_register_fast_unstake {
    __kind: 'register_fast_unstake'
}

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export const ElectionProviderMultiPhaseCall: sts.Type<ElectionProviderMultiPhaseCall> = sts.closedEnum(() => {
    return  {
        governance_fallback: sts.enumStruct({
            maybeMaxVoters: sts.option(() => sts.number()),
            maybeMaxTargets: sts.option(() => sts.number()),
        }),
        set_emergency_election_result: sts.enumStruct({
            supports: sts.array(() => sts.tuple(() => [AccountId32, Support])),
        }),
        set_minimum_untrusted_score: sts.enumStruct({
            maybeNextScore: sts.option(() => ElectionScore),
        }),
        submit: sts.enumStruct({
            rawSolution: RawSolution,
        }),
        submit_unsigned: sts.enumStruct({
            rawSolution: RawSolution,
            witness: SolutionOrSnapshotSize,
        }),
    }
})

export const SolutionOrSnapshotSize: sts.Type<SolutionOrSnapshotSize> = sts.struct(() => {
    return  {
        voters: sts.number(),
        targets: sts.number(),
    }
})

export interface SolutionOrSnapshotSize {
    voters: number
    targets: number
}

export const RawSolution: sts.Type<RawSolution> = sts.struct(() => {
    return  {
        solution: NposCompactSolution24,
        score: ElectionScore,
        round: sts.number(),
    }
})

export const NposCompactSolution24: sts.Type<NposCompactSolution24> = sts.struct(() => {
    return  {
        votes1: sts.array(() => sts.tuple(() => [sts.number(), sts.number()])),
        votes2: sts.array(() => sts.tuple(() => [sts.number(), sts.tuple(() => [sts.number(), sts.number()]), sts.number()])),
        votes3: sts.array(() => sts.tuple(() => [sts.number(), sts.array(() => sts.tuple(() => [sts.number(), sts.number()])), sts.number()])),
        votes4: sts.array(() => sts.tuple(() => [sts.number(), sts.array(() => sts.tuple(() => [sts.number(), sts.number()])), sts.number()])),
        votes5: sts.array(() => sts.tuple(() => [sts.number(), sts.array(() => sts.tuple(() => [sts.number(), sts.number()])), sts.number()])),
        votes6: sts.array(() => sts.tuple(() => [sts.number(), sts.array(() => sts.tuple(() => [sts.number(), sts.number()])), sts.number()])),
        votes7: sts.array(() => sts.tuple(() => [sts.number(), sts.array(() => sts.tuple(() => [sts.number(), sts.number()])), sts.number()])),
        votes8: sts.array(() => sts.tuple(() => [sts.number(), sts.array(() => sts.tuple(() => [sts.number(), sts.number()])), sts.number()])),
        votes9: sts.array(() => sts.tuple(() => [sts.number(), sts.array(() => sts.tuple(() => [sts.number(), sts.number()])), sts.number()])),
        votes10: sts.array(() => sts.tuple(() => [sts.number(), sts.array(() => sts.tuple(() => [sts.number(), sts.number()])), sts.number()])),
        votes11: sts.array(() => sts.tuple(() => [sts.number(), sts.array(() => sts.tuple(() => [sts.number(), sts.number()])), sts.number()])),
        votes12: sts.array(() => sts.tuple(() => [sts.number(), sts.array(() => sts.tuple(() => [sts.number(), sts.number()])), sts.number()])),
        votes13: sts.array(() => sts.tuple(() => [sts.number(), sts.array(() => sts.tuple(() => [sts.number(), sts.number()])), sts.number()])),
        votes14: sts.array(() => sts.tuple(() => [sts.number(), sts.array(() => sts.tuple(() => [sts.number(), sts.number()])), sts.number()])),
        votes15: sts.array(() => sts.tuple(() => [sts.number(), sts.array(() => sts.tuple(() => [sts.number(), sts.number()])), sts.number()])),
        votes16: sts.array(() => sts.tuple(() => [sts.number(), sts.array(() => sts.tuple(() => [sts.number(), sts.number()])), sts.number()])),
        votes17: sts.array(() => sts.tuple(() => [sts.number(), sts.array(() => sts.tuple(() => [sts.number(), sts.number()])), sts.number()])),
        votes18: sts.array(() => sts.tuple(() => [sts.number(), sts.array(() => sts.tuple(() => [sts.number(), sts.number()])), sts.number()])),
        votes19: sts.array(() => sts.tuple(() => [sts.number(), sts.array(() => sts.tuple(() => [sts.number(), sts.number()])), sts.number()])),
        votes20: sts.array(() => sts.tuple(() => [sts.number(), sts.array(() => sts.tuple(() => [sts.number(), sts.number()])), sts.number()])),
        votes21: sts.array(() => sts.tuple(() => [sts.number(), sts.array(() => sts.tuple(() => [sts.number(), sts.number()])), sts.number()])),
        votes22: sts.array(() => sts.tuple(() => [sts.number(), sts.array(() => sts.tuple(() => [sts.number(), sts.number()])), sts.number()])),
        votes23: sts.array(() => sts.tuple(() => [sts.number(), sts.array(() => sts.tuple(() => [sts.number(), sts.number()])), sts.number()])),
        votes24: sts.array(() => sts.tuple(() => [sts.number(), sts.array(() => sts.tuple(() => [sts.number(), sts.number()])), sts.number()])),
    }
})

export interface NposCompactSolution24 {
    votes1: [number, number][]
    votes2: [number, [number, number], number][]
    votes3: [number, [number, number][], number][]
    votes4: [number, [number, number][], number][]
    votes5: [number, [number, number][], number][]
    votes6: [number, [number, number][], number][]
    votes7: [number, [number, number][], number][]
    votes8: [number, [number, number][], number][]
    votes9: [number, [number, number][], number][]
    votes10: [number, [number, number][], number][]
    votes11: [number, [number, number][], number][]
    votes12: [number, [number, number][], number][]
    votes13: [number, [number, number][], number][]
    votes14: [number, [number, number][], number][]
    votes15: [number, [number, number][], number][]
    votes16: [number, [number, number][], number][]
    votes17: [number, [number, number][], number][]
    votes18: [number, [number, number][], number][]
    votes19: [number, [number, number][], number][]
    votes20: [number, [number, number][], number][]
    votes21: [number, [number, number][], number][]
    votes22: [number, [number, number][], number][]
    votes23: [number, [number, number][], number][]
    votes24: [number, [number, number][], number][]
}

export interface RawSolution {
    solution: NposCompactSolution24
    score: ElectionScore
    round: number
}

export interface ElectionScore {
    minimalStake: bigint
    sumStake: bigint
    sumStakeSquared: bigint
}

export const ElectionScore: sts.Type<ElectionScore> = sts.struct(() => {
    return  {
        minimalStake: sts.bigint(),
        sumStake: sts.bigint(),
        sumStakeSquared: sts.bigint(),
    }
})

export const Support: sts.Type<Support> = sts.struct(() => {
    return  {
        total: sts.bigint(),
        voters: sts.array(() => sts.tuple(() => [AccountId32, sts.bigint()])),
    }
})

export interface Support {
    total: bigint
    voters: [AccountId32, bigint][]
}

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export type ElectionProviderMultiPhaseCall = ElectionProviderMultiPhaseCall_governance_fallback | ElectionProviderMultiPhaseCall_set_emergency_election_result | ElectionProviderMultiPhaseCall_set_minimum_untrusted_score | ElectionProviderMultiPhaseCall_submit | ElectionProviderMultiPhaseCall_submit_unsigned

/**
 * Trigger the governance fallback.
 * 
 * This can only be called when [`Phase::Emergency`] is enabled, as an alternative to
 * calling [`Call::set_emergency_election_result`].
 */
export interface ElectionProviderMultiPhaseCall_governance_fallback {
    __kind: 'governance_fallback'
    maybeMaxVoters?: (number | undefined)
    maybeMaxTargets?: (number | undefined)
}

/**
 * Set a solution in the queue, to be handed out to the client of this pallet in the next
 * call to `ElectionProvider::elect`.
 * 
 * This can only be set by `T::ForceOrigin`, and only when the phase is `Emergency`.
 * 
 * The solution is not checked for any feasibility and is assumed to be trustworthy, as any
 * feasibility check itself can in principle cause the election process to fail (due to
 * memory/weight constrains).
 */
export interface ElectionProviderMultiPhaseCall_set_emergency_election_result {
    __kind: 'set_emergency_election_result'
    supports: [AccountId32, Support][]
}

/**
 * Set a new value for `MinimumUntrustedScore`.
 * 
 * Dispatch origin must be aligned with `T::ForceOrigin`.
 * 
 * This check can be turned off by setting the value to `None`.
 */
export interface ElectionProviderMultiPhaseCall_set_minimum_untrusted_score {
    __kind: 'set_minimum_untrusted_score'
    maybeNextScore?: (ElectionScore | undefined)
}

/**
 * Submit a solution for the signed phase.
 * 
 * The dispatch origin fo this call must be __signed__.
 * 
 * The solution is potentially queued, based on the claimed score and processed at the end
 * of the signed phase.
 * 
 * A deposit is reserved and recorded for the solution. Based on the outcome, the solution
 * might be rewarded, slashed, or get all or a part of the deposit back.
 */
export interface ElectionProviderMultiPhaseCall_submit {
    __kind: 'submit'
    rawSolution: RawSolution
}

/**
 * Submit a solution for the unsigned phase.
 * 
 * The dispatch origin fo this call must be __none__.
 * 
 * This submission is checked on the fly. Moreover, this unsigned solution is only
 * validated when submitted to the pool from the **local** node. Effectively, this means
 * that only active validators can submit this transaction when authoring a block (similar
 * to an inherent).
 * 
 * To prevent any incorrect solution (and thus wasted time/weight), this transaction will
 * panic if the solution submitted by the validator is invalid in any way, effectively
 * putting their authoring reward at risk.
 * 
 * No deposit or reward is associated with this submission.
 */
export interface ElectionProviderMultiPhaseCall_submit_unsigned {
    __kind: 'submit_unsigned'
    rawSolution: RawSolution
    witness: SolutionOrSnapshotSize
}

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export const CrowdloanCall: sts.Type<CrowdloanCall> = sts.closedEnum(() => {
    return  {
        add_memo: sts.enumStruct({
            index: Id,
            memo: sts.bytes(),
        }),
        contribute: sts.enumStruct({
            index: sts.number(),
            value: sts.bigint(),
            signature: sts.option(() => MultiSignature),
        }),
        contribute_all: sts.enumStruct({
            index: sts.number(),
            signature: sts.option(() => MultiSignature),
        }),
        create: sts.enumStruct({
            index: sts.number(),
            cap: sts.bigint(),
            firstPeriod: sts.number(),
            lastPeriod: sts.number(),
            end: sts.number(),
            verifier: sts.option(() => MultiSigner),
        }),
        dissolve: sts.enumStruct({
            index: sts.number(),
        }),
        edit: sts.enumStruct({
            index: sts.number(),
            cap: sts.bigint(),
            firstPeriod: sts.number(),
            lastPeriod: sts.number(),
            end: sts.number(),
            verifier: sts.option(() => MultiSigner),
        }),
        poke: sts.enumStruct({
            index: Id,
        }),
        refund: sts.enumStruct({
            index: sts.number(),
        }),
        withdraw: sts.enumStruct({
            who: AccountId32,
            index: sts.number(),
        }),
    }
})

export const MultiSigner: sts.Type<MultiSigner> = sts.closedEnum(() => {
    return  {
        Ecdsa: sts.bytes(),
        Ed25519: sts.bytes(),
        Sr25519: sts.bytes(),
    }
})

export type MultiSigner = MultiSigner_Ecdsa | MultiSigner_Ed25519 | MultiSigner_Sr25519

export interface MultiSigner_Ecdsa {
    __kind: 'Ecdsa'
    value: Bytes
}

export interface MultiSigner_Ed25519 {
    __kind: 'Ed25519'
    value: Bytes
}

export interface MultiSigner_Sr25519 {
    __kind: 'Sr25519'
    value: Bytes
}

export const MultiSignature: sts.Type<MultiSignature> = sts.closedEnum(() => {
    return  {
        Ecdsa: sts.bytes(),
        Ed25519: sts.bytes(),
        Sr25519: sts.bytes(),
    }
})

export type MultiSignature = MultiSignature_Ecdsa | MultiSignature_Ed25519 | MultiSignature_Sr25519

export interface MultiSignature_Ecdsa {
    __kind: 'Ecdsa'
    value: Bytes
}

export interface MultiSignature_Ed25519 {
    __kind: 'Ed25519'
    value: Bytes
}

export interface MultiSignature_Sr25519 {
    __kind: 'Sr25519'
    value: Bytes
}

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export type CrowdloanCall = CrowdloanCall_add_memo | CrowdloanCall_contribute | CrowdloanCall_contribute_all | CrowdloanCall_create | CrowdloanCall_dissolve | CrowdloanCall_edit | CrowdloanCall_poke | CrowdloanCall_refund | CrowdloanCall_withdraw

/**
 * Add an optional memo to an existing crowdloan contribution.
 * 
 * Origin must be Signed, and the user must have contributed to the crowdloan.
 */
export interface CrowdloanCall_add_memo {
    __kind: 'add_memo'
    index: Id
    memo: Bytes
}

/**
 * Contribute to a crowd sale. This will transfer some balance over to fund a parachain
 * slot. It will be withdrawable when the crowdloan has ended and the funds are unused.
 */
export interface CrowdloanCall_contribute {
    __kind: 'contribute'
    index: number
    value: bigint
    signature?: (MultiSignature | undefined)
}

/**
 * Contribute your entire balance to a crowd sale. This will transfer the entire balance of
 * a user over to fund a parachain slot. It will be withdrawable when the crowdloan has
 * ended and the funds are unused.
 */
export interface CrowdloanCall_contribute_all {
    __kind: 'contribute_all'
    index: number
    signature?: (MultiSignature | undefined)
}

/**
 * Create a new crowdloaning campaign for a parachain slot with the given lease period
 * range.
 * 
 * This applies a lock to your parachain configuration, ensuring that it cannot be changed
 * by the parachain manager.
 */
export interface CrowdloanCall_create {
    __kind: 'create'
    index: number
    cap: bigint
    firstPeriod: number
    lastPeriod: number
    end: number
    verifier?: (MultiSigner | undefined)
}

/**
 * Remove a fund after the retirement period has ended and all funds have been returned.
 */
export interface CrowdloanCall_dissolve {
    __kind: 'dissolve'
    index: number
}

/**
 * Edit the configuration for an in-progress crowdloan.
 * 
 * Can only be called by Root origin.
 */
export interface CrowdloanCall_edit {
    __kind: 'edit'
    index: number
    cap: bigint
    firstPeriod: number
    lastPeriod: number
    end: number
    verifier?: (MultiSigner | undefined)
}

/**
 * Poke the fund into `NewRaise`
 * 
 * Origin must be Signed, and the fund has non-zero raise.
 */
export interface CrowdloanCall_poke {
    __kind: 'poke'
    index: Id
}

/**
 * Automatically refund contributors of an ended crowdloan.
 * Due to weight restrictions, this function may need to be called multiple
 * times to fully refund all users. We will refund `RemoveKeysLimit` users at a time.
 * 
 * Origin must be signed, but can come from anyone.
 */
export interface CrowdloanCall_refund {
    __kind: 'refund'
    index: number
}

/**
 * Withdraw full balance of a specific contributor.
 * 
 * Origin must be signed, but can come from anyone.
 * 
 * The fund must be either in, or ready for, retirement. For a fund to be *in* retirement,
 * then the retirement flag must be set. For a fund to be ready for retirement, then:
 * - it must not already be in retirement;
 * - the amount of raised funds must be bigger than the _free_ balance of the account;
 * - and either:
 *   - the block number must be at least `end`; or
 *   - the current lease period must be greater than the fund's `last_period`.
 * 
 * In this case, the fund's retirement flag is set and its `end` is reset to the current
 * block number.
 * 
 * - `who`: The account whose contribution should be withdrawn.
 * - `index`: The parachain to whose crowdloan the contribution was made.
 */
export interface CrowdloanCall_withdraw {
    __kind: 'withdraw'
    who: AccountId32
    index: number
}

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export const CoretimeCall: sts.Type<CoretimeCall> = sts.closedEnum(() => {
    return  {
        assign_core: sts.enumStruct({
            core: sts.number(),
            begin: sts.number(),
            assignment: sts.array(() => sts.tuple(() => [CoreAssignment, PartsOf57600])),
            endHint: sts.option(() => sts.number()),
        }),
        credit_account: sts.enumStruct({
            who: AccountId32,
            amount: sts.bigint(),
        }),
        request_core_count: sts.enumStruct({
            count: sts.number(),
        }),
        request_revenue_at: sts.enumStruct({
            when: sts.number(),
        }),
    }
})

export const PartsOf57600 = sts.number()

export const CoreAssignment: sts.Type<CoreAssignment> = sts.closedEnum(() => {
    return  {
        Idle: sts.unit(),
        Pool: sts.unit(),
        Task: sts.number(),
    }
})

export type CoreAssignment = CoreAssignment_Idle | CoreAssignment_Pool | CoreAssignment_Task

export interface CoreAssignment_Idle {
    __kind: 'Idle'
}

export interface CoreAssignment_Pool {
    __kind: 'Pool'
}

export interface CoreAssignment_Task {
    __kind: 'Task'
    value: number
}

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export type CoretimeCall = CoretimeCall_assign_core | CoretimeCall_credit_account | CoretimeCall_request_core_count | CoretimeCall_request_revenue_at

/**
 * Receive instructions from the `ExternalBrokerOrigin`, detailing how a specific core is
 * to be used.
 * 
 * Parameters:
 * -`origin`: The `ExternalBrokerOrigin`, assumed to be the coretime chain.
 * -`core`: The core that should be scheduled.
 * -`begin`: The starting blockheight of the instruction.
 * -`assignment`: How the blockspace should be utilised.
 * -`end_hint`: An optional hint as to when this particular set of instructions will end.
 */
export interface CoretimeCall_assign_core {
    __kind: 'assign_core'
    core: number
    begin: number
    assignment: [CoreAssignment, PartsOf57600][]
    endHint?: (number | undefined)
}

export interface CoretimeCall_credit_account {
    __kind: 'credit_account'
    who: AccountId32
    amount: bigint
}

/**
 * Request the configuration to be updated with the specified number of cores. Warning:
 * Since this only schedules a configuration update, it takes two sessions to come into
 * effect.
 * 
 * - `origin`: Root or the Coretime Chain
 * - `count`: total number of cores
 */
export interface CoretimeCall_request_core_count {
    __kind: 'request_core_count'
    count: number
}

/**
 * Request to claim the instantaneous coretime sales revenue starting from the block it was
 * last claimed until and up to the block specified. The claimed amount value is sent back
 * to the Coretime chain in a `notify_revenue` message. At the same time, the amount is
 * teleported to the Coretime chain.
 */
export interface CoretimeCall_request_revenue_at {
    __kind: 'request_revenue_at'
    when: number
}

export type PartsOf57600 = number

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export const ConvictionVotingCall: sts.Type<ConvictionVotingCall> = sts.closedEnum(() => {
    return  {
        delegate: sts.enumStruct({
            class: sts.number(),
            to: MultiAddress,
            conviction: Conviction,
            balance: sts.bigint(),
        }),
        remove_other_vote: sts.enumStruct({
            target: MultiAddress,
            class: sts.number(),
            index: sts.number(),
        }),
        remove_vote: sts.enumStruct({
            class: sts.option(() => sts.number()),
            index: sts.number(),
        }),
        undelegate: sts.enumStruct({
            class: sts.number(),
        }),
        unlock: sts.enumStruct({
            class: sts.number(),
            target: MultiAddress,
        }),
        vote: sts.enumStruct({
            pollIndex: sts.number(),
            vote: AccountVote,
        }),
    }
})

export const AccountVote: sts.Type<AccountVote> = sts.closedEnum(() => {
    return  {
        Split: sts.enumStruct({
            aye: sts.bigint(),
            nay: sts.bigint(),
        }),
        SplitAbstain: sts.enumStruct({
            aye: sts.bigint(),
            nay: sts.bigint(),
            abstain: sts.bigint(),
        }),
        Standard: sts.enumStruct({
            vote: sts.number(),
            balance: sts.bigint(),
        }),
    }
})

export type AccountVote = AccountVote_Split | AccountVote_SplitAbstain | AccountVote_Standard

export interface AccountVote_Split {
    __kind: 'Split'
    aye: bigint
    nay: bigint
}

export interface AccountVote_SplitAbstain {
    __kind: 'SplitAbstain'
    aye: bigint
    nay: bigint
    abstain: bigint
}

export interface AccountVote_Standard {
    __kind: 'Standard'
    vote: number
    balance: bigint
}

export const Conviction: sts.Type<Conviction> = sts.closedEnum(() => {
    return  {
        Locked1x: sts.unit(),
        Locked2x: sts.unit(),
        Locked3x: sts.unit(),
        Locked4x: sts.unit(),
        Locked5x: sts.unit(),
        Locked6x: sts.unit(),
        None: sts.unit(),
    }
})

export type Conviction = Conviction_Locked1x | Conviction_Locked2x | Conviction_Locked3x | Conviction_Locked4x | Conviction_Locked5x | Conviction_Locked6x | Conviction_None

export interface Conviction_Locked1x {
    __kind: 'Locked1x'
}

export interface Conviction_Locked2x {
    __kind: 'Locked2x'
}

export interface Conviction_Locked3x {
    __kind: 'Locked3x'
}

export interface Conviction_Locked4x {
    __kind: 'Locked4x'
}

export interface Conviction_Locked5x {
    __kind: 'Locked5x'
}

export interface Conviction_Locked6x {
    __kind: 'Locked6x'
}

export interface Conviction_None {
    __kind: 'None'
}

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export type ConvictionVotingCall = ConvictionVotingCall_delegate | ConvictionVotingCall_remove_other_vote | ConvictionVotingCall_remove_vote | ConvictionVotingCall_undelegate | ConvictionVotingCall_unlock | ConvictionVotingCall_vote

/**
 * Delegate the voting power (with some given conviction) of the sending account for a
 * particular class of polls.
 * 
 * The balance delegated is locked for as long as it's delegated, and thereafter for the
 * time appropriate for the conviction's lock period.
 * 
 * The dispatch origin of this call must be _Signed_, and the signing account must either:
 *   - be delegating already; or
 *   - have no voting activity (if there is, then it will need to be removed through
 *     `remove_vote`).
 * 
 * - `to`: The account whose voting the `target` account's voting power will follow.
 * - `class`: The class of polls to delegate. To delegate multiple classes, multiple calls
 *   to this function are required.
 * - `conviction`: The conviction that will be attached to the delegated votes. When the
 *   account is undelegated, the funds will be locked for the corresponding period.
 * - `balance`: The amount of the account's balance to be used in delegating. This must not
 *   be more than the account's current balance.
 * 
 * Emits `Delegated`.
 * 
 * Weight: `O(R)` where R is the number of polls the voter delegating to has
 *   voted on. Weight is initially charged as if maximum votes, but is refunded later.
 */
export interface ConvictionVotingCall_delegate {
    __kind: 'delegate'
    class: number
    to: MultiAddress
    conviction: Conviction
    balance: bigint
}

/**
 * Remove a vote for a poll.
 * 
 * If the `target` is equal to the signer, then this function is exactly equivalent to
 * `remove_vote`. If not equal to the signer, then the vote must have expired,
 * either because the poll was cancelled, because the voter lost the poll or
 * because the conviction period is over.
 * 
 * The dispatch origin of this call must be _Signed_.
 * 
 * - `target`: The account of the vote to be removed; this account must have voted for poll
 *   `index`.
 * - `index`: The index of poll of the vote to be removed.
 * - `class`: The class of the poll.
 * 
 * Weight: `O(R + log R)` where R is the number of polls that `target` has voted on.
 *   Weight is calculated for the maximum number of vote.
 */
export interface ConvictionVotingCall_remove_other_vote {
    __kind: 'remove_other_vote'
    target: MultiAddress
    class: number
    index: number
}

/**
 * Remove a vote for a poll.
 * 
 * If:
 * - the poll was cancelled, or
 * - the poll is ongoing, or
 * - the poll has ended such that
 *   - the vote of the account was in opposition to the result; or
 *   - there was no conviction to the account's vote; or
 *   - the account made a split vote
 * ...then the vote is removed cleanly and a following call to `unlock` may result in more
 * funds being available.
 * 
 * If, however, the poll has ended and:
 * - it finished corresponding to the vote of the account, and
 * - the account made a standard vote with conviction, and
 * - the lock period of the conviction is not over
 * ...then the lock will be aggregated into the overall account's lock, which may involve
 * *overlocking* (where the two locks are combined into a single lock that is the maximum
 * of both the amount locked and the time is it locked for).
 * 
 * The dispatch origin of this call must be _Signed_, and the signer must have a vote
 * registered for poll `index`.
 * 
 * - `index`: The index of poll of the vote to be removed.
 * - `class`: Optional parameter, if given it indicates the class of the poll. For polls
 *   which have finished or are cancelled, this must be `Some`.
 * 
 * Weight: `O(R + log R)` where R is the number of polls that `target` has voted on.
 *   Weight is calculated for the maximum number of vote.
 */
export interface ConvictionVotingCall_remove_vote {
    __kind: 'remove_vote'
    class?: (number | undefined)
    index: number
}

/**
 * Undelegate the voting power of the sending account for a particular class of polls.
 * 
 * Tokens may be unlocked following once an amount of time consistent with the lock period
 * of the conviction with which the delegation was issued has passed.
 * 
 * The dispatch origin of this call must be _Signed_ and the signing account must be
 * currently delegating.
 * 
 * - `class`: The class of polls to remove the delegation from.
 * 
 * Emits `Undelegated`.
 * 
 * Weight: `O(R)` where R is the number of polls the voter delegating to has
 *   voted on. Weight is initially charged as if maximum votes, but is refunded later.
 */
export interface ConvictionVotingCall_undelegate {
    __kind: 'undelegate'
    class: number
}

/**
 * Remove the lock caused by prior voting/delegating which has expired within a particular
 * class.
 * 
 * The dispatch origin of this call must be _Signed_.
 * 
 * - `class`: The class of polls to unlock.
 * - `target`: The account to remove the lock on.
 * 
 * Weight: `O(R)` with R number of vote of target.
 */
export interface ConvictionVotingCall_unlock {
    __kind: 'unlock'
    class: number
    target: MultiAddress
}

/**
 * Vote in a poll. If `vote.is_aye()`, the vote is to enact the proposal;
 * otherwise it is a vote to keep the status quo.
 * 
 * The dispatch origin of this call must be _Signed_.
 * 
 * - `poll_index`: The index of the poll to vote for.
 * - `vote`: The vote configuration.
 * 
 * Weight: `O(R)` where R is the number of polls the voter has voted on.
 */
export interface ConvictionVotingCall_vote {
    __kind: 'vote'
    pollIndex: number
    vote: AccountVote
}

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export const ConfigurationCall: sts.Type<ConfigurationCall> = sts.closedEnum(() => {
    return  {
        set_approval_voting_params: sts.enumStruct({
            new: V8ApprovalVotingParams,
        }),
        set_async_backing_params: sts.enumStruct({
            new: V8AsyncBackingParams,
        }),
        set_bypass_consistency_check: sts.enumStruct({
            new: sts.boolean(),
        }),
        set_code_retention_period: sts.enumStruct({
            new: sts.number(),
        }),
        set_coretime_cores: sts.enumStruct({
            new: sts.number(),
        }),
        set_dispute_period: sts.enumStruct({
            new: sts.number(),
        }),
        set_dispute_post_conclusion_acceptance_period: sts.enumStruct({
            new: sts.number(),
        }),
        set_executor_params: sts.enumStruct({
            new: sts.array(() => V8ExecutorParam),
        }),
        set_group_rotation_frequency: sts.enumStruct({
            new: sts.number(),
        }),
        set_hrmp_channel_max_capacity: sts.enumStruct({
            new: sts.number(),
        }),
        set_hrmp_channel_max_message_size: sts.enumStruct({
            new: sts.number(),
        }),
        set_hrmp_channel_max_total_size: sts.enumStruct({
            new: sts.number(),
        }),
        set_hrmp_max_message_num_per_candidate: sts.enumStruct({
            new: sts.number(),
        }),
        set_hrmp_max_parachain_inbound_channels: sts.enumStruct({
            new: sts.number(),
        }),
        set_hrmp_max_parachain_outbound_channels: sts.enumStruct({
            new: sts.number(),
        }),
        set_hrmp_open_request_ttl: sts.enumStruct({
            new: sts.number(),
        }),
        set_hrmp_recipient_deposit: sts.enumStruct({
            new: sts.bigint(),
        }),
        set_hrmp_sender_deposit: sts.enumStruct({
            new: sts.bigint(),
        }),
        set_max_code_size: sts.enumStruct({
            new: sts.number(),
        }),
        set_max_downward_message_size: sts.enumStruct({
            new: sts.number(),
        }),
        set_max_head_data_size: sts.enumStruct({
            new: sts.number(),
        }),
        set_max_pov_size: sts.enumStruct({
            new: sts.number(),
        }),
        set_max_upward_message_num_per_candidate: sts.enumStruct({
            new: sts.number(),
        }),
        set_max_upward_message_size: sts.enumStruct({
            new: sts.number(),
        }),
        set_max_upward_queue_count: sts.enumStruct({
            new: sts.number(),
        }),
        set_max_upward_queue_size: sts.enumStruct({
            new: sts.number(),
        }),
        set_max_validators: sts.enumStruct({
            new: sts.option(() => sts.number()),
        }),
        set_max_validators_per_core: sts.enumStruct({
            new: sts.option(() => sts.number()),
        }),
        set_minimum_backing_votes: sts.enumStruct({
            new: sts.number(),
        }),
        set_minimum_validation_upgrade_delay: sts.enumStruct({
            new: sts.number(),
        }),
        set_n_delay_tranches: sts.enumStruct({
            new: sts.number(),
        }),
        set_needed_approvals: sts.enumStruct({
            new: sts.number(),
        }),
        set_no_show_slots: sts.enumStruct({
            new: sts.number(),
        }),
        set_node_feature: sts.enumStruct({
            index: sts.number(),
            value: sts.boolean(),
        }),
        set_on_demand_base_fee: sts.enumStruct({
            new: sts.bigint(),
        }),
        set_on_demand_fee_variability: sts.enumStruct({
            new: Perbill,
        }),
        set_on_demand_queue_max_size: sts.enumStruct({
            new: sts.number(),
        }),
        set_on_demand_target_queue_utilization: sts.enumStruct({
            new: Perbill,
        }),
        set_paras_availability_period: sts.enumStruct({
            new: sts.number(),
        }),
        set_pvf_voting_ttl: sts.enumStruct({
            new: sts.number(),
        }),
        set_relay_vrf_modulo_samples: sts.enumStruct({
            new: sts.number(),
        }),
        set_scheduler_params: sts.enumStruct({
            new: V8SchedulerParams,
        }),
        set_scheduling_lookahead: sts.enumStruct({
            new: sts.number(),
        }),
        set_validation_upgrade_cooldown: sts.enumStruct({
            new: sts.number(),
        }),
        set_validation_upgrade_delay: sts.enumStruct({
            new: sts.number(),
        }),
        set_zeroth_delay_tranche_width: sts.enumStruct({
            new: sts.number(),
        }),
    }
})

export const V8SchedulerParams: sts.Type<V8SchedulerParams> = sts.struct(() => {
    return  {
        groupRotationFrequency: sts.number(),
        parasAvailabilityPeriod: sts.number(),
        maxValidatorsPerCore: sts.option(() => sts.number()),
        lookahead: sts.number(),
        numCores: sts.number(),
        maxAvailabilityTimeouts: sts.number(),
        onDemandQueueMaxSize: sts.number(),
        onDemandTargetQueueUtilization: Perbill,
        onDemandFeeVariability: Perbill,
        onDemandBaseFee: sts.bigint(),
        ttl: sts.number(),
    }
})

export interface V8SchedulerParams {
    groupRotationFrequency: number
    parasAvailabilityPeriod: number
    maxValidatorsPerCore?: (number | undefined)
    lookahead: number
    numCores: number
    maxAvailabilityTimeouts: number
    onDemandQueueMaxSize: number
    onDemandTargetQueueUtilization: Perbill
    onDemandFeeVariability: Perbill
    onDemandBaseFee: bigint
    ttl: number
}

export const V8ExecutorParam: sts.Type<V8ExecutorParam> = sts.closedEnum(() => {
    return  {
        MaxMemoryPages: sts.number(),
        PrecheckingMaxMemory: sts.bigint(),
        PvfExecTimeout: sts.tuple(() => [V8PvfExecKind, sts.bigint()]),
        PvfPrepTimeout: sts.tuple(() => [V8PvfPrepKind, sts.bigint()]),
        StackLogicalMax: sts.number(),
        StackNativeMax: sts.number(),
        WasmExtBulkMemory: sts.unit(),
    }
})

export const V8PvfPrepKind: sts.Type<V8PvfPrepKind> = sts.closedEnum(() => {
    return  {
        Precheck: sts.unit(),
        Prepare: sts.unit(),
    }
})

export type V8PvfPrepKind = V8PvfPrepKind_Precheck | V8PvfPrepKind_Prepare

export interface V8PvfPrepKind_Precheck {
    __kind: 'Precheck'
}

export interface V8PvfPrepKind_Prepare {
    __kind: 'Prepare'
}

export const V8PvfExecKind: sts.Type<V8PvfExecKind> = sts.closedEnum(() => {
    return  {
        Approval: sts.unit(),
        Backing: sts.unit(),
    }
})

export type V8PvfExecKind = V8PvfExecKind_Approval | V8PvfExecKind_Backing

export interface V8PvfExecKind_Approval {
    __kind: 'Approval'
}

export interface V8PvfExecKind_Backing {
    __kind: 'Backing'
}

export type V8ExecutorParam = V8ExecutorParam_MaxMemoryPages | V8ExecutorParam_PrecheckingMaxMemory | V8ExecutorParam_PvfExecTimeout | V8ExecutorParam_PvfPrepTimeout | V8ExecutorParam_StackLogicalMax | V8ExecutorParam_StackNativeMax | V8ExecutorParam_WasmExtBulkMemory

export interface V8ExecutorParam_MaxMemoryPages {
    __kind: 'MaxMemoryPages'
    value: number
}

export interface V8ExecutorParam_PrecheckingMaxMemory {
    __kind: 'PrecheckingMaxMemory'
    value: bigint
}

export interface V8ExecutorParam_PvfExecTimeout {
    __kind: 'PvfExecTimeout'
    value: [V8PvfExecKind, bigint]
}

export interface V8ExecutorParam_PvfPrepTimeout {
    __kind: 'PvfPrepTimeout'
    value: [V8PvfPrepKind, bigint]
}

export interface V8ExecutorParam_StackLogicalMax {
    __kind: 'StackLogicalMax'
    value: number
}

export interface V8ExecutorParam_StackNativeMax {
    __kind: 'StackNativeMax'
    value: number
}

export interface V8ExecutorParam_WasmExtBulkMemory {
    __kind: 'WasmExtBulkMemory'
}

export const V8AsyncBackingParams: sts.Type<V8AsyncBackingParams> = sts.struct(() => {
    return  {
        maxCandidateDepth: sts.number(),
        allowedAncestryLen: sts.number(),
    }
})

export interface V8AsyncBackingParams {
    maxCandidateDepth: number
    allowedAncestryLen: number
}

export const V8ApprovalVotingParams: sts.Type<V8ApprovalVotingParams> = sts.struct(() => {
    return  {
        maxApprovalCoalesceCount: sts.number(),
    }
})

export interface V8ApprovalVotingParams {
    maxApprovalCoalesceCount: number
}

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export type ConfigurationCall = ConfigurationCall_set_approval_voting_params | ConfigurationCall_set_async_backing_params | ConfigurationCall_set_bypass_consistency_check | ConfigurationCall_set_code_retention_period | ConfigurationCall_set_coretime_cores | ConfigurationCall_set_dispute_period | ConfigurationCall_set_dispute_post_conclusion_acceptance_period | ConfigurationCall_set_executor_params | ConfigurationCall_set_group_rotation_frequency | ConfigurationCall_set_hrmp_channel_max_capacity | ConfigurationCall_set_hrmp_channel_max_message_size | ConfigurationCall_set_hrmp_channel_max_total_size | ConfigurationCall_set_hrmp_max_message_num_per_candidate | ConfigurationCall_set_hrmp_max_parachain_inbound_channels | ConfigurationCall_set_hrmp_max_parachain_outbound_channels | ConfigurationCall_set_hrmp_open_request_ttl | ConfigurationCall_set_hrmp_recipient_deposit | ConfigurationCall_set_hrmp_sender_deposit | ConfigurationCall_set_max_code_size | ConfigurationCall_set_max_downward_message_size | ConfigurationCall_set_max_head_data_size | ConfigurationCall_set_max_pov_size | ConfigurationCall_set_max_upward_message_num_per_candidate | ConfigurationCall_set_max_upward_message_size | ConfigurationCall_set_max_upward_queue_count | ConfigurationCall_set_max_upward_queue_size | ConfigurationCall_set_max_validators | ConfigurationCall_set_max_validators_per_core | ConfigurationCall_set_minimum_backing_votes | ConfigurationCall_set_minimum_validation_upgrade_delay | ConfigurationCall_set_n_delay_tranches | ConfigurationCall_set_needed_approvals | ConfigurationCall_set_no_show_slots | ConfigurationCall_set_node_feature | ConfigurationCall_set_on_demand_base_fee | ConfigurationCall_set_on_demand_fee_variability | ConfigurationCall_set_on_demand_queue_max_size | ConfigurationCall_set_on_demand_target_queue_utilization | ConfigurationCall_set_paras_availability_period | ConfigurationCall_set_pvf_voting_ttl | ConfigurationCall_set_relay_vrf_modulo_samples | ConfigurationCall_set_scheduler_params | ConfigurationCall_set_scheduling_lookahead | ConfigurationCall_set_validation_upgrade_cooldown | ConfigurationCall_set_validation_upgrade_delay | ConfigurationCall_set_zeroth_delay_tranche_width

/**
 * Set approval-voting-params.
 */
export interface ConfigurationCall_set_approval_voting_params {
    __kind: 'set_approval_voting_params'
    new: V8ApprovalVotingParams
}

/**
 * Set the asynchronous backing parameters.
 */
export interface ConfigurationCall_set_async_backing_params {
    __kind: 'set_async_backing_params'
    new: V8AsyncBackingParams
}

/**
 * Setting this to true will disable consistency checks for the configuration setters.
 * Use with caution.
 */
export interface ConfigurationCall_set_bypass_consistency_check {
    __kind: 'set_bypass_consistency_check'
    new: boolean
}

/**
 * Set the acceptance period for an included candidate.
 */
export interface ConfigurationCall_set_code_retention_period {
    __kind: 'set_code_retention_period'
    new: number
}

/**
 * Set the number of coretime execution cores.
 * 
 * NOTE: that this configuration is managed by the coretime chain. Only manually change
 * this, if you really know what you are doing!
 */
export interface ConfigurationCall_set_coretime_cores {
    __kind: 'set_coretime_cores'
    new: number
}

/**
 * Set the dispute period, in number of sessions to keep for disputes.
 */
export interface ConfigurationCall_set_dispute_period {
    __kind: 'set_dispute_period'
    new: number
}

/**
 * Set the dispute post conclusion acceptance period.
 */
export interface ConfigurationCall_set_dispute_post_conclusion_acceptance_period {
    __kind: 'set_dispute_post_conclusion_acceptance_period'
    new: number
}

/**
 * Set PVF executor parameters.
 */
export interface ConfigurationCall_set_executor_params {
    __kind: 'set_executor_params'
    new: V8ExecutorParam[]
}

/**
 * Set the parachain validator-group rotation frequency
 */
export interface ConfigurationCall_set_group_rotation_frequency {
    __kind: 'set_group_rotation_frequency'
    new: number
}

/**
 * Sets the maximum number of messages allowed in an HRMP channel at once.
 */
export interface ConfigurationCall_set_hrmp_channel_max_capacity {
    __kind: 'set_hrmp_channel_max_capacity'
    new: number
}

/**
 * Sets the maximum size of a message that could ever be put into an HRMP channel.
 */
export interface ConfigurationCall_set_hrmp_channel_max_message_size {
    __kind: 'set_hrmp_channel_max_message_size'
    new: number
}

/**
 * Sets the maximum total size of messages in bytes allowed in an HRMP channel at once.
 */
export interface ConfigurationCall_set_hrmp_channel_max_total_size {
    __kind: 'set_hrmp_channel_max_total_size'
    new: number
}

/**
 * Sets the maximum number of outbound HRMP messages can be sent by a candidate.
 */
export interface ConfigurationCall_set_hrmp_max_message_num_per_candidate {
    __kind: 'set_hrmp_max_message_num_per_candidate'
    new: number
}

/**
 * Sets the maximum number of inbound HRMP channels a parachain is allowed to accept.
 */
export interface ConfigurationCall_set_hrmp_max_parachain_inbound_channels {
    __kind: 'set_hrmp_max_parachain_inbound_channels'
    new: number
}

/**
 * Sets the maximum number of outbound HRMP channels a parachain is allowed to open.
 */
export interface ConfigurationCall_set_hrmp_max_parachain_outbound_channels {
    __kind: 'set_hrmp_max_parachain_outbound_channels'
    new: number
}

/**
 * Sets the number of sessions after which an HRMP open channel request expires.
 */
export interface ConfigurationCall_set_hrmp_open_request_ttl {
    __kind: 'set_hrmp_open_request_ttl'
    new: number
}

/**
 * Sets the amount of funds that the recipient should provide for accepting opening an HRMP
 * channel.
 */
export interface ConfigurationCall_set_hrmp_recipient_deposit {
    __kind: 'set_hrmp_recipient_deposit'
    new: bigint
}

/**
 * Sets the amount of funds that the sender should provide for opening an HRMP channel.
 */
export interface ConfigurationCall_set_hrmp_sender_deposit {
    __kind: 'set_hrmp_sender_deposit'
    new: bigint
}

/**
 * Set the max validation code size for incoming upgrades.
 */
export interface ConfigurationCall_set_max_code_size {
    __kind: 'set_max_code_size'
    new: number
}

/**
 * Set the critical downward message size.
 */
export interface ConfigurationCall_set_max_downward_message_size {
    __kind: 'set_max_downward_message_size'
    new: number
}

/**
 * Set the max head data size for paras.
 */
export interface ConfigurationCall_set_max_head_data_size {
    __kind: 'set_max_head_data_size'
    new: number
}

/**
 * Set the max POV block size for incoming upgrades.
 */
export interface ConfigurationCall_set_max_pov_size {
    __kind: 'set_max_pov_size'
    new: number
}

/**
 * Sets the maximum number of messages that a candidate can contain.
 */
export interface ConfigurationCall_set_max_upward_message_num_per_candidate {
    __kind: 'set_max_upward_message_num_per_candidate'
    new: number
}

/**
 * Sets the maximum size of an upward message that can be sent by a candidate.
 */
export interface ConfigurationCall_set_max_upward_message_size {
    __kind: 'set_max_upward_message_size'
    new: number
}

/**
 * Sets the maximum items that can present in a upward dispatch queue at once.
 */
export interface ConfigurationCall_set_max_upward_queue_count {
    __kind: 'set_max_upward_queue_count'
    new: number
}

/**
 * Sets the maximum total size of items that can present in a upward dispatch queue at
 * once.
 */
export interface ConfigurationCall_set_max_upward_queue_size {
    __kind: 'set_max_upward_queue_size'
    new: number
}

/**
 * Set the maximum number of validators to use in parachain consensus.
 */
export interface ConfigurationCall_set_max_validators {
    __kind: 'set_max_validators'
    new?: (number | undefined)
}

/**
 * Set the maximum number of validators to assign to any core.
 */
export interface ConfigurationCall_set_max_validators_per_core {
    __kind: 'set_max_validators_per_core'
    new?: (number | undefined)
}

/**
 * Set the minimum backing votes threshold.
 */
export interface ConfigurationCall_set_minimum_backing_votes {
    __kind: 'set_minimum_backing_votes'
    new: number
}

/**
 * Sets the minimum delay between announcing the upgrade block for a parachain until the
 * upgrade taking place.
 * 
 * See the field documentation for information and constraints for the new value.
 */
export interface ConfigurationCall_set_minimum_validation_upgrade_delay {
    __kind: 'set_minimum_validation_upgrade_delay'
    new: number
}

/**
 * Set the total number of delay tranches.
 */
export interface ConfigurationCall_set_n_delay_tranches {
    __kind: 'set_n_delay_tranches'
    new: number
}

/**
 * Set the number of validators needed to approve a block.
 */
export interface ConfigurationCall_set_needed_approvals {
    __kind: 'set_needed_approvals'
    new: number
}

/**
 * Set the no show slots, in number of number of consensus slots.
 * Must be at least 1.
 */
export interface ConfigurationCall_set_no_show_slots {
    __kind: 'set_no_show_slots'
    new: number
}

/**
 * Set/Unset a node feature.
 */
export interface ConfigurationCall_set_node_feature {
    __kind: 'set_node_feature'
    index: number
    value: boolean
}

/**
 * Set the on demand (parathreads) base fee.
 */
export interface ConfigurationCall_set_on_demand_base_fee {
    __kind: 'set_on_demand_base_fee'
    new: bigint
}

/**
 * Set the on demand (parathreads) fee variability.
 */
export interface ConfigurationCall_set_on_demand_fee_variability {
    __kind: 'set_on_demand_fee_variability'
    new: Perbill
}

/**
 * Set the on demand (parathreads) queue max size.
 */
export interface ConfigurationCall_set_on_demand_queue_max_size {
    __kind: 'set_on_demand_queue_max_size'
    new: number
}

/**
 * Set the on demand (parathreads) fee variability.
 */
export interface ConfigurationCall_set_on_demand_target_queue_utilization {
    __kind: 'set_on_demand_target_queue_utilization'
    new: Perbill
}

/**
 * Set the availability period for paras.
 */
export interface ConfigurationCall_set_paras_availability_period {
    __kind: 'set_paras_availability_period'
    new: number
}

/**
 * Set the number of session changes after which a PVF pre-checking voting is rejected.
 */
export interface ConfigurationCall_set_pvf_voting_ttl {
    __kind: 'set_pvf_voting_ttl'
    new: number
}

/**
 * Set the number of samples to do of the `RelayVRFModulo` approval assignment criterion.
 */
export interface ConfigurationCall_set_relay_vrf_modulo_samples {
    __kind: 'set_relay_vrf_modulo_samples'
    new: number
}

/**
 * Set scheduler-params.
 */
export interface ConfigurationCall_set_scheduler_params {
    __kind: 'set_scheduler_params'
    new: V8SchedulerParams
}

/**
 * Set the scheduling lookahead, in expected number of blocks at peak throughput.
 */
export interface ConfigurationCall_set_scheduling_lookahead {
    __kind: 'set_scheduling_lookahead'
    new: number
}

/**
 * Set the validation upgrade cooldown.
 */
export interface ConfigurationCall_set_validation_upgrade_cooldown {
    __kind: 'set_validation_upgrade_cooldown'
    new: number
}

/**
 * Set the validation upgrade delay.
 */
export interface ConfigurationCall_set_validation_upgrade_delay {
    __kind: 'set_validation_upgrade_delay'
    new: number
}

/**
 * Set the zeroth delay tranche width.
 */
export interface ConfigurationCall_set_zeroth_delay_tranche_width {
    __kind: 'set_zeroth_delay_tranche_width'
    new: number
}

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export const ClaimsCall: sts.Type<ClaimsCall> = sts.closedEnum(() => {
    return  {
        attest: sts.enumStruct({
            statement: sts.bytes(),
        }),
        claim: sts.enumStruct({
            dest: AccountId32,
            ethereumSignature: EcdsaSignature,
        }),
        claim_attest: sts.enumStruct({
            dest: AccountId32,
            ethereumSignature: EcdsaSignature,
            statement: sts.bytes(),
        }),
        mint_claim: sts.enumStruct({
            who: EthereumAddress,
            value: sts.bigint(),
            vestingSchedule: sts.option(() => sts.tuple(() => [sts.bigint(), sts.bigint(), sts.number()])),
            statement: sts.option(() => StatementKind),
        }),
        move_claim: sts.enumStruct({
            old: EthereumAddress,
            new: EthereumAddress,
            maybePreclaim: sts.option(() => AccountId32),
        }),
    }
})

export const StatementKind: sts.Type<StatementKind> = sts.closedEnum(() => {
    return  {
        Regular: sts.unit(),
        Saft: sts.unit(),
    }
})

export type StatementKind = StatementKind_Regular | StatementKind_Saft

export interface StatementKind_Regular {
    __kind: 'Regular'
}

export interface StatementKind_Saft {
    __kind: 'Saft'
}

export const EthereumAddress = sts.bytes()

export const EcdsaSignature = sts.bytes()

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export type ClaimsCall = ClaimsCall_attest | ClaimsCall_claim | ClaimsCall_claim_attest | ClaimsCall_mint_claim | ClaimsCall_move_claim

/**
 * Attest to a statement, needed to finalize the claims process.
 * 
 * WARNING: Insecure unless your chain includes `PrevalidateAttests` as a
 * `TransactionExtension`.
 * 
 * Unsigned Validation:
 * A call to attest is deemed valid if the sender has a `Preclaim` registered
 * and provides a `statement` which is expected for the account.
 * 
 * Parameters:
 * - `statement`: The identity of the statement which is being attested to in the
 *   signature.
 * 
 * <weight>
 * The weight of this call is invariant over the input parameters.
 * Weight includes logic to do pre-validation on `attest` call.
 * 
 * Total Complexity: O(1)
 * </weight>
 */
export interface ClaimsCall_attest {
    __kind: 'attest'
    statement: Bytes
}

/**
 * Make a claim to collect your DOTs.
 * 
 * The dispatch origin for this call must be _None_.
 * 
 * Unsigned Validation:
 * A call to claim is deemed valid if the signature provided matches
 * the expected signed message of:
 * 
 * > Ethereum Signed Message:
 * > (configured prefix string)(address)
 * 
 * and `address` matches the `dest` account.
 * 
 * Parameters:
 * - `dest`: The destination account to payout the claim.
 * - `ethereum_signature`: The signature of an ethereum signed message matching the format
 *   described above.
 * 
 * <weight>
 * The weight of this call is invariant over the input parameters.
 * Weight includes logic to validate unsigned `claim` call.
 * 
 * Total Complexity: O(1)
 * </weight>
 */
export interface ClaimsCall_claim {
    __kind: 'claim'
    dest: AccountId32
    ethereumSignature: EcdsaSignature
}

/**
 * Make a claim to collect your DOTs by signing a statement.
 * 
 * The dispatch origin for this call must be _None_.
 * 
 * Unsigned Validation:
 * A call to `claim_attest` is deemed valid if the signature provided matches
 * the expected signed message of:
 * 
 * > Ethereum Signed Message:
 * > (configured prefix string)(address)(statement)
 * 
 * and `address` matches the `dest` account; the `statement` must match that which is
 * expected according to your purchase arrangement.
 * 
 * Parameters:
 * - `dest`: The destination account to payout the claim.
 * - `ethereum_signature`: The signature of an ethereum signed message matching the format
 *   described above.
 * - `statement`: The identity of the statement which is being attested to in the
 *   signature.
 * 
 * <weight>
 * The weight of this call is invariant over the input parameters.
 * Weight includes logic to validate unsigned `claim_attest` call.
 * 
 * Total Complexity: O(1)
 * </weight>
 */
export interface ClaimsCall_claim_attest {
    __kind: 'claim_attest'
    dest: AccountId32
    ethereumSignature: EcdsaSignature
    statement: Bytes
}

/**
 * Mint a new claim to collect DOTs.
 * 
 * The dispatch origin for this call must be _Root_.
 * 
 * Parameters:
 * - `who`: The Ethereum address allowed to collect this claim.
 * - `value`: The number of DOTs that will be claimed.
 * - `vesting_schedule`: An optional vesting schedule for these DOTs.
 * 
 * <weight>
 * The weight of this call is invariant over the input parameters.
 * We assume worst case that both vesting and statement is being inserted.
 * 
 * Total Complexity: O(1)
 * </weight>
 */
export interface ClaimsCall_mint_claim {
    __kind: 'mint_claim'
    who: EthereumAddress
    value: bigint
    vestingSchedule?: ([bigint, bigint, number] | undefined)
    statement?: (StatementKind | undefined)
}

export interface ClaimsCall_move_claim {
    __kind: 'move_claim'
    old: EthereumAddress
    new: EthereumAddress
    maybePreclaim?: (AccountId32 | undefined)
}

export type EthereumAddress = Bytes

export type EcdsaSignature = Bytes

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export const ChildBountiesCall: sts.Type<ChildBountiesCall> = sts.closedEnum(() => {
    return  {
        accept_curator: sts.enumStruct({
            parentBountyId: sts.number(),
            childBountyId: sts.number(),
        }),
        add_child_bounty: sts.enumStruct({
            parentBountyId: sts.number(),
            value: sts.bigint(),
            description: sts.bytes(),
        }),
        award_child_bounty: sts.enumStruct({
            parentBountyId: sts.number(),
            childBountyId: sts.number(),
            beneficiary: MultiAddress,
        }),
        claim_child_bounty: sts.enumStruct({
            parentBountyId: sts.number(),
            childBountyId: sts.number(),
        }),
        close_child_bounty: sts.enumStruct({
            parentBountyId: sts.number(),
            childBountyId: sts.number(),
        }),
        propose_curator: sts.enumStruct({
            parentBountyId: sts.number(),
            childBountyId: sts.number(),
            curator: MultiAddress,
            fee: sts.bigint(),
        }),
        unassign_curator: sts.enumStruct({
            parentBountyId: sts.number(),
            childBountyId: sts.number(),
        }),
    }
})

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export type ChildBountiesCall = ChildBountiesCall_accept_curator | ChildBountiesCall_add_child_bounty | ChildBountiesCall_award_child_bounty | ChildBountiesCall_claim_child_bounty | ChildBountiesCall_close_child_bounty | ChildBountiesCall_propose_curator | ChildBountiesCall_unassign_curator

/**
 * Accept the curator role for the child-bounty.
 * 
 * The dispatch origin for this call must be the curator of this
 * child-bounty.
 * 
 * A deposit will be reserved from the curator and refund upon
 * successful payout or cancellation.
 * 
 * Fee for curator is deducted from curator fee of parent bounty.
 * 
 * Parent bounty must be in active state, for this child-bounty call to
 * work.
 * 
 * Child-bounty must be in "CuratorProposed" state, for processing the
 * call. And state of child-bounty is moved to "Active" on successful
 * call completion.
 * 
 * - `parent_bounty_id`: Index of parent bounty.
 * - `child_bounty_id`: Index of child bounty.
 */
export interface ChildBountiesCall_accept_curator {
    __kind: 'accept_curator'
    parentBountyId: number
    childBountyId: number
}

/**
 * Add a new child-bounty.
 * 
 * The dispatch origin for this call must be the curator of parent
 * bounty and the parent bounty must be in "active" state.
 * 
 * Child-bounty gets added successfully & fund gets transferred from
 * parent bounty to child-bounty account, if parent bounty has enough
 * funds, else the call fails.
 * 
 * Upper bound to maximum number of active  child bounties that can be
 * added are managed via runtime trait config
 * [`Config::MaxActiveChildBountyCount`].
 * 
 * If the call is success, the status of child-bounty is updated to
 * "Added".
 * 
 * - `parent_bounty_id`: Index of parent bounty for which child-bounty is being added.
 * - `value`: Value for executing the proposal.
 * - `description`: Text description for the child-bounty.
 */
export interface ChildBountiesCall_add_child_bounty {
    __kind: 'add_child_bounty'
    parentBountyId: number
    value: bigint
    description: Bytes
}

/**
 * Award child-bounty to a beneficiary.
 * 
 * The beneficiary will be able to claim the funds after a delay.
 * 
 * The dispatch origin for this call must be the parent curator or
 * curator of this child-bounty.
 * 
 * Parent bounty must be in active state, for this child-bounty call to
 * work.
 * 
 * Child-bounty must be in active state, for processing the call. And
 * state of child-bounty is moved to "PendingPayout" on successful call
 * completion.
 * 
 * - `parent_bounty_id`: Index of parent bounty.
 * - `child_bounty_id`: Index of child bounty.
 * - `beneficiary`: Beneficiary account.
 */
export interface ChildBountiesCall_award_child_bounty {
    __kind: 'award_child_bounty'
    parentBountyId: number
    childBountyId: number
    beneficiary: MultiAddress
}

/**
 * Claim the payout from an awarded child-bounty after payout delay.
 * 
 * The dispatch origin for this call may be any signed origin.
 * 
 * Call works independent of parent bounty state, No need for parent
 * bounty to be in active state.
 * 
 * The Beneficiary is paid out with agreed bounty value. Curator fee is
 * paid & curator deposit is unreserved.
 * 
 * Child-bounty must be in "PendingPayout" state, for processing the
 * call. And instance of child-bounty is removed from the state on
 * successful call completion.
 * 
 * - `parent_bounty_id`: Index of parent bounty.
 * - `child_bounty_id`: Index of child bounty.
 */
export interface ChildBountiesCall_claim_child_bounty {
    __kind: 'claim_child_bounty'
    parentBountyId: number
    childBountyId: number
}

/**
 * Cancel a proposed or active child-bounty. Child-bounty account funds
 * are transferred to parent bounty account. The child-bounty curator
 * deposit may be unreserved if possible.
 * 
 * The dispatch origin for this call must be either parent curator or
 * `T::RejectOrigin`.
 * 
 * If the state of child-bounty is `Active`, curator deposit is
 * unreserved.
 * 
 * If the state of child-bounty is `PendingPayout`, call fails &
 * returns `PendingPayout` error.
 * 
 * For the origin other than T::RejectOrigin, parent bounty must be in
 * active state, for this child-bounty call to work. For origin
 * T::RejectOrigin execution is forced.
 * 
 * Instance of child-bounty is removed from the state on successful
 * call completion.
 * 
 * - `parent_bounty_id`: Index of parent bounty.
 * - `child_bounty_id`: Index of child bounty.
 */
export interface ChildBountiesCall_close_child_bounty {
    __kind: 'close_child_bounty'
    parentBountyId: number
    childBountyId: number
}

/**
 * Propose curator for funded child-bounty.
 * 
 * The dispatch origin for this call must be curator of parent bounty.
 * 
 * Parent bounty must be in active state, for this child-bounty call to
 * work.
 * 
 * Child-bounty must be in "Added" state, for processing the call. And
 * state of child-bounty is moved to "CuratorProposed" on successful
 * call completion.
 * 
 * - `parent_bounty_id`: Index of parent bounty.
 * - `child_bounty_id`: Index of child bounty.
 * - `curator`: Address of child-bounty curator.
 * - `fee`: payment fee to child-bounty curator for execution.
 */
export interface ChildBountiesCall_propose_curator {
    __kind: 'propose_curator'
    parentBountyId: number
    childBountyId: number
    curator: MultiAddress
    fee: bigint
}

/**
 * Unassign curator from a child-bounty.
 * 
 * The dispatch origin for this call can be either `RejectOrigin`, or
 * the curator of the parent bounty, or any signed origin.
 * 
 * For the origin other than T::RejectOrigin and the child-bounty
 * curator, parent bounty must be in active state, for this call to
 * work. We allow child-bounty curator and T::RejectOrigin to execute
 * this call irrespective of the parent bounty state.
 * 
 * If this function is called by the `RejectOrigin` or the
 * parent bounty curator, we assume that the child-bounty curator is
 * malicious or inactive. As a result, child-bounty curator deposit is
 * slashed.
 * 
 * If the origin is the child-bounty curator, we take this as a sign
 * that they are unable to do their job, and are willingly giving up.
 * We could slash the deposit, but for now we allow them to unreserve
 * their deposit and exit without issue. (We may want to change this if
 * it is abused.)
 * 
 * Finally, the origin can be anyone iff the child-bounty curator is
 * "inactive". Expiry update due of parent bounty is used to estimate
 * inactive state of child-bounty curator.
 * 
 * This allows anyone in the community to call out that a child-bounty
 * curator is not doing their due diligence, and we should pick a new
 * one. In this case the child-bounty curator deposit is slashed.
 * 
 * State of child-bounty is moved to Added state on successful call
 * completion.
 * 
 * - `parent_bounty_id`: Index of parent bounty.
 * - `child_bounty_id`: Index of child bounty.
 */
export interface ChildBountiesCall_unassign_curator {
    __kind: 'unassign_curator'
    parentBountyId: number
    childBountyId: number
}

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export const BountiesCall: sts.Type<BountiesCall> = sts.closedEnum(() => {
    return  {
        accept_curator: sts.enumStruct({
            bountyId: sts.number(),
        }),
        approve_bounty: sts.enumStruct({
            bountyId: sts.number(),
        }),
        approve_bounty_with_curator: sts.enumStruct({
            bountyId: sts.number(),
            curator: MultiAddress,
            fee: sts.bigint(),
        }),
        award_bounty: sts.enumStruct({
            bountyId: sts.number(),
            beneficiary: MultiAddress,
        }),
        claim_bounty: sts.enumStruct({
            bountyId: sts.number(),
        }),
        close_bounty: sts.enumStruct({
            bountyId: sts.number(),
        }),
        extend_bounty_expiry: sts.enumStruct({
            bountyId: sts.number(),
            remark: sts.bytes(),
        }),
        propose_bounty: sts.enumStruct({
            value: sts.bigint(),
            description: sts.bytes(),
        }),
        propose_curator: sts.enumStruct({
            bountyId: sts.number(),
            curator: MultiAddress,
            fee: sts.bigint(),
        }),
        unassign_curator: sts.enumStruct({
            bountyId: sts.number(),
        }),
    }
})

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export type BountiesCall = BountiesCall_accept_curator | BountiesCall_approve_bounty | BountiesCall_approve_bounty_with_curator | BountiesCall_award_bounty | BountiesCall_claim_bounty | BountiesCall_close_bounty | BountiesCall_extend_bounty_expiry | BountiesCall_propose_bounty | BountiesCall_propose_curator | BountiesCall_unassign_curator

/**
 * Accept the curator role for a bounty.
 * A deposit will be reserved from curator and refund upon successful payout.
 * 
 * May only be called from the curator.
 * 
 * ## Complexity
 * - O(1).
 */
export interface BountiesCall_accept_curator {
    __kind: 'accept_curator'
    bountyId: number
}

/**
 * Approve a bounty proposal. At a later time, the bounty will be funded and become active
 * and the original deposit will be returned.
 * 
 * May only be called from `T::SpendOrigin`.
 * 
 * ## Complexity
 * - O(1).
 */
export interface BountiesCall_approve_bounty {
    __kind: 'approve_bounty'
    bountyId: number
}

/**
 * Approve bountry and propose a curator simultaneously.
 * This call is a shortcut to calling `approve_bounty` and `propose_curator` separately.
 * 
 * May only be called from `T::SpendOrigin`.
 * 
 * - `bounty_id`: Bounty ID to approve.
 * - `curator`: The curator account whom will manage this bounty.
 * - `fee`: The curator fee.
 * 
 * ## Complexity
 * - O(1).
 */
export interface BountiesCall_approve_bounty_with_curator {
    __kind: 'approve_bounty_with_curator'
    bountyId: number
    curator: MultiAddress
    fee: bigint
}

/**
 * Award bounty to a beneficiary account. The beneficiary will be able to claim the funds
 * after a delay.
 * 
 * The dispatch origin for this call must be the curator of this bounty.
 * 
 * - `bounty_id`: Bounty ID to award.
 * - `beneficiary`: The beneficiary account whom will receive the payout.
 * 
 * ## Complexity
 * - O(1).
 */
export interface BountiesCall_award_bounty {
    __kind: 'award_bounty'
    bountyId: number
    beneficiary: MultiAddress
}

/**
 * Claim the payout from an awarded bounty after payout delay.
 * 
 * The dispatch origin for this call must be the beneficiary of this bounty.
 * 
 * - `bounty_id`: Bounty ID to claim.
 * 
 * ## Complexity
 * - O(1).
 */
export interface BountiesCall_claim_bounty {
    __kind: 'claim_bounty'
    bountyId: number
}

/**
 * Cancel a proposed or active bounty. All the funds will be sent to treasury and
 * the curator deposit will be unreserved if possible.
 * 
 * Only `T::RejectOrigin` is able to cancel a bounty.
 * 
 * - `bounty_id`: Bounty ID to cancel.
 * 
 * ## Complexity
 * - O(1).
 */
export interface BountiesCall_close_bounty {
    __kind: 'close_bounty'
    bountyId: number
}

/**
 * Extend the expiry time of an active bounty.
 * 
 * The dispatch origin for this call must be the curator of this bounty.
 * 
 * - `bounty_id`: Bounty ID to extend.
 * - `remark`: additional information.
 * 
 * ## Complexity
 * - O(1).
 */
export interface BountiesCall_extend_bounty_expiry {
    __kind: 'extend_bounty_expiry'
    bountyId: number
    remark: Bytes
}

/**
 * Propose a new bounty.
 * 
 * The dispatch origin for this call must be _Signed_.
 * 
 * Payment: `TipReportDepositBase` will be reserved from the origin account, as well as
 * `DataDepositPerByte` for each byte in `reason`. It will be unreserved upon approval,
 * or slashed when rejected.
 * 
 * - `curator`: The curator account whom will manage this bounty.
 * - `fee`: The curator fee.
 * - `value`: The total payment amount of this bounty, curator fee included.
 * - `description`: The description of this bounty.
 */
export interface BountiesCall_propose_bounty {
    __kind: 'propose_bounty'
    value: bigint
    description: Bytes
}

/**
 * Propose a curator to a funded bounty.
 * 
 * May only be called from `T::SpendOrigin`.
 * 
 * ## Complexity
 * - O(1).
 */
export interface BountiesCall_propose_curator {
    __kind: 'propose_curator'
    bountyId: number
    curator: MultiAddress
    fee: bigint
}

/**
 * Unassign curator from a bounty.
 * 
 * This function can only be called by the `RejectOrigin` a signed origin.
 * 
 * If this function is called by the `RejectOrigin`, we assume that the curator is
 * malicious or inactive. As a result, we will slash the curator when possible.
 * 
 * If the origin is the curator, we take this as a sign they are unable to do their job and
 * they willingly give up. We could slash them, but for now we allow them to recover their
 * deposit and exit without issue. (We may want to change this if it is abused.)
 * 
 * Finally, the origin can be anyone if and only if the curator is "inactive". This allows
 * anyone in the community to call out that a curator is not doing their due diligence, and
 * we should pick a new curator. In this case the curator should also be slashed.
 * 
 * ## Complexity
 * - O(1).
 */
export interface BountiesCall_unassign_curator {
    __kind: 'unassign_curator'
    bountyId: number
}

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export const BeefyCall: sts.Type<BeefyCall> = sts.closedEnum(() => {
    return  {
        report_double_voting: sts.enumStruct({
            equivocationProof: DoubleVotingProof,
            keyOwnerProof: MembershipProof,
        }),
        report_double_voting_unsigned: sts.enumStruct({
            equivocationProof: DoubleVotingProof,
            keyOwnerProof: MembershipProof,
        }),
        report_fork_voting: sts.enumStruct({
            equivocationProof: ForkVotingProof,
            keyOwnerProof: MembershipProof,
        }),
        report_fork_voting_unsigned: sts.enumStruct({
            equivocationProof: ForkVotingProof,
            keyOwnerProof: MembershipProof,
        }),
        report_future_block_voting: sts.enumStruct({
            equivocationProof: FutureBlockVotingProof,
            keyOwnerProof: MembershipProof,
        }),
        report_future_block_voting_unsigned: sts.enumStruct({
            equivocationProof: FutureBlockVotingProof,
            keyOwnerProof: MembershipProof,
        }),
        set_new_genesis: sts.enumStruct({
            delayInBlocks: sts.number(),
        }),
    }
})

export const FutureBlockVotingProof: sts.Type<FutureBlockVotingProof> = sts.struct(() => {
    return  {
        vote: VoteMessage,
    }
})

export const VoteMessage: sts.Type<VoteMessage> = sts.struct(() => {
    return  {
        commitment: Commitment,
        id: sts.bytes(),
        signature: sts.bytes(),
    }
})

export const Commitment: sts.Type<Commitment> = sts.struct(() => {
    return  {
        payload: sts.array(() => sts.tuple(() => [sts.bytes(), sts.bytes()])),
        blockNumber: sts.number(),
        validatorSetId: sts.bigint(),
    }
})

export interface Commitment {
    payload: [Bytes, Bytes][]
    blockNumber: number
    validatorSetId: bigint
}

export interface VoteMessage {
    commitment: Commitment
    id: Bytes
    signature: Bytes
}

export interface FutureBlockVotingProof {
    vote: VoteMessage
}

export const ForkVotingProof: sts.Type<ForkVotingProof> = sts.struct(() => {
    return  {
        vote: VoteMessage,
        ancestryProof: AncestryProof,
        header: Header,
    }
})

export const AncestryProof: sts.Type<AncestryProof> = sts.struct(() => {
    return  {
        prevPeaks: sts.array(() => H256),
        prevLeafCount: sts.bigint(),
        leafCount: sts.bigint(),
        items: sts.array(() => sts.tuple(() => [sts.bigint(), H256])),
    }
})

export interface AncestryProof {
    prevPeaks: H256[]
    prevLeafCount: bigint
    leafCount: bigint
    items: [bigint, H256][]
}

export interface ForkVotingProof {
    vote: VoteMessage
    ancestryProof: AncestryProof
    header: Header
}

export const DoubleVotingProof: sts.Type<DoubleVotingProof> = sts.struct(() => {
    return  {
        first: VoteMessage,
        second: VoteMessage,
    }
})

export interface DoubleVotingProof {
    first: VoteMessage
    second: VoteMessage
}

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export type BeefyCall = BeefyCall_report_double_voting | BeefyCall_report_double_voting_unsigned | BeefyCall_report_fork_voting | BeefyCall_report_fork_voting_unsigned | BeefyCall_report_future_block_voting | BeefyCall_report_future_block_voting_unsigned | BeefyCall_set_new_genesis

/**
 * Report voter equivocation/misbehavior. This method will verify the
 * equivocation proof and validate the given key ownership proof
 * against the extracted offender. If both are valid, the offence
 * will be reported.
 */
export interface BeefyCall_report_double_voting {
    __kind: 'report_double_voting'
    equivocationProof: DoubleVotingProof
    keyOwnerProof: MembershipProof
}

/**
 * Report voter equivocation/misbehavior. This method will verify the
 * equivocation proof and validate the given key ownership proof
 * against the extracted offender. If both are valid, the offence
 * will be reported.
 * 
 * This extrinsic must be called unsigned and it is expected that only
 * block authors will call it (validated in `ValidateUnsigned`), as such
 * if the block author is defined it will be defined as the equivocation
 * reporter.
 */
export interface BeefyCall_report_double_voting_unsigned {
    __kind: 'report_double_voting_unsigned'
    equivocationProof: DoubleVotingProof
    keyOwnerProof: MembershipProof
}

/**
 * Report fork voting equivocation. This method will verify the equivocation proof
 * and validate the given key ownership proof against the extracted offender.
 * If both are valid, the offence will be reported.
 */
export interface BeefyCall_report_fork_voting {
    __kind: 'report_fork_voting'
    equivocationProof: ForkVotingProof
    keyOwnerProof: MembershipProof
}

/**
 * Report fork voting equivocation. This method will verify the equivocation proof
 * and validate the given key ownership proof against the extracted offender.
 * If both are valid, the offence will be reported.
 * 
 * This extrinsic must be called unsigned and it is expected that only
 * block authors will call it (validated in `ValidateUnsigned`), as such
 * if the block author is defined it will be defined as the equivocation
 * reporter.
 */
export interface BeefyCall_report_fork_voting_unsigned {
    __kind: 'report_fork_voting_unsigned'
    equivocationProof: ForkVotingProof
    keyOwnerProof: MembershipProof
}

/**
 * Report future block voting equivocation. This method will verify the equivocation proof
 * and validate the given key ownership proof against the extracted offender.
 * If both are valid, the offence will be reported.
 */
export interface BeefyCall_report_future_block_voting {
    __kind: 'report_future_block_voting'
    equivocationProof: FutureBlockVotingProof
    keyOwnerProof: MembershipProof
}

/**
 * Report future block voting equivocation. This method will verify the equivocation proof
 * and validate the given key ownership proof against the extracted offender.
 * If both are valid, the offence will be reported.
 * 
 * This extrinsic must be called unsigned and it is expected that only
 * block authors will call it (validated in `ValidateUnsigned`), as such
 * if the block author is defined it will be defined as the equivocation
 * reporter.
 */
export interface BeefyCall_report_future_block_voting_unsigned {
    __kind: 'report_future_block_voting_unsigned'
    equivocationProof: FutureBlockVotingProof
    keyOwnerProof: MembershipProof
}

/**
 * Reset BEEFY consensus by setting a new BEEFY genesis at `delay_in_blocks` blocks in the
 * future.
 * 
 * Note: `delay_in_blocks` has to be at least 1.
 */
export interface BeefyCall_set_new_genesis {
    __kind: 'set_new_genesis'
    delayInBlocks: number
}

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export const BalancesCall: sts.Type<BalancesCall> = sts.closedEnum(() => {
    return  {
        burn: sts.enumStruct({
            value: sts.bigint(),
            keepAlive: sts.boolean(),
        }),
        force_adjust_total_issuance: sts.enumStruct({
            direction: AdjustmentDirection,
            delta: sts.bigint(),
        }),
        force_set_balance: sts.enumStruct({
            who: MultiAddress,
            newFree: sts.bigint(),
        }),
        force_transfer: sts.enumStruct({
            source: MultiAddress,
            dest: MultiAddress,
            value: sts.bigint(),
        }),
        force_unreserve: sts.enumStruct({
            who: MultiAddress,
            amount: sts.bigint(),
        }),
        transfer_all: sts.enumStruct({
            dest: MultiAddress,
            keepAlive: sts.boolean(),
        }),
        transfer_allow_death: sts.enumStruct({
            dest: MultiAddress,
            value: sts.bigint(),
        }),
        transfer_keep_alive: sts.enumStruct({
            dest: MultiAddress,
            value: sts.bigint(),
        }),
        upgrade_accounts: sts.enumStruct({
            who: sts.array(() => AccountId32),
        }),
    }
})

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export type BalancesCall = BalancesCall_burn | BalancesCall_force_adjust_total_issuance | BalancesCall_force_set_balance | BalancesCall_force_transfer | BalancesCall_force_unreserve | BalancesCall_transfer_all | BalancesCall_transfer_allow_death | BalancesCall_transfer_keep_alive | BalancesCall_upgrade_accounts

/**
 * Burn the specified liquid free balance from the origin account.
 * 
 * If the origin's account ends up below the existential deposit as a result
 * of the burn and `keep_alive` is false, the account will be reaped.
 * 
 * Unlike sending funds to a _burn_ address, which merely makes the funds inaccessible,
 * this `burn` operation will reduce total issuance by the amount _burned_.
 */
export interface BalancesCall_burn {
    __kind: 'burn'
    value: bigint
    keepAlive: boolean
}

/**
 * Adjust the total issuance in a saturating way.
 * 
 * Can only be called by root and always needs a positive `delta`.
 * 
 * # Example
 */
export interface BalancesCall_force_adjust_total_issuance {
    __kind: 'force_adjust_total_issuance'
    direction: AdjustmentDirection
    delta: bigint
}

/**
 * Set the regular balance of a given account.
 * 
 * The dispatch origin for this call is `root`.
 */
export interface BalancesCall_force_set_balance {
    __kind: 'force_set_balance'
    who: MultiAddress
    newFree: bigint
}

/**
 * Exactly as `transfer_allow_death`, except the origin must be root and the source account
 * may be specified.
 */
export interface BalancesCall_force_transfer {
    __kind: 'force_transfer'
    source: MultiAddress
    dest: MultiAddress
    value: bigint
}

/**
 * Unreserve some balance from a user by force.
 * 
 * Can only be called by ROOT.
 */
export interface BalancesCall_force_unreserve {
    __kind: 'force_unreserve'
    who: MultiAddress
    amount: bigint
}

/**
 * Transfer the entire transferable balance from the caller account.
 * 
 * NOTE: This function only attempts to transfer _transferable_ balances. This means that
 * any locked, reserved, or existential deposits (when `keep_alive` is `true`), will not be
 * transferred by this function. To ensure that this function results in a killed account,
 * you might need to prepare the account by removing any reference counters, storage
 * deposits, etc...
 * 
 * The dispatch origin of this call must be Signed.
 * 
 * - `dest`: The recipient of the transfer.
 * - `keep_alive`: A boolean to determine if the `transfer_all` operation should send all
 *   of the funds the account has, causing the sender account to be killed (false), or
 *   transfer everything except at least the existential deposit, which will guarantee to
 *   keep the sender account alive (true).
 */
export interface BalancesCall_transfer_all {
    __kind: 'transfer_all'
    dest: MultiAddress
    keepAlive: boolean
}

/**
 * Transfer some liquid free balance to another account.
 * 
 * `transfer_allow_death` will set the `FreeBalance` of the sender and receiver.
 * If the sender's account is below the existential deposit as a result
 * of the transfer, the account will be reaped.
 * 
 * The dispatch origin for this call must be `Signed` by the transactor.
 */
export interface BalancesCall_transfer_allow_death {
    __kind: 'transfer_allow_death'
    dest: MultiAddress
    value: bigint
}

/**
 * Same as the [`transfer_allow_death`] call, but with a check that the transfer will not
 * kill the origin account.
 * 
 * 99% of the time you want [`transfer_allow_death`] instead.
 * 
 * [`transfer_allow_death`]: struct.Pallet.html#method.transfer
 */
export interface BalancesCall_transfer_keep_alive {
    __kind: 'transfer_keep_alive'
    dest: MultiAddress
    value: bigint
}

/**
 * Upgrade a specified account.
 * 
 * - `origin`: Must be `Signed`.
 * - `who`: The account to be upgraded.
 * 
 * This will waive the transaction fee if at least all but 10% of the accounts needed to
 * be upgraded. (We let some not have to be upgraded just in order to allow for the
 * possibility of churn).
 */
export interface BalancesCall_upgrade_accounts {
    __kind: 'upgrade_accounts'
    who: AccountId32[]
}

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export const BabeCall: sts.Type<BabeCall> = sts.closedEnum(() => {
    return  {
        plan_config_change: sts.enumStruct({
            config: NextConfigDescriptor,
        }),
        report_equivocation: sts.enumStruct({
            equivocationProof: EquivocationProof,
            keyOwnerProof: MembershipProof,
        }),
        report_equivocation_unsigned: sts.enumStruct({
            equivocationProof: EquivocationProof,
            keyOwnerProof: MembershipProof,
        }),
    }
})

export const EquivocationProof: sts.Type<EquivocationProof> = sts.struct(() => {
    return  {
        offender: sts.bytes(),
        slot: Slot,
        firstHeader: Header,
        secondHeader: Header,
    }
})

export const Slot = sts.bigint()

export interface EquivocationProof {
    offender: Bytes
    slot: Slot
    firstHeader: Header
    secondHeader: Header
}

export type Slot = bigint

export const NextConfigDescriptor: sts.Type<NextConfigDescriptor> = sts.closedEnum(() => {
    return  {
        V1: sts.enumStruct({
            c: sts.tuple(() => [sts.bigint(), sts.bigint()]),
            allowedSlots: AllowedSlots,
        }),
    }
})

export const AllowedSlots: sts.Type<AllowedSlots> = sts.closedEnum(() => {
    return  {
        PrimaryAndSecondaryPlainSlots: sts.unit(),
        PrimaryAndSecondaryVRFSlots: sts.unit(),
        PrimarySlots: sts.unit(),
    }
})

export type AllowedSlots = AllowedSlots_PrimaryAndSecondaryPlainSlots | AllowedSlots_PrimaryAndSecondaryVRFSlots | AllowedSlots_PrimarySlots

export interface AllowedSlots_PrimaryAndSecondaryPlainSlots {
    __kind: 'PrimaryAndSecondaryPlainSlots'
}

export interface AllowedSlots_PrimaryAndSecondaryVRFSlots {
    __kind: 'PrimaryAndSecondaryVRFSlots'
}

export interface AllowedSlots_PrimarySlots {
    __kind: 'PrimarySlots'
}

export type NextConfigDescriptor = NextConfigDescriptor_V1

export interface NextConfigDescriptor_V1 {
    __kind: 'V1'
    c: [bigint, bigint]
    allowedSlots: AllowedSlots
}

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export type BabeCall = BabeCall_plan_config_change | BabeCall_report_equivocation | BabeCall_report_equivocation_unsigned

/**
 * Plan an epoch config change. The epoch config change is recorded and will be enacted on
 * the next call to `enact_epoch_change`. The config will be activated one epoch after.
 * Multiple calls to this method will replace any existing planned config change that had
 * not been enacted yet.
 */
export interface BabeCall_plan_config_change {
    __kind: 'plan_config_change'
    config: NextConfigDescriptor
}

/**
 * Report authority equivocation/misbehavior. This method will verify
 * the equivocation proof and validate the given key ownership proof
 * against the extracted offender. If both are valid, the offence will
 * be reported.
 */
export interface BabeCall_report_equivocation {
    __kind: 'report_equivocation'
    equivocationProof: EquivocationProof
    keyOwnerProof: MembershipProof
}

/**
 * Report authority equivocation/misbehavior. This method will verify
 * the equivocation proof and validate the given key ownership proof
 * against the extracted offender. If both are valid, the offence will
 * be reported.
 * This extrinsic must be called unsigned and it is expected that only
 * block authors will call it (validated in `ValidateUnsigned`), as such
 * if the block author is defined it will be defined as the equivocation
 * reporter.
 */
export interface BabeCall_report_equivocation_unsigned {
    __kind: 'report_equivocation_unsigned'
    equivocationProof: EquivocationProof
    keyOwnerProof: MembershipProof
}

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export const AuctionsCall: sts.Type<AuctionsCall> = sts.closedEnum(() => {
    return  {
        bid: sts.enumStruct({
            para: sts.number(),
            auctionIndex: sts.number(),
            firstSlot: sts.number(),
            lastSlot: sts.number(),
            amount: sts.bigint(),
        }),
        cancel_auction: sts.unit(),
        new_auction: sts.enumStruct({
            duration: sts.number(),
            leasePeriodIndex: sts.number(),
        }),
    }
})

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export type AuctionsCall = AuctionsCall_bid | AuctionsCall_cancel_auction | AuctionsCall_new_auction

/**
 * Make a new bid from an account (including a parachain account) for deploying a new
 * parachain.
 * 
 * Multiple simultaneous bids from the same bidder are allowed only as long as all active
 * bids overlap each other (i.e. are mutually exclusive). Bids cannot be redacted.
 * 
 * - `sub` is the sub-bidder ID, allowing for multiple competing bids to be made by (and
 * funded by) the same account.
 * - `auction_index` is the index of the auction to bid on. Should just be the present
 * value of `AuctionCounter`.
 * - `first_slot` is the first lease period index of the range to bid on. This is the
 * absolute lease period index value, not an auction-specific offset.
 * - `last_slot` is the last lease period index of the range to bid on. This is the
 * absolute lease period index value, not an auction-specific offset.
 * - `amount` is the amount to bid to be held as deposit for the parachain should the
 * bid win. This amount is held throughout the range.
 */
export interface AuctionsCall_bid {
    __kind: 'bid'
    para: number
    auctionIndex: number
    firstSlot: number
    lastSlot: number
    amount: bigint
}

/**
 * Cancel an in-progress auction.
 * 
 * Can only be called by Root origin.
 */
export interface AuctionsCall_cancel_auction {
    __kind: 'cancel_auction'
}

/**
 * Create a new auction.
 * 
 * This can only happen when there isn't already an auction in progress and may only be
 * called by the root origin. Accepts the `duration` of this auction and the
 * `lease_period_index` of the initial lease period of the four that are to be auctioned.
 */
export interface AuctionsCall_new_auction {
    __kind: 'new_auction'
    duration: number
    leasePeriodIndex: number
}

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export const AssetRateCall: sts.Type<AssetRateCall> = sts.closedEnum(() => {
    return  {
        create: sts.enumStruct({
            assetKind: VersionedLocatableAsset,
            rate: FixedU128,
        }),
        remove: sts.enumStruct({
            assetKind: VersionedLocatableAsset,
        }),
        update: sts.enumStruct({
            assetKind: VersionedLocatableAsset,
            rate: FixedU128,
        }),
    }
})

export const FixedU128 = sts.bigint()

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export type AssetRateCall = AssetRateCall_create | AssetRateCall_remove | AssetRateCall_update

/**
 * Initialize a conversion rate to native balance for the given asset.
 * 
 * ## Complexity
 * - O(1)
 */
export interface AssetRateCall_create {
    __kind: 'create'
    assetKind: VersionedLocatableAsset
    rate: FixedU128
}

/**
 * Remove an existing conversion rate to native balance for the given asset.
 * 
 * ## Complexity
 * - O(1)
 */
export interface AssetRateCall_remove {
    __kind: 'remove'
    assetKind: VersionedLocatableAsset
}

/**
 * Update the conversion rate to native balance for the given asset.
 * 
 * ## Complexity
 * - O(1)
 */
export interface AssetRateCall_update {
    __kind: 'update'
    assetKind: VersionedLocatableAsset
    rate: FixedU128
}

export type FixedU128 = bigint

export type Call = Call_AssetRate | Call_Auctions | Call_Babe | Call_Balances | Call_Beefy | Call_Bounties | Call_ChildBounties | Call_Claims | Call_Configuration | Call_ConvictionVoting | Call_Coretime | Call_Crowdloan | Call_ElectionProviderMultiPhase | Call_FastUnstake | Call_FellowshipCollective | Call_FellowshipReferenda | Call_Grandpa | Call_Hrmp | Call_Indices | Call_Initializer | Call_MessageQueue | Call_Multisig | Call_Nis | Call_NisCounterpartBalances | Call_NominationPools | Call_OnDemandAssignmentProvider | Call_ParaInclusion | Call_ParaInherent | Call_Parameters | Call_Paras | Call_ParasDisputes | Call_ParasShared | Call_ParasSlashing | Call_Preimage | Call_Proxy | Call_Recovery | Call_Referenda | Call_Registrar | Call_Scheduler | Call_Session | Call_Slots | Call_Society | Call_Staking | Call_System | Call_Timestamp | Call_Treasury | Call_Utility | Call_Vesting | Call_VoterList | Call_Whitelist | Call_XcmPallet

export interface Call_AssetRate {
    __kind: 'AssetRate'
    value: AssetRateCall
}

export interface Call_Auctions {
    __kind: 'Auctions'
    value: AuctionsCall
}

export interface Call_Babe {
    __kind: 'Babe'
    value: BabeCall
}

export interface Call_Balances {
    __kind: 'Balances'
    value: BalancesCall
}

export interface Call_Beefy {
    __kind: 'Beefy'
    value: BeefyCall
}

export interface Call_Bounties {
    __kind: 'Bounties'
    value: BountiesCall
}

export interface Call_ChildBounties {
    __kind: 'ChildBounties'
    value: ChildBountiesCall
}

export interface Call_Claims {
    __kind: 'Claims'
    value: ClaimsCall
}

export interface Call_Configuration {
    __kind: 'Configuration'
    value: ConfigurationCall
}

export interface Call_ConvictionVoting {
    __kind: 'ConvictionVoting'
    value: ConvictionVotingCall
}

export interface Call_Coretime {
    __kind: 'Coretime'
    value: CoretimeCall
}

export interface Call_Crowdloan {
    __kind: 'Crowdloan'
    value: CrowdloanCall
}

export interface Call_ElectionProviderMultiPhase {
    __kind: 'ElectionProviderMultiPhase'
    value: ElectionProviderMultiPhaseCall
}

export interface Call_FastUnstake {
    __kind: 'FastUnstake'
    value: FastUnstakeCall
}

export interface Call_FellowshipCollective {
    __kind: 'FellowshipCollective'
    value: FellowshipCollectiveCall
}

export interface Call_FellowshipReferenda {
    __kind: 'FellowshipReferenda'
    value: FellowshipReferendaCall
}

export interface Call_Grandpa {
    __kind: 'Grandpa'
    value: GrandpaCall
}

export interface Call_Hrmp {
    __kind: 'Hrmp'
    value: HrmpCall
}

export interface Call_Indices {
    __kind: 'Indices'
    value: IndicesCall
}

export interface Call_Initializer {
    __kind: 'Initializer'
    value: InitializerCall
}

export interface Call_MessageQueue {
    __kind: 'MessageQueue'
    value: MessageQueueCall
}

export interface Call_Multisig {
    __kind: 'Multisig'
    value: MultisigCall
}

export interface Call_Nis {
    __kind: 'Nis'
    value: NisCall
}

export interface Call_NisCounterpartBalances {
    __kind: 'NisCounterpartBalances'
    value: NisCounterpartBalancesCall
}

export interface Call_NominationPools {
    __kind: 'NominationPools'
    value: NominationPoolsCall
}

export interface Call_OnDemandAssignmentProvider {
    __kind: 'OnDemandAssignmentProvider'
    value: OnDemandAssignmentProviderCall
}

export interface Call_ParaInclusion {
    __kind: 'ParaInclusion'
    value: ParaInclusionCall
}

export interface Call_ParaInherent {
    __kind: 'ParaInherent'
    value: ParaInherentCall
}

export interface Call_Parameters {
    __kind: 'Parameters'
    value: ParametersCall
}

export interface Call_Paras {
    __kind: 'Paras'
    value: ParasCall
}

export interface Call_ParasDisputes {
    __kind: 'ParasDisputes'
    value: ParasDisputesCall
}

export interface Call_ParasShared {
    __kind: 'ParasShared'
    value: ParasSharedCall
}

export interface Call_ParasSlashing {
    __kind: 'ParasSlashing'
    value: ParasSlashingCall
}

export interface Call_Preimage {
    __kind: 'Preimage'
    value: PreimageCall
}

export interface Call_Proxy {
    __kind: 'Proxy'
    value: ProxyCall
}

export interface Call_Recovery {
    __kind: 'Recovery'
    value: RecoveryCall
}

export interface Call_Referenda {
    __kind: 'Referenda'
    value: ReferendaCall
}

export interface Call_Registrar {
    __kind: 'Registrar'
    value: RegistrarCall
}

export interface Call_Scheduler {
    __kind: 'Scheduler'
    value: SchedulerCall
}

export interface Call_Session {
    __kind: 'Session'
    value: SessionCall
}

export interface Call_Slots {
    __kind: 'Slots'
    value: SlotsCall
}

export interface Call_Society {
    __kind: 'Society'
    value: SocietyCall
}

export interface Call_Staking {
    __kind: 'Staking'
    value: StakingCall
}

export interface Call_System {
    __kind: 'System'
    value: SystemCall
}

export interface Call_Timestamp {
    __kind: 'Timestamp'
    value: TimestampCall
}

export interface Call_Treasury {
    __kind: 'Treasury'
    value: TreasuryCall
}

export interface Call_Utility {
    __kind: 'Utility'
    value: UtilityCall
}

export interface Call_Vesting {
    __kind: 'Vesting'
    value: VestingCall
}

export interface Call_VoterList {
    __kind: 'VoterList'
    value: VoterListCall
}

export interface Call_Whitelist {
    __kind: 'Whitelist'
    value: WhitelistCall
}

export interface Call_XcmPallet {
    __kind: 'XcmPallet'
    value: XcmPalletCall
}

export const ProxyType: sts.Type<ProxyType> = sts.closedEnum(() => {
    return  {
        Any: sts.unit(),
        Auction: sts.unit(),
        CancelProxy: sts.unit(),
        Governance: sts.unit(),
        NominationPools: sts.unit(),
        NonTransfer: sts.unit(),
        ParaRegistration: sts.unit(),
        Society: sts.unit(),
        Spokesperson: sts.unit(),
        Staking: sts.unit(),
    }
})

export const MultiAddress: sts.Type<MultiAddress> = sts.closedEnum(() => {
    return  {
        Address20: sts.bytes(),
        Address32: sts.bytes(),
        Id: AccountId32,
        Index: sts.unit(),
        Raw: sts.bytes(),
    }
})
