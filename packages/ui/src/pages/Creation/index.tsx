import {
    Alert,
    Box,
    CircularProgress,
    Grid2 as Grid,
    Step,
    StepLabel,
    Stepper,
} from '@mui/material';
import { Button, ButtonWithIcon } from '../../components/library';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { styled } from '@mui/material/styles';
import { isContextIn, isContextOf, useApi } from '../../contexts/ApiContext';
import SignatorySelection from '../../components/select/SignatorySelection';
import { useAccounts } from '../../contexts/AccountsContext';
import ThresholdSelection from './ThresholdSelection';
import NameSelection from './NameSelection';
import Summary from './Summary';
import { useSigningCallback } from '../../hooks/useSigningCallback';
import { createSearchParams, useNavigate, useSearchParams } from 'react-router';
import { useAccountNames } from '../../contexts/AccountNamesContext';
import { useCheckTransferableBalance } from '../../hooks/useCheckTransferableBalance';
import { useMultisigProposalNeededFunds } from '../../hooks/useMultisigProposalNeededFunds';
import { usePureProxyCreationNeededFunds } from '../../hooks/usePureProxyCreationNeededFunds';
import WithProxySelection from './WithProxySelection';
import { useGetSortAddress } from '../../hooks/useGetSortAddress';
import { useGetMultisigAddress } from '../../hooks/useGetMultisigAddress';
import { isEthereumAddress } from '@polkadot/util-crypto';
import { getAsMultiTx } from '../../utils/getAsMultiTx';
import { useMultiProxy } from '../../contexts/MultiProxyContext';
import { Binary, Enum, Transaction } from 'polkadot-api';
import { MultiAddress } from '@polkadot-api/descriptors';
import { useNetwork } from '../../contexts/NetworkContext';
import {
    allDescriptorsKey_1_3,
    allDescriptorsKey_2_3,
    allDescriptorsKey_3_3,
    noHydrationKeys,
} from '../../types';
import { useGetED } from '../../hooks/useGetED';

interface Props {
    className?: string;
}

const steps = ['Signatories', 'Threshold & Name', 'Review'];
const MultisigCreation = ({ className }: Props) => {
    const { selectedNetwork } = useNetwork();
    const [signatories, setSignatories] = useState<string[]>([]);
    const [currentStep, setCurrentStep] = useState(0);
    const isLastStep = useMemo(() => currentStep === steps.length - 1, [currentStep]);
    const ctx = useApi();
    const { api, chainInfo, compatibilityToken } = ctx;
    const [threshold, setThreshold] = useState<number | undefined>();
    const { selectedAccount, ownAddressList } = useAccounts();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams({ creationInProgress: 'false' });
    const signCallBack = useSigningCallback({
        onSuccess: () => {
            setRefetchMultisigTimeoutMinutes(1);
            navigate({
                pathname: '/',
                search: createSearchParams({
                    ...searchParams,
                    creationInProgress: 'true',
                }).toString(),
            });
        },
        onError: () => setIsSubmitted(false),
    });
    const { setRefetchMultisigTimeoutMinutes } = useMultiProxy();
    const { getSortAddress } = useGetSortAddress();
    const [name, setName] = useState('');
    const { addName, getNamesWithExtension } = useAccountNames();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const ownAccountPartOfSignatories = useMemo(
        () => signatories.some((sig) => ownAddressList.includes(sig)),
        [ownAddressList, signatories],
    );
    const [errorMessage, setErrorMessage] = useState('');
    const { pureProxyCreationNeededFunds, reserved: proxyReserved } =
        usePureProxyCreationNeededFunds();
    const supportsProxy = useMemo(() => {
        const hasProxyPallet = !!api && !!api.tx.Proxy;
        // Moonbeam and moonriver have the pallet, but it's deactivated
        return hasProxyPallet && !chainInfo?.isEthereum;
    }, [api, chainInfo]);
    const multiAddress = useGetMultisigAddress(signatories, threshold);
    const [withProxy, setWithProxy] = useState(false);
    const [remarkCall, setRemarkCall] = useState<Transaction<any, any, any, any> | undefined>();
    const [batchCall, setBatchCall] = useState<Transaction<any, any, any, any> | undefined>();

    useEffect(() => {
        if (withProxy) {
            // this call is only useful if the user does not want a proxy.
            return;
        }

        if (!api) {
            // console.error('api is not ready')
            return;
        }

        if (!selectedAccount) {
            // console.error('no selected address')
            return;
        }

        if (!signatories.includes(selectedAccount.address)) {
            // console.error('selected account not part of signatories')
            return;
        }

        if (!threshold) {
            // console.error("Threshold is invalid", threshold)
            return;
        }

        if (!multiAddress) {
            return;
        }

        const otherSignatories = getSortAddress(
            signatories.filter((sig) => sig !== selectedAccount.address),
        );
        const remarkTx = api.tx.System.remark({
            remark: Binary.fromText(`Multix creation ${multiAddress}`),
        });
        const remarkCall = getAsMultiTx({
            api,
            threshold,
            otherSignatories,
            tx: remarkTx,
            compatibilityToken,
        });

        setRemarkCall(remarkCall);
    }, [
        api,
        compatibilityToken,
        getSortAddress,
        multiAddress,
        selectedAccount,
        signatories,
        threshold,
        withProxy,
    ]);

    const originalName = useMemo(
        () => multiAddress && getNamesWithExtension(multiAddress),
        [getNamesWithExtension, multiAddress],
    );

    useEffect(() => {
        if (!withProxy) {
            // this batchCall is only useful if the user wants a proxy.
            return;
        }
        if (!ctx?.api || !compatibilityToken || !selectedNetwork) {
            // console.error('api is not ready')
            return;
        }

        if (!selectedAccount) {
            // console.error('no selected address')
            return;
        }

        if (!signatories.includes(selectedAccount.address)) {
            // console.error('selected account not part of signatories')
            return;
        }

        if (!threshold) {
            // console.error("Threshold is invalid", threshold)
            return;
        }

        if (!multiAddress) {
            return;
        }

        const otherSignatories = getSortAddress(
            signatories.filter((sig) => sig !== selectedAccount.address),
        );
        const proxyTx =
            (isContextIn(ctx, allDescriptorsKey_1_3) &&
                ctx.api.tx.Proxy.create_pure({
                    proxy_type: Enum('Any'),
                    delay: 0,
                    index: 0,
                })) ||
            (isContextIn(ctx, allDescriptorsKey_2_3) &&
                ctx.api.tx.Proxy.create_pure({
                    proxy_type: Enum('Any'),
                    delay: 0,
                    index: 0,
                })) ||
            (isContextIn(ctx, allDescriptorsKey_3_3) &&
                ctx.api.tx.Proxy.create_pure({
                    proxy_type: Enum('Any'),
                    delay: 0,
                    index: 0,
                }));

        if (!proxyTx) return;

        const multiSigProxyCall = getAsMultiTx({
            api,
            threshold,
            otherSignatories,
            tx: proxyTx,
            compatibilityToken,
        });

        // Some funds are needed on the multisig for the pure proxy creation
        const transferTx = isContextOf(ctx, 'hydration')
            ? ctx.api.tx.Balances.transfer_keep_alive({
                  dest: multiAddress,
                  value: pureProxyCreationNeededFunds,
              })
            : isContextIn(ctx, noHydrationKeys) &&
              ctx.api.tx.Balances.transfer_keep_alive({
                  dest: MultiAddress.Id(multiAddress),
                  value: pureProxyCreationNeededFunds,
              });

        if (!multiSigProxyCall) {
            console.error('multiSigProxyCall is undefined in Creation index.tsx');
            return;
        }

        if (!transferTx) {
            console.error('transferTx is undefined in Creation index.tsx');
            return;
        }

        setBatchCall(
            ctx.api.tx.Utility.batch_all({
                calls: [transferTx.decodedCall, multiSigProxyCall.decodedCall],
            }),
        );
    }, [
        api,
        compatibilityToken,
        ctx,
        getSortAddress,
        multiAddress,
        pureProxyCreationNeededFunds,
        selectedAccount,
        selectedNetwork,
        signatories,
        threshold,
        withProxy,
    ]);

    useEffect(() => {
        !!originalName && setName(originalName);
    }, [originalName]);

    const { multisigProposalNeededFunds, reserved: multisigReserved } =
        useMultisigProposalNeededFunds({
            threshold,
            signatories,
            call: withProxy ? batchCall : remarkCall,
        });
    const { existentialDeposit } = useGetED({
        withPplApi: false,
    });
    const minTransferableBalance = useMemo(
        () =>
            withProxy
                ? pureProxyCreationNeededFunds + multisigProposalNeededFunds
                : multisigProposalNeededFunds,
        [multisigProposalNeededFunds, pureProxyCreationNeededFunds, withProxy],
    );
    const { hasEnoughFreeBalance: hasSignerEnoughFunds } = useCheckTransferableBalance({
        min: minTransferableBalance,
        address: selectedAccount?.address,
        withPplApi: false,
    });
    const canGoNext = useMemo(() => {
        // need a threshold set
        if (currentStep === 1 && (threshold === undefined || threshold < 2)) {
            return false;
        }

        // need at least 2 signatories
        if (currentStep === 0 && signatories.length < 2) {
            return false;
        }

        // one of our account must be part of ths signatories
        if (currentStep === 0 && !ownAccountPartOfSignatories) {
            return false;
        }

        // if the minimum balance isn't met
        if (currentStep === 2 && !hasSignerEnoughFunds) {
            return false;
        }

        // we are on an ethereum network, all addresses must be eth addresses
        if (chainInfo?.isEthereum) {
            return signatories.every((signatory) => isEthereumAddress(signatory));
        }

        // we are on a non ethereum network, no address should be an ethereum one
        if (!chainInfo?.isEthereum) {
            return signatories.every((signatory) => !isEthereumAddress(signatory));
        }

        return true;
    }, [
        chainInfo?.isEthereum,
        currentStep,
        hasSignerEnoughFunds,
        ownAccountPartOfSignatories,
        signatories,
        threshold,
    ]);

    useEffect(() => {
        setErrorMessage('');

        if (currentStep === 0 && !ownAccountPartOfSignatories && signatories.length >= 2) {
            setErrorMessage('At least one of your own accounts must be a signatory.');
        }
    }, [currentStep, ownAccountPartOfSignatories, signatories]);

    const handleCreateRemark = useCallback(async () => {
        if (!ctx.api) {
            console.error('api undefined');
            return;
        }

        if (!remarkCall) {
            console.error('remark call undefined');
            return;
        }

        if (!selectedAccount) {
            console.error('no selected account');
            return;
        }

        multiAddress && addName(name, multiAddress);
        setIsSubmitted(true);

        remarkCall.signSubmitAndWatch(selectedAccount.polkadotSigner).subscribe(signCallBack);
    }, [addName, ctx, multiAddress, name, remarkCall, selectedAccount, signCallBack]);

    const handleCreateWithPure = useCallback(async () => {
        if (!ctx.api) {
            console.error('api undefined');
            return;
        }

        if (!selectedAccount || !batchCall) {
            console.error('no selected signer');
            return;
        }

        multiAddress && addName(name, multiAddress);
        setIsSubmitted(true);

        batchCall.signSubmitAndWatch(selectedAccount.polkadotSigner).subscribe(signCallBack);
    }, [addName, batchCall, ctx.api, multiAddress, name, selectedAccount, signCallBack]);

    const goNext = useCallback(() => {
        window.scrollTo(0, 0);

        if (!isLastStep) {
            setCurrentStep(currentStep + 1);
            return;
        }

        withProxy ? handleCreateWithPure() : handleCreateRemark();
    }, [currentStep, handleCreateRemark, handleCreateWithPure, isLastStep, withProxy]);

    const goBack = useCallback(() => {
        window.scrollTo(0, 0);
        setCurrentStep(currentStep - 1);
    }, [currentStep]);

    return (
        <Grid
            className={className}
            container
            spacing={2}
        >
            <Grid size={{ xs: 12, md: 4 }}>
                <h1 className="title">{steps[currentStep] || ''}</h1>
            </Grid>
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                size={{ xs: 12, md: 8 }}
            >
                <Box className="stepsContainer">
                    <Stepper
                        activeStep={currentStep}
                        alternativeLabel
                    >
                        {steps.map((step, index) => (
                            <Step
                                className="stepItem"
                                key={step}
                                onClick={() => {
                                    currentStep > index && setCurrentStep(index);
                                }}
                            >
                                <StepLabel>{currentStep === index ? '' : step}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </Box>
            </Grid>
            <Grid
                container
                size={{ xs: 12 }}
            >
                {currentStep === 0 && (
                    <Grid size={{ xs: 12, md: 8 }}>
                        <Alert
                            className="infoBox"
                            severity="info"
                        >
                            The members of a multisig are called &quot;signatories&quot;. You should
                            select at least 2.
                        </Alert>
                        <SignatorySelection
                            setSignatories={setSignatories}
                            signatories={signatories}
                        />
                    </Grid>
                )}
                {currentStep === 1 && (
                    <Grid size={{ xs: 12, md: 6 }}>
                        <ThresholdSelection
                            setThreshold={setThreshold}
                            threshold={threshold}
                            signatoriesNumber={signatories.length}
                        />
                        <NameSelection
                            setName={setName}
                            name={name}
                            originalName={originalName}
                        />
                        {supportsProxy && (
                            <WithProxySelection
                                setWithProxy={setWithProxy}
                                withProxy={withProxy}
                            />
                        )}
                        {!supportsProxy && (
                            <Alert
                                className="infoBox"
                                severity="info"
                            >
                                This network doesn&apos;t support proxies.
                            </Alert>
                        )}
                    </Grid>
                )}
                {currentStep === 2 && (
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Summary
                            signatories={signatories}
                            threshold={threshold}
                            name={name}
                            isBalanceError={!hasSignerEnoughFunds}
                            reservedBalance={
                                withProxy ? multisigReserved + proxyReserved : multisigReserved
                            }
                            balanceMin={minTransferableBalance + (existentialDeposit || 0n)}
                            withProxy={withProxy}
                            isSubmittingExtrinsic={isSubmitted}
                        />
                    </Grid>
                )}
            </Grid>
            <Grid
                container
                size={{ xs: 12 }}
                justifyContent="center"
                className="buttonContainer"
                flexDirection="column"
            >
                {!!errorMessage && (
                    <div
                        data-cy="container-create-multisig-error"
                        className="errorMessage"
                    >
                        {errorMessage}
                    </div>
                )}
                <div className="buttonWrapper">
                    <Button
                        variant="secondary"
                        disabled={currentStep === 0}
                        onClick={goBack}
                    >
                        Back
                    </Button>
                    {!isSubmitted && (
                        <Button
                            variant="primary"
                            data-cy="button-next"
                            disabled={!canGoNext}
                            onClick={goNext}
                        >
                            {isLastStep ? 'Create' : 'Next'}
                        </Button>
                    )}
                    {isSubmitted && (
                        <ButtonWithIcon
                            variant="primary"
                            aria-label="send"
                            disabled={true}
                            data-cy="button-creating-loader"
                        >
                            <LoaderStyled size={20} />
                            Creating...
                        </ButtonWithIcon>
                    )}
                </div>
            </Grid>
        </Grid>
    );
};

const LoaderStyled = styled(CircularProgress)`
    margin-right: 4px;

    & > svg {
        margin: 0;
    }
`;

export default styled(MultisigCreation)(
    ({ theme }) => `
  padding-bottom: 2rem;

  .infoBox {
    margin: 1rem 0;
  }

  .stepItem {
    cursor: pointer;
  }

  .stepsContainer {
    width: 100%;
  }

  .buttonContainer button:first-of-type {
    margin-right: 2rem;
  }

  .errorMessage {
    margin-top: 0.5rem;
    color: ${theme.custom.error};
  }

  .buttonWrapper {
    display: flex;
    margin-top: 1rem;
    align-self: center;
  }
`,
);
