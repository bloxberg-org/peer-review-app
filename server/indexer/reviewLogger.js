const BlockchainReview = require('../models/BlockchainReview');
const Author = require('../models/ReviewAuthor');

/**
 * Function to index reviews to local Mongo DB.
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
  console.log(event.returnValues);
  console.log(`Review added by ${authorAddress} with id: ${id}`);
  // Get the review data using id.
  instance.getReview(id)
    .then(review => {
      let reviewData = { // Create object to save. 
        id: review[0],
        author: review[1],
        journalId: review[2],
        publisher: review[3],
        manuscriptId: review[4],
        manuscripthash: review[5],
        timestamp: review[6].toNumber(), // Handle BigNumber
        recommendation: review[7].toNumber(),
        url: review[8],
        verified: review[9],
        vouchers: review[10]
      };
      let reviewToAdd = new BlockchainReview(reviewData);
      return reviewToAdd.save();
    })
    .then((review) => { // After saving the review, push into author's review array.
      // Get the author obj.
      return Author.findById(authorAddress)
        .then(author => {
          if (!author) { // Create author if doesn't exist.
            console.log('Creating new author: ' + authorAddress);
            let newAuthor = new Author({
              _id: authorAddress,
              reviews: [review._id]
            });
            return newAuthor.save();
          }
          console.log('Found author');
          console.log(author);
          author.blockchainReviews.push(review._id);
          return author.save();
        });
    })
    .then(console.log('Successfully added the blockchain review'))
    .catch(console.error);
};

exports.logDeletedReview = (event) => {
  let reviewId = event.returnValues.id;
  let authorAddress = event.returnValues.from;
  console.log(`Deleting review ${reviewId}`)
  BlockchainReview.findOneAndDelete({ id: reviewId })
    .then((deletedReview) => {
      console.log('Deleted review, now deleting ' + deletedReview._id + ' in author blockchainReviews ' + authorAddress)
      return Author.findByIdAndUpdate(authorAddress, { $pull: { blockchainReviews: deletedReview._id } })
        .catch('No authors found');
    })
    .then(`Successfully deleted review ${reviewId}`)
    .catch(console.error);
};