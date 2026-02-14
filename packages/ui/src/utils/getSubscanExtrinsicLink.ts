export const getSubscanExtrinsicLink = (network: string | undefined, txHash: string) => {
    if (!network || !txHash) return;

    return `https://${network}.subscan.io/extrinsic/${txHash}`;
};
