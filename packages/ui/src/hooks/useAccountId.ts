import { useNetwork } from '../contexts/NetworkContext';

const getId = (pubKey: string, chainId: string) => `${chainId}-${pubKey}`;

export function useAccountId(pubKey: string[]): string[];
export function useAccountId(pubKey: string): string;
export function useAccountId(pubKey: string | string[]) {
    const { selectedNetworkInfo } = useNetwork();

    if (Array.isArray(pubKey)) {
        return pubKey.map((pk) => getId(pk, selectedNetworkInfo?.chainId || ''));
    }

    return getId(pubKey, selectedNetworkInfo?.chainId || '');
}
