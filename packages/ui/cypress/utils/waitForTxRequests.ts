export const waitForTxRequest = () =>
    cy.waitUntil(() => cy.getTxRequests().then((req) => Object.entries(req).length > 0));
