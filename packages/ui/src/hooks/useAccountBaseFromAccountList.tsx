import { useMemo } from 'react';
import { AccountBaseInfo } from '../components/select/GenericAccountSelection';
import { useAccounts } from '../contexts/AccountsContext';
import { useAccountNames } from '../contexts/AccountNamesContext';

interface Params {
    withAccountsFromAddressBook: boolean;
}

export const useAccountBaseFromAccountList = (params?: Params) => {
    const { withAccountsFromAddressBook = false } = params || {};
    const { ownAccountList } = useAccounts();
    const { accountNames } = useAccountNames();

    const accountBase = useMemo((): AccountBaseInfo[] => {
        const ownAccountListAddresses =
            (ownAccountList && ownAccountList.map(({ address }) => address)) || [];
        const accountFromNameRegistry =
            (withAccountsFromAddressBook && Object.keys(accountNames).map((address) => address)) ||
            [];
        const addressesSet = new Set([...accountFromNameRegistry, ...ownAccountListAddresses]);

        return Array.from(addressesSet).map((address) => ({ address }));
    }, [accountNames, ownAccountList, withAccountsFromAddressBook]);

    return accountBase;
};
