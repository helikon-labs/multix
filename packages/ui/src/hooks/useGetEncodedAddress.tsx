import { useApi } from '../contexts/ApiContext';
import { useCallback } from 'react';
import { encodesubstrateAddress } from '../utils/encodeSubstrateAddress';
import { u8aToHex, isU8a } from '@polkadot/util';
import { isValidAddress } from '../utils/isValidAddress';

export const useGetEncodedAddress = () => {
    const { chainInfo } = useApi();

    const getEncodedAddress = useCallback(
        (address: string | Uint8Array | undefined) => {
            if (!chainInfo || !address || address === 'undefined') {
                return;
            }

            if (!isValidAddress(address)) {
                return;
            }

            if (chainInfo?.isEthereum) {
                const res = isU8a(address)
                    ? u8aToHex(address as Uint8Array).toString()
                    : (address as string);
                return res.slice(0, 42);
            }

            return encodesubstrateAddress(address, chainInfo.ss58Format);
        },
        [chainInfo],
    );

    return getEncodedAddress;
};
