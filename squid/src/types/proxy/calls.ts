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

export const proxy =  {
    name: 'Proxy.proxy',
    /**
     *  Dispatch the given `call` from an account that the sender is authorised for through
     *  `add_proxy`.
     * 
     *  The dispatch origin for this call must be _Signed_.
     * 
     *  Parameters:
     *  - `real`: The account that the proxy will make a call on behalf of.
     *  - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
     *  - `call`: The call to be made by the `real` account.
     * 
     *  # <weight>
     *  P is the number of proxies the user has
     *  - Base weight: 19.87 + .141 * P µs
     *  - DB weight: 1 storage read.
     *  - Plus the weight of the `call`
     *  # </weight>
     */
    v2005: new CallType(
        'Proxy.proxy',
        sts.struct({
            real: v2005.AccountId,
            forceProxyType: sts.option(() => v2005.ProxyType),
            call: v2005.Type_188,
        })
    ),
    /**
     *  Dispatch the given `call` from an account that the sender is authorised for through
     *  `add_proxy`.
     * 
     *  The dispatch origin for this call must be _Signed_.
     * 
     *  Parameters:
     *  - `real`: The account that the proxy will make a call on behalf of.
     *  - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
     *  - `call`: The call to be made by the `real` account.
     * 
     *  # <weight>
     *  P is the number of proxies the user has
     *  - Base weight: 19.87 + .141 * P µs
     *  - DB weight: 1 storage read.
     *  - Plus the weight of the `call`
     *  # </weight>
     */
    v2007: new CallType(
        'Proxy.proxy',
        sts.struct({
            real: v2007.AccountId,
            forceProxyType: sts.option(() => v2007.ProxyType),
            call: v2007.Type_189,
        })
    ),
    /**
     *  Dispatch the given `call` from an account that the sender is authorised for through
     *  `add_proxy`.
     * 
     *  The dispatch origin for this call must be _Signed_.
     * 
     *  Parameters:
     *  - `real`: The account that the proxy will make a call on behalf of.
     *  - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
     *  - `call`: The call to be made by the `real` account.
     * 
     *  # <weight>
     *  P is the number of proxies the user has
     *  - Base weight: 19.87 + .141 * P µs
     *  - DB weight: 1 storage read.
     *  - Plus the weight of the `call`
     *  # </weight>
     */
    v2011: new CallType(
        'Proxy.proxy',
        sts.struct({
            real: v2011.AccountId,
            forceProxyType: sts.option(() => v2011.ProxyType),
            call: v2011.Type_190,
        })
    ),
    /**
     *  Dispatch the given `call` from an account that the sender is authorised for through
     *  `add_proxy`.
     * 
     *  The dispatch origin for this call must be _Signed_.
     * 
     *  Parameters:
     *  - `real`: The account that the proxy will make a call on behalf of.
     *  - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
     *  - `call`: The call to be made by the `real` account.
     * 
     *  # <weight>
     *  P is the number of proxies the user has
     *  - Base weight: 19.87 + .141 * P µs
     *  - DB weight: 1 storage read.
     *  - Plus the weight of the `call`
     *  # </weight>
     */
    v2013: new CallType(
        'Proxy.proxy',
        sts.struct({
            real: v2013.AccountId,
            forceProxyType: sts.option(() => v2013.ProxyType),
            call: v2013.Type_190,
        })
    ),
    /**
     *  Dispatch the given `call` from an account that the sender is authorised for through
     *  `add_proxy`.
     * 
     *  The dispatch origin for this call must be _Signed_.
     * 
     *  Parameters:
     *  - `real`: The account that the proxy will make a call on behalf of.
     *  - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
     *  - `call`: The call to be made by the `real` account.
     * 
     *  # <weight>
     *  P is the number of proxies the user has
     *  - Base weight: 19.87 + .141 * P µs
     *  - DB weight: 1 storage read.
     *  - Plus the weight of the `call`
     *  # </weight>
     */
    v2015: new CallType(
        'Proxy.proxy',
        sts.struct({
            real: v2015.AccountId,
            forceProxyType: sts.option(() => v2015.ProxyType),
            call: v2015.Type_192,
        })
    ),
    /**
     *  Dispatch the given `call` from an account that the sender is authorised for through
     *  `add_proxy`.
     * 
     *  The dispatch origin for this call must be _Signed_.
     * 
     *  Parameters:
     *  - `real`: The account that the proxy will make a call on behalf of.
     *  - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
     *  - `call`: The call to be made by the `real` account.
     * 
     *  # <weight>
     *  P is the number of proxies the user has
     *  - Base weight: 19.87 + .141 * P µs
     *  - DB weight: 1 storage read.
     *  - Plus the weight of the `call`
     *  # </weight>
     */
    v2022: new CallType(
        'Proxy.proxy',
        sts.struct({
            real: v2022.AccountId,
            forceProxyType: sts.option(() => v2022.ProxyType),
            call: v2022.Type_192,
        })
    ),
    /**
     *  Dispatch the given `call` from an account that the sender is authorised for through
     *  `add_proxy`.
     * 
     *  Removes any corresponding announcement(s).
     * 
     *  The dispatch origin for this call must be _Signed_.
     * 
     *  Parameters:
     *  - `real`: The account that the proxy will make a call on behalf of.
     *  - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
     *  - `call`: The call to be made by the `real` account.
     * 
     *  # <weight>
     *  Weight is a function of the number of proxies the user has (P).
     *  # </weight>
     */
    v2023: new CallType(
        'Proxy.proxy',
        sts.struct({
            real: v2023.AccountId,
            forceProxyType: sts.option(() => v2023.ProxyType),
            call: v2023.Type_194,
        })
    ),
    /**
     *  Dispatch the given `call` from an account that the sender is authorised for through
     *  `add_proxy`.
     * 
     *  Removes any corresponding announcement(s).
     * 
     *  The dispatch origin for this call must be _Signed_.
     * 
     *  Parameters:
     *  - `real`: The account that the proxy will make a call on behalf of.
     *  - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
     *  - `call`: The call to be made by the `real` account.
     * 
     *  # <weight>
     *  Weight is a function of the number of proxies the user has (P).
     *  # </weight>
     */
    v2024: new CallType(
        'Proxy.proxy',
        sts.struct({
            real: v2024.AccountId,
            forceProxyType: sts.option(() => v2024.ProxyType),
            call: v2024.Type_194,
        })
    ),
    /**
     *  Dispatch the given `call` from an account that the sender is authorised for through
     *  `add_proxy`.
     * 
     *  Removes any corresponding announcement(s).
     * 
     *  The dispatch origin for this call must be _Signed_.
     * 
     *  Parameters:
     *  - `real`: The account that the proxy will make a call on behalf of.
     *  - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
     *  - `call`: The call to be made by the `real` account.
     * 
     *  # <weight>
     *  Weight is a function of the number of proxies the user has (P).
     *  # </weight>
     */
    v2025: new CallType(
        'Proxy.proxy',
        sts.struct({
            real: v2025.AccountId,
            forceProxyType: sts.option(() => v2025.ProxyType),
            call: v2025.Type_195,
        })
    ),
    /**
     *  Dispatch the given `call` from an account that the sender is authorised for through
     *  `add_proxy`.
     * 
     *  Removes any corresponding announcement(s).
     * 
     *  The dispatch origin for this call must be _Signed_.
     * 
     *  Parameters:
     *  - `real`: The account that the proxy will make a call on behalf of.
     *  - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
     *  - `call`: The call to be made by the `real` account.
     * 
     *  # <weight>
     *  Weight is a function of the number of proxies the user has (P).
     *  # </weight>
     */
    v2026: new CallType(
        'Proxy.proxy',
        sts.struct({
            real: v2026.AccountId,
            forceProxyType: sts.option(() => v2026.ProxyType),
            call: v2026.Type_194,
        })
    ),
    /**
     *  Dispatch the given `call` from an account that the sender is authorised for through
     *  `add_proxy`.
     * 
     *  Removes any corresponding announcement(s).
     * 
     *  The dispatch origin for this call must be _Signed_.
     * 
     *  Parameters:
     *  - `real`: The account that the proxy will make a call on behalf of.
     *  - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
     *  - `call`: The call to be made by the `real` account.
     * 
     *  # <weight>
     *  Weight is a function of the number of proxies the user has (P).
     *  # </weight>
     */
    v2028: new CallType(
        'Proxy.proxy',
        sts.struct({
            real: v2028.AccountId,
            forceProxyType: sts.option(() => v2028.ProxyType),
            call: v2028.Type_199,
        })
    ),
    /**
     *  Dispatch the given `call` from an account that the sender is authorised for through
     *  `add_proxy`.
     * 
     *  Removes any corresponding announcement(s).
     * 
     *  The dispatch origin for this call must be _Signed_.
     * 
     *  Parameters:
     *  - `real`: The account that the proxy will make a call on behalf of.
     *  - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
     *  - `call`: The call to be made by the `real` account.
     * 
     *  # <weight>
     *  Weight is a function of the number of proxies the user has (P).
     *  # </weight>
     */
    v2029: new CallType(
        'Proxy.proxy',
        sts.struct({
            real: v2029.AccountId,
            forceProxyType: sts.option(() => v2029.ProxyType),
            call: v2029.Type_199,
        })
    ),
    /**
     *  Dispatch the given `call` from an account that the sender is authorised for through
     *  `add_proxy`.
     * 
     *  Removes any corresponding announcement(s).
     * 
     *  The dispatch origin for this call must be _Signed_.
     * 
     *  Parameters:
     *  - `real`: The account that the proxy will make a call on behalf of.
     *  - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
     *  - `call`: The call to be made by the `real` account.
     * 
     *  # <weight>
     *  Weight is a function of the number of proxies the user has (P).
     *  # </weight>
     */
    v2030: new CallType(
        'Proxy.proxy',
        sts.struct({
            real: v2030.AccountId,
            forceProxyType: sts.option(() => v2030.ProxyType),
            call: v2030.Type_138,
        })
    ),
    /**
     *  Dispatch the given `call` from an account that the sender is authorised for through
     *  `add_proxy`.
     * 
     *  Removes any corresponding announcement(s).
     * 
     *  The dispatch origin for this call must be _Signed_.
     * 
     *  Parameters:
     *  - `real`: The account that the proxy will make a call on behalf of.
     *  - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
     *  - `call`: The call to be made by the `real` account.
     * 
     *  # <weight>
     *  Weight is a function of the number of proxies the user has (P).
     *  # </weight>
     */
    v9010: new CallType(
        'Proxy.proxy',
        sts.struct({
            real: v9010.AccountId,
            forceProxyType: sts.option(() => v9010.ProxyType),
            call: v9010.Type_138,
        })
    ),
    /**
     *  Dispatch the given `call` from an account that the sender is authorised for through
     *  `add_proxy`.
     * 
     *  Removes any corresponding announcement(s).
     * 
     *  The dispatch origin for this call must be _Signed_.
     * 
     *  Parameters:
     *  - `real`: The account that the proxy will make a call on behalf of.
     *  - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
     *  - `call`: The call to be made by the `real` account.
     * 
     *  # <weight>
     *  Weight is a function of the number of proxies the user has (P).
     *  # </weight>
     */
    v9030: new CallType(
        'Proxy.proxy',
        sts.struct({
            real: v9030.AccountId,
            forceProxyType: sts.option(() => v9030.ProxyType),
            call: v9030.Type_138,
        })
    ),
    /**
     *  Dispatch the given `call` from an account that the sender is authorised for through
     *  `add_proxy`.
     * 
     *  Removes any corresponding announcement(s).
     * 
     *  The dispatch origin for this call must be _Signed_.
     * 
     *  Parameters:
     *  - `real`: The account that the proxy will make a call on behalf of.
     *  - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
     *  - `call`: The call to be made by the `real` account.
     * 
     *  # <weight>
     *  Weight is a function of the number of proxies the user has (P).
     *  # </weight>
     */
    v9040: new CallType(
        'Proxy.proxy',
        sts.struct({
            real: v9040.AccountId,
            forceProxyType: sts.option(() => v9040.ProxyType),
            call: v9040.Type_138,
        })
    ),
    /**
     *  Dispatch the given `call` from an account that the sender is authorised for through
     *  `add_proxy`.
     * 
     *  Removes any corresponding announcement(s).
     * 
     *  The dispatch origin for this call must be _Signed_.
     * 
     *  Parameters:
     *  - `real`: The account that the proxy will make a call on behalf of.
     *  - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
     *  - `call`: The call to be made by the `real` account.
     * 
     *  # <weight>
     *  Weight is a function of the number of proxies the user has (P).
     *  # </weight>
     */
    v9050: new CallType(
        'Proxy.proxy',
        sts.struct({
            real: v9050.AccountId,
            forceProxyType: sts.option(() => v9050.ProxyType),
            call: v9050.Type_139,
        })
    ),
    /**
     *  Dispatch the given `call` from an account that the sender is authorised for through
     *  `add_proxy`.
     * 
     *  Removes any corresponding announcement(s).
     * 
     *  The dispatch origin for this call must be _Signed_.
     * 
     *  Parameters:
     *  - `real`: The account that the proxy will make a call on behalf of.
     *  - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
     *  - `call`: The call to be made by the `real` account.
     * 
     *  # <weight>
     *  Weight is a function of the number of proxies the user has (P).
     *  # </weight>
     */
    v9080: new CallType(
        'Proxy.proxy',
        sts.struct({
            real: v9080.AccountId,
            forceProxyType: sts.option(() => v9080.ProxyType),
            call: v9080.Type_138,
        })
    ),
    /**
     *  Dispatch the given `call` from an account that the sender is authorised for through
     *  `add_proxy`.
     * 
     *  Removes any corresponding announcement(s).
     * 
     *  The dispatch origin for this call must be _Signed_.
     * 
     *  Parameters:
     *  - `real`: The account that the proxy will make a call on behalf of.
     *  - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
     *  - `call`: The call to be made by the `real` account.
     * 
     *  # <weight>
     *  Weight is a function of the number of proxies the user has (P).
     *  # </weight>
     */
    v9090: new CallType(
        'Proxy.proxy',
        sts.struct({
            real: v9090.AccountId,
            forceProxyType: sts.option(() => v9090.ProxyType),
            call: v9090.Type_138,
        })
    ),
    /**
     *  Dispatch the given `call` from an account that the sender is authorised for through
     *  `add_proxy`.
     * 
     *  Removes any corresponding announcement(s).
     * 
     *  The dispatch origin for this call must be _Signed_.
     * 
     *  Parameters:
     *  - `real`: The account that the proxy will make a call on behalf of.
     *  - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
     *  - `call`: The call to be made by the `real` account.
     * 
     *  # <weight>
     *  Weight is a function of the number of proxies the user has (P).
     *  # </weight>
     */
    v9100: new CallType(
        'Proxy.proxy',
        sts.struct({
            real: v9100.AccountId,
            forceProxyType: sts.option(() => v9100.ProxyType),
            call: v9100.Type_138,
        })
    ),
    /**
     * Dispatch the given `call` from an account that the sender is authorised for through
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
     * 
     * # <weight>
     * Weight is a function of the number of proxies the user has (P).
     * # </weight>
     */
    v9111: new CallType(
        'Proxy.proxy',
        sts.struct({
            real: v9111.AccountId32,
            forceProxyType: sts.option(() => v9111.ProxyType),
            call: v9111.Call,
        })
    ),
    /**
     * Dispatch the given `call` from an account that the sender is authorised for through
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
     * 
     * # <weight>
     * Weight is a function of the number of proxies the user has (P).
     * # </weight>
     */
    v9122: new CallType(
        'Proxy.proxy',
        sts.struct({
            real: v9122.AccountId32,
            forceProxyType: sts.option(() => v9122.ProxyType),
            call: v9122.Call,
        })
    ),
    /**
     * Dispatch the given `call` from an account that the sender is authorised for through
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
     * 
     * # <weight>
     * Weight is a function of the number of proxies the user has (P).
     * # </weight>
     */
    v9130: new CallType(
        'Proxy.proxy',
        sts.struct({
            real: v9130.AccountId32,
            forceProxyType: sts.option(() => v9130.ProxyType),
            call: v9130.Call,
        })
    ),
    /**
     * Dispatch the given `call` from an account that the sender is authorised for through
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
     * 
     * # <weight>
     * Weight is a function of the number of proxies the user has (P).
     * # </weight>
     */
    v9160: new CallType(
        'Proxy.proxy',
        sts.struct({
            real: v9160.AccountId32,
            forceProxyType: sts.option(() => v9160.ProxyType),
            call: v9160.Call,
        })
    ),
    /**
     * Dispatch the given `call` from an account that the sender is authorised for through
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
     * 
     * # <weight>
     * Weight is a function of the number of proxies the user has (P).
     * # </weight>
     */
    v9170: new CallType(
        'Proxy.proxy',
        sts.struct({
            real: v9170.AccountId32,
            forceProxyType: sts.option(() => v9170.ProxyType),
            call: v9170.Call,
        })
    ),
    /**
     * Dispatch the given `call` from an account that the sender is authorised for through
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
     * 
     * # <weight>
     * Weight is a function of the number of proxies the user has (P).
     * # </weight>
     */
    v9180: new CallType(
        'Proxy.proxy',
        sts.struct({
            real: v9180.AccountId32,
            forceProxyType: sts.option(() => v9180.ProxyType),
            call: v9180.Call,
        })
    ),
    /**
     * Dispatch the given `call` from an account that the sender is authorised for through
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
     * 
     * # <weight>
     * Weight is a function of the number of proxies the user has (P).
     * # </weight>
     */
    v9190: new CallType(
        'Proxy.proxy',
        sts.struct({
            real: v9190.AccountId32,
            forceProxyType: sts.option(() => v9190.ProxyType),
            call: v9190.Call,
        })
    ),
    /**
     * Dispatch the given `call` from an account that the sender is authorised for through
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
     * 
     * # <weight>
     * Weight is a function of the number of proxies the user has (P).
     * # </weight>
     */
    v9220: new CallType(
        'Proxy.proxy',
        sts.struct({
            real: v9220.AccountId32,
            forceProxyType: sts.option(() => v9220.ProxyType),
            call: v9220.Call,
        })
    ),
    /**
     * Dispatch the given `call` from an account that the sender is authorised for through
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
     * 
     * # <weight>
     * Weight is a function of the number of proxies the user has (P).
     * # </weight>
     */
    v9230: new CallType(
        'Proxy.proxy',
        sts.struct({
            real: v9230.AccountId32,
            forceProxyType: sts.option(() => v9230.ProxyType),
            call: v9230.Call,
        })
    ),
    /**
     * Dispatch the given `call` from an account that the sender is authorised for through
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
     * 
     * # <weight>
     * Weight is a function of the number of proxies the user has (P).
     * # </weight>
     */
    v9250: new CallType(
        'Proxy.proxy',
        sts.struct({
            real: v9250.AccountId32,
            forceProxyType: sts.option(() => v9250.ProxyType),
            call: v9250.Call,
        })
    ),
    /**
     * Dispatch the given `call` from an account that the sender is authorised for through
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
     * 
     * # <weight>
     * Weight is a function of the number of proxies the user has (P).
     * # </weight>
     */
    v9271: new CallType(
        'Proxy.proxy',
        sts.struct({
            real: v9271.AccountId32,
            forceProxyType: sts.option(() => v9271.ProxyType),
            call: v9271.Call,
        })
    ),
    /**
     * Dispatch the given `call` from an account that the sender is authorised for through
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
     * 
     * # <weight>
     * Weight is a function of the number of proxies the user has (P).
     * # </weight>
     */
    v9291: new CallType(
        'Proxy.proxy',
        sts.struct({
            real: v9291.MultiAddress,
            forceProxyType: sts.option(() => v9291.ProxyType),
            call: v9291.Call,
        })
    ),
    /**
     * Dispatch the given `call` from an account that the sender is authorised for through
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
    v9300: new CallType(
        'Proxy.proxy',
        sts.struct({
            real: v9300.MultiAddress,
            forceProxyType: sts.option(() => v9300.ProxyType),
            call: v9300.Call,
        })
    ),
    /**
     * Dispatch the given `call` from an account that the sender is authorised for through
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
    v9320: new CallType(
        'Proxy.proxy',
        sts.struct({
            real: v9320.MultiAddress,
            forceProxyType: sts.option(() => v9320.ProxyType),
            call: v9320.Call,
        })
    ),
    /**
     * Dispatch the given `call` from an account that the sender is authorised for through
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
    v9340: new CallType(
        'Proxy.proxy',
        sts.struct({
            real: v9340.MultiAddress,
            forceProxyType: sts.option(() => v9340.ProxyType),
            call: v9340.Call,
        })
    ),
    /**
     * Dispatch the given `call` from an account that the sender is authorised for through
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
    v9350: new CallType(
        'Proxy.proxy',
        sts.struct({
            real: v9350.MultiAddress,
            forceProxyType: sts.option(() => v9350.ProxyType),
            call: v9350.Call,
        })
    ),
    /**
     * Dispatch the given `call` from an account that the sender is authorised for through
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
    v9370: new CallType(
        'Proxy.proxy',
        sts.struct({
            real: v9370.MultiAddress,
            forceProxyType: sts.option(() => v9370.ProxyType),
            call: v9370.Call,
        })
    ),
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
    v9381: new CallType(
        'Proxy.proxy',
        sts.struct({
            real: v9381.MultiAddress,
            forceProxyType: sts.option(() => v9381.ProxyType),
            call: v9381.Call,
        })
    ),
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
    v9420: new CallType(
        'Proxy.proxy',
        sts.struct({
            real: v9420.MultiAddress,
            forceProxyType: sts.option(() => v9420.ProxyType),
            call: v9420.Call,
        })
    ),
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
    v9430: new CallType(
        'Proxy.proxy',
        sts.struct({
            real: v9430.MultiAddress,
            forceProxyType: sts.option(() => v9430.ProxyType),
            call: v9430.Call,
        })
    ),
    /**
     * See [`Pallet::proxy`].
     */
    v1000000: new CallType(
        'Proxy.proxy',
        sts.struct({
            real: v1000000.MultiAddress,
            forceProxyType: sts.option(() => v1000000.ProxyType),
            call: v1000000.Call,
        })
    ),
    /**
     * See [`Pallet::proxy`].
     */
    v1001000: new CallType(
        'Proxy.proxy',
        sts.struct({
            real: v1001000.MultiAddress,
            forceProxyType: sts.option(() => v1001000.ProxyType),
            call: v1001000.Call,
        })
    ),
    /**
     * See [`Pallet::proxy`].
     */
    v1002000: new CallType(
        'Proxy.proxy',
        sts.struct({
            real: v1002000.MultiAddress,
            forceProxyType: sts.option(() => v1002000.ProxyType),
            call: v1002000.Call,
        })
    ),
    /**
     * See [`Pallet::proxy`].
     */
    v1002004: new CallType(
        'Proxy.proxy',
        sts.struct({
            real: v1002004.MultiAddress,
            forceProxyType: sts.option(() => v1002004.ProxyType),
            call: v1002004.Call,
        })
    ),
    /**
     * See [`Pallet::proxy`].
     */
    v1002005: new CallType(
        'Proxy.proxy',
        sts.struct({
            real: v1002005.MultiAddress,
            forceProxyType: sts.option(() => v1002005.ProxyType),
            call: v1002005.Call,
        })
    ),
    /**
     * See [`Pallet::proxy`].
     */
    v1002006: new CallType(
        'Proxy.proxy',
        sts.struct({
            real: v1002006.MultiAddress,
            forceProxyType: sts.option(() => v1002006.ProxyType),
            call: v1002006.Call,
        })
    ),
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
    v1003000: new CallType(
        'Proxy.proxy',
        sts.struct({
            real: v1003000.MultiAddress,
            forceProxyType: sts.option(() => v1003000.ProxyType),
            call: v1003000.Call,
        })
    ),
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
    v1004000: new CallType(
        'Proxy.proxy',
        sts.struct({
            real: v1004000.MultiAddress,
            forceProxyType: sts.option(() => v1004000.ProxyType),
            call: v1004000.Call,
        })
    ),
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
    v1004001: new CallType(
        'Proxy.proxy',
        sts.struct({
            real: v1004001.MultiAddress,
            forceProxyType: sts.option(() => v1004001.ProxyType),
            call: v1004001.Call,
        })
    ),
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
    v1005000: new CallType(
        'Proxy.proxy',
        sts.struct({
            real: v1005000.MultiAddress,
            forceProxyType: sts.option(() => v1005000.ProxyType),
            call: v1005000.Call,
        })
    ),
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
    v1006001: new CallType(
        'Proxy.proxy',
        sts.struct({
            real: v1006001.MultiAddress,
            forceProxyType: sts.option(() => v1006001.ProxyType),
            call: v1006001.Call,
        })
    ),
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
    v1007001: new CallType(
        'Proxy.proxy',
        sts.struct({
            real: v1007001.MultiAddress,
            forceProxyType: sts.option(() => v1007001.ProxyType),
            call: v1007001.Call,
        })
    ),
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
    v1009001: new CallType(
        'Proxy.proxy',
        sts.struct({
            real: v1009001.MultiAddress,
            forceProxyType: sts.option(() => v1009001.ProxyType),
            call: v1009001.Call,
        })
    ),
}

export const removeProxies =  {
    name: 'Proxy.remove_proxies',
    /**
     *  Unregister all proxy accounts for the sender.
     * 
     *  The dispatch origin for this call must be _Signed_.
     * 
     *  WARNING: This may be called on accounts created by `anonymous`, however if done, then
     *  the unreserved fees will be inaccessible. **All access to this account will be lost.**
     * 
     *  # <weight>
     *  P is the number of proxies the user has
     *  - Base weight: 13.73 + .129 * P µs
     *  - DB weight: 1 storage read and write.
     *  # </weight>
     */
    v2005: new CallType(
        'Proxy.remove_proxies',
        sts.unit()
    ),
}

export const killPure =  {
    name: 'Proxy.kill_pure',
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
    v9300: new CallType(
        'Proxy.kill_pure',
        sts.struct({
            spawner: v9300.MultiAddress,
            proxyType: v9300.ProxyType,
            index: sts.number(),
            height: sts.number(),
            extIndex: sts.number(),
        })
    ),
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
    v9420: new CallType(
        'Proxy.kill_pure',
        sts.struct({
            spawner: v9420.MultiAddress,
            proxyType: v9420.ProxyType,
            index: sts.number(),
            height: sts.number(),
            extIndex: sts.number(),
        })
    ),
    /**
     * See [`Pallet::kill_pure`].
     */
    v1002006: new CallType(
        'Proxy.kill_pure',
        sts.struct({
            spawner: v1002006.MultiAddress,
            proxyType: v1002006.ProxyType,
            index: sts.number(),
            height: sts.number(),
            extIndex: sts.number(),
        })
    ),
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
    v1003000: new CallType(
        'Proxy.kill_pure',
        sts.struct({
            spawner: v1003000.MultiAddress,
            proxyType: v1003000.ProxyType,
            index: sts.number(),
            height: sts.number(),
            extIndex: sts.number(),
        })
    ),
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
    v1004000: new CallType(
        'Proxy.kill_pure',
        sts.struct({
            spawner: v1004000.MultiAddress,
            proxyType: v1004000.ProxyType,
            index: sts.number(),
            height: sts.number(),
            extIndex: sts.number(),
        })
    ),
}
