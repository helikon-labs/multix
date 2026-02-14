import { networkList } from '../constants';
import { getWalletConnectId } from './getWalletConnectId';
import { getWalletConnectNameSpace } from './getWalletConnectNameSpace';

export const getAllNetworkWalletConnectNameSpaces = (): string[] => {
    return (
        Object.values(networkList)
            .map((network) => network.genesisHash)
            .filter(Boolean) as string[]
    ).map((genesisHash) => {
        const id = getWalletConnectId(genesisHash);
        return getWalletConnectNameSpace(id);
    });
};
