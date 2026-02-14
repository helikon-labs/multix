import { InjectedAccountWitMnemonic } from '../fixtures/testAccounts';
import { PendingTx } from '../../src/contexts/PendingTxContext';
import { paseo } from '@polkadot-api/descriptors';
import {
    Binary,
    createClient,
    FixedSizeBinary,
    SS58String,
    Transaction,
    TxEvent,
    TypedApi,
} from 'polkadot-api';
import { getWsProvider } from 'polkadot-api/ws-provider/web';
import { sr25519CreateDerive } from '@polkadot-labs/hdkd';
import { entropyToMiniSecret, mnemonicToEntropy } from '@polkadot-labs/hdkd-helpers';
import { getPolkadotSigner } from 'polkadot-api/signer';

export interface MultisigInfo {
    address: string;
    otherSignatories: string[];
    threshold: number;
}
const callBack = (resolve: (thenableOrResult?: unknown) => void) => ({
    next: (event: TxEvent) => {
        console.log('Transaction status:', event.type);

        if (event.type === 'broadcasted') {
            console.log('Broadcasted', event.txHash);
        }

        if (event.type === 'txBestBlocksState') {
            console.log('In block');
            resolve();
        }

        if (event.type === 'finalized') {
            console.log('Finalized block hash', event.txHash);
        }
    },
    error: (error: Error) => {
        console.error(error.toString());
    },
});

interface MultisigQuery {
    keyArgs: [SS58String, FixedSizeBinary<32>];
    value: {
        when: { height: number; index: number };
        deposit: bigint;
        depositor: SS58String;
        approvals: SS58String[];
    };
}

const getPendingMultisixTx = (multisigTxs: MultisigQuery[], multisigInfo: MultisigInfo) => {
    const curratedMultisigTxs: PendingTx[] = [];

    multisigTxs.forEach(({ keyArgs, value }) => {
        const [multisigAddress, txHash] = keyArgs;
        // this is supposed to be the multisig address that we asked the storage for
        const info = value;

        // Fix for ghost proposals for https://github.com/polkadot-js/apps/issues/9103
        // These 2 should be the same
        if (multisigAddress.toLowerCase() !== multisigInfo.address.toLowerCase()) {
            console.error(
                'The onchain call and the one found in the block donot correspond',
                multisigAddress,
                multisigInfo.address,
            );
            return;
        }

        curratedMultisigTxs.push({
            hash: txHash.asHex(),
            info,
            from: multisigInfo.address,
        });
    });

    return curratedMultisigTxs;
};

const getRejectionsTxs = (
    pendingMultisigTxs: PendingTx[],
    account: InjectedAccountWitMnemonic,
    multisigInfo: MultisigInfo,
    api: TypedApi<typeof paseo>,
) => {
    const allTxs: Transaction<any, any, any, any>[] = [];
    pendingMultisigTxs.forEach((pendingMultisigTx) => {
        const depositor = pendingMultisigTx.info.depositor;
        if (depositor !== account.address) {
            console.log('multisig tx not proposed by the same account', depositor, account.address);
            return;
        }

        const rejectCurrent = api.tx.Multisig.cancel_as_multi({
            threshold: multisigInfo.threshold,
            other_signatories: multisigInfo.otherSignatories,
            timepoint: pendingMultisigTx.info.when,
            call_hash: Binary.fromHex(pendingMultisigTx.hash),
        });

        allTxs.push(rejectCurrent);
    });

    return allTxs;
};

export const rejectCurrentMultisigTxs = ({
    account,
    multisigInfo,
    WSendpoint: wSendpoint,
}: {
    account: InjectedAccountWitMnemonic;
    multisigInfo: MultisigInfo;
    WSendpoint: string;
}) => {
    // this function takes some time waiting for a finalized block
    // with the removal of all pending tx. We set a max timout of 30s
    return cy.then(
        { timeout: 30000 },
        () =>
            new Cypress.Promise(async (resolve) => {
                // ALICE ACCOUNT
                const derive = sr25519CreateDerive(
                    entropyToMiniSecret(mnemonicToEntropy(account.mnemonic)),
                );
                const aliceKeyPair = derive('');
                const aliceSigner = getPolkadotSigner(
                    aliceKeyPair.publicKey,
                    'Sr25519',
                    aliceKeyPair.sign,
                );

                // CLIENT AND API
                const client = createClient(getWsProvider(wSendpoint));
                const api = client.getTypedApi(paseo);

                const multisigTxs = await api.query.Multisig.Multisigs.getEntries(
                    multisigInfo.address,
                    {
                        at: 'best',
                    },
                );
                console.log('multisigTxs', multisigTxs);
                const pendingMultisigTxs = getPendingMultisixTx(multisigTxs, multisigInfo);

                if (!pendingMultisigTxs.length) {
                    console.log('no pending multisig tx for', multisigInfo.address);
                    resolve();
                    return;
                }

                console.log('pendingMultisigTxs', pendingMultisigTxs);

                const allTxs = getRejectionsTxs(pendingMultisigTxs, account, multisigInfo, api).map(
                    (tx) => tx.decodedCall,
                );

                console.log(`The multisig has ${allTxs.length} pending txs. Rejecting them now`);

                api.tx.Utility.batch_all({ calls: allTxs })
                    .signSubmitAndWatch(aliceSigner, { at: 'best' })
                    .subscribe(callBack(resolve));
            }),
    );
};
