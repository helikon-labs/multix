export const getShortAddress = (address: string) => `${address.slice(0, 6)}..${address.slice(-6)}`;
