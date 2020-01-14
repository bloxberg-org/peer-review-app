import * as connection from '../connection/reviewConnection';
import { getCurrentAccount } from '../connection/reviewConnection';
import { get, getXML, post } from './endpoint';

/**
 * Function to add a single review.
 * Takes the object created by the form in AddReview page.
 * Splits the data to be written to blockchain and to the DB.
 * Writes data to the blockchain first, then to the DB.
 * 
 * @param {Object} data 
 */
export const addReview = (data) => {
  // Prepare blockchain data.
  let chainData = {
    journalId: data.journalId,
    publisher: data.publisher,
    manuscriptId: data.manuscriptId,
    manuscriptHash: data.manuscriptHash,
    timestamp: data.timestamp,
    recommendation: data.recommendation,
    url: data.url
  };
  return getCurrentAccount().then((address) => {
    // Prepare DB data.
    let dbData = {
      articleTitle: data.articleTitle,
      author: address,
      content: data.content,
      index: data.index,
      articleDOI: data.articleDOI
    };
    return connection.addReview(chainData) // Write to blockchain.
      .then((tx) => { // Then to db.
        return post(`/reviews/${address}`, dbData)
          .then(dbResponse => dbResponse.json())
          .then((dbJson) => {
            let response = {
              tx: tx,
              chainData: {
                ...chainData,
                verified: false,
                vouchers: []
              },
              dbData: dbJson
            };
            return response;
          });
      })
      .catch((err) => console.log('Error adding to the blockchain\n' + err));
  });
};

export const getAllBlockchainReviews = async () => {
  let reviewCount;
  try {
    reviewCount = await connection.getOwnReviewCount();
  } catch (e) {
    console.log('Error getting review count');
  }

  console.log(`Review count is ${reviewCount}`);

  let reviewPromises = [];
  for (let i = 0; i < reviewCount; i++) {
    reviewPromises.push(connection.getOwnReview(i));
  }

  return Promise.all(reviewPromises).then((reviewArr => {
    // Must format the reviews as a JSON. Data retrieved from blockchain is an array.
    return reviewArr.map((review) => {
      return {
        journalId: review[0],
        publisher: review[1],
        manuscriptId: review[2],
        manuscripthash: review[3],
        timestamp: review[4].toNumber(), // Handle BigNumber
        recommendation: review[5].toNumber(),
        url: review[6],
        verified: review[7],
        vouchers: review[8]
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
      publisher: review[1],
      manuscriptId: review[2],
      manuscriptHash: review[3],
      timestamp: review[4].toNumber(), // Handle BigNumber
      recommendation: review[5].toNumber(),
      url: review[6],
      verified: review[7],
      vouchers: review[8]
    };
  }).catch((e) => {
    console.log(e);
    console.log('Error fetching review');
  });
};

/**
 * Function to add multiple reviews to blockchain in a single transaction, and subsequently to the DB.
 * Takes a reviewsArr and reformats using function decomposeReviews, according to the smart contract's addMultipleReviews method.
 * 
 * @param {object} reviewsArr - Array of reviews to be added. 
 */
export const addMultipleReviews = (reviewsArr) => {
  console.log('Array of reviews to be added are:');
  console.log(reviewsArr);
  let reviewFieldsObj = decomposeReviews(reviewsArr);
  console.log('Decomposed array to object:');
  console.log(reviewFieldsObj);
  return connection.addMultipleReviews(reviewFieldsObj);
};

/**
 * Takes an array of reviews and formats them into an object of arrays, where each array is a concatanation of each field of the review obj. 
 * 
 * @param {Array} reviewsArr - An array of review Objects 
 * @returns {Object} Object consisting of an array of fields. E.g. returnedObj.journalIds returns all the journalIds of reviews as an array.
 * Example Input:
 * [{ journalId: 'SPR', manuscriptId: '13795232', manuscriptHash:'8adf343bc1...', timestamp: 543254325, recommendation: 0},
 * { journalId: 'WLY', manuscriptId: '455534123', manuscriptHash:'2cdae9836f1...', timestamp: 54352452, recommendation: 2}]
 * 
 * Example output:
 *  {
 *    journalIds: ['SPR', 'WLY'],
 *    manuscriptIds: ['13795432', '455534123'],
 *    manuscriptHashes: ['8adf343bc1...', '2cdae9836f1...'],
 *    timestamps: [543254325, 54352452],
 *    recommendations: [0, 2]
 *    content:...
 *  };
 */
export const decomposeReviews = (reviewsArr) => {
  let result = {};

  reviewsArr.forEach(obj => {
    Object.keys(obj).forEach(key => {
      result[key] = (result[key] || []).concat([obj[key]]);
    });
  });

  return result;
};

export const getAllDatabaseReviews = (address) => {
  console.log(`Sending a GET at: /reviews/${address}`);
  return get(`/reviews/${address}`);
};

export const getOneDatabaseReview = (address, index) => {
  console.log(`Sending a GET at: /reviews/${address}/${index}`);
  return get(`/reviews/${address}/${index}`);
};

export const getReviewsOfArticle = (source, doi) => {
  console.log(`Sending a GET at: /reviews/xml/${source}/?doi=${doi}`);
  return getXML(`/reviews/xml/${source}/?doi=${doi}`);
};

export const getReviewOfArticle = (source, doi, index) => {
  console.log(`Sending a GET at: /reviews/xml/${source}/?doi=${doi}&index=${index}`);
  return getXML(`/reviews/xml/${source}/?doi=${doi}&index=${index}`);
};

export const getReviewsOfAcademicFromPublons = (academicId, page) => {
  // default page = 1
  page = (page === undefined) ? 1 : page;
  return get(`/reviews/import/publons/?academicId=${academicId}&page=${page}`);
};