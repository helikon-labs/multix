import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router';
import { useMultiProxy } from '../contexts/MultiProxyContext';

export const useSwitchAddress = () => {
    const [searchParams] = useSearchParams({
        address: '',
        network: '',
    });
    const urlAddress = useMemo(() => {
        return searchParams.get('address') || '';
    }, [searchParams]);

    const {
        multiProxyList,
        isLoading: isMultiproxyLoading,
        selectMultiProxy,
        selectedMultiProxyAddress,
        setCanFindMultiProxyFromUrl,
        defaultAddress,
    } = useMultiProxy();

    useEffect(() => {
        if (isMultiproxyLoading) {
            // we're not yet initialized
            return;
        }

        if (!!urlAddress && !selectedMultiProxyAddress) {
            // this looks like a first load with an address
            const isSuccess = selectMultiProxy(urlAddress);
            setCanFindMultiProxyFromUrl(isSuccess);

            return;
        }

        if (!urlAddress && !!defaultAddress) {
            // no address in the url, init with the default
            const isSuccess = selectMultiProxy(defaultAddress);
            setCanFindMultiProxyFromUrl(isSuccess);

            return;
        }
    }, [
        defaultAddress,
        isMultiproxyLoading,
        multiProxyList,
        selectMultiProxy,
        selectedMultiProxyAddress,
        setCanFindMultiProxyFromUrl,
        urlAddress,
    ]);
};
