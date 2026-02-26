import { testAccounts } from '../fixtures/testAccounts';
import { landingPageNetwork, landingPageUrl } from '../fixtures/landingData';
import { landingPage } from '../support/page-objects/landingPage';
import { topMenuItems } from '../support/page-objects/topMenuItems';
import { clickOnConnect } from '../utils/clickOnConnect';

describe('Landing Page Messaging', () => {
    it('can see the correct default state on the landing page', () => {
        cy.visit(landingPageUrl);
        landingPage
            .multixIntroHeader()
            .should('contain.text', 'Multix is an interface to easily manage complex multisigs.');
        landingPage.connectWalletButton().should('be.visible').should('be.enabled');
        landingPage.watchAccountButton().should('be.visible').should('be.enabled');
    });

    it('can see an error when attempting to connect without an extension', () => {
        cy.visit(landingPageUrl);
        // click on connect without an extension installed
        topMenuItems.connectButton().click();
        landingPage.shouldHaveNoAccountErrorAndWikiLink();
    });

    it('can see an error when extension is connected but no account is shared', () => {
        cy.visit(landingPageUrl);
        cy.initWallet([]);
        clickOnConnect();
        // Connect the extension but no account
        cy.connectAccounts([]);
        landingPage.shouldHaveNoAccountErrorAndWikiLink();
    });

    it('can see an error when landing with connected extension but no account shared', () => {
        cy.setupAndVisit({
            url: landingPageUrl,
            extensionConnectionAllowed: true,
            injectExtensionWithAccounts: [],
        });
        landingPage.shouldHaveNoAccountErrorAndWikiLink();
    });

    it('can see an error when account is shared but not part of a multisig', () => {
        cy.visit(landingPageUrl);
        cy.initWallet([testAccounts['Non Multisig Member 1']]);
        clickOnConnect();
        // share the account that is not part of any multisig
        cy.connectAccounts([testAccounts['Non Multisig Member 1'].address]);
        landingPage
            .noMultisigFoundError()
            .should(
                'contain.text',
                'No multisig found for your accounts or watched accounts on paseo.',
            );
        landingPage.createOneButton().should('be.visible').should('be.enabled');
        landingPage.watchAccountButton().should('be.visible').should('be.enabled');
    });

    it('redirect to Polkadot if wrong network in url', () => {
        cy.visit(landingPageNetwork('wrong network'));
        cy.initWallet([testAccounts['Non Multisig Member 1']]);
        clickOnConnect();
        // share the account that is not part of any multisig
        cy.connectAccounts([testAccounts['Non Multisig Member 1'].address]);
        landingPage
            .noMultisigFoundError()
            .should(
                'contain.text',
                'No multisig found for your accounts or watched accounts on polkadot.',
            );
        cy.url().should('include', 'network=polkadot');
        landingPage.createOneButton().should('be.visible').should('be.enabled');
        landingPage.watchAccountButton().should('be.visible').should('be.enabled');
    });

    it('can see error message if watching an account that is not part of a multisig', () => {
        const nonMemberPublicKey = testAccounts['Non Multisig Member 1'].publicKey!;
        cy.setupAndVisit({
            url: landingPageUrl,
            watchedAccounts: [nonMemberPublicKey],
        });
        landingPage
            .noMultisigFoundError()
            .should(
                'contain.text',
                'No multisig found for your accounts or watched accounts on paseo.',
            );
        landingPage.connectWalletButton().should('be.visible').should('be.enabled');
        landingPage.watchAccountButton().should('be.visible').should('be.enabled');
    });

    it('can see an error when connected to an account and watched but not part of a multisig', () => {
        const nonMemberPublicKey1 = testAccounts['Non Multisig Member 1'].publicKey!;
        cy.setupAndVisit({
            url: landingPageUrl,
            watchedAccounts: [nonMemberPublicKey1],
            extensionConnectionAllowed: true,
            injectExtensionWithAccounts: [testAccounts['Non Multisig Member 2']],
        });

        landingPage
            .noMultisigFoundError()
            .should(
                'contain.text',
                'No multisig found for your accounts or watched accounts on paseo.',
            );
        landingPage.createOneButton().should('be.visible').should('be.enabled');
        landingPage.watchAccountButton().should('be.visible').should('be.enabled');
    });
});
