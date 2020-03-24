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

This will pull the docker images and run the modules according to the settings in `docker-compose-dev.yml`. The initial run may take some time as it will be downloading the npm dependencies but subsequent runs should be quicker. Also both the server and client utilises _hot reloading_, meaning changes made to code are applied immediately.

Once ready you can reach the app at [http://localhost:3001]

## Deploy Contracts

if you want to deploy the contracts in a test network follow the instructions. Otherwise you can use the contracts already deployed in the bloxberg network.

*TODO*:
- Add GSN Contract deployment
- Fix truffle/hdwallet-provider missing
First run an `npm install @truffle/hdwallet-provider` in the main folder as `truffle` will need `@truffle/hdwallet-provider`.

Once you have the development blockchain network (ganache) running, you can deploy the contract to the network using:

```
truffle migrate --network develop
```

## Deploy to bloxberg
In order to use meta-transactions, we utilize the Gas Station Network deployed on bloxberg. In order to deploy another contract, simply run:

```
oz create
```
on the bloxberg network while making sure to call initialize() to instantiate the contract. Then the new contract must be funded in order to use meta-transactions. This is done by calling depositFor() on the RelayHub contract located [here](https://blockexplorer.bloxberg.org/address/0xd216153c06e857cd7f72665e0af1d7d82172f494/contracts).

# Run Production 

Make sure you have set-up the `.env` file as described above.

To build and run the production simple execute:

```
docker-compose up
```
This will create a production build of the client, serve it through a simple nginx server at port 80, start the express server at port 3000, and start the mongo service.

You should be able to access the application at [http://localhost]

## Troubleshooting

Make sure no other processes are running on TCP ports: 27017 (mongo), 3000 (server), 8545 (ganache), 3001 (client-dev), 80 (client-production).

If you get permission error when trying to stop docker containers, you can execute `sudo service docker restart` as a workaround.

The `ganache/` folder has the owner `root` as this folder (docker volume, better said) is created by docker.  