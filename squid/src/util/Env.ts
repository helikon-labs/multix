import 'dotenv/config';

interface EnvValues {
    blockstart: string;
    rpcWs: string;
    gatewayUrl: string;
    chainId: string;
    isEthereum?: boolean;
}

export class Env {
    env: EnvValues;

    constructor() {
        this.env = {
            blockstart: process.env.BLOCK_START || '',
            rpcWs: process.env.RPC_WS || '',
            gatewayUrl: process.env.GATEWAY_URL || '',
            chainId: process.env.CHAIN_ID || '',
            isEthereum: process.env.IS_ETHEREUM === 'true' || false,
        };

        this.checkForUndefined();
    }

    checkForUndefined = () => {
        Object.entries(this.env).forEach(([key, value]) => {
            // a prefix can be 0 and it is a valid value
            if (!value && value !== 0 && value !== false) {
                console.warn(`ℹ️ No env variable set for ${key} - (may be optional)`);
            }
        });
    };

    getEnv = () => {
        return this.env;
    };
}
