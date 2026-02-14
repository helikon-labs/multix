import { InjectedWalletProvider } from '@reactive-dot/core/wallets.js';
import { registerDotConnect } from 'dot-connect';
import { DAPP_NAME, WALLETCONNECT_PROJECT_ID } from './constants';
import { WalletConnect } from '@reactive-dot/wallet-walletconnect';
import { defineConfig } from '@reactive-dot/core';
import { getAllNetworkWalletConnectNameSpaces } from './utils/getAllNetworkWalletConnectNameSpaces';

export const config = defineConfig({
    chains: {},
    wallets: [
        new InjectedWalletProvider({ originName: DAPP_NAME }),
        new WalletConnect({
            projectId: WALLETCONNECT_PROJECT_ID,
            providerOptions: {
                metadata: {
                    name: 'Multix',
                    description: 'The best interface to create and manage multisigs on Polkadot.',
                    url: 'https://multix.cloud',
                    icons: ['https://multix.cloud/android-chrome-192x192.png?raw=true'],
                },
            },
            optionalChainIds: getAllNetworkWalletConnectNameSpaces(),
        }),
    ],
});

// Register dot-connect custom elements & configure supported wallets
registerDotConnect({
    wallets: config.wallets ?? [],
});
