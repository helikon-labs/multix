import { multisigPage } from '../support/page-objects/multisigPage';
import { sendTxModal } from '../support/page-objects/sendTxModal';
import { waitForTxRequest } from '../utils/waitForTxRequests';
import { polkadotAHMemberAccounts } from '../fixtures/polkadotAssetHub';
import { landingPageNetwork } from '../fixtures/landingData';
import { SignerPayloadJSON } from '@polkadot-api/tx-utils';

const testAccount1 = polkadotAHMemberAccounts.MS_TEST_01;
const testAccount2 = polkadotAHMemberAccounts.MS_TEST_02;
const randomAccount = {
    address: '1uXsk6gr4CJjQ83K1v2Lk9GFunwmjo49tjKRUY1rhZhTY1u',
    publicKey: '0x2810b1f4a7ff1cc7bc6c615eae881f971a88c8e7048d6bad52fcbab751966e2d',
};

const fillAndSubmitTransactionForm = (assetSymbol = '', address: string) => {
    sendTxModal
        .sendTokensFieldTo()
        .click()
        .type(`${address.slice(0, 5)}{downArrow}{enter}`);
    sendTxModal.sendTokensFieldAssetSelection().should('exist');
    if (assetSymbol) {
        sendTxModal.sendTokensFieldAssetSelection().click();
        sendTxModal.selectAsset(assetSymbol).click();
    }
    sendTxModal.inputSendtokenAmount().click().type('0.9');
    // there's a 300ms debounce for the extrinsic to be set
    cy.wait(300);
    sendTxModal.buttonSend().should('be.enabled').click();
};

describe('Crafts the correct extrinsics for asset hub foreign and native assets', () => {
    beforeEach(() => {
        cy.setupAndVisit({
            url: landingPageNetwork('asset-hub-polkadot'),
            extensionConnectionAllowed: true,
            injectExtensionWithAccounts: [testAccount1],
            accountNames: {
                [randomAccount.publicKey]: 'RANDOM',
                [testAccount1.publicKey!]: 'MS-TEST-01',
                [testAccount2.publicKey!]: 'MS-TEST-02',
            },
        });
    });

    it('Makes a balances.transferKeepAlive for native assets', () => {
        multisigPage.accountHeader(6000).should('be.visible');
        multisigPage.newTransactionButton().click();
        sendTxModal.sendTxTitle().should('be.visible');
        fillAndSubmitTransactionForm('', testAccount1.address);
        waitForTxRequest();
        cy.wait(1000);
        cy.getTxRequests().then((req) => {
            const txRequests = Object.values(req);
            cy.wrap(txRequests.length).should('eq', 1);
            cy.wrap(txRequests[0].payload.address).should('eq', testAccount1.address);
            // this is a balances.transferKeepAlive
            cy.wrap((txRequests[0].payload as SignerPayloadJSON).method).should(
                'eq',
                '0x2901020004f61f0be20cc565ca6d02e114dbd0e058187a402ae0a86a80e76f8d06e061fe58000a030098e54b21348363b5df2236554dc18c165d35ee02328c6be8ff5ba6c74134af0807001a7118020000',
            );
        });
    });

    it('Makes an assets.transferKeepAlive for non native assets', () => {
        multisigPage.accountHeader(6000).should('be.visible');
        multisigPage.newTransactionButton().click();
        sendTxModal.sendTxTitle().should('be.visible');
        fillAndSubmitTransactionForm('usdt', randomAccount.address);
        waitForTxRequest();
        cy.wait(1000);
        cy.getTxRequests().then((req) => {
            const txRequests = Object.values(req);
            cy.wrap(txRequests.length).should('eq', 1);
            cy.wrap(txRequests[0].payload.address).should('eq', testAccount1.address);
            // this is a assets.transferKeepAlive
            cy.wrap((txRequests[0].payload as SignerPayloadJSON).method).should(
                'eq',
                '0x2901020004f61f0be20cc565ca6d02e114dbd0e058187a402ae0a86a80e76f8d06e061fe58003209011f002810b1f4a7ff1cc7bc6c615eae881f971a88c8e7048d6bad52fcbab751966e2d82ee36000000',
            );
        });
    });

    it('Makes a correct batch when using multiple assets and deleting them', () => {
        multisigPage.accountHeader(6000).should('be.visible');
        multisigPage.newTransactionButton().click();
        sendTxModal.sendTxTitle().should('be.visible');
        sendTxModal.wrapperAssetTransfer(0).should('be.visible');

        // start wth 0.1 DOT and change the field to USDT
        sendTxModal.wrapperAssetTransfer(0).within(() => {
            sendTxModal
                .sendTokensFieldTo()
                .click()
                .type(`${testAccount1.address.slice(0, 4)}{downArrow}{enter}`);
            sendTxModal.sendTokensFieldAssetSelection().should('exist');
            sendTxModal.inputSendtokenAmount().click().type('0.1');
        });
        sendTxModal.sendTokensFieldAssetSelection().contains('DOT').click();
        sendTxModal.selectAsset('usdt').click();

        // add a new field with 0.001 USDT
        sendTxModal.buttonAddRecipient().click();
        sendTxModal.wrapperAssetTransfer(1).should('be.visible');
        sendTxModal.wrapperAssetTransfer(1).within(() => {
            sendTxModal.sendTokensFieldAssetSelection().should('exist');
            sendTxModal.inputSendtokenAmount().click().type('0.001');
            sendTxModal
                .sendTokensFieldTo()
                .click()
                .type(`${randomAccount.address.slice(0, 4)}{downArrow}{enter}`);
            sendTxModal.sendTokensFieldAssetSelection().should('contain', 'USDT');
            // there's a 300ms debounce for the extrinsic to be set
        });

        // this means there will be 1 empty field
        sendTxModal.buttonAddRecipient().click();
        // wait for debounce
        cy.wait(1000);

        // by clicking now, we should see a batch transaction
        // with 2 extrinsics with asset transfer of USDC to 2 different accounts
        sendTxModal.wrapperAssetTransfer(2).should('be.visible');
        sendTxModal.buttonSend().should('be.enabled').click();
        waitForTxRequest();
        cy.wait(1000);
        cy.getTxRequests().then((req) => {
            const txRequests = Object.values(req);
            cy.wrap(txRequests.length).should('eq', 1);
            cy.wrap(txRequests[0].payload.address).should('eq', testAccount1.address);
            cy.wrap((txRequests[0].payload as SignerPayloadJSON).method).should(
                'eq',
                '0x2901020004f61f0be20cc565ca6d02e114dbd0e058187a402ae0a86a80e76f8d06e061fe58002802083209011f0098e54b21348363b5df2236554dc18c165d35ee02328c6be8ff5ba6c74134af08821a06003209011f002810b1f4a7ff1cc7bc6c615eae881f971a88c8e7048d6bad52fcbab751966e2da10f0000',
            );
            txRequests[0].reject('not yet');
        });

        // we delete the first field
        sendTxModal.wrapperAssetTransfer(0).within(() => {
            sendTxModal.deleteFieldButton().click();
        });

        // change the last row to now send DOT
        sendTxModal.wrapperAssetTransfer(2).within(() => {
            sendTxModal.sendTokensFieldAssetSelection().should('exist');
            sendTxModal.inputSendtokenAmount().click().type('0.01');
            sendTxModal
                .sendTokensFieldTo()
                .click()
                .type(`${testAccount1.address.slice(0, 4)}{downArrow}{enter}`);
        });
        // this is outside of the within block to prevent the test from failing
        // because the component is re-rendering
        sendTxModal.sendTokensFieldAssetSelection().eq(1).contains('USDT').click();
        sendTxModal.selectAsset('dot').click();
        // debounce for the extrinsic to be set
        cy.wait(3000);
        sendTxModal.buttonSend().should('be.enabled').click();
        // we should now see a batch transaction with 2 extrinsics
        // one for USDC and one for DOT to 2 different accounts
        waitForTxRequest();
        cy.wait(1000);
        cy.getTxRequests().then((req) => {
            const txRequests = Object.values(req);
            cy.wrap(txRequests.length).should('eq', 2);
            console.log(txRequests);
            cy.wrap(txRequests[1].payload.address).should('eq', testAccount1.address);
            cy.wrap((txRequests[1].payload as SignerPayloadJSON).method).should(
                'eq',
                '0x2901020004f61f0be20cc565ca6d02e114dbd0e058187a402ae0a86a80e76f8d06e061fe58002802083209011f002810b1f4a7ff1cc7bc6c615eae881f971a88c8e7048d6bad52fcbab751966e2da10f0a030098e54b21348363b5df2236554dc18c165d35ee02328c6be8ff5ba6c74134af080284d7170000',
            );
        });
    });

    it('Shows an error for 1 transfer of native or other assets', () => {
        multisigPage.accountHeader(6000).should('be.visible');
        multisigPage.newTransactionButton().click();
        sendTxModal.sendTxTitle().should('be.visible');
        sendTxModal
            .sendTokensFieldTo()
            .click()
            .type(`${testAccount1.address.slice(0, 4)}{downArrow}{enter}`);
        sendTxModal.sendTokensFieldAssetSelection().should('exist');
        sendTxModal.inputSendtokenAmount().click().type('100');
        sendTxModal.sendTxError().should('be.visible');
        sendTxModal.sendTxError().should('contain', 'the required 100 DOT');
        sendTxModal.buttonSend().should('be.disabled');
        sendTxModal.sendTokensFieldAssetSelection().contains('DOT').click();
        sendTxModal.selectAsset('usdc').click();
        sendTxModal.sendTxError().should('be.visible');
        sendTxModal.sendTxError().should('contain', 'the required 100 USDC');
        sendTxModal.buttonSend().should('be.disabled');
        sendTxModal.inputSendtokenAmount().click().type('{selectall}{del}0.01');
        sendTxModal.sendTokensFieldAssetSelection().click();
        sendTxModal.selectAsset('usdt').click();
        sendTxModal.sendTxError().should('not.exist');
        sendTxModal.buttonSend().should('be.enabled');
    });

    it('Shows an error for batch transfer of native or other assets', () => {
        multisigPage.accountHeader(6000).should('be.visible');
        multisigPage.newTransactionButton().click();
        sendTxModal.sendTxTitle().should('be.visible');
        sendTxModal
            .sendTokensFieldTo()
            .click()
            .type(`${testAccount1.address.slice(0, 4)}{downArrow}{enter}`);
        sendTxModal.sendTokensFieldAssetSelection().should('exist');
        sendTxModal.inputSendtokenAmount().click().type('0.8');
        sendTxModal.sendTxError().should('not.exist');
        sendTxModal.buttonSend().should('be.enabled');

        // second DOT field
        sendTxModal.buttonAddRecipient().click();
        sendTxModal.wrapperAssetTransfer(1).should('be.visible');
        sendTxModal.wrapperAssetTransfer(1).within(() => {
            sendTxModal
                .sendTokensFieldTo()
                .click()
                .type(`${randomAccount.address.slice(0, 4)}{downArrow}{enter}`);
            sendTxModal.inputSendtokenAmount().click().type('0.5');
        });
        sendTxModal.sendTxError().should('be.visible');
        sendTxModal.sendTxError().should('contain', 'the required 1.3 DOT');
        sendTxModal.buttonSend().should('be.disabled');

        // change the last field to USDT
        sendTxModal.wrapperAssetTransfer(1).within(() => {
            sendTxModal.sendTokensFieldAssetSelection().contains('DOT').click();
        });
        sendTxModal.selectAsset('usdt').click();
        sendTxModal.sendTxError().should('not.exist');
        sendTxModal.buttonSend().should('be.enabled');

        // second USDT field
        sendTxModal.buttonAddRecipient().click();
        sendTxModal.wrapperAssetTransfer(2).should('be.visible');
        sendTxModal.wrapperAssetTransfer(2).within(() => {
            sendTxModal
                .sendTokensFieldTo()
                .click()
                .type(`${randomAccount.address.slice(0, 4)}{downArrow}{enter}`);
            sendTxModal.inputSendtokenAmount().click().type('0.7');
        });
        sendTxModal.sendTxError().should('be.visible');
        sendTxModal.sendTxError().should('contain', 'the required 1.2 USDT');
        sendTxModal.buttonSend().should('be.disabled');

        // we delete the last USDC field
        sendTxModal.wrapperAssetTransfer(2).within(() => {
            sendTxModal.deleteFieldButton().click();
        });
        sendTxModal.sendTxError().should('not.exist');
        sendTxModal.buttonSend().should('be.enabled');
    });
});

describe('Crafts the correct extrinsics for polkadot native asset', () => {
    it('Shows an error for 1 transfer of tokens', () => {
        cy.setupAndVisit({
            url: landingPageNetwork('polkadot'),
            extensionConnectionAllowed: true,
            injectExtensionWithAccounts: [testAccount1],
            accountNames: {
                [randomAccount.publicKey]: 'Random',
                [testAccount1.publicKey!]: 'MS-TEST-01',
            },
        });

        multisigPage.accountHeader(6000).should('be.visible');
        multisigPage.newTransactionButton().click();
        sendTxModal.sendTxTitle().should('be.visible');
        sendTxModal
            .sendTokensFieldTo()
            .click()
            .type(`${testAccount1.address.slice(0, 4)}{downArrow}{enter}`);
        sendTxModal.sendTokensFieldAssetSelection().should('not.exist');
        sendTxModal.inputSendtokenAmount().click().type('20');
        sendTxModal.sendTxError().should('be.visible');
        sendTxModal.sendTxError().should('contain', '"From" address');
        sendTxModal.sendTxError().should('contain', 'the required 20 DOT');
        sendTxModal.buttonSend().should('be.disabled');

        sendTxModal.inputSendtokenAmount().click().type('{selectall}{del}0.0001');
        sendTxModal.sendTxError().should('not.exist');
        sendTxModal.buttonSend().should('be.enabled');
    });

    it('Shows an error for a batch of tokens', () => {
        cy.setupAndVisit({
            url: landingPageNetwork('polkadot'),
            extensionConnectionAllowed: true,
            injectExtensionWithAccounts: [testAccount1],
            accountNames: {
                [randomAccount.publicKey]: 'Random',
                [testAccount1.publicKey!]: 'MS-TEST-01',
            },
        });

        multisigPage.accountHeader(6000).should('be.visible');
        multisigPage.newTransactionButton().click();
        sendTxModal.sendTxTitle().should('be.visible');
        sendTxModal
            .sendTokensFieldTo()
            .click()
            .type(`${randomAccount.address.slice(0, 4)}{downArrow}{enter}`);
        sendTxModal.sendTokensFieldAssetSelection().should('not.exist');
        sendTxModal.inputSendtokenAmount().click().type('0.0001');
        sendTxModal.sendTxError().should('not.exist');

        // second DOT field
        sendTxModal.buttonAddRecipient().click();
        sendTxModal.wrapperAssetTransfer(1).should('be.visible');
        sendTxModal.wrapperAssetTransfer(1).within(() => {
            sendTxModal
                .sendTokensFieldTo()
                .click()
                .type(`${testAccount1.address.slice(0, 4)}{downArrow}{enter}`);
            sendTxModal.inputSendtokenAmount().click().type('10.9');
        });
        sendTxModal.sendTxError().should('be.visible');
        sendTxModal.sendTxError().should('contain', 'the required 10.9001 DOT');
        sendTxModal.buttonSend().should('be.disabled');
    });
});
