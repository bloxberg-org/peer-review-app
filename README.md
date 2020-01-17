# Bloxberg Peer Review
An Ethereum dApp for aggregating peer review data.

## Dependencies
- node > 12.0 & npm 6.0
- truffle suite
- ganache-cli
- mongodb
- Metamask

# Installation

## Dependencies

### Node

Dowload and install node.js and npm via [here](https://nodejs.org/en/download/). Use a [package manager](https://nodejs.org/en/download/package-manager/) for easier installation. 

### Truffle

If not available, install `truffle` globally by:
```
npm install -g truffle
```

### Ganache-cli

Also install `ganache-cli` by:
```
npm install -g ganache-cli
```

### MongoDB

Install [mongoDB](https://www.mongodb.com/) for the server database.

### Metamask

Install the Metamask browser extension [at](https://metamask.io/) to be able to interact with the blockchain on the browser. 

### Node dependencies

Finally install all node dependencies by:
```
npm install
```

## Smart Contract
First we need to get the `ganache-cli` running. `ganache-cli` will be our local blockchain network for testing purposes.

Create the db folder for our blockchain:
```
mkdir ganache
```

Run ganache by:
```
ganache-cli --db ganache/  --networkId 5777
```

Compile and migrate contracts by:
```
truffle migrate --network develop
```

Now the contracts are deployed to our local blockchain and will be accessible by the app.

## Configure database connection
Copy template configuration from `server/config-template.js` to `server/config.js`:

```
cp server/config-template.js server/config.js
```

And fill the appropiate fields with your config. Use the default config line in the file if you don't have any specific configurations.

Check if mongo is running. Note the service name vary as mongo/mongod/mongodb.
```
service mongodb status
```

Run mongodb if not running by:
```
sudo service mongodb start
```

## Run backend

Run the backend in development mode with:
```
npm run dev
```

## Run frontend

Open a new terminal an start the client with:
```
npm run client
```

This will open a new browser window at localhost:3001

### Publons auth

To import reviews from Publons you need to have an auth token. Login and find the token [here](https://publons.com/api/v2/).

Add this token to `server/config.js`.

## Run the development environment

You can run the complete dev environment (mongo, truffle, frontend, backend) by running the shell script.
This requires VSCode and `tmux` to be installed. 

Also add a mnemonic to the ganache config at `dev/scripts/secret-template.sh` and rename the file to `secret.sh` to use same addresses each time. You can use the mnemonic output of `ganache-cli` at the initial run, or your preferred wallet phrase. 

You may want to use the same mnemonic in the Metamask to have sufficient ethers. Log out and import your ganache wallet to Metamask.

### Adding a user

As the application currently does not have account management, we will add a dummy account to our database. In mongo-cli execute:
```
db.scholars.insert({ "_id" : "0xDc276e636D0AbEc2157b033b6a6fb72eccA0BA84", "firstName" : "Kaan", "lastName" : "<SURNAME>", "email" : "<EMAIL>", "reviews" : []})
```

Launch the dev environment with: 

```
bash dev/bloxberg-dev.sh
```

You can change windows at tmux by `Ctrl+B` and window number. E.g. `Ctrl+B` then `0` opens mongo window. 

## Troubleshooting

When launching with the dev script, mongod starting command may be different and output a warning "mongod.service: Unit mongod.service not found.". Change the command appropiately to how you start the mongo service.

If you get a 'EADDRINUSE' error at the backend stop running node daemons with `pkill node`.