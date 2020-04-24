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

const bloxbergProvider = 'wss://websockets.bloxberg.org';
const localProvider = process.env.DOCKER === 'yes' ? 'http://ganache:8545' : 'http://localhost:8545'; // Use Docker host name in docker, else localhost.

// Use ganache in development. 
!process.env.NODE_ENV && console.error(new Error('NODE_ENV is not set! Defaulting to local test network'));
const provider = new Web3.providers.WebsocketProvider(process.env.NODE_ENV === 'production' ? bloxbergProvider : localProvider);
const web3 = new Web3(provider);

// // Connect to db
// const mongo = require('../utils/mongo');
// mongo.connectToServer();

// Connect to contract
const ReviewStorage = TruffleContract(ReviewStorageArtifact);
ReviewStorage.setProvider(web3.currentProvider);
console.log('Trying to conntect weeb3');
ReviewStorage.deployed()
  .then(instance => {
    console.log('Found instance');
    instance.ReviewAdded() // Listen to ReviewAdded events.
      .on('data', (event) => logAddedReview(event, instance))
      .on('error', console.error);
    instance.ReviewDeleted() // Listen to ReviewAdded events.
      .on('data', (event) => logDeletedReview(event))
      .on('error', console.error);
    instance.ReviewVouched() // Listen to ReviewVouched events.
      .on('data', (event) => vouchLogger(event))
      .on('error', console.error);
  })
  .catch(console.error);

// Keep the script running.
setInterval(function () {

}, 1000);
