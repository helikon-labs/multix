import { useState, useContext, createContext, useCallback } from 'react';
import ChangeMultisig from '../components/modals/ChangeMultisig';
import EditNames from '../components/modals/EditNames';
import Send, { DEFAULT_EASY_SETUP_SELECTION, EasyTransferTitle } from '../components/modals/Send';
import { SignClientTypes } from '@walletconnect/types';
import WCSessionProposal from '../components/modals/WalletConnectSessionProposal';
import ProposalSigningModal, { SigningModalProps } from '../components/modals/ProposalSigning';
import WalletConnectSigning from '../components/modals/WalletConnectSigning';
import HiddenAccountInfo from '../components/modals/HiddenAccountInfo';
import { usePendingTx } from './PendingTxContext';

interface ModalsContextProps {
    setIsEditModalOpen: (isOpen: boolean) => void;
    setIsChangeMultiModalOpen: (isOpen: boolean) => void;
    onOpenSendModal: (preselected?: EasyTransferTitle) => void;
    onCloseSendModal: () => void;
    openWalletConnectSessionModal: ({ sessionProposal }: OpenWCModalParams) => void;
    onOpenSigningModal: (info: SigningInfo) => void;
    onOpenWalletConnectSigning: (
        request: SignClientTypes.EventArguments['session_request'],
    ) => void;
    onOpenHiddenAccountInfoModal: () => void;
}

interface OpenWCModalParams {
    sessionProposal: SignClientTypes.EventArguments['session_proposal'];
}

type SigningInfo = Omit<SigningModalProps, 'onClose'>;

const ModalsContext = createContext<ModalsContextProps | undefined>(undefined);

const ModalsContextProvider = ({ children }: React.PropsWithChildren) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isChangeMultiModalOpen, setIsChangeMultiModalOpen] = useState(false);
    const [isSendModalOpen, setIsSendModalOpen] = useState(false);
    const [isWCModalOpen, setIsWCModalOpen] = useState(false);
    const [isSigningModalOpen, setIsSigningModalOpen] = useState(false);
    const [signingModalInfo, setSigningModalInfo] = useState<SigningInfo | undefined>();
    const [isOpenWalletConnectSigning, setIsOpenWalletConnectSigning] = useState(false);
    const [sendModalPreselection, setSendModalPreselection] = useState<EasyTransferTitle>(
        DEFAULT_EASY_SETUP_SELECTION,
    );
    const [isHiddenAccountInfoModalOpen, setIsHiddenAccountInfoModalOpen] = useState(false);
    const [walletConnectRequest, setWalletConnectRequest] = useState<
        SignClientTypes.EventArguments['session_request'] | undefined
    >();

    const [wCSessionProposal, setWCSessionProposal] = useState<
        OpenWCModalParams['sessionProposal'] | undefined
    >();

    const { refresh, refreshPpl } = usePendingTx();
    const onCloseEditModal = useCallback(() => setIsEditModalOpen(false), [setIsEditModalOpen]);
    const onCloseChangeMultiModal = useCallback(
        () => setIsChangeMultiModalOpen(false),
        [setIsChangeMultiModalOpen],
    );
    const onCloseSigningModal = useCallback(() => {
        setIsSigningModalOpen(false);
        setSigningModalInfo(undefined);
    }, []);

    const onOpenSendModal = useCallback((preselection?: EasyTransferTitle) => {
        preselection && setSendModalPreselection(preselection);
        setIsSendModalOpen(true);
    }, []);

    const onCloseSendModal = useCallback(() => {
        setIsSendModalOpen(false);
        setSendModalPreselection(DEFAULT_EASY_SETUP_SELECTION);
    }, []);

    const onSuccessSendModal = useCallback(() => {
        onCloseSendModal();
        refresh();
        refreshPpl();
    }, [onCloseSendModal, refresh, refreshPpl]);

    const onFinalizedSendModal = useCallback(() => {
        refresh();
        refreshPpl();
    }, [refresh, refreshPpl]);

    const openWalletConnectSessionModal = useCallback(({ sessionProposal }: OpenWCModalParams) => {
        setWCSessionProposal(sessionProposal);
        setIsWCModalOpen(true);
    }, []);

    const onCloseWCModal = useCallback(() => {
        setIsWCModalOpen(false);
    }, []);

    const onOpenSigningModal = useCallback((info: SigningInfo) => {
        setSigningModalInfo(info);
        setIsSigningModalOpen(true);
    }, []);

    const onOpenWalletConnectSigning = useCallback(
        (request: SignClientTypes.EventArguments['session_request']) => {
            setWalletConnectRequest(request);
            setIsOpenWalletConnectSigning(true);
        },
        [],
    );

    const onCloseWalletConnectSigning = useCallback(() => {
        setWalletConnectRequest(undefined);
        setIsOpenWalletConnectSigning(false);
    }, []);

    const onOpenHiddenAccountInfoModal = useCallback(() => {
        setIsHiddenAccountInfoModalOpen(true);
    }, []);

    return (
        <ModalsContext.Provider
            value={{
                setIsEditModalOpen,
                setIsChangeMultiModalOpen,
                onOpenSendModal,
                onCloseSendModal,
                openWalletConnectSessionModal,
                onOpenSigningModal,
                onOpenWalletConnectSigning,
                onOpenHiddenAccountInfoModal,
            }}
        >
            {children}
            {isSendModalOpen && (
                <Send
                    preselected={sendModalPreselection}
                    onClose={onCloseSendModal}
                    onSuccess={onSuccessSendModal}
                    onFinalized={onFinalizedSendModal}
                />
            )}
            {isEditModalOpen && <EditNames onClose={onCloseEditModal} />}
            {isChangeMultiModalOpen && <ChangeMultisig onClose={onCloseChangeMultiModal} />}
            {isWCModalOpen && (
                <WCSessionProposal
                    onClose={onCloseWCModal}
                    sessionProposal={wCSessionProposal}
                />
            )}
            {isSigningModalOpen && signingModalInfo && (
                <ProposalSigningModal
                    possibleSigners={signingModalInfo.possibleSigners}
                    onClose={onCloseSigningModal}
                    proposalData={signingModalInfo.proposalData}
                    onSuccess={signingModalInfo.onSuccess}
                    isPplChainTx={signingModalInfo.isPplChainTx}
                />
            )}
            {isOpenWalletConnectSigning && !!walletConnectRequest && (
                <WalletConnectSigning
                    onClose={onCloseWalletConnectSigning}
                    request={walletConnectRequest}
                />
            )}
            {isHiddenAccountInfoModalOpen && (
                <HiddenAccountInfo onClose={() => setIsHiddenAccountInfoModalOpen(false)} />
            )}
        </ModalsContext.Provider>
    );
};

const useModals = () => {
    const context = useContext(ModalsContext);
    if (context === undefined) {
        throw new Error('useModals must be used within a ModalsContextProvider');
    }
    return context;
};

export { ModalsContextProvider, useModals };
