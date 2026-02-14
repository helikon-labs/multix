import { Alert, Box, Grid2 as Grid } from '@mui/material';
import { ChangeEvent, SyntheticEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { styled } from '@mui/material/styles';
import { useAccounts } from '../../contexts/AccountsContext';
import { isValidAddress } from '../../utils/isValidAddress';
import { useAccountNames } from '../../contexts/AccountNamesContext';
import { Button, InputField } from '../library';
import GenericAccountSelection, { AccountBaseInfo } from './GenericAccountSelection';
import { useAccountBaseFromAccountList } from '../../hooks/useAccountBaseFromAccountList';
import { getOptionLabel } from '../../utils/getOptionLabel';
import { getPubKeyFromAddress } from '../../utils/getPubKeyFromAddress';
import { useApi } from '../../contexts/ApiContext';

interface Props {
    className?: string;
    addressDisabled?: boolean;
    nameDisabled?: boolean;
    addAccount?: (address: string) => void;
    value?: string;
    label?: string;
    actionButtonLabel?: string;
    actionButtonVariant?: 'primary' | 'secondary';
    currentSelection?: string[];
    withName?: boolean;
    withAddButton?: boolean;
    withPreselection?: boolean;
}

const AccountSelection = ({
    className,
    addAccount,
    addressDisabled = false,
    nameDisabled = false,
    value,
    label = 'Address',
    actionButtonLabel = 'Add',
    actionButtonVariant = 'secondary',
    currentSelection = [],
    withName = false,
    withAddButton = false,
    withPreselection = true,
}: Props) => {
    const { getAccountByAddress } = useAccounts();
    const { chainInfo } = useApi();
    const [errorMessage, setErrorMessage] = useState('');
    const { accountNames, addName } = useAccountNames();
    const [name, setName] = useState('');
    const accountBase = useAccountBaseFromAccountList();
    const [selected, setSelected] = useState(accountBase.find(({ address }) => address === value));
    const dedupedSignatories = useMemo(() => {
        return accountBase.filter((account) => !currentSelection.includes(account.address));
    }, [accountBase, currentSelection]);
    const currentSelectionPubKeys = useMemo(
        () => getPubKeyFromAddress(currentSelection),
        [currentSelection],
    );
    const extensionName = useMemo(() => {
        if (!selected) return '';
        return getAccountByAddress(selected.address)?.name;
    }, [getAccountByAddress, selected]);

    useEffect(() => {
        const previouslyNameAccount = selected && accountNames[selected.address];
        if (previouslyNameAccount) {
            setName(previouslyNameAccount);
        }
    }, [accountNames, selected]);

    const onChange = useCallback((newAccount?: AccountBaseInfo) => {
        newAccount && setSelected(newAccount);
    }, []);

    const onAdd = useCallback(() => {
        if (!selected) {
            return;
        }

        if (!isValidAddress(selected.address)) {
            setErrorMessage('Invalid address');
            return;
        }

        // if we are connected to a non eth network
        // and adding eth accounts
        if (
            !chainInfo?.isEthereum &&
            selected.address.length === 42 &&
            selected.address.startsWith('0x')
        ) {
            setErrorMessage('Ethereum addresses are not compatible with this network');
            return;
        }

        // if we are connected to an eth network
        // all addresses must be compatible
        if (
            chainInfo?.isEthereum &&
            selected.address.length !== 42 &&
            !selected.address.startsWith('0x')
        ) {
            setErrorMessage('Non Ethereum address detected');
            return;
        }

        const pubkey = getPubKeyFromAddress(selected.address);
        if (pubkey && (currentSelectionPubKeys as string[]).includes(pubkey)) {
            setErrorMessage('Account already added');
            return;
        }

        if (addAccount) {
            name && addName(name, selected.address);
            addAccount(selected.address);
            setSelected(undefined);
            setName('');
        }
    }, [selected, chainInfo, currentSelectionPubKeys, addAccount, name, addName]);

    const handleSpecialKeys = useCallback(
        (e: any) => {
            if (['Enter', 'Escape'].includes(e.key)) {
                onAdd();
            }
        },
        [onAdd],
    );

    const onNameChange = useCallback(
        (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const value = event.target.value;
            setName(value);
        },
        [],
    );

    const onInputChange = useCallback(
        (
            _: SyntheticEvent<Element, Event>,
            val: NonNullable<
                AccountBaseInfo | string | undefined | (string | AccountBaseInfo | undefined)[]
            >,
        ) => {
            setErrorMessage('');
            setName('');
            const value = getOptionLabel(val as string);
            setSelected(value ? { address: value } : undefined);
        },
        [],
    );

    return (
        <Grid
            container
            width={'100%'}
        >
            {!!errorMessage && (
                <Grid
                    size={12}
                    data-cy="label-add-account-error"
                >
                    <AlertStyled severity="warning">{errorMessage}</AlertStyled>
                </Grid>
            )}
            <Grid size={12}>
                <BoxStyled className={className}>
                    <GenericAccountSelection
                        allowAnyAddressInput={true}
                        disabled={addressDisabled}
                        accountList={withPreselection ? dedupedSignatories : []}
                        onChange={onChange}
                        onInputChange={onInputChange}
                        value={selected}
                        label={label}
                    />
                    {withName && (
                        <InputField
                            label="Name"
                            onChange={onNameChange}
                            disabled={!!extensionName || nameDisabled}
                            value={extensionName || name || ''}
                            onKeyDown={handleSpecialKeys}
                            data-cy="input-account-name"
                        />
                    )}
                    {withAddButton && (
                        <ButtonAddStyled
                            onClick={onAdd}
                            variant={actionButtonVariant}
                            disabled={!selected || !!errorMessage}
                            data-cy="button-add-account"
                        >
                            {actionButtonLabel}
                        </ButtonAddStyled>
                    )}
                </BoxStyled>
            </Grid>
        </Grid>
    );
};

const AlertStyled = styled(Alert)`
    margin: 1rem 0 1rem 0;
`;

const BoxStyled = styled(Box)`
    align-items: center;
    flex-direction: column;

    @media (min-width: ${({ theme }) => theme.breakpoints.values.md}px) {
        flex-direction: row;
        align-items: flex-end;
    }

    .MuiBox-root,
    label {
        width: 100%;
        margin: 0.5rem 0;

        @media (min-width: ${({ theme }) => theme.breakpoints.values.md}px) {
            margin: 0;
        }
    }
`;

const ButtonAddStyled = styled(Button)`
    margin-top: 1rem;
    align-self: center;
    text-align: center;
    width: 100%;
    min-height: 2.5625rem;

    @media (min-width: ${({ theme }) => theme.breakpoints.values.md}px) {
        align-self: end;
        margin: 0 0 0 1rem;
        width: auto;
    }
`;

export default styled(AccountSelection)`
    display: flex;
    flex: 1;

    .MuiAutocomplete-root {
        @media (min-width: ${({ theme }) => theme.breakpoints.values.md}px) {
            margin-right: 0.5rem;
        }
    }

    & > * {
        flex: 1;
    }

    & > button {
        flex: 0;
    }
`;
