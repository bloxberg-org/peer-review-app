const BlockchainReview = require('../models/BlockchainReview');
const BlockchainReviewMeta = require('../models/BlockchainReviewMeta');
const Author = require('../models/ReviewAuthor');
const logger = require('winston');

/**
 * Function to write added reviews to local Mongo DB.
 * Called when a ReviewAdded event is emitted.
 * Gets the review from the ReviewStorage contract.
 * Writes the review to the database in blockchainreview collection.
 * Pushes the review id to Author's reviews array.
 * 
 * @param {Event} event - Event emitted when review is added.
 * @param {ContractInstance} instance - Contracts instance to interact with. Needed to retrieve the review data using the id in the event.
 * @returns {Promise}
 */
exports.logAddedReview = (event, instance) => {
  let id = event.returnValues.id;
  let authorAddress = event.returnValues.from;
  logger.info(`Caught the event: Review added by ${authorAddress} with id: ${id}`);
  // Get the review data by calling contract method getReview(id)
  return instance.methods.getReview(id).call()
    .then(review => {
      let reviewData = { // Create object to save. 
        id: review[0],
        author: review[1],
        journalId: review[2],
        publisher: review[3],
        manuscriptId: review[4],
        manuscripthash: review[5],
        timestamp: review[6],
        recommendation: review[7],
        url: review[8],
        verified: review[9],
        vouchers: review[10],
        blockNumber: event.blockNumber,
        transactionIndex: event.transactionIndex
      };
      logger.info(`Adding review ${id} to BlockchainReview`);
      let reviewToAdd = new BlockchainReview(reviewData);
      return reviewToAdd.save();
    })
    .then((review) => { // After saving the review, push into author's review array.
      // Get the author obj.
      logger.info(`Pushing indexed review ${review.id} to author.blockchainReviews`)
      return Author.findById(authorAddress)
        .then(author => {
          if (!author) { // Create author if doesn't exist.
            logger.info('Creating new author: ' + authorAddress);
            let newAuthor = new Author({
              _id: authorAddress,
              reviews: [review._id]
            });
            return newAuthor.save();
          }
          logger.info(`Found author ${author.id}`);
          author.blockchainReviews.push(review._id);
          return author.save();
        });
    })
    .then(() => {
      return updateBlockOfLastEvent(event.blockNumber);
    })
    .then(logger.info('Successfully added the blockchain review'))
    .catch(err => logger.error('Error while logAddedReview:', err));
};

/**
 * Function called when a DeleteReview event is caught
 * 
 * @param {Event}
 * @returns {Promise}
 */
exports.logDeletedReview = (event) => {
  let reviewId = event.returnValues.id;
  let authorAddress = event.returnValues.from;
  logger.info(`Deleting review ${reviewId}`);
  return BlockchainReview.findOneAndDelete({ id: reviewId })
    .then((deletedReview) => {
      logger.info('Deleted review, now deleting ' + deletedReview._id + ' in author blockchainReviews ' + authorAddress);
      return Author.findByIdAndUpdate(authorAddress, { $pull: { blockchainReviews: deletedReview._id } })
        .catch('No authors found');
    })
    .then(() => {
      return updateBlockOfLastEvent(event.blockNumber);
    })
    .then(() => logger.info(`Successfully deleted review ${reviewId}`))
    .catch(err => logger.error('Error while logDeletedReview:', err));
};


/**
 * Function to index vouched Reviews to local Mongo DB.
 * 
 * @param {Event} event - Event emitted when review is added.
 * @param {ContractInstance} instance - Contracts instance to interact with. Needed to retrieve the review data using the id in the event.
 * @returns {Promise}
 */
exports.logVouchedReview = (event) => {
  let id = event.returnValues.id;
  let authorAddress = event.returnValues.from;
  logger.info(`Caught vouched review ${id} from ${authorAddress}`);

  return BlockchainReview.findOne({ id: id })
    .then(review => {
      if (!review)
        throw new Error('Review not found');
      review.vouchers.push(authorAddress);
      if (review.vouchers.length == 1)
        review.verified = true;
      return review.save();
    })
    .then(() => {
      return updateBlockOfLastEvent(event.blockNumber);
    })
    .then(logger.info('Successfully logged the vouched review'))
    .catch(logger.error);
};

/**
 * Function that compares the block number of the caught event and BlockchainReviewMeta.blockOfLastEvent. Updates BlockchainReviewMeta.blockOfLastEvent to the new block number if higher.
 * 
 * @param {Number} eventBlockNumber 
 */
function updateBlockOfLastEvent(eventBlockNumber) {
  return BlockchainReviewMeta.findOne()
    .then(metadata => {
      // Update blockOfLastEvent that is caught if this event is more recent.
      if (eventBlockNumber > metadata.blockOfLastEvent) {
        logger.info(`Updating block of last event to ${eventBlockNumber}`);
        metadata.blockOfLastEvent = eventBlockNumber;
        return metadata.save();
      }
    })
    .catch(err => logger.error('Error at updateBlockOfLastEvent with eventblockNumber ' + eventBlockNumber + ': ', err));
}