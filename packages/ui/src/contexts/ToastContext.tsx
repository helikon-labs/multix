import { useState, useContext, createContext } from 'react';
import { ToastType } from '../components/Toasts/ToastContent';
import Snackbar from '../components/Toasts/Snackbar';

export type Toast = {
    id: number;
    title?: string;
    link?: string;
    duration?: number;
    type: ToastType;
};

const MAX_VISIBLE_TOASTS = 6;

export type ToastContextProps = {
    toasts: Toast[];
    addToast: (toast: Omit<Toast, 'id'>) => void;
    removeToast: (id: Toast['id']) => void;
};

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

const ToastProvider = ({ children }: React.PropsWithChildren) => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const addToast = (toast: Omit<Toast, 'id'>) => {
        const id = Date.now();

        setToasts((prev) => {
            const rest = prev.length < MAX_VISIBLE_TOASTS ? prev : prev.slice(0, -1);
            return [{ ...toast, id }, ...rest];
        });
    };

    const removeToast = (key: Toast['id']) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== key));
    };

    return (
        <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
            <Snackbar />
            {children}
        </ToastContext.Provider>
    );
};

export const useToasts = () => {
    const context = useContext(ToastContext);
    if (context === undefined) {
        throw new Error('useToast must be used within a ToastContextProvider');
    }
    return context;
};

export default ToastProvider;
