import { AccountNames } from '../contexts/AccountNamesContext';
import { getPubKeyFromAddress } from './getPubKeyFromAddress';
import { encodesubstrateAddress } from './encodeSubstrateAddress';

export const encodeNames = (accounts: AccountNames, ss58Format: number) => {
    const res = {} as AccountNames;

    Object.entries(accounts).forEach(([pubkey, name]) => {
        const address = encodesubstrateAddress(pubkey, ss58Format);

        if (address) {
            res[address] = name;
        }
    });
    return res;
};

export const decodeNames = (accounts: AccountNames) => {
    const res = {} as AccountNames;

    Object.entries(accounts).forEach(([address, name]) => {
        const pubkey = getPubKeyFromAddress(address);
        if (pubkey) {
            res[pubkey] = name;
        }
    });
    return res;
};
