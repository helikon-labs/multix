import { Alert, Box, Dialog, DialogContent, DialogTitle, Grid2 as Grid } from '@mui/material';
import { Button } from '../library';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { styled } from '@mui/material/styles';
import { useMultiProxy } from '../../contexts/MultiProxyContext';
import { ModalCloseButton } from '../library/ModalCloseButton';
import { SignClientTypes } from '@walletconnect/types';
import { useWalletConnect } from '../../contexts/WalletConnectContext';
import { useGetWalletConnectNamespace } from '../../hooks/useWalletConnectNamespace';
import AccountDisplay from '../AccountDisplay/AccountDisplay';
import { AccountBadge } from '../../types';
import { getSdkError } from '@walletconnect/utils';

interface Props {
    onClose: () => void;
    className?: string;
    sessionProposal?: SignClientTypes.EventArguments['session_proposal'];
}

const WalletConnectSessionProposal = ({ onClose, className, sessionProposal }: Props) => {
    const { selectedMultiProxy } = useMultiProxy();
    const { walletKit, refresh } = useWalletConnect();
    const { currentNamespace, getAccountsWithNamespace } = useGetWalletConnectNamespace();
    const [errorMessage, setErrorMessage] = useState('');
    const accountsToShare = useMemo(() => {
        const accountsToShare = [
            selectedMultiProxy?.proxy,
            ...(selectedMultiProxy?.multisigs.map(({ address }) => address) || []),
        ].filter((address) => !!address) as string[];
        return getAccountsWithNamespace(accountsToShare);
    }, [getAccountsWithNamespace, selectedMultiProxy?.multisigs, selectedMultiProxy?.proxy]);

    const { methods, events, chains } = useMemo(
        () => ({
            methods: [
                ...(sessionProposal?.params.requiredNamespaces?.polkadot?.methods ?? []),
                ...(sessionProposal?.params.optionalNamespaces?.polkadot?.methods ?? []),
            ],
            events: [
                ...(sessionProposal?.params.requiredNamespaces?.polkadot?.events ?? []),
                ...(sessionProposal?.params.optionalNamespaces?.polkadot?.events ?? []),
            ],
            chains: [
                ...(sessionProposal?.params.requiredNamespaces?.polkadot?.chains ?? []),
                ...(sessionProposal?.params.optionalNamespaces?.polkadot?.chains ?? []),
            ],
        }),
        [sessionProposal?.params],
    );

    useEffect(() => {
        if (!walletKit || !sessionProposal) return;

        if (!chains.includes(currentNamespace)) {
            setErrorMessage(
                `Multix is not connected to the same network as the WalletConnect request. Please switch to the correct network.
        - Requested: ${chains}
        - Current: ${currentNamespace}`,
            );
        } else {
            setErrorMessage('');
        }
    }, [chains, currentNamespace, sessionProposal, walletKit]);

    const onApprove = useCallback(() => {
        if (!walletKit || !sessionProposal) return;

        walletKit
            .approveSession({
                id: sessionProposal.id,
                namespaces: {
                    polkadot: {
                        accounts: accountsToShare,
                        methods,
                        events,
                        chains,
                    },
                },
            })
            .catch(console.error)
            .finally(() => {
                onClose();
                refresh();
            });
    }, [accountsToShare, chains, events, methods, onClose, refresh, sessionProposal, walletKit]);

    const onReject = useCallback(() => {
        if (!walletKit || !sessionProposal) return;

        walletKit
            .rejectSession({
                id: sessionProposal.id,
                reason: getSdkError('USER_REJECTED_METHODS'),
            })
            .catch(console.error)
            .finally(() => {
                onClose();
            });
    }, [onClose, sessionProposal, walletKit]);

    return (
        <Dialog
            fullWidth
            maxWidth={'sm'}
            open
            className={className}
        >
            <ModalCloseButton onClose={onReject} />
            <DialogTitle>WalletConnect Connection Request</DialogTitle>
            <DialogContent className="generalContainer">
                <Grid container>
                    {!!errorMessage && <AlertStyled severity="error">{errorMessage}</AlertStyled>}
                    <Grid size={12}>
                        <AppInfoStyled>From:</AppInfoStyled>{' '}
                        {sessionProposal?.params.proposer.metadata.name}
                        <br />
                        <AppInfoStyled>Website:</AppInfoStyled>{' '}
                        {sessionProposal?.params.proposer.metadata.url}
                        <br />
                        <AppInfoStyled>Methods:</AppInfoStyled> {methods.join(', ')}
                        <br />
                        <AppInfoStyled>Events:</AppInfoStyled> {events.join(', ')}
                    </Grid>
                    <Grid size={12}>
                        <TitleStyled>The following accounts will be shared:</TitleStyled>
                        <AccountWrapperStyled>
                            {selectedMultiProxy?.proxy && (
                                <AccountDisplay
                                    address={selectedMultiProxy?.proxy}
                                    badge={AccountBadge.PURE}
                                    withName
                                    canCopy
                                />
                            )}
                            {selectedMultiProxy?.multisigs.map(({ address }) => {
                                return (
                                    <AccountDisplay
                                        key={address}
                                        address={address}
                                        badge={AccountBadge.MULTI}
                                        withName
                                        canCopy
                                    />
                                );
                            })}
                        </AccountWrapperStyled>
                    </Grid>
                    <ButtonContainerStyled
                        size={12}
                        className="buttonContainer"
                    >
                        <Button
                            variant="secondary"
                            onClick={onReject}
                        >
                            Reject
                        </Button>
                        <Button
                            variant="primary"
                            onClick={onApprove}
                            disabled={!!errorMessage}
                        >
                            Approve
                        </Button>
                    </ButtonContainerStyled>
                </Grid>
            </DialogContent>
        </Dialog>
    );
};

const TitleStyled = styled('h3')`
    font-weight: 500;
`;

const AccountWrapperStyled = styled(Box)`
    padding-left: 1rem;
`;

const AppInfoStyled = styled('span')`
    font-weight: 500;
`;

const ButtonContainerStyled = styled(Grid)`
    text-align: right;
    margin-top: 1rem;

    button:last-child {
        margin-left: 1rem;
    }
`;

const AlertStyled = styled(Alert)`
    margin-bottom: 1rem;
`;

export default styled(WalletConnectSessionProposal)`
    .accountEdition {
        margin-bottom: 1rem;
        align-items: end;
    }
`;
