import React, {
    useState,
    createContext,
    useContext,
    useCallback,
    useMemo,
    Dispatch,
    SetStateAction,
    useEffect,
} from 'react';
import { useAccounts as useRedotAccounts } from '@reactive-dot/react';
import { useApi } from './ApiContext';
import { encodeAccounts } from '../utils/encodeAccounts';
import { InjectedPolkadotAccount } from 'polkadot-api/pjs-signer';
import { useGetWalletConnectNamespace } from '../hooks/useWalletConnectNamespace';

const LOCALSTORAGE_SELECTED_ACCOUNT_KEY = 'multix.selectedAccount';
const LOCALSTORAGE_ALLOWED_CONNECTION_KEY = 'multix.canConnectToExtension';

type AccountContextProps = {
    children: React.ReactNode | React.ReactNode[];
};

export interface IAccountContext {
    selectedAccount?: InjectedPolkadotAccount;
    ownAccountList: InjectedPolkadotAccount[];
    ownAddressList: string[];
    selectAccount: (account: InjectedPolkadotAccount) => void;
    getAccountByAddress: (address: string) => InjectedPolkadotAccount | undefined;
    allowConnectionToExtension: () => void;
    isAllowedToConnectToExtension: boolean;
    isConnectionDialogOpen: boolean;
    setIsConnectionDialogOpen: Dispatch<SetStateAction<boolean>>;
}

const AccountContext = createContext<IAccountContext | undefined>(undefined);

const AccountContextProvider = ({ children }: AccountContextProps) => {
    const { walletConnectId } = useGetWalletConnectNamespace();
    const redotAccountList = useRedotAccounts();
    const { chainInfo } = useApi();
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

    const [selectedAccount, setSelected] = useState<InjectedPolkadotAccount | undefined>(
        ownAccountList?.[0],
    );
    const [isConnectionDialogOpen, setIsConnectionDialogOpen] = useState(false);
    const [isAllowedToConnectToExtension, setIsAllowedToConnectToExtension] = useState(false);
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

    const selectAccount = useCallback((account: InjectedPolkadotAccount) => {
        localStorage.setItem(LOCALSTORAGE_SELECTED_ACCOUNT_KEY, account.address);
        setSelected(account);
    }, []);

    useEffect(() => {
        if (!isAllowedToConnectToExtension) {
            const previouslyAllowed = localStorage.getItem(LOCALSTORAGE_ALLOWED_CONNECTION_KEY);
            if (previouslyAllowed === 'true') {
                setIsAllowedToConnectToExtension(true);
            }
            // setIsLocalStorageSetupDone(true)
        }
    }, [isAllowedToConnectToExtension]);

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
