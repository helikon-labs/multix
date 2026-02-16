import { useEffect, useMemo, useState } from 'react';
// import { formatBigIntBalance } from '../utils/formatBnBalance'
import { IdentityFields } from '../components/EasySetup/SetIdentity';
import { getByteCount } from '../utils/getByteCount';
import { useIdentityApi } from './useIdentityApi';

export const useSetIdentityReservedFunds = (identityFields?: IdentityFields) => {
    const { api, chainInfo, compatibilityToken, ctx } = useIdentityApi();
    const [reserved, setReserved] = useState(0n);

    const fieldBytes = useMemo(() => {
        if (!identityFields) return 0;

        const allfields = Object.values(identityFields)
            .filter((value) => !!value)
            .join('');

        return getByteCount(allfields);
    }, [identityFields]);

    useEffect(() => {
        if (!api || !chainInfo || !identityFields || !compatibilityToken) return;
        if (!chainInfo.tokenDecimals) return;
        const byteDeposit = api.constants?.Identity?.ByteDeposit(compatibilityToken);
        const basicDeposit = api.constants?.Identity.BasicDeposit(compatibilityToken);
        if (!basicDeposit || !byteDeposit) return;
        const reservedFields = byteDeposit * BigInt(fieldBytes);
        const res = reservedFields + basicDeposit;
        setReserved(res);
    }, [api, chainInfo, compatibilityToken, ctx, fieldBytes, identityFields]);

    return { reserved };
};
