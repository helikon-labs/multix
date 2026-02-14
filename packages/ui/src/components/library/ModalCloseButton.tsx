import { IconButton, styled } from '@mui/material';
import { HiOutlineXMark as CloseIcon } from 'react-icons/hi2';

interface Props {
    onClose: () => void;
    className?: string;
}

const CloseButton = ({ onClose, className }: Props) => (
    <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={onClose}
        className={className}
    >
        <CloseIcon size={20} />
    </IconButton>
);

export const ModalCloseButton = styled(CloseButton)`
    position: absolute;
    right: 0.5rem;
    top: 0.5rem;
`;
