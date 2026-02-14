import { multisigPage } from '../support/page-objects/multisigPage';
import { sendTxModal } from '../support/page-objects/sendTxModal';
import { waitForTxRequest } from '../utils/waitForTxRequests';
import { polkadotAHMemberAccount } from '../fixtures/polkadotAssetHub';
import { landingPageNetwork } from '../fixtures/landingData';
import { SignerPayloadJSON } from '@polkadot-api/tx-utils';

const testAccount1Address = polkadotAHMemberAccount.Nikos.address;
const randomAccount = {
    address: '1uXsk6gr4CJjQ83K1v2Lk9GFunwmjo49tjKRUY1rhZhTY1u',
    pubKey: '0x2810b1f4a7ff1cc7bc6c615eae881f971a88c8e7048d6bad52fcbab751966e2d',
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
            injectExtensionWithAccounts: [polkadotAHMemberAccount.Nikos],
            accountNames: { [randomAccount.pubKey]: 'Random' },
        });
    });

    it('Makes a balances.transferKeepAlive for native assets', () => {
        multisigPage.accountHeader(6000).should('be.visible');
        multisigPage.newTransactionButton().click();
        sendTxModal.sendTxTitle().should('be.visible');
        fillAndSubmitTransactionForm('', testAccount1Address);
        waitForTxRequest();
        cy.getTxRequests().then((req) => {
            const txRequests = Object.values(req);
            cy.wrap(txRequests.length).should('eq', 1);
            cy.wrap(txRequests[0].payload.address).should('eq', testAccount1Address);
            console.log('txRequests', txRequests);
            // this is a balances.transferKeepAlive
            cy.wrap((txRequests[0].payload as SignerPayloadJSON).method).should(
                'eq',
                '0x2901020004145d6c503d0cf97f4c7725ca773741bd02e1760bfb52e021af5a9f2de283012c000a0300ba3ecfd7483cdcdad1132af7d1e8067816009cbd77fc0bc30eafe8d2218a197107001a7118020000',
            );
        });
    });

    it('Makes an assets.transferKeepAlive for non native assets', () => {
        multisigPage.accountHeader(6000).should('be.visible');
        multisigPage.newTransactionButton().click();
        sendTxModal.sendTxTitle().should('be.visible');
        fillAndSubmitTransactionForm('usdc', randomAccount.address);
        waitForTxRequest();
        cy.getTxRequests().then((req) => {
            const txRequests = Object.values(req);
            cy.wrap(txRequests.length).should('eq', 1);
            cy.wrap(txRequests[0].payload.address).should('eq', testAccount1Address);
            // console.log('txRequests', txRequests)
            // this is a assets.transferKeepAlive
            cy.wrap((txRequests[0].payload as SignerPayloadJSON).method).should(
                'eq',
                '0x2901020004145d6c503d0cf97f4c7725ca773741bd02e1760bfb52e021af5a9f2de283012c003209e514002810b1f4a7ff1cc7bc6c615eae881f971a88c8e7048d6bad52fcbab751966e2d82ee36000000',
            );
        });
    });

    it('Makes a correct batch when using multiple assets and deleting them', () => {
        multisigPage.accountHeader(6000).should('be.visible');
        multisigPage.newTransactionButton().click();
        sendTxModal.sendTxTitle().should('be.visible');
        sendTxModal.wrapperAssetTransfer(0).should('be.visible');

        // start wth 0.1 DOT and change the field to USDC
        sendTxModal.wrapperAssetTransfer(0).within(() => {
            sendTxModal
                .sendTokensFieldTo()
                .click()
                .type(`${testAccount1Address.slice(0, 4)}{downArrow}{enter}`);
            sendTxModal.sendTokensFieldAssetSelection().should('exist');
            sendTxModal.inputSendtokenAmount().click().type('0.1');
        });
        sendTxModal.sendTokensFieldAssetSelection().contains('DOT').click();
        sendTxModal.selectAsset('usdc').click();

        // add a new field with 0.001 USDC
        sendTxModal.buttonAddRecipient().click();
        sendTxModal.wrapperAssetTransfer(1).should('be.visible');
        sendTxModal.wrapperAssetTransfer(1).within(() => {
            sendTxModal.sendTokensFieldAssetSelection().should('exist');
            sendTxModal.inputSendtokenAmount().click().type('0.001');
            sendTxModal
                .sendTokensFieldTo()
                .click()
                .type(`${randomAccount.address.slice(0, 4)}{downArrow}{enter}`);
            sendTxModal.sendTokensFieldAssetSelection().should('contain', 'USDC');
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
        cy.getTxRequests().then((req) => {
            const txRequests = Object.values(req);
            cy.wrap(txRequests.length).should('eq', 1);
            cy.wrap(txRequests[0].payload.address).should('eq', testAccount1Address);
            cy.wrap((txRequests[0].payload as SignerPayloadJSON).method).should(
                'eq',
                '0x2901020004145d6c503d0cf97f4c7725ca773741bd02e1760bfb52e021af5a9f2de283012c002802083209e51400ba3ecfd7483cdcdad1132af7d1e8067816009cbd77fc0bc30eafe8d2218a1971821a06003209e514002810b1f4a7ff1cc7bc6c615eae881f971a88c8e7048d6bad52fcbab751966e2da10f0000',
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
            sendTxModal.inputSendtokenAmount().click().type('0.1');
            sendTxModal
                .sendTokensFieldTo()
                .click()
                .type(`${testAccount1Address.slice(0, 4)}{downArrow}{enter}`);
        });
        // this is outside of the within block to prevent the test from failing
        // because the component is re-rendering
        sendTxModal.sendTokensFieldAssetSelection().eq(1).contains('USDC').click();

        sendTxModal.selectAsset('dot').click();
        // there's a 300ms debounce for the extrinsic to be set
        cy.wait(1000);

        // we should now see a batch transaction with 2 extrinsics
        // one for USDC and one for DOT to 2 different accounts
        sendTxModal.buttonSend().should('be.enabled').click();
        waitForTxRequest();
        cy.getTxRequests().then((req) => {
            const txRequests = Object.values(req);
            cy.wrap(txRequests.length).should('eq', 2);
            cy.wrap(txRequests[1].payload.address).should('eq', testAccount1Address);
            cy.wrap((txRequests[1].payload as SignerPayloadJSON).method).should(
                'eq',
                '0x2901020004145d6c503d0cf97f4c7725ca773741bd02e1760bfb52e021af5a9f2de283012c002802083209e514002810b1f4a7ff1cc7bc6c615eae881f971a88c8e7048d6bad52fcbab751966e2da10f0a0300ba3ecfd7483cdcdad1132af7d1e8067816009cbd77fc0bc30eafe8d2218a197102286bee0000',
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
            .type(`${testAccount1Address.slice(0, 4)}{downArrow}{enter}`);
        sendTxModal.sendTokensFieldAssetSelection().should('exist');
        sendTxModal.inputSendtokenAmount().click().type('10');
        sendTxModal.sendTxError().should('be.visible');
        sendTxModal.sendTxError().should('contain', 'the required 10 DOT');
        sendTxModal.buttonSend().should('be.disabled');
        sendTxModal.sendTokensFieldAssetSelection().contains('DOT').click();
        sendTxModal.selectAsset('usdt').click();
        sendTxModal.sendTxError().should('be.visible');
        sendTxModal.sendTxError().should('contain', 'the required 10 USDT');
        sendTxModal.buttonSend().should('be.disabled');
        sendTxModal.inputSendtokenAmount().click().type('{selectall}{del}0.01');
        sendTxModal.sendTokensFieldAssetSelection().click();
        sendTxModal.selectAsset('usdc').click();
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
            .type(`${testAccount1Address.slice(0, 4)}{downArrow}{enter}`);
        sendTxModal.sendTokensFieldAssetSelection().should('exist');
        sendTxModal.inputSendtokenAmount().click().type('0.3');
        sendTxModal.sendTxError().should('not.exist');
        sendTxModal.buttonSend().should('be.enabled');

        // second DOT field
        sendTxModal.buttonAddRecipient().click();
        sendTxModal.wrapperAssetTransfer(1).should('be.visible');
        sendTxModal.wrapperAssetTransfer(1).within(() => {
            sendTxModal
                .sendTokensFieldTo()
                .click()
                .type(`${testAccount1Address.slice(0, 4)}{downArrow}{enter}`);
            sendTxModal.inputSendtokenAmount().click().type('0.9');
        });
        sendTxModal.sendTxError().should('be.visible');
        sendTxModal.sendTxError().should('contain', 'the required 1.2 DOT');
        sendTxModal.buttonSend().should('be.disabled');

        // change the last field to USDC
        sendTxModal.wrapperAssetTransfer(1).within(() => {
            sendTxModal.sendTokensFieldAssetSelection().contains('DOT').click();
        });
        sendTxModal.selectAsset('usdc').click();
        sendTxModal.sendTxError().should('not.exist');
        sendTxModal.buttonSend().should('be.enabled');

        //second USDC field
        sendTxModal.buttonAddRecipient().click();
        sendTxModal.wrapperAssetTransfer(2).should('be.visible');
        sendTxModal.wrapperAssetTransfer(2).within(() => {
            sendTxModal
                .sendTokensFieldTo()
                .click()
                .type(`${testAccount1Address.slice(0, 4)}{downArrow}{enter}`);
            sendTxModal.inputSendtokenAmount().click().type('0.5');
        });
        sendTxModal.sendTxError().should('be.visible');
        sendTxModal.sendTxError().should('contain', 'the required 1.4 USDC');
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
    const receiverAddress = polkadotAHMemberAccount.Nikos.address;
    it('Shows an error for 1 transfer of tokens', () => {
        cy.setupAndVisit({
            url: landingPageNetwork('polkadot'),
            extensionConnectionAllowed: true,
            injectExtensionWithAccounts: [polkadotAHMemberAccount.Nikos],
            accountNames: { [randomAccount.pubKey]: 'Random' },
        });

        multisigPage.accountHeader(6000).should('be.visible');
        multisigPage.newTransactionButton().click();
        sendTxModal.sendTxTitle().should('be.visible');
        sendTxModal
            .sendTokensFieldTo()
            .click()
            .type(`${receiverAddress.slice(0, 4)}{downArrow}{enter}`);
        sendTxModal.sendTokensFieldAssetSelection().should('not.exist');
        sendTxModal.inputSendtokenAmount().click().type('10');
        sendTxModal.sendTxError().should('be.visible');
        sendTxModal.sendTxError().should('contain', '"From" address');
        sendTxModal.sendTxError().should('contain', 'the required 10 DOT');
        sendTxModal.buttonSend().should('be.disabled');

        sendTxModal.inputSendtokenAmount().click().type('{selectall}{del}0.0001');

        // sendTxModal.sendTxError().should('be.visible')

        // sendTxModal
        //   .sendTxError()
        //   .should('contain', `The "Signing with" account doesn't have the required`)
        // sendTxModal.buttonSend().should('be.disabled')

        sendTxModal.sendTxError().should('not.exist');

        sendTxModal.buttonSend().should('be.enabled');
    });

    it('Shows an error for a batch of tokens', () => {
        cy.setupAndVisit({
            url: landingPageNetwork('polkadot'),
            extensionConnectionAllowed: true,
            injectExtensionWithAccounts: [polkadotAHMemberAccount.Nikos],
            accountNames: { [randomAccount.pubKey]: 'Random' },
        });

        multisigPage.accountHeader(6000).should('be.visible');
        multisigPage.newTransactionButton().click();
        sendTxModal.sendTxTitle().should('be.visible');
        sendTxModal
            .sendTokensFieldTo()
            .click()
            .type(`${receiverAddress.slice(0, 4)}{downArrow}{enter}`);
        sendTxModal.sendTokensFieldAssetSelection().should('not.exist');
        sendTxModal.inputSendtokenAmount().click().type('0.0001');

        sendTxModal.sendTxError().should('not.exist');

        // sendTxModal.sendTxError().should('be.visible')
        // sendTxModal
        //   .sendTxError()
        //   .should('contain', `The "Signing with" account doesn't have the required`)
        // sendTxModal.buttonSend().should('be.disabled')

        // second DOT field
        sendTxModal.buttonAddRecipient().click();
        sendTxModal.wrapperAssetTransfer(1).should('be.visible');
        sendTxModal.wrapperAssetTransfer(1).within(() => {
            sendTxModal
                .sendTokensFieldTo()
                .click()
                .type(`${receiverAddress.slice(0, 4)}{downArrow}{enter}`);
            sendTxModal.inputSendtokenAmount().click().type('0.9');
        });
        sendTxModal.sendTxError().should('be.visible');
        sendTxModal.sendTxError().should('contain', 'the required 0.9001 DOT');
        sendTxModal.buttonSend().should('be.disabled');
    });
});
