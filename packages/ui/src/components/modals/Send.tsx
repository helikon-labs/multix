import {
    Alert,
    CircularProgress,
    Dialog,
    DialogContent,
    DialogTitle,
    Grid2 as Grid,
    SelectChangeEvent,
} from '@mui/material';
import { Button, ButtonWithIcon, Select } from '../library';
import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { styled } from '@mui/material/styles';
import { useAccounts } from '../../contexts/AccountsContext';
import { useMultiProxy } from '../../contexts/MultiProxyContext';
import SignerSelection from '../select/SignerSelection';
import { useSigningCallback } from '../../hooks/useSigningCallback';
import GenericAccountSelection, { AccountBaseInfo } from '../select/GenericAccountSelection';
// import ManualExtrinsic from '../EasySetup/ManualExtrinsic'
import BalancesTransfer from '../EasySetup/BalancesTransfer';
import { useMultisigProposalNeededFunds } from '../../hooks/useMultisigProposalNeededFunds';
import { useCheckTransferableBalance } from '../../hooks/useCheckTransferableBalance';
import FromCallData from '../EasySetup/FromCallData';
import { ModalCloseButton } from '../library/ModalCloseButton';
import { formatBigIntBalance } from '../../utils/formatBnBalance';
import { useGetMultisigTx } from '../../hooks/useGetMultisigTx';
import SetIdentity from '../EasySetup/SetIdentity';
import { getErrorMessageReservedFunds } from '../../utils/getErrorMessageReservedFunds';
import { Transaction } from 'polkadot-api';
import { useHasIdentityFeature } from '../../hooks/useHasIdentityFeature';
import { useAnyApi } from '../../hooks/useAnyApi';
import { useGetED } from '../../hooks/useGetED';
import { debounce } from '../../utils/debounce';

export enum EasyTransferTitle {
    SendTokens = 'Send tokens',
    FromCallData = 'From call data',
    ManualExtrinsic = 'Manual extrinsic',
    SetIdentity = 'Set identity',
}

export const DEFAULT_EASY_SETUP_SELECTION: EasyTransferTitle = EasyTransferTitle.SendTokens;

interface Props {
    preselected: EasyTransferTitle;
    onClose: () => void;
    className?: string;
    onSuccess?: () => void;
    onFinalized?: () => void;
}

const Send = ({ onClose, className, onSuccess, onFinalized, preselected }: Props) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const {
        selectedMultiProxy,
        getMultisigAsAccountBaseInfo,
        getMultisigByAddress,
        setRefetchMultisigTimeoutMinutes,
    } = useMultiProxy();
    const { selectedAccount } = useAccounts();
    const [easyOptionErrorMessage, setEasyOptionErrorMessage] = useState<ReactNode | string>('');
    const [errorMessage, setErrorMessage] = useState<ReactNode | string>('');
    const possibleOrigin = useMemo(() => {
        const proxyBaseInfo = {
            address: selectedMultiProxy?.proxy,
            meta: {
                isProxy: true,
                isMulti: false,
            },
        } as AccountBaseInfo;

        return [proxyBaseInfo, ...getMultisigAsAccountBaseInfo()].filter(
            (a) => !!a.address,
        ) as AccountBaseInfo[];
    }, [getMultisigAsAccountBaseInfo, selectedMultiProxy]);
    const { hasPplChain } = useHasIdentityFeature();
    const [selectedOrigin, setSelectedOrigin] = useState<AccountBaseInfo>(possibleOrigin[0]);
    const isProxySelected = useMemo(() => selectedOrigin.meta?.isProxy, [selectedOrigin]);
    const [selectedMultisig, setSelectedMultisig] = useState(selectedMultiProxy?.multisigs[0]);
    const multisigList = useMemo(
        () => getMultisigAsAccountBaseInfo(),
        [getMultisigAsAccountBaseInfo],
    );
    const threshold = useMemo(() => {
        return selectedOrigin.meta?.isMulti
            ? getMultisigByAddress(selectedOrigin.address)?.threshold
            : selectedMultisig?.threshold;
    }, [getMultisigByAddress, selectedMultisig, selectedOrigin]);
    const [extrinsicToCall, setExtrinsicToCall] = useState<
        Transaction<any, any, any, any> | undefined
    >();
    const [selectedEasyOption, setSelectedEasyOption] = useState<EasyTransferTitle>(
        preselected || DEFAULT_EASY_SETUP_SELECTION,
    );

    const debouncedSetExtrinsicToCall = useMemo(() => debounce(setExtrinsicToCall, 300), []);

    const withPplApi = useMemo(
        () => selectedEasyOption === EasyTransferTitle.SetIdentity,
        [selectedEasyOption],
    );
    const { chainInfo, api } = useAnyApi({ withPplApi });

    // this is a tx creation and not the signature of an existing tx
    // so we can force the asMulti
    const multisigTx = useGetMultisigTx({
        selectedMultisig,
        extrinsicToCall,
        senderAddress: selectedAccount?.address,
        isProxy: isProxySelected,
        fromAddress: selectedOrigin.address,
        threshold,
        forceAsMulti: true,
        withPplApi,
    });

    const { multisigProposalNeededFunds, reserved } = useMultisigProposalNeededFunds({
        threshold,
        signatories: selectedMultisig?.signatories,
        call: multisigTx,
        withPplApi,
    });

    const { hasEnoughFreeBalance: hasSignerEnoughFunds } = useCheckTransferableBalance({
        min: multisigProposalNeededFunds,
        address: selectedAccount?.address,
        withPplApi,
    });

    const { existentialDeposit } = useGetED({
        withPplApi,
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
                withPpleChain: withPplApi,
            });
            setErrorMessage(errorWithReservedFunds);
        }
    }, [chainInfo, reserved, hasSignerEnoughFunds, minBalance, withPplApi]);

    const onSubmitting = useCallback(() => {
        setIsSubmitting(false);
        onClose();
    }, [onClose]);

    const handleSelectOrigin = useCallback(
        (account: AccountBaseInfo) => {
            setSelectedOrigin(account);
            account.meta?.isMulti
                ? setSelectedMultisig(getMultisigByAddress(account.address))
                : // if the proxy is selected as origin, select the first multisig as a "from"
                  setSelectedMultisig(selectedMultiProxy?.multisigs[0]);
        },
        [getMultisigByAddress, selectedMultiProxy],
    );

    const easySetupOptions: Partial<Record<EasyTransferTitle, ReactNode>> = useMemo(() => {
        const res = {
            [EasyTransferTitle.SendTokens]: (
                <BalancesTransfer
                    from={selectedOrigin.address}
                    onSetExtrinsic={debouncedSetExtrinsicToCall}
                    onSetErrorMessage={setEasyOptionErrorMessage}
                />
            ),
            // [EasyTransferTitle.ManualExtrinsic]: (
            //   <ManualExtrinsic
            //     onSetExtrinsic={debouncedSetExtrinsicToCall}
            //     onSetErrorMessage={setEasyOptionErrorMessage}
            //     onSelectFromCallData={() => setSelectedEasyOption(EasyTransferTitle.FromCallData)}
            //     hasErrorMessage={!!easyOptionErrorMessage}
            //   />
            // ),
            [EasyTransferTitle.FromCallData]: (
                <FromCallData
                    onSetExtrinsic={debouncedSetExtrinsicToCall}
                    currentProxy={isProxySelected ? selectedOrigin.address : undefined}
                />
            ),
        } as Partial<Record<EasyTransferTitle, ReactNode>>;

        if (!isProxySelected && hasPplChain) {
            res[EasyTransferTitle.SetIdentity] = (
                <SetIdentity
                    from={selectedOrigin.address}
                    onSetExtrinsic={debouncedSetExtrinsicToCall}
                    onSetErrorMessage={setEasyOptionErrorMessage}
                />
            );
        }

        return res;
    }, [selectedOrigin.address, isProxySelected, hasPplChain, debouncedSetExtrinsicToCall]);

    const signCallback = useSigningCallback({
        onSuccess: () => {
            onSuccess && onSuccess();
            // poll for 1min if the tx may make changes
            // such as creating a pure proxy
            setRefetchMultisigTimeoutMinutes(1);
        },
        onError: () => {
            setIsSubmitting(false);
        },
        onSubmitting,
        onFinalized,
        withSubscanLink: !withPplApi,
    });

    const handleMultisigSelection = useCallback(
        (account: AccountBaseInfo) => {
            const selected = getMultisigByAddress(account.address);
            setSelectedMultisig(selected);
        },
        [getMultisigByAddress],
    );

    const onSign = useCallback(async () => {
        if (!api) return;

        if (!threshold) {
            const error = 'Threshold is undefined';
            console.error(error);
            setErrorMessage(error);
            return;
        }

        if (!selectedAccount || !selectedOrigin) {
            const error = 'No selected account or multisig/proxy';
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
    }, [
        api,
        threshold,
        selectedAccount,
        selectedOrigin,
        extrinsicToCall,
        multisigTx,
        signCallback,
    ]);

    const onChangeEasySetupOption: (event: SelectChangeEvent<unknown>) => void = useCallback(
        ({ target: { value } }) => {
            const acceptabledValues = Object.values(EasyTransferTitle);
            if (
                typeof value !== 'string' &&
                !acceptabledValues.includes(value as EasyTransferTitle)
            ) {
                console.error(
                    'Unexpected selection, expect one of',
                    JSON.stringify(acceptabledValues),
                    'but received',
                    value,
                );
                return;
            }

            setErrorMessage('');
            setEasyOptionErrorMessage('');
            setSelectedEasyOption(value as EasyTransferTitle);
        },
        [],
    );

    if (!possibleOrigin) {
        return null;
    }

    return (
        <Dialog
            fullWidth
            maxWidth={'md'}
            open
            className={className}
        >
            <ModalCloseButton onClose={onClose} />
            <DialogTitle data-cy="title-send-tx">Send tx</DialogTitle>
            <DialogContent
                data-cy="modal-send-tx"
                className="generalContainer"
            >
                <Grid
                    alignItems="center"
                    container
                >
                    <Grid size={{ xs: 12, md: 2 }}>
                        <h4>From</h4>
                    </Grid>
                    <Grid size={{ xs: 12, md: 10 }}>
                        <GenericAccountSelection
                            accountList={possibleOrigin}
                            onChange={handleSelectOrigin}
                            value={selectedOrigin}
                            withBadge
                        />
                    </Grid>
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
                        <h4>Transaction</h4>
                    </Grid>
                    <Grid size={{ xs: 12, md: 10 }}>
                        <Select
                            value={selectedEasyOption}
                            onChange={onChangeEasySetupOption}
                            fullWidth
                            menuItems={Object.keys(easySetupOptions).map((key) => ({
                                value: key,
                            }))}
                            testId="easy-setup"
                        />
                    </Grid>
                    <Grid size={{ xs: 0, md: 2 }} />
                    <Grid size={{ xs: 12, md: 10 }}>{easySetupOptions[selectedEasyOption]}</Grid>
                    {(!!easyOptionErrorMessage || !!errorMessage) && (
                        <>
                            <Grid size={{ xs: 0, md: 2 }} />
                            <Grid
                                size={{ xs: 12, md: 10 }}
                                className="errorMessage"
                            >
                                <Alert
                                    data-cy="error-send-tx"
                                    severity="error"
                                >
                                    {easyOptionErrorMessage || errorMessage}
                                </Alert>
                            </Grid>
                        </>
                    )}
                    <Grid
                        size={{ xs: 12 }}
                        className="buttonContainer"
                    >
                        {isSubmitting ? (
                            <ButtonWithIcon
                                data-cy="button-sending"
                                variant="primary"
                                aria-label="sending"
                                disabled
                            >
                                <LoaderStyled size={20} />
                                Sending...
                            </ButtonWithIcon>
                        ) : (
                            <Button
                                data-cy="button-send"
                                variant="primary"
                                onClick={onSign}
                                disabled={
                                    !!easyOptionErrorMessage || !!errorMessage || !extrinsicToCall
                                }
                            >
                                Send
                            </Button>
                        )}
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    );
};

const LoaderStyled = styled(CircularProgress)`
    margin-right: 4px;

    & > svg {
        margin: 0;
    }
`;

export default styled(Send)(
    ({ theme }) => `
  .generalContainer {
    ${theme.breakpoints.up('md')} {
      padding-left: 3rem;
      padding-right: 3rem;
    }
    padding-top: 0.3rem;
  }

  .buttonContainer {
    text-align: right;
    margin-top: 1rem;
    button { 
      margin-left: auto;
    }
  }

  .errorMessage {
    margin-top: 1rem;
    color: ${theme.custom.error};
  }
`,
);
