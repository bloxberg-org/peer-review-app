import TruffleContract from '@truffle/contract';
import ReviewStorageArtifact from '../contracts/ReviewStorage.json';
import getWeb3 from './web3';
const Gsn = require('@openeth/gsn');

async function init() {
  const web3 = await getWeb3();
  const netwId = await web3.eth.net.getId();
  console.log(`Network id is: ${netwId}`);
  // if (netwId !== 5777) { // Don't use Gas Station Network when interacting with Ganache.
  const provider = new Gsn.RelayProvider(web3.currentProvider);
  web3.setProvider(provider);
  // }
  const ReviewStorage = TruffleContract(ReviewStorageArtifact);
  ReviewStorage.setProvider(web3.currentProvider);
  let instance;
  let accounts;
  try {
    instance = await ReviewStorage.deployed();
    accounts = await web3.eth.getAccounts();
    console.log(`Web3 getAccounts:${accounts}`);
    return [instance, accounts];
  } catch (e) {
    console.log('Error in deploying contract');
    console.error(e);
  }
}

export const getOwnReviewCount = async () => {
  let [instance, accounts] = await init();
  let authorAddr = accounts[0];
  return instance.getReviewCount(authorAddr,
    { from: accounts[0] });
};

export const addReview = async (review) => {
  let [instance, accounts] = await init();
  return instance.addReview(review.id, review.journalId, review.publisher, review.manuscriptId,
    review.manuscriptHash, review.timestamp, review.recommendation, review.url,
    { from: accounts[0] });
};

export const addMultipleReviewsFromPublons = async (reviewFieldsObj) => {
  let [instance, accounts] = await init();
  return instance.addMultipleReviewsAndVerifyByPublons(reviewFieldsObj.id, reviewFieldsObj.journalId, reviewFieldsObj.publisher, reviewFieldsObj.manuscriptId, reviewFieldsObj.manuscriptHash, reviewFieldsObj.timestamp, reviewFieldsObj.recommendation, reviewFieldsObj.url, reviewFieldsObj.verified,
    { from: accounts[0] });
};

export const getReview = async (id) => {
  let [instance, accounts] = await init();
  return instance.getReview(id,
    { from: accounts[0] });
};

export const getOwnReviewIdsArray = async () => {
  let [instance, accounts] = await init();
  let addr = accounts[0];
  return instance.getReviewsArrayOfUser(addr,
    { from: accounts[0] });
};

export const vouchReview = async (id) => {
  let [instance, accounts] = await init();
  return instance.vouch(id,
    { from: accounts[0] });
};

export const getCurrentAccount = async () => {
  // eslint-disable-next-line no-unused-vars
  let [_, accounts] = await init();
  return accounts[0];
};