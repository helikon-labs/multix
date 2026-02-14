export const newMultisigPage = {
    addButton: () => cy.get('[data-cy=button-add-account]'),
    nextButton: () => cy.get('[data-cy=button-next]'),
    creatingLoader: () => cy.get('[data-cy=button-creating-loader'),
    addressSelector: () => cy.get('[data-cy=input-account-address]'),

    step1: {
        accountNameInput: () => cy.get('[data-cy=input-account-name]'),
        addAccountError: () => cy.get('[data-cy=label-add-account-error]'),
        createMutlisigError: () => cy.get('[data-cy=container-create-multisig-error]'),
        signatoryItem: (address: string) => cy.get(`[data-cy=item-signatory-${address}]`),
    },
    step2: {
        thresholdWarning: () => cy.get('[data-cy=input-warning-message]'),
        thresholdInput: () => cy.get('[data-cy=input-threshold-creation'),
        nameInput: () => cy.get('[data-cy=input-name-creation'),
        checkboxUsePureProxy: () => cy.get('[data-cy=checkbox-use-pure-proxy]'),
    },
    step3: {
        infoBox: () => cy.get('[data-cy=label-creation-info]'),
        errorNotEnoughFunds: () => cy.get('[data-cy=alert-insufficient-funds]'),
    },
};
