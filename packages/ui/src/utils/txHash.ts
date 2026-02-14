import { HexString } from 'polkadot-api';
import { Blake2256 } from '@polkadot-api/substrate-bindings';
import { fromHex, toHex } from '@polkadot-api/utils';

export const hashFromTx = (tx: HexString) => toHex(Blake2256(fromHex(tx))) as HexString;
