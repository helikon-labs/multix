export const multisigPage = {
    // header elements
    accountHeader: (timeout = 4000) => cy.get('[data-cy=header-account]', { timeout }),
    seeOverviewButton: () => cy.get('[data-cy=button-see-overview]'),
    newTransactionButton: () => cy.get('[data-cy=button-new-transaction]'),
    optionsMenuButton: () => cy.get('[data-cy=button-options-menu]'),
    editNamesMenuOption: () => cy.get('[data-cy=menu-option-edit-names]'),
    subscanMenuOption: () => cy.get('[data-cy=menu-option-subscan]'),
    reviewButton: () => cy.get('[data-cy=button-review-tx]'),
    setIdentityMenuOption: () => cy.get('[data-cy=menu-option-set-identity]'),
    hideAccountMenuOption: () => cy.get('[data-cy=menu-option-hide-this-account]'),
    assetHubBalance: (id: string) => cy.get(`[data-cy=asset-balance-${id}]`),
    nativeBalance: () => cy.get('[data-cy=asset-balance-native]'),

    // multisig details elements
    multisigDetailsContainer: () => cy.get('[data-cy=container-multisig-details]'),
    multisigAccountSummary: () => cy.get('[data-cy=container-multisig-account-summary]'),
    thresholdListItem: () => cy.get('[data-cy=list-item-threshold]'),
    proxyTypeListItem: () => cy.get('[data-cy=list-item-proxy-type]]'),
    balanceListItem: () => cy.get('[data-cy=list-item-balance]'),
    signatoriesAccordion: () => cy.get('[data-cy=accordion-signatories]'),
    expandSignatoriesIcon: () => cy.get('[data-cy=icon-expand-signatories-summary]'),
    signatoriesList: () => cy.get('[data-cy=list-item-signatory]'),

    // transaction list elements
    transactionList: () => cy.get('[data-cy=container-transaction-list]', { timeout: 20000 }),
    pendingTransactionItem: (timeout = 4000) =>
        cy.get('[data-cy=container-pending-tx-item]', { timeout }),
    dateLabel: () => cy.get('[data-cy=label-date]'),
    pendingTransactionCallName: () => cy.get('[data-cy=label-call-name]'),
    unknownCallIcon: () => cy.get('[data-cy=icon-unknown-call]'),
    unknownCallAlert: () => cy.get('[data-cy=alert-no-call-data]'),
    batchItem: () => cy.get('[data-cy=batch-call-item]'),
};
