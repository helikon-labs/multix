import { knownMultisigs } from '../fixtures/knownMultisigs';
import { landingPageAddressUrl, landingPageUrl } from '../fixtures/landingData';
import { testAccounts } from '../fixtures/testAccounts';
import { accountDisplay } from '../support/page-objects/components/accountDisplay';
import { landingPage } from '../support/page-objects/landingPage';
import { multisigPage } from '../support/page-objects/multisigPage';
import { topMenuItems } from '../support/page-objects/topMenuItems';

describe('Account address in the address bar', () => {
    it('shows multi and update address with 1 watched (multi), 0 connected account, no linked address', () => {
        const { address, publicKey } = knownMultisigs['test-simple-multisig-1'];

        // we have a watched account that is a multisig
        cy.setupAndVisit({
            // any account
            url: landingPageUrl,
            watchedAccounts: [publicKey],
        });

        cy.url({ timeout: 10000 }).should('include', address);
        topMenuItems.multiproxySelectorInputDesktop().should('have.value', address);
        multisigPage.accountHeader().within(() => {
            accountDisplay.addressLabel().should('contain.text', address.slice(0, 6));
        });
    });

    it('shows multi and update address with 0 watched, 1 connected account (multi), no linked address', () => {
        const { address } = knownMultisigs['multisigs-unique-users'];

        cy.setupAndVisit({
            url: landingPageUrl,
            extensionConnectionAllowed: true,
            injectExtensionWithAccounts: [testAccounts['Multisig Member Account 4']],
        });

        cy.url({ timeout: 10000 }).should('include', address);
        topMenuItems.multiproxySelectorInputDesktop().should('have.value', address);
        multisigPage.accountHeader().within(() => {
            accountDisplay.addressLabel().should('contain.text', address.slice(0, 6));
        });
    });

    it('shows login screen with 0 watched, 0 connected account, known linked address, then show the multisig when connected', () => {
        cy.setupAndVisit({
            url: landingPageAddressUrl(knownMultisigs['multisigs-unique-users'].address),
            extensionConnectionAllowed: false,
            injectExtensionWithAccounts: [testAccounts['Multisig Member Account 4']],
        });

        topMenuItems.multiproxySelectorDesktop().should('not.exist');
        landingPage
            .multixIntroHeader()
            .should('contain.text', 'Multix is an interface to easily manage complex multisigs.');

        //shows the known multisig once connected
        landingPage.connectWalletButton().click();
        landingPage.connectionDialog().should('exist');
        landingPage
            .connectionDialog()
            .within(() => cy.get('button', { includeShadowDom: true }).contains('Connect').click());

        topMenuItems
            .multiproxySelectorInputDesktop()
            .should('have.value', knownMultisigs['multisigs-unique-users'].address);
        multisigPage.accountHeader().within(() => {
            accountDisplay
                .addressLabel()
                .should(
                    'contain.text',
                    knownMultisigs['multisigs-unique-users'].address.slice(0, 6),
                );
        });
    });

    it('shows an error and can reset with 1 watched (multi), 0 connected account, unknown linked address', () => {
        const { publicKey, address: multisigAddress } = knownMultisigs['test-simple-multisig-1'];

        // we have a watched account that is a multisig
        cy.setupAndVisit({
            // any account
            url: landingPageAddressUrl(testAccounts['Non Multisig Member 1'].address),
            watchedAccounts: [publicKey],
        });

        landingPage
            .linkedAddressNotFound()
            .should(
                'contain.text',
                "The linked address can't be found in your accounts or watched accounts on paseo",
            );
        cy.url().should('include', testAccounts['Non Multisig Member 1'].address);
        topMenuItems.multiproxySelectorDesktop().should('be.visible');
        topMenuItems.multiproxySelectorInputDesktop().should('have.value', '');

        // click reset leads to the multisig
        landingPage.resetLinkedAddressButton().click();
        cy.url().should('not.include', testAccounts['Non Multisig Member 1'].address);
        cy.url().should('include', multisigAddress);
        topMenuItems.multiproxySelectorInputDesktop().should('have.value', multisigAddress);
        multisigPage.accountHeader().within(() => {
            accountDisplay.addressLabel().should('contain.text', multisigAddress.slice(0, 6));
        });
    });

    it('shows an error and can reset with 1 watched (pure), 0 connected account, unknown linked address', () => {
        const { purePublicKey, pureAddress } = knownMultisigs['watched-multisig-with-pure'];

        // we have a watched account that is a pure
        cy.setupAndVisit({
            // unknown account in the url
            url: landingPageAddressUrl(testAccounts['Non Multisig Member 1'].address),
            watchedAccounts: [purePublicKey],
        });
        landingPage
            .linkedAddressNotFound()
            .should(
                'contain.text',
                "The linked address can't be found in your accounts or watched accounts on paseo",
            );
        cy.url().should('include', testAccounts['Non Multisig Member 1'].address);
        topMenuItems.multiproxySelectorDesktop().should('be.visible');
        topMenuItems.multiproxySelectorInputDesktop().should('have.value', '');

        // click reset leads to the pure
        landingPage.resetLinkedAddressButton().click();
        cy.url().should('not.include', testAccounts['Non Multisig Member 1'].address);
        cy.url().should('include', pureAddress);
        topMenuItems.multiproxySelectorInputDesktop().should('have.value', pureAddress);
        multisigPage.accountHeader().within(() => {
            accountDisplay.addressLabel().should('contain.text', pureAddress.slice(0, 6));
        });
    });

    it('shows an error and can reset with 0 watched, 1 connected account (multi), unknown linked address', () => {
        const { address } = knownMultisigs['multisigs-unique-users'];
        const nonMulitisigAccountAddress = testAccounts['Non Multisig Member 1'].address;

        cy.setupAndVisit({
            url: landingPageAddressUrl(nonMulitisigAccountAddress),
            extensionConnectionAllowed: true,
            injectExtensionWithAccounts: [testAccounts['Multisig Member Account 4']],
        });

        landingPage
            .linkedAddressNotFound()
            .should(
                'contain.text',
                "The linked address can't be found in your accounts or watched accounts on paseo",
            );
        cy.url().should('include', nonMulitisigAccountAddress);
        topMenuItems.multiproxySelectorDesktop().should('be.visible');
        topMenuItems.multiproxySelectorInputDesktop().should('have.value', '');

        // click reset leads to the multi
        landingPage.resetLinkedAddressButton().click();
        cy.url().should('not.include', nonMulitisigAccountAddress);
        cy.url().should('include', address);
        topMenuItems.multiproxySelectorInputDesktop().should('have.value', address);
        multisigPage.accountHeader().within(() => {
            accountDisplay.addressLabel().should('contain.text', address.slice(0, 6));
        });
    });

    it('shows the pure with 1 watched (pure), 0 connected account, pure linked address', () => {
        const { purePublicKey, pureAddress } = knownMultisigs['multisig-with-pure'];

        // we have a watched account that is a pure
        cy.setupAndVisit({
            url: landingPageAddressUrl(pureAddress),
            watchedAccounts: [purePublicKey],
        });

        cy.url().should('include', pureAddress);
        topMenuItems.multiproxySelectorInputDesktop().should('have.value', pureAddress);
        multisigPage.accountHeader().within(() => {
            accountDisplay.addressLabel().should('contain.text', pureAddress.slice(0, 6));
        });
    });

    it('shows the pure with 1 watched (multi), 0 connected account, pure linked address', () => {
        const { publicKey, pureAddress } = knownMultisigs['watched-multisig-with-pure'];

        // we have a watched account that is a pure
        cy.setupAndVisit({
            url: landingPageAddressUrl(pureAddress),
            // here is the difference compared to previous test
            watchedAccounts: [publicKey],
        });

        cy.url().should('include', pureAddress);
        topMenuItems.multiproxySelectorInputDesktop().should('have.value', pureAddress);
        multisigPage.accountHeader().within(() => {
            accountDisplay.addressLabel().should('contain.text', pureAddress.slice(0, 6));
        });
    });

    it('shows the pure with 1 watched (signatory pure), 0 connected account, pure linked address', () => {
        const { pureAddress } = knownMultisigs['multisig-with-pure'];
        const { publicKey: signatoryPublicKey } = testAccounts['Multisig Member Account 3'];

        // we have a watched account that is a pure
        cy.setupAndVisit({
            url: landingPageAddressUrl(pureAddress),
            // here is the difference compared to previous test
            watchedAccounts: [signatoryPublicKey!],
        });

        cy.url().should('include', pureAddress);
        topMenuItems.multiproxySelectorInputDesktop().should('have.value', pureAddress);
        multisigPage.accountHeader().within(() => {
            accountDisplay.addressLabel().should('contain.text', pureAddress.slice(0, 6));
        });
    });

    it('shows a pure with 0 watched, 1 connected account (many multi & pure), pure linked address', () => {
        const expectedPureAddress = '161hfudUKvdgBMRzHviDGm6MZM55VoyA1thjnUFN12fYD7Jv';
        cy.setupAndVisit({
            url: landingPageAddressUrl(expectedPureAddress),
            extensionConnectionAllowed: true,
            injectExtensionWithAccounts: [testAccounts['Multisig Member Account 1']],
        });

        cy.url().should('include', expectedPureAddress);
        topMenuItems.multiproxySelectorInputDesktop().should('have.value', expectedPureAddress);
        multisigPage.accountHeader().within(() => {
            accountDisplay.addressLabel().should('contain.text', expectedPureAddress.slice(0, 6));
        });
    });

    it('shows a multi with 0 watched, 1 connected account (many multi & pure), multi linked address', () => {
        const expectedMultiAddress = '1iEzHCQ6XWNKJBfdtdTSn2pmUygkGXpknXR6aZcsyxHaped';

        cy.setupAndVisit({
            url: landingPageAddressUrl(expectedMultiAddress),
            extensionConnectionAllowed: true,
            injectExtensionWithAccounts: [testAccounts['Multisig Member Account 1']],
        });

        cy.url().should('include', expectedMultiAddress);
        multisigPage.accountHeader().within(() => {
            accountDisplay.addressLabel().should('contain.text', expectedMultiAddress.slice(0, 6));
        });
        topMenuItems.multiproxySelectorInputDesktop().should('have.value', expectedMultiAddress);
    });

    it('switching accounts changes the address in the address bar', () => {
        const expectedPureAddress = knownMultisigs['multisig-with-pure'].pureAddress;
        const multiAddress = knownMultisigs['test-simple-multisig-1'].address;
        const first6Letters = multiAddress.slice(0, 6);

        cy.setupAndVisit({
            url: landingPageAddressUrl(expectedPureAddress),
            watchedAccounts: [testAccounts['Multisig Member Account 1'].publicKey!],
        });

        // check that there is the pure address in the address bar
        cy.url().should('include', expectedPureAddress);
        topMenuItems.multiproxySelectorInputDesktop().should('have.value', expectedPureAddress);
        topMenuItems
            .desktopMenu()
            .within(() =>
                topMenuItems
                    .multiproxySelectorDesktop()
                    .click()
                    .type(`${first6Letters}{downArrow}{enter}`),
            );
        cy.url().should('include', multiAddress);
        multisigPage.accountHeader().within(() => {
            accountDisplay.addressLabel().should('contain.text', multiAddress.slice(0, 6));
        });
    });

    it('switching networks resets address in the address bar', () => {
        const { address, publicKey } = knownMultisigs['test-simple-multisig-1'];

        // we have a watched account that is a multisig
        cy.setupAndVisit({
            // any account
            url: landingPageUrl,
            watchedAccounts: [publicKey],
        });

        // check that there is an address in the address bar
        cy.url().should('include', address);

        topMenuItems.desktopMenu().within(() => topMenuItems.networkSelector().click());
        topMenuItems.networkSelectorOption('kusama').click();
        landingPage
            .noMultisigFoundError()
            .should(
                'contain.text',
                'No multisig found for your accounts or watched accounts on kusama.',
            );
        cy.url().should('not.include', 'address=');
    });

    it('navigating to home, settings, about, overview does not change the address bar', () => {
        const { address, publicKey } = knownMultisigs['test-simple-multisig-1'];

        // we have a watched account that is a multisig
        cy.setupAndVisit({
            // any account
            url: landingPageUrl,
            watchedAccounts: [publicKey],
        });

        multisigPage.accountHeader().within(() => {
            accountDisplay.addressLabel().should('contain.text', address.slice(0, 6));
        });

        // check that there is an address in the address bar
        cy.url({ timeout: 3000 }).should('include', address);

        // wait for the loader to be done otherwise the test fails
        landingPage.transactionListLoader().should('not.exist');

        topMenuItems.homeButton().click();
        cy.url().should('include', address);
        topMenuItems.settingsButton().click();
        cy.url().should('include', address);
        topMenuItems.overviewButton().click();
        cy.url().should('include', address);
        topMenuItems.aboutButton().click();
        cy.url().should('include', address);
    });
});
