# Bloxberg Peer Review
An Ethereum dApp for aggregating peer review data.

## Dependencies
- node > 12.0 & npm 6.0
- truffle suite
- ganache
- mongodb

# Installation

## Dependencies
Install all node dependencies by:
```
npm install
```

### Truffle

If not available, install `truffle` globally by:
```
npm install -g truffle
```

Also download and run Ganache from [here](https://www.trufflesuite.com/docs/ganache/quickstart);

During workspace intialization, set the port to 8545.

### MongoDB

Install [mongoDB](https://www.mongodb.com/) for the server database.

## Smart Contract
Compile and migrate contracts by:
```
truffle migrate --network develop
```

## Configure database connection
Copy template configuration from `./server/config-template.js` to `./server/config.js`:

```
cp ./server/config-template.js ./server/config.js
```

and make sure you have mongodb listening at the `databaseURI` address of your `./server/config.js` configuration file. For instance. you can start your default mongodb in debian-like systems with `sudo systemctl start mongod`,  and set `databaseURI` to `mongodb://localhost:27017`.

## Run the development environment

You can run the complete dev environment (mongo, truffle, frontend, backend) by running the shell script.
This requires VSCode and `tmux` to be installed. 

```
bash dev/bloxberg-dev.sh
```

Also edit the ganache config at `dev/scripts/secret-template.sh` to use same addresses each time.

Alternatively you can run each seperately as below:

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
