# Getting started with Multix

This UI is meant to be run either alongside an indexer as presented in `../squid`, or pointing at a live instance (see below)

## Wiki articles

- [Connect Dapps to Multix using WalletConnect v2](https://github.com/Tbaut/Multix/wiki/Connect-Dapps-to-Multix-using-WalletConnect-v2)
- [How to integrate with Multix - no api required!](https://github.com/Tbaut/Multix/wiki/Multix-integration)

## Available scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3333](http://localhost:3333) to view it in the browser.

The page will reload automatically if you make edits.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

## Development pointing to live indexer

To ease the development of the front-end, you don't have to run an indexer.
After `yarn && yarn start` you can directly visit the locally hosted front-end at [http://localhost:3333](http://localhost:3333).
You will be connected to the default network, e.g http://localhost:3333?network=paseo

The front-end will automatically connect to a hosted blockchain node, as well as its associated indexer.

## Development pointing to local indexer

To connect to your local indexer, you will need an env file. You can rename `.env.example` into `.env` and change the values to your needs.
When you launch the front-end, for it to point to the urls specified in your `.env`, you must specify `network=local` e.g : http://localhost:3333?network=local

```bash
VITE_CHAIN_ID="kusama" # it will be used for identifying accounts on the indexer
VITE_EXPLORER_NETWORK_NAME="kusama" # this name is needed to build explorer links
VITE_WS_PROVIDER="wss://rpc.ibp.network/kusama" # the front-end will connect to this blockchain node
VITE_GRAPHQL_HTTP_PROVIDER="http://localhost:4350/graphql" # url queried for the indexer queries
```

## Hacky watch signatory account

You can watch an account by adding a local storage key: `multix.watchedAccount` with an array of addresses `["1234...", "56789..."]` and this will be picked-up by the UI.

Note that the account should be a signatory of a multisig you want to watch, and not the multisig or the pure proxy itself.
It is particularly handy to see what is happening and debug issues on someone else's multisig.
