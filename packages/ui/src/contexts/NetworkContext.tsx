import React, { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { NetworkInfo, SupportedNetworks, networkList } from '../constants';

const LOCALSTORAGE_SELECTED_NETWORK = 'multix.selectedNetwork';
const DEFAULT_NETWORK = 'polkadot';

type NetworkContextProps = {
    children: React.ReactNode | React.ReactNode[];
};

export interface INetworkContext {
    selectNetwork: (network: string, shouldResetAddress: boolean) => void;
    selectedNetworkInfo: NetworkInfo;
    selectedNetwork: SupportedNetworks;
}

const NetworkContext = React.createContext<INetworkContext | undefined>(undefined);
const isSupportedNetwork = (network: string): network is SupportedNetworks =>
    !!networkList[network as SupportedNetworks];

const NetworkContextProvider = ({ children }: NetworkContextProps) => {
    const [searchParams, setSearchParams] = useSearchParams({ network: '' });
    const [selectedNetwork, setSelectedNetwork] = useState<SupportedNetworks>(() => {
        const networkParam = searchParams.get('network');
        if (networkParam && isSupportedNetwork(networkParam)) return networkParam;
        const prev = localStorage.getItem(LOCALSTORAGE_SELECTED_NETWORK);
        if (prev && isSupportedNetwork(prev)) return prev as SupportedNetworks;
        return DEFAULT_NETWORK;
    });
    const [selectedNetworkInfo, setSelectedNetworkInfo] = useState<NetworkInfo>(
        () => networkList[selectedNetwork],
    );

    // sync the initial resolved network to the URL and localStorage once on mount
    useEffect(() => {
        setSearchParams((prev) => {
            prev.set('network', selectedNetwork);
            return prev;
        });
        localStorage.setItem(LOCALSTORAGE_SELECTED_NETWORK, selectedNetwork);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const selectNetwork = useCallback(
        (network: string, shouldResetAccountAddress = false) => {
            if (!isSupportedNetwork(network)) {
                console.error('This network is not supported', network);
            }
            const validNetwork = isSupportedNetwork(network) ? network : DEFAULT_NETWORK;
            setSelectedNetworkInfo(networkList[validNetwork]);
            setSelectedNetwork(validNetwork);
            setSearchParams((prev) => {
                shouldResetAccountAddress && prev.delete('address');
                prev.set('network', validNetwork);
                return prev;
            });
            localStorage.setItem(LOCALSTORAGE_SELECTED_NETWORK, validNetwork);
        },
        [setSelectedNetworkInfo, setSelectedNetwork, setSearchParams],
    );

    return (
        <NetworkContext.Provider
            value={{
                selectNetwork,
                selectedNetwork,
                selectedNetworkInfo,
            }}
        >
            {children}
        </NetworkContext.Provider>
    );
};

const useNetwork = () => {
    const context = React.useContext(NetworkContext);
    if (context === undefined) {
        throw new Error('useNetwork must be used within a NetworkProvider');
    }
    return context;
};

export { NetworkContextProvider, useNetwork };
