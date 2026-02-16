import { useState, useEffect } from 'react';
import { CompatibilityToken } from 'polkadot-api';
import { ChainInfoHuman } from '../contexts/ApiContext';
import { PplDescriptorKeys, NativeIdentityDescriptorKeys } from '../types';
import { IPplApiContext, usePplApi } from '../contexts/PeopleChainApiContext';
import {
    INativeIdentityApiContext,
    useNativeIdentityApi,
} from '../contexts/NativeIdentityApiContext';

export const useIdentityApi = () => {
    const pplCtx = usePplApi();
    const identityCtx = useNativeIdentityApi();
    const { pplApi, pplChainInfo, pplCompatibilityToken } = pplCtx;
    const { nativeIdentityApi, nativeIdentityChainInfo, nativeIdentityCompatibilityToken } =
        identityCtx;
    const [apiToUse, setApiToUse] = useState<
        | IPplApiContext<PplDescriptorKeys>['pplApi']
        | INativeIdentityApiContext<NativeIdentityDescriptorKeys>['nativeIdentityApi']
        | null
    >(null);
    const [chainInfoToUse, setChainInfoToUse] = useState<ChainInfoHuman | undefined>(undefined);
    const [compatibilityTokenToUse, setCompatibilityTokenToUse] = useState<CompatibilityToken>();
    const [ctxToUse, setCtxToUse] = useState<
        IPplApiContext<PplDescriptorKeys> | INativeIdentityApiContext<NativeIdentityDescriptorKeys>
    >();

    useEffect(() => {
        if (pplApi) {
            setApiToUse(pplApi);
            setChainInfoToUse(pplChainInfo);
            setCompatibilityTokenToUse(pplCompatibilityToken);
            setCtxToUse(pplCtx);
        } else if (nativeIdentityApi) {
            setApiToUse(nativeIdentityApi);
            setChainInfoToUse(nativeIdentityChainInfo);
            setCompatibilityTokenToUse(nativeIdentityCompatibilityToken);
            setCtxToUse(identityCtx);
        }
    }, [
        nativeIdentityApi,
        nativeIdentityChainInfo,
        nativeIdentityCompatibilityToken,
        identityCtx,
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
