<p align="center"><img src=".github/images/MULTIX_LOGO_FULL_BLUE_1200px.png" width=500 /></p>

# Multix

### an interface to easily manage complex multisigs.

### https://multix.cloud

### ⚠️ Multix is no longer maintained after 2025-12-31. Please migrate to a new multisig solution by then. Nova, Mimir, Signet or Polkadot.js are good options.

This repo contains the code to run an indexer see `./squid` and a front-end, see `./packages/ui`.

## Running the project

You can run most of the project locally, except for the database that will run in a docker.

### Environment variables

You need to set up the `squid/.env` file to tell the indexer what network to index. The following environment variables are expected. You can copy `packages/squid/.env.example` into `packages/squid/.env` as follow:

```bash
DB_PORT=5432
GQL_PORT=4350
SQD_DEBUG=sqd:processor:mapping

# westend
BLOCK_START=3510000 # this is the starting block of the indexer
PREFIX=42 # the ss58 prefix for the chain
RPC_WS="wss://westend-rpc.polkadot.io" # a WS endpoint to connect to the blockchain
ARCHIVE_NAME="westend" # the archive name from subsquid archives
CHAIN_ID='westend' # the name that will prefix most ids in the indexer's DB
```

### Running the project locally

#### Running the indexer locally

Install and launch the indexer and its DB. This will block the terminal

```bash
cd squid;
npm install;
docker compose up db -d;
npm run codegen;
npm run build;
npm run db:migrate;
npm run start # this will start the indexer using the environment variables set in your .env
# alternatively, you can run with predefined values, see in /squid/assets/envs/, e.g here with polkadot
node -r dotenv/config lib/main dotenv_config_path=assets/envs/.env.polkadot
```

In the squid directory but another terminal window, run the graphql server

```bash
npm run start:graphql-server
```

#### Running the front-end (user interface) locally

From the repository root

```bash
# install all dependencies
yarn;

# start Multix UI (accessible on localhost:3333 per default)
yarn ui:start
```

#### Running tests in Cypress

Make sure you have docker.

```bash
# install all dependancies
yarn && cd squid && npm ci

# go back to the root
cd ..

# Launch the full setup. It will:
# - delete any previous Chopsticks database
# - launch a docker with the indexer db
# - launch a Chopsticks node
# - build and launch a subsquid indexer pointed at Chopsticks
# - launch a graphQL server for the squid
# - launch the UI with local env pointed at Chopsticks
rm db.sqlite*; npm run start:chopsticks-test-build-and-launch-all

yarn ui:test
```
