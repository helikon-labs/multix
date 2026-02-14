import { createKeyMulti } from '@polkadot/util-crypto';
import { u8aToHex } from '@polkadot/util';

export const getMultisigPubKey = (signatories: (string | Uint8Array)[], threshold: number) => {
    const key = createKeyMulti(signatories, threshold);

    return u8aToHex(key);
};
