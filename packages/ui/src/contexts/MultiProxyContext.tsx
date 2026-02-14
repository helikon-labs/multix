import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { MultisigsAndPureByAccountQuery, ProxyType } from '../../types-and-hooks';
import { AccountBaseInfo } from '../components/select/GenericAccountSelection';
import { useQueryMultisigsAndPureByAccounts } from '../hooks/useQueryMultisigsAndPureByAccounts';
import { useAccounts } from './AccountsContext';
import { useWatchedAccounts } from './WatchedAccountsContext';
import { useAccountId } from '../hooks/useAccountId';
import { getMultiProxyAddress } from '../utils/getMultiProxyAddress';
import { useSearchParams } from 'react-router';
import { useNetwork } from './NetworkContext';
import { useHiddenAccounts } from './HiddenAccountsContext';
import { useGetEncodedAddress } from '../hooks/useGetEncodedAddress';
import { getPubKeyFromAddress } from '../utils/getPubKeyFromAddress';
import { encodesubstrateAddress } from '../utils/encodeSubstrateAddress';
import { useApi } from './ApiContext';

interface MultisigContextProps {
    children: React.ReactNode | React.ReactNode[];
}

export interface MultisigAggregated {
    address: string;
    signatories?: string[];
    threshold?: number | null;
    type: ProxyType;
}

export interface MultiProxy {
    proxy?: string;
    multisigs: MultisigAggregated[];
}

export const isMultiProxy = (value: any): value is MultiProxy =>
    value && value.multisigs && value.multisigs.length > 0;

export interface IMultisigContext {
    selectedMultiProxy?: MultiProxy;
    multiProxyList: MultiProxy[];
    isLoading: boolean;
    selectMultiProxy: (multi: MultiProxy | string) => boolean;
    selectedHasProxy: boolean;
    error: unknown | Error | null;
    getMultisigByAddress: (address: string) => MultisigAggregated | undefined;
    getMultisigAsAccountBaseInfo: () => AccountBaseInfo[];
    selectedIsWatched: boolean;
    isWatchedAccount: (who: string | MultiProxy | undefined) => boolean;
    refetch: () => void;
    defaultAddress?: string;
    selectedMultiProxyAddress?: string;
    setCanFindMultiProxyFromUrl: React.Dispatch<React.SetStateAction<boolean>>;
    canFindMultiProxyFromUrl: boolean;
    setRefetchMultisigTimeoutMinutes: React.Dispatch<React.SetStateAction<number>>;
    resetLists: () => void;
}

const MultisigContext = createContext<IMultisigContext | undefined>(undefined);

const MultiProxyContextProvider = ({ children }: MultisigContextProps) => {
    const { chainInfo } = useApi();
    const getEncodedAddress = useGetEncodedAddress();
    const { networkHiddenAccounts } = useHiddenAccounts();
    const [refetchMultisigTimeoutMinutes, setRefetchMultisigTimeoutMinutes] = useState(0);
    const [shouldPollMultisigs, setShouldPollMultisigs] = useState(false);
    const [canFindMultiProxyFromUrl, setCanFindMultiProxyFromUrl] = useState(false);
    const [selectedMultiProxyAddress, setSelectedMultiProxyAddress] = useState('');
    // if set to null, it means that it hasn't been initialized yet
    const [multisigList, setMultisigList] = useState<IMultisigContext['multiProxyList'] | null>(
        null,
    );
    const multiProxyList = useMemo(() => {
        const filteredMulti = multisigList?.filter(({ proxy, multisigs }) => {
            if (proxy) return !networkHiddenAccounts.includes(proxy);

            const firstMultisig = multisigs[0].address;
            return !!firstMultisig && !networkHiddenAccounts.includes(firstMultisig);
        });
        return filteredMulti || [];
    }, [multisigList, networkHiddenAccounts]);
    const { ownAddressList } = useAccounts();
    const ownPubKeys = useMemo(() => getPubKeyFromAddress(ownAddressList), [ownAddressList]);
    const { watchedPubKeys } = useWatchedAccounts();
    const { selectedNetwork } = useNetwork();
    const LOCALSTORAGE_LAST_MULTIPROXY_KEY_NETWORK = useMemo(
        () => selectedNetwork && `multix.lastUsedMultiProxy.v2.${selectedNetwork}`,
        [selectedNetwork],
    );

    const getSignatoriesAddressesFromAccount = useCallback(
        (signatories: MultisigsAndPureByAccountQuery['accounts'][0]['signatories']) => {
            return signatories
                .map(({ signatory }) => getEncodedAddress(signatory.pubKey))
                .filter(Boolean) as string[];
        },
        [getEncodedAddress],
    );

    const getMultiProxyByAddress = useCallback(
        (address?: string) => {
            if (!address) return undefined;

            return multiProxyList.find(
                (multiProxy) =>
                    // either by proxy address
                    multiProxy.proxy === address ||
                    // or by multisig address
                    multiProxy.multisigs.some((multisig) => multisig.address === address),
            );
        },
        [multiProxyList],
    );

    const selectedMultiProxy = useMemo(() => {
        if (!selectedMultiProxyAddress) return;

        return getMultiProxyByAddress(selectedMultiProxyAddress);
    }, [getMultiProxyByAddress, selectedMultiProxyAddress]);

    const selectedHasProxy = useMemo(() => !!selectedMultiProxy?.proxy, [selectedMultiProxy]);

    // This is true if the currently Multiproxy passed as param contains no signatory
    // owned by the user this happens with a watched account
    const isWatchedAccount = useCallback(
        (who: string | MultiProxy | undefined) => {
            if (!who) return false;

            const account = typeof who === 'string' ? getMultiProxyByAddress(who) : who;
            return !account?.multisigs.some((multisig) =>
                multisig.signatories?.some((signatory) => ownAddressList.includes(signatory)),
            );
        },
        [getMultiProxyByAddress, ownAddressList],
    );

    const selectedIsWatched = useMemo(
        () => isWatchedAccount(selectedMultiProxy),
        [isWatchedAccount, selectedMultiProxy],
    );

    const [, setSearchParams] = useSearchParams({
        address: '',
    });

    const resetLists = useCallback(() => {
        setMultisigList(null);
    }, []);

    const setAddressInUrl = useCallback(
        (address: string) => {
            setSearchParams((prev) => {
                prev.set('address', address);
                return prev;
            });
        },
        [setSearchParams],
    );

    useEffect(() => {
        let timeout: NodeJS.Timeout;
        if (refetchMultisigTimeoutMinutes > 0) {
            setShouldPollMultisigs(true);
            const timeoutInMs = refetchMultisigTimeoutMinutes * 60 * 1000;
            timeout = setTimeout(() => {
                setShouldPollMultisigs(false);
                setRefetchMultisigTimeoutMinutes(0);
            }, timeoutInMs);
        }

        return () => timeout && clearTimeout(timeout);
    }, [refetchMultisigTimeoutMinutes]);

    const ownAccountIds = useAccountId(ownPubKeys);
    const watchedAccountIds = useAccountId(watchedPubKeys);

    const refreshAccounList = useCallback(
        (data: MultisigsAndPureByAccountQuery | null) => {
            // we have no answer
            if (!data) return;

            // we do have an answer, but there is no multiproxy
            if (data.accounts.length === 0) {
                setMultisigList([]);
                return;
            }

            // map of the pure proxy addresses and the multisigs associated
            const pureProxyMap = new Map<string, Omit<MultiProxy, 'proxy'>>();
            // end result
            const res: MultiProxy[] = [];

            // iterate through the multisigs and pure proxies
            data.accounts.forEach((account) => {
                // if the account is a pure proxy
                if (account.isPureProxy) {
                    // find the delegatee that are multisigs and put all the infos right away
                    account.delegatorFor.forEach(({ delegatee, type }) => {
                        if (delegatee.isMultisig) {
                            const pureAddress = getEncodedAddress(account.pubKey) || '';
                            const multisigAddress = getEncodedAddress(delegatee.pubKey) || '';

                            const previousMultisigsForProxy =
                                pureProxyMap.get(pureAddress)?.multisigs || [];

                            const isAlreadyInMultisigList = !!previousMultisigsForProxy.find(
                                ({ address }) => address === multisigAddress,
                            );

                            // do not add a second time a multisig
                            if (isAlreadyInMultisigList) return;

                            const newMultisigForProxy = {
                                address: multisigAddress,
                                signatories: getSignatoriesAddressesFromAccount(
                                    delegatee.signatories,
                                ),
                                threshold: delegatee?.threshold || undefined,
                                type,
                            };
                            pureProxyMap.set(pureAddress, {
                                multisigs: [...previousMultisigsForProxy, newMultisigForProxy],
                            });
                        }
                    });

                    return;
                }

                // from this point, we should only be dealing with multisigs
                // looking for multisigs being delegatee for pure proxies
                const pureProxyAddresses: {
                    pureAddress: string;
                    type: ProxyType;
                }[] = [];

                // one multisig could be a delegator for multiple pure proxies
                account.isMultisig &&
                    account.delegateeFor.forEach(({ delegator, type }) => {
                        const delegatorAddress = getEncodedAddress(delegator.pubKey) || '';
                        const accountAddress = getEncodedAddress(account.pubKey) || '';
                        // if a pure was already added, e.g because it is watched
                        // we shouldn't associate this multisig to it twice
                        const currentMultisigsForProxy = pureProxyMap
                            .get(delegatorAddress)
                            ?.multisigs.map(({ address }) => address);

                        // finding all the accounts that are pure proxy and that don't include this multisig already
                        if (
                            delegator?.isPureProxy &&
                            !currentMultisigsForProxy?.includes(accountAddress)
                        ) {
                            pureProxyAddresses.push({
                                pureAddress: delegatorAddress,
                                type: type,
                            });
                        }
                    });

                // if this account is a multisig and is the delegatee for at least a pureProxy
                if (account.isMultisig && pureProxyAddresses?.length > 0) {
                    pureProxyAddresses.forEach(({ pureAddress, type }) => {
                        const previousMultisigsForProxy =
                            pureProxyMap.get(pureAddress)?.multisigs || [];
                        const newMultisigForProxy = {
                            address: getEncodedAddress(account.pubKey) || '',
                            signatories: getSignatoriesAddressesFromAccount(account.signatories),
                            threshold: account?.threshold || undefined,
                            type,
                        };

                        // add this pureProxy to the Map
                        pureProxyMap.set(pureAddress, {
                            multisigs: [...previousMultisigsForProxy, newMultisigForProxy],
                        });
                    });
                } else if (account.isMultisig && pureProxyAddresses.length === 0) {
                    // if this multisig doesn't have a proxy
                    res.push({
                        proxy: undefined,
                        multisigs: [
                            {
                                address: getEncodedAddress(account.pubKey) || '',
                                signatories: getSignatoriesAddressesFromAccount(
                                    account.signatories,
                                ),
                                threshold: account.threshold,
                            },
                        ],
                    } as MultiProxy);
                } else {
                    console.error('Unexpected account, it should be a multisig', account);
                }
            });

            // flatten out proxyMap
            const proxyArray = Array.from(pureProxyMap.entries()).map(
                ([proxy, agg]) =>
                    ({
                        proxy,
                        multisigs: agg.multisigs,
                    }) as MultiProxy,
            );

            res.push(...proxyArray);

            setMultisigList(res);
        },
        [getEncodedAddress, getSignatoriesAddressesFromAccount],
    );

    const {
        data,
        isLoading,
        error: multisigQueryError,
        refetch,
    } = useQueryMultisigsAndPureByAccounts({
        accountIds: ownAccountIds,
        watchedAccountIds: watchedAccountIds,
        shouldRefetch: shouldPollMultisigs,
    });

    useEffect(() => {
        if (!data) return;
        refreshAccounList(data);
    }, [data, refetch, refreshAccounList]);

    const getMultisigByAddress = useCallback(
        (address: string) => {
            return selectedMultiProxy?.multisigs.find((multisig) => multisig.address === address);
        },
        [selectedMultiProxy],
    );

    const getMultisigAsAccountBaseInfo = () =>
        selectedMultiProxy?.multisigs.map(
            ({ address }) =>
                ({
                    address,
                    meta: {
                        isMulti: true,
                    },
                }) as AccountBaseInfo,
        ) || [];

    const selectMultiProxy = useCallback(
        (newMulti: typeof selectedMultiProxy | string) => {
            let multi: string | undefined;

            if (typeof newMulti === 'string') {
                multi = newMulti;
            } else {
                multi = getMultiProxyAddress(newMulti);
            }

            const multiProxyFound = getMultiProxyByAddress(multi);

            if (!multi || !multiProxyFound) {
                return false;
            }

            if (multiProxyFound && LOCALSTORAGE_LAST_MULTIPROXY_KEY_NETWORK) {
                const pubKey = getPubKeyFromAddress(multi);
                pubKey && localStorage.setItem(LOCALSTORAGE_LAST_MULTIPROXY_KEY_NETWORK, pubKey);
            }

            setAddressInUrl(multi);
            setSelectedMultiProxyAddress(multi);
            return true;
        },
        [LOCALSTORAGE_LAST_MULTIPROXY_KEY_NETWORK, getMultiProxyByAddress, setAddressInUrl],
    );

    const defaultAddress = useMemo(() => {
        if (multiProxyList?.length === 0 || isLoading) {
            return undefined;
        }

        const lastUsedMultiProxyPubKey =
            LOCALSTORAGE_LAST_MULTIPROXY_KEY_NETWORK &&
            localStorage.getItem(LOCALSTORAGE_LAST_MULTIPROXY_KEY_NETWORK);

        if (selectedNetwork && lastUsedMultiProxyPubKey && chainInfo) {
            const lastUsedAddress = encodesubstrateAddress(
                lastUsedMultiProxyPubKey,
                chainInfo.ss58Format,
            );
            const lastUsedMultiProxy = getMultiProxyByAddress(lastUsedAddress);

            if (lastUsedMultiProxy) {
                return lastUsedAddress;
            }
        }

        return multiProxyList?.[0].proxy || multiProxyList?.[0].multisigs[0].address;
    }, [
        LOCALSTORAGE_LAST_MULTIPROXY_KEY_NETWORK,
        chainInfo,
        getMultiProxyByAddress,
        isLoading,
        multiProxyList,
        selectedNetwork,
    ]);

    return (
        <MultisigContext.Provider
            value={{
                defaultAddress,
                selectedMultiProxyAddress,
                selectedMultiProxy,
                multiProxyList,
                selectMultiProxy,
                isLoading,
                selectedHasProxy,
                error: multisigQueryError,
                getMultisigByAddress,
                getMultisigAsAccountBaseInfo,
                selectedIsWatched,
                refetch,
                canFindMultiProxyFromUrl,
                setCanFindMultiProxyFromUrl,
                isWatchedAccount,
                setRefetchMultisigTimeoutMinutes,
                resetLists,
            }}
        >
            {children}
        </MultisigContext.Provider>
    );
};

const useMultiProxy = () => {
    const context = useContext(MultisigContext);
    if (context === undefined) {
        throw new Error('useMultiProxy must be used within a MultiProxyContextProvider');
    }
    return context;
};

export { MultiProxyContextProvider, useMultiProxy };
