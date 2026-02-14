import { testAccounts } from '../fixtures/testAccounts';
import { landingPageUrl } from '../fixtures/landingData';
import { landingPage } from '../support/page-objects/landingPage';
import { topMenuItems } from '../support/page-objects/topMenuItems';
import { clickOnConnect } from '../utils/clickOnConnect';
import { newMultisigPage } from '../support/page-objects/newMultisigPage';
import { accountDisplay } from '../support/page-objects/components/accountDisplay';
import { MULTIX_DAPP_NAME } from '../support/commands';

describe('Connect Account', () => {
    beforeEach(() => {
        cy.visit(landingPageUrl);
        cy.initWallet(Object.values(testAccounts));
        clickOnConnect();
    });

    it('Reject connection', () => {
        cy.getAuthRequests().then((authRequests) => {
            const requests = Object.values(authRequests);
            // we should have 1 connection request to the extension
            cy.wrap(requests.length).should('eq', 1);
            // this request should be from the application Multix
            cy.wrap(requests[0].origin).should('eq', MULTIX_DAPP_NAME);

            // auth is rejected
            cy.rejectAuth(requests[0].id, 'Cancelled');
            landingPage
                .noAccountFoundError()
                .should(
                    'contain.text',
                    'No account found. Please connect at least one in a wallet extension.',
                );
        });
    });

    it('Connect Accounts', () => {
        const address1 = testAccounts['Multisig Member Account 1'].address;
        const address2 = testAccounts['Multisig Member Account 2'].address;

        cy.connectAccounts([address1, address2]);

        topMenuItems.newMultisigButton().click();
        // Click on the account address selector to show the list of accounts
        newMultisigPage.addressSelector().click();

        accountDisplay.nameLabel().each((el, index) => {
            const expectedName = Object.values(testAccounts)[index].name;
            cy.wrap(el).should('have.text', expectedName);
        });
    });
});
