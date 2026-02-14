import { useEffect, useState } from 'react';
import { isContextIn, useApi } from '../contexts/ApiContext';
import { formatBigIntBalance } from '../utils/formatBnBalance';
import { assetHubKeys } from '../types';
import { useAssets } from '../contexts/AssetsContext';

interface useGetBalanceProps {
    address?: string;
    numberAfterComma?: number;
    assetId: number;
}

export const useGetAssetBalance = ({
    address,
    numberAfterComma = 2,
    assetId,
}: useGetBalanceProps) => {
    const ctx = useApi();
    const [balance, setBalance] = useState<bigint | null>(null);
    const [balanceFormatted, setFormattedBalance] = useState<string | null>(null);
    const { getAssetMetadata } = useAssets();

    useEffect(() => {
        if (!ctx?.api || !isContextIn(ctx, assetHubKeys) || !address || !assetId) return;

        const assetMetadata = getAssetMetadata(assetId);

        if (!assetMetadata) return;

        const unsub = ctx.api.query.Assets.Account.watchValue(assetId, address, 'best').subscribe(
            (res) => {
                const balance = res?.balance || 0n;

                setBalance(balance);
                setFormattedBalance(
                    formatBigIntBalance(balance, assetMetadata.decimals, {
                        numberAfterComma,
                        tokenSymbol: assetMetadata.symbol,
                    }),
                );
            },
        );

        return () => unsub && unsub.unsubscribe();
    }, [address, assetId, ctx, getAssetMetadata, numberAfterComma]);

    return { balance, balanceFormatted };
};
