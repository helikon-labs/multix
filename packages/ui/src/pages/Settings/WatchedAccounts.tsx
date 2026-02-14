import { styled } from '@mui/material/styles';
import { Box, Grid2 as Grid, IconButton, Paper } from '@mui/material';
import { useWatchedAccounts } from '../../contexts/WatchedAccountsContext';
import AccountDisplay from '../../components/AccountDisplay/AccountDisplay';
import { HiOutlineXMark } from 'react-icons/hi2';
import AccountSelection from '../../components/select/AccountSelection';
import { useMemo } from 'react';

const WatchedAccounts = () => {
    const { watchedAddresses, removeWatchedAccount, addWatchedAccount } = useWatchedAccounts();
    const hasWatchedAddresses = useMemo(() => watchedAddresses.length > 0, [watchedAddresses]);

    return (
        <>
            {hasWatchedAddresses && (
                <WatchAccountsHeaderStyled>Currently watched accounts:</WatchAccountsHeaderStyled>
            )}
            <Grid
                container
                spacing={2}
            >
                {hasWatchedAddresses && (
                    <Grid size={{ xs: 12, md: 8 }}>
                        <PaperStyled>
                            {watchedAddresses.map((address) => {
                                return (
                                    <AccountItemWrapperStyled
                                        key={address}
                                        data-cy="container-account-details"
                                    >
                                        <AccountDisplayStyled
                                            address={address}
                                            canEdit
                                            canCopy
                                        />
                                        <IconButtonDeleteStyled
                                            aria-label="delete"
                                            onClick={() => removeWatchedAccount(address)}
                                            data-cy="button-delete-watched-account"
                                        >
                                            <HiOutlineXMark />
                                        </IconButtonDeleteStyled>
                                    </AccountItemWrapperStyled>
                                );
                            })}
                        </PaperStyled>
                    </Grid>
                )}
                <Grid size={{ xs: 12, md: 8 }}>
                    <AccountSelectionWrapperStyled data-cy="wrapper-watched-accounts-inputs">
                        <AccountSelection
                            className="accountDropdown"
                            currentSelection={watchedAddresses}
                            addAccount={addWatchedAccount}
                            actionButtonLabel="Watch"
                            actionButtonVariant="primary"
                            withName
                            withAddButton
                            withPreselection={false}
                            //make sure the first state is empty
                            value=""
                        />
                    </AccountSelectionWrapperStyled>
                </Grid>
            </Grid>
        </>
    );
};

const WatchAccountsHeaderStyled = styled('h3')`
    color: ${({ theme }) => theme.custom.gray[800]};
    font-size: 1rem;
    font-weight: 400;
    margin: 0 0 0.5rem 0;
`;

const PaperStyled = styled(Paper)`
    border-radius: ${({ theme }) => theme.custom.borderRadius};
    border: 1px solid ${({ theme }) => theme.custom.text.borderColor};
    box-shadow: none;

    & > :last-of-type {
        border-bottom: none;
    }
`;

const IconButtonDeleteStyled = styled(IconButton)`
    margin-left: 1rem;
    height: 2.5rem;
    align-self: center;
`;

const AccountDisplayStyled = styled(AccountDisplay)`
    flex: 1;
`;

const AccountItemWrapperStyled = styled(Box)`
    display: flex;
    align-items: center;
    padding: 0.75rem 1rem;
    border-bottom: 1px solid ${({ theme }) => theme.custom.text.borderColor};
`;

const AccountSelectionWrapperStyled = styled(Box)`
    display: flex;
    margin-bottom: 2rem;

    .MuiAutocomplete-root {
        margin-right: 0 !important;
    }

    .accountDropdown {
        display: flex;
        flex-direction: column;

        & > * {
            width: 100%;
        }

        & > :last-child {
            margin-top: 0.5rem;
        }
    }
`;

export default WatchedAccounts;
