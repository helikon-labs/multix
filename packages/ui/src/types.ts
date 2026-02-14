import { HexString, SS58String, Transaction, TypedApi } from 'polkadot-api';

export interface MultisigStorageInfo {
    when: {
        height: number;
        index: number;
    };
    deposit: bigint;
    depositor: SS58String;
    approvals: SS58String[];
}

export type IconSizeVariant = 'small' | 'medium' | 'large';

export type EditButtonSize = 'small' | 'medium' | 'large';

export enum AccountBadge {
    PURE = 'pure',
    MULTI = 'multi',
}

export interface SubmittingCall {
    decodedCall?: Transaction<any, any, any, any>['decodedCall'];
    call?: Transaction<any, any, any, any>;
    hash?: HexString;
    method?: string;
    section?: string;
    weight?: Weight;
    partialFee?: bigint;
}

export type Weight = { ref_time: bigint; proof_size: bigint };

export type IdentityJudgement =
    | 'Unknown'
    | 'FeePaid'
    | 'Reasonable'
    | 'KnownGood'
    | 'OutOfDate'
    | 'LowQuality'
    | 'Erroneous';

export interface AccountRegistration {
    discord?: string | undefined;
    display?: string | undefined;
    displayParent?: string | undefined;
    email?: string | undefined;
    github?: string | undefined;
    image?: string | undefined;
    legal?: string | undefined;
    matrix?: string | undefined;
    other?: Record<string, string> | undefined;
    parent?: SS58String | undefined;
    pgp?: string | undefined;
    riot?: string | undefined;
    twitter?: string | undefined;
    web?: string | undefined;
    judgements: IdentityJudgement[];
}

import {
    acala,
    astar,
    bifrostDot,
    dancelight,
    dot,
    dotAssetHub,
    hydration,
    ksm,
    ksmAssetHub,
    paseo,
    // phala,
    // coretimeDot,
    westend,
    // wesAssetHub,
    dotPpl,
    ksmPpl,
    pasPpl,
    wesPpl,
    tanssi,
    zkVerifyMainnet,
} from '@polkadot-api/descriptors';

export const DESCRIPTORS = {
    acala,
    astar,
    bifrostDot,
    dancelight,
    dot,
    dotAssetHub,
    hydration,
    ksm,
    ksmAssetHub,
    paseo,
    // phala,
    // coretimeDot,
    westend,
    // wesAssetHub,
    dotPpl,
    ksmPpl,
    pasPpl,
    wesPpl,
    tanssi,
    zkVerifyMainnet,
} as const;

export const DESCRIPTORS_NOT_HYDRATION_1_3 = {
    acala,
    astar,
    bifrostDot,
    dot,
    dotAssetHub,
} as const;

export const DESCRIPTORS_NOT_HYDRATION_2_3 = {
    ksm,
    ksmAssetHub,
    dancelight,
    paseo,
    tanssi,
    zkVerifyMainnet,
} as const;

export const DESCRIPTORS_NOT_HYDRATION_3_3 = {
    // phala,
    // coretimeDot,
    westend,
    // wesAssetHub
} as const;

export const DESCRIPTORS_ASSET_HUBS = {
    dotAssetHub,
    ksmAssetHub,
    // wesAssetHub
};

export const DESCRIPTORS_RELAYS = {
    paseo,
    dot,
    ksm,
    westend,
};

export const DESCRIPTORS_1_3 = { acala, bifrostDot, dot, dotAssetHub, hydration } as const;
export const DESCRIPTORS_2_3 = {
    ksm,
    ksmAssetHub,
    paseo,
    dancelight,
    tanssi,
    zkVerifyMainnet,
} as const;
export const DESCRIPTORS_3_3 = { westend } as const;

export type ApiDescriptors = keyof typeof DESCRIPTORS;

export type Descriptors<Id extends ApiDescriptors> = (typeof DESCRIPTORS)[Id];
export type ApiOf<Id extends ApiDescriptors> = TypedApi<Descriptors<Id>>;

// No hydration
export const noHydrationKeys_1 = Object.keys(
    DESCRIPTORS_NOT_HYDRATION_1_3,
) as (keyof typeof DESCRIPTORS_NOT_HYDRATION_1_3)[];

export const noHydrationKeys_2 = Object.keys(
    DESCRIPTORS_NOT_HYDRATION_2_3,
) as (keyof typeof DESCRIPTORS_NOT_HYDRATION_2_3)[];

export const noHydrationKeys_3 = Object.keys(
    DESCRIPTORS_NOT_HYDRATION_3_3,
) as (keyof typeof DESCRIPTORS_NOT_HYDRATION_3_3)[];

export const noHydrationKeys = [...noHydrationKeys_1, ...noHydrationKeys_2, ...noHydrationKeys_3];

// All descriptors but Ppl chains
export const allDescriptorsKey_1_3 = Object.keys(
    DESCRIPTORS_1_3,
) as (keyof typeof DESCRIPTORS_1_3)[];
export const allDescriptorsKey_2_3 = Object.keys(
    DESCRIPTORS_2_3,
) as (keyof typeof DESCRIPTORS_2_3)[];
export const allDescriptorsKey_3_3 = Object.keys(
    DESCRIPTORS_3_3,
) as (keyof typeof DESCRIPTORS_3_3)[];

// Asset hubs
export const assetHubKeys = Object.keys(
    DESCRIPTORS_ASSET_HUBS,
) as (keyof typeof DESCRIPTORS_ASSET_HUBS)[];

// Relays
export const relayKeys = Object.keys(DESCRIPTORS_RELAYS) as (keyof typeof DESCRIPTORS_RELAYS)[];

// Ppl chains
export const DESCRIPTORS_PPL = {
    dotPpl,
    ksmPpl,
    pasPpl,
    wesPpl,
} as const;
export type PplDescriptorKeys = keyof typeof DESCRIPTORS_PPL;
export type PplDescriptors<Id extends PplDescriptorKeys> = (typeof DESCRIPTORS_PPL)[Id];
export type PplApiOf<Id extends PplDescriptorKeys> = TypedApi<PplDescriptors<Id>>;
export const pplDescriptorKeys = Object.keys(DESCRIPTORS_PPL) as (keyof typeof DESCRIPTORS_PPL)[];
