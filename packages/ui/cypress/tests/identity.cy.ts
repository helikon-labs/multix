import { SignerPayloadJSON } from 'polkadot-api/pjs-signer';
import { extrinsicsDisplayAccounts } from '../fixtures/extrinsicsDisplayAccounts';
import { landingPageNetwork, landingPageNetworkAddress } from '../fixtures/landingData';
import { westendMemberAccount } from '../fixtures/westendAccounts';
import { multisigPage } from '../support/page-objects/multisigPage';
import { sendTxModal } from '../support/page-objects/sendTxModal';
import { waitForTxRequest } from '../utils/waitForTxRequests';
// import { waitForTxRequest } from '../utils/waitForTxRequests'

describe('Set an identity', () => {
    // we only support identity on the ppl chain with system chains
    it('Does not have the identity option if it is a parachain', () => {
        cy.setupAndVisit({
            url: landingPageNetwork('hydration'),
            extensionConnectionAllowed: true,
            injectExtensionWithAccounts: [extrinsicsDisplayAccounts['Alice']],
        });
        multisigPage.accountHeader(8000).should('exist');
        multisigPage.optionsMenuButton().click();
        multisigPage.setIdentityMenuOption().should('not.exist');

        //click outside to close the menu
        cy.get('body').click(0, 0);
        multisigPage.newTransactionButton().click();
        sendTxModal.selectEasySetup().should('contain', 'Send tokens').click();
        sendTxModal.selectionEasySetupSetIdentity().should('not.exist');
    });

    it('Does not have the ability to set a an identity on a pure proxy', () => {
        cy.setupAndVisit({
            url: landingPageNetworkAddress({
                network: 'polkadot',
                address: westendMemberAccount.polkadotMultisigNoIdentity.expectedPure.address,
            }),
            extensionConnectionAllowed: true,
            injectExtensionWithAccounts: [westendMemberAccount.polkadotMultisigNoIdentity.account],
        });
        const first5DigitsAddress =
            westendMemberAccount.polkadotMultisigNoIdentity.expectedPure.address.slice(0, 4);
        multisigPage.accountHeader().should('contain', first5DigitsAddress);

        multisigPage.optionsMenuButton().click();
        multisigPage.setIdentityMenuOption().should('not.exist');

        //click outside to close the menu
        cy.get('body').click(0, 0);
        multisigPage.newTransactionButton().click();
        sendTxModal.selectEasySetup().should('contain', 'Send tokens').click();
        sendTxModal.selectionEasySetupSetIdentity().should('not.exist');
    });

    it('Can set an identity from the options menu', () => {
        cy.setupAndVisit({
            url: landingPageNetworkAddress({
                network: 'westend',
                address: westendMemberAccount.noIdentity.expectedSingleMultisig.westendAddress,
            }),
            extensionConnectionAllowed: true,
            injectExtensionWithAccounts: [westendMemberAccount.noIdentity.account],
        });
        multisigPage.optionsMenuButton().click();
        multisigPage.setIdentityMenuOption().should('be.visible').click();
        sendTxModal.sendTxTitle().should('be.visible');
        sendTxModal.setIdentitySection().should('be.visible');

        // every field is empty to start with
        sendTxModal.setIdentityFieldInput('display').should('have.value', '');
        sendTxModal.setIdentityFieldInput('legal').should('have.value', '');

        // typing into legal with empty display should show an error
        sendTxModal.setIdentityField('legal').type('le');
        sendTxModal.sendTxError().should('contain', 'Display name is required');
        sendTxModal.setIdentityFieldElement('display', 'label').should('have.class', 'Mui-error');
        sendTxModal.setIdentityFieldElement('display', 'div').should('have.class', 'Mui-error');
        sendTxModal.buttonSend().should('be.disabled');

        // typing into display should remove the error
        sendTxModal.setIdentityField('display').type('diis');
        sendTxModal.sendTxError().should('not.exist');
        sendTxModal
            .setIdentityFieldElement('display', 'label')
            .should('not.have.class', 'Mui-error');
        sendTxModal.buttonSend().should('be.enabled');

        // typing a too long field should show another error
        sendTxModal.setIdentityField('legal').type('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
        sendTxModal.sendTxError().should('contain', 'A field exceeds the 32 character limit');
        sendTxModal.setIdentityFieldElement('legal', 'label').should('have.class', 'Mui-error');
        sendTxModal.buttonSend().should('be.disabled');

        // too many bytes should show the From error
        sendTxModal.setIdentityField('legal').type('{selectall}{del}aaaaaaaaaaaaaaaaaaa');
        sendTxModal.setIdentityFieldElement('legal', 'label').should('not.have.class', 'Mui-error');
        sendTxModal.sendTxError().should('contain', `The "From" account doesn't have`);
        sendTxModal.sendTxError().should('contain', `People Chain`);
        sendTxModal.buttonSend().should('be.disabled');

        // removing should remove the error
        cy.clock();
        sendTxModal.setIdentityField('legal').type('{selectall}{del}leeg');
        // there's a 300ms debounce for the extrinsic to be set
        cy.tick(300);
        sendTxModal.sendTxError().should('not.exist');
        sendTxModal.setIdentityFieldElement('legal', 'label').should('not.have.class', 'Mui-error');
        sendTxModal.buttonSend().should('be.enabled');

        // verify the tx it sends
        sendTxModal.buttonSend().click();
        waitForTxRequest();
        cy.getTxRequests().then((req) => {
            const txRequests = Object.values(req);
            cy.wrap(txRequests.length).should('eq', 1);
            cy.wrap(txRequests[0].payload.address).should(
                'eq',
                westendMemberAccount.noIdentity.account.address,
            );
            sendTxModal.buttonSend().should('not.exist');
            sendTxModal.buttonSending().should('be.visible');
            cy.wrap((txRequests[0].payload as SignerPayloadJSON).method).should(
                'eq',
                '0x2901020008ecdd548c83457ab43caf7867e2bef91ef783025db9659afd89794ec1220acf29f4a90345684cadbe61ae32508309122d710c30772408b5d8e02973d188b361200032010564696973056c65656700000000000000000000',
            );
        });
    });

    it('Can edit an identity from the new tx button', () => {
        cy.setupAndVisit({
            url: landingPageNetworkAddress({
                network: 'westend',
                address: westendMemberAccount.hidden.expectedSingleMultisig.westendAddress,
            }),
            extensionConnectionAllowed: true,
            injectExtensionWithAccounts: [westendMemberAccount.hidden.account],
        });
        // select the right multisig (Alice has a lot)
        const first5DigitsAddress =
            westendMemberAccount.hidden.expectedSingleMultisig.westendAddress.slice(0, 4);
        // topMenuItems
        //   .desktopMenu()
        //   .within(() =>
        //     topMenuItems
        //       .multiproxySelectorDesktop()
        //       .click()
        //       .type(`${first5DigitsAddress}{downArrow}{enter}`)
        //   )
        multisigPage.accountHeader().should('contain', first5DigitsAddress);

        multisigPage.newTransactionButton().click();
        sendTxModal.selectEasySetup().should('contain', 'Send tokens').click();
        sendTxModal.selectionEasySetupSetIdentity().click();

        const expectedIdentity = {
            display: 'to be hidden',
            twitter: '@hidden',
            email: 'hey@hidden.xyz',
        };

        // Some fields should be pre-filled
        sendTxModal.setIdentityFieldInput('display').should('have.value', expectedIdentity.display);
        sendTxModal.setIdentityFieldInput('email').should('have.value', expectedIdentity.email);
        sendTxModal.setIdentityFieldInput('twitter').should('have.value', expectedIdentity.twitter);

        // Remove the Display and we should have an error
        sendTxModal.setIdentityField('display').type('{selectall}{del}');
        sendTxModal.sendTxError().should('contain', 'Display name is required');
        sendTxModal.setIdentityFieldElement('display', 'div').should('have.class', 'Mui-error');
        sendTxModal.buttonSend().should('be.disabled');
    });
});
