import { landingPage } from '../support/page-objects/landingPage';
import { topMenuItems } from '../support/page-objects/topMenuItems';
import { waitForAuthRequest } from './waitForAuthRequests';

export const clickOnConnect = () => {
    topMenuItems.connectButton().click();
    landingPage.connectionDialog().should('exist');
    landingPage
        .connectionDialog()
        .within(() => cy.get('button', { includeShadowDom: true }).contains('Connect').click());
    waitForAuthRequest();
    landingPage
        .connectionDialog()
        .within(() => cy.get('#close-button', { includeShadowDom: true }).click());
};
