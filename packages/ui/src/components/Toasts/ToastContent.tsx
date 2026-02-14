import { Box, CircularProgress } from '@mui/material';
import { MdErrorOutline as ErrorOutlineIcon } from 'react-icons/md';
import {
    HiOutlineArrowTopRightOnSquare as LaunchIcon,
    HiOutlineCheckCircle,
} from 'react-icons/hi2';
import { styled } from '@mui/material/styles';
import { useCallback } from 'react';
import { Toast } from '../../contexts/ToastContext';

export type ToastType = 'success' | 'error' | 'loading';

export interface ToastContentProps {
    className?: string;
    toast: Toast;
}

const ToastContent = ({ className, toast }: ToastContentProps) => {
    const { type, title, link } = toast;

    const onOpenLink = useCallback(() => {
        window.open(link, '_blank');
    }, [link]);

    return (
        <div
            className={className}
            data-cy="notification-wrapper"
        >
            <div className="iconContainer">
                {type === 'success' ? (
                    <HiOutlineCheckCircle
                        data-cy="notification-icon-success"
                        size={24}
                    />
                ) : type === 'loading' ? (
                    <CircularProgress
                        data-cy="notification-icon-loading"
                        size={24}
                    />
                ) : (
                    <ErrorOutlineIconStyled
                        data-cy="notification-icon-error"
                        size={24}
                    />
                )}
            </div>
            <Box
                component="p"
                className="titleContainer"
            >
                {title}
            </Box>
            {!!link && (
                <Box
                    className="linkIcon"
                    onClick={onOpenLink}
                >
                    <LaunchIcon size={20} />
                </Box>
            )}
        </div>
    );
};

const ErrorOutlineIconStyled = styled(ErrorOutlineIcon)`
    color: ${({ theme }) => theme.custom.error};
`;

export default styled(ToastContent)`
    display: flex;
    flex-direction: row;
    align-items: center;

    .linkIcon {
        display: flex;
        cursor: pointer;
        padding-left: 1rem;
    }

    .iconContainer {
        margin-right: 1rem;
        display: flex;
    }
`;
