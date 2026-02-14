import { accountDisplay } from '../support/page-objects/components/accountDisplay';
import { landingPageNetwork, landingPageNetworkAddress } from '../fixtures/landingData';
import { topMenuItems } from '../support/page-objects/topMenuItems';
import { multisigPage } from '../support/page-objects/multisigPage';
import { landingPage } from '../support/page-objects/landingPage';

const lolmcshizPubKey = '0x8aee4e164d5d70ac67308f303c7e063e9156903e42c1087bbc530447487fa47f';
const polkadotSelectedMultiproxy = '13EyMuuDHwtq5RD6w3psCJ9WvJFZzDDion6Fd2FVAqxz1g7K'; // CD OpenGov

const kusamaSelectedMultiproxy = 'J7UBNJqKHkRi3NkxMV6Y43cMk1ZjEJWzq4z4XmqmNCcFTfM';

describe('default Multisigs', () => {
    it('can switch to a new multiproxy and remember it', () => {
        cy.setupAndVisit({
            url: landingPageNetwork('polkadot'),
            watchedAccounts: [lolmcshizPubKey],
        });

        // verify that it's displayed
        multisigPage.accountHeader().within(() => {
            accountDisplay
                .addressLabel()
                .should('not.contain.text', polkadotSelectedMultiproxy.slice(0, 6));
        });

        // wait for the transaction list to load
        landingPage.transactionListLoader().should('not.exist');

        // select another one
        topMenuItems.desktopMenu().within(() => {
            // make sure the multiproxy list is fully loaded
            topMenuItems.multiproxySelectorInputDesktop().should('not.have.value', '');
            topMenuItems
                .multiproxySelectorInputDesktop()
                .click()
                .type(`${polkadotSelectedMultiproxy.slice(0, 6)}{downArrow}{enter}`, {
                    delay: 100,
                    timeout: 6000,
                });
        });

        // verify that it's displayed
        multisigPage.accountHeader().within(() => {
            accountDisplay
                .addressLabel()
                .should('contain.text', polkadotSelectedMultiproxy.slice(0, 6));
        });

        // go on Kusama and do the same
        // check the default multiproxy
        cy.visit(
            landingPageNetworkAddress({
                network: 'kusama',
                address: 'Coo7PHJP8MssUbqeeHwfC6DVjNCccw5N4pCtFwZVPJzb7JM',
            }),
        );

        multisigPage.accountHeader(8000).within(() => {
            accountDisplay
                .addressLabel()
                .invoke('text')
                .should('not.contain', kusamaSelectedMultiproxy.slice(0, 6));
        });

        // select another one
        topMenuItems.desktopMenu().within(() =>
            topMenuItems
                .multiproxySelectorInputDesktop()
                .should('not.have.value', '')
                .click()
                .type(`${kusamaSelectedMultiproxy.slice(0, 6)}{downArrow}{enter}`, {
                    delay: 100,
                    timeout: 6000,
                }),
        );

        // verify that it's displayed
        multisigPage.accountHeader(8000).within(() => {
            accountDisplay
                .addressLabel()
                .should('contain.text', kusamaSelectedMultiproxy.slice(0, 6));
        });

        // go back on Polkadot and verify the last used one is selected
        cy.visit(landingPageNetwork('polkadot'));

        // verify that it's displayed
        multisigPage.accountHeader(8000).within(() => {
            accountDisplay
                .addressLabel()
                .should('contain.text', polkadotSelectedMultiproxy.slice(0, 6));
        });

        cy.url().should('include', polkadotSelectedMultiproxy);

        // go back on Kusama and verify the last used one is selected
        cy.visit(landingPageNetwork('kusama'));

        // verify that it's displayed
        multisigPage.accountHeader(8000).within(() => {
            accountDisplay
                .addressLabel()
                .should('contain.text', kusamaSelectedMultiproxy.slice(0, 6));
        });

        cy.url().should('include', kusamaSelectedMultiproxy);
    });
});
