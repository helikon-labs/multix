import { useMemo } from 'react';
import { useAnyApi } from './useAnyApi';

interface useGetEDProps {
    withPplApi?: boolean;
}

export const useGetED = ({ withPplApi = false }: useGetEDProps) => {
    const { api, compatibilityToken } = useAnyApi({ withPplApi });
    const existentialDeposit = useMemo(() => {
        if (!api || !compatibilityToken) return;

        return api.constants.Balances.ExistentialDeposit(compatibilityToken);
    }, [api, compatibilityToken]);

    return { existentialDeposit };
};
