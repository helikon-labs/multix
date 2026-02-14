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
    selectedNetworkInfo?: NetworkInfo;
    selectedNetwork?: SupportedNetworks;
}

const NetworkContext = React.createContext<INetworkContext | undefined>(undefined);
const isSupportedNetwork = (network: string): network is SupportedNetworks =>
    !!networkList[network as SupportedNetworks];

const NetworkContextProvider = ({ children }: NetworkContextProps) => {
    const [selectedNetworkInfo, setSelectedNetworkInfo] = useState<NetworkInfo | undefined>();
    const [selectedNetwork, setSelectedNetwork] = useState<SupportedNetworks | undefined>();
    const [searchParams, setSearchParams] = useSearchParams({ network: '' });

    const selectNetwork = useCallback(
        (network: string, shouldResetAccountAddress = false) => {
            if (!isSupportedNetwork(network)) {
                console.error('This network is not supported', network);
                selectNetwork(DEFAULT_NETWORK);
                return;
            }

            setSelectedNetworkInfo(networkList[network]);
            setSelectedNetwork(network);
            setSearchParams((prev) => {
                shouldResetAccountAddress && prev.delete('address');
                prev.set('network', network);
                return prev;
            });
            localStorage.setItem(LOCALSTORAGE_SELECTED_NETWORK, network);
        },
        [setSearchParams],
    );

    useEffect(() => {
        if (!selectedNetwork) {
            const networkParam = searchParams.get('network');

            // connect to the node set in the query string
            if (networkParam) {
                selectNetwork(networkParam);
                return;
            }

            // connect the the previously selected network
            const previouslySelectedNetwork = localStorage.getItem(LOCALSTORAGE_SELECTED_NETWORK);
            if (
                !!previouslySelectedNetwork &&
                previouslySelectedNetwork.includes(networkParam as SupportedNetworks)
            ) {
                selectNetwork(previouslySelectedNetwork as SupportedNetworks);
                return;
            }

            selectNetwork(DEFAULT_NETWORK);
        }
    }, [searchParams, selectNetwork, selectedNetwork]);

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
