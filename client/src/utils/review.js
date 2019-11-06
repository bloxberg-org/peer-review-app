import * as connection from '../connection/reviewConnection';

export const addReview = (data) => {
  return connection.addReview(data);
}

export const getAllReviews = async () => {
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
