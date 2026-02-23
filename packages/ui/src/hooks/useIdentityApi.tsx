import { usePplApi } from '../contexts/PeopleChainApiContext';
import { useNativeIdentityApi } from '../contexts/NativeIdentityApiContext';

export const useIdentityApi = () => {
    const pplCtx = usePplApi();
    const identityCtx = useNativeIdentityApi();
    const { pplApi, pplChainInfo, pplCompatibilityToken } = pplCtx;
    const { nativeIdentityApi, nativeIdentityChainInfo, nativeIdentityCompatibilityToken } =
        identityCtx;

    return {
        api: pplApi ?? nativeIdentityApi ?? null,
        chainInfo: pplApi ? pplChainInfo : nativeIdentityChainInfo,
        compatibilityToken: pplApi ? pplCompatibilityToken : nativeIdentityCompatibilityToken,
        ctx: pplApi ? pplCtx : nativeIdentityApi ? identityCtx : undefined,
    };
};
