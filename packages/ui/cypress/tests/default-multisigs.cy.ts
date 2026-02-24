import { accountDisplay } from '../support/page-objects/components/accountDisplay';
import { landingPageNetwork, landingPageNetworkAddress } from '../fixtures/landingData';
import { topMenuItems } from '../support/page-objects/topMenuItems';
import { multisigPage } from '../support/page-objects/multisigPage';
import { landingPage } from '../support/page-objects/landingPage';
import {
    polkadotAHMemberAccounts,
    polkadotAHMultisig1Address,
    polkadotAHMultisig2Address,
} from '../fixtures/polkadotAssetHub';

const testAccount2 = polkadotAHMemberAccounts.MS_TEST_02;

describe('default Multisigs', () => {
    it('can switch to a new multiproxy and remember it', () => {
        cy.setupAndVisit({
            url: landingPageNetwork('asset-hub-polkadot'),
            watchedAccounts: [testAccount2.publicKey!],
        });
        // verify that it's displayed
        multisigPage.accountHeader().within(() => {
            accountDisplay
                .addressLabel()
                .should('not.contain.text', polkadotAHMultisig2Address.slice(0, 6));
        });
        // wait for the transaction list to load
        landingPage.transactionListLoader().should('not.exist');
        // select the second multisig
        topMenuItems.desktopMenu().within(() => {
            // make sure the multiproxy list is fully loaded
            topMenuItems.multiproxySelectorInputDesktop().should('not.have.value', '');
            topMenuItems
                .multiproxySelectorInputDesktop()
                .click()
                .type(`${polkadotAHMultisig2Address.slice(0, 6)}{downArrow}{enter}`, {
                    delay: 100,
                    timeout: 6000,
                });
        });
        // verify that it's displayed
        multisigPage.accountHeader().within(() => {
            accountDisplay
                .addressLabel()
                .should('contain.text', polkadotAHMultisig2Address.slice(0, 6));
        });

        // go on Polkadot and check the default multiproxy
        cy.visit(
            landingPageNetworkAddress({
                network: 'polkadot',
                address: polkadotAHMultisig2Address,
            }),
        );
        multisigPage.accountHeader(8000).within(() => {
            accountDisplay
                .addressLabel()
                .invoke('text')
                .should('not.contain', polkadotAHMultisig1Address.slice(0, 6));
        });
        // select another one
        topMenuItems.desktopMenu().within(() =>
            topMenuItems
                .multiproxySelectorInputDesktop()
                .should('not.have.value', '')
                .click()
                .type(`${polkadotAHMultisig1Address.slice(0, 6)}{downArrow}{enter}`, {
                    delay: 100,
                    timeout: 6000,
                }),
        );
        // verify that it's displayed
        multisigPage.accountHeader(8000).within(() => {
            accountDisplay
                .addressLabel()
                .should('contain.text', polkadotAHMultisig1Address.slice(0, 6));
        });
        // go back on Asset Hub Polkadot and verify the last used one is selected
        cy.visit(landingPageNetwork('asset-hub-polkadot'));
        // verify that it's displayed
        multisigPage.accountHeader(8000).within(() => {
            accountDisplay
                .addressLabel()
                .should('contain.text', polkadotAHMultisig2Address.slice(0, 6));
        });
        cy.url().should('include', polkadotAHMultisig2Address);
        // go back on Polkadot and verify the last used one is selected
        cy.visit(landingPageNetwork('polkadot'));
        // verify that it's displayed
        multisigPage.accountHeader(8000).within(() => {
            accountDisplay
                .addressLabel()
                .should('contain.text', polkadotAHMultisig1Address.slice(0, 6));
        });
        cy.url().should('include', polkadotAHMultisig1Address);
    });
});
