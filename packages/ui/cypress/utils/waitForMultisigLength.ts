import { multisigPage } from '../support/page-objects/multisigPage';
import { topMenuItems } from '../support/page-objects/topMenuItems';

export const waitForMultisigLength = (length: number) =>
    cy.waitUntil(() => {
        multisigPage.accountHeader().click();
        return topMenuItems
            .multiproxySelectorDesktop()
            .click()
            .then(() => {
                return topMenuItems
                    .multiproxySelectorOptionDesktop()
                    .then((el) => el.length === length);
            });
    });
