import { useMultiProxy } from '../contexts/MultiProxyContext';
import { useApi } from '../contexts/ApiContext';
import { useNetwork } from '../contexts/NetworkContext';
import { useAccounts } from '../contexts/AccountsContext';
import LoadingBox from '../components/LoadingBox';

export const useDisplayLoader = () => {
    const { isLoading: isLoadingMultisigs } = useMultiProxy();
    const { api } = useApi();
    const { selectedNetworkInfo } = useNetwork();
    const { isAccountsLoading } = useAccounts();

    if (!api) {
        return (
            <LoadingBox
                message={`Connecting to the node at ${selectedNetworkInfo.rpcUrls}`}
                testId="rpc-connection"
            />
        );
    }
    if (isAccountsLoading) {
        return (
            <LoadingBox
                message={`Loading accounts...`}
                testId="accounts"
            />
        );
    }
    if (isLoadingMultisigs) {
        return (
            <LoadingBox
                message={`Loading your multisigs...`}
                testId="multisigs"
            />
        );
    }

    return null;
};
