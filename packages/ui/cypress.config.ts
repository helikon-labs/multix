import { defineConfig } from 'cypress';

export default defineConfig({
    e2e: {
        specPattern: 'cypress/tests/**/*.cy.ts',
        setupNodeEvents() {
            // implement node event listeners here
        },
        retries: {
            runMode: 3,
        },
    },
});
