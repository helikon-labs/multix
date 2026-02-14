import { Account, ProxyAccount, ProxyType } from '../model';
import { Ctx } from '../main';
import { getOrCreateAccounts } from '../util';
import { getAccountId } from '../util/getAccountId';

export interface NewProxy {
    id: string;
    delegator: string;
    delegatee: string;
    type: ProxyType;
    delay: number;
    createdAt: Date;
}

export const handleNewProxies = async (ctx: Ctx, newProxies: NewProxy[], chainId: string) => {
    // Aggregate all accounts we deal with using a set to make sure we don't have dublicates
    const allAccountsStringSet = new Set<string>();

    newProxies.forEach(({ delegatee, delegator }) => {
        allAccountsStringSet.add(delegatee);
        allAccountsStringSet.add(delegator);
    });

    const accountsToUpdate = await getOrCreateAccounts(
        ctx,
        Array.from(allAccountsStringSet.values()),
        chainId,
    );

    const accountMap = new Map<string, Account>();
    accountsToUpdate.forEach((account) => accountMap.set(account.id, account));
    const proxyAccounts: ProxyAccount[] = [];

    for (const { id, delegatee, delegator, delay, type, createdAt } of newProxies) {
        // ctx.log.info(`---> type ${type}`)
        const delegatorAccount = accountMap.get(getAccountId(delegator, chainId));
        const delegateeAccount = accountMap.get(getAccountId(delegatee, chainId));

        proxyAccounts.push(
            new ProxyAccount({
                id,
                delegator: delegatorAccount,
                delegatee: delegateeAccount,
                type,
                delay,
                createdAt,
                creationBlockNumber: null,
                extrinsicIndex: null,
            }),
        );
    }

    // ctx.log.info(`new proxy account to save ${Array.from(proxyAccounts.values())}`)
    await ctx.store.save(proxyAccounts);
};
