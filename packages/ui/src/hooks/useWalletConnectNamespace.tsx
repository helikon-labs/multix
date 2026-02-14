import { useCallback, useEffect, useMemo, useState } from 'react';
import { useApi } from '../contexts/ApiContext';
import { getWalletConnectId } from '../utils/getWalletConnectId';
import { getWalletConnectNameSpace } from '../utils/getWalletConnectNameSpace';

export const useGetWalletConnectNamespace = () => {
    const { client } = useApi();
    const [genesisHash, setGenesisHash] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!client) return;

        client
            .getChainSpecData()
            .then((data) => setGenesisHash(data.genesisHash))
            .catch(console.error)
            .finally(() => setIsLoading(false));
    }, [client]);

    const walletConnectId = useMemo(() => getWalletConnectId(genesisHash), [genesisHash]);

    const namespace = useMemo(() => getWalletConnectNameSpace(walletConnectId), [walletConnectId]);

    const getAccountsWithNamespace = useCallback(
        (accounts: string[]) => {
            return accounts.map((address) => `${namespace}:${address}`);
        },
        [namespace],
    );

    return { walletConnectId, currentNamespace: namespace, getAccountsWithNamespace, isLoading };
};
