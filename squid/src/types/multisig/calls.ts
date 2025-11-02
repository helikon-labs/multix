import {sts, Block, Bytes, Option, Result, CallType, RuntimeCtx} from '../support'
import * as v2005 from '../v2005'
import * as v2007 from '../v2007'
import * as v2011 from '../v2011'
import * as v2013 from '../v2013'
import * as v2015 from '../v2015'
import * as v2022 from '../v2022'
import * as v2023 from '../v2023'
import * as v2024 from '../v2024'
import * as v2025 from '../v2025'
import * as v2026 from '../v2026'
import * as v2028 from '../v2028'
import * as v2029 from '../v2029'
import * as v2030 from '../v2030'
import * as v9010 from '../v9010'
import * as v9030 from '../v9030'
import * as v9040 from '../v9040'
import * as v9050 from '../v9050'
import * as v9080 from '../v9080'
import * as v9090 from '../v9090'
import * as v9100 from '../v9100'
import * as v9111 from '../v9111'
import * as v9122 from '../v9122'
import * as v9130 from '../v9130'
import * as v9160 from '../v9160'
import * as v9170 from '../v9170'
import * as v9180 from '../v9180'
import * as v9190 from '../v9190'
import * as v9220 from '../v9220'
import * as v9230 from '../v9230'
import * as v9250 from '../v9250'
import * as v9271 from '../v9271'
import * as v9291 from '../v9291'
import * as v9300 from '../v9300'
import * as v9320 from '../v9320'
import * as v9340 from '../v9340'
import * as v9350 from '../v9350'
import * as v9370 from '../v9370'
import * as v9381 from '../v9381'
import * as v9420 from '../v9420'
import * as v9430 from '../v9430'
import * as v1000000 from '../v1000000'
import * as v1001000 from '../v1001000'
import * as v1002000 from '../v1002000'
import * as v1002004 from '../v1002004'
import * as v1002005 from '../v1002005'
import * as v1002006 from '../v1002006'
import * as v1003000 from '../v1003000'
import * as v1004000 from '../v1004000'
import * as v1004001 from '../v1004001'
import * as v1005000 from '../v1005000'
import * as v1006001 from '../v1006001'
import * as v1007001 from '../v1007001'
import * as v1009001 from '../v1009001'

export const asMulti =  {
    name: 'Multisig.as_multi',
    /**
     *  Register approval for a dispatch to be made from a deterministic composite account if
     *  approved by a total of `threshold - 1` of `other_signatories`.
     * 
     *  If there are enough, then dispatch the call. Calls must each fulfil the `IsCallable`
     *  filter.
     * 
     *  Payment: `DepositBase` will be reserved if this is the first approval, plus
     *  `threshold` times `DepositFactor`. It is returned once this dispatch happens or
     *  is cancelled.
     * 
     *  The dispatch origin for this call must be _Signed_.
     * 
     *  - `threshold`: The total number of approvals for this dispatch before it is executed.
     *  - `other_signatories`: The accounts (other than the sender) who can approve this
     *  dispatch. May not be empty.
     *  - `maybe_timepoint`: If this is the first approval, then this must be `None`. If it is
     *  not the first approval, then it must be `Some`, with the timepoint (block number and
     *  transaction index) of the first approval transaction.
     *  - `call`: The call to be executed.
     * 
     *  NOTE: Unless this is the final approval, you will generally want to use
     *  `approve_as_multi` instead, since it only requires a hash of the call.
     * 
     *  Result is equivalent to the dispatched result if `threshold` is exactly `1`. Otherwise
     *  on success, result is `Ok` and the result from the interior call, if it was executed,
     *  may be found in the deposited `MultisigExecuted` event.
     * 
     *  # <weight>
     *  - `O(S + Z + Call)`.
     *  - Up to one balance-reserve or unreserve operation.
     *  - One passthrough operation, one insert, both `O(S)` where `S` is the number of
     *    signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
     *  - One call encode & hash, both of complexity `O(Z)` where `Z` is tx-len.
     *  - One encode & hash, both of complexity `O(S)`.
     *  - Up to one binary search and insert (`O(logS + S)`).
     *  - I/O: 1 read `O(S)`, up to 1 mutate `O(S)`. Up to one remove.
     *  - One event.
     *  - The weight of the `call`.
     *  - Storage: inserts one item, value size bounded by `MaxSignatories`, with a
     *    deposit taken for its lifetime of
     *    `DepositBase + threshold * DepositFactor`.
     *  -------------------------------
     *  - Base Weight:
     *      - Create: 46.55 + 0.089 * S µs
     *      - Approve: 34.03 + .112 * S µs
     *      - Complete: 40.36 + .225 * S µs
     *  - DB Weight:
     *      - Reads: Multisig Storage, [Caller Account]
     *      - Writes: Multisig Storage, [Caller Account]
     *  - Plus Call Weight
     *  # </weight>
     */
    v2005: new CallType(
        'Multisig.as_multi',
        sts.struct({
            threshold: sts.number(),
            otherSignatories: sts.array(() => v2005.AccountId),
            maybeTimepoint: sts.option(() => v2005.Timepoint),
            call: v2005.Type_188,
        })
    ),
    /**
     *  Register approval for a dispatch to be made from a deterministic composite account if
     *  approved by a total of `threshold - 1` of `other_signatories`.
     * 
     *  If there are enough, then dispatch the call. Calls must each fulfil the `IsCallable`
     *  filter.
     * 
     *  Payment: `DepositBase` will be reserved if this is the first approval, plus
     *  `threshold` times `DepositFactor`. It is returned once this dispatch happens or
     *  is cancelled.
     * 
     *  The dispatch origin for this call must be _Signed_.
     * 
     *  - `threshold`: The total number of approvals for this dispatch before it is executed.
     *  - `other_signatories`: The accounts (other than the sender) who can approve this
     *  dispatch. May not be empty.
     *  - `maybe_timepoint`: If this is the first approval, then this must be `None`. If it is
     *  not the first approval, then it must be `Some`, with the timepoint (block number and
     *  transaction index) of the first approval transaction.
     *  - `call`: The call to be executed.
     * 
     *  NOTE: Unless this is the final approval, you will generally want to use
     *  `approve_as_multi` instead, since it only requires a hash of the call.
     * 
     *  Result is equivalent to the dispatched result if `threshold` is exactly `1`. Otherwise
     *  on success, result is `Ok` and the result from the interior call, if it was executed,
     *  may be found in the deposited `MultisigExecuted` event.
     * 
     *  # <weight>
     *  - `O(S + Z + Call)`.
     *  - Up to one balance-reserve or unreserve operation.
     *  - One passthrough operation, one insert, both `O(S)` where `S` is the number of
     *    signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
     *  - One call encode & hash, both of complexity `O(Z)` where `Z` is tx-len.
     *  - One encode & hash, both of complexity `O(S)`.
     *  - Up to one binary search and insert (`O(logS + S)`).
     *  - I/O: 1 read `O(S)`, up to 1 mutate `O(S)`. Up to one remove.
     *  - One event.
     *  - The weight of the `call`.
     *  - Storage: inserts one item, value size bounded by `MaxSignatories`, with a
     *    deposit taken for its lifetime of
     *    `DepositBase + threshold * DepositFactor`.
     *  -------------------------------
     *  - Base Weight:
     *      - Create: 46.55 + 0.089 * S µs
     *      - Approve: 34.03 + .112 * S µs
     *      - Complete: 40.36 + .225 * S µs
     *  - DB Weight:
     *      - Reads: Multisig Storage, [Caller Account]
     *      - Writes: Multisig Storage, [Caller Account]
     *  - Plus Call Weight
     *  # </weight>
     */
    v2007: new CallType(
        'Multisig.as_multi',
        sts.struct({
            threshold: sts.number(),
            otherSignatories: sts.array(() => v2007.AccountId),
            maybeTimepoint: sts.option(() => v2007.Timepoint),
            call: v2007.Type_189,
        })
    ),
    /**
     *  Register approval for a dispatch to be made from a deterministic composite account if
     *  approved by a total of `threshold - 1` of `other_signatories`.
     * 
     *  If there are enough, then dispatch the call.
     * 
     *  Payment: `DepositBase` will be reserved if this is the first approval, plus
     *  `threshold` times `DepositFactor`. It is returned once this dispatch happens or
     *  is cancelled.
     * 
     *  The dispatch origin for this call must be _Signed_.
     * 
     *  - `threshold`: The total number of approvals for this dispatch before it is executed.
     *  - `other_signatories`: The accounts (other than the sender) who can approve this
     *  dispatch. May not be empty.
     *  - `maybe_timepoint`: If this is the first approval, then this must be `None`. If it is
     *  not the first approval, then it must be `Some`, with the timepoint (block number and
     *  transaction index) of the first approval transaction.
     *  - `call`: The call to be executed.
     * 
     *  NOTE: Unless this is the final approval, you will generally want to use
     *  `approve_as_multi` instead, since it only requires a hash of the call.
     * 
     *  Result is equivalent to the dispatched result if `threshold` is exactly `1`. Otherwise
     *  on success, result is `Ok` and the result from the interior call, if it was executed,
     *  may be found in the deposited `MultisigExecuted` event.
     * 
     *  # <weight>
     *  - `O(S + Z + Call)`.
     *  - Up to one balance-reserve or unreserve operation.
     *  - One passthrough operation, one insert, both `O(S)` where `S` is the number of
     *    signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
     *  - One call encode & hash, both of complexity `O(Z)` where `Z` is tx-len.
     *  - One encode & hash, both of complexity `O(S)`.
     *  - Up to one binary search and insert (`O(logS + S)`).
     *  - I/O: 1 read `O(S)`, up to 1 mutate `O(S)`. Up to one remove.
     *  - One event.
     *  - The weight of the `call`.
     *  - Storage: inserts one item, value size bounded by `MaxSignatories`, with a
     *    deposit taken for its lifetime of
     *    `DepositBase + threshold * DepositFactor`.
     *  -------------------------------
     *  - Base Weight:
     *      - Create:          41.89 + 0.118 * S + .002 * Z µs
     *      - Create w/ Store: 53.57 + 0.119 * S + .003 * Z µs
     *      - Approve:         31.39 + 0.136 * S + .002 * Z µs
     *      - Complete:        39.94 + 0.26  * S + .002 * Z µs
     *  - DB Weight:
     *      - Reads: Multisig Storage, [Caller Account], Calls (if `store_call`)
     *      - Writes: Multisig Storage, [Caller Account], Calls (if `store_call`)
     *  - Plus Call Weight
     *  # </weight>
     */
    v2011: new CallType(
        'Multisig.as_multi',
        sts.struct({
            threshold: sts.number(),
            otherSignatories: sts.array(() => v2011.AccountId),
            maybeTimepoint: sts.option(() => v2011.Timepoint),
            call: sts.bytes(),
            storeCall: sts.boolean(),
            maxWeight: v2011.Weight,
        })
    ),
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
     * # <weight>
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
     * -------------------------------
     * - DB Weight:
     *     - Reads: Multisig Storage, [Caller Account], Calls (if `store_call`)
     *     - Writes: Multisig Storage, [Caller Account], Calls (if `store_call`)
     * - Plus Call Weight
     * # </weight>
     */
    v9291: new CallType(
        'Multisig.as_multi',
        sts.struct({
            threshold: sts.number(),
            otherSignatories: sts.array(() => v9291.AccountId32),
            maybeTimepoint: sts.option(() => v9291.Timepoint),
            call: sts.bytes(),
            storeCall: sts.boolean(),
            maxWeight: v9291.Weight,
        })
    ),
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
     * # <weight>
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
     * -------------------------------
     * - DB Weight:
     *     - Reads: Multisig Storage, [Caller Account]
     *     - Writes: Multisig Storage, [Caller Account]
     * - Plus Call Weight
     * # </weight>
     */
    v9320: new CallType(
        'Multisig.as_multi',
        sts.struct({
            threshold: sts.number(),
            otherSignatories: sts.array(() => v9320.AccountId32),
            maybeTimepoint: sts.option(() => v9320.Timepoint),
            call: v9320.Call,
            maxWeight: v9320.Weight,
        })
    ),
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
     * # <weight>
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
     * -------------------------------
     * - DB Weight:
     *     - Reads: Multisig Storage, [Caller Account]
     *     - Writes: Multisig Storage, [Caller Account]
     * - Plus Call Weight
     * # </weight>
     */
    v9340: new CallType(
        'Multisig.as_multi',
        sts.struct({
            threshold: sts.number(),
            otherSignatories: sts.array(() => v9340.AccountId32),
            maybeTimepoint: sts.option(() => v9340.Timepoint),
            call: v9340.Call,
            maxWeight: v9340.Weight,
        })
    ),
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
     * # <weight>
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
     * -------------------------------
     * - DB Weight:
     *     - Reads: Multisig Storage, [Caller Account]
     *     - Writes: Multisig Storage, [Caller Account]
     * - Plus Call Weight
     * # </weight>
     */
    v9350: new CallType(
        'Multisig.as_multi',
        sts.struct({
            threshold: sts.number(),
            otherSignatories: sts.array(() => v9350.AccountId32),
            maybeTimepoint: sts.option(() => v9350.Timepoint),
            call: v9350.Call,
            maxWeight: v9350.Weight,
        })
    ),
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
     * # <weight>
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
     * -------------------------------
     * - DB Weight:
     *     - Reads: Multisig Storage, [Caller Account]
     *     - Writes: Multisig Storage, [Caller Account]
     * - Plus Call Weight
     * # </weight>
     */
    v9370: new CallType(
        'Multisig.as_multi',
        sts.struct({
            threshold: sts.number(),
            otherSignatories: sts.array(() => v9370.AccountId32),
            maybeTimepoint: sts.option(() => v9370.Timepoint),
            call: v9370.Call,
            maxWeight: v9370.Weight,
        })
    ),
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
     * # <weight>
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
     * -------------------------------
     * - DB Weight:
     *     - Reads: Multisig Storage, [Caller Account]
     *     - Writes: Multisig Storage, [Caller Account]
     * - Plus Call Weight
     * # </weight>
     */
    v9381: new CallType(
        'Multisig.as_multi',
        sts.struct({
            threshold: sts.number(),
            otherSignatories: sts.array(() => v9381.AccountId32),
            maybeTimepoint: sts.option(() => v9381.Timepoint),
            call: v9381.Call,
            maxWeight: v9381.Weight,
        })
    ),
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
    v9420: new CallType(
        'Multisig.as_multi',
        sts.struct({
            threshold: sts.number(),
            otherSignatories: sts.array(() => v9420.AccountId32),
            maybeTimepoint: sts.option(() => v9420.Timepoint),
            call: v9420.Call,
            maxWeight: v9420.Weight,
        })
    ),
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
    v9430: new CallType(
        'Multisig.as_multi',
        sts.struct({
            threshold: sts.number(),
            otherSignatories: sts.array(() => v9430.AccountId32),
            maybeTimepoint: sts.option(() => v9430.Timepoint),
            call: v9430.Call,
            maxWeight: v9430.Weight,
        })
    ),
    /**
     * See [`Pallet::as_multi`].
     */
    v1000000: new CallType(
        'Multisig.as_multi',
        sts.struct({
            threshold: sts.number(),
            otherSignatories: sts.array(() => v1000000.AccountId32),
            maybeTimepoint: sts.option(() => v1000000.Timepoint),
            call: v1000000.Call,
            maxWeight: v1000000.Weight,
        })
    ),
    /**
     * See [`Pallet::as_multi`].
     */
    v1001000: new CallType(
        'Multisig.as_multi',
        sts.struct({
            threshold: sts.number(),
            otherSignatories: sts.array(() => v1001000.AccountId32),
            maybeTimepoint: sts.option(() => v1001000.Timepoint),
            call: v1001000.Call,
            maxWeight: v1001000.Weight,
        })
    ),
    /**
     * See [`Pallet::as_multi`].
     */
    v1002000: new CallType(
        'Multisig.as_multi',
        sts.struct({
            threshold: sts.number(),
            otherSignatories: sts.array(() => v1002000.AccountId32),
            maybeTimepoint: sts.option(() => v1002000.Timepoint),
            call: v1002000.Call,
            maxWeight: v1002000.Weight,
        })
    ),
    /**
     * See [`Pallet::as_multi`].
     */
    v1002004: new CallType(
        'Multisig.as_multi',
        sts.struct({
            threshold: sts.number(),
            otherSignatories: sts.array(() => v1002004.AccountId32),
            maybeTimepoint: sts.option(() => v1002004.Timepoint),
            call: v1002004.Call,
            maxWeight: v1002004.Weight,
        })
    ),
    /**
     * See [`Pallet::as_multi`].
     */
    v1002005: new CallType(
        'Multisig.as_multi',
        sts.struct({
            threshold: sts.number(),
            otherSignatories: sts.array(() => v1002005.AccountId32),
            maybeTimepoint: sts.option(() => v1002005.Timepoint),
            call: v1002005.Call,
            maxWeight: v1002005.Weight,
        })
    ),
    /**
     * See [`Pallet::as_multi`].
     */
    v1002006: new CallType(
        'Multisig.as_multi',
        sts.struct({
            threshold: sts.number(),
            otherSignatories: sts.array(() => v1002006.AccountId32),
            maybeTimepoint: sts.option(() => v1002006.Timepoint),
            call: v1002006.Call,
            maxWeight: v1002006.Weight,
        })
    ),
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
    v1003000: new CallType(
        'Multisig.as_multi',
        sts.struct({
            threshold: sts.number(),
            otherSignatories: sts.array(() => v1003000.AccountId32),
            maybeTimepoint: sts.option(() => v1003000.Timepoint),
            call: v1003000.Call,
            maxWeight: v1003000.Weight,
        })
    ),
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
    v1004000: new CallType(
        'Multisig.as_multi',
        sts.struct({
            threshold: sts.number(),
            otherSignatories: sts.array(() => v1004000.AccountId32),
            maybeTimepoint: sts.option(() => v1004000.Timepoint),
            call: v1004000.Call,
            maxWeight: v1004000.Weight,
        })
    ),
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
    v1004001: new CallType(
        'Multisig.as_multi',
        sts.struct({
            threshold: sts.number(),
            otherSignatories: sts.array(() => v1004001.AccountId32),
            maybeTimepoint: sts.option(() => v1004001.Timepoint),
            call: v1004001.Call,
            maxWeight: v1004001.Weight,
        })
    ),
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
    v1005000: new CallType(
        'Multisig.as_multi',
        sts.struct({
            threshold: sts.number(),
            otherSignatories: sts.array(() => v1005000.AccountId32),
            maybeTimepoint: sts.option(() => v1005000.Timepoint),
            call: v1005000.Call,
            maxWeight: v1005000.Weight,
        })
    ),
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
    v1006001: new CallType(
        'Multisig.as_multi',
        sts.struct({
            threshold: sts.number(),
            otherSignatories: sts.array(() => v1006001.AccountId32),
            maybeTimepoint: sts.option(() => v1006001.Timepoint),
            call: v1006001.Call,
            maxWeight: v1006001.Weight,
        })
    ),
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
    v1007001: new CallType(
        'Multisig.as_multi',
        sts.struct({
            threshold: sts.number(),
            otherSignatories: sts.array(() => v1007001.AccountId32),
            maybeTimepoint: sts.option(() => v1007001.Timepoint),
            call: v1007001.Call,
            maxWeight: v1007001.Weight,
        })
    ),
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
    v1009001: new CallType(
        'Multisig.as_multi',
        sts.struct({
            threshold: sts.number(),
            otherSignatories: sts.array(() => v1009001.AccountId32),
            maybeTimepoint: sts.option(() => v1009001.Timepoint),
            call: v1009001.Call,
            maxWeight: v1009001.Weight,
        })
    ),
}

export const approveAsMulti =  {
    name: 'Multisig.approve_as_multi',
    /**
     *  Register approval for a dispatch to be made from a deterministic composite account if
     *  approved by a total of `threshold - 1` of `other_signatories`.
     * 
     *  Payment: `DepositBase` will be reserved if this is the first approval, plus
     *  `threshold` times `DepositFactor`. It is returned once this dispatch happens or
     *  is cancelled.
     * 
     *  The dispatch origin for this call must be _Signed_.
     * 
     *  - `threshold`: The total number of approvals for this dispatch before it is executed.
     *  - `other_signatories`: The accounts (other than the sender) who can approve this
     *  dispatch. May not be empty.
     *  - `maybe_timepoint`: If this is the first approval, then this must be `None`. If it is
     *  not the first approval, then it must be `Some`, with the timepoint (block number and
     *  transaction index) of the first approval transaction.
     *  - `call_hash`: The hash of the call to be executed.
     * 
     *  NOTE: If this is the final approval, you will want to use `as_multi` instead.
     * 
     *  # <weight>
     *  - `O(S)`.
     *  - Up to one balance-reserve or unreserve operation.
     *  - One passthrough operation, one insert, both `O(S)` where `S` is the number of
     *    signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
     *  - One encode & hash, both of complexity `O(S)`.
     *  - Up to one binary search and insert (`O(logS + S)`).
     *  - I/O: 1 read `O(S)`, up to 1 mutate `O(S)`. Up to one remove.
     *  - One event.
     *  - Storage: inserts one item, value size bounded by `MaxSignatories`, with a
     *    deposit taken for its lifetime of
     *    `DepositBase + threshold * DepositFactor`.
     *  ----------------------------------
     *  - Base Weight:
     *      - Create: 44.71 + 0.088 * S
     *      - Approve: 31.48 + 0.116 * S
     *  - DB Weight:
     *      - Read: Multisig Storage, [Caller Account]
     *      - Write: Multisig Storage, [Caller Account]
     *  # </weight>
     */
    v2005: new CallType(
        'Multisig.approve_as_multi',
        sts.struct({
            threshold: sts.number(),
            otherSignatories: sts.array(() => v2005.AccountId),
            maybeTimepoint: sts.option(() => v2005.Timepoint),
            callHash: sts.bytes(),
        })
    ),
    /**
     *  Register approval for a dispatch to be made from a deterministic composite account if
     *  approved by a total of `threshold - 1` of `other_signatories`.
     * 
     *  Payment: `DepositBase` will be reserved if this is the first approval, plus
     *  `threshold` times `DepositFactor`. It is returned once this dispatch happens or
     *  is cancelled.
     * 
     *  The dispatch origin for this call must be _Signed_.
     * 
     *  - `threshold`: The total number of approvals for this dispatch before it is executed.
     *  - `other_signatories`: The accounts (other than the sender) who can approve this
     *  dispatch. May not be empty.
     *  - `maybe_timepoint`: If this is the first approval, then this must be `None`. If it is
     *  not the first approval, then it must be `Some`, with the timepoint (block number and
     *  transaction index) of the first approval transaction.
     *  - `call_hash`: The hash of the call to be executed.
     * 
     *  NOTE: If this is the final approval, you will want to use `as_multi` instead.
     * 
     *  # <weight>
     *  - `O(S)`.
     *  - Up to one balance-reserve or unreserve operation.
     *  - One passthrough operation, one insert, both `O(S)` where `S` is the number of
     *    signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
     *  - One encode & hash, both of complexity `O(S)`.
     *  - Up to one binary search and insert (`O(logS + S)`).
     *  - I/O: 1 read `O(S)`, up to 1 mutate `O(S)`. Up to one remove.
     *  - One event.
     *  - Storage: inserts one item, value size bounded by `MaxSignatories`, with a
     *    deposit taken for its lifetime of
     *    `DepositBase + threshold * DepositFactor`.
     *  ----------------------------------
     *  - Base Weight:
     *      - Create: 44.71 + 0.088 * S
     *      - Approve: 31.48 + 0.116 * S
     *  - DB Weight:
     *      - Read: Multisig Storage, [Caller Account]
     *      - Write: Multisig Storage, [Caller Account]
     *  # </weight>
     */
    v2011: new CallType(
        'Multisig.approve_as_multi',
        sts.struct({
            threshold: sts.number(),
            otherSignatories: sts.array(() => v2011.AccountId),
            maybeTimepoint: sts.option(() => v2011.Timepoint),
            callHash: sts.bytes(),
            maxWeight: v2011.Weight,
        })
    ),
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
     * # <weight>
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
     * ----------------------------------
     * - DB Weight:
     *     - Read: Multisig Storage, [Caller Account]
     *     - Write: Multisig Storage, [Caller Account]
     * # </weight>
     */
    v9291: new CallType(
        'Multisig.approve_as_multi',
        sts.struct({
            threshold: sts.number(),
            otherSignatories: sts.array(() => v9291.AccountId32),
            maybeTimepoint: sts.option(() => v9291.Timepoint),
            callHash: sts.bytes(),
            maxWeight: v9291.Weight,
        })
    ),
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
     * # <weight>
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
     * ----------------------------------
     * - DB Weight:
     *     - Read: Multisig Storage, [Caller Account]
     *     - Write: Multisig Storage, [Caller Account]
     * # </weight>
     */
    v9320: new CallType(
        'Multisig.approve_as_multi',
        sts.struct({
            threshold: sts.number(),
            otherSignatories: sts.array(() => v9320.AccountId32),
            maybeTimepoint: sts.option(() => v9320.Timepoint),
            callHash: sts.bytes(),
            maxWeight: v9320.Weight,
        })
    ),
}

export const cancelAsMulti =  {
    name: 'Multisig.cancel_as_multi',
    /**
     *  Cancel a pre-existing, on-going multisig transaction. Any deposit reserved previously
     *  for this operation will be unreserved on success.
     * 
     *  The dispatch origin for this call must be _Signed_.
     * 
     *  - `threshold`: The total number of approvals for this dispatch before it is executed.
     *  - `other_signatories`: The accounts (other than the sender) who can approve this
     *  dispatch. May not be empty.
     *  - `timepoint`: The timepoint (block number and transaction index) of the first approval
     *  transaction for this dispatch.
     *  - `call_hash`: The hash of the call to be executed.
     * 
     *  # <weight>
     *  - `O(S)`.
     *  - Up to one balance-reserve or unreserve operation.
     *  - One passthrough operation, one insert, both `O(S)` where `S` is the number of
     *    signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
     *  - One encode & hash, both of complexity `O(S)`.
     *  - One event.
     *  - I/O: 1 read `O(S)`, one remove.
     *  - Storage: removes one item.
     *  ----------------------------------
     *  - Base Weight: 37.6 + 0.084 * S
     *  - DB Weight:
     *      - Read: Multisig Storage, [Caller Account]
     *      - Write: Multisig Storage, [Caller Account]
     *  # </weight>
     */
    v2005: new CallType(
        'Multisig.cancel_as_multi',
        sts.struct({
            threshold: sts.number(),
            otherSignatories: sts.array(() => v2005.AccountId),
            timepoint: v2005.Timepoint,
            callHash: sts.bytes(),
        })
    ),
}

export const asMultiThreshold1 =  {
    name: 'Multisig.as_multi_threshold_1',
    /**
     *  Immediately dispatch a multi-signature call using a single approval from the caller.
     * 
     *  The dispatch origin for this call must be _Signed_.
     * 
     *  - `other_signatories`: The accounts (other than the sender) who are part of the
     *  multi-signature, but do not participate in the approval process.
     *  - `call`: The call to be executed.
     * 
     *  Result is equivalent to the dispatched result.
     * 
     *  # <weight>
     *  O(Z + C) where Z is the length of the call and C its execution weight.
     *  -------------------------------
     *  - Base Weight: 33.72 + 0.002 * Z µs
     *  - DB Weight: None
     *  - Plus Call Weight
     *  # </weight>
     */
    v2011: new CallType(
        'Multisig.as_multi_threshold_1',
        sts.struct({
            otherSignatories: sts.array(() => v2011.AccountId),
            call: v2011.Type_190,
        })
    ),
    /**
     *  Immediately dispatch a multi-signature call using a single approval from the caller.
     * 
     *  The dispatch origin for this call must be _Signed_.
     * 
     *  - `other_signatories`: The accounts (other than the sender) who are part of the
     *  multi-signature, but do not participate in the approval process.
     *  - `call`: The call to be executed.
     * 
     *  Result is equivalent to the dispatched result.
     * 
     *  # <weight>
     *  O(Z + C) where Z is the length of the call and C its execution weight.
     *  -------------------------------
     *  - Base Weight: 33.72 + 0.002 * Z µs
     *  - DB Weight: None
     *  - Plus Call Weight
     *  # </weight>
     */
    v2013: new CallType(
        'Multisig.as_multi_threshold_1',
        sts.struct({
            otherSignatories: sts.array(() => v2013.AccountId),
            call: v2013.Type_190,
        })
    ),
    /**
     *  Immediately dispatch a multi-signature call using a single approval from the caller.
     * 
     *  The dispatch origin for this call must be _Signed_.
     * 
     *  - `other_signatories`: The accounts (other than the sender) who are part of the
     *  multi-signature, but do not participate in the approval process.
     *  - `call`: The call to be executed.
     * 
     *  Result is equivalent to the dispatched result.
     * 
     *  # <weight>
     *  O(Z + C) where Z is the length of the call and C its execution weight.
     *  -------------------------------
     *  - Base Weight: 33.72 + 0.002 * Z µs
     *  - DB Weight: None
     *  - Plus Call Weight
     *  # </weight>
     */
    v2015: new CallType(
        'Multisig.as_multi_threshold_1',
        sts.struct({
            otherSignatories: sts.array(() => v2015.AccountId),
            call: v2015.Type_192,
        })
    ),
    /**
     *  Immediately dispatch a multi-signature call using a single approval from the caller.
     * 
     *  The dispatch origin for this call must be _Signed_.
     * 
     *  - `other_signatories`: The accounts (other than the sender) who are part of the
     *  multi-signature, but do not participate in the approval process.
     *  - `call`: The call to be executed.
     * 
     *  Result is equivalent to the dispatched result.
     * 
     *  # <weight>
     *  O(Z + C) where Z is the length of the call and C its execution weight.
     *  -------------------------------
     *  - Base Weight: 33.72 + 0.002 * Z µs
     *  - DB Weight: None
     *  - Plus Call Weight
     *  # </weight>
     */
    v2022: new CallType(
        'Multisig.as_multi_threshold_1',
        sts.struct({
            otherSignatories: sts.array(() => v2022.AccountId),
            call: v2022.Type_192,
        })
    ),
    /**
     *  Immediately dispatch a multi-signature call using a single approval from the caller.
     * 
     *  The dispatch origin for this call must be _Signed_.
     * 
     *  - `other_signatories`: The accounts (other than the sender) who are part of the
     *  multi-signature, but do not participate in the approval process.
     *  - `call`: The call to be executed.
     * 
     *  Result is equivalent to the dispatched result.
     * 
     *  # <weight>
     *  O(Z + C) where Z is the length of the call and C its execution weight.
     *  -------------------------------
     *  - Base Weight: 33.72 + 0.002 * Z µs
     *  - DB Weight: None
     *  - Plus Call Weight
     *  # </weight>
     */
    v2023: new CallType(
        'Multisig.as_multi_threshold_1',
        sts.struct({
            otherSignatories: sts.array(() => v2023.AccountId),
            call: v2023.Type_194,
        })
    ),
    /**
     *  Immediately dispatch a multi-signature call using a single approval from the caller.
     * 
     *  The dispatch origin for this call must be _Signed_.
     * 
     *  - `other_signatories`: The accounts (other than the sender) who are part of the
     *  multi-signature, but do not participate in the approval process.
     *  - `call`: The call to be executed.
     * 
     *  Result is equivalent to the dispatched result.
     * 
     *  # <weight>
     *  O(Z + C) where Z is the length of the call and C its execution weight.
     *  -------------------------------
     *  - Base Weight: 33.72 + 0.002 * Z µs
     *  - DB Weight: None
     *  - Plus Call Weight
     *  # </weight>
     */
    v2024: new CallType(
        'Multisig.as_multi_threshold_1',
        sts.struct({
            otherSignatories: sts.array(() => v2024.AccountId),
            call: v2024.Type_194,
        })
    ),
    /**
     *  Immediately dispatch a multi-signature call using a single approval from the caller.
     * 
     *  The dispatch origin for this call must be _Signed_.
     * 
     *  - `other_signatories`: The accounts (other than the sender) who are part of the
     *  multi-signature, but do not participate in the approval process.
     *  - `call`: The call to be executed.
     * 
     *  Result is equivalent to the dispatched result.
     * 
     *  # <weight>
     *  O(Z + C) where Z is the length of the call and C its execution weight.
     *  -------------------------------
     *  - DB Weight: None
     *  - Plus Call Weight
     *  # </weight>
     */
    v2025: new CallType(
        'Multisig.as_multi_threshold_1',
        sts.struct({
            otherSignatories: sts.array(() => v2025.AccountId),
            call: v2025.Type_195,
        })
    ),
    /**
     *  Immediately dispatch a multi-signature call using a single approval from the caller.
     * 
     *  The dispatch origin for this call must be _Signed_.
     * 
     *  - `other_signatories`: The accounts (other than the sender) who are part of the
     *  multi-signature, but do not participate in the approval process.
     *  - `call`: The call to be executed.
     * 
     *  Result is equivalent to the dispatched result.
     * 
     *  # <weight>
     *  O(Z + C) where Z is the length of the call and C its execution weight.
     *  -------------------------------
     *  - DB Weight: None
     *  - Plus Call Weight
     *  # </weight>
     */
    v2026: new CallType(
        'Multisig.as_multi_threshold_1',
        sts.struct({
            otherSignatories: sts.array(() => v2026.AccountId),
            call: v2026.Type_194,
        })
    ),
    /**
     *  Immediately dispatch a multi-signature call using a single approval from the caller.
     * 
     *  The dispatch origin for this call must be _Signed_.
     * 
     *  - `other_signatories`: The accounts (other than the sender) who are part of the
     *  multi-signature, but do not participate in the approval process.
     *  - `call`: The call to be executed.
     * 
     *  Result is equivalent to the dispatched result.
     * 
     *  # <weight>
     *  O(Z + C) where Z is the length of the call and C its execution weight.
     *  -------------------------------
     *  - DB Weight: None
     *  - Plus Call Weight
     *  # </weight>
     */
    v2028: new CallType(
        'Multisig.as_multi_threshold_1',
        sts.struct({
            otherSignatories: sts.array(() => v2028.AccountId),
            call: v2028.Type_199,
        })
    ),
    /**
     *  Immediately dispatch a multi-signature call using a single approval from the caller.
     * 
     *  The dispatch origin for this call must be _Signed_.
     * 
     *  - `other_signatories`: The accounts (other than the sender) who are part of the
     *  multi-signature, but do not participate in the approval process.
     *  - `call`: The call to be executed.
     * 
     *  Result is equivalent to the dispatched result.
     * 
     *  # <weight>
     *  O(Z + C) where Z is the length of the call and C its execution weight.
     *  -------------------------------
     *  - DB Weight: None
     *  - Plus Call Weight
     *  # </weight>
     */
    v2029: new CallType(
        'Multisig.as_multi_threshold_1',
        sts.struct({
            otherSignatories: sts.array(() => v2029.AccountId),
            call: v2029.Type_199,
        })
    ),
    /**
     *  Immediately dispatch a multi-signature call using a single approval from the caller.
     * 
     *  The dispatch origin for this call must be _Signed_.
     * 
     *  - `other_signatories`: The accounts (other than the sender) who are part of the
     *  multi-signature, but do not participate in the approval process.
     *  - `call`: The call to be executed.
     * 
     *  Result is equivalent to the dispatched result.
     * 
     *  # <weight>
     *  O(Z + C) where Z is the length of the call and C its execution weight.
     *  -------------------------------
     *  - DB Weight: None
     *  - Plus Call Weight
     *  # </weight>
     */
    v2030: new CallType(
        'Multisig.as_multi_threshold_1',
        sts.struct({
            otherSignatories: sts.array(() => v2030.AccountId),
            call: v2030.Type_138,
        })
    ),
    /**
     *  Immediately dispatch a multi-signature call using a single approval from the caller.
     * 
     *  The dispatch origin for this call must be _Signed_.
     * 
     *  - `other_signatories`: The accounts (other than the sender) who are part of the
     *  multi-signature, but do not participate in the approval process.
     *  - `call`: The call to be executed.
     * 
     *  Result is equivalent to the dispatched result.
     * 
     *  # <weight>
     *  O(Z + C) where Z is the length of the call and C its execution weight.
     *  -------------------------------
     *  - DB Weight: None
     *  - Plus Call Weight
     *  # </weight>
     */
    v9010: new CallType(
        'Multisig.as_multi_threshold_1',
        sts.struct({
            otherSignatories: sts.array(() => v9010.AccountId),
            call: v9010.Type_138,
        })
    ),
    /**
     *  Immediately dispatch a multi-signature call using a single approval from the caller.
     * 
     *  The dispatch origin for this call must be _Signed_.
     * 
     *  - `other_signatories`: The accounts (other than the sender) who are part of the
     *  multi-signature, but do not participate in the approval process.
     *  - `call`: The call to be executed.
     * 
     *  Result is equivalent to the dispatched result.
     * 
     *  # <weight>
     *  O(Z + C) where Z is the length of the call and C its execution weight.
     *  -------------------------------
     *  - DB Weight: None
     *  - Plus Call Weight
     *  # </weight>
     */
    v9030: new CallType(
        'Multisig.as_multi_threshold_1',
        sts.struct({
            otherSignatories: sts.array(() => v9030.AccountId),
            call: v9030.Type_138,
        })
    ),
    /**
     *  Immediately dispatch a multi-signature call using a single approval from the caller.
     * 
     *  The dispatch origin for this call must be _Signed_.
     * 
     *  - `other_signatories`: The accounts (other than the sender) who are part of the
     *  multi-signature, but do not participate in the approval process.
     *  - `call`: The call to be executed.
     * 
     *  Result is equivalent to the dispatched result.
     * 
     *  # <weight>
     *  O(Z + C) where Z is the length of the call and C its execution weight.
     *  -------------------------------
     *  - DB Weight: None
     *  - Plus Call Weight
     *  # </weight>
     */
    v9040: new CallType(
        'Multisig.as_multi_threshold_1',
        sts.struct({
            otherSignatories: sts.array(() => v9040.AccountId),
            call: v9040.Type_138,
        })
    ),
    /**
     *  Immediately dispatch a multi-signature call using a single approval from the caller.
     * 
     *  The dispatch origin for this call must be _Signed_.
     * 
     *  - `other_signatories`: The accounts (other than the sender) who are part of the
     *  multi-signature, but do not participate in the approval process.
     *  - `call`: The call to be executed.
     * 
     *  Result is equivalent to the dispatched result.
     * 
     *  # <weight>
     *  O(Z + C) where Z is the length of the call and C its execution weight.
     *  -------------------------------
     *  - DB Weight: None
     *  - Plus Call Weight
     *  # </weight>
     */
    v9050: new CallType(
        'Multisig.as_multi_threshold_1',
        sts.struct({
            otherSignatories: sts.array(() => v9050.AccountId),
            call: v9050.Type_139,
        })
    ),
    /**
     *  Immediately dispatch a multi-signature call using a single approval from the caller.
     * 
     *  The dispatch origin for this call must be _Signed_.
     * 
     *  - `other_signatories`: The accounts (other than the sender) who are part of the
     *  multi-signature, but do not participate in the approval process.
     *  - `call`: The call to be executed.
     * 
     *  Result is equivalent to the dispatched result.
     * 
     *  # <weight>
     *  O(Z + C) where Z is the length of the call and C its execution weight.
     *  -------------------------------
     *  - DB Weight: None
     *  - Plus Call Weight
     *  # </weight>
     */
    v9080: new CallType(
        'Multisig.as_multi_threshold_1',
        sts.struct({
            otherSignatories: sts.array(() => v9080.AccountId),
            call: v9080.Type_138,
        })
    ),
    /**
     *  Immediately dispatch a multi-signature call using a single approval from the caller.
     * 
     *  The dispatch origin for this call must be _Signed_.
     * 
     *  - `other_signatories`: The accounts (other than the sender) who are part of the
     *  multi-signature, but do not participate in the approval process.
     *  - `call`: The call to be executed.
     * 
     *  Result is equivalent to the dispatched result.
     * 
     *  # <weight>
     *  O(Z + C) where Z is the length of the call and C its execution weight.
     *  -------------------------------
     *  - DB Weight: None
     *  - Plus Call Weight
     *  # </weight>
     */
    v9090: new CallType(
        'Multisig.as_multi_threshold_1',
        sts.struct({
            otherSignatories: sts.array(() => v9090.AccountId),
            call: v9090.Type_138,
        })
    ),
    /**
     *  Immediately dispatch a multi-signature call using a single approval from the caller.
     * 
     *  The dispatch origin for this call must be _Signed_.
     * 
     *  - `other_signatories`: The accounts (other than the sender) who are part of the
     *  multi-signature, but do not participate in the approval process.
     *  - `call`: The call to be executed.
     * 
     *  Result is equivalent to the dispatched result.
     * 
     *  # <weight>
     *  O(Z + C) where Z is the length of the call and C its execution weight.
     *  -------------------------------
     *  - DB Weight: None
     *  - Plus Call Weight
     *  # </weight>
     */
    v9100: new CallType(
        'Multisig.as_multi_threshold_1',
        sts.struct({
            otherSignatories: sts.array(() => v9100.AccountId),
            call: v9100.Type_138,
        })
    ),
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
     * # <weight>
     * O(Z + C) where Z is the length of the call and C its execution weight.
     * -------------------------------
     * - DB Weight: None
     * - Plus Call Weight
     * # </weight>
     */
    v9111: new CallType(
        'Multisig.as_multi_threshold_1',
        sts.struct({
            otherSignatories: sts.array(() => v9111.AccountId32),
            call: v9111.Call,
        })
    ),
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
     * # <weight>
     * O(Z + C) where Z is the length of the call and C its execution weight.
     * -------------------------------
     * - DB Weight: None
     * - Plus Call Weight
     * # </weight>
     */
    v9122: new CallType(
        'Multisig.as_multi_threshold_1',
        sts.struct({
            otherSignatories: sts.array(() => v9122.AccountId32),
            call: v9122.Call,
        })
    ),
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
     * # <weight>
     * O(Z + C) where Z is the length of the call and C its execution weight.
     * -------------------------------
     * - DB Weight: None
     * - Plus Call Weight
     * # </weight>
     */
    v9130: new CallType(
        'Multisig.as_multi_threshold_1',
        sts.struct({
            otherSignatories: sts.array(() => v9130.AccountId32),
            call: v9130.Call,
        })
    ),
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
     * # <weight>
     * O(Z + C) where Z is the length of the call and C its execution weight.
     * -------------------------------
     * - DB Weight: None
     * - Plus Call Weight
     * # </weight>
     */
    v9160: new CallType(
        'Multisig.as_multi_threshold_1',
        sts.struct({
            otherSignatories: sts.array(() => v9160.AccountId32),
            call: v9160.Call,
        })
    ),
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
     * # <weight>
     * O(Z + C) where Z is the length of the call and C its execution weight.
     * -------------------------------
     * - DB Weight: None
     * - Plus Call Weight
     * # </weight>
     */
    v9170: new CallType(
        'Multisig.as_multi_threshold_1',
        sts.struct({
            otherSignatories: sts.array(() => v9170.AccountId32),
            call: v9170.Call,
        })
    ),
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
     * # <weight>
     * O(Z + C) where Z is the length of the call and C its execution weight.
     * -------------------------------
     * - DB Weight: None
     * - Plus Call Weight
     * # </weight>
     */
    v9180: new CallType(
        'Multisig.as_multi_threshold_1',
        sts.struct({
            otherSignatories: sts.array(() => v9180.AccountId32),
            call: v9180.Call,
        })
    ),
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
     * # <weight>
     * O(Z + C) where Z is the length of the call and C its execution weight.
     * -------------------------------
     * - DB Weight: None
     * - Plus Call Weight
     * # </weight>
     */
    v9190: new CallType(
        'Multisig.as_multi_threshold_1',
        sts.struct({
            otherSignatories: sts.array(() => v9190.AccountId32),
            call: v9190.Call,
        })
    ),
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
     * # <weight>
     * O(Z + C) where Z is the length of the call and C its execution weight.
     * -------------------------------
     * - DB Weight: None
     * - Plus Call Weight
     * # </weight>
     */
    v9220: new CallType(
        'Multisig.as_multi_threshold_1',
        sts.struct({
            otherSignatories: sts.array(() => v9220.AccountId32),
            call: v9220.Call,
        })
    ),
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
     * # <weight>
     * O(Z + C) where Z is the length of the call and C its execution weight.
     * -------------------------------
     * - DB Weight: None
     * - Plus Call Weight
     * # </weight>
     */
    v9230: new CallType(
        'Multisig.as_multi_threshold_1',
        sts.struct({
            otherSignatories: sts.array(() => v9230.AccountId32),
            call: v9230.Call,
        })
    ),
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
     * # <weight>
     * O(Z + C) where Z is the length of the call and C its execution weight.
     * -------------------------------
     * - DB Weight: None
     * - Plus Call Weight
     * # </weight>
     */
    v9250: new CallType(
        'Multisig.as_multi_threshold_1',
        sts.struct({
            otherSignatories: sts.array(() => v9250.AccountId32),
            call: v9250.Call,
        })
    ),
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
     * # <weight>
     * O(Z + C) where Z is the length of the call and C its execution weight.
     * -------------------------------
     * - DB Weight: None
     * - Plus Call Weight
     * # </weight>
     */
    v9271: new CallType(
        'Multisig.as_multi_threshold_1',
        sts.struct({
            otherSignatories: sts.array(() => v9271.AccountId32),
            call: v9271.Call,
        })
    ),
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
     * # <weight>
     * O(Z + C) where Z is the length of the call and C its execution weight.
     * -------------------------------
     * - DB Weight: None
     * - Plus Call Weight
     * # </weight>
     */
    v9291: new CallType(
        'Multisig.as_multi_threshold_1',
        sts.struct({
            otherSignatories: sts.array(() => v9291.AccountId32),
            call: v9291.Call,
        })
    ),
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
     * # <weight>
     * O(Z + C) where Z is the length of the call and C its execution weight.
     * -------------------------------
     * - DB Weight: None
     * - Plus Call Weight
     * # </weight>
     */
    v9300: new CallType(
        'Multisig.as_multi_threshold_1',
        sts.struct({
            otherSignatories: sts.array(() => v9300.AccountId32),
            call: v9300.Call,
        })
    ),
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
     * # <weight>
     * O(Z + C) where Z is the length of the call and C its execution weight.
     * -------------------------------
     * - DB Weight: None
     * - Plus Call Weight
     * # </weight>
     */
    v9320: new CallType(
        'Multisig.as_multi_threshold_1',
        sts.struct({
            otherSignatories: sts.array(() => v9320.AccountId32),
            call: v9320.Call,
        })
    ),
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
     * # <weight>
     * O(Z + C) where Z is the length of the call and C its execution weight.
     * -------------------------------
     * - DB Weight: None
     * - Plus Call Weight
     * # </weight>
     */
    v9340: new CallType(
        'Multisig.as_multi_threshold_1',
        sts.struct({
            otherSignatories: sts.array(() => v9340.AccountId32),
            call: v9340.Call,
        })
    ),
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
     * # <weight>
     * O(Z + C) where Z is the length of the call and C its execution weight.
     * -------------------------------
     * - DB Weight: None
     * - Plus Call Weight
     * # </weight>
     */
    v9350: new CallType(
        'Multisig.as_multi_threshold_1',
        sts.struct({
            otherSignatories: sts.array(() => v9350.AccountId32),
            call: v9350.Call,
        })
    ),
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
     * # <weight>
     * O(Z + C) where Z is the length of the call and C its execution weight.
     * -------------------------------
     * - DB Weight: None
     * - Plus Call Weight
     * # </weight>
     */
    v9370: new CallType(
        'Multisig.as_multi_threshold_1',
        sts.struct({
            otherSignatories: sts.array(() => v9370.AccountId32),
            call: v9370.Call,
        })
    ),
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
     * # <weight>
     * O(Z + C) where Z is the length of the call and C its execution weight.
     * -------------------------------
     * - DB Weight: None
     * - Plus Call Weight
     * # </weight>
     */
    v9381: new CallType(
        'Multisig.as_multi_threshold_1',
        sts.struct({
            otherSignatories: sts.array(() => v9381.AccountId32),
            call: v9381.Call,
        })
    ),
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
    v9420: new CallType(
        'Multisig.as_multi_threshold_1',
        sts.struct({
            otherSignatories: sts.array(() => v9420.AccountId32),
            call: v9420.Call,
        })
    ),
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
    v9430: new CallType(
        'Multisig.as_multi_threshold_1',
        sts.struct({
            otherSignatories: sts.array(() => v9430.AccountId32),
            call: v9430.Call,
        })
    ),
    /**
     * See [`Pallet::as_multi_threshold_1`].
     */
    v1000000: new CallType(
        'Multisig.as_multi_threshold_1',
        sts.struct({
            otherSignatories: sts.array(() => v1000000.AccountId32),
            call: v1000000.Call,
        })
    ),
    /**
     * See [`Pallet::as_multi_threshold_1`].
     */
    v1001000: new CallType(
        'Multisig.as_multi_threshold_1',
        sts.struct({
            otherSignatories: sts.array(() => v1001000.AccountId32),
            call: v1001000.Call,
        })
    ),
    /**
     * See [`Pallet::as_multi_threshold_1`].
     */
    v1002000: new CallType(
        'Multisig.as_multi_threshold_1',
        sts.struct({
            otherSignatories: sts.array(() => v1002000.AccountId32),
            call: v1002000.Call,
        })
    ),
    /**
     * See [`Pallet::as_multi_threshold_1`].
     */
    v1002004: new CallType(
        'Multisig.as_multi_threshold_1',
        sts.struct({
            otherSignatories: sts.array(() => v1002004.AccountId32),
            call: v1002004.Call,
        })
    ),
    /**
     * See [`Pallet::as_multi_threshold_1`].
     */
    v1002005: new CallType(
        'Multisig.as_multi_threshold_1',
        sts.struct({
            otherSignatories: sts.array(() => v1002005.AccountId32),
            call: v1002005.Call,
        })
    ),
    /**
     * See [`Pallet::as_multi_threshold_1`].
     */
    v1002006: new CallType(
        'Multisig.as_multi_threshold_1',
        sts.struct({
            otherSignatories: sts.array(() => v1002006.AccountId32),
            call: v1002006.Call,
        })
    ),
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
    v1003000: new CallType(
        'Multisig.as_multi_threshold_1',
        sts.struct({
            otherSignatories: sts.array(() => v1003000.AccountId32),
            call: v1003000.Call,
        })
    ),
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
    v1004000: new CallType(
        'Multisig.as_multi_threshold_1',
        sts.struct({
            otherSignatories: sts.array(() => v1004000.AccountId32),
            call: v1004000.Call,
        })
    ),
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
    v1004001: new CallType(
        'Multisig.as_multi_threshold_1',
        sts.struct({
            otherSignatories: sts.array(() => v1004001.AccountId32),
            call: v1004001.Call,
        })
    ),
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
    v1005000: new CallType(
        'Multisig.as_multi_threshold_1',
        sts.struct({
            otherSignatories: sts.array(() => v1005000.AccountId32),
            call: v1005000.Call,
        })
    ),
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
    v1006001: new CallType(
        'Multisig.as_multi_threshold_1',
        sts.struct({
            otherSignatories: sts.array(() => v1006001.AccountId32),
            call: v1006001.Call,
        })
    ),
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
    v1007001: new CallType(
        'Multisig.as_multi_threshold_1',
        sts.struct({
            otherSignatories: sts.array(() => v1007001.AccountId32),
            call: v1007001.Call,
        })
    ),
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
    v1009001: new CallType(
        'Multisig.as_multi_threshold_1',
        sts.struct({
            otherSignatories: sts.array(() => v1009001.AccountId32),
            call: v1009001.Call,
        })
    ),
}
