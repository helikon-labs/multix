import { useCallback, useEffect, useState } from 'react';
import { isContextIn, useApi } from '../contexts/ApiContext';
import { assetHubKeys } from '../types';

interface useGetAssetBalancesProps {
    address?: string;
    assetIds: number[];
}

type AssetBalanceInfo = Record<number, bigint>;

const POLL_INTERVAL = 6000;

export const useGetAssetBalances = ({ address, assetIds }: useGetAssetBalancesProps) => {
    const ctx = useApi();
    const [balances, setBalances] = useState<AssetBalanceInfo | null>(null);

    const getBalances = useCallback(async () => {
        if (!ctx?.api || !isContextIn(ctx, assetHubKeys) || !address || assetIds.length === 0)
            return;

        const params = assetIds.map((assetId) => [assetId, address]) as [number, string][];

        return ctx.api.query.Assets.Account.getValues(params, {
            at: 'best',
        }).then((res) => {
            const balances: AssetBalanceInfo = {};

            res.forEach((value, index) => {
                const assetId = assetIds[index];
                const bal = value?.balance || 0n;

                balances[assetId] = bal;
            });

            return balances;
        });
    }, [address, assetIds, ctx]);

    const cacheBalances = useCallback(async () => {
        const newBalances = await getBalances();

        if (!newBalances) return;

        const shouldUpdateBalances =
            balances === null ||
            Object.entries(newBalances).some(([id, bal]) => {
                return bal !== balances[Number(id)];
            });

        if (shouldUpdateBalances) {
            setBalances(newBalances);
        }
    }, [balances, getBalances]);

    useEffect(() => {
        if (balances === null) {
            cacheBalances();
        }

        const inter = setInterval(cacheBalances, POLL_INTERVAL);

        return () => {
            clearInterval(inter);
        };
    }, [address, assetIds, balances, cacheBalances, ctx, getBalances]);

    return { balances };
};
