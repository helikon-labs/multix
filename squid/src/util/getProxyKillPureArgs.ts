import { Call } from '@subsquid/substrate-processor';

export interface KillPureCallInfo {
    spawnerPubKey: string;
    extrinsicIndex: number;
    blockNumber: number;
}

export const getProxyKillPureArgs = (proxyKillArgs: Call['args']) => {
    return {
        extrinsicIndex: proxyKillArgs.extIndex,
        blockNumber: proxyKillArgs.height,
        spawnerPubKey:
            proxyKillArgs.spawner.value || proxyKillArgs.spawner.id || proxyKillArgs.spawner,
    } as KillPureCallInfo;
};
