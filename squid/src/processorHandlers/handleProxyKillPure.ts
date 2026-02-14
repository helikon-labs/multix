/* eslint-disable @typescript-eslint/no-unused-expressions */
import { ProxyAccount } from '../model';
import { Ctx } from '../main';
import { KillPureCallInfo } from '../util/getProxyKillPureArgs';

export const handleProxyKillPure = async (ctx: Ctx, proxyKillPureArgs: KillPureCallInfo[]) => {
    const proxyAccountsToRemove: ProxyAccount[] = [];

    for (const { blockNumber, extrinsicIndex, spawnerPubKey } of proxyKillPureArgs) {
        const matchingProxyAcccount = await ctx.store.findOne(ProxyAccount, {
            where: {
                creationBlockNumber: blockNumber,
                extrinsicIndex: extrinsicIndex,
                delegatee: {
                    pubKey: spawnerPubKey,
                },
            },
        });

        matchingProxyAcccount && proxyAccountsToRemove.push(matchingProxyAcccount);
    }

    await ctx.store.remove(proxyAccountsToRemove);
};
