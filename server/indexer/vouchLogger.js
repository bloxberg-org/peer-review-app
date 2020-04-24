const BlockchainReview = require('../models/BlockchainReview');
/**
 * Function to index vouched Reviews to local Mongo DB.
 * 
 * @param {Event} event - Event emitted when review is added.
 * @param {ContractInstance} instance - Contracts instance to interact with. Needed to retrieve the review data using the id in the event.
 */
const vouchLogger = (event) => {
  let id = event.returnValues.id;
  let authorAddress = event.returnValues.from;
  console.log(`Vouched review ${id} from ${authorAddress}`);

  BlockchainReview.findOne({ id: id })
    .then(review => {
      if (!review)
        throw new Error('Review not found');
      review.vouchers.push(authorAddress);
      if (review.vouchers.length == 1)
        review.verified = true;
      return review.save();
    })
    .then(console.log('Successfully logged the vouched review'))
    .catch(console.error);
};

module.exports = vouchLogger;