import { accountDisplay } from '../support/page-objects/components/accountDisplay';
import {
    landingPageUrl,
    getSettingsPageUrl,
    getSettingsPageWatchAccountUrl,
} from '../fixtures/landingData';
import { landingPage } from '../support/page-objects/landingPage';
import { settingsPage } from '../support/page-objects/settingsPage';
import { topMenuItems } from '../support/page-objects/topMenuItems';
import { multisigPage } from '../support/page-objects/multisigPage';
import { editNamesModal } from '../support/page-objects/modals/editNamesModal';
import { testAccounts } from '../fixtures/testAccounts';
import { knownMultisigs } from '../fixtures/knownMultisigs';
import { getShortAddress } from '../utils/getShortAddress';

const addWatchAccount = (address: string, name?: string) => {
    settingsPage.watchedAccountsInputsWrapper().within(() => {
        settingsPage.accountAddressInput().type(`${address}{enter}`, { delay: 20, timeout: 8000 });
        if (name) {
            settingsPage.accountNameInput().type(name);
        }

        settingsPage.addButton().should('be.enabled');
        settingsPage.addButton().click();
    });
};

const { name: testAccountName, address: testAccountAddress } =
    testAccounts['Multisig Member Account 1'];

describe('Watched Accounts', () => {
    it('can add an account with a name to the watch list', () => {
        cy.visit(landingPageUrl);
        landingPage.watchAccountButton().click();
        addWatchAccount(testAccountAddress, testAccountName);
        settingsPage.watchedAccountsContainer().should('be.visible');
        settingsPage.watchedAccountsContainer().within(() => {
            accountDisplay.identicon().should('be.visible');
            accountDisplay.addressLabel().should('be.visible');
            accountDisplay.nameLabel().should('be.visible');
            settingsPage.watchedAccountDeleteButton().should('be.visible');
        });
    });

    it('can add without a name, and remove an account from the watch list', () => {
        // add an account first
        cy.visit(getSettingsPageWatchAccountUrl());
        addWatchAccount(testAccountAddress);
        settingsPage.watchedAccountsContainer().should('be.visible');

        cy.log('remove account');
        // now remove it
        settingsPage.watchedAccountsContainer().within(() => {
            settingsPage.watchedAccountDeleteButton().click();
            accountDisplay.identicon().should('not.exist');
            accountDisplay.addressLabel().should('not.exist');
        });
        settingsPage.watchedAccountsContainer().should('not.exist');
    });

    it('can see an error when attempting to add same address more than once', () => {
        // add an account first
        cy.visit(getSettingsPageWatchAccountUrl());
        addWatchAccount(testAccountAddress);
        settingsPage.watchedAccountsContainer().should('be.visible').should('have.length', 1);
        // attempt to add the same account again
        addWatchAccount(testAccountAddress);
        settingsPage.errorLabel().should('be.visible').should('have.text', 'Account already added');
        settingsPage.watchedAccountsContainer().should('have.length', 1);
        settingsPage.addButton().should('be.disabled');
    });

    it('can see an error when attempting to add an invalid address', () => {
        cy.visit(getSettingsPageWatchAccountUrl());
        addWatchAccount('123');
        settingsPage.errorLabel().should('be.visible').should('have.text', 'Invalid address');
        settingsPage.watchedAccountsContainer().should('have.length', 0);
        settingsPage.addButton().should('be.disabled');
    });

    it('can see the expected account details displayed for a watched multisig', () => {
        const { name: multisigName, publicKey: multisigPublicKey } =
            knownMultisigs['multisigs-unique-users'];

        cy.setupAndVisit({
            url: getSettingsPageWatchAccountUrl(),
            accountNames: {
                [multisigPublicKey]: multisigName,
            },
            watchedAccounts: [multisigPublicKey],
        });
        // ensure the multisig name is displayed in the settings account container
        settingsPage.watchedAccountsContainer().within(() => {
            accountDisplay.identicon().should('be.visible');
            accountDisplay.nameLabel().should('be.visible').should('have.text', multisigName);
        });
        // ensure the name is included in the selectable drop-down option
        topMenuItems.multiproxySelectorDesktop().should('be.visible').click();
        topMenuItems.multiproxySelectorOptionDesktop().within(() => {
            accountDisplay.identicon().should('be.visible');
            accountDisplay.multisigBadge().should('be.visible');
            accountDisplay.watchedIcon().should('be.visible');
            accountDisplay.pureBadge().should('not.exist');
            accountDisplay.nameLabel().should('have.text', multisigName);
        });
        // ensure the name is displayed in the home page header
        topMenuItems.homeButton().click();
        multisigPage.accountHeader().within(() => {
            accountDisplay.identicon().should('be.visible');
            accountDisplay.multisigBadge().should('be.visible');
            accountDisplay.watchedIcon().should('be.visible');
            accountDisplay.pureBadge().should('not.exist');
            accountDisplay.nameLabel().should('have.text', multisigName);
        });
    });

    it('can see the expected account details displayed for a watched pure', () => {
        const { name: pureName, purePublicKey } = knownMultisigs['watched-multisig-with-pure'];

        cy.setupAndVisit({
            url: getSettingsPageWatchAccountUrl(),
            accountNames: {
                [purePublicKey]: pureName,
            },
            watchedAccounts: [purePublicKey],
        });
        // ensure the multisig name is displayed in the settings account container
        settingsPage.watchedAccountsContainer().within(() => {
            accountDisplay.identicon().should('be.visible');
            accountDisplay.nameLabel().should('be.visible').should('have.text', pureName);
        });
        // ensure the name is included in the selectable drop-down option
        topMenuItems.multiproxySelectorDesktop().should('be.visible').click();
        topMenuItems.multiproxySelectorOptionDesktop().within(() => {
            accountDisplay.identicon().should('be.visible');
            accountDisplay.pureBadge().should('be.visible');
            accountDisplay.watchedIcon().should('be.visible');
            accountDisplay.multisigBadge().should('not.exist');
            accountDisplay.nameLabel().should('have.text', pureName);
        });
        // navigate to the multisig page and ensure the name is included in the home page header
        topMenuItems.homeButton().click();
        multisigPage.accountHeader().within(() => {
            accountDisplay.identicon().should('be.visible');
            accountDisplay.pureBadge().should('be.visible');
            accountDisplay.watchedIcon().should('be.visible');
            accountDisplay.multisigBadge().should('not.exist');
            accountDisplay.nameLabel().should('have.text', pureName);
        });
    });

    it('can edit the name of a watched pure', () => {
        const { name: pureName, purePublicKey } = knownMultisigs['watched-multisig-with-pure'];

        cy.setupAndVisit({
            url: landingPageUrl,
            accountNames: {
                [purePublicKey]: pureName,
            },
            watchedAccounts: [purePublicKey],
        });
        multisigPage.optionsMenuButton().click();
        multisigPage.editNamesMenuOption().click();
        editNamesModal.body().should('be.visible');
        cy.clock();
        editNamesModal.inputEditPureName().type(`{selectall}{del}${`Edited Name Test`}`);
        // name edition is debounced by 300ms
        cy.tick(300);
        editNamesModal.saveButton().should('be.enabled').click();
        // ensure the edited name is now displayed in the home page header
        multisigPage.accountHeader().within(() => {
            accountDisplay.nameLabel().should('have.text', 'Edited Name Test');
        });
        // navigate to settings and ensure the edited name is displayed
        topMenuItems.settingsButton().click();
        settingsPage.watchedAccountsAccordion().click();
        settingsPage.watchedAccountsContainer().within(() => {
            accountDisplay.nameLabel().should('have.text', 'Edited Name Test');
        });
    });

    it('can open the correct subscan link for a watched pure', () => {
        const { purePublicKey, name: pureName, pureAddress } = knownMultisigs['multisig-with-pure'];

        cy.setupAndVisit({
            url: landingPageUrl,
            accountNames: {
                [purePublicKey]: pureName,
            },
            watchedAccounts: [purePublicKey],
        });
        multisigPage.optionsMenuButton().click();
        multisigPage.subscanMenuOption().should('be.visible');
        // stub window.open to prevent opening a new tab
        cy.window().then((win) => {
            cy.stub(win, 'open').as('open');
        });
        multisigPage.subscanMenuOption().click();
        // ensure the correct subscan url is opened
        cy.get('@open').should(
            'have.been.calledOnceWith',
            `https://paseo.subscan.io/account/${pureAddress}`,
        );
    });

    it('can not see the "New Transaction" button when in watched account mode', () => {
        const { purePublicKey } = knownMultisigs['watched-multisig-with-pure'];

        cy.setupAndVisit({
            url: landingPageUrl,
            watchedAccounts: [purePublicKey],
        });
        multisigPage.accountHeader().should('be.visible');
        multisigPage.newTransactionButton().should('not.exist');
    });

    it('can not utilize wallet connect when in watched account mode', () => {
        const { purePublicKey } = knownMultisigs['watched-multisig-with-pure'];

        cy.setupAndVisit({
            url: getSettingsPageUrl(),
            watchedAccounts: [purePublicKey],
        });
        settingsPage.wallectConnectAccordion().click();
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

    it('can see but not interact with txs when in watched account mode', () => {
        const { purePublicKey } = knownMultisigs['multisig-with-pure'];

        cy.setupAndVisit({
            url: landingPageUrl,
            watchedAccounts: [purePublicKey],
        });
        multisigPage.accountHeader().should('be.visible');
        multisigPage
            .transactionList()
            .should('be.visible')
            .within(() => {
                multisigPage.pendingTransactionItem().should('have.length', 1);
                multisigPage.reviewButton().should('not.exist');
            });
    });

    it('can see the same details displayed when watching a pure or its multisig address', () => {
        const {
            purePublicKey,
            pureAddress,
            publicKey: multisigPublicKey,
            address: multisigAddress,
        } = knownMultisigs['watched-multisig-with-pure'];

        const pureCheck = () => {
            multisigPage
                .accountHeader(6000)
                .should('be.visible')
                .within(() => {
                    accountDisplay
                        .addressLabel()
                        .should('be.visible')
                        .and('contain.text', pureAddress.slice(0, 6));
                    accountDisplay.watchedIcon().should('be.visible');
                });
            multisigPage.multisigDetailsContainer().within(() => {
                multisigPage.multisigAccountSummary().within(() => {
                    accountDisplay
                        .addressLabel()
                        .should('be.visible')
                        .and('contain.text', multisigAddress.slice(0, 6));
                    accountDisplay.watchedIcon().should('be.visible');
                });
            });
            topMenuItems.multiproxySelectorDesktop().should('be.visible').click();
            topMenuItems
                .multiproxySelectorOptionDesktop()
                .should('have.length', 1)
                .within(() => {
                    accountDisplay.pureBadge().should('be.visible');
                    accountDisplay.watchedIcon().should('be.visible');
                    accountDisplay
                        .addressLabel()
                        .should('be.visible')
                        .and('contain.text', pureAddress.slice(0, 6));
                });
        };

        // watch the pure public key
        cy.setupAndVisit({
            url: landingPageUrl,
            watchedAccounts: [purePublicKey],
        });
        // ensure expected display when watching via the public key
        pureCheck();

        // now watch via the multisig public key and ensure that we see the same details displayed
        cy.setupAndVisit({
            url: landingPageUrl,
            watchedAccounts: [multisigPublicKey],
        });
        // ensure the pure address is still displayed in the account header
        pureCheck();
    });

    it('can see all multisigs that a watched signatory is a member of', () => {
        const { publicKey: signatoryPublicKey } = testAccounts['Multisig Member Account 1'];
        const expectedMultiproxies = [
            {
                address: knownMultisigs['test-simple-multisig-1'].address,
                expectedBadge: 'multi',
            },
            {
                address: knownMultisigs['multisig-with-pure'].pureAddress,
                expectedBadge: 'pure',
            },
        ];

        cy.setupAndVisit({
            url: landingPageUrl,
            watchedAccounts: [signatoryPublicKey!],
        });
        topMenuItems.multiproxySelectorDesktop().should('be.visible').click();
        // ensure all multisigs are displayed in the multiproxy selector
        topMenuItems
            .multiproxySelectorOptionDesktop()
            .should('have.length', expectedMultiproxies.length)
            .each(($el) => {
                cy.wrap($el).within(() => {
                    accountDisplay
                        .addressLabel()
                        .invoke('text')
                        .then((address) => {
                            const account = expectedMultiproxies.find((a) => {
                                return (
                                    getShortAddress(a.address) === (address as unknown as string)
                                );
                            });
                            cy.wrap(account).should('not.be.undefined');
                            accountDisplay.watchedIcon().should('be.visible');
                            if (account?.expectedBadge === 'pure') {
                                accountDisplay.pureBadge().should('be.visible');
                            } else {
                                accountDisplay.multisigBadge().should('be.visible');
                            }
                        });
                });
            });
        // ensure each multisig that the signatory is a member of can be viewed
        expectedMultiproxies.forEach(({ address }) => {
            topMenuItems
                .multiproxySelectorDesktop()
                .click()
                .type(`${address.slice(0, 6)}{downArrow}{enter}`);

            multisigPage
                .accountHeader()
                .should('be.visible')
                .within(() => {
                    accountDisplay.addressLabel().should('contain.text', address.slice(0, 6));
                    accountDisplay.watchedIcon().should('be.visible');
                });
        });
    });
});
