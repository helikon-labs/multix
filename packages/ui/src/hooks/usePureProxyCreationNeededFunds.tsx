import { useEffect, useState } from 'react';
import { useApi } from '../contexts/ApiContext';

export const usePureProxyCreationNeededFunds = () => {
    const { api, chainInfo, compatibilityToken } = useApi();
    const [min, setMin] = useState(0n);
    const [reserved, setReserved] = useState(0n);

    useEffect(() => {
        if (!api || !compatibilityToken) return;

        const existentialDeposit = api.constants.Balances.ExistentialDeposit(compatibilityToken);
        const depositBase = api.constants.Proxy.ProxyDepositBase(compatibilityToken);
        const depositFactor = api.constants.Proxy.ProxyDepositFactor(compatibilityToken);

        if (!existentialDeposit || !depositBase || !depositFactor) return;
        // if (!chainInfo?.tokenDecimals) return

        // we only create one proxy here
        const reserved = depositFactor * 1n + depositBase;

        // the signer should survive and have at least the existential deposit
        // play safe and add the existential deposit twice which should suffice
        const survive = existentialDeposit * 2n;

        setReserved(reserved);
        setMin(reserved + survive);
        // console.log('reserved Pure Creation', formatBnBalance(reserved.add(survive), chainInfo.tokenDecimals, { tokenSymbol: chainInfo?.tokenSymbol, numberAfterComma: 3 }))
    }, [api, chainInfo, compatibilityToken]);

    return { pureProxyCreationNeededFunds: min, reserved };
};
