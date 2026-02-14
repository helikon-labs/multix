import { useApi } from '../contexts/ApiContext';
import { useCallback } from 'react';
import { sortAddresses } from '@polkadot/util-crypto';

export const useGetSortAddress = () => {
    const { chainInfo } = useApi();

    const getSortAddress = useCallback(
        (addresses: string[]) => {
            if (
                chainInfo?.isEthereum &&
                addresses.every((add) => {
                    return add.startsWith('0x') && add.length === 42;
                })
            ) {
                return addresses.sort();
            }

            return sortAddresses(addresses);
        },
        [chainInfo],
    );

    return { getSortAddress };
};
