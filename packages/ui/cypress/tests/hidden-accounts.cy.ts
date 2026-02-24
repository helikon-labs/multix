import { accountDisplay } from '../support/page-objects/components/accountDisplay';
import {
    getSettingsPageHiddenAccountUrl,
    landingPageNetwork,
    landingPageNetworkAddress,
} from '../fixtures/landingData';
import { settingsPage } from '../support/page-objects/settingsPage';
import {
    polkadotAHMemberAccounts,
    polkadotAHMultisig1Address,
    polkadotAHMultisig2Address,
} from '../fixtures/polkadotAssetHub';
import { topMenuItems } from '../support/page-objects/topMenuItems';
import { multisigPage } from '../support/page-objects/multisigPage';
import { landingPage } from '../support/page-objects/landingPage';
import { hiddenAccountInfoModal } from '../support/page-objects/modals/hiddenAccountInfoModal';

const testAccount1 = polkadotAHMemberAccounts.MS_TEST_01;
const testAccount2 = polkadotAHMemberAccounts.MS_TEST_02;
const testAccount3 = polkadotAHMemberAccounts.MS_TEST_03;
const randomAccount = {
    address: '1uXsk6gr4CJjQ83K1v2Lk9GFunwmjo49tjKRUY1rhZhTY1u',
    publicKey: '0x2810b1f4a7ff1cc7bc6c615eae881f971a88c8e7048d6bad52fcbab751966e2d',
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
            url: landingPageNetwork('asset-hub-polkadot'),
            extensionConnectionAllowed: true,
            injectExtensionWithAccounts: [testAccount2],
            accountNames: {
                [randomAccount.publicKey]: 'RANDOM',
                [testAccount2.publicKey!]: testAccount2.name!,
            },
        });
        goToHiddenAccountSettings();
        topMenuItems.multiproxySelectorDesktop().should('be.visible').click();
        topMenuItems.multiproxySelectorOptionDesktop().should('have.length', 2);

        // hide random account
        addHiddenAccount(randomAccount.address);
        topMenuItems.multiproxySelectorDesktop().should('be.visible').click();
        topMenuItems.multiproxySelectorOptionDesktop().should('have.length', 2);
        settingsPage.hiddenAccountsContainer().should('be.visible');
        settingsPage.hiddenAccountsContainer().within(() => {
            accountDisplay.identicon().should('be.visible');
            accountDisplay.addressLabel().should('be.visible');
            settingsPage.hiddenAccountDeleteButton().should('be.visible');
        });

        // hide the multisig account
        addHiddenAccount(polkadotAHMultisig1Address);
        settingsPage.hiddenAccountsContainer().should('have.length', 2);
        topMenuItems.multiproxySelectorDesktop().should('exist');
    });

    it('hides all accounts sequentially and it switches to the available accounts if any', () => {
        cy.setupAndVisit({
            url: landingPageNetwork('asset-hub-polkadot'),
            extensionConnectionAllowed: true,
            injectExtensionWithAccounts: [testAccount1, testAccount2, testAccount3],
            accountNames: {
                [randomAccount.publicKey]: 'RANDOM',
                [testAccount1.publicKey!]: testAccount1.name!,
                [testAccount2.publicKey!]: testAccount2.name!,
                [testAccount3.publicKey!]: testAccount3.name!,
            },
        });
        multisigPage.accountHeader().within(() => {
            accountDisplay
                .addressLabel()
                .should('contain.text', polkadotAHMultisig1Address.slice(0, 6));
        });
        cy.url().should('include', polkadotAHMultisig1Address);
        goToHiddenAccountSettings();
        addHiddenAccount(polkadotAHMultisig1Address);
        // we should now have only the single multisig and have it selected
        cy.url().should('include', polkadotAHMultisig2Address);
        topMenuItems.homeButton().click();
        multisigPage.accountHeader().within(() => {
            accountDisplay
                .addressLabel()
                .should('contain.text', polkadotAHMultisig2Address.slice(0, 6));
        });
        topMenuItems.multiproxySelectorDesktop().should('be.visible').click();
        topMenuItems.multiproxySelectorOptionDesktop().should('have.length', 1);
        goToHiddenAccountSettings();
        settingsPage
            .hiddenAccountsContainer()
            .should('have.length', 1)
            .within(() => {
                accountDisplay.identicon().should('be.visible');
                accountDisplay
                    .addressLabel()
                    .should('contain.text', polkadotAHMultisig1Address.slice(0, 6));
                settingsPage.hiddenAccountDeleteButton().should('be.visible');
            });
        // hide the other account and expect an error
        addHiddenAccount(polkadotAHMultisig2Address);
        topMenuItems.multiproxySelectorDesktop().should('not.exist');
        topMenuItems.homeButton().click();
        landingPage
            .noMultisigFoundError()
            .should('contain.text', 'No multisig found for your accounts or watched accounts on');
    });

    it('hides accounts per network only', () => {
        cy.setupAndVisit({
            url: landingPageNetworkAddress({
                network: 'asset-hub-polkadot',
                address: polkadotAHMultisig1Address,
            }),
            extensionConnectionAllowed: true,
            injectExtensionWithAccounts: [testAccount1, testAccount2],
            hiddenAccounts: [
                { network: 'asset-hub-polkadot', pubKey: polkadotAHMultisig1Address },
                {
                    network: 'polkadot',
                    pubKey: polkadotAHMultisig2Address,
                },
            ],
        });
        landingPage.linkedAddressNotFound().should('be.visible');
        // change network polkadot should have 1 multisig
        topMenuItems.desktopMenu().within(() => topMenuItems.networkSelector().click());
        topMenuItems.networkSelectorOption('polkadot').click();

        topMenuItems.multiproxySelectorDesktop().should('be.visible').click();
        topMenuItems
            .multiproxySelectorOptionDesktop()
            .should('have.length', 1)
            .should('contain', polkadotAHMultisig1Address.slice(0, 6));

        // there should be no account in the list
        // since it's per network
        goToHiddenAccountSettings();
        // settingsPage.hiddenAccountsContainer().should('not.exist');
        settingsPage
            .hiddenAccountsContainer()
            .should('have.length', 1)
            .within(() => {
                accountDisplay.identicon().should('be.visible');
                accountDisplay
                    .addressLabel()
                    .should('contain.text', polkadotAHMultisig2Address.slice(0, 6));
                settingsPage.hiddenAccountDeleteButton().should('be.visible');
            });
    });

    it('can see error when attempting to add same address more than once', () => {
        cy.visit(getSettingsPageHiddenAccountUrl());
        addHiddenAccount(randomAccount.address);
        settingsPage.hiddenAccountsContainer().should('have.length', 1);
        // attempt to add the same account again
        addHiddenAccount(randomAccount.address);
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
                network: 'asset-hub-polkadot',
                address: polkadotAHMultisig1Address,
            }),
            extensionConnectionAllowed: true,
            injectExtensionWithAccounts: [testAccount1, testAccount2],
        });

        multisigPage.optionsMenuButton().click();
        multisigPage.hideAccountMenuOption().should('exist').click();
        hiddenAccountInfoModal.body().should('be.visible');
        hiddenAccountInfoModal.checkBoxMessage().should('not.be.checked');
        hiddenAccountInfoModal.gotItButton().should('be.visible').click();
        landingPage.transactionListLoader().should('not.exist');
        cy.url().should('include', polkadotAHMultisig2Address);
        topMenuItems.multiproxySelectorDesktop().should('be.visible').click();
        topMenuItems.multiproxySelectorOptionDesktop().should('have.length', 1);
        goToHiddenAccountSettings();
        settingsPage
            .hiddenAccountsContainer()
            .should('have.length', 1)
            .within(() => {
                accountDisplay
                    .addressLabel()
                    .should('contain.text', polkadotAHMultisig1Address.slice(0, 6));
            });
        // remove the hidden account
        settingsPage.hiddenAccountDeleteButton().should('be.visible').click();
        settingsPage.hiddenAccountsContainer().should('not.exist');
        topMenuItems.multiproxySelectorDesktop().should('be.visible').click();
        topMenuItems.multiproxySelectorOptionDesktop().should('have.length', 2);
        topMenuItems.homeButton().click();
        // hide it again but say to not view the message again
        multisigPage.optionsMenuButton().click();
        multisigPage.hideAccountMenuOption().should('exist').click();
        hiddenAccountInfoModal.body().should('be.visible');
        hiddenAccountInfoModal.checkBoxMessage().should('not.be.checked').click();
        hiddenAccountInfoModal.gotItButton().should('be.visible').click();
        topMenuItems.multiproxySelectorDesktop().should('be.visible').click();
        topMenuItems.multiproxySelectorOptionDesktop().should('have.length', 1);
        goToHiddenAccountSettings();
        settingsPage.hiddenAccountsContainer().should('have.length', 1);
        // remove the hidden account
        settingsPage.hiddenAccountDeleteButton().should('be.visible').click();
        topMenuItems.homeButton().click();
        topMenuItems.multiproxySelectorDesktop().should('be.visible').click();
        topMenuItems.multiproxySelectorOptionDesktop().should('have.length', 2);
        multisigPage.optionsMenuButton().click();
        multisigPage.hideAccountMenuOption().should('exist').click();
        hiddenAccountInfoModal.body().should('not.exist');
        topMenuItems.multiproxySelectorDesktop().should('be.visible').click();
        topMenuItems.multiproxySelectorOptionDesktop().should('have.length', 1);
    });

    it('shows a warning if hidding a watched account', () => {
        cy.setupAndVisit({
            url: landingPageNetworkAddress({
                network: 'asset-hub-polkadot',
                address: polkadotAHMultisig1Address,
            }),
            extensionConnectionAllowed: true,
            injectExtensionWithAccounts: [testAccount2],
            watchedAccounts: [polkadotAHMultisig1Address, polkadotAHMultisig2Address],
        });

        topMenuItems.multiproxySelectorDesktop().click();
        topMenuItems.multiproxySelectorOptionDesktop().should('have.length', 2);
        goToHiddenAccountSettings();
        settingsPage.hiddenAccountsContainer().should('not.exist');
        settingsPage.watchedAccountsAccordion().click();
        settingsPage.watchedAccountsContainer().should('have.length', 2);
        settingsPage.hiddenAccountsAccordion().click();
        addHiddenAccount(polkadotAHMultisig1Address);
        settingsPage.hiddenAccountWatchedWarning().should('be.visible');
        settingsPage.hiddenAccountsContainer().should('not.exist');
        settingsPage.watchedAccountsAccordion().click();
        settingsPage.watchedAccountsContainer().should('have.length', 1);
    });

    it('removes a watched account if hidding a watched account', () => {
        cy.setupAndVisit({
            url: landingPageNetworkAddress({
                network: 'asset-hub-polkadot',
                address: polkadotAHMultisig1Address,
            }),
            extensionConnectionAllowed: true,
            injectExtensionWithAccounts: [testAccount2],
            watchedAccounts: [polkadotAHMultisig1Address, polkadotAHMultisig2Address],
        });
        topMenuItems.multiproxySelectorDesktop().click();
        topMenuItems.multiproxySelectorOptionDesktop().should('have.length', 2);

        // hide the watched account
        multisigPage.optionsMenuButton().click();
        multisigPage.hideAccountMenuOption().should('exist').click();
        hiddenAccountInfoModal.body().should('be.visible');
        hiddenAccountInfoModal.gotItButton().click();

        goToHiddenAccountSettings();
        settingsPage.hiddenAccountsContainer().should('not.exist');
        settingsPage.watchedAccountsAccordion().click();
        settingsPage.watchedAccountsContainer().should('not.exist');
    });
});
