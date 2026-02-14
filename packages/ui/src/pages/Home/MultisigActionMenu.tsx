import { Button } from '../../components/library';
import OptionsMenu, { MenuOption } from '../../components/OptionsMenu';
import { useCallback, useMemo } from 'react';
import { MdOutlineLockReset as LockResetIcon } from 'react-icons/md';
import { useMultiProxy } from '../../contexts/MultiProxyContext';
import { useModals } from '../../contexts/ModalsContext';
import {
    HiOutlineArrowTopRightOnSquare as LaunchIcon,
    HiOutlineUserPlus as IdentityIcon,
    HiOutlinePencilSquare as PencilIcon,
    HiOutlineEyeSlash as EyeSlashIcon,
} from 'react-icons/hi2';
import { useGetSubscanLinks } from '../../hooks/useSubscanLink';
import { EasyTransferTitle } from '../../components/modals/Send';
import { useHasIdentityFeature } from '../../hooks/useHasIdentityFeature';
import { useHiddenAccounts } from '../../contexts/HiddenAccountsContext';

interface MultisigActionMenuProps {
    withNewTransactionButton?: boolean;
    menuButtonBorder?: CSSStyleDeclaration['border'];
}

const MultisigActionMenu = ({
    withNewTransactionButton = true,
    menuButtonBorder,
}: MultisigActionMenuProps) => {
    const { selectedHasProxy, selectedIsWatched, selectedMultiProxy, selectedMultiProxyAddress } =
        useMultiProxy();
    const { setIsEditModalOpen, setIsChangeMultiModalOpen, onOpenSendModal } = useModals();
    const { getSubscanAccountLink } = useGetSubscanLinks();
    const { hasPplChain } = useHasIdentityFeature();
    const { addHiddenAccount } = useHiddenAccounts();
    const { onOpenHiddenAccountInfoModal } = useModals();

    const onHideAccount = useCallback(() => {
        if (!selectedMultiProxyAddress) return;

        onOpenHiddenAccountInfoModal();
        addHiddenAccount(selectedMultiProxyAddress);
    }, [addHiddenAccount, onOpenHiddenAccountInfoModal, selectedMultiProxyAddress]);

    const options: MenuOption[] = useMemo(() => {
        const opts = [
            {
                text: 'Edit names',
                icon: <PencilIcon size={20} />,
                onClick: () => setIsEditModalOpen(true),
            },
            {
                text: 'Hide this account',
                icon: <EyeSlashIcon size={20} />,
                onClick: onHideAccount,
            },
            {
                text: 'Subscan',
                icon: <LaunchIcon size={20} />,
                onClick: () =>
                    window.open(
                        selectedMultiProxy?.proxy
                            ? getSubscanAccountLink(selectedMultiProxy?.proxy)
                            : getSubscanAccountLink(selectedMultiProxy?.multisigs[0].address, true),
                    ),
            },
        ];

        !selectedIsWatched &&
            hasPplChain &&
            !selectedHasProxy &&
            opts.push({
                text: 'Set identity',
                icon: <IdentityIcon size={20} />,
                onClick: () => onOpenSendModal(EasyTransferTitle.SetIdentity),
            });
        // allow rotation only for the multisigs with a proxy
        selectedHasProxy &&
            !selectedIsWatched &&
            opts.push({
                text: 'Change multisig',
                icon: <LockResetIcon size={20} />,
                onClick: () => setIsChangeMultiModalOpen(true),
            });

        return opts;
    }, [
        onHideAccount,
        selectedIsWatched,
        hasPplChain,
        selectedHasProxy,
        setIsEditModalOpen,
        selectedMultiProxy,
        getSubscanAccountLink,
        onOpenSendModal,
        setIsChangeMultiModalOpen,
    ]);

    return (
        <>
            {withNewTransactionButton && (
                <Button
                    variant="primary"
                    aria-label="send"
                    onClick={() => onOpenSendModal()}
                    data-cy="button-new-transaction"
                >
                    New transaction
                </Button>
            )}
            <OptionsMenu
                menuButtonBorder={menuButtonBorder}
                options={options}
            />
        </>
    );
};

export default MultisigActionMenu;
