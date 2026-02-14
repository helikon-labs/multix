import { Account, ProxyAccount, ProxyType } from '../model';
import { Ctx } from '../main';
import { getOrCreateAccounts } from '../util';
import { getProxyAccountId } from '../util/getProxyAccountId';
import { getAccountId } from '../util/getAccountId';

export interface NewPureProxy {
    id: string;
    who: string;
    pure: string;
    delay: number;
    type: ProxyType;
    createdAt: Date;
    creationBlockNumber?: number;
    extrinsicIndex?: number;
}

export const handleNewPureProxies = async (
    ctx: Ctx,
    newPureProxies: NewPureProxy[],
    chainId: string,
) => {
    const dedupPure = new Set<string>();
    const dedupWho = new Set<string>();

    newPureProxies.forEach(({ who, pure }) => {
        dedupPure.add(pure);
        dedupWho.add(who);
    });

    const pureProxiestoSave = Array.from(dedupPure.values()).map(
        (pure) =>
            new Account({
                id: getAccountId(pure, chainId),
                pubKey: pure,
                isMultisig: false,
                isPureProxy: true,
            }),
    );

    // save all new pure proxies
    await ctx.store.save(pureProxiestoSave);

    // get or create who accounts
    const whoAccounts = await getOrCreateAccounts(ctx, Array.from(dedupWho.values()), chainId);

    const proxyAccounts: ProxyAccount[] = [];

    for (const {
        who,
        pure,
        delay,
        createdAt,
        type,
        extrinsicIndex,
        creationBlockNumber,
    } of newPureProxies) {
        const id = getProxyAccountId(who, pure, ProxyType.Any, delay, chainId);

        proxyAccounts.push(
            new ProxyAccount({
                id,
                delegator: pureProxiestoSave.find(({ pubKey }) => pure === pubKey),
                delegatee: whoAccounts.find(({ pubKey }) => who === pubKey),
                type,
                delay,
                createdAt,
                extrinsicIndex,
                creationBlockNumber,
            }),
        );
    }
    // ctx.log.info(`new proxy account to save' ${JsonLog(proxyAccounts)}`)
    // ctx.log.info(`new proxy account to save' ${proxyAccounts.length}`)
    await ctx.store.save(proxyAccounts);
};
