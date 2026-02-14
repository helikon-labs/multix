import { useState, useEffect } from 'react';
import { IPplApiContext, usePplApi } from '../contexts/PeopleChainApiContext';
import { ChainInfoHuman, IApiContext, useApi } from '../contexts/ApiContext';
import { ApiDescriptors, PplDescriptorKeys } from '../types';
import { CompatibilityToken } from 'polkadot-api';

export const useIdentityApi = () => {
    const pplCtx = usePplApi();
    const ctx = useApi();
    const { pplApi, pplChainInfo, pplCompatibilityToken } = pplCtx;
    const { api, chainInfo, compatibilityToken } = ctx;
    const [apiToUse, setApiToUse] = useState<
        IPplApiContext<PplDescriptorKeys>['pplApi'] | IApiContext<ApiDescriptors>['api'] | null
    >(null);
    const [chainInfoToUse, setChainInfoToUse] = useState<ChainInfoHuman | undefined>(undefined);
    const [compatibilityTokenToUse, setCompatibilityTokenToUse] = useState<CompatibilityToken>();
    const [ctxToUse, setCtxToUse] = useState<
        IPplApiContext<PplDescriptorKeys> | IApiContext<ApiDescriptors>
    >();

    useEffect(() => {
        if (pplApi) {
            setApiToUse(pplApi);
            setChainInfoToUse(pplChainInfo);
            setCompatibilityTokenToUse(pplCompatibilityToken);
            setCtxToUse(pplCtx);
        } else if (api) {
            setApiToUse(api);
            setChainInfoToUse(chainInfo);
            setCompatibilityTokenToUse(compatibilityToken);
            setCtxToUse(ctx);
        }
    }, [
        api,
        chainInfo,
        compatibilityToken,
        ctx,
        pplApi,
        pplChainInfo,
        pplCompatibilityToken,
        pplCtx,
    ]);

    return {
        api: apiToUse,
        chainInfo: chainInfoToUse,
        compatibilityToken: compatibilityTokenToUse,
        ctx: ctxToUse,
    };
};
