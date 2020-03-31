/**
 * Bloxberg Peer Review, review indexing script.
 * Listens to reviews added to the ReviewStorage contract.
 * Adds the reviews to the local Mongo database for querying.
 * Sets a 1 sec interval to keep script running in background.
 * */
const Web3 = require('web3');
const TruffleContract = require('@truffle/contract');
const ReviewStorageArtifact = require('./contracts/ReviewStorage.json');
const BlockchainReview = require('./models/BlockchainReview');
const Author = require('./models/Author');
const reviewLogger = require('./reviewLogger');

const bloxbergProvider = 'https://core.bloxberg.org';
const localProvider = 'http://127.0.0.1:8545';

// const provider = new Web3.providers.WebsocketProvider(bloxbergProvider);
const provider = new Web3.providers.WebsocketProvider(localProvider);
const web3 = new Web3(provider);

// Connect to db
const mongo = require('./utils/mongo');
mongo.connectToServer();

// Connect to contract
const ReviewStorage = TruffleContract(ReviewStorageArtifact);
ReviewStorage.setProvider(web3.currentProvider);
ReviewStorage.deployed()
  .then(instance => {
    instance.ReviewAdded() // Listen to ReviewAdded events.
      .on('data', (event) => reviewLogger(event, instance))
      .on('error', console.error);

  })
  .catch(console.error)

// Keep the script running.
setInterval(function () {

}, 1000);
