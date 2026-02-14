import { In } from 'typeorm';
import { Account, MultisigCall } from '../model';
import { Ctx } from '../main';
import { getAccountId } from '../util/getAccountId';

export interface MultisigCallInfo extends Omit<MultisigCall, 'multisig'> {
    multisigPubKey: string;
}

export const handleNewMultisigCalls = async (
    ctx: Ctx,
    newMultisigCalls: MultisigCallInfo[],
    chainId: string,
) => {
    const multisigIds = newMultisigCalls.map((multi) =>
        getAccountId(multi.multisigPubKey, chainId),
    );
    const multisigCalls: MultisigCall[] = [];

    const multisigAccountsMap = await ctx.store
        .findBy(Account, { id: In([...multisigIds]) })
        .then((q) => new Map(q.map((i) => [i.pubKey, i])));

    for (const { blockHash, id, callIndex, multisigPubKey, timestamp } of newMultisigCalls) {
        multisigCalls.push(
            new MultisigCall({
                id,
                blockHash,
                callIndex,
                multisig: multisigAccountsMap.get(multisigPubKey),
                timestamp,
            }),
        );
    }

    await ctx.store.save(multisigCalls);
};
