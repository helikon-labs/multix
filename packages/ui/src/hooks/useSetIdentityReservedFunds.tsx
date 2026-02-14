import { useEffect, useMemo, useState } from 'react';
// import { formatBigIntBalance } from '../utils/formatBnBalance'
import { IdentityFields } from '../components/EasySetup/SetIdentity';
import { getByteCount } from '../utils/getByteCount';
import { useIdentityApi } from './useIdentityApi';
import { isPplContextIn } from '../contexts/PeopleChainApiContext';
import { pplDescriptorKeys } from '../types';

export const useSetIdentityReservedFunds = (identityFields?: IdentityFields) => {
    const { ctx } = useIdentityApi();
    const [reserved, setReserved] = useState(0n);

    const fieldBytes = useMemo(() => {
        if (!identityFields) return 0;

        const allfields = Object.values(identityFields)
            .filter((value) => !!value)
            .join('');

        return getByteCount(allfields);
    }, [identityFields]);

    useEffect(() => {
        if (isPplContextIn(ctx, pplDescriptorKeys)) {
            const { pplApi, pplCompatibilityToken, pplChainInfo } = ctx;
            if (!pplApi || !identityFields || !pplCompatibilityToken) return;

            if (!pplChainInfo?.tokenDecimals) return;

            const byteDeposit = pplApi.constants?.Identity?.ByteDeposit(pplCompatibilityToken);

            const basicDeposit = pplApi.constants?.Identity.BasicDeposit(pplCompatibilityToken);

            if (!basicDeposit || !byteDeposit) return;

            const reservedFields = byteDeposit * BigInt(fieldBytes);

            const res = reservedFields + basicDeposit;

            // console.log(
            //   'res',
            //   formatBigIntBalance(res, chainInfo.tokenDecimals, {
            //     tokenSymbol: chainInfo?.tokenSymbol,
            //     numberAfterComma: 6
            //   })
            // )
            setReserved(res);
        }
    }, [ctx, fieldBytes, identityFields]);

    return { reserved };
};
