import { useCallback, useEffect, useMemo } from 'react';
import { useAccounts } from '../../contexts/AccountsContext';
import GenericAccountSelection, { AccountBaseInfo } from './GenericAccountSelection';
import { useAccountBaseFromAccountList } from '../../hooks/useAccountBaseFromAccountList';

interface SignerSelectionProps {
    className?: string;
    possibleSigners: string[];
    onChange?: () => void;
    label?: string;
}

const SignerSelection = ({ possibleSigners, onChange, label }: SignerSelectionProps) => {
    const { selectAccount, selectedAccount, getAccountByAddress } = useAccounts();
    const accountBase = useAccountBaseFromAccountList();
    const selectedAccountBaseInfo = useMemo(
        () => accountBase.find(({ address }) => selectedAccount?.address === address),
        [accountBase, selectedAccount?.address],
    );
    const signersList = useMemo(() => {
        return accountBase?.filter((account) => possibleSigners.includes(account.address)) || [];
    }, [accountBase, possibleSigners]);

    useEffect(() => {
        if (!selectedAccount || signersList.length === 0) {
            return;
        }

        if (!possibleSigners.includes(selectedAccount.address)) {
            const account = getAccountByAddress(signersList[0].address);
            account && selectAccount(account);
        }
    }, [getAccountByAddress, possibleSigners, selectAccount, selectedAccount, signersList]);

    const onChangeSigner = useCallback(
        (newAccount?: AccountBaseInfo) => {
            const account = newAccount && getAccountByAddress(newAccount.address);
            account && selectAccount(account);
            onChange && onChange();
        },
        [getAccountByAddress, onChange, selectAccount],
    );

    if (signersList.length === 0) {
        return null;
    }

    return (
        <GenericAccountSelection
            label={label}
            accountList={signersList}
            onChange={onChangeSigner}
            value={selectedAccountBaseInfo || signersList[0]}
            allowAnyAddressInput={false}
        />
    );
};

export default SignerSelection;
