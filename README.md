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

Note that you can encounter numerous errors. This should not be a problem for running the app. Also you'll see some vulnerability warnings, please ignore them at this stage.

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

Take note of the 12 word mnemonic phrase after launching ganache. Use this mnemonic as below if you want to use same accounts each time you run ganache:
```
ganache-cli --db ganache/  --networkId 5777 --mnemonic '<12-word-mnemonic>'
```

Use `--quiet` flag if you don't wan't ganache to constantly log on the terminal.

In a new terminal compile and migrate contracts by:
```
truffle migrate --network develop
```

Now the contracts are deployed to our local blockchain and will be accessible by the app.

## Configure database connection
Copy template configuration from `server/config_template.js` to `server/config.js`:

```
cp server/config_template.js server/config.js
```

And fill the appropiate fields with your config. Use the default config URI in the file if you don't have any specific configurations.

Check if mongo is running. Note the service name vary as mongo/mongod/mongodb.
```
service mongodb status
```

Run mongodb if not running by:
```
sudo service mongodb start
```

### Publons auth

In `server/config.js` we need another field. To import reviews from Publons you need to have an auth token. Login and find the token [here](https://publons.com/api/v2/).

## Run backend

In a new terminal, run the backend in development mode to watch changes with `nodemon`:
```
npm run dev
```

If you encounter any file watcher errors you can stop using `nodemon` and run the server normally by
```
cd server/ && npm start
```

## Run frontend

Open a new terminal an start the client with:
```
npm run client
```

This will open a new browser window at localhost:3001

## Metamask

To be able to interact with blockchain we need Metamask. By default you can use the wallet generated at ganache launch. Import this wallet using the mnemonic you saved.

You should see around 100 ETH in your account in Metamask. If not check the network you are connected. Click top right to add Custom RPC and enter `http://localhost:8545` in RPC URL.

## One click development environment

You can run the complete dev environment (mongo, truffle, frontend, backend) by running the shell script.
This requires VSCode and `tmux` to be installed.

Also add the mnemonic to the ganache config at `dev/scripts/secret-template.sh` and rename the file to `secret.sh` to use same addresses each time. You can use the mnemonic output of `ganache-cli` above, or your preferred wallet phrase.

Launch the dev environment with:

```
bash dev/bloxberg-dev.sh
```

You can change windows at tmux by `Ctrl+B` and window number. E.g. `Ctrl+B` then `0` opens mongo window.

You can send the session to background by `Ctrl+B` and `D`.

Launch the session back with `tmux attach -t peer`. Kill the session by `tmux kill-session -t peer`.

## Troubleshooting

When launching with the dev script, mongod starting command may be different and output a warning "mongod.service: Unit mongod.service not found.". Change the command appropiately to how you start the mongo service.

If you get a 'EADDRINUSE' error at the backend server stop running node daemons with `pkill node`. This happens when you kill the tmux window but the node keeps running.
