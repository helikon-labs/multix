import { Box, CircularProgress, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { AggGroupedByDate, usePendingTx } from '../../contexts/PendingTxContext';
import { MultisigAggregated, useMultiProxy } from '../../contexts/MultiProxyContext';
import { getDifference, getIntersection } from '../../utils/arrayUtils';
import { useAccounts } from '../../contexts/AccountsContext';
import { MdOutlineFlare as FlareIcon } from 'react-icons/md';
import Transaction from './Transaction';
import { useCallback } from 'react';

interface Props {
    className?: string;
}

const TransactionList = ({ className }: Props) => {
    const { getMultisigByAddress } = useMultiProxy();

    const {
        pendingTxs: tx,
        pendingPplTxs: pplTx,
        isLoading: isLoadingPendingTxs,
        refresh,
        refreshPpl,
    } = usePendingTx();

    const { ownAddressList } = useAccounts();

    interface TxParams {
        groupedTxs: AggGroupedByDate;
        refreshFn: () => Promise<void>;
        isPplChainTxs: boolean;
    }
    const Transactions = useCallback(
        ({ groupedTxs, refreshFn, isPplChainTxs }: TxParams) => {
            return (
                Object.entries(groupedTxs).length !== 0 &&
                Object.entries(groupedTxs).map(([date, aggregatedData]) => {
                    return (
                        <TransactionWrapper key={`${date}-${isPplChainTxs}`}>
                            <DateContainerStyled data-cy="label-date">{date}</DateContainerStyled>
                            {aggregatedData.map((agg, index) => {
                                const { callData, info, from } = agg;
                                const { threshold, signatories } =
                                    getMultisigByAddress(from) ||
                                    ({
                                        threshold: undefined,
                                        signatories: undefined,
                                    } as MultisigAggregated);

                                // if the "from"  is not a multisig from the
                                // currently selected multiProxy or we have no info
                                if (!info || !threshold) {
                                    return null;
                                }

                                const multisigSignatories = signatories || [];
                                // if the threshold is met, but the transaction is still not executed
                                // it means we need one signtory to submit with asMulti
                                // so any signatory should be able to approve (again)
                                const neededSigners =
                                    info?.approvals.length >= threshold
                                        ? multisigSignatories
                                        : getDifference(multisigSignatories, info?.approvals);
                                const possibleSigners = getIntersection(
                                    neededSigners,
                                    ownAddressList,
                                );
                                const isProposer =
                                    !!info?.depositor && ownAddressList.includes(info.depositor);

                                // if we have the proposer in the extension it can always reject the transaction
                                if (isProposer) {
                                    possibleSigners.push(info.depositor);
                                }

                                return (
                                    <Transaction
                                        key={`${index}-${callData}`}
                                        aggregatedData={agg}
                                        isProposer={isProposer}
                                        onSuccess={refreshFn}
                                        possibleSigners={possibleSigners}
                                        multisigSignatories={multisigSignatories}
                                        threshold={threshold}
                                        isPplChainTx={isPplChainTxs}
                                    />
                                );
                            })}
                        </TransactionWrapper>
                    );
                })
            );
        },
        [getMultisigByAddress, ownAddressList],
    );

    return (
        <Box className={className}>
            <h3>Transactions</h3>
            {isLoadingPendingTxs && (
                <LoaderStyled data-cy="loader-transaction-list">
                    <CircularProgress />
                </LoaderStyled>
            )}
            {Object.entries(tx).length === 0 &&
                Object.entries(pplTx).length === 0 &&
                !isLoadingPendingTxs && (
                    <NoCallWrapperStyled>
                        <FlareIconStyled size={24} />
                        <div>You&apos;re all set!</div>
                    </NoCallWrapperStyled>
                )}
            <Transactions
                groupedTxs={tx}
                isPplChainTxs={false}
                refreshFn={refresh}
            />
            <Transactions
                groupedTxs={pplTx}
                isPplChainTxs={true}
                refreshFn={refreshPpl}
            />
        </Box>
    );
};

const TransactionWrapper = styled(Box)`
    .MuiPaper-root {
        padding: 0.5rem;
    }
`;

const FlareIconStyled = styled(FlareIcon)`
    font-size: 3rem;
    margin-bottom: 1rem;
`;

const DateContainerStyled = styled(Box)`
    margin-bottom: 0.3rem;
`;

const NoCallWrapperStyled = styled(Paper)`
    background-color: ${({ theme }) => theme.custom.background.primary};
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
    padding: 2rem;
`;

const LoaderStyled = styled(Box)`
    display: flex;
    justify-content: center;
`;
export default TransactionList;
