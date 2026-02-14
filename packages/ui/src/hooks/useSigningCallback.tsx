import { useApi } from '../contexts/ApiContext';
import { useGetSubscanLinks } from './useSubscanLink';
import { useToasts } from '../contexts/ToastContext';
import { TxEvent } from 'polkadot-api';
import { JSONprint } from '../utils/jsonPrint';
import { translateError, translateErrorInfo } from '../utils/translateError';

interface Args {
    withSubscanLink?: boolean;
    onSubmitting?: () => void;
    onSuccess?: () => void;
    onError?: (message?: string) => void;
    onFinalized?: () => void;
}

export const useSigningCallback = ({
    onSubmitting,
    onSuccess,
    onFinalized,
    onError,
    withSubscanLink = true,
}: Args) => {
    const { addToast } = useToasts();
    const { api } = useApi();
    const { getSubscanExtrinsicLink } = useGetSubscanLinks();

    return {
        next: (event: TxEvent) => {
            const link = withSubscanLink ? getSubscanExtrinsicLink(event.txHash) : undefined;

            if (event.type === 'broadcasted') {
                console.log('Transaction hash:', event.txHash);
                onSubmitting && onSubmitting();
                addToast({ title: `Tx broadcasted`, type: 'loading', link });
            }

            let errorInfo = '';
            let toastErrorShown = false;

            if (!api) {
                return;
            }

            if (event.type === 'txBestBlocksState' && event.found) {
                if (event.dispatchError) {
                    console.log('DispatchError', event.dispatchError);

                    if (
                        event.dispatchError.type === 'Module' &&
                        !!(event.dispatchError.value as any)?.value?.type
                    ) {
                        errorInfo = (event.dispatchError.value as any)?.value?.type;
                    }
                }

                event.events.forEach((event) => {
                    console.log(JSONprint(event));

                    // failed mutlisig
                    if (event.type === 'Multisig' && event.value.type === 'MultisigExecuted') {
                        if (event.value.value.result.success === false) {
                            errorInfo = JSONprint(event.value.value.result.value);
                        }
                    }
                    // interrupted batch
                    if (event.type === 'Utility' && event.value.type === 'BatchInterrupted') {
                        errorInfo = event.value.value.error.type;
                    }

                    // if it's a success and there's been no error nested in
                    if (event.type === 'System' && event.value.type === 'ExtrinsicSuccess') {
                        !errorInfo &&
                            !toastErrorShown &&
                            addToast({ title: 'Tx in block', type: 'success', link });
                        onSuccess && onSuccess();
                    }
                });

                if (!!errorInfo && !toastErrorShown) {
                    addToast({ title: translateErrorInfo(errorInfo), type: 'error', link });
                    onError && onError(errorInfo);
                    // prevent showing several errors
                    toastErrorShown = true;
                }
            }

            if (event.type === 'finalized') {
                console.log('finalized:', event);
                onFinalized && onFinalized();
            }
        },
        error: (e: Error) => {
            console.error(e);
            const error = translateError(e);
            addToast({ title: error, type: 'error' });
            onError && onError();
        },
    };
};
