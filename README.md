# Bloxberg Peer Review
An Ethereum dApp for aggregating peer review data.

## Dependencies
- node > 12.0 & npm 6.0
- truffle suite
- ganache

# Installation

## Dependencies
Install all node dependencies by:
```
npm install
```

If not available, install `truffle` globally by:
```
npm install -g truffle
```

Also download and run Ganache from [here](https://www.trufflesuite.com/docs/ganache/quickstart);

During workspace intialization, set the port to 8545.
## Smart Contract
Compile and migrate contracts by:
```
truffle migrate --network develop
```

Run the backend in development mode with:
```
npm run dev
```

Open a new terminal an start the client with:
```
npm run client
```

This will open a new browser window at localhost:3001
