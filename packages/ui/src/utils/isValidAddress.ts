import { decodeAddress, encodeAddress } from '@polkadot/keyring';
import { hexToU8a, isHex } from '@polkadot/util';

export const isValidAddress = (address: string | Uint8Array | null | undefined) => {
    try {
        encodeAddress(isHex(address) ? hexToU8a(address) : decodeAddress(address));

        return true;
    } catch {
        // if it's an ethereum address it can't be decoded but could still be valid
        if (typeof address === 'string' && address.startsWith('0x') && address.length === 42) {
            return true;
        }
        return false;
    }
};
