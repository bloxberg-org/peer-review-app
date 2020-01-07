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
