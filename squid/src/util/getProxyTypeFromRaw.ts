import { ProxyType } from '../model';

export const getProxyTypeFromRaw = (proxyType: string) => {
    if (Object.values(ProxyType).some((type: string) => type === proxyType))
        return <ProxyType>proxyType;
    else return ProxyType.Unknown;
};
