import { useMemo } from 'react';
import { useApi } from '../contexts/ApiContext';
import { usePplApi } from '../contexts/PeopleChainApiContext';

interface Props {
    withPplApi: boolean;
}

export const useAnyApi = ({ withPplApi }: Props) => {
    const normalCtx = useApi();
    const {
        api: normalApi,
        compatibilityToken: normalCompatibilityToken,
        chainInfo: normalChainInfo,
        client: normalClient,
    } = normalCtx;
    const pplCtx = usePplApi();
    const { pplApi, pplCompatibilityToken, pplChainInfo, pplClient } = pplCtx;

    const api = useMemo(() => (withPplApi ? pplApi : normalApi), [withPplApi, normalApi, pplApi]);
    const compatibilityToken = useMemo(
        () => (withPplApi ? pplCompatibilityToken : normalCompatibilityToken),
        [withPplApi, normalCompatibilityToken, pplCompatibilityToken],
    );
    const chainInfo = useMemo(
        () => (withPplApi ? pplChainInfo : normalChainInfo),
        [withPplApi, normalChainInfo, pplChainInfo],
    );
    const client = useMemo(
        () => (withPplApi ? pplClient : normalClient),
        [withPplApi, normalClient, pplClient],
    );

    return { api, compatibilityToken, chainInfo, client };
};
