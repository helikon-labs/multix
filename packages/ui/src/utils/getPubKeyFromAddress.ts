import { u8aToHex } from '@polkadot/util';
import { decodeAddress } from '@polkadot/util-crypto';
import { HexString } from 'polkadot-api';

const decode = (address: string) => {
    // if it's an ethereum address pass just return it
    if (address.startsWith('0x') && address.length === 42) {
        return address.toLowerCase();
    }

    try {
        return u8aToHex(decodeAddress(address));
    } catch (e) {
        console.error(`Error decoding the address ${address}, skipping`, e);
        return null;
    }
};

export function getPubKeyFromAddress(address: string[]): HexString[];
export function getPubKeyFromAddress(address: string): HexString | null;
export function getPubKeyFromAddress(address: string | string[]) {
    if (Array.isArray(address)) {
        return address.map(decode).filter(Boolean) as HexString[];
    }

    return decode(address);
}
