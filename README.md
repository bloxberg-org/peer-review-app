# Bloxberg Peer Review
An Ethereum dApp for aggregating peer review data.

## Dependencies
- docker
- docker-compose
- truffle suite
- Metamask

# Installation

## Dependencies

### Docker

Dowload and install [docker](https://docs.docker.com/install/) and [docker-compose](https://docs.docker.com/compose/install/)

### Truffle

If not available, install `truffle` globally by:
```
npm install -g truffle
```

### Metamask

Install the Metamask browser extension [at](https://metamask.io/) to be able to interact with the blockchain on the browser.


## Secrets

To run the app we need two secrets in `.env` file. 

First make a copy of the `.env-template` file and name it `.env`. 

Enter your 12 word MNEMONIC (seed phrase). You can use the MNEMONIC created by Metamask as described [here](https://metamask.zendesk.com/hc/en-us/articles/360015290032-How-to-Reveal-Your-Seed-Phrase).

To import reviews from Publons you need to have an auth token. Login and find the token [here](https://publons.com/api/v2/). Enter the found token `6452ac....4f2de` in the given format `Token 6452ac....4f2de` as the environment variable. 

# Run Development

## Modules
You can easily run the development environment by executing

```
npm run dev
```

This will pull the docker images and run the modules according to the settings in `docker-compose-dev.yml`. The initial run may take some time as it will be downloading the npm dependencies but subsequent runs should be quicker. Also both the server, indexer, and client utilises _hot reloading_, meaning changes made to code are applied immediately.

Once ready you can reach the app at [http://localhost:3001]

## Deploy Contracts

Our contract makes use of Gas Station Networks to enable gasless transactions so we need to initialize the contract and fund at the RelayHub.

### Deploy to Bloxberg
In order to deploy the contract, simply run the following command on the bloxberg network while making sure to call `initialize()`:

```
npx oz create
```

Then, the new contract must be funded in order to use meta-transactions. This is done by calling `depositFor()` on the RelayHub contract located [here](https://blockexplorer.bloxberg.org/address/0xd216153c06e857cd7f72665e0af1d7d82172f494/contracts). You can use [this](https://gsn.openzeppelin.com/recipients) tool to send the transaction. Enter the address of your deployed contract and send the amount you want via Metamask. Alternatively, compile the [GSNRecipient contract](https://github.com/OpenZeppelin/openzeppelin-contracts-ethereum-package/blob/master/contracts/GSN/GSNRecipient.sol) in [Remix](http://remix.ethereum.org/) and send a transaction with value you want to fund while calling `depositFor(<your-contract-address>)`. A value around 1ETH/bergs should work.

### Deploy to Ganache
When you ran `npm run dev` both ganache and the relayer were started. The relayer creates the RelayHub contract in ganache network, creates and runs a Relay, and funds the Relay. You only need to deploy your contract (in GSN terms the Recipient) and fund it. Deploy it while calling `initialize()`:
```
npx oz create
```
Then fund as described above.

*TODO*:
- Add GSN Contract deployment

More info about GSNs [EIP-1613](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1613.md) and [OpenZeppelin docs](https://docs.openzeppelin.com/learn/sending-gasless-transactions).

# Run Production 

Make sure you have set-up the `.env` file as described above.

To build and run the production simply execute:

```
docker-compose up
```
This will create a production build of the client, serve it through a simple nginx server at port 80, start the express server at port 3000, and start the mongo service.

You should be able to access the application at [http://localhost]

## Troubleshooting

Make sure no other processes are running on TCP ports: 27017 (mongo), 3000 (server), 8545 (ganache), 3001 (client-dev), 80 (client-production).

If you get permission error when trying to stop docker containers, you can execute `sudo service docker restart` as a workaround.

The `ganache/` folder has the owner `root` as this folder (docker volume, better said) is created by docker.  

If you receive mnemonic errors make sure you have the environment variable MNEMONIC is properly set. Also make sure

If you receive `MODULE NOT FOUND` errors when running the development containers, remove the `node_modules` folder via `rm -rf node_modules/`. This is due to docker running as root and causes permission errors. Use this workaround temporarily. 

In the dev environment, the relay container funds the relays each time. This may cause your accounts to run out of balance. 

If you reset the development blockchain by clearing the ganache folder make sure you reset the Metamask account by Settings > Advanced > Reset Account. If not you will receive `Error: [ethjs-rpc] rpc error with payload` and not even able to send ether transactions from Metamask.

If you get `Error: connection not open at WebsocketProvider.send (/home/node/app/node_modules/web3-providers-ws/src/index.js:282:18)` this is because the indexer is running before ganache and can't connect to the ganache network. Make indexer run after network is set up. Should not be a problem in production as bloxberg will be running all the time. 

Fortmatic wallet uses 3rd party cookies for authentication. Blocking of 3rd party cookies will disrupt the login process.

On the frontend the error: Objects are not valid as react child can occur when declaring styled components. Don't forget the template literals at the declaration. See [here](https://stackoverflow.com/a/61497342/6528944)

To run a clean state in development drop the database `test` from mongo console. By typing `mongo` in the terminal. Then `use test` and `db.dropDatabase()`. Also clean the blokchain state by removing the ganache folder `rm -rf ganache` and recreating it: `mkdir ganache`. Don't forget to reset your Metamask account by Settings > Advanced > Reset Account.
