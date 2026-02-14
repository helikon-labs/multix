import { IconButton, Snackbar } from '@mui/material';
import { Toast, useToasts } from '../../contexts/ToastContext';
import { HiOutlineXMark as CloseIcon } from 'react-icons/hi2';
import ToastContent from './ToastContent';
import React, { useCallback } from 'react';
import { styled } from '@mui/material/styles';

const HORIZONTAL_POSITION = 'left';
const VERTICAL_POSITION = 'bottom';
const DEFAULT_AUTO_HIDE_DURATION = 6000;
const ERROR_AUTO_HIDE_DURATION = 600000;

interface Props {
    toast: Toast;
    className?: string;
}

const ToastBar = ({ toast, className }: Props) => {
    const { id, duration } = toast;
    const { removeToast } = useToasts();

    const handleClose = useCallback(
        (_: React.SyntheticEvent | Event, reason?: string) => {
            if (reason === 'clickaway') {
                return;
            }

            removeToast(id);
        },
        [removeToast, id],
    );

    return (
        <Snackbar
            className={className}
            open={true}
            anchorOrigin={{ vertical: VERTICAL_POSITION, horizontal: HORIZONTAL_POSITION }}
            autoHideDuration={
                toast.type === 'error'
                    ? ERROR_AUTO_HIDE_DURATION
                    : duration || DEFAULT_AUTO_HIDE_DURATION
            }
            onClose={handleClose}
            key={id}
            action={
                <IconButton
                    size="small"
                    aria-label="close"
                    color="inherit"
                    onClick={handleClose}
                >
                    <CloseIcon size={20} />
                </IconButton>
            }
            message={<ToastContent toast={toast} />}
        />
    );
};

export default styled(ToastBar)`
    position: relative;
    bottom: 0;
    left: 0;
`;
