import { useCallback } from 'react';
import { useNetwork } from '../contexts/NetworkContext';
import { getSubscanExtrinsicLink } from '../utils/getSubscanExtrinsicLink';
import { getSubscanAccountLink } from '../utils/getSubscanAccountLink';

export const useGetSubscanLinks = () => {
    const { selectedNetworkInfo } = useNetwork();

    const _getSubscanExtrinsicLink = useCallback(
        (txHash: string) =>
            getSubscanExtrinsicLink(selectedNetworkInfo?.explorerNetworkName, txHash),
        [selectedNetworkInfo],
    );

    const _getSubscanAccountLink = useCallback(
        (account?: string, multisig = false) =>
            getSubscanAccountLink(selectedNetworkInfo?.explorerNetworkName, account, multisig),
        [selectedNetworkInfo],
    );
    return {
        getSubscanExtrinsicLink: _getSubscanExtrinsicLink,
        getSubscanAccountLink: _getSubscanAccountLink,
    };
};
