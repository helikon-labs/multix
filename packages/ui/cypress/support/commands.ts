/// <reference types="cypress" />

import { MultisigInfo, rejectCurrentMultisigTxs } from '../utils/rejectCurrentMultisigTxs';
import { InjectedAccountWitMnemonic } from '../fixtures/testAccounts';
import 'cypress-wait-until';
import '@chainsafe/cypress-polkadot-wallet';

const LOCALSTORAGE_ACCOUNT_NAMES_KEY = 'multix.accountNames';
const LOCALSTORAGE_WATCHED_ACCOUNTS_KEY = 'multix.watchedAccount';
const LOCALSTORAGE_HIDDEN_ACCOUNTS_KEY = 'multix.hiddenAccounts';
const LOCALSTORAGE_EXTENSION_CONNECTION_KEY = '@reactive-dot/wallet/injected/polkadot-js/connected';
const LOCALSTORAGE_ALLOWED_CONNECTION_KEY = 'multix.canConnectToExtension';
export const MULTIX_DAPP_NAME = 'Multix';

Cypress.Commands.add('rejectCurrentMultisigTx', rejectCurrentMultisigTxs);

Cypress.Commands.add('connectAccounts', (accountAddresses: string[]) => {
    cy.getAuthRequests().then((authRequests) => {
        const requests = Object.values(authRequests);
        // we should have 1 connection request to the extension
        cy.wrap(requests.length).should('eq', 1);
        // this request should be from the application Multix
        cy.wrap(requests[0].origin).should('eq', MULTIX_DAPP_NAME);
        // let's allow Accounts to connect
        cy.approveAuth(requests[0].id, accountAddresses);
    });
});

interface IsetupAndVisit {
    url: string;
    watchedAccounts?: string[];
    hiddenAccounts?: Array<{ network: string; pubKey: string }>;
    accountNames?: Record<string, string>;
    extensionConnectionAllowed?: boolean;
    injectExtensionWithAccounts?: InjectedAccountWitMnemonic[];
}

Cypress.Commands.add(
    'setupAndVisit',
    ({
        url,
        watchedAccounts,
        hiddenAccounts,
        accountNames,
        extensionConnectionAllowed,
        injectExtensionWithAccounts,
    }: IsetupAndVisit) => {
        cy.visit(url, {
            onBeforeLoad(win) {
                !!watchedAccounts?.length &&
                    win.localStorage.setItem(
                        LOCALSTORAGE_WATCHED_ACCOUNTS_KEY,
                        JSON.stringify(watchedAccounts),
                    );
                !!hiddenAccounts?.length &&
                    win.localStorage.setItem(
                        LOCALSTORAGE_HIDDEN_ACCOUNTS_KEY,
                        JSON.stringify(hiddenAccounts),
                    );
                !!accountNames &&
                    win.localStorage.setItem(
                        LOCALSTORAGE_ACCOUNT_NAMES_KEY,
                        JSON.stringify(accountNames),
                    );

                if (extensionConnectionAllowed) {
                    win.localStorage.setItem(LOCALSTORAGE_ALLOWED_CONNECTION_KEY, 'true');
                    win.localStorage.setItem(LOCALSTORAGE_EXTENSION_CONNECTION_KEY, 'true');
                }
            },
        });

        if (injectExtensionWithAccounts) {
            cy.initWallet(injectExtensionWithAccounts, MULTIX_DAPP_NAME);
        }
    },
);

declare global {
    namespace Cypress {
        interface Chainable {
            /**
             * Reject all pending multisig requests with a specific account
             * @param {InjectedAccountWitMnemonic} opt.account - The account to reject pending transactions with. It should be the proposer
             * @param {multisigInfo} opt.multisigInfo - The information about the multisig to remove pending transactions from
             * @param {WSendpoint} opt.WSendpoint - The RPC endpoint to connect to to submit the rejection batch transaction
             */
            rejectCurrentMultisigTx: (opt: {
                account: InjectedAccountWitMnemonic;
                multisigInfo: MultisigInfo;
                WSendpoint: string;
            }) => void;

            /**
             * Connect accounts to Multix and wait until it's ready
             * @param {string[]} accountAddresses - The addresses expected to be shared to the Dapp. These accounts must be passed to initWallet before
             * @example cy.connectAccounts([7NPoMQbiA6trJKkjB35uk96MeJD4PGWkLQLH7k7hXEkZpiba])
             */
            connectAccounts: (accountAddresses: string[]) => void;

            /**
             * Visit a websit by setting certain localStorage item
             * @param {Object} params - The parameters to pass
             * @param {string} params.url - Url to visit
             * @param {string[]} params.watchedAccounts - List of public keys of accounts to watch
             * @param {{[publicKey: string]: string}} params.accountNames - Object of addresses associated to names
             * @param {boolean} params.extensionConnectionAllowed - whether the extension was previously allowed to connect to the website
             * @param {InjectedAccountWitMnemonic} params.injectExtensionWithAccounts - Init and inject these account
             * @example cy.setupAndVisit({
             *            injectExtensionWithAccounts: [],
             *            extensionConnectionAllowed: false,
             *            url: http://localhost:3333,
             *            watchedAccounts: ['0x0c691601793de060491dab143dfae19f5f6413d4ce4c363637e5ceacb2836a4e'],
             *            watchedAccounts: {"0x0c691601793de060491dab143dfae19f5f6413d4ce4c363637e5ceacb2836a4e":"my custom name"}
             *          })
             */
            setupAndVisit: (params: IsetupAndVisit) => void;
        }
    }
}
