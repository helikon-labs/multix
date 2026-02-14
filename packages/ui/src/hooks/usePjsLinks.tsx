import { useMemo } from 'react';
import { useNetwork } from '../contexts/NetworkContext';

interface Params {
    isPplChain: boolean;
}

export const usePjsLinks = ({ isPplChain }: Params) => {
    const { selectedNetworkInfo } = useNetwork();
    const urlBase = useMemo(() => {
        if (!selectedNetworkInfo?.rpcUrls) return '';

        const encodedRpc = encodeURIComponent(
            isPplChain && selectedNetworkInfo?.pplChainRpcUrls
                ? selectedNetworkInfo?.pplChainRpcUrls[0]
                : selectedNetworkInfo?.rpcUrls[0],
        );
        return `https://polkadot.js.org/apps/?rpc=${encodedRpc}#`;
    }, [isPplChain, selectedNetworkInfo?.pplChainRpcUrls, selectedNetworkInfo?.rpcUrls]);

    return {
        getDecodeUrl: (hex: string) => `${urlBase}/extrinsics/decode/${hex}`,
        extrinsicUrl: `${urlBase}/extrinsics`,
    };
};
