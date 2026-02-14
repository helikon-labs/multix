export const editNamesModal = {
    body: () => cy.get('[data-cy=modal-edit-names]'),
    inputEditPureName: () => cy.get('[data-cy=input-edit-pure-name]'),
    inputEditMultisigName: () => cy.get('[data-cy=input-edit-multisig-name]'),
    inputEditSignatoryName: () => cy.get('[data-cy=input-edit-signatory-name]'),
    saveButton: () => cy.get('[data-cy=button-save-edited-names]'),
};
