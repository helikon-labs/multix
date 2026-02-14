import { getSettingsPageUrl } from '../fixtures/landingData';
import { settingsPage } from '../support/page-objects/settingsPage';
import { topMenuItems } from '../support/page-objects/topMenuItems';
import { testAccounts } from '../fixtures/testAccounts';

describe('WalletConnect', () => {
    it('can see expected wc state when a wallet is not connected', () => {
        cy.visit(getSettingsPageUrl());
        topMenuItems.connectButton().should('be.visible');
        settingsPage.wallectConnectAccordion().should('be.visible').click();
        // ensure elements are disabled when not connected
        settingsPage
            .walletConnectAlert()
            .should('be.visible')
            .should(
                'contain.text',
                'Please first select a Pure or Multisig that you are part of, to be able to use it with WalletConnect',
            );
        settingsPage.walletConnectKeyInput().should('be.disabled');
        settingsPage.connectDappButton().should('be.disabled');
    });

    it('can see expected wc state when wallet is connected', () => {
        cy.setupAndVisit({
            url: getSettingsPageUrl(),
            extensionConnectionAllowed: true,
            injectExtensionWithAccounts: [testAccounts['Multisig Member Account 1']],
        });
        settingsPage.wallectConnectAccordion().should('be.visible').click();
        // ensure elements are enabled when connected
        settingsPage.walletConnectAlert().should('not.exist');
        settingsPage.walletConnectKeyInput().should('be.enabled');
        // ensure dapp button is disabled until input is typed in
        settingsPage.connectDappButton().should('be.disabled');
        // type in input field
        settingsPage.walletConnectKeyInput().type('test');
        settingsPage.connectDappButton().should('be.enabled');
    });

    it('can see the wallet connect accordion is collapsed by default', () => {
        cy.visit(getSettingsPageUrl());
        topMenuItems.connectButton().should('be.visible');
        topMenuItems.settingsButton().click();
        // ensure wallet connect accordion is closed by default
        settingsPage
            .wallectConnectAccordion()
            .should('be.visible')
            .should('have.attr', 'aria-expanded', 'false')
            .click()
            .should('have.attr', 'aria-expanded', 'true');
    });
});
