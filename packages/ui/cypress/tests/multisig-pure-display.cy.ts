import { multisigPage } from '../support/page-objects/multisigPage';
import { accountDisplay } from '../support/page-objects/components/accountDisplay';
import {
    polkadotAHMemberAccount,
    expectedPolkadotAHMultisigAddress,
} from '../fixtures/polkadotAssetHub';
import { landingPageNetwork, landingPageNetworkAddress } from '../fixtures/landingData';
import {
    expectedPolkadotMultisigAddressClow,
    polkadotMemberAccount,
} from '../fixtures/polkadotAccounts';

describe('Shows the right assets depending on the network', () => {
    it('Shows the right assets balance on the Asset hub landing page', () => {
        cy.setupAndVisit({
            url: landingPageNetwork('asset-hub-polkadot'),
            extensionConnectionAllowed: true,
            injectExtensionWithAccounts: [polkadotAHMemberAccount.Nikos],
        });

        multisigPage
            .accountHeader(6000)
            .should('be.visible')
            .within(() => {
                accountDisplay
                    .addressLabel()
                    .should('be.visible')
                    .and('contain.text', expectedPolkadotAHMultisigAddress.slice(0, 6));
                multisigPage.assetHubBalance('1337').should('be.visible');
                multisigPage.assetHubBalance('1337').should('contain.text', '1 USDC');
                multisigPage.assetHubBalance('1984').should('be.visible');
                multisigPage.assetHubBalance('1984').should('contain.text', '0 USDT');
                multisigPage.nativeBalance().should('be.visible');
                multisigPage.nativeBalance().should('contain.text', '0.99 DOT');
            });
    });

    it('Shows only the native balance on a non asset hub landing page with multisig', () => {
        cy.setupAndVisit({
            url: landingPageNetworkAddress({
                network: 'polkadot',
                address: expectedPolkadotMultisigAddressClow,
            }),
            extensionConnectionAllowed: true,
            injectExtensionWithAccounts: [polkadotMemberAccount.Clow],
        });

        multisigPage
            .accountHeader(6000)
            .should('be.visible')
            .within(() => {
                accountDisplay
                    .addressLabel()
                    .should('be.visible')
                    .and('contain.text', expectedPolkadotMultisigAddressClow.slice(0, 6));
                multisigPage.assetHubBalance('1337').should('not.exist');
                multisigPage.assetHubBalance('1984').should('not.exist');
                multisigPage.nativeBalance().should('be.visible');
                multisigPage.nativeBalance().should('contain.text', 'DOT');
            });
    });

    it('Shows only the native balance on a non asset hub landing page with pure', () => {
        cy.setupAndVisit({
            url: landingPageNetwork('polkadot'),
            extensionConnectionAllowed: true,
            watchedAccounts: [polkadotMemberAccount.CultureDot.publicKey || ''],
        });

        multisigPage
            .accountHeader(6000)
            .should('be.visible')
            .within(() => {
                accountDisplay
                    .addressLabel()
                    .should('be.visible')
                    .and('contain.text', polkadotMemberAccount.CultureDot.address.slice(0, 6));
                multisigPage.assetHubBalance('1337').should('not.exist');
                multisigPage.assetHubBalance('1984').should('not.exist');
                multisigPage.nativeBalance().should('be.visible');
                multisigPage.nativeBalance().should('contain.text', 'DOT');
            });

        multisigPage
            .balanceListItem()
            .should('be.visible')
            .within(() => {
                multisigPage.assetHubBalance('1337').should('not.exist');
                multisigPage.assetHubBalance('1984').should('not.exist');
                multisigPage.nativeBalance().should('be.visible');
                multisigPage.nativeBalance().should('contain.text', 'DOT');
            });
    });

    it('Shows all the balances on a asset hub landing page with pure', () => {
        cy.setupAndVisit({
            url: landingPageNetwork('asset-hub-polkadot'),
            extensionConnectionAllowed: true,
            watchedAccounts: [polkadotMemberAccount.unknown.publicKey || ''],
        });

        multisigPage
            .accountHeader(6000)
            .should('be.visible')
            .within(() => {
                accountDisplay
                    .addressLabel()
                    .should('be.visible')
                    .and('contain.text', polkadotMemberAccount.unknown.address.slice(0, 6));
                multisigPage.assetHubBalance('1337').should('exist');
                multisigPage.assetHubBalance('1337').should('contain.text', 'USDC');
                multisigPage.assetHubBalance('1984').should('exist');
                multisigPage.assetHubBalance('1984').should('contain.text', 'USDT');
                multisigPage.nativeBalance().should('be.visible');
                multisigPage.nativeBalance().should('contain.text', 'DOT');
            });

        multisigPage
            .balanceListItem()
            .should('be.visible')
            .within(() => {
                multisigPage.assetHubBalance('1337').should('exist');
                multisigPage.assetHubBalance('1337').should('contain.text', 'USDC');
                multisigPage.assetHubBalance('1984').should('exist');
                multisigPage.assetHubBalance('1984').should('contain.text', 'USDT');
                multisigPage.nativeBalance().should('be.visible');
                multisigPage.nativeBalance().should('contain.text', 'DOT');
            });
    });
});
