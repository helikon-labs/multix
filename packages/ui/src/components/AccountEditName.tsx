import { Grid2 as Grid } from '@mui/material';
import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { useAccounts } from '../contexts/AccountsContext';
import { useAccountNames } from '../contexts/AccountNamesContext';
import AccountDisplay from './AccountDisplay/AccountDisplay';
import { debounce } from '../utils/debounce';
import { InputField } from './library';

export interface OnChangeArgs {
    address: string;
    name: string;
}

interface Props {
    className?: string;
    address: string;
    onNameChange: (args: OnChangeArgs) => void;
    testId?: string;
}

const AccountEditName = ({ address, onNameChange, className, testId }: Props) => {
    const { getNamesWithExtension } = useAccountNames();
    const { ownAddressList } = useAccounts();
    const [name, setName] = useState(getNamesWithExtension(address) || '');
    const isExtensionAccount = useMemo(
        () => ownAddressList.includes(address),
        [address, ownAddressList],
    );

    const debouncedNameChange = useMemo(() => debounce(onNameChange, 300), [onNameChange]);

    const onChange = useCallback(
        (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const value = event.target.value;
            setName(value);
            debouncedNameChange({ address, name: value });
        },
        [address, debouncedNameChange],
    );

    return (
        <Grid
            className={className}
            container
            spacing={2}
        >
            <Grid
                size={{ xs: 12, sm: 6, md: 4 }}
                alignItems="center"
            >
                <AccountDisplay
                    address={address}
                    withName={false}
                />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 8 }}>
                <InputField
                    label={`Name${isExtensionAccount ? ' (from extension)' : ''}`}
                    onChange={onChange}
                    disabled={isExtensionAccount}
                    value={name}
                    data-cy={`input-edit-${testId}-name`}
                />
            </Grid>
        </Grid>
    );
};

export default AccountEditName;
