import React, {
    useState,
    createContext,
    useContext,
    useCallback,
    useMemo,
    Dispatch,
    SetStateAction,
} from 'react';
import { useConnectedWallets, useAccounts as useRedotAccounts } from '@reactive-dot/react';
import { useApi } from './ApiContext';
import { encodeAccounts } from '../utils/encodeAccounts';
import { useGetWalletConnectNamespace } from '../hooks/useWalletConnectNamespace';
import { WalletAccount } from '@reactive-dot/core/wallets.js';

const LOCALSTORAGE_SELECTED_ACCOUNT_KEY = 'multix.selectedAccount';
const LOCALSTORAGE_ALLOWED_CONNECTION_KEY = 'multix.canConnectToExtension';

type AccountContextProps = {
    children: React.ReactNode | React.ReactNode[];
};

export interface IAccountContext {
    selectedAccount?: WalletAccount;
    ownAccountList: WalletAccount[];
    ownAddressList: string[];
    selectAccount: (account: WalletAccount) => void;
    getAccountByAddress: (address: string) => WalletAccount | undefined;
    allowConnectionToExtension: () => void;
    isAllowedToConnectToExtension: boolean;
    isAccountsLoading: boolean;
    isConnectionDialogOpen: boolean;
    setIsConnectionDialogOpen: Dispatch<SetStateAction<boolean>>;
}

const AccountContext = createContext<IAccountContext | undefined>(undefined);

const AccountContextProvider = ({ children }: AccountContextProps) => {
    const { walletConnectId } = useGetWalletConnectNamespace();
    const { chainInfo } = useApi();
    const redotAccountResult = useRedotAccounts({ use: false });
    const isAccountsLoading =
        'status' in redotAccountResult && redotAccountResult.status !== 'fulfilled';
    const redotAccountList = isAccountsLoading
        ? []
        : ((redotAccountResult as unknown as { value: WalletAccount[] }).value ?? []);
    const [isConnectionDialogOpen, setIsConnectionDialogOpen] = useState(false);
    const [isAllowedToConnectToExtension, setIsAllowedToConnectToExtension] = useState(
        () => localStorage.getItem(LOCALSTORAGE_ALLOWED_CONNECTION_KEY) === 'true',
    );
    const ownAccountList = useMemo(() => {
        if (!chainInfo || !redotAccountList) return [];
        // redot would share 10 accounts if we connect say Nova with 1 account, and 10 networks
        // for this reason, we need to filter out the accounts that are not for the current network
        // this only applies to wallet-connect accounts
        const filteredAccounts = redotAccountList.filter((account) => {
            return (
                account.wallet.id !== 'wallet-connect' || account.genesisHash === walletConnectId
            );
        });
        return encodeAccounts(filteredAccounts, chainInfo.ss58Format);
    }, [chainInfo, walletConnectId, redotAccountList]);
    const [selectedAddress, setSelectedAddress] = useState<string | undefined>(
        () => localStorage.getItem(LOCALSTORAGE_SELECTED_ACCOUNT_KEY) ?? undefined,
    );
    const selectedAccount = useMemo(
        () => ownAccountList.find((a) => a.address === selectedAddress) ?? ownAccountList[0],
        [ownAccountList, selectedAddress],
    );
    const ownAddressList = useMemo(
        () => (ownAccountList || []).map((a) => a.address),
        [ownAccountList],
    );

    const getAccountByAddress = useCallback(
        (address: string) => {
            return (ownAccountList || []).find((account) => account.address === address);
        },
        [ownAccountList],
    );

    const allowConnectionToExtension = useCallback(() => {
        localStorage.setItem(LOCALSTORAGE_ALLOWED_CONNECTION_KEY, 'true');
        setIsAllowedToConnectToExtension(true);
    }, []);

    const selectAccount = useCallback((account: WalletAccount) => {
        localStorage.setItem(LOCALSTORAGE_SELECTED_ACCOUNT_KEY, account.address);
        setSelectedAddress(account.address);
    }, []);

    return (
        <AccountContext.Provider
            value={{
                selectedAccount,
                ownAccountList: ownAccountList || [],
                ownAddressList,
                selectAccount,
                getAccountByAddress,
                isConnectionDialogOpen,
                setIsConnectionDialogOpen,
                allowConnectionToExtension,
                isAllowedToConnectToExtension,
                isAccountsLoading,
            }}
        >
            {children}
        </AccountContext.Provider>
    );
};

const useAccounts = () => {
    const context = useContext(AccountContext);
    if (context === undefined) {
        throw new Error('useAccounts must be used within a AccountContextProvider');
    }
    return context;
};

export { AccountContextProvider, useAccounts };
