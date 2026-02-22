/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string in simplified extended ISO 8601 format (YYYY-MM-DDTHH:mm:ss.sssZ) */
  DateTime: { input: any; output: any; }
};

export type Account = {
  __typename?: 'Account';
  delegateeFor: Array<ProxyAccount>;
  delegatorFor: Array<ProxyAccount>;
  id: Scalars['String']['output'];
  isMultisig?: Maybe<Scalars['Boolean']['output']>;
  isPureProxy?: Maybe<Scalars['Boolean']['output']>;
  multisigs: Array<AccountMultisig>;
  multisigsCalls: Array<MultisigCall>;
  pubKey: Scalars['String']['output'];
  signatories: Array<AccountMultisig>;
  threshold?: Maybe<Scalars['Int']['output']>;
};


export type AccountDelegateeForArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ProxyAccountOrderByInput>>;
  where?: InputMaybe<ProxyAccountWhereInput>;
};


export type AccountDelegatorForArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ProxyAccountOrderByInput>>;
  where?: InputMaybe<ProxyAccountWhereInput>;
};


export type AccountMultisigsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AccountMultisigOrderByInput>>;
  where?: InputMaybe<AccountMultisigWhereInput>;
};


export type AccountMultisigsCallsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<MultisigCallOrderByInput>>;
  where?: InputMaybe<MultisigCallWhereInput>;
};


export type AccountSignatoriesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AccountMultisigOrderByInput>>;
  where?: InputMaybe<AccountMultisigWhereInput>;
};

export type AccountEdge = {
  __typename?: 'AccountEdge';
  cursor: Scalars['String']['output'];
  node: Account;
};

export type AccountMultisig = {
  __typename?: 'AccountMultisig';
  id: Scalars['String']['output'];
  multisig: Account;
  signatory: Account;
};

export type AccountMultisigEdge = {
  __typename?: 'AccountMultisigEdge';
  cursor: Scalars['String']['output'];
  node: AccountMultisig;
};

export enum AccountMultisigOrderByInput {
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  MultisigIdAsc = 'multisig_id_ASC',
  MultisigIdAscNullsFirst = 'multisig_id_ASC_NULLS_FIRST',
  MultisigIdAscNullsLast = 'multisig_id_ASC_NULLS_LAST',
  MultisigIdDesc = 'multisig_id_DESC',
  MultisigIdDescNullsFirst = 'multisig_id_DESC_NULLS_FIRST',
  MultisigIdDescNullsLast = 'multisig_id_DESC_NULLS_LAST',
  MultisigIsMultisigAsc = 'multisig_isMultisig_ASC',
  MultisigIsMultisigAscNullsFirst = 'multisig_isMultisig_ASC_NULLS_FIRST',
  MultisigIsMultisigAscNullsLast = 'multisig_isMultisig_ASC_NULLS_LAST',
  MultisigIsMultisigDesc = 'multisig_isMultisig_DESC',
  MultisigIsMultisigDescNullsFirst = 'multisig_isMultisig_DESC_NULLS_FIRST',
  MultisigIsMultisigDescNullsLast = 'multisig_isMultisig_DESC_NULLS_LAST',
  MultisigIsPureProxyAsc = 'multisig_isPureProxy_ASC',
  MultisigIsPureProxyAscNullsFirst = 'multisig_isPureProxy_ASC_NULLS_FIRST',
  MultisigIsPureProxyAscNullsLast = 'multisig_isPureProxy_ASC_NULLS_LAST',
  MultisigIsPureProxyDesc = 'multisig_isPureProxy_DESC',
  MultisigIsPureProxyDescNullsFirst = 'multisig_isPureProxy_DESC_NULLS_FIRST',
  MultisigIsPureProxyDescNullsLast = 'multisig_isPureProxy_DESC_NULLS_LAST',
  MultisigPubKeyAsc = 'multisig_pubKey_ASC',
  MultisigPubKeyAscNullsFirst = 'multisig_pubKey_ASC_NULLS_FIRST',
  MultisigPubKeyAscNullsLast = 'multisig_pubKey_ASC_NULLS_LAST',
  MultisigPubKeyDesc = 'multisig_pubKey_DESC',
  MultisigPubKeyDescNullsFirst = 'multisig_pubKey_DESC_NULLS_FIRST',
  MultisigPubKeyDescNullsLast = 'multisig_pubKey_DESC_NULLS_LAST',
  MultisigThresholdAsc = 'multisig_threshold_ASC',
  MultisigThresholdAscNullsFirst = 'multisig_threshold_ASC_NULLS_FIRST',
  MultisigThresholdAscNullsLast = 'multisig_threshold_ASC_NULLS_LAST',
  MultisigThresholdDesc = 'multisig_threshold_DESC',
  MultisigThresholdDescNullsFirst = 'multisig_threshold_DESC_NULLS_FIRST',
  MultisigThresholdDescNullsLast = 'multisig_threshold_DESC_NULLS_LAST',
  SignatoryIdAsc = 'signatory_id_ASC',
  SignatoryIdAscNullsFirst = 'signatory_id_ASC_NULLS_FIRST',
  SignatoryIdAscNullsLast = 'signatory_id_ASC_NULLS_LAST',
  SignatoryIdDesc = 'signatory_id_DESC',
  SignatoryIdDescNullsFirst = 'signatory_id_DESC_NULLS_FIRST',
  SignatoryIdDescNullsLast = 'signatory_id_DESC_NULLS_LAST',
  SignatoryIsMultisigAsc = 'signatory_isMultisig_ASC',
  SignatoryIsMultisigAscNullsFirst = 'signatory_isMultisig_ASC_NULLS_FIRST',
  SignatoryIsMultisigAscNullsLast = 'signatory_isMultisig_ASC_NULLS_LAST',
  SignatoryIsMultisigDesc = 'signatory_isMultisig_DESC',
  SignatoryIsMultisigDescNullsFirst = 'signatory_isMultisig_DESC_NULLS_FIRST',
  SignatoryIsMultisigDescNullsLast = 'signatory_isMultisig_DESC_NULLS_LAST',
  SignatoryIsPureProxyAsc = 'signatory_isPureProxy_ASC',
  SignatoryIsPureProxyAscNullsFirst = 'signatory_isPureProxy_ASC_NULLS_FIRST',
  SignatoryIsPureProxyAscNullsLast = 'signatory_isPureProxy_ASC_NULLS_LAST',
  SignatoryIsPureProxyDesc = 'signatory_isPureProxy_DESC',
  SignatoryIsPureProxyDescNullsFirst = 'signatory_isPureProxy_DESC_NULLS_FIRST',
  SignatoryIsPureProxyDescNullsLast = 'signatory_isPureProxy_DESC_NULLS_LAST',
  SignatoryPubKeyAsc = 'signatory_pubKey_ASC',
  SignatoryPubKeyAscNullsFirst = 'signatory_pubKey_ASC_NULLS_FIRST',
  SignatoryPubKeyAscNullsLast = 'signatory_pubKey_ASC_NULLS_LAST',
  SignatoryPubKeyDesc = 'signatory_pubKey_DESC',
  SignatoryPubKeyDescNullsFirst = 'signatory_pubKey_DESC_NULLS_FIRST',
  SignatoryPubKeyDescNullsLast = 'signatory_pubKey_DESC_NULLS_LAST',
  SignatoryThresholdAsc = 'signatory_threshold_ASC',
  SignatoryThresholdAscNullsFirst = 'signatory_threshold_ASC_NULLS_FIRST',
  SignatoryThresholdAscNullsLast = 'signatory_threshold_ASC_NULLS_LAST',
  SignatoryThresholdDesc = 'signatory_threshold_DESC',
  SignatoryThresholdDescNullsFirst = 'signatory_threshold_DESC_NULLS_FIRST',
  SignatoryThresholdDescNullsLast = 'signatory_threshold_DESC_NULLS_LAST'
}

export type AccountMultisigWhereInput = {
  AND?: InputMaybe<Array<AccountMultisigWhereInput>>;
  OR?: InputMaybe<Array<AccountMultisigWhereInput>>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  multisig?: InputMaybe<AccountWhereInput>;
  multisig_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  signatory?: InputMaybe<AccountWhereInput>;
  signatory_isNull?: InputMaybe<Scalars['Boolean']['input']>;
};

export type AccountMultisigsConnection = {
  __typename?: 'AccountMultisigsConnection';
  edges: Array<AccountMultisigEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export enum AccountOrderByInput {
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  IsMultisigAsc = 'isMultisig_ASC',
  IsMultisigAscNullsFirst = 'isMultisig_ASC_NULLS_FIRST',
  IsMultisigAscNullsLast = 'isMultisig_ASC_NULLS_LAST',
  IsMultisigDesc = 'isMultisig_DESC',
  IsMultisigDescNullsFirst = 'isMultisig_DESC_NULLS_FIRST',
  IsMultisigDescNullsLast = 'isMultisig_DESC_NULLS_LAST',
  IsPureProxyAsc = 'isPureProxy_ASC',
  IsPureProxyAscNullsFirst = 'isPureProxy_ASC_NULLS_FIRST',
  IsPureProxyAscNullsLast = 'isPureProxy_ASC_NULLS_LAST',
  IsPureProxyDesc = 'isPureProxy_DESC',
  IsPureProxyDescNullsFirst = 'isPureProxy_DESC_NULLS_FIRST',
  IsPureProxyDescNullsLast = 'isPureProxy_DESC_NULLS_LAST',
  PubKeyAsc = 'pubKey_ASC',
  PubKeyAscNullsFirst = 'pubKey_ASC_NULLS_FIRST',
  PubKeyAscNullsLast = 'pubKey_ASC_NULLS_LAST',
  PubKeyDesc = 'pubKey_DESC',
  PubKeyDescNullsFirst = 'pubKey_DESC_NULLS_FIRST',
  PubKeyDescNullsLast = 'pubKey_DESC_NULLS_LAST',
  ThresholdAsc = 'threshold_ASC',
  ThresholdAscNullsFirst = 'threshold_ASC_NULLS_FIRST',
  ThresholdAscNullsLast = 'threshold_ASC_NULLS_LAST',
  ThresholdDesc = 'threshold_DESC',
  ThresholdDescNullsFirst = 'threshold_DESC_NULLS_FIRST',
  ThresholdDescNullsLast = 'threshold_DESC_NULLS_LAST'
}

export type AccountWhereInput = {
  AND?: InputMaybe<Array<AccountWhereInput>>;
  OR?: InputMaybe<Array<AccountWhereInput>>;
  delegateeFor_every?: InputMaybe<ProxyAccountWhereInput>;
  delegateeFor_none?: InputMaybe<ProxyAccountWhereInput>;
  delegateeFor_some?: InputMaybe<ProxyAccountWhereInput>;
  delegatorFor_every?: InputMaybe<ProxyAccountWhereInput>;
  delegatorFor_none?: InputMaybe<ProxyAccountWhereInput>;
  delegatorFor_some?: InputMaybe<ProxyAccountWhereInput>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  isMultisig_eq?: InputMaybe<Scalars['Boolean']['input']>;
  isMultisig_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  isMultisig_not_eq?: InputMaybe<Scalars['Boolean']['input']>;
  isPureProxy_eq?: InputMaybe<Scalars['Boolean']['input']>;
  isPureProxy_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  isPureProxy_not_eq?: InputMaybe<Scalars['Boolean']['input']>;
  multisigsCalls_every?: InputMaybe<MultisigCallWhereInput>;
  multisigsCalls_none?: InputMaybe<MultisigCallWhereInput>;
  multisigsCalls_some?: InputMaybe<MultisigCallWhereInput>;
  multisigs_every?: InputMaybe<AccountMultisigWhereInput>;
  multisigs_none?: InputMaybe<AccountMultisigWhereInput>;
  multisigs_some?: InputMaybe<AccountMultisigWhereInput>;
  pubKey_contains?: InputMaybe<Scalars['String']['input']>;
  pubKey_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  pubKey_endsWith?: InputMaybe<Scalars['String']['input']>;
  pubKey_eq?: InputMaybe<Scalars['String']['input']>;
  pubKey_gt?: InputMaybe<Scalars['String']['input']>;
  pubKey_gte?: InputMaybe<Scalars['String']['input']>;
  pubKey_in?: InputMaybe<Array<Scalars['String']['input']>>;
  pubKey_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  pubKey_lt?: InputMaybe<Scalars['String']['input']>;
  pubKey_lte?: InputMaybe<Scalars['String']['input']>;
  pubKey_not_contains?: InputMaybe<Scalars['String']['input']>;
  pubKey_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  pubKey_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  pubKey_not_eq?: InputMaybe<Scalars['String']['input']>;
  pubKey_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  pubKey_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  pubKey_startsWith?: InputMaybe<Scalars['String']['input']>;
  signatories_every?: InputMaybe<AccountMultisigWhereInput>;
  signatories_none?: InputMaybe<AccountMultisigWhereInput>;
  signatories_some?: InputMaybe<AccountMultisigWhereInput>;
  threshold_eq?: InputMaybe<Scalars['Int']['input']>;
  threshold_gt?: InputMaybe<Scalars['Int']['input']>;
  threshold_gte?: InputMaybe<Scalars['Int']['input']>;
  threshold_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  threshold_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  threshold_lt?: InputMaybe<Scalars['Int']['input']>;
  threshold_lte?: InputMaybe<Scalars['Int']['input']>;
  threshold_not_eq?: InputMaybe<Scalars['Int']['input']>;
  threshold_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type AccountsConnection = {
  __typename?: 'AccountsConnection';
  edges: Array<AccountEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type MultisigCall = {
  __typename?: 'MultisigCall';
  blockHash: Scalars['String']['output'];
  callIndex: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  multisig?: Maybe<Account>;
  timestamp: Scalars['DateTime']['output'];
};

export type MultisigCallEdge = {
  __typename?: 'MultisigCallEdge';
  cursor: Scalars['String']['output'];
  node: MultisigCall;
};

export enum MultisigCallOrderByInput {
  BlockHashAsc = 'blockHash_ASC',
  BlockHashAscNullsFirst = 'blockHash_ASC_NULLS_FIRST',
  BlockHashAscNullsLast = 'blockHash_ASC_NULLS_LAST',
  BlockHashDesc = 'blockHash_DESC',
  BlockHashDescNullsFirst = 'blockHash_DESC_NULLS_FIRST',
  BlockHashDescNullsLast = 'blockHash_DESC_NULLS_LAST',
  CallIndexAsc = 'callIndex_ASC',
  CallIndexAscNullsFirst = 'callIndex_ASC_NULLS_FIRST',
  CallIndexAscNullsLast = 'callIndex_ASC_NULLS_LAST',
  CallIndexDesc = 'callIndex_DESC',
  CallIndexDescNullsFirst = 'callIndex_DESC_NULLS_FIRST',
  CallIndexDescNullsLast = 'callIndex_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  MultisigIdAsc = 'multisig_id_ASC',
  MultisigIdAscNullsFirst = 'multisig_id_ASC_NULLS_FIRST',
  MultisigIdAscNullsLast = 'multisig_id_ASC_NULLS_LAST',
  MultisigIdDesc = 'multisig_id_DESC',
  MultisigIdDescNullsFirst = 'multisig_id_DESC_NULLS_FIRST',
  MultisigIdDescNullsLast = 'multisig_id_DESC_NULLS_LAST',
  MultisigIsMultisigAsc = 'multisig_isMultisig_ASC',
  MultisigIsMultisigAscNullsFirst = 'multisig_isMultisig_ASC_NULLS_FIRST',
  MultisigIsMultisigAscNullsLast = 'multisig_isMultisig_ASC_NULLS_LAST',
  MultisigIsMultisigDesc = 'multisig_isMultisig_DESC',
  MultisigIsMultisigDescNullsFirst = 'multisig_isMultisig_DESC_NULLS_FIRST',
  MultisigIsMultisigDescNullsLast = 'multisig_isMultisig_DESC_NULLS_LAST',
  MultisigIsPureProxyAsc = 'multisig_isPureProxy_ASC',
  MultisigIsPureProxyAscNullsFirst = 'multisig_isPureProxy_ASC_NULLS_FIRST',
  MultisigIsPureProxyAscNullsLast = 'multisig_isPureProxy_ASC_NULLS_LAST',
  MultisigIsPureProxyDesc = 'multisig_isPureProxy_DESC',
  MultisigIsPureProxyDescNullsFirst = 'multisig_isPureProxy_DESC_NULLS_FIRST',
  MultisigIsPureProxyDescNullsLast = 'multisig_isPureProxy_DESC_NULLS_LAST',
  MultisigPubKeyAsc = 'multisig_pubKey_ASC',
  MultisigPubKeyAscNullsFirst = 'multisig_pubKey_ASC_NULLS_FIRST',
  MultisigPubKeyAscNullsLast = 'multisig_pubKey_ASC_NULLS_LAST',
  MultisigPubKeyDesc = 'multisig_pubKey_DESC',
  MultisigPubKeyDescNullsFirst = 'multisig_pubKey_DESC_NULLS_FIRST',
  MultisigPubKeyDescNullsLast = 'multisig_pubKey_DESC_NULLS_LAST',
  MultisigThresholdAsc = 'multisig_threshold_ASC',
  MultisigThresholdAscNullsFirst = 'multisig_threshold_ASC_NULLS_FIRST',
  MultisigThresholdAscNullsLast = 'multisig_threshold_ASC_NULLS_LAST',
  MultisigThresholdDesc = 'multisig_threshold_DESC',
  MultisigThresholdDescNullsFirst = 'multisig_threshold_DESC_NULLS_FIRST',
  MultisigThresholdDescNullsLast = 'multisig_threshold_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampAscNullsLast = 'timestamp_ASC_NULLS_LAST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsFirst = 'timestamp_DESC_NULLS_FIRST',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST'
}

export type MultisigCallWhereInput = {
  AND?: InputMaybe<Array<MultisigCallWhereInput>>;
  OR?: InputMaybe<Array<MultisigCallWhereInput>>;
  blockHash_contains?: InputMaybe<Scalars['String']['input']>;
  blockHash_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  blockHash_endsWith?: InputMaybe<Scalars['String']['input']>;
  blockHash_eq?: InputMaybe<Scalars['String']['input']>;
  blockHash_gt?: InputMaybe<Scalars['String']['input']>;
  blockHash_gte?: InputMaybe<Scalars['String']['input']>;
  blockHash_in?: InputMaybe<Array<Scalars['String']['input']>>;
  blockHash_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  blockHash_lt?: InputMaybe<Scalars['String']['input']>;
  blockHash_lte?: InputMaybe<Scalars['String']['input']>;
  blockHash_not_contains?: InputMaybe<Scalars['String']['input']>;
  blockHash_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  blockHash_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  blockHash_not_eq?: InputMaybe<Scalars['String']['input']>;
  blockHash_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  blockHash_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  blockHash_startsWith?: InputMaybe<Scalars['String']['input']>;
  callIndex_eq?: InputMaybe<Scalars['Int']['input']>;
  callIndex_gt?: InputMaybe<Scalars['Int']['input']>;
  callIndex_gte?: InputMaybe<Scalars['Int']['input']>;
  callIndex_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  callIndex_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  callIndex_lt?: InputMaybe<Scalars['Int']['input']>;
  callIndex_lte?: InputMaybe<Scalars['Int']['input']>;
  callIndex_not_eq?: InputMaybe<Scalars['Int']['input']>;
  callIndex_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  multisig?: InputMaybe<AccountWhereInput>;
  multisig_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  timestamp_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  timestamp_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  timestamp_lt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_lte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export type MultisigCallsConnection = {
  __typename?: 'MultisigCallsConnection';
  edges: Array<MultisigCallEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor: Scalars['String']['output'];
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor: Scalars['String']['output'];
};

export type ProxyAccount = {
  __typename?: 'ProxyAccount';
  createdAt: Scalars['DateTime']['output'];
  creationBlockNumber?: Maybe<Scalars['Int']['output']>;
  delay: Scalars['Int']['output'];
  delegatee: Account;
  delegator: Account;
  extrinsicIndex?: Maybe<Scalars['Int']['output']>;
  id: Scalars['String']['output'];
  type: ProxyType;
};

export type ProxyAccountEdge = {
  __typename?: 'ProxyAccountEdge';
  cursor: Scalars['String']['output'];
  node: ProxyAccount;
};

export enum ProxyAccountOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtAscNullsFirst = 'createdAt_ASC_NULLS_FIRST',
  CreatedAtAscNullsLast = 'createdAt_ASC_NULLS_LAST',
  CreatedAtDesc = 'createdAt_DESC',
  CreatedAtDescNullsFirst = 'createdAt_DESC_NULLS_FIRST',
  CreatedAtDescNullsLast = 'createdAt_DESC_NULLS_LAST',
  CreationBlockNumberAsc = 'creationBlockNumber_ASC',
  CreationBlockNumberAscNullsFirst = 'creationBlockNumber_ASC_NULLS_FIRST',
  CreationBlockNumberAscNullsLast = 'creationBlockNumber_ASC_NULLS_LAST',
  CreationBlockNumberDesc = 'creationBlockNumber_DESC',
  CreationBlockNumberDescNullsFirst = 'creationBlockNumber_DESC_NULLS_FIRST',
  CreationBlockNumberDescNullsLast = 'creationBlockNumber_DESC_NULLS_LAST',
  DelayAsc = 'delay_ASC',
  DelayAscNullsFirst = 'delay_ASC_NULLS_FIRST',
  DelayAscNullsLast = 'delay_ASC_NULLS_LAST',
  DelayDesc = 'delay_DESC',
  DelayDescNullsFirst = 'delay_DESC_NULLS_FIRST',
  DelayDescNullsLast = 'delay_DESC_NULLS_LAST',
  DelegateeIdAsc = 'delegatee_id_ASC',
  DelegateeIdAscNullsFirst = 'delegatee_id_ASC_NULLS_FIRST',
  DelegateeIdAscNullsLast = 'delegatee_id_ASC_NULLS_LAST',
  DelegateeIdDesc = 'delegatee_id_DESC',
  DelegateeIdDescNullsFirst = 'delegatee_id_DESC_NULLS_FIRST',
  DelegateeIdDescNullsLast = 'delegatee_id_DESC_NULLS_LAST',
  DelegateeIsMultisigAsc = 'delegatee_isMultisig_ASC',
  DelegateeIsMultisigAscNullsFirst = 'delegatee_isMultisig_ASC_NULLS_FIRST',
  DelegateeIsMultisigAscNullsLast = 'delegatee_isMultisig_ASC_NULLS_LAST',
  DelegateeIsMultisigDesc = 'delegatee_isMultisig_DESC',
  DelegateeIsMultisigDescNullsFirst = 'delegatee_isMultisig_DESC_NULLS_FIRST',
  DelegateeIsMultisigDescNullsLast = 'delegatee_isMultisig_DESC_NULLS_LAST',
  DelegateeIsPureProxyAsc = 'delegatee_isPureProxy_ASC',
  DelegateeIsPureProxyAscNullsFirst = 'delegatee_isPureProxy_ASC_NULLS_FIRST',
  DelegateeIsPureProxyAscNullsLast = 'delegatee_isPureProxy_ASC_NULLS_LAST',
  DelegateeIsPureProxyDesc = 'delegatee_isPureProxy_DESC',
  DelegateeIsPureProxyDescNullsFirst = 'delegatee_isPureProxy_DESC_NULLS_FIRST',
  DelegateeIsPureProxyDescNullsLast = 'delegatee_isPureProxy_DESC_NULLS_LAST',
  DelegateePubKeyAsc = 'delegatee_pubKey_ASC',
  DelegateePubKeyAscNullsFirst = 'delegatee_pubKey_ASC_NULLS_FIRST',
  DelegateePubKeyAscNullsLast = 'delegatee_pubKey_ASC_NULLS_LAST',
  DelegateePubKeyDesc = 'delegatee_pubKey_DESC',
  DelegateePubKeyDescNullsFirst = 'delegatee_pubKey_DESC_NULLS_FIRST',
  DelegateePubKeyDescNullsLast = 'delegatee_pubKey_DESC_NULLS_LAST',
  DelegateeThresholdAsc = 'delegatee_threshold_ASC',
  DelegateeThresholdAscNullsFirst = 'delegatee_threshold_ASC_NULLS_FIRST',
  DelegateeThresholdAscNullsLast = 'delegatee_threshold_ASC_NULLS_LAST',
  DelegateeThresholdDesc = 'delegatee_threshold_DESC',
  DelegateeThresholdDescNullsFirst = 'delegatee_threshold_DESC_NULLS_FIRST',
  DelegateeThresholdDescNullsLast = 'delegatee_threshold_DESC_NULLS_LAST',
  DelegatorIdAsc = 'delegator_id_ASC',
  DelegatorIdAscNullsFirst = 'delegator_id_ASC_NULLS_FIRST',
  DelegatorIdAscNullsLast = 'delegator_id_ASC_NULLS_LAST',
  DelegatorIdDesc = 'delegator_id_DESC',
  DelegatorIdDescNullsFirst = 'delegator_id_DESC_NULLS_FIRST',
  DelegatorIdDescNullsLast = 'delegator_id_DESC_NULLS_LAST',
  DelegatorIsMultisigAsc = 'delegator_isMultisig_ASC',
  DelegatorIsMultisigAscNullsFirst = 'delegator_isMultisig_ASC_NULLS_FIRST',
  DelegatorIsMultisigAscNullsLast = 'delegator_isMultisig_ASC_NULLS_LAST',
  DelegatorIsMultisigDesc = 'delegator_isMultisig_DESC',
  DelegatorIsMultisigDescNullsFirst = 'delegator_isMultisig_DESC_NULLS_FIRST',
  DelegatorIsMultisigDescNullsLast = 'delegator_isMultisig_DESC_NULLS_LAST',
  DelegatorIsPureProxyAsc = 'delegator_isPureProxy_ASC',
  DelegatorIsPureProxyAscNullsFirst = 'delegator_isPureProxy_ASC_NULLS_FIRST',
  DelegatorIsPureProxyAscNullsLast = 'delegator_isPureProxy_ASC_NULLS_LAST',
  DelegatorIsPureProxyDesc = 'delegator_isPureProxy_DESC',
  DelegatorIsPureProxyDescNullsFirst = 'delegator_isPureProxy_DESC_NULLS_FIRST',
  DelegatorIsPureProxyDescNullsLast = 'delegator_isPureProxy_DESC_NULLS_LAST',
  DelegatorPubKeyAsc = 'delegator_pubKey_ASC',
  DelegatorPubKeyAscNullsFirst = 'delegator_pubKey_ASC_NULLS_FIRST',
  DelegatorPubKeyAscNullsLast = 'delegator_pubKey_ASC_NULLS_LAST',
  DelegatorPubKeyDesc = 'delegator_pubKey_DESC',
  DelegatorPubKeyDescNullsFirst = 'delegator_pubKey_DESC_NULLS_FIRST',
  DelegatorPubKeyDescNullsLast = 'delegator_pubKey_DESC_NULLS_LAST',
  DelegatorThresholdAsc = 'delegator_threshold_ASC',
  DelegatorThresholdAscNullsFirst = 'delegator_threshold_ASC_NULLS_FIRST',
  DelegatorThresholdAscNullsLast = 'delegator_threshold_ASC_NULLS_LAST',
  DelegatorThresholdDesc = 'delegator_threshold_DESC',
  DelegatorThresholdDescNullsFirst = 'delegator_threshold_DESC_NULLS_FIRST',
  DelegatorThresholdDescNullsLast = 'delegator_threshold_DESC_NULLS_LAST',
  ExtrinsicIndexAsc = 'extrinsicIndex_ASC',
  ExtrinsicIndexAscNullsFirst = 'extrinsicIndex_ASC_NULLS_FIRST',
  ExtrinsicIndexAscNullsLast = 'extrinsicIndex_ASC_NULLS_LAST',
  ExtrinsicIndexDesc = 'extrinsicIndex_DESC',
  ExtrinsicIndexDescNullsFirst = 'extrinsicIndex_DESC_NULLS_FIRST',
  ExtrinsicIndexDescNullsLast = 'extrinsicIndex_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  TypeAsc = 'type_ASC',
  TypeAscNullsFirst = 'type_ASC_NULLS_FIRST',
  TypeAscNullsLast = 'type_ASC_NULLS_LAST',
  TypeDesc = 'type_DESC',
  TypeDescNullsFirst = 'type_DESC_NULLS_FIRST',
  TypeDescNullsLast = 'type_DESC_NULLS_LAST'
}

export type ProxyAccountWhereInput = {
  AND?: InputMaybe<Array<ProxyAccountWhereInput>>;
  OR?: InputMaybe<Array<ProxyAccountWhereInput>>;
  createdAt_eq?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  createdAt_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  createdAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_not_eq?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_not_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  creationBlockNumber_eq?: InputMaybe<Scalars['Int']['input']>;
  creationBlockNumber_gt?: InputMaybe<Scalars['Int']['input']>;
  creationBlockNumber_gte?: InputMaybe<Scalars['Int']['input']>;
  creationBlockNumber_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  creationBlockNumber_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  creationBlockNumber_lt?: InputMaybe<Scalars['Int']['input']>;
  creationBlockNumber_lte?: InputMaybe<Scalars['Int']['input']>;
  creationBlockNumber_not_eq?: InputMaybe<Scalars['Int']['input']>;
  creationBlockNumber_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  delay_eq?: InputMaybe<Scalars['Int']['input']>;
  delay_gt?: InputMaybe<Scalars['Int']['input']>;
  delay_gte?: InputMaybe<Scalars['Int']['input']>;
  delay_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  delay_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  delay_lt?: InputMaybe<Scalars['Int']['input']>;
  delay_lte?: InputMaybe<Scalars['Int']['input']>;
  delay_not_eq?: InputMaybe<Scalars['Int']['input']>;
  delay_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  delegatee?: InputMaybe<AccountWhereInput>;
  delegatee_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  delegator?: InputMaybe<AccountWhereInput>;
  delegator_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  extrinsicIndex_eq?: InputMaybe<Scalars['Int']['input']>;
  extrinsicIndex_gt?: InputMaybe<Scalars['Int']['input']>;
  extrinsicIndex_gte?: InputMaybe<Scalars['Int']['input']>;
  extrinsicIndex_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  extrinsicIndex_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  extrinsicIndex_lt?: InputMaybe<Scalars['Int']['input']>;
  extrinsicIndex_lte?: InputMaybe<Scalars['Int']['input']>;
  extrinsicIndex_not_eq?: InputMaybe<Scalars['Int']['input']>;
  extrinsicIndex_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  type_eq?: InputMaybe<ProxyType>;
  type_in?: InputMaybe<Array<ProxyType>>;
  type_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  type_not_eq?: InputMaybe<ProxyType>;
  type_not_in?: InputMaybe<Array<ProxyType>>;
};

export type ProxyAccountsConnection = {
  __typename?: 'ProxyAccountsConnection';
  edges: Array<ProxyAccountEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export enum ProxyType {
  Any = 'Any',
  Auction = 'Auction',
  CancelProxy = 'CancelProxy',
  Governance = 'Governance',
  IdentityJudgement = 'IdentityJudgement',
  NominationPools = 'NominationPools',
  NonTransfer = 'NonTransfer',
  Society = 'Society',
  Staking = 'Staking',
  SudoBalances = 'SudoBalances',
  Unknown = 'Unknown'
}

export type Query = {
  __typename?: 'Query';
  accountById?: Maybe<Account>;
  accountMultisigById?: Maybe<AccountMultisig>;
  accountMultisigs: Array<AccountMultisig>;
  accountMultisigsConnection: AccountMultisigsConnection;
  accounts: Array<Account>;
  accountsConnection: AccountsConnection;
  multisigCallById?: Maybe<MultisigCall>;
  multisigCalls: Array<MultisigCall>;
  multisigCallsConnection: MultisigCallsConnection;
  proxyAccountById?: Maybe<ProxyAccount>;
  proxyAccounts: Array<ProxyAccount>;
  proxyAccountsConnection: ProxyAccountsConnection;
  squidStatus?: Maybe<SquidStatus>;
};


export type QueryAccountByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryAccountMultisigByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryAccountMultisigsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AccountMultisigOrderByInput>>;
  where?: InputMaybe<AccountMultisigWhereInput>;
};


export type QueryAccountMultisigsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<AccountMultisigOrderByInput>;
  where?: InputMaybe<AccountMultisigWhereInput>;
};


export type QueryAccountsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AccountOrderByInput>>;
  where?: InputMaybe<AccountWhereInput>;
};


export type QueryAccountsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<AccountOrderByInput>;
  where?: InputMaybe<AccountWhereInput>;
};


export type QueryMultisigCallByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryMultisigCallsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<MultisigCallOrderByInput>>;
  where?: InputMaybe<MultisigCallWhereInput>;
};


export type QueryMultisigCallsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<MultisigCallOrderByInput>;
  where?: InputMaybe<MultisigCallWhereInput>;
};


export type QueryProxyAccountByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryProxyAccountsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ProxyAccountOrderByInput>>;
  where?: InputMaybe<ProxyAccountWhereInput>;
};


export type QueryProxyAccountsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<ProxyAccountOrderByInput>;
  where?: InputMaybe<ProxyAccountWhereInput>;
};

export type SquidStatus = {
  __typename?: 'SquidStatus';
  /** The hash of the last processed finalized block */
  finalizedHash?: Maybe<Scalars['String']['output']>;
  /** The height of the last processed finalized block */
  finalizedHeight?: Maybe<Scalars['Int']['output']>;
  /** The hash of the last processed block */
  hash?: Maybe<Scalars['String']['output']>;
  /** The height of the last processed block */
  height?: Maybe<Scalars['Int']['output']>;
};

export type MultisigByIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type MultisigByIdQuery = { __typename?: 'Query', accounts: Array<{ __typename?: 'Account', id: string, threshold?: number | null, signatories: Array<{ __typename?: 'AccountMultisig', id: string, signatory: { __typename?: 'Account', id: string, pubKey: string } }> }> };

export type MultisigsAndPureByAccountQueryVariables = Exact<{
  accountIds?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
  watchedAccountIds?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
}>;


export type MultisigsAndPureByAccountQuery = { __typename?: 'Query', accounts: Array<{ __typename?: 'Account', id: string, pubKey: string, isMultisig?: boolean | null, isPureProxy?: boolean | null, threshold?: number | null, signatories: Array<{ __typename?: 'AccountMultisig', id: string, signatory: { __typename?: 'Account', id: string, pubKey: string } }>, delegateeFor: Array<{ __typename?: 'ProxyAccount', id: string, type: ProxyType, delegator: { __typename?: 'Account', id: string, pubKey: string, isPureProxy?: boolean | null }, delegatee: { __typename?: 'Account', id: string, pubKey: string, isPureProxy?: boolean | null } }>, delegatorFor: Array<{ __typename?: 'ProxyAccount', id: string, type: ProxyType, delegatee: { __typename?: 'Account', id: string, pubKey: string, isMultisig?: boolean | null, threshold?: number | null, signatories: Array<{ __typename?: 'AccountMultisig', id: string, signatory: { __typename?: 'Account', id: string, pubKey: string } }> } }> }> };


export const MultisigByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MultisigById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accounts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"isMultisig_eq"},"value":{"kind":"BooleanValue","value":true}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"threshold"}},{"kind":"Field","name":{"kind":"Name","value":"signatories"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"50"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"signatory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"pubKey"}}]}}]}}]}}]}}]} as unknown as DocumentNode<MultisigByIdQuery, MultisigByIdQueryVariables>;
export const MultisigsAndPureByAccountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MultisigsAndPureByAccount"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"accountIds"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"watchedAccountIds"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accounts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"AND"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"OR"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id_in"},"value":{"kind":"Variable","name":{"kind":"Name","value":"watchedAccountIds"}}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"signatories_some"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"signatory"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id_in"},"value":{"kind":"Variable","name":{"kind":"Name","value":"accountIds"}}}]}}]}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"signatories_some"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"signatory"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id_in"},"value":{"kind":"Variable","name":{"kind":"Name","value":"watchedAccountIds"}}}]}}]}}]}]}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"OR"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"isMultisig_eq"},"value":{"kind":"BooleanValue","value":true}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"isPureProxy_eq"},"value":{"kind":"BooleanValue","value":true}}]}]}}]}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"pubKey"}},{"kind":"Field","name":{"kind":"Name","value":"isMultisig"}},{"kind":"Field","name":{"kind":"Name","value":"isPureProxy"}},{"kind":"Field","name":{"kind":"Name","value":"threshold"}},{"kind":"Field","name":{"kind":"Name","value":"signatories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"signatory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"pubKey"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"delegateeFor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"delegator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"pubKey"}},{"kind":"Field","name":{"kind":"Name","value":"isPureProxy"}}]}},{"kind":"Field","name":{"kind":"Name","value":"delegatee"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"pubKey"}},{"kind":"Field","name":{"kind":"Name","value":"isPureProxy"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"delegatorFor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"delegatee"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"pubKey"}},{"kind":"Field","name":{"kind":"Name","value":"isMultisig"}},{"kind":"Field","name":{"kind":"Name","value":"threshold"}},{"kind":"Field","name":{"kind":"Name","value":"signatories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"signatory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"pubKey"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<MultisigsAndPureByAccountQuery, MultisigsAndPureByAccountQueryVariables>;