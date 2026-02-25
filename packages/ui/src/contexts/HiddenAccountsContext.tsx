import {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';
import { getPubKeyFromAddress } from '../utils/getPubKeyFromAddress';
import { useNetwork } from './NetworkContext';
import { HexString } from 'polkadot-api';
import { useGetEncodedAddress } from '../hooks/useGetEncodedAddress';
import { useSearchParams } from 'react-router';
import { useWatchedAccounts } from './WatchedAccountsContext';

const LOCALSTORAGE_HIDDEN_ACCOUNTS_KEY = 'multix.hiddenAccounts';

type HiddenAccountsProps = {
    children: ReactNode | ReactNode[];
};

export interface IHiddenAccountsContext {
    addHiddenAccount: (address: string) => {
        removedWatchedAccount: boolean;
    };
    removeHiddenAccount: (address: string) => void;
    hiddenAccounts: HiddenAccount[];
    networkHiddenAccounts: string[];
    setHiddenAccounts: (hiddenAccounts: HiddenAccount[]) => void;
}

export interface HiddenAccount {
    pubKey: HexString;
    network: string;
}

const HiddenAccountsContext = createContext<IHiddenAccountsContext | undefined>(undefined);

const HiddenAccountsContextProvider = ({ children }: HiddenAccountsProps) => {
    const { selectedNetwork } = useNetwork();
    const getEncodedAddress = useGetEncodedAddress();
    const [searchParams, setSearchParams] = useSearchParams({ address: '' });
    const { watchedAddresses, removeWatchedAccount } = useWatchedAccounts();
    const [hiddenAccounts, setHiddenAccounts] = useState<HiddenAccount[]>(() => {
        const stored = localStorage.getItem(LOCALSTORAGE_HIDDEN_ACCOUNTS_KEY);
        return stored ? JSON.parse(stored) : [];
    });

    const networkHiddenAccounts = useMemo(() => {
        return hiddenAccounts
            .map(({ pubKey, network }) => {
                if (network !== selectedNetwork) return null;

                return getEncodedAddress(pubKey);
            })
            .filter(Boolean) as string[];
    }, [getEncodedAddress, hiddenAccounts, selectedNetwork]);

    const addHiddenAccount = useCallback(
        (address: string) => {
            const pubKey = getPubKeyFromAddress(address);
            const searchParamsAddress = searchParams.get('address');
            const urlAddressPubKey =
                searchParamsAddress && getPubKeyFromAddress(searchParamsAddress);

            // if the currently selected account is being hidden
            if (urlAddressPubKey === pubKey) {
                setSearchParams((prev) => {
                    prev.delete('address');
                    return prev;
                });
            }

            // if we are hiding a watched account
            // just remove it from the watch list
            if (watchedAddresses.includes(address)) {
                removeWatchedAccount(address);
                return { removedWatchedAccount: true };
            } else {
                pubKey &&
                    setHiddenAccounts((prev) => [
                        ...prev,
                        { pubKey, network: selectedNetwork } as HiddenAccount,
                    ]);
                return { removedWatchedAccount: false };
            }
        },
        [removeWatchedAccount, searchParams, selectedNetwork, setSearchParams, watchedAddresses],
    );

    const removeHiddenAccount = useCallback(
        (addressToRemove: string) => {
            const pubKeyToRemove = getPubKeyFromAddress(addressToRemove);
            const filtered = hiddenAccounts.filter(
                ({ pubKey, network }) => pubKey !== pubKeyToRemove && network === selectedNetwork,
            );
            setHiddenAccounts([...filtered]);
        },
        [hiddenAccounts, selectedNetwork],
    );

    // persist the accounts hidden every time there's a change
    useEffect(() => {
        localStorage.setItem(LOCALSTORAGE_HIDDEN_ACCOUNTS_KEY, JSON.stringify(hiddenAccounts));
    }, [hiddenAccounts]);

    return (
        <HiddenAccountsContext.Provider
            value={{
                addHiddenAccount,
                removeHiddenAccount,
                hiddenAccounts,
                setHiddenAccounts,
                networkHiddenAccounts,
            }}
        >
            {children}
        </HiddenAccountsContext.Provider>
    );
};

const useHiddenAccounts = () => {
    const context = useContext(HiddenAccountsContext);
    if (context === undefined) {
        throw new Error('useHiddenAccounts must be used within a HiddenAccountsContextProvider');
    }
    return context;
};

export { HiddenAccountsContextProvider, useHiddenAccounts };
