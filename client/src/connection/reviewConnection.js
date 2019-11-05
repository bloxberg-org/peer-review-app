import TruffleContract from '@truffle/contract';
import ReviewStorageArtifact from '../contracts/ReviewStorage.json';
import getWeb3 from './web3';




async function init() {
  const web3 = await getWeb3();
  const ReviewStorage = TruffleContract(ReviewStorageArtifact);
  ReviewStorage.setProvider(web3.currentProvider);
  let instance;
  let accounts;
  try {
    instance = await ReviewStorage.deployed();
    accounts = await web3.eth.getAccounts();
    return [instance, accounts];
  } catch (e) {
    console.log('Error in deploying contract');
    console.error(e);
  }
}

export const getReviewCount = async (authorAddr) => {
  let [instance, accounts] = await init();
  return instance.getReviewCount(authorAddr,
    { from: accounts[0] });
};

export const addReview = async (review) => {
  let [instance, accounts] = await init();
  let authorAddr = accounts[0];
  return instance.addReview(authorAddr, review.journalId, review.manuscriptId,
    review.manuscriptHash, review.timestamp, review.recommendation,
    { from: accounts[0] });
};

export const getReview = async (addr, index) => {
  let [instance, accounts] = await init();
  return instance.getReview(addr, index,
    { from: accounts[0] });
};

export const vouchReview = async (addr, index) => {
  let [instance, accounts] = await init();
  return instance.vouch(addr, index,
    { from: accounts[0] });
};