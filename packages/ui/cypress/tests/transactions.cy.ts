import { testAccounts } from '../fixtures/testAccounts';
import { knownMultisigs } from '../fixtures/knownMultisigs';
import { landingPageAddressUrl } from '../fixtures/landingData';
import { multisigPage } from '../support/page-objects/multisigPage';
import { notifications } from '../support/page-objects/notifications';
import { sendTxModal } from '../support/page-objects/sendTxModal';
import { waitForTxRequest } from '../utils/waitForTxRequests';
import { txSigningModal } from '../support/page-objects/modals/txSigningModal';
import { accountDisplay } from '../support/page-objects/components/accountDisplay';
import { landingPage } from '../support/page-objects/landingPage';

const testAccount1Address = testAccounts['Multisig Member Account 1'].address;
const testAccount2Address = testAccounts['Multisig Member Account 2'].address;

const fillAndSubmitTransactionForm = () => {
    sendTxModal.sendTokensFieldTo().click().type(`${testAccount1Address}{enter}`);
    sendTxModal.sendTokensFieldAssetSelection().should('not.exist');
    sendTxModal.sendTokensFieldAmount().click().type('0.001');
    sendTxModal.buttonSend().should('be.enabled').click();
};

describe('Perform transactions', () => {
    beforeEach(() => {
        cy.setupAndVisit({
            url: landingPageAddressUrl(knownMultisigs['test-simple-multisig-1'].address),
            extensionConnectionAllowed: true,
            injectExtensionWithAccounts: [
                testAccounts['Multisig Member Account 1'],
                testAccounts['Multisig Member Account 2'],
            ],
        });
    });

    it('Abort a multisig tx', () => {
        landingPage.multisigLoader().should('not.exist');
        multisigPage.accountHeader().within(() => {
            accountDisplay.addressLabel().should('not.have.text', '');
        });
        multisigPage.newTransactionButton().click();
        sendTxModal.sendTxTitle().should('be.visible');
        fillAndSubmitTransactionForm();
        waitForTxRequest();
        cy.getTxRequests().then((req) => {
            const txRequests = Object.values(req);
            cy.wrap(txRequests.length).should('eq', 1);
            cy.wrap(txRequests[0].payload.address).should('eq', testAccount1Address);
            sendTxModal.buttonSend().should('not.exist');
            sendTxModal.buttonSending().should('be.visible').should('be.disabled');

            const errorMessage = 'Whuuuut';
            cy.rejectTx(txRequests[0].id, errorMessage);
            notifications.errorNotificationIcon().should('be.visible');
            notifications.notificationWrapper().should('have.length', 1);
            notifications.notificationWrapper().should('contain', errorMessage);
        });
    });

    it('Makes a balances transfer multisig tx', () => {
        cy.rejectCurrentMultisigTx({
            account: testAccounts['Multisig Member Account 1'],
            multisigInfo: {
                address: knownMultisigs['test-simple-multisig-1'].address,
                threshold: knownMultisigs['test-simple-multisig-1'].threshold,
                otherSignatories: knownMultisigs['test-simple-multisig-1'].signatories.filter(
                    (address) => address !== testAccount1Address,
                ),
            },
            WSendpoint: 'wss://rpc.ibp.network/paseo',
        });
        landingPage.multisigLoader().should('not.exist');
        multisigPage.accountHeader().within(() => {
            accountDisplay.addressLabel().should('not.have.text', '');
        });
        multisigPage.newTransactionButton().click();
        sendTxModal.sendTxTitle().should('be.visible');
        fillAndSubmitTransactionForm();
        waitForTxRequest();
        cy.getTxRequests().then((req) => {
            const txRequests = Object.values(req);
            cy.wrap(txRequests.length).should('eq', 1);
            cy.wrap(txRequests[0].payload.address).should('eq', testAccount1Address);
            sendTxModal.buttonSend().should('not.exist');
            sendTxModal.buttonSending().should('be.visible').should('be.disabled');
            cy.approveTx(txRequests[0].id);
            notifications.loadingNotificationIcon().should('be.visible');
            notifications.notificationWrapper().should('have.length', 1);
            notifications.notificationWrapper().should('contain', 'broadcast');
        });

        multisigPage
            .transactionList()
            .should('be.visible')
            .within(() => {
                multisigPage.pendingTransactionItem(15000).within(() => {
                    multisigPage.reviewButton().click();
                });
            });

        // tx can be rejected by the proposer
        txSigningModal.approveButton().should('not.exist');
        txSigningModal.executeButton().should('not.exist');
        txSigningModal.rejectButton().should('be.visible');
        txSigningModal.rejectButton().should('not.be.disabled');

        // tx can be approved by other signatory
        txSigningModal
            .signerInput()
            .type(`{selectall}{del}${testAccount2Address.slice(0, 4)}{downArrow}{enter}`);
        // tx can be approved by another signer
        txSigningModal.approveButton().should('be.visible');
        txSigningModal.executeButton().should('not.exist');
        txSigningModal.rejectButton().should('not.exist');
    });
});
