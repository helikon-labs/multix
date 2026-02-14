import type { config } from './walletConfigs';

declare module '@reactive-dot/core' {
    export interface Register {
        config: typeof config;
    }
}
