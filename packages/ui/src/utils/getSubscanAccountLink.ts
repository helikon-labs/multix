export const getSubscanAccountLink = (
    network?: string,
    account?: string,
    multisigTab?: boolean,
) => {
    if (!network || !account) return;

    return `https://${network}.subscan.io/account/${account}${
        multisigTab ? '?tab=multisig_extrinsic' : ''
    }`;
};
