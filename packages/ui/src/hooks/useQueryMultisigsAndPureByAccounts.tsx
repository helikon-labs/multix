import { useMultisigsAndPureByAccountQuery } from '../../types-and-hooks';
import { useMemo } from 'react';
import { useNetwork } from '../contexts/NetworkContext';

const DEFAULT_REFETCH_INTERVAL = 5000;

interface Args {
    accountIds: string[];
    watchedAccountIds: string[];
    shouldRefetch?: boolean;
}

export const useQueryMultisigsAndPureByAccounts = ({
    accountIds,
    watchedAccountIds,
    shouldRefetch = false,
}: Args) => {
    const { selectedNetwork } = useNetwork();
    const hasSomethingToQuery = useMemo(
        () => accountIds.length > 0 || watchedAccountIds.length > 0,
        [accountIds, watchedAccountIds],
    );
    const { error, data, isLoading, refetch } = useMultisigsAndPureByAccountQuery(
        { accountIds, watchedAccountIds },
        {
            enabled: hasSomethingToQuery,
            queryKey: [
                `KeyMultisigsBySignatoriesOrWatched-${accountIds}-${watchedAccountIds}-${selectedNetwork}`,
            ],
            refetchInterval: !!shouldRefetch && DEFAULT_REFETCH_INTERVAL,
        },
    );

    return {
        data,
        isLoading: isLoading && hasSomethingToQuery,
        error,
        refetch,
    };
};
