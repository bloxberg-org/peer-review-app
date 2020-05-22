/**
 * Bloxberg Peer Review, review indexing script.
 * Listens to reviews added to the ReviewStorage contract.
 * Adds the reviews to the local Mongo database for querying.
 * Sets a 1 sec interval to keep script running in background.
 * */
const Web3 = require('web3');
const ReviewStorageArtifact = require('./contracts/ReviewStorage.json');
const { logAddedReview, logDeletedReview } = require('./reviewLogger');
const vouchLogger = require('./vouchLogger');
const logger = require('winston');

const networkId = process.env.NODE_ENV === 'production' ? 8995 : 5777; // bloxberg=8995, localhost=5777
const deployedAddress = ReviewStorageArtifact.networks[networkId].address;


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
  // provider = new Web3.providers.WebsocketProvider(process.env.NODE_ENV === 'production' ? localProvider : bloxbergProvider, options);
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
  const ReviewStorage = new web3.eth.Contract(ReviewStorageArtifact.abi, deployedAddress);
  logger.info('Trying to conntect weeb3');
  ReviewStorage.events.ReviewAdded() // Listen to ReviewAdded events.
    .on('data', (event) => logAddedReview(event, ReviewStorage))
    .on('error', logger.error);
  ReviewStorage.events.ReviewDeleted() // Listen to ReviewAdded events.
    .on('data', (event) => logDeletedReview(event))
    .on('error', logger.error);
  ReviewStorage.events.ReviewVouched() // Listen to ReviewVouched events.
    .on('data', (event) => vouchLogger(event))
    .on('error', logger.error);
}