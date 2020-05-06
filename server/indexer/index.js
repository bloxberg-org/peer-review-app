/**
 * Bloxberg Peer Review, review indexing script.
 * Listens to reviews added to the ReviewStorage contract.
 * Adds the reviews to the local Mongo database for querying.
 * Sets a 1 sec interval to keep script running in background.
 * */
const Web3 = require('web3');
const TruffleContract = require('@truffle/contract');
const ReviewStorageArtifact = require('./contracts/ReviewStorage.json');
const { logAddedReview, logDeletedReview } = require('./reviewLogger');
const vouchLogger = require('./vouchLogger');
const logger = require('winston');

const bloxbergProvider = 'wss://websockets.bloxberg.org';
const localProvider = process.env.DOCKER === 'yes' ? 'http://ganache:8545' : 'http://localhost:8545'; // Use Docker host name in docker, else localhost.

// Use ganache in development. 
!process.env.NODE_ENV && logger.error(new Error('NODE_ENV is not set! Defaulting to local test network'));
const options = {
  // Enable auto reconnection
  reconnect: {
    auto: true,
    delay: 1000, // ms
    maxAttempts: 5,
    onTimeout: false
  }
};

let provider, web3;
setTimeout(() => { // Workaround to avoid connecting to ganache before it starts with `npm run dev` script. 
  provider = new Web3.providers.WebsocketProvider(process.env.NODE_ENV === 'production' ? bloxbergProvider : localProvider, options);
  web3 = new Web3(provider);

  provider.on('connect', init);
  provider.on('error', e => logger.info('WS Error', e));
  provider.on('end', e => {
    logger.info('WS closed');
  });
}, 2000);




// // Connect to db
// const mongo = require('../utils/mongo');
// mongo.connectToServer();

// Keep the script running.
setInterval(function () {

}, 1000);


function init() {
  // Connect to contract
  const ReviewStorage = TruffleContract(ReviewStorageArtifact);
  ReviewStorage.setProvider(web3.currentProvider);
  logger.info('Trying to conntect weeb3');
  ReviewStorage.deployed()
    .then(instance => {
      logger.info('Found instance');
      instance.ReviewAdded() // Listen to ReviewAdded events.
        .on('data', (event) => logAddedReview(event, instance))
        .on('error', logger.error);
      instance.ReviewDeleted() // Listen to ReviewAdded events.
        .on('data', (event) => logDeletedReview(event))
        .on('error', logger.error);
      instance.ReviewVouched() // Listen to ReviewVouched events.
        .on('data', (event) => vouchLogger(event))
        .on('error', logger.error);
    })
    .catch(logger.error);
}