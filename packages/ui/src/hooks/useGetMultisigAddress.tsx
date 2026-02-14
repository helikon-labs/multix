import { useMemo } from 'react';
import { useApi } from '../contexts/ApiContext';
import { createKeyMulti } from '@polkadot/util-crypto';
import { useGetEncodedAddress } from './useGetEncodedAddress';

export const useGetMultisigAddress = (signatories: string[], threshold?: number | null) => {
    const { chainInfo } = useApi();
    const getEncodedAddress = useGetEncodedAddress();

    const newMultisigPubKey = useMemo(() => {
        if (!threshold) return;
        return createKeyMulti(signatories, threshold);
    }, [signatories, threshold]);
    const newMultisigAddress = useMemo(
        () => getEncodedAddress(newMultisigPubKey),
        [getEncodedAddress, newMultisigPubKey],
    );

    if (chainInfo?.isEthereum && newMultisigAddress?.startsWith('0x')) {
        return newMultisigAddress.slice(0, 42);
    }

    return newMultisigAddress;
};
