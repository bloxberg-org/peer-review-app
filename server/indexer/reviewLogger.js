const BlockchainReview = require('../models/BlockchainReview');
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
 */
exports.logAddedReview = (event, instance) => {
  let id = event.returnValues.id;
  let authorAddress = event.returnValues.from;
  logger.info(`Review added by ${authorAddress} with id: ${id}`);
  // Get the review data by calling contract method getReview(id)
  instance.methods.getReview(id).call()
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
      let reviewToAdd = new BlockchainReview(reviewData);
      return reviewToAdd.save();
    })
    .then((review) => { // After saving the review, push into author's review array.
      // Get the author obj.
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
    .then(logger.info('Successfully added the blockchain review'))
    .catch(err => logger.error('Error while logAddedReview:', err));
};

exports.logDeletedReview = (event) => {
  let reviewId = event.returnValues.id;
  let authorAddress = event.returnValues.from;
  logger.info(`Deleting review ${reviewId}`);
  BlockchainReview.findOneAndDelete({ id: reviewId })
    .then((deletedReview) => {
      logger.info('Deleted review, now deleting ' + deletedReview._id + ' in author blockchainReviews ' + authorAddress);
      return Author.findByIdAndUpdate(authorAddress, { $pull: { blockchainReviews: deletedReview._id } })
        .catch('No authors found');
    })
    .then(() => logger.info(`Successfully deleted review ${reviewId}`))
    .catch(err => logger.error('Error while logDeletedReview:', err));
};