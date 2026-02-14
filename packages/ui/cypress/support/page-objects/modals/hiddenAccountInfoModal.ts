export const hiddenAccountInfoModal = {
    body: () => cy.get('[data-cy=modal-hidden-account-info]'),
    gotItButton: () => cy.get('[data-cy=button-hidden-account-info-gotit]'),
    checkBoxMessage: () => cy.get('[data-cy=checkbox-dont-show-again]'),
};
