import { landingPageNetwork } from '../fixtures/landingData';
import { testAccounts } from '../fixtures/testAccounts';
import { accountDisplay } from '../support/page-objects/components/accountDisplay';
import { multisigPage } from '../support/page-objects/multisigPage';
import { newMultisigPage } from '../support/page-objects/newMultisigPage';
import { notifications } from '../support/page-objects/notifications';
import { topMenuItems } from '../support/page-objects/topMenuItems';
import { landingPage } from '../support/page-objects/landingPage';
import { waitForTxRequest } from '../utils/waitForTxRequests';
import { waitForMultisigLength } from '../utils/waitForMultisigLength';

const fundedAccount1 = testAccounts['Funded Account 1 Chopsticks Kusama'];
const fundedAccount2 = testAccounts['Funded Account 2 Chopsticks Kusama'];
const fundedAccount3 = testAccounts['Funded Account 3 Chopsticks Kusama'];
const notFundedAccount4 = testAccounts['Not Funded Account 4 Chopsticks Kusama'];

const { address: address1 } = fundedAccount1;
const { address: address2 } = fundedAccount2;
const { address: address3 } = fundedAccount3;
const { address: notFundedAccountAddress } = notFundedAccount4;

const typeAndAdd = (address: string) => {
    newMultisigPage.addressSelector().click().type(`${address}{downArrow}{enter}`);
    newMultisigPage.addButton().click();
};

const acceptMultisigCreationAndVerifyNotifications = (firstMultisig = false) => {
    waitForTxRequest();
    cy.getTxRequests().then((req) => {
        const txRequests = Object.values(req);
        cy.wrap(txRequests.length).should('eq', 1);
        cy.wrap(txRequests[0].payload.address).should('eq', address1);
        newMultisigPage.nextButton().should('not.exist');
        newMultisigPage.creatingLoader().should('be.visible');
        cy.approveTx(txRequests[0].id);
        notifications.notificationWrapper(10000).should('have.length', 1);
        notifications.loadingNotificationIcon().should('be.visible');
        notifications.notificationWrapper().should('contain', 'broadcast');

        firstMultisig && landingPage.firstMultisigCreationLabel().should('be.visible');

        notifications.successNotificationIcon(30000).should('be.visible');
        notifications.notificationWrapper().should('contain', 'Tx in block');
    });
};

describe('Multisig creation', () => {
    const randomSignatory1 = 'EkZJTKtzp3bKszJ6KzBM4knZ7VJhiiSFLLCnnqKKKGNkChd';
    const randomSignatory2 = 'H7k1EusYzDfm5GUVTeS6v5wWuL4tDjFKYYmnEwzXYJqCaGY';

    beforeEach(() => {
        cy.setupAndVisit({
            url: landingPageNetwork('local'),
            extensionConnectionAllowed: true,
            injectExtensionWithAccounts: [
                fundedAccount1,
                fundedAccount2,
                fundedAccount3,
                notFundedAccount4,
            ],
        });
    });

    describe('Multisig creation - Happy path', () => {
        const verifySignatories = () => {
            multisigPage
                .signatoriesAccordion()
                .click()
                .within(() => {
                    multisigPage
                        .signatoriesList()
                        .find('li')
                        .then((liElements) => {
                            cy.wrap(liElements[0]).should('contain.text', fundedAccount1.name);
                            cy.wrap(liElements[0]).should('contain.text', address1.slice(0, 6));

                            cy.wrap(liElements[1]).should('contain.text', fundedAccount3.name);
                            cy.wrap(liElements[1]).should('contain.text', address3.slice(0, 6));

                            cy.wrap(liElements[2]).should('contain.text', fundedAccount2.name);
                            cy.wrap(liElements[2]).should('contain.text', address2.slice(0, 6));
                        });
                });
        };

        beforeEach(() => {
            topMenuItems.newMultisigButton().click();
            // Step 1
            typeAndAdd(address1);
            typeAndAdd(address2);
            typeAndAdd(address3);
            newMultisigPage.nextButton().should('contain', 'Next').click();
        });

        it('Create a multisig with a pure proxy', () => {
            const multisigName = 'Multisig with proxy';
            const expectedMultisigAddress = 'D9b1mkwhCwyRMUQZLyyKPdVkiJfFCuyVuWr3EmYAV6ETXkX';

            // Step 2
            newMultisigPage.step2.thresholdInput().type('2');
            newMultisigPage.step2.nameInput().type(multisigName);
            newMultisigPage.step2.checkboxUsePureProxy().click();
            newMultisigPage.step2.checkboxUsePureProxy().should('be.checked');
            newMultisigPage.nextButton().should('contain', 'Next').click();

            // Step 3
            newMultisigPage.step3.infoBox().should('contain', '1 batch transaction');
            newMultisigPage.step3.errorNotEnoughFunds().should('not.exist');
            newMultisigPage.nextButton().should('contain', 'Create').click();
            acceptMultisigCreationAndVerifyNotifications(true);

            // Landing Page
            multisigPage.accountHeader(10000).within(() => {
                accountDisplay
                    .addressLabel()
                    .should('contain.text', expectedMultisigAddress.slice(0, 6));
                accountDisplay.nameLabel().should('contain.text', multisigName);
            });

            verifySignatories();

            // there should be a pending pure proxy creation
            multisigPage
                .transactionList()
                .should('be.visible')
                .within(() => {
                    multisigPage.pendingTransactionItem().should('have.length', 1);
                    multisigPage
                        .pendingTransactionCallName()
                        .should('contain.text', 'Proxy.create_pure');
                });
        });

        it('Create a multisig without a pure proxy', () => {
            const multisigName = 'Multisig without proxy';
            const expectedMultisigAddress = 'F764i4HX9LvpW14injFtt9MThuifVdic8PnuPtUAVvMDiwD';
            const expectedMultisigAddressFirst6Char = expectedMultisigAddress.slice(0, 6);

            // Step 2
            newMultisigPage.step2.thresholdInput().type('3');
            newMultisigPage.step2.nameInput().type(multisigName);
            newMultisigPage.step2.checkboxUsePureProxy().should('not.be.checked');
            newMultisigPage.nextButton().should('contain', 'Next').click();

            // Step 3
            newMultisigPage.step3.infoBox().should('contain', 'you will sign a remark transaction');
            newMultisigPage.step3.errorNotEnoughFunds().should('not.exist');
            newMultisigPage.nextButton().should('contain', 'Create').click();
            acceptMultisigCreationAndVerifyNotifications();

            // The banner should be there, and disapear within 30s
            landingPage.multisigCreationInfoBanner().should('be.visible');
            landingPage.creationInfoBannerCloseButton().click();

            // The banner should disappear
            landingPage.multisigCreationInfoBanner().should('not.exist');

            waitForMultisigLength(2);

            topMenuItems
                .desktopMenu()
                .within(() =>
                    topMenuItems
                        .multiproxySelectorDesktop()
                        .click()
                        .type(`${expectedMultisigAddressFirst6Char}{downArrow}{enter}`),
                );

            // Landing Page
            multisigPage.accountHeader(10000).within(() => {
                accountDisplay
                    .addressLabel()
                    .should('contain.text', expectedMultisigAddressFirst6Char);
                accountDisplay.nameLabel().should('contain.text', multisigName);
                accountDisplay.watchedIcon().should('not.exist');
            });

            verifySignatories();

            // there should be a pending remark
            multisigPage
                .transactionList()
                .should('be.visible')
                .within(() => {
                    multisigPage.pendingTransactionItem().should('have.length', 1);
                    multisigPage
                        .pendingTransactionCallName()
                        .should('contain.text', 'System.remark');
                });
        });
    });

    describe('Multisig creation - step 1', () => {
        beforeEach(() => {
            topMenuItems.newMultisigButton().click();
        });

        it('Does not allow to click next => when creating a multisig with less than 2 Signatories selected', () => {
            typeAndAdd(address1);

            newMultisigPage.nextButton().should('be.disabled');
        });

        it('Allows signatories without a name', () => {
            typeAndAdd(address1);

            newMultisigPage.addressSelector().click().type(`${randomSignatory1}{downArrow}{enter}`);
            newMultisigPage.step1.accountNameInput().should('have.value', '');
            newMultisigPage.addButton().click();

            newMultisigPage.step1
                .signatoryItem(randomSignatory1)
                .should('be.visible')
                .within(() => {
                    accountDisplay.nameLabel().should('have.text', '');
                });

            newMultisigPage.nextButton().should('be.enabled');
        });

        it('Shows an error message => when signatory address is invalid', () => {
            typeAndAdd(randomSignatory1.slice(0, 10));

            newMultisigPage.step1
                .addAccountError()
                .should('be.visible')
                .and('contain', 'Invalid address');
        });

        it('Shows a warning => when signatory addresses do not contain a account owned', () => {
            typeAndAdd(randomSignatory1);
            typeAndAdd(randomSignatory2);

            newMultisigPage.step1
                .createMutlisigError()
                .should('be.visible')
                .and('contain', 'At least one of your own accounts must be a signatory.');

            newMultisigPage.nextButton().should('be.disabled');
        });

        it('Shows an error => when the same signatory addresses is added twice', () => {
            typeAndAdd(randomSignatory1);
            typeAndAdd(randomSignatory1);

            newMultisigPage.step1
                .addAccountError()
                .should('be.visible')
                .and('contain', 'Account already added');
            newMultisigPage.nextButton().should('be.disabled');
        });
    });

    describe('Multisig creation - step 2', () => {
        beforeEach(() => {
            topMenuItems.newMultisigButton().click();
        });

        it('Shows a warning => when threshold is too high or low', () => {
            typeAndAdd(address1);
            typeAndAdd(address2);

            newMultisigPage.nextButton().should('contain', 'Next').click();
            const warningMessage = 'Threshold must be between';

            // When is too high
            newMultisigPage.step2.thresholdInput().type('3');
            newMultisigPage.step2
                .thresholdWarning()
                .should('be.visible')
                .and('contain', warningMessage);
            newMultisigPage.nextButton().should('contain', 'Next').and('be.disabled');

            // When is too low
            newMultisigPage.step2.thresholdInput().type('0');
            newMultisigPage.step2
                .thresholdWarning()
                .should('be.visible')
                .and('contain', warningMessage);
            newMultisigPage.nextButton().should('contain', 'Next').and('be.disabled');

            // When is valid
            newMultisigPage.step2.thresholdInput().type('2');
            newMultisigPage.step2.thresholdWarning().should('not.exist');
            newMultisigPage.nextButton().should('contain', 'Next').and('be.enabled');
        });
    });

    describe('Multisig creation - step 3', () => {
        beforeEach(() => {
            topMenuItems.newMultisigButton().click();
        });

        it('Shows an error => if the funds are not sufficient to create Multisig', () => {
            typeAndAdd(notFundedAccountAddress);
            typeAndAdd(address1);

            newMultisigPage.nextButton().should('contain', 'Next').click();
            newMultisigPage.step2.thresholdInput().type('2');
            newMultisigPage.nextButton().should('contain', 'Next').click();

            newMultisigPage
                .addressSelector()
                .click()
                .clear()
                .type(`${notFundedAccountAddress}{downArrow}{enter}`);

            newMultisigPage.step3
                .errorNotEnoughFunds()
                .should('be.visible')
                .and('contain', "The selected signer doesn't have the required");
            newMultisigPage.nextButton().should('contain', 'Create').and('be.disabled');
        });
    });
});
