import { FixedSizeBinary, HexString } from 'polkadot-api';
import { IApiContext } from '../contexts/ApiContext';
import { ApiDescriptors, MultisigStorageInfo } from '../types';

interface Params {
    api: IApiContext<ApiDescriptors>['api'];
    threshold: number;
    otherSignatories: string[];
    when?: MultisigStorageInfo['when'];
    hash?: HexString;
}

export const getApproveAsMultiTx = ({ api, threshold, otherSignatories, hash, when }: Params) => {
    if (!hash || !api) return;

    return api.tx.Multisig.approve_as_multi({
        threshold,
        other_signatories: otherSignatories,
        maybe_timepoint: when,
        call_hash: FixedSizeBinary.fromHex(hash),
        max_weight: {
            ref_time: 0n,
            proof_size: 0n,
        },
    });
};
