export const getMultisigCallId = (
    pubKey: string,
    blockNumber: number,
    extrinsicIndex: number,
    callId: string,
    chainId: string,
) => {
    return `${chainId}-${pubKey}-${blockNumber}-${extrinsicIndex}-${callId}`;
};
