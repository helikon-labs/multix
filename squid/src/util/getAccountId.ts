export const getAccountId = (pubKey: string, chainId: string) => {
    return `${chainId}-${pubKey}`;
};
