export const notifications = {
    successNotificationIcon: (timeout = 4000) =>
        cy.get('[data-cy=notification-icon-success]', { timeout }),
    errorNotificationIcon: () => cy.get('[data-cy=notification-icon-error]'),
    loadingNotificationIcon: () => cy.get('[data-cy=notification-icon-loading]'),
    notificationWrapper: (timeout = 4000) => cy.get('[data-cy=notification-wrapper]', { timeout }),
};
