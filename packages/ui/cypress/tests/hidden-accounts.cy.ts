import { accountDisplay } from '../support/page-objects/components/accountDisplay';
import {
    getSettingsPageHiddenAccountUrl,
    landingPageNetwork,
    landingPageNetworkAddress,
} from '../fixtures/landingData';
import { settingsPage } from '../support/page-objects/settingsPage';
import { westendMemberAccount } from '../fixtures/westendAccounts';
import { topMenuItems } from '../support/page-objects/topMenuItems';
import { multisigPage } from '../support/page-objects/multisigPage';
import { landingPage } from '../support/page-objects/landingPage';
import { hiddenAccountInfoModal } from '../support/page-objects/modals/hiddenAccountInfoModal';

const randomAddress = 'HeVswqunza8rP2hEWDCThfiB5v2Jxng91yX2oGAZnCKtsgS';
const westendWatchedAccount = {
    pubKey: '0xc94fccf2736cad38e169025ed308fdb6ae09185350b05e6193d0f5343ce7362f',
    address: '5GcfBqhnXDMsUwHaebV9zHew1A6aVHbt4tH2XtdKi7mM48hC',
};

const addHiddenAccount = (address: string) => {
    settingsPage.hiddenAccountsInputsWrapper().within(() => {
        settingsPage.accountAddressInput().type(`${address}{enter}`, { delay: 20, timeout: 8000 });

        settingsPage.addButton().should('be.enabled');
        settingsPage.addButton().click();
    });
};

const goToHiddenAccountSettings = () => {
    topMenuItems.settingsButton().click();
    settingsPage.hiddenAccountsAccordion().click();
};

describe('Hidden Accounts', () => {
    it('adds an account with a name to the hidden list', () => {
        cy.setupAndVisit({
            url: landingPageNetwork('westend'),
            extensionConnectionAllowed: true,
            injectExtensionWithAccounts: [westendMemberAccount.hidden.account],
        });
        goToHiddenAccountSettings();
        topMenuItems.multiproxySelectorDesktop().should('be.visible').click();
        topMenuItems.multiproxySelectorOptionDesktop().should('have.length', 3);

        //hide random account
        addHiddenAccount(randomAddress);
        topMenuItems.multiproxySelectorDesktop().should('be.visible').click();
        topMenuItems.multiproxySelectorOptionDesktop().should('have.length', 3);
        settingsPage.hiddenAccountsContainer().should('be.visible');
        settingsPage.hiddenAccountsContainer().within(() => {
            accountDisplay.identicon().should('be.visible');
            accountDisplay.addressLabel().should('be.visible');
            settingsPage.hiddenAccountDeleteButton().should('be.visible');
        });

        //hide the multisig account
        addHiddenAccount(westendMemberAccount.hidden.expectedSingleMultisig.westendAddress);
        settingsPage.hiddenAccountsContainer().should('have.length', 2);
        topMenuItems.multiproxySelectorDesktop().should('be.visible').click();
        // the multisig should be hidden
        topMenuItems.multiproxySelectorOptionDesktop().should('have.length', 2);
        topMenuItems
            .multiproxySelectorOptionDesktop()
            .should('contain', westendMemberAccount.hidden.expectedPure.address.slice(0, 6));
    });

    it('hides all accounts sequentially and it switches to the available accounts if any', () => {
        cy.setupAndVisit({
            url: landingPageNetworkAddress({
                network: 'westend',
                address: westendMemberAccount.hidden.expectedPure.address,
            }),
            extensionConnectionAllowed: true,
            injectExtensionWithAccounts: [westendMemberAccount.hidden.account],
        });
        //land on the pure
        multisigPage.accountHeader().within(() => {
            accountDisplay
                .addressLabel()
                .should(
                    'contain.text',
                    westendMemberAccount.hidden.expectedPure.address.slice(0, 6),
                );
        });
        cy.url().should('include', westendMemberAccount.hidden.expectedPure.address);
        goToHiddenAccountSettings();
        addHiddenAccount(westendMemberAccount.hidden.expectedPure.address);
        // we should now have only the single multisig and have it selected
        cy.url().should(
            'include',
            westendMemberAccount.hidden.expectedSingleMultisig.westendAddress,
        );
        topMenuItems.homeButton().click();
        multisigPage.accountHeader().within(() => {
            accountDisplay
                .addressLabel()
                .should(
                    'contain.text',
                    westendMemberAccount.hidden.expectedSingleMultisig.westendAddress.slice(0, 6),
                );
        });

        topMenuItems.multiproxySelectorDesktop().should('be.visible').click();
        topMenuItems.multiproxySelectorOptionDesktop().should('have.length', 2);
        goToHiddenAccountSettings();
        settingsPage
            .hiddenAccountsContainer()
            .should('have.length', 1)
            .within(() => {
                accountDisplay.identicon().should('be.visible');
                accountDisplay
                    .addressLabel()
                    .should(
                        'contain.text',
                        westendMemberAccount.hidden.expectedPure.address.slice(0, 6),
                    );
                settingsPage.hiddenAccountDeleteButton().should('be.visible');
            });

        // hide all other accounts and expect an error
        addHiddenAccount(westendMemberAccount.hidden.expectedSingleMultisig.westendAddress);
        addHiddenAccount(westendMemberAccount.noIdentity.expectedSingleMultisig.westendAddress);
        topMenuItems.multiproxySelectorDesktop().should('not.exist');
        topMenuItems.homeButton().click();
        landingPage
            .noMultisigFoundError()
            .should(
                'contain.text',
                'No multisig found for your accounts or watched accounts on westend.',
            );
    });

    it('hides accounts per network only', () => {
        cy.setupAndVisit({
            url: landingPageNetworkAddress({
                network: 'westend',
                address: westendMemberAccount.hidden.expectedPure.address,
            }),
            extensionConnectionAllowed: true,
            injectExtensionWithAccounts: [westendMemberAccount.hidden.account],
            hiddenAccounts: [
                { network: 'westend', pubKey: westendMemberAccount.hidden.expectedPure.pubKey },
                {
                    network: 'westend',
                    pubKey: westendMemberAccount.hidden.expectedSingleMultisig.pubKey,
                },
            ],
        });

        landingPage.linkedAddressNotFound().should('be.visible');
        // change network paseo should have 1 multisig
        topMenuItems.desktopMenu().within(() => topMenuItems.networkSelector().click());
        topMenuItems.networkSelectorOption('paseo').click();

        topMenuItems.multiproxySelectorDesktop().should('be.visible').click();
        topMenuItems
            .multiproxySelectorOptionDesktop()
            .should('have.length', 1)
            .should(
                'contain',
                westendMemberAccount.hidden.expectedSingleMultisig.paseoAddress.slice(0, 6),
            );

        // there should be no account in the list
        // since it's per network
        goToHiddenAccountSettings();
        settingsPage.hiddenAccountsContainer().should('not.exist');
    });

    it('can see error when attempting to add same address more than once', () => {
        // add an account first
        cy.visit(getSettingsPageHiddenAccountUrl());
        addHiddenAccount(randomAddress);
        settingsPage.hiddenAccountsContainer().should('have.length', 1);
        // attempt to add the same account again
        addHiddenAccount(randomAddress);
        settingsPage.errorLabel().should('be.visible').should('have.text', 'Account already added');
        settingsPage.hiddenAccountsContainer().should('have.length', 1);
        settingsPage.addButton().should('be.disabled');
    });

    it('can see error when attempting to add an invalid address', () => {
        cy.visit(getSettingsPageHiddenAccountUrl());
        addHiddenAccount('123');
        settingsPage.errorLabel().should('be.visible').should('have.text', 'Invalid address');
        settingsPage.hiddenAccountsContainer().should('have.length', 0);
        settingsPage.addButton().should('be.disabled');
    });

    it('can hide an account from the 3 dots menu', () => {
        cy.setupAndVisit({
            url: landingPageNetworkAddress({
                network: 'westend',
                address: westendMemberAccount.hidden.expectedPure.address,
            }),
            extensionConnectionAllowed: true,
            injectExtensionWithAccounts: [westendMemberAccount.hidden.account],
        });

        multisigPage.optionsMenuButton().click();
        multisigPage.hideAccountMenuOption().should('exist').click();
        hiddenAccountInfoModal.body().should('be.visible');
        hiddenAccountInfoModal.checkBoxMessage().should('not.be.checked');
        hiddenAccountInfoModal.gotItButton().should('be.visible').click();
        landingPage.transactionListLoader().should('not.exist');
        cy.url().should(
            'include',
            westendMemberAccount.hidden.expectedSingleMultisig.westendAddress,
        );
        topMenuItems.multiproxySelectorDesktop().should('be.visible').click();
        topMenuItems.multiproxySelectorOptionDesktop().should('have.length', 2);
        goToHiddenAccountSettings();
        settingsPage
            .hiddenAccountsContainer()
            .should('have.length', 1)
            .within(() => {
                accountDisplay
                    .addressLabel()
                    .should(
                        'contain.text',
                        westendMemberAccount.hidden.expectedPure.address.slice(0, 6),
                    );
            });

        // remove the hidden account
        settingsPage.hiddenAccountDeleteButton().should('be.visible').click();
        settingsPage.hiddenAccountsContainer().should('not.exist');
        topMenuItems.multiproxySelectorDesktop().should('be.visible').click();
        topMenuItems.multiproxySelectorOptionDesktop().should('have.length', 3);
        topMenuItems.homeButton().click();

        // hide it again but say to not view the message again
        multisigPage.optionsMenuButton().click();
        multisigPage.hideAccountMenuOption().should('exist').click();
        hiddenAccountInfoModal.body().should('be.visible');
        hiddenAccountInfoModal.checkBoxMessage().should('not.be.checked').click();
        hiddenAccountInfoModal.gotItButton().should('be.visible').click();

        topMenuItems.multiproxySelectorDesktop().should('be.visible').click();
        topMenuItems.multiproxySelectorOptionDesktop().should('have.length', 2);
        goToHiddenAccountSettings();
        settingsPage.hiddenAccountsContainer().should('have.length', 1);

        // remove the hidden account
        settingsPage.hiddenAccountDeleteButton().should('be.visible').click();

        topMenuItems.homeButton().click();
        topMenuItems.multiproxySelectorDesktop().should('be.visible').click();
        topMenuItems.multiproxySelectorOptionDesktop().should('have.length', 3);

        multisigPage.optionsMenuButton().click();
        multisigPage.hideAccountMenuOption().should('exist').click();
        hiddenAccountInfoModal.body().should('not.exist');
        topMenuItems.multiproxySelectorDesktop().should('be.visible').click();
        topMenuItems.multiproxySelectorOptionDesktop().should('have.length', 2);
    });

    it('removes a watched account if hidding a watched account', () => {
        cy.setupAndVisit({
            url: landingPageNetworkAddress({
                network: 'westend',
                address: westendWatchedAccount.address,
            }),
            extensionConnectionAllowed: true,
            injectExtensionWithAccounts: [westendMemberAccount.hidden.account],
            watchedAccounts: [westendWatchedAccount.pubKey],
        });

        topMenuItems.multiproxySelectorDesktop().click();
        topMenuItems.multiproxySelectorOptionDesktop().should('have.length', 4);

        // hide the watched account
        multisigPage.optionsMenuButton().click();
        multisigPage.hideAccountMenuOption().should('exist').click();
        hiddenAccountInfoModal.body().should('be.visible');
        hiddenAccountInfoModal.gotItButton().click();

        topMenuItems.multiproxySelectorDesktop().click();
        topMenuItems.multiproxySelectorOptionDesktop().should('have.length', 3);
        goToHiddenAccountSettings();
        settingsPage.hiddenAccountsContainer().should('not.exist');
        settingsPage.watchedAccountsAccordion().click();
        settingsPage.watchedAccountsContainer().should('not.exist');
    });

    it('shows a warning if hidding a watched account', () => {
        cy.setupAndVisit({
            url: landingPageNetworkAddress({
                network: 'westend',
                address: westendWatchedAccount.address,
            }),
            extensionConnectionAllowed: true,
            injectExtensionWithAccounts: [westendMemberAccount.hidden.account],
            watchedAccounts: [westendWatchedAccount.pubKey],
        });

        // topMenuItems.multiproxySelectorDesktop().click()
        // topMenuItems.multiproxySelectorOptionDesktop().should('have.length', 3)

        // // hide the watched account
        // multisigPage.optionsMenuButton().click()
        // multisigPage.hideAccountMenuOption().should('exist').click()
        // hiddenAccountInfoModal.body().should('be.visible')
        // hiddenAccountInfoModal.gotItButton().click()

        // topMenuItems.multiproxySelectorDesktop().click()
        // topMenuItems.multiproxySelectorOptionDesktop().should('have.length', 2)
        goToHiddenAccountSettings();
        settingsPage.hiddenAccountsContainer().should('not.exist');
        settingsPage.watchedAccountsAccordion().click();
        settingsPage.watchedAccountsContainer().should('have.length', 1);

        settingsPage.hiddenAccountsAccordion().click();
        addHiddenAccount(westendWatchedAccount.address);
        settingsPage.hiddenAccountWatchedWarning().should('be.visible');
        settingsPage.hiddenAccountsContainer().should('not.exist');
        settingsPage.watchedAccountsAccordion().click();
        settingsPage.watchedAccountsContainer().should('not.exist');
    });
});
