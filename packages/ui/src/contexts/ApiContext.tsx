import { useCallback, ReactNode, useMemo } from 'react';
import { useState, useEffect, createContext, useContext } from 'react';
import { useNetwork } from './NetworkContext';
import { ethereumChains } from '../utils/ethereumChains';
import { CompatibilityToken, createClient, PolkadotClient } from 'polkadot-api';
import { getWsProvider } from 'polkadot-api/ws-provider';
import { withPolkadotSdkCompat } from 'polkadot-api/polkadot-sdk-compat';
import { ApiDescriptors, ApiOf, DESCRIPTORS } from '../types';
import { wsStatusChangeCallback } from '../utils/wsStatusChangeCallback';

type ApiContextProps = {
    children: ReactNode | ReactNode[];
};

export type IApiContext<Id extends ApiDescriptors> = {
    apiDescriptor?: Id;
    api?: ApiOf<Id>;
    chainInfo?: ChainInfoHuman;
    client?: PolkadotClient;
    compatibilityToken?: CompatibilityToken;
    resetApi: () => void;
};

export const isContextOf = <Id extends ApiDescriptors>(
    ctx: unknown,
    descriptor: Id,
): ctx is IApiContext<Id> => {
    return !!ctx && (ctx as IApiContext<ApiDescriptors>).apiDescriptor === descriptor;
};

export const isContextIn = <Id extends ApiDescriptors, Ids extends ApiDescriptors[] = Id[]>(
    ctx: unknown,
    descriptors: Id[],
): ctx is IApiContext<Ids[number]> => {
    return descriptors.some((descriptor) => isContextOf(ctx, descriptor));
};

export interface ChainInfoHuman {
    ss58Format: number;
    tokenDecimals: number;
    tokenSymbol: string;
    isEthereum: boolean;
}

const ApiContext = createContext<IApiContext<ApiDescriptors> | undefined>(undefined);

const ApiContextProvider = <Id extends ApiDescriptors>({ children }: ApiContextProps) => {
    const { selectedNetworkInfo } = useNetwork();
    const [chainInfo, setChainInfo] = useState<ChainInfoHuman>();
    const [compatibilityToken, setCompatibilityToken] = useState<CompatibilityToken | undefined>();

    const apiDescriptor =
        selectedNetworkInfo?.descriptor as IApiContext<ApiDescriptors>['apiDescriptor'];

    const resetApi = useCallback(() => {
        setChainInfo(undefined);
        setCompatibilityToken(undefined);
    }, []);

    const wsProvider = useMemo(() => {
        if (!selectedNetworkInfo?.rpcUrls) return;

        return getWsProvider(selectedNetworkInfo?.rpcUrls, wsStatusChangeCallback);
    }, [selectedNetworkInfo?.rpcUrls]);

    const client = useMemo(() => {
        if (!selectedNetworkInfo?.chainId || !selectedNetworkInfo?.descriptor || !wsProvider)
            return;
        return createClient(withPolkadotSdkCompat(wsProvider));
    }, [selectedNetworkInfo, wsProvider]);

    const api = useMemo(() => {
        if (!client || !selectedNetworkInfo?.descriptor) return undefined;

        const id = selectedNetworkInfo.descriptor as Id;
        return client.getTypedApi(DESCRIPTORS[id]);
    }, [client, selectedNetworkInfo]);

    useEffect(() => {
        if (!client || !api) return;

        client?.getChainSpecData().then(async ({ properties, name }) => {
            if (!properties || !compatibilityToken) return;

            const ss58prefix = api.constants.System.SS58Prefix(compatibilityToken);
            const tokenDecimals = Array.isArray(properties?.tokenDecimals)
                ? properties?.tokenDecimals[0]
                : properties?.tokenDecimals;

            const tokensymbol = Array.isArray(properties?.tokenSymbol)
                ? properties?.tokenSymbol[0]
                : properties?.tokenSymbol;

            const isEthereum = ethereumChains.includes(name);

            setChainInfo({
                // some parachains such as interlay have a comma in the format, e.g: "2,042"
                ss58Format: Number(ss58prefix) || 0,
                tokenDecimals: Number(tokenDecimals) || 0,
                tokenSymbol: tokensymbol || '',
                isEthereum,
            });
        });
    }, [client, api, compatibilityToken]);

    useEffect(() => {
        if (!api) return;
        api.compatibilityToken.then(setCompatibilityToken).catch(console.error);
    }, [api]);

    return (
        <ApiContext.Provider
            value={{
                api,
                apiDescriptor,
                chainInfo,
                client,
                compatibilityToken,
                resetApi,
            }}
        >
            {children}
        </ApiContext.Provider>
    );
};

const useApi = () => {
    const context = useContext(ApiContext);
    if (context === undefined) {
        throw new Error('useApi must be used within a ApiContextProvider');
    }
    return context;
};

export { ApiContextProvider, useApi };
