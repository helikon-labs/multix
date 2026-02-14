import {
    Alert,
    CircularProgress,
    Dialog,
    DialogContent,
    DialogTitle,
    Grid2 as Grid,
} from '@mui/material';
import { Button } from '../library';
import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { styled } from '@mui/material/styles';
import { useAccounts } from '../../contexts/AccountsContext';
import { useApi } from '../../contexts/ApiContext';
import { useMultiProxy } from '../../contexts/MultiProxyContext';
import CallInfo from '../CallInfo';
import SignerSelection from '../select/SignerSelection';
import { useSigningCallback } from '../../hooks/useSigningCallback';
import { getExtrinsicName } from '../../utils/getExtrinsicName';
import { useCallInfoFromCallData } from '../../hooks/useCallInfoFromCallData';
import { ModalCloseButton } from '../library/ModalCloseButton';
import { SignClientTypes } from '@walletconnect/types';
import { useGetMultisigTx } from '../../hooks/useGetMultisigTx';
import GenericAccountSelection, { AccountBaseInfo } from '../select/GenericAccountSelection';
import { useWalletConnect } from '../../contexts/WalletConnectContext';
import { getWalletConnectErrorResponse } from '../../utils/getWalletConnectErrorResponse';
import { useMultisigProposalNeededFunds } from '../../hooks/useMultisigProposalNeededFunds';
import { useCheckTransferableBalance } from '../../hooks/useCheckTransferableBalance';
import { formatBigIntBalance } from '../../utils/formatBnBalance';
import { getErrorMessageReservedFunds } from '../../utils/getErrorMessageReservedFunds';
import { useGetWalletConnectNamespace } from '../../hooks/useWalletConnectNamespace';
import { useGetED } from '../../hooks/useGetED';

export interface SigningModalProps {
    onClose: () => void;
    className?: string;
    request: SignClientTypes.EventArguments['session_request'];
    onSuccess?: () => void;
}

const ProposalSigning = ({ onClose, className, request, onSuccess }: SigningModalProps) => {
    const { api, chainInfo } = useApi();
    const { currentNamespace, isLoading: isNamespaceLoading } = useGetWalletConnectNamespace();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { walletKit } = useWalletConnect();
    const {
        getMultisigByAddress,
        selectedMultiProxy,
        getMultisigAsAccountBaseInfo,
        selectMultiProxy,
    } = useMultiProxy();
    const [selectedMultisig, setSelectedMultisig] = useState(selectedMultiProxy?.multisigs[0]);
    const { selectedAccount } = useAccounts();
    const multisigList = useMemo(
        () => getMultisigAsAccountBaseInfo(),
        [getMultisigAsAccountBaseInfo],
    );
    const [errorMessage, setErrorMessage] = useState<ReactNode | string>('');
    const originAddress = request.params.request.params.address;
    const isProxySelected = useMemo(
        () => selectedMultiProxy?.proxy === originAddress,
        [selectedMultiProxy, originAddress],
    );
    const callData = useMemo(
        () => request.params.request.params.transactionPayload.method,
        [request],
    );
    const threshold = useMemo(() => selectedMultisig?.threshold, [selectedMultisig]);
    const { callInfo, isGettingCallInfo } = useCallInfoFromCallData({ isPplTx: false, callData });
    const extrinsicToCall = useMemo(() => {
        if (!callInfo?.call) return;
        return callInfo.call;
    }, [callInfo]);
    // this is a creation, we can force axsulti
    const multisigTx = useGetMultisigTx({
        selectedMultisig,
        extrinsicToCall,
        senderAddress: selectedAccount?.address,
        isProxy: isProxySelected,
        fromAddress: originAddress,
        threshold,
        forceAsMulti: true,
    });
    const { multisigProposalNeededFunds, reserved } = useMultisigProposalNeededFunds({
        threshold,
        signatories: selectedMultisig?.signatories,
        call: multisigTx,
    });

    const { hasEnoughFreeBalance: hasSignerEnoughFunds } = useCheckTransferableBalance({
        min: multisigProposalNeededFunds,
        address: selectedAccount?.address,
        withPplApi: false,
    });

    useEffect(() => {
        if (isNamespaceLoading) return;

        const requestedChainId = request.params.chainId;
        if (requestedChainId !== currentNamespace) {
            setErrorMessage(
                `Wrong selected network in Multix. Please reject, then select the correct network and resubmit the transaction. Current Namespace: ${currentNamespace}, Request with namespace: ${requestedChainId}`,
            );
        }
    }, [currentNamespace, isNamespaceLoading, originAddress, request.params.chainId]);

    const isCorrectMultiproxySelected = useMemo(
        () =>
            selectedMultiProxy?.proxy === originAddress ||
            selectedMultiProxy?.multisigs.map(({ address }) => address).includes(originAddress),
        [selectedMultiProxy, originAddress],
    );

    useEffect(() => {
        if (!isCorrectMultiproxySelected) {
            setErrorMessage(
                `Wrong multisig selected in Multix. Please reject, then select the correct multisig and resubmit the transaction. Request with address: ${originAddress}`,
            );
        }
    }, [isCorrectMultiproxySelected, originAddress]);

    const { existentialDeposit } = useGetED({
        withPplApi: false,
    });

    const minBalance = useMemo(() => {
        if (!existentialDeposit || !multisigProposalNeededFunds) return;

        return multisigProposalNeededFunds + existentialDeposit;
    }, [existentialDeposit, multisigProposalNeededFunds]);

    useEffect(() => {
        if (!!minBalance && !hasSignerEnoughFunds) {
            const requiredBalanceString = formatBigIntBalance(
                minBalance,
                chainInfo?.tokenDecimals,
                {
                    tokenSymbol: chainInfo?.tokenSymbol,
                },
            );

            const reservedString = formatBigIntBalance(reserved, chainInfo?.tokenDecimals, {
                tokenSymbol: chainInfo?.tokenSymbol,
            });
            const errorWithReservedFunds = getErrorMessageReservedFunds({
                identifier: '"Signing with" account',
                requiredBalanceString,
                reservedString,
            });
            setErrorMessage(errorWithReservedFunds);
        }
    }, [chainInfo, reserved, hasSignerEnoughFunds, minBalance]);

    useEffect(() => {
        selectMultiProxy(request.params.request.params.address);
    }, [request, selectMultiProxy]);

    useEffect(() => {
        if (!selectedMultisig && !!selectedMultiProxy) {
            setSelectedMultisig(selectedMultiProxy.multisigs[0]);
        }
    }, [selectMultiProxy, selectedMultiProxy, selectedMultisig]);

    const onSubmitting = useCallback(() => {
        setIsSubmitting(false);
        onClose();
    }, [onClose]);

    const signCallback = useSigningCallback({
        onSuccess: () => {
            onSuccess && onSuccess();
            const response = getWalletConnectErrorResponse(
                request.id,
                'Multix multisig transaction ongoing...',
            );
            walletKit?.respondSessionRequest({
                topic: request.topic,
                response,
            });
        },
        onSubmitting,
        onError: () => setIsSubmitting(false),
    });

    const onSign = useCallback(async () => {
        if (!threshold) {
            const error = 'Threshold is undefined';
            console.error(error);
            setErrorMessage(error);
            return;
        }

        if (!api) {
            const error = 'Api is not ready';
            console.error(error);
            setErrorMessage(error);
            return;
        }

        if (!selectedAccount || !originAddress) {
            const error = 'No selected signer or multisig/proxy';
            console.error(error);
            setErrorMessage(error);
            return;
        }

        if (!extrinsicToCall) {
            const error = 'No extrinsic to call';
            console.error(error);
            setErrorMessage(error);
            return;
        }

        if (!multisigTx) {
            return;
        }

        setIsSubmitting(true);

        multisigTx.signSubmitAndWatch(selectedAccount.polkadotSigner).subscribe(signCallback);
    }, [threshold, api, originAddress, extrinsicToCall, multisigTx, selectedAccount, signCallback]);

    const handleMultisigSelection = useCallback(
        (account: AccountBaseInfo) => {
            const selected = getMultisigByAddress(account.address);
            setSelectedMultisig(selected);
        },
        [getMultisigByAddress],
    );

    const onReject = useCallback(() => {
        const response = getWalletConnectErrorResponse(
            request.id,
            'User rejected request on Multix',
        );

        walletKit
            ?.respondSessionRequest({
                topic: request.topic,
                response,
            })
            .catch(console.error)
            .finally(() => onClose());
    }, [onClose, request, walletKit]);

    return (
        <Dialog
            fullWidth
            maxWidth={'md'}
            open
            className={className}
        >
            <ModalCloseButton onClose={onClose} />
            <DialogTitle>WalletConnect Transaction signing</DialogTitle>
            <DialogContent>
                <Grid
                    container
                    alignItems="center"
                >
                    {isProxySelected && multisigList.length > 1 && (
                        <>
                            <Grid size={{ xs: 12, md: 2 }}>
                                <h4>Using</h4>
                            </Grid>
                            <Grid size={{ xs: 12, md: 10 }}>
                                <GenericAccountSelection
                                    className="multiSelection"
                                    accountList={multisigList}
                                    onChange={handleMultisigSelection}
                                    value={
                                        multisigList.find(
                                            ({ address }) => address === selectedMultisig?.address,
                                        ) || multisigList[0]
                                    }
                                    label=""
                                    withBadge
                                />
                            </Grid>
                        </>
                    )}
                    <Grid size={{ xs: 12, md: 2 }}>
                        <h4>Signing with</h4>
                    </Grid>
                    <Grid size={{ xs: 12, md: 10 }}>
                        <SignerSelection
                            possibleSigners={selectedMultisig?.signatories || []}
                            onChange={() => setErrorMessage('')}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 2 }}>
                        <h4>Call hash</h4>
                    </Grid>
                    <Grid size={{ xs: 12, md: 10 }}>
                        <HashGridStyled>{callInfo?.hash}</HashGridStyled>
                    </Grid>

                    {!!callInfo?.call && (
                        <>
                            <Grid
                                size={{ xs: 12, md: 2 }}
                                alignSelf="flex-start"
                            >
                                <CallTitleStyled>Call</CallTitleStyled>
                            </Grid>
                            <Grid
                                size={{ xs: 12, md: 10 }}
                                className="callInfo"
                            >
                                <CallInfo
                                    aggregatedData={{
                                        decodedCall: callInfo?.call.decodedCall,
                                        callData,
                                        name: getExtrinsicName(callInfo?.section, callInfo?.method),
                                    }}
                                    expanded={!errorMessage}
                                    isPplChainTx={false}
                                />
                            </Grid>
                        </>
                    )}
                    {!!errorMessage && (
                        <>
                            <Grid size={{ xs: 0, md: 2 }} />
                            <Grid
                                size={{ xs: 12, md: 10 }}
                                className="errorMessage"
                            >
                                <Alert severity="error">{errorMessage}</Alert>
                            </Grid>
                        </>
                    )}
                    <ButtonContainerStyled size={{ xs: 12 }}>
                        {!isGettingCallInfo && (
                            <>
                                <Button
                                    variant="secondary"
                                    onClick={onReject}
                                    disabled={isSubmitting}
                                >
                                    Reject
                                </Button>

                                <Button
                                    variant="primary"
                                    onClick={onSign}
                                    disabled={!!errorMessage || isSubmitting || !callInfo?.call}
                                >
                                    Sign
                                </Button>
                            </>
                        )}
                        {isGettingCallInfo && (
                            <Button disabled>
                                <CircularProgress size={20} />
                            </Button>
                        )}
                    </ButtonContainerStyled>
                </Grid>
            </DialogContent>
        </Dialog>
    );
};

const HashGridStyled = styled(Grid)`
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: xsall;
`;

const CallTitleStyled = styled('h4')`
    margin-top: 0.5rem;
`;

const ButtonContainerStyled = styled(Grid)`
    text-align: right;
    margin-top: 1rem;

    button:first-of-type {
        margin-right: 1rem;
    }
`;
export default styled(ProposalSigning)(
    ({ theme }) => `
  .errorMessage {
    margin-top: 0.5rem;
    color: ${theme.custom.error};
  }
`,
);
