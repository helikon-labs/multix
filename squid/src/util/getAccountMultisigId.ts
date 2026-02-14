export const getAccountMultisigId = (multiSigId: string, accountId: string, chainId: string) => {
    return `${chainId}-${multiSigId.substring(20)}-${accountId.substring(20)}`;
};
