const TruffleContract = require('@truffle/contract');
const ReviewStorageArtifact = require('../../build/contracts/ReviewStorage.json')
const web3 = require('./web3')

const ReviewStorage = TruffleContract(ReviewStorageArtifact)
ReviewStorage.setProvider(web3.currentProvider)

// TODO: Author should be retrieved from the web3 provider
exports.addReview = async (authorAddr, review) => {
  let instance;
  let accounts;
  try {
    instance = await ReviewStorage.deployed();
    accounts = await web3.eth.getAccounts();
  } catch (e) {
    console.log('Error in deploying contract');
    console.error(e);
  }
  console.log('Deployed!')
  return instance.addReview(authorAddr, review.journalId, review.manuscriptId, 
    review.manuscriptHash, review.timestamp, review.recommendation,
    {from: accounts[0]});
}

exports.getReview = async (addr, index) => {
  let instance = await ReviewStorage.deployed();
  return instance.getReview(addr, index)
}