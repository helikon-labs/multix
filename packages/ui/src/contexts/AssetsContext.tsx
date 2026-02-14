import React, { createContext, useContext, useEffect, useState } from 'react';
import { AH_SUPPORTED_ASSETS } from '../constants';
import { assetHubKeys } from '../types';
import { isContextIn, useApi } from './ApiContext';

type AssetsContextProps = {
    children: React.ReactNode | React.ReactNode[];
};

export interface Asset {
    symbol: string;
    decimals: number;
    name: string;
    logo: string;
}

export type IAssetsContext = {
    assets?: { [id: string]: Asset };
    getAssetMetadata: (id: number | string) => Asset | undefined;
};

const AssetsContext = createContext<IAssetsContext | undefined>(undefined);

const AssetsContextProvider = ({ children }: AssetsContextProps) => {
    const ctx = useApi();
    const [assets, setAssets] = useState<IAssetsContext['assets']>();

    useEffect(() => {
        if (!ctx?.api || !isContextIn(ctx, assetHubKeys)) return;

        const assetIds = AH_SUPPORTED_ASSETS.map((asset) => [asset.assetId]);

        if (assetIds.length === 0) return;

        ctx.api.query.Assets.Metadata.getValues(assetIds as [number][])
            .then((data) => {
                const result: IAssetsContext['assets'] = {};

                data.forEach((metadata, index) => {
                    const id = assetIds[index][0];
                    const logo = AH_SUPPORTED_ASSETS.find((asset) => asset.assetId === id)?.logo;

                    result[id] = {
                        symbol: metadata.symbol.asText().toUpperCase(),
                        name: metadata.name.asText(),
                        decimals: metadata.decimals,
                        logo,
                    } as Asset;
                });

                setAssets(result);
            })
            .catch(console.error);
    }, [ctx]);

    const getAssetMetadataBySymbol = (id: string) => {
        if (!assets) return;

        const found = Object.entries(assets).find(([, { symbol }]) => {
            return symbol === id;
        });

        if (!found) return;

        return assets[found[0]];
    };

    const getAssetMetadata = (id: number | string) => {
        if (typeof id === 'string') return getAssetMetadataBySymbol(id);
        return assets?.[id];
    };

    return (
        <AssetsContext.Provider
            value={{
                assets,
                getAssetMetadata,
            }}
        >
            {children}
        </AssetsContext.Provider>
    );
};

const useAssets = () => {
    const context = useContext(AssetsContext);
    if (context === undefined) {
        throw new Error('useAssets must be used within a ApiContextProvider');
    }
    return context;
};

export { AssetsContextProvider, useAssets };
