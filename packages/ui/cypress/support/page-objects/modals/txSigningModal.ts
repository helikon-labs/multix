export const txSigningModal = {
    body: () => cy.get('[data-cy=modal-tx-signing]'),
    callHashLabel: () => cy.get('[data-cy=label-call-hash]'),
    approveButton: () => cy.get('[data-cy=button-approve-tx]'),
    executeButton: () => cy.get('[data-cy=button-execute-tx]'),
    rejectButton: () => cy.get('[data-cy=button-reject-tx]'),
    callDataInput: () => cy.get('[data-cy=input-call-data]'),
    callInfoContainer: () => cy.get('[data-cy=container-call-info]'),
    signerInput: () => cy.get('[data-cy=input-account-address]'),
};
