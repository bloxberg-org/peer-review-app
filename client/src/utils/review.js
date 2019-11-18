import * as connection from '../connection/reviewConnection';
import { getCurrentAccount } from '../connection/reviewConnection';
import { get, post } from './endpoint';

export const addReview = (data) => {
  let promises = [];

  // Add journalId, timestamp etc. to blockchain
  let chainData = {
    journalId: data.journalId,
    manuscriptId: data.manuscriptId,
    manuscriptHash: data.manuscriptHash,
    timestamp: data.timestamp,
    recommendation: data.recommendation
  };
  // Rest of the data to DB
  return getCurrentAccount().then((address) => {
    let dbData = {
      articleTitle: data.articleTitle,
      author: address,
      content: data.content,
      index: data.index,
      articleDOI: data.articleDOI
    };
    promises.push(post(`/reviews/${address}`, dbData));
    promises.push(connection.addReview(chainData));
    return Promise.all(promises);
  });

};

export const getAllBlockchainReviews = async () => {
  let reviewCount;
  try {
    reviewCount = await connection.getOwnReviewCount();
  } catch (e) {
    console.log('Error getting review count');
  }

  let reviewPromises = [];
  for (let i = 0; i < reviewCount; i++) {
    reviewPromises.push(connection.getOwnReview(i));
  }

  return Promise.all(reviewPromises).then((reviewArr => {
    // Must format the reviews as a JSON. Data retrieved from blockchain is an array.
    return reviewArr.map((review) => {
      return {
        journalId: review[0],
        manuscriptId: review[1],
        manuscripthash: review[2],
        timestamp: review[3].toNumber(), // Handle BigNumber
        recommendation: review[4].toNumber(),
        verified: review[5],
        vouchers: review[6]
      };
    });
  })).catch((e) => {
    console.log(e);
    console.log('Error fetching reviews');
  });
};

export const getOneBlockchainReview = (index) => {
  return connection.getOwnReview(index).then(review => {
    return {
      journalId: review[0],
      manuscriptId: review[1],
      manuscripthash: review[2],
      timestamp: review[3].toNumber(), // Handle BigNumber
      recommendation: review[4].toNumber(),
      verified: review[5],
      vouchers: review[6]
    };
  }).catch((e) => {
    console.log(e);
    console.log('Error fetching review');
  });
};

export const getAllDatabaseReviews = (address) => {
  console.log(`Sending a GET at: /reviews/${address}`);
  return get(`/reviews/${address}`);
};

export const getOneDatabaseReview = (address, index) => {
  console.log(`Sending a GET at: /reviews/${address}/${index}`);
  return get(`/reviews/${address}/${index}`);
};