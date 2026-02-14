import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useAccounts } from './AccountsContext';
import { useApi } from './ApiContext';
import { encodeNames } from '../utils/namesUtil';
import { getPubKeyFromAddress } from '../utils/getPubKeyFromAddress';

export type AccountNames = { [pubKey: string]: string };
const LOCALSTORAGE_ACCOUNT_NAMES_KEY = 'multix.accountNames';

type AccountNamesContextProps = {
    children: React.ReactNode | React.ReactNode[];
};

const MAX_NAME_LENGTH = 50;

export interface IAccountNamesContext {
    accountNames: AccountNames;
    pubKeyNames: AccountNames;
    getNamesWithExtension: (address: string) => string | undefined;
    addName: (name: string, address: string) => void;
    addNames: (newAdditions: AccountNames) => void;
    setPubKeyNames: React.Dispatch<React.SetStateAction<AccountNames>>;
}

const AccountNamesContext = createContext<IAccountNamesContext | undefined>(undefined);

const AccountNamesContextProvider = ({ children }: AccountNamesContextProps) => {
    const [accountNames, setAccountNames] = useState<AccountNames>({});
    const [pubKeyNames, setPubKeyNames] = useState<AccountNames>({});
    const { getAccountByAddress } = useAccounts();
    const { chainInfo } = useApi();

    const getNamesWithExtension = useCallback(
        (address: string) => {
            const extensionAccount = getAccountByAddress(address);
            if (extensionAccount) {
                return extensionAccount.name;
            }

            return accountNames[address] || '';
        },
        [accountNames, getAccountByAddress],
    );

    const loadNames = useCallback(() => {
        const namesHexString = localStorage.getItem(LOCALSTORAGE_ACCOUNT_NAMES_KEY);

        if (!namesHexString) {
            console.error('No local name to load');
            return;
        }
        const namePubkeyParsed = JSON.parse(namesHexString) as AccountNames;
        setPubKeyNames(namePubkeyParsed);
    }, []);

    useEffect(() => {
        if (!chainInfo) {
            return;
        }
        const namesString = encodeNames(pubKeyNames, chainInfo.ss58Format);
        setAccountNames(namesString);
    }, [chainInfo, pubKeyNames]);

    const saveNames = useCallback(() => {
        if (!Object.entries(pubKeyNames).length) return;

        localStorage.setItem(LOCALSTORAGE_ACCOUNT_NAMES_KEY, JSON.stringify(pubKeyNames));
    }, [pubKeyNames]);

    const addName = useCallback(
        (name: string, address: string) => {
            const pubKey = getPubKeyFromAddress(address);

            if (!pubKey) return;

            setPubKeyNames({
                ...pubKeyNames,
                ...{ [pubKey]: name.slice(0, MAX_NAME_LENGTH) },
            });
        },
        [pubKeyNames],
    );

    const addNames = useCallback(
        (newAdditions: AccountNames) => {
            const truncated = Object.entries(newAdditions).reduce((acc, [address, name]) => {
                const pubKey = getPubKeyFromAddress(address);

                if (!pubKey) return acc;

                return {
                    ...acc,
                    [pubKey]: name.slice(0, MAX_NAME_LENGTH),
                };
            }, {});
            const newNames = { ...pubKeyNames, ...truncated };
            setPubKeyNames(newNames);
        },
        [pubKeyNames],
    );

    useEffect(() => {
        loadNames();
    }, [loadNames]);

    // save names each time it changes
    useEffect(() => {
        saveNames();
    }, [pubKeyNames, saveNames]);

    return (
        <AccountNamesContext.Provider
            value={{
                accountNames,
                pubKeyNames,
                setPubKeyNames,
                addName,
                addNames,
                getNamesWithExtension,
            }}
        >
            {children}
        </AccountNamesContext.Provider>
    );
};

const useAccountNames = () => {
    const context = useContext(AccountNamesContext);
    if (context === undefined) {
        throw new Error('useAccountNames must be used within a AccountNamesContextProvider');
    }
    return context;
};

export { AccountNamesContextProvider, useAccountNames };
