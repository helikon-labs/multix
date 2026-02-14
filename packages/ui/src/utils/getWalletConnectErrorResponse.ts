export const getWalletConnectErrorResponse = (requestId: number, message: string) => {
    return {
        id: requestId,
        jsonrpc: '2.0',
        error: {
            code: 5000,
            message,
        },
    };
};
