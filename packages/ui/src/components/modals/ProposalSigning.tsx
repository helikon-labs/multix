import {
    Alert,
    CircularProgress,
    Dialog,
    DialogContent,
    DialogTitle,
    Grid2 as Grid,
} from '@mui/material';
import { Button, TextField } from '../library';
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { styled } from '@mui/material/styles';
import { useAccounts } from '../../contexts/AccountsContext';
import { useMultiProxy } from '../../contexts/MultiProxyContext';
import CallInfo from '../CallInfo';
import SignerSelection from '../select/SignerSelection';
import { useSigningCallback } from '../../hooks/useSigningCallback';
import { MultisigStorageInfo } from '../../types';
import { getExtrinsicName } from '../../utils/getExtrinsicName';
import { useCallInfoFromCallData } from '../../hooks/useCallInfoFromCallData';
import { ModalCloseButton } from '../library/ModalCloseButton';
import { useGetSortAddress } from '../../hooks/useGetSortAddress';
import { useCheckTransferableBalance } from '../../hooks/useCheckTransferableBalance';
import { getAsMultiTx } from '../../utils/getAsMultiTx';
import { CallDataInfoFromChain } from '../../contexts/PendingTxContext';
import { debounce } from '../../utils/debounce';
import { FixedSizeBinary, HexString, Transaction } from 'polkadot-api';
import { TeleportFundsAlert } from '../TeleportFundsAlert';
import { usePplApi } from '../../contexts/PeopleChainApiContext';
import { useApi } from '../../contexts/ApiContext';

export interface SigningModalProps {
    onClose: () => void;
    className?: string;
    possibleSigners: string[];
    proposalData: CallDataInfoFromChain;
    onSuccess?: () => void;
    isPplChainTx: boolean;
}

const ProposalSigning = ({
    onClose,
    className,
    possibleSigners,
    proposalData,
    onSuccess,
    isPplChainTx,
}: SigningModalProps) => {
    const { pplApi, pplCompatibilityToken } = usePplApi();
    const { api: originApi, compatibilityToken: originCompatibilityToken } = useApi();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { getMultisigByAddress, setRefetchMultisigTimeoutMinutes, selectedHasProxy } =
        useMultiProxy();
    const { selectedAccount } = useAccounts();
    const [addedCallData, setAddedCallData] = useState<HexString | undefined>();
    const [debouncedAddedCallData, setDebouncedAddedCallData] = useState<HexString | undefined>();
    const [errorMessage, setErrorMessage] = useState('');
    const multisig = useMemo(
        () => getMultisigByAddress(proposalData.from),
        [getMultisigByAddress, proposalData],
    );
    const threshold = useMemo(() => multisig?.threshold || 0, [multisig]);
    const signatories = useMemo(() => multisig?.signatories || [], [multisig]);
    const isProposerSelected = useMemo(
        () => proposalData?.info?.depositor === selectedAccount?.address,
        [proposalData, selectedAccount],
    );
    const { callInfo, isGettingCallInfo } = useCallInfoFromCallData({
        isPplTx: isPplChainTx,
        callData: proposalData.callData || debouncedAddedCallData,
    });

    // check if the signer has enough funds to pay for the transaction fees
    // in case of a ppl chain tx, we need to check the balance on the ppl chain
    const { hasEnoughFreeBalance: hasSignerEnoughFunds } = useCheckTransferableBalance({
        min: 0n,
        address: selectedAccount?.address,
        withPplApi: isPplChainTx,
    });

    const amountToTeleport = useMemo(() => {
        if (!isPplChainTx || !pplApi || !pplCompatibilityToken) return 0n;

        // This is what we transfer to the ppl chain in case the sender doesn't have enough
        // to be safe, we send 10x the existential deposit + 10x the tx fee
        return (
            10n * pplApi.constants.Balances.ExistentialDeposit(pplCompatibilityToken) +
            (callInfo?.partialFee || 0n) * 10n
        );
    }, [callInfo?.partialFee, isPplChainTx, pplApi, pplCompatibilityToken]);

    const { hasEnoughFreeBalance: hasSignerEnoughOriginFunds } = useCheckTransferableBalance({
        min: amountToTeleport,
        address: selectedAccount?.address,
        withPplApi: false,
    });

    const hasReachedThreshold = useMemo(
        () => (proposalData.info?.approvals || []).length >= threshold - 1,
        [proposalData.info?.approvals, threshold],
    );
    const mustBeExecuted = useMemo(
        () => (proposalData.info?.approvals || []).length >= threshold,
        [proposalData.info?.approvals, threshold],
    );

    const mustProvideCallData = useMemo(() => {
        // the proposer can only reject or execute the last call,
        // if it's not the last call, then we don't need the calldata
        if (isProposerSelected && !hasReachedThreshold) return false;

        if (!threshold || !proposalData.callData) return true;

        // if it's the last approval call, we must use asMulti and have the call data
        // either from the chain, or from users
        return hasReachedThreshold;
    }, [hasReachedThreshold, isProposerSelected, proposalData.callData, threshold]);

    const onSubmitting = useCallback(() => {
        setIsSubmitting(false);
        // poll for 1min if the tx may make changes
        // such as creating a proxy, adding/removing a multisig
        if (mustProvideCallData) {
            setRefetchMultisigTimeoutMinutes(1);
        }
        onClose();
    }, [mustProvideCallData, onClose, setRefetchMultisigTimeoutMinutes]);

    const signCallback = useSigningCallback({
        onSuccess,
        onSubmitting,
        withSubscanLink: !isPplChainTx,
    });
    const { getSortAddress } = useGetSortAddress();

    const debouncedCallDatahange = useMemo(
        () => debounce(setDebouncedAddedCallData, 300),
        [setDebouncedAddedCallData],
    );

    useEffect(() => {
        if (isProposerSelected) {
            setAddedCallData(undefined);
            setErrorMessage('');
        }
    }, [isProposerSelected]);

    useEffect(() => {
        if (!!callInfo?.call && callInfo?.hash !== proposalData.hash) {
            setErrorMessage("The callData provided doesn't match with the on-chain transaction");
            return;
        }
    }, [callInfo, proposalData]);

    useEffect(() => {
        if (hasSignerEnoughFunds) {
            setErrorMessage('');
            return;
        }

        setErrorMessage(
            `The selected signer doesn't have enough funds ${isPplChainTx ? 'on the People Chain ' : ''}to pay for the transaction fees.`,
        );
    }, [hasSignerEnoughFunds, isPplChainTx]);

    const onSign = useCallback(
        async (isApproving: boolean) => {
            const otherSigners = getSortAddress(
                signatories.filter((signer) => signer !== selectedAccount?.address),
            );

            const api = isPplChainTx ? pplApi : originApi;
            const compatibilityToken = isPplChainTx
                ? pplCompatibilityToken
                : originCompatibilityToken;

            if (!threshold) {
                const error = 'Threshold is undefined';
                console.error(error);
                setErrorMessage(error);
                return;
            }

            if (!proposalData?.hash) {
                const error = 'Hash is undefined';
                console.error(error);
                setErrorMessage(error);
                return;
            }

            if (!proposalData?.info?.when.height) {
                const error = 'No time point found';
                console.error(error);
                setErrorMessage(error);
                return;
            }

            if (!api || !compatibilityToken) {
                const error = 'Api is not ready';
                console.error(error);
                setErrorMessage(error);
                return;
            }

            if (!selectedAccount) {
                const error = 'No selected account';
                console.error(error);
                setErrorMessage(error);
                return;
            }

            if (!multisig) {
                const error = 'No selected multisig';
                console.error(error);
                setErrorMessage(error);
                return;
            }

            // if the callData is needed, but none was supplied or found
            if (mustProvideCallData && !callInfo?.call) {
                const error = 'No callData found or supplied';
                console.error(error);
                setErrorMessage(error);
                return;
            }

            let amountOfSigner = 0;
            if (!hasReachedThreshold) {
                // In case the tx has been approved between the last couple blocks
                // and the tx in the indexer hasn't been updated we should query the latest state
                // right before sending the tx to have the right amount of signers.
                const callStorage = await api.query.Multisig.Multisigs.getEntries(multisig.address);

                callStorage.some((storage) => {
                    const hash = storage.keyArgs[1].asHex();
                    if (proposalData.hash === hash) {
                        const info = storage.value as MultisigStorageInfo;
                        amountOfSigner = info.approvals.length;

                        return true;
                    }

                    return false;
                });
            }

            // this is only relevant if we didn't know that we had
            // reached the threshold before
            const shouldExecute = hasReachedThreshold ? true : amountOfSigner >= threshold - 1;

            setIsSubmitting(true);
            let tx: Transaction<any, any, any, any> | undefined;

            // if it's a rejection we can send it right away, no need for weight or calldata
            if (!isApproving) {
                tx = api.tx.Multisig.cancel_as_multi({
                    threshold,
                    other_signatories: otherSigners,
                    timepoint: proposalData.info.when,
                    call_hash: FixedSizeBinary.fromHex(proposalData.hash),
                });

                // If we can submit the proposal and have the call data
            } else if (shouldExecute && callInfo?.call && callInfo?.weight) {
                tx = getAsMultiTx({
                    api,
                    threshold,
                    otherSignatories: otherSigners,
                    weight: callInfo.weight,
                    when: proposalData.info.when,
                    callData: proposalData.callData || addedCallData,
                    compatibilityToken,
                });

                // if we can't submit yet (more signatures required), all we need is the call hash
            } else if (!shouldExecute && proposalData.hash) {
                tx = api.tx.Multisig.approve_as_multi({
                    threshold,
                    other_signatories: otherSigners,
                    maybe_timepoint: proposalData.info.when,
                    call_hash: FixedSizeBinary.fromHex(proposalData.hash),
                    max_weight: { ref_time: 0n, proof_size: 0n },
                });
            } else {
                console.error("We don't have the required data to submit the call");
                return;
            }

            if (!tx) {
                console.error('tx is undefined in ProposalSigning');
                return;
            }

            tx.signSubmitAndWatch(selectedAccount.polkadotSigner).subscribe(signCallback);
        },
        [
            getSortAddress,
            signatories,
            isPplChainTx,
            pplApi,
            originApi,
            pplCompatibilityToken,
            originCompatibilityToken,
            threshold,
            proposalData,
            selectedAccount,
            multisig,
            mustProvideCallData,
            callInfo,
            hasReachedThreshold,
            signCallback,
            addedCallData,
        ],
    );

    const onAddedCallDataChange = useCallback(
        (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setErrorMessage('');
            setAddedCallData(event.target.value as HexString);
            debouncedCallDatahange(event.target.value as HexString);
        },
        [debouncedCallDatahange],
    );

    return (
        <Dialog
            fullWidth
            maxWidth={'md'}
            open
            className={className}
            data-cy="modal-tx-signing"
        >
            <ModalCloseButton onClose={onClose} />
            <DialogTitle>Transaction signing</DialogTitle>
            <DialogContent>
                <Grid container>
                    <Grid size={{ xs: 0, md: 1 }} />
                    <Grid size={{ xs: 12, md: 6 }}>
                        <SignerSelection
                            label="Signing with"
                            possibleSigners={possibleSigners}
                            onChange={() => setErrorMessage('')}
                        />
                    </Grid>
                    <Grid size={{ xs: 0, md: 5 }} />
                    <>
                        <Grid size={{ xs: 0, md: 1 }} />
                        <HashGridStyled size={{ xs: 12, md: 11 }}>
                            <span className="title">Call hash</span>
                            <br />
                            <span
                                className="hash"
                                data-cy="label-call-hash"
                            >
                                {proposalData.hash}
                            </span>
                        </HashGridStyled>
                    </>
                    {!proposalData.callData && (
                        <>
                            <Grid size={{ xs: 0, md: 1 }} />
                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField
                                    className="addedCallData"
                                    label={`Call data ${mustProvideCallData ? '' : '(optional)'}`}
                                    onChange={onAddedCallDataChange}
                                    value={addedCallData || ''}
                                    fullWidth
                                    data-cy="input-call-data"
                                />
                            </Grid>
                            <Grid size={{ xs: 0, md: 5 }} />
                        </>
                    )}
                    {!!callInfo?.call && (
                        <>
                            <Grid size={{ xs: 0, md: 1 }} />
                            <Grid
                                size={{ xs: 12, md: 11 }}
                                className="callInfo"
                            >
                                <CallInfo
                                    aggregatedData={
                                        proposalData.callData
                                            ? proposalData
                                            : {
                                                  decodedCall: callInfo?.call.decodedCall,
                                                  callData: addedCallData,
                                                  name: getExtrinsicName(
                                                      callInfo?.section,
                                                      callInfo?.method,
                                                  ),
                                              }
                                    }
                                    expanded
                                    isPplChainTx={isPplChainTx}
                                    withProxyFiltered={selectedHasProxy}
                                />
                            </Grid>
                        </>
                    )}
                    {!!isPplChainTx && !hasSignerEnoughOriginFunds && !hasSignerEnoughFunds && (
                        <>
                            <Grid size={{ xs: 0, md: 1 }} />
                            <Grid
                                size={{ xs: 12, md: 11 }}
                                className="errorMessage"
                            >
                                <Alert severity="error">
                                    The &quot;Signing with&quot; account doesn&apos;t have enough
                                    funds on the People Chain to pay for the transaction, and not
                                    enough on the current chain either to teleport.
                                </Alert>
                            </Grid>
                        </>
                    )}
                    {!!isPplChainTx && hasSignerEnoughOriginFunds && !hasSignerEnoughFunds && (
                        <>
                            <Grid size={{ xs: 0, md: 1 }} />
                            <Grid size={{ xs: 12, md: 11 }}>
                                <TeleportFundsAlert
                                    receivingAddress={selectedAccount?.address || ''}
                                    sendingAmount={amountToTeleport}
                                />
                            </Grid>
                        </>
                    )}
                    {!!errorMessage && (
                        <>
                            <Grid size={{ xs: 0, md: 1 }} />
                            <Grid
                                size={{ xs: 12, md: 11 }}
                                className="errorMessage"
                            >
                                <Alert severity="error">{errorMessage}</Alert>
                            </Grid>
                        </>
                    )}
                    <ButtonContainerStyled size={12}>
                        {!isGettingCallInfo && isProposerSelected && (
                            <Button
                                variant="negative"
                                onClick={() => onSign(false)}
                                disabled={isSubmitting}
                                data-cy="button-reject-tx"
                            >
                                Reject
                            </Button>
                        )}
                        {!isGettingCallInfo && (!isProposerSelected || mustBeExecuted) && (
                            <Button
                                variant="primary"
                                onClick={() => onSign(true)}
                                disabled={
                                    !!errorMessage ||
                                    isSubmitting ||
                                    (mustProvideCallData && !callInfo?.call)
                                }
                                data-cy={`button-${mustBeExecuted ? 'execute' : 'approve'}-tx`}
                            >
                                {mustBeExecuted ? 'Execute' : 'Approve'}
                            </Button>
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
    margin-top: 1rem;
    overflow: hidden;
    text-overflow: ellipsis;

    .title {
        color: ${({ theme }) => theme.custom.text.primary};
        font-weight: 500;
        font-size: large;
    }

    .hash {
        font-size: small;
    }
`;

const ButtonContainerStyled = styled(Grid)`
    text-align: right;
    margin-top: 1rem;

    button:not(:first-of-type) {
        margin-left: 1rem;
    }
`;
const ProposalSigningStyled = styled(ProposalSigning)`
    .buttonContainer .addedCallData {
        margin-top: 1rem;
    }

    .errorMessage {
        margin-top: 0.5rem;
        color: ${({ theme }) => theme.custom.error};
    }
`;

export default ProposalSigningStyled;
