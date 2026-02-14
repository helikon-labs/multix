import { useCallback, useEffect } from 'react';
import { WalletKitTypes } from '@reown/walletkit';
import { POLKADOT_SIGNING_METHODS } from '../constants';
import { useWalletConnect } from '../contexts/WalletConnectContext';
import { useModals } from '../contexts/ModalsContext';
import { useGetWalletConnectNamespace } from './useWalletConnectNamespace';

export default function useWalletConnectEventsManager() {
    const { walletKit } = useWalletConnect();
    const { openWalletConnectSessionModal, onOpenWalletConnectSigning } = useModals();
    const { currentNamespace } = useGetWalletConnectNamespace();

    // Open session proposal modal for confirmation / rejection
    const onSessionProposal = useCallback(
        (proposal: WalletKitTypes.EventArguments['session_proposal']) => {
            console.info('WalletConnect session_proposal', proposal);
            openWalletConnectSessionModal({ sessionProposal: proposal });
        },
        [openWalletConnectSessionModal],
    );

    const onAuthRequest = useCallback(
        (request: WalletKitTypes.EventArguments['session_authenticate']) => {
            console.error('---> WalletConnect AuthRequest not implemented', request);
        },
        [],
    );

    // Open request handling modal based on method that was used
    const onSessionRequest = useCallback(
        async (requestEvent: WalletKitTypes.EventArguments['session_request']) => {
            console.info('WalletConnect session_request', requestEvent);
            if (!walletKit) {
                console.error('walletKit is undefined');
                return;
            }
            const { topic, params } = requestEvent;
            const { request } = params;
            const requestSession = walletKit.engine.signClient.session.get(topic);
            switch (request.method) {
                case POLKADOT_SIGNING_METHODS.POLKADOT_SIGN_MESSAGE:
                case POLKADOT_SIGNING_METHODS.POLKADOT_SIGN_TRANSACTION:
                    if (requestEvent.params.chainId !== currentNamespace) {
                        console.error(
                            "The chain from WalletConnect doesn't match with the current. Switch to the right network.",
                        );
                        return;
                    }

                    if (request.params.transactionPayload) {
                        onOpenWalletConnectSigning(requestEvent);
                    }
                    break;

                default:
                    console.log('Session Unsuported Method Modal', requestEvent, requestSession);
                    return null;
            }
        },
        [currentNamespace, onOpenWalletConnectSigning, walletKit],
    );

    useEffect(() => {
        if (walletKit) {
            // sign
            walletKit.on('session_proposal', onSessionProposal);
            walletKit.on('session_request', onSessionRequest);
            // auth
            walletKit.on('session_authenticate', onAuthRequest);
            // session deleted
            walletKit.on('session_delete', (data) => console.log('session deleted', data));
        }
    }, [onSessionProposal, onSessionRequest, onAuthRequest, walletKit]);
}
