import { ProxyType } from '../model';

export const getProxyAccountId = (
    delegateePubKey?: string,
    delegatorPubKey?: string,
    type?: ProxyType,
    delay = 0,
    chainId?: string,
) => {
    if (!delegateePubKey || !delegatorPubKey || !type || !chainId) {
        throw new Error(
            `getProxyAccountId error - one of these is undefined: delegatee ${delegateePubKey}, delegator ${delegatorPubKey}, type: ${type}, chainId:${chainId}`,
        );
    }

    return `${chainId}-${delegateePubKey.substring(20)}-${delegatorPubKey.substring(20)}-${type}-${delay}`;
};
