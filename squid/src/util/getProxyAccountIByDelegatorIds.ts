import { ProxyAccount } from '../model';
import { Ctx } from '../main';

export const getProxyAccountIByDelegatorIds = async (ctx: Ctx, delegatorIds: string[]) => {
    const proxyAccountIds: Set<string> = new Set();

    for (const id of delegatorIds) {
        // Find all the ProxyAccounts that this account is a delegator for
        const proxyAccountToAdd = await ctx.store.findBy(ProxyAccount, { delegator: { id: id } });
        // ctx.log.info(`---> Found one: ${proxyAccounts.map(a => JsonLog(a))} `)
        proxyAccountToAdd.forEach((proxyAccount) => proxyAccountIds.add(proxyAccount.id));
    }

    return Array.from(proxyAccountIds);
};
