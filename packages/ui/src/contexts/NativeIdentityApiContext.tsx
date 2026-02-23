import React, { useMemo } from 'react';
import { useState, useEffect, createContext, useContext } from 'react';
import { useNetwork } from './NetworkContext';
import { CompatibilityToken, createClient, PolkadotClient, TypedApi } from 'polkadot-api';
import { getWsProvider } from 'polkadot-api/ws-provider';
import { withPolkadotSdkCompat } from 'polkadot-api/polkadot-sdk-compat';
import {
    NativeIdentityApiOf,
    NativeIdentityDescriptorKeys,
    NativeIdentityDescriptors,
    DESCRIPTORS_NATIVE_IDENTITY,
} from '../types';
import { ChainInfoHuman } from './ApiContext';
import { wsStatusChangeCallback } from '../utils/wsStatusChangeCallback';

type ApiContextProps = {
    children: React.ReactNode | React.ReactNode[];
};

export type INativeIdentityApiContext<Id extends NativeIdentityDescriptorKeys> = {
    nativeIdentityApi?: NativeIdentityApiOf<Id>;
    nativeIdentityApiDescriptor?: Id;
    nativeIdentityChainInfo?: ChainInfoHuman;
    nativeIdentityClient?: PolkadotClient;
    nativeIdentityCompatibilityToken?: CompatibilityToken;
};

export const isNativeIdentityContextOf = <Id extends NativeIdentityDescriptorKeys>(
    ctx: unknown,
    descriptor: Id,
): ctx is INativeIdentityApiContext<Id> => {
    return (
        !!ctx &&
        (ctx as INativeIdentityApiContext<NativeIdentityDescriptorKeys>)
            .nativeIdentityApiDescriptor === descriptor
    );
};

export const isNativeIdentityContextIn = <
    Id extends NativeIdentityDescriptorKeys,
    Ids extends NativeIdentityDescriptorKeys[] = Id[],
>(
    ctx: unknown,
    descriptors: Id[],
): ctx is INativeIdentityApiContext<Ids[number]> => {
    return descriptors.some((descriptor) => isNativeIdentityContextOf(ctx, descriptor));
};

const NativeIdentityApiContext = createContext<
    INativeIdentityApiContext<NativeIdentityDescriptorKeys> | undefined
>(undefined);

const NativeIdentityApiContextProvider = <Id extends NativeIdentityDescriptorKeys>({
    children,
}: ApiContextProps) => {
    const { selectedNetworkInfo } = useNetwork();
    const [nativeIdentityChainInfo, setNativeIdentityChainInfo] = useState<
        ChainInfoHuman | undefined
    >();
    const [nativeIdentityApi, setNativeIdentityApi] =
        useState<TypedApi<NativeIdentityDescriptors<Id>>>();
    const [nativeIdentityClient, setNativeIdentityClient] = useState<PolkadotClient>();
    const [nativeIdentityCompatibilityToken, setNativeIdentityCompatibilityToken] =
        useState<CompatibilityToken>();
    const [nativeIdentityApiDescriptor, setNativeIdentityApiDescriptor] =
        useState<
            INativeIdentityApiContext<NativeIdentityDescriptorKeys>['nativeIdentityApiDescriptor']
        >();

    const wsProvider = useMemo(() => {
        if (!selectedNetworkInfo?.rpcUrls) return;

        return getWsProvider(selectedNetworkInfo.rpcUrls, wsStatusChangeCallback);
    }, [selectedNetworkInfo?.rpcUrls]);

    useEffect(() => {
        if (!nativeIdentityApi) return;

        nativeIdentityApi.compatibilityToken
            .then(setNativeIdentityCompatibilityToken)
            .catch(console.error);
    }, [nativeIdentityApi]);

    useEffect(() => {
        if (!wsProvider || !selectedNetworkInfo || !selectedNetworkInfo.descriptor) return;
        const descriptor = selectedNetworkInfo.descriptor;
        if (!(descriptor in DESCRIPTORS_NATIVE_IDENTITY)) return;
        const apiClient = createClient(withPolkadotSdkCompat(wsProvider));
        setNativeIdentityClient(apiClient);
        const id = selectedNetworkInfo.descriptor as Id;
        const typedApi = apiClient.getTypedApi(DESCRIPTORS_NATIVE_IDENTITY[id]);
        setNativeIdentityApi(typedApi);
        setNativeIdentityApiDescriptor(id);
    }, [selectedNetworkInfo, wsProvider]);

    useEffect(() => {
        if (!nativeIdentityClient || !nativeIdentityApi) return;

        nativeIdentityClient?.getChainSpecData().then(async ({ properties }) => {
            if (!properties || !nativeIdentityCompatibilityToken) return;

            const ss58prefix = nativeIdentityApi.constants.System.SS58Prefix(
                nativeIdentityCompatibilityToken,
            );
            const tokenDecimals = Array.isArray(properties?.tokenDecimals)
                ? properties?.tokenDecimals[0]
                : properties?.tokenDecimals;

            const tokensymbol = Array.isArray(properties?.tokenSymbol)
                ? properties?.tokenSymbol[0]
                : properties?.tokenSymbol;

            setNativeIdentityChainInfo({
                // some parachains such as interlay have a comma in the format, e.g: "2,042"
                ss58Format: Number(ss58prefix) || 0,
                tokenDecimals: Number(tokenDecimals) || 0,
                tokenSymbol: tokensymbol || '',
                isEthereum: false,
            });
        });
    }, [nativeIdentityClient, nativeIdentityCompatibilityToken, nativeIdentityApi]);

    return (
        <NativeIdentityApiContext.Provider
            value={{
                nativeIdentityClient,
                nativeIdentityApiDescriptor,
                nativeIdentityApi,
                nativeIdentityChainInfo,
                nativeIdentityCompatibilityToken,
            }}
        >
            {children}
        </NativeIdentityApiContext.Provider>
    );
};

const useNativeIdentityApi = () => {
    const context = useContext(NativeIdentityApiContext);
    if (context === undefined) {
        throw new Error(
            'useNativeIdentityApiInner must be used within a IdentityApiContextProvider',
        );
    }
    return context;
};

export { NativeIdentityApiContextProvider, useNativeIdentityApi };
