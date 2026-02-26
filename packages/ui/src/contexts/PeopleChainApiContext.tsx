import React, { useMemo } from 'react';
import { useState, useEffect, createContext, useContext } from 'react';
import { useNetwork } from './NetworkContext';
import { CompatibilityToken, createClient, PolkadotClient } from 'polkadot-api';
import { getWsProvider } from 'polkadot-api/ws-provider';
import { withPolkadotSdkCompat } from 'polkadot-api/polkadot-sdk-compat';
import { PplApiOf, PplDescriptorKeys, DESCRIPTORS_PPL } from '../types';
import { ChainInfoHuman } from './ApiContext';
import { wsStatusChangeCallback } from '../utils/wsStatusChangeCallback';

type ApiContextProps = {
    children: React.ReactNode | React.ReactNode[];
};

export type IPplApiContext<Id extends PplDescriptorKeys> = {
    pplApi?: PplApiOf<Id>;
    pplApiDescriptor?: Id;
    pplChainInfo?: ChainInfoHuman;
    pplClient?: PolkadotClient;
    pplCompatibilityToken?: CompatibilityToken;
};

export const isPplContextOf = <Id extends PplDescriptorKeys>(
    ctx: unknown,
    descriptor: Id,
): ctx is IPplApiContext<Id> => {
    return !!ctx && (ctx as IPplApiContext<PplDescriptorKeys>).pplApiDescriptor === descriptor;
};

export const isPplContextIn = <
    Id extends PplDescriptorKeys,
    Ids extends PplDescriptorKeys[] = Id[],
>(
    ctx: unknown,
    descriptors: Id[],
): ctx is IPplApiContext<Ids[number]> => {
    return descriptors.some((descriptor) => isPplContextOf(ctx, descriptor));
};

const PplApiContext = createContext<IPplApiContext<PplDescriptorKeys> | undefined>(undefined);

const PplApiContextProvider = ({ children }: ApiContextProps) => {
    const { selectedNetworkInfo } = useNetwork();
    const [pplChainInfo, setPplChainInfo] = useState<ChainInfoHuman | undefined>();
    const [pplCompatibilityToken, setPplCompatibilityToken] = useState<CompatibilityToken>();

    const { pplClient, pplApi, pplApiDescriptor } = useMemo(() => {
        const pplApiDescriptor = selectedNetworkInfo.pplChainDescriptor;
        if (
            !selectedNetworkInfo.pplChainRpcUrls ||
            !pplApiDescriptor ||
            !(pplApiDescriptor in DESCRIPTORS_PPL)
        )
            return {};
        const wsProvider = getWsProvider(
            selectedNetworkInfo.pplChainRpcUrls,
            wsStatusChangeCallback,
        );
        const pplClient = createClient(withPolkadotSdkCompat(wsProvider));
        const pplApi = pplClient.getTypedApi(DESCRIPTORS_PPL[pplApiDescriptor]);
        return {
            pplClient,
            pplApi,
            pplApiDescriptor,
        };
    }, [selectedNetworkInfo]);

    useEffect(() => {
        if (!pplApi) return;

        pplApi.compatibilityToken.then(setPplCompatibilityToken).catch(console.error);
    }, [pplApi]);

    useEffect(() => {
        if (!pplClient || !pplApi) return;

        pplClient?.getChainSpecData().then(async ({ properties }) => {
            if (!properties || !pplCompatibilityToken) return;

            const ss58prefix = pplApi.constants.System.SS58Prefix(pplCompatibilityToken);
            const tokenDecimals = Array.isArray(properties?.tokenDecimals)
                ? properties?.tokenDecimals[0]
                : properties?.tokenDecimals;

            const tokensymbol = Array.isArray(properties?.tokenSymbol)
                ? properties?.tokenSymbol[0]
                : properties?.tokenSymbol;

            setPplChainInfo({
                // some parachains such as interlay have a comma in the format, e.g: "2,042"
                ss58Format: Number(ss58prefix) || 0,
                tokenDecimals: Number(tokenDecimals) || 0,
                tokenSymbol: tokensymbol || '',
                isEthereum: false,
            });
        });
    }, [pplClient, pplCompatibilityToken, pplApi]);

    return (
        <PplApiContext.Provider
            value={{
                pplClient,
                pplApiDescriptor,
                pplApi,
                pplChainInfo,
                pplCompatibilityToken,
            }}
        >
            {children}
        </PplApiContext.Provider>
    );
};

const usePplApi = () => {
    const context = useContext(PplApiContext);
    if (context === undefined) {
        throw new Error('usePplApi must be used within a PplApiContextProvider');
    }
    return context;
};

export { PplApiContextProvider, usePplApi };
