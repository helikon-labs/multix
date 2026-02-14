import { Stack, styled } from '@mui/material';
import { useToasts } from '../../contexts/ToastContext';
import ToastBar from './ToastBar';

interface Props {
    className?: string;
}

const Snackbar = ({ className }: Props) => {
    const { toasts } = useToasts();

    return (
        <Stack
            className={className}
            flexDirection="column"
            gap={1}
        >
            {toasts.map((toast) => (
                <ToastBar
                    toast={toast}
                    key={toast.id}
                />
            ))}
        </Stack>
    );
};

export default styled(Snackbar)`
    position: fixed;
    bottom: 1rem;
    left: 1rem;
    z-index: 9999;
`;
