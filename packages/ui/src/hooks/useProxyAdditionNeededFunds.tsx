import { useEffect, useState } from 'react';
import { useApi } from '../contexts/ApiContext';

export const useProxyAdditionNeededFunds = () => {
    const { api, chainInfo } = useApi();
    const [min, setMin] = useState(0n);

    useEffect(() => {
        if (!api) return;

        if (!chainInfo?.tokenDecimals) return;

        if (!api.constants?.Proxy?.ProxyDepositFactor) return; // the proxy is already created (with proxyDepositBase already deposited by the first account
        // that added the first proxy) we are only adding one account as proxy
        api.constants.Proxy.ProxyDepositBase().then(setMin).catch(console.error);
    }, [api, chainInfo]);

    return { proxyAdditionNeededFunds: min };
};
