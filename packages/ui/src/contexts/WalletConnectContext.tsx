import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Core } from '@walletconnect/core';
import { ICore, PairingTypes } from '@walletconnect/types';
import { WalletKit, IWalletKit } from '@reown/walletkit';
import { DAPP_NAME, WALLETCONNECT_PROJECT_ID } from '../constants';

export type WalletConnect = { [address: string]: string };

type WalletConnectContextProps = {
    children: React.ReactNode | React.ReactNode[];
};

export interface IWalletConnectContext {
    walletKit: IWalletKit | undefined;
    core: ICore;
    pair: (params: { uri: string }) => Promise<PairingTypes.Struct>;
    refresh: () => Promise<void>;
}

const WalletConnectContext = createContext<IWalletConnectContext | undefined>(undefined);

const WalletConnectContextProvider = ({ children }: WalletConnectContextProps) => {
    const [isInitialized, setIsInitialized] = useState(false);
    const [walletKit, setwalletKit] = useState<IWalletKit | undefined>();
    const core = useMemo(
        () =>
            new Core({
                logger: undefined, // use 'debug' to get more insight,
                projectId: WALLETCONNECT_PROJECT_ID,
                // relayUrl: relayerRegionURL ?? import.meta.env.VITE_WALLETCONNECT_PUBLIC_RELAY_URL
            }),
        [],
    );
    const createWalletKit = useCallback(() => {
        return WalletKit.init({
            core,
            metadata: {
                name: DAPP_NAME,
                description: 'Multix Client as Wallet/Peer',
                url: 'multix.cloud',
                icons: ['https://avatars.githubusercontent.com/u/37784886'],
            },
        })
            .then((web) => {
                setwalletKit(web);
                setIsInitialized(true);
            })
            .catch(console.error);
    }, [core]);

    const pair = useCallback(
        async (params: { uri: string }) => {
            return await core.pairing.pair({ uri: params.uri });
        },
        [core],
    );

    const refresh = useCallback(() => {
        return createWalletKit();
    }, [createWalletKit]);

    useEffect(() => {
        if (!isInitialized) {
            createWalletKit();
        }
    }, [createWalletKit, isInitialized]);

    return (
        <WalletConnectContext.Provider value={{ walletKit: walletKit, core, pair, refresh }}>
            {children}
        </WalletConnectContext.Provider>
    );
};

const useWalletConnect = () => {
    const context = useContext(WalletConnectContext);
    if (context === undefined) {
        throw new Error('useWalletConnect must be used within a WalletConnectContextProvider');
    }
    return context;
};

export { WalletConnectContextProvider, useWalletConnect };
