import { styled } from '@mui/material/styles';
import { Alert, Box, Grid2 as Grid, IconButton, Paper } from '@mui/material';
import AccountDisplay from '../../components/AccountDisplay/AccountDisplay';
import { HiOutlineXMark } from 'react-icons/hi2';
import AccountSelection from '../../components/select/AccountSelection';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useHiddenAccounts } from '../../contexts/HiddenAccountsContext';
import { useNetwork } from '../../contexts/NetworkContext';

const HiddenAccounts = () => {
    const { addHiddenAccount, networkHiddenAccounts, removeHiddenAccount } = useHiddenAccounts();
    const { selectedNetwork } = useNetwork();
    const [showWatchedAccountRemovedWarning, setShowWatchedAccountRemovedWarning] = useState(false);

    useEffect(() => {
        if (showWatchedAccountRemovedWarning) {
            setTimeout(() => {
                setShowWatchedAccountRemovedWarning(false);
            }, 10000);
        }
    }, [showWatchedAccountRemovedWarning]);

    const hasHiddenAddresses = useMemo(
        () => networkHiddenAccounts.length > 0,
        [networkHiddenAccounts],
    );

    const onHide = useCallback(
        (address: string) => {
            const shouldShowWarning = addHiddenAccount(address);
            shouldShowWarning.removedWatchedAccount && setShowWatchedAccountRemovedWarning(true);
        },
        [addHiddenAccount],
    );

    return (
        <>
            {showWatchedAccountRemovedWarning && (
                <AlertStryled
                    data-cy="alert-removed-watched-account"
                    severity="info"
                >
                    This account was a &quot;Watched accounts&quot;. It has been removed from the
                    watched list
                </AlertStryled>
            )}
            {hasHiddenAddresses && (
                <HiddenAccountsHeaderStyled>
                    Hidden accounts for {selectedNetwork}:
                </HiddenAccountsHeaderStyled>
            )}
            <Grid
                container
                spacing={2}
            >
                {hasHiddenAddresses && (
                    <Grid size={{ xs: 12, md: 8 }}>
                        <PaperStyled>
                            {networkHiddenAccounts.map((address) => {
                                return (
                                    <AccountItemWrapperStyled
                                        key={address}
                                        data-cy="container-hidden-account-details"
                                    >
                                        <AccountDisplayStyled
                                            address={address}
                                            canEdit
                                            canCopy
                                        />
                                        <IconButtonDeleteStyled
                                            aria-label="delete"
                                            onClick={() => removeHiddenAccount(address)}
                                            data-cy="button-delete-hidden-account"
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
                    <AccountSelectionWrapperStyled data-cy="wrapper-hidden-accounts-inputs">
                        <AccountSelection
                            className="accountDropdown"
                            currentSelection={networkHiddenAccounts}
                            addAccount={onHide}
                            actionButtonLabel="Hide"
                            actionButtonVariant="primary"
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

const HiddenAccountsHeaderStyled = styled('h3')`
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
const AlertStryled = styled(Alert)`
    margin-bottom: 1rem;
`;

export default HiddenAccounts;
