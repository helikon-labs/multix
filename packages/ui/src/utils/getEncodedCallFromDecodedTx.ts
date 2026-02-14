import { CompatibilityToken, Transaction } from 'polkadot-api';
import { IApiContext } from '../contexts/ApiContext';
import { ApiDescriptors } from '../types';

export const getEncodedCallFromDecodedTx = (
    api: IApiContext<ApiDescriptors>['api'],
    decodedTx: Transaction<any, any, any, any>['decodedCall'],
    compatibilityToken: CompatibilityToken,
) => {
    if (!api) return;

    const batch = api.tx.Utility.batch({
        calls: [decodedTx],
    }).getEncodedData(compatibilityToken);

    // we slice the 3 bytes from utility batch
    return batch.asHex().replace('0x', '').slice(6);
};
