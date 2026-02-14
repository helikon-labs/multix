import { In } from 'typeorm';
import { ProxyAccount } from '../model';
import { Ctx } from '../main';

export const handleProxyRemovals = async (ctx: Ctx, proxyRemovals: string[]) => {
    const toRemove = await ctx.store.findBy(ProxyAccount, {
        id: In(proxyRemovals),
    });

    // ctx.log.info(`--> Remove ${toRemove.map((proxyAccount) => JSON.stringify(proxyAccount))}`)

    await ctx.store.remove(toRemove);
};
