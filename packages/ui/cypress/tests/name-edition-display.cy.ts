import { accountDisplay } from '../support/page-objects/components/accountDisplay';
import { getSettingsPageWatchAccountUrl, landingPageNetwork } from '../fixtures/landingData';
import { settingsPage } from '../support/page-objects/settingsPage';
import { topMenuItems } from '../support/page-objects/topMenuItems';
import { multisigPage } from '../support/page-objects/multisigPage';
import { multisigWithKusamaIdentity } from '../fixtures/nameDisplay';
import { knownMultisigs } from '../fixtures/knownMultisigs';

describe('Name Edition and Display', () => {
    it('can see the edit button with no name', () => {
        const { purePublicKey } = knownMultisigs['watched-multisig-with-pure'];

        cy.setupAndVisit({
            url: getSettingsPageWatchAccountUrl('polkadot'),
            watchedAccounts: [purePublicKey],
        });

        settingsPage.watchedAccountsContainer().within(() => {
            accountDisplay.identicon().should('be.visible');
            accountDisplay.addressLabel().should('be.visible');
            accountDisplay.noNameLabel().should('have.text', 'No Name');
            accountDisplay.nameEditButton().should('be.visible');
        });
    });

    it('can edit with no name before', () => {
        const { purePublicKey } = knownMultisigs['watched-multisig-with-pure'];
        const newName = 'some name';
        const newName2 = 'new name 2';
        cy.setupAndVisit({
            url: getSettingsPageWatchAccountUrl('polkadot'),
            watchedAccounts: [purePublicKey],
        });

        settingsPage.watchedAccountsContainer().within(() => {
            accountDisplay.nameEditButton().click();
            accountDisplay.nameEditionInput().should('be.focused');
            // editing with enter
            accountDisplay.nameEditionInput().type(`${newName}{Enter}`);
            accountDisplay.nameEditionInput().should('not.exist');
            accountDisplay.nameLabel().should('have.text', newName);
            accountDisplay.noNameLabel().should('not.exist');

            //editing with validate button
            accountDisplay.nameEditButton().click();
            accountDisplay.nameEditionInput().should('have.value', newName);
            accountDisplay.nameEditionInput().type(`{selectAll}${newName2}`);
            accountDisplay.validateEditButton().click();
            accountDisplay.nameEditionInput().should('not.exist');
            accountDisplay.nameLabel().should('have.text', newName2);
            accountDisplay.noNameLabel().should('not.exist');
        });
    });

    it('can edit and cancel with a name before', () => {
        const { purePublicKey } = knownMultisigs['watched-multisig-with-pure'];
        const originalName = 'some name';
        const newName = 'new name';
        cy.setupAndVisit({
            url: getSettingsPageWatchAccountUrl('polkadot'),
            watchedAccounts: [purePublicKey],
            accountNames: { [purePublicKey]: originalName },
        });

        settingsPage.watchedAccountsContainer().within(() => {
            //edit and cancel with Escape
            accountDisplay.nameEditButton().click();
            accountDisplay.nameEditionInput().should('have.value', originalName);
            accountDisplay.nameEditionInput().type(`{selectAll}${newName}{esc}`);
            accountDisplay.nameEditionInput().should('not.exist');
            accountDisplay.nameLabel().should('have.text', originalName);
            accountDisplay.noNameLabel().should('not.exist');

            //edit and cancel with cancel button
            accountDisplay.nameEditButton().click();
            accountDisplay.nameEditionInput().should('have.value', originalName);
            accountDisplay.nameEditionInput().type(`{selectAll}${newName}`);
            accountDisplay.cancelEditButton().click();
            accountDisplay.nameEditionInput().should('not.exist');
            accountDisplay.nameLabel().should('have.text', originalName);
            accountDisplay.noNameLabel().should('not.exist');

            //back to no name
            accountDisplay.nameEditButton().click();
            accountDisplay.nameEditionInput().should('have.value', originalName);
            accountDisplay.nameEditionInput().type(`{selectAll}{del}{enter}`);
            accountDisplay.nameEditionInput().should('not.exist');
            accountDisplay.nameLabel().should('be.empty');
            accountDisplay.noNameLabel().should('have.text', 'No Name');
        });
    });

    it('can display a local name with identity', () => {
        const { publicKey, address } = multisigWithKusamaIdentity;
        const originalName = 'some name';

        cy.setupAndVisit({
            url: landingPageNetwork('kusama'),
            watchedAccounts: [publicKey],
            accountNames: { [publicKey]: originalName },
        });

        // show the local name
        topMenuItems.multiproxySelectorInputDesktop().should('have.value', originalName);

        multisigPage
            .accountHeader()
            .should('be.visible')
            .within(() => {
                accountDisplay.addressLabel().should('contain.text', address.slice(0, 6));
                accountDisplay.nameLabel().should('have.text', originalName);
                accountDisplay.identityIcon().should('be.visible');
                accountDisplay.subIdentityLabel().should('not.exist');
            });
    });

    it('can edit a local name with identity', () => {
        const { publicKey } = multisigWithKusamaIdentity;
        const originalName = 'some name';
        const newName = 'new name';

        cy.setupAndVisit({
            url: landingPageNetwork('kusama'),
            watchedAccounts: [publicKey],
            accountNames: { [publicKey]: originalName },
        });

        // show the local name
        topMenuItems.multiproxySelectorInputDesktop().should('have.value', originalName);

        multisigPage
            .accountHeader()
            .should('be.visible')
            .within(() => {
                accountDisplay.nameEditButton().click();
                accountDisplay.nameEditionInput().should('have.value', originalName);
                accountDisplay.nameEditionInput().type(`{selectAll}${newName}{Enter}`);
            });

        topMenuItems.multiproxySelectorInputDesktop().should('have.value', newName);
    });

    it('can delete local name and see identity and sub', () => {
        const { publicKey, identityMain, subIdentity } = multisigWithKusamaIdentity;
        const originalName = 'some name';

        cy.setupAndVisit({
            url: landingPageNetwork('kusama'),
            watchedAccounts: [publicKey],
            accountNames: { [publicKey]: originalName },
        });

        // show the local name
        topMenuItems.multiproxySelectorInputDesktop().should('have.value', originalName);

        multisigPage
            .accountHeader()
            .should('be.visible')
            .within(() => {
                accountDisplay.nameEditButton().click();
                accountDisplay.nameEditionInput().should('have.value', originalName);

                // remove the local name shows the identity name and sub
                accountDisplay.nameEditionInput().type(`{selectAll}{del}{Enter}`);
                accountDisplay.identityIcon().should('be.visible');
                accountDisplay.nameLabel().should('have.text', `${identityMain}/${subIdentity}`);
            });

        topMenuItems.multiproxySelectorInputDesktop().should('have.value', identityMain);
    });
});
