import { Box, Tooltip } from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { styled } from '@mui/material/styles';
import { AccountBadge, IconSizeVariant } from '../../types';
import { getDisplayAddress } from '../../utils/getDisplayAddress';
import IdenticonBadge from '../IdenticonBadge';
import IdentityIcon from '../IdentityIcon';
import { useGetEncodedAddress } from '../../hooks/useGetEncodedAddress';
import { IconButton } from '@mui/material';
import {
    HiOutlinePencilSquare as PencilIcon,
    HiOutlineSquare2Stack as CopyIcon,
} from 'react-icons/hi2';
import { EditInput } from './EditInput';
import { useAccounts } from '../../contexts/AccountsContext';
import { copyTextToClipboard } from '../../utils/copyToClipboard';
import { useAccountDisplayInfo } from '../../hooks/useAccountDisplayInfo';

const DEFAULT_PLACEMENT = 'top';
const DEFAULT_TITLE = 'Address copied!';
const DEFAULT_AUTO_HIDE_DURATION = 2000;

interface Props {
    address: string;
    className?: string;
    badge?: AccountBadge;
    withName?: boolean;
    iconSize?: IconSizeVariant;
    canEdit?: boolean;
    canCopy?: boolean;
}

const AccountDisplay = ({
    className,
    address,
    badge,
    withName = true,
    iconSize = 'medium',
    canEdit = false,
    canCopy = false,
}: Props) => {
    const [isCopyTooltipOpen, setIsCopyTooltipOpen] = useState(false);
    const { ownAddressList } = useAccounts();
    const getEncodedAddress = useGetEncodedAddress();
    const encodedAddress = useMemo(() => getEncodedAddress(address), [address, getEncodedAddress]);

    const [isEditing, setIsEditing] = useState(false);
    const isOwnAccount = useMemo(() => ownAddressList.includes(address), [address, ownAddressList]);
    const { displayName, subIdentity, isLocalNameDisplayed, identity, localName, identityName } =
        useAccountDisplayInfo({
            address,
        });

    useEffect(() => {
        let timeOut: NodeJS.Timeout;

        if (isCopyTooltipOpen) {
            timeOut = setTimeout(() => setIsCopyTooltipOpen(false), DEFAULT_AUTO_HIDE_DURATION);
        }

        return () => timeOut && clearTimeout(timeOut);
    }, [isCopyTooltipOpen]);

    const handleCopyAddress = useCallback(() => {
        if (!canCopy) return;

        setIsCopyTooltipOpen(true);
        copyTextToClipboard(address);
    }, [address, canCopy]);

    const onEditClick = useCallback(() => setIsEditing(true), []);
    const onCloseEdit = useCallback(() => setIsEditing(false), []);

    return (
        <div className={className}>
            <IdenticonBadge
                badge={badge}
                address={encodedAddress}
                size={iconSize}
            />
            <BoxStyled>
                {withName && (
                    <>
                        {!isEditing && (
                            <NameWrapperStyled>
                                {!!identityName && !!identity && (
                                    <IdentityIcon
                                        // Class name for external styling
                                        // Do not remove
                                        className="identityBadge"
                                        identity={identity}
                                    />
                                )}
                                <NameStyled
                                    // Class name for external styling
                                    // Do not remove
                                    className="multisigName"
                                    data-cy="label-account-name"
                                >
                                    {displayName}
                                    {!isLocalNameDisplayed && !!subIdentity && (
                                        <span
                                            className="subIdentity"
                                            data-cy="label-sub-identity"
                                        >
                                            /{subIdentity}
                                        </span>
                                    )}
                                </NameStyled>
                                {canEdit && !displayName && (
                                    <NoNameStyled data-cy="label-no-name">No Name</NoNameStyled>
                                )}
                                {canEdit && !isOwnAccount && (
                                    <EditIconButtonStyled
                                        className={iconSize !== 'large' ? 'small' : ''}
                                        aria-label="edit"
                                        onClick={onEditClick}
                                        data-cy="button-name-edit"
                                    >
                                        <PencilIcon size={20} />
                                    </EditIconButtonStyled>
                                )}
                            </NameWrapperStyled>
                        )}
                        {isEditing && (
                            <EditInput
                                address={address}
                                onClose={onCloseEdit}
                                originalName={localName}
                                buttonSize={iconSize}
                            />
                        )}
                    </>
                )}
                <AddressStyled
                    data-cy="label-account-address"
                    onClick={handleCopyAddress}
                >
                    <Tooltip
                        open={isCopyTooltipOpen}
                        title={DEFAULT_TITLE}
                        placement={DEFAULT_PLACEMENT}
                    >
                        <AddressWrapperStyled>
                            {getDisplayAddress(encodedAddress)}
                        </AddressWrapperStyled>
                    </Tooltip>
                    {canCopy && (
                        <CopyIconWrapperStyled className="copyIcon">
                            <CopyIcon />
                        </CopyIconWrapperStyled>
                    )}
                </AddressStyled>
            </BoxStyled>
        </div>
    );
};

const AddressWrapperStyled = styled('span')``;

const CopyIconWrapperStyled = styled(Box)`
    position: absolute;
    top: 0;
    width: 100%;
    background: ${({ theme }) => theme.custom.gray[400]};
    border-radius: 0.5rem;
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    opacity: 0;
    color: ${({ theme }) => theme.custom.gray[800]};
    transition: opacity 250ms;
`;

const EditIconButtonStyled = styled(IconButton)`
    color: ${({ theme }) => theme.custom.gray[700]};
    margin-left: 0.5rem !important;
    &.small {
        padding: 0 !important;

        svg {
            height: 1rem;
            width: 1rem;
        }
    }

    svg {
        height: 1.2rem;
        width: 1.2rem;
    }
`;

const NoNameStyled = styled('div')`
    color: ${({ theme }) => theme.custom.gray[600]};
`;

const BoxStyled = styled(Box)`
    min-width: 0;
    margin-left: 0.5rem;
    display: grid !important;
    justify-content: start;
    justify-items: start;
`;

const NameWrapperStyled = styled('div')`
    display: flex;
    grid-auto-flow: column;
    align-items: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;

    svg {
        width: 1.5rem;
        height: 1.5rem;
    }

    .subIdentity {
        margin-left: 0.3rem;
        font-weight: 300;
        font-size: 0.8rem;
    }
`;

const AddressStyled = styled('div')`
    color: ${({ theme }) => theme.custom.text.secondary};
    font-size: 1rem;
    font-weight: 400;
    position: relative;

    &:hover > .copyIcon {
        opacity: 90%;
    }
`;

const NameStyled = styled('div')`
    color: ${({ theme }) => theme.custom.text.primary};
    font-size: 1rem;
    font-weight: 500;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

export default styled(AccountDisplay)`
    display: flex;
    align-items: center;
    margin-left: 0.5rem;

    .identityBadge {
        margin-right: 0.3rem;
        height: 1.5rem;
        width: 1.5rem;
    }
`;
