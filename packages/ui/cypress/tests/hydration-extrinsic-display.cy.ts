import {
    expectedMultisigAddress,
    extrinsicsDisplayAccounts,
} from '../fixtures/extrinsicsDisplayAccounts';
import { landingPageNetwork } from '../fixtures/landingData';
import { accountDisplay } from '../support/page-objects/components/accountDisplay';
import { expander } from '../support/page-objects/components/expander';
import { multisigPage } from '../support/page-objects/multisigPage';
import { sendTxModal } from '../support/page-objects/sendTxModal';

describe('Verify extrinsics display', () => {
    beforeEach(() => {
        cy.setupAndVisit({
            url: landingPageNetwork('hydration'),
            extensionConnectionAllowed: true,
            injectExtensionWithAccounts: [extrinsicsDisplayAccounts['Alice']],
        });
    });

    it('The Router.sell extrinsic is displayed in plank', () => {
        multisigPage.accountHeader(10000).within(() => {
            accountDisplay
                .addressLabel()
                .should('contain.text', expectedMultisigAddress.slice(0, 6));
        });

        multisigPage
            .transactionList()
            .should('be.visible')
            .within(() => {
                multisigPage.pendingTransactionItem().should('have.length', 1);
                multisigPage.dateLabel().should('have.length', 1).contains('November 5, 2024');
                multisigPage.pendingTransactionItem().within(() => {
                    multisigPage.pendingTransactionCallName().should('contain.text', 'Router.sell');
                    multisigPage.unknownCallIcon().should('not.exist');
                    multisigPage.unknownCallAlert().should('not.exist');
                    expander.paramExpander().click();
                    expander.contentExpander().should('contain', `amount_in: '10000000000000'`);
                    expander.contentExpander().should('contain', `min_amount_out: '72179'`);
                });
            });
    });

    it.skip('A manual omnipool.sell extrinsic creation has input in plank', () => {
        multisigPage.accountHeader().within(() => {
            accountDisplay
                .addressLabel()
                .should('contain.text', expectedMultisigAddress.slice(0, 6));
        });

        multisigPage.newTransactionButton().click();
        sendTxModal.sendTxTitle().should('be.visible');
        sendTxModal.selectEasySetup().click();
        sendTxModal.selectionEasySetupSetupManualExtrinsic().click();
        sendTxModal.manualPalletSelection().click();
        sendTxModal.optionPallet('omnipool').click();

        sendTxModal.manualMethodSelection().click();
        sendTxModal.optionMethod('sell').click();
        sendTxModal.paramField('amount').should('be.visible');
        sendTxModal.paramField('amount').should('not.contain', 'HDX');
    });

    it.skip('A manual balances.transferKeepAlive extrinsic has input in HDX', () => {
        multisigPage.accountHeader().within(() => {
            accountDisplay
                .addressLabel()
                .should('contain.text', expectedMultisigAddress.slice(0, 6));
        });

        multisigPage.newTransactionButton().click();
        sendTxModal.sendTxTitle().should('be.visible');
        sendTxModal.selectEasySetup().click();
        sendTxModal.selectionEasySetupSetupManualExtrinsic().click();
        sendTxModal.manualPalletSelection().click();
        sendTxModal.optionPallet('balances').click();

        sendTxModal.manualMethodSelection().click();
        sendTxModal.optionMethod('transferKeepAlive').click();
        sendTxModal.paramField('value').should('be.visible');
        sendTxModal.paramField('value').should('contain', 'HDX');
    });

    it('A from call data balances.transferKeepAlive extrinsic has balance displayed in HDX and identicon for destination', () => {
        const balanceTransferCallData =
            '0x0703d43593c715fdd31c61141abd04a99fd6822c8558854ccde39a5684e7a56da27d0b00b04e2bde6f';
        const sendingAmount = '123 HDX';
        const expectedRecipient = '15oF4u..Hr6Sp5';

        multisigPage.accountHeader(10000).within(() => {
            accountDisplay
                .addressLabel()
                .should('contain.text', expectedMultisigAddress.slice(0, 6));
        });

        multisigPage.newTransactionButton().click();
        sendTxModal.sendTxTitle().should('be.visible');
        sendTxModal.selectEasySetup().click();
        sendTxModal.selectionEasySetupSetupFromCallData().click();
        sendTxModal.callDataInput().click().type(balanceTransferCallData);
        sendTxModal.sendTxContent().within(() => {
            expander.contentExpander().should('contain', sendingAmount);
            expander.contentExpander().within(() => {
                accountDisplay.addressLabel().should('contain', expectedRecipient);
                accountDisplay.identicon().should('be.visible');
                accountDisplay
                    .nameLabel()
                    .should('contain', extrinsicsDisplayAccounts['Alice'].name);
            });
        });
    });
});
