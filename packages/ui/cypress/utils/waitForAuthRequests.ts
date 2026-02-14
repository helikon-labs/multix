export const waitForAuthRequest = () =>
    cy.waitUntil(() => cy.getAuthRequests().then((req) => Object.entries(req).length > 0));
