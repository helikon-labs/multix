export const settingsPage = {
    // watch account section
    watchedAccountsAccordion: () => cy.get('[data-cy=accordion-title-watched-accounts]'),
    watchedAccountsInputsWrapper: () => cy.get('[data-cy=wrapper-watched-accounts-inputs]'),
    hiddenAccountsAccordion: () => cy.get('[data-cy=accordion-title-hidden-accounts]'),
    hiddenAccountsInputsWrapper: () => cy.get('[data-cy=wrapper-hidden-accounts-inputs]'),
    accountAddressInput: () => cy.get('[data-cy=input-account-address]'),
    accountNameInput: () => cy.get('[data-cy=input-account-name]'),
    addButton: () => cy.get('[data-cy=button-add-account]'),
    watchedAccountsContainer: () =>
        cy.get('[data-cy=container-account-details]', { timeout: 20000 }),
    hiddenAccountsContainer: () =>
        cy.get('[data-cy=container-hidden-account-details]', { timeout: 20000 }),
    watchedAccountDeleteButton: () => cy.get('[data-cy=button-delete-watched-account]'),
    hiddenAccountDeleteButton: () => cy.get('[data-cy=button-delete-hidden-account]'),
    errorLabel: () => cy.get('[data-cy=label-add-account-error]'),
    // wallet connect section
    wallectConnectAccordion: () => cy.get('[data-cy=accordion-title-wallet-connect]'),
    walletConnectAlert: () => cy.get('[data-cy=alert-wallet-connect-warning]'),
    connectDappButton: () => cy.get('[data-cy=button-connect-dapp]'),
    walletConnectKeyInput: () => cy.get('[data-cy=input-wallet-connect-key]'),
    tooltipInfoIcon: () => cy.get('[data-cy=tooltip-wallet-connect-info]'),
    hiddenAccountWatchedWarning: () => cy.get('[data-cy=alert-removed-watched-account]'),
};
