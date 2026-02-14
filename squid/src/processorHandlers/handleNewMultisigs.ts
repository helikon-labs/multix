import { Account, AccountMultisig } from '../model';
import { Ctx } from '../main';
import { getOrCreateAccounts, getAccountMultisigId } from '../util';
import { shouldReplicateOn } from '../util/shouldReplicate';
import { getAccountId } from '../util/getAccountId';

export interface NewMultisigsInfo extends Omit<Account, 'id'> {
    newSignatories: string[];
}

export const handleNewMultisigs = async (
    ctx: Ctx,
    multisigs: NewMultisigsInfo[],
    chainId: string,
) => {
    const newMultisigs: Map<string, Account> = new Map();
    const newAccountMultisigs: Map<string, AccountMultisig> = new Map();

    const replicatedNetworks = shouldReplicateOn(chainId) || [chainId];

    for (const { pubKey, newSignatories, threshold, isMultisig, isPureProxy } of multisigs) {
        for (const network of replicatedNetworks) {
            const signatoriesAccounts = await getOrCreateAccounts(ctx, newSignatories, network);

            const multisigId = getAccountId(pubKey, network);
            const newMultisig = new Account({
                id: multisigId,
                pubKey,
                threshold,
                isMultisig,
                isPureProxy,
            });

            newMultisigs.set(multisigId, newMultisig);

            signatoriesAccounts.forEach((account) => {
                const newAccountMultisigId = getAccountMultisigId(
                    newMultisig.id,
                    account.id,
                    network,
                );

                const newAccountMultisig = new AccountMultisig({
                    id: newAccountMultisigId,
                    multisig: newMultisig,
                    signatory: account,
                });
                newAccountMultisigs.set(newAccountMultisigId, newAccountMultisig);
            });
        }

        // ctx.log.info(`--> New multisig ${newMultisigs.size}`)
        // ctx.log.info(JsonLog(Array.from(newMultisigs.keys())))
        // ctx.log.info(`--> New accountMultisigs ${newAccountMultisigs.size}`)
        // ctx.log.info(JsonLog(Array.from(newAccountMultisigs.values())))

        await ctx.store.save(Array.from(newMultisigs.values()));
        await ctx.store.save(Array.from(newAccountMultisigs.values()));
    }
};
