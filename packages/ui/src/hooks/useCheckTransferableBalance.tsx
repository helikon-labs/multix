import { useMemo } from 'react';
import { useGetBalance } from './useGetBalance';

export interface Props {
    min?: bigint;
    address?: string;
    withPplApi: boolean;
}

export const useCheckTransferableBalance = ({ min, address, withPplApi }: Props) => {
    const { balance } = useGetBalance({ address, withPplApi });
    const hasEnoughFreeBalance = useMemo(() => {
        if (!address || !balance || min === undefined) {
            return false;
        }
        return balance > min;
    }, [address, min, balance]);

    return { hasEnoughFreeBalance };
};
