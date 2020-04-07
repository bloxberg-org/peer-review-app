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
const reviewLogger = (event, instance) => {
  console.log('Event emitted');
  let id = event.returnValues.id;
  let authorAddress = event.returnValues._from;

  // Get the review data using id.
  instance.getReview(id)
    .then(review => {
      let reviewData = { // Create object to save. 
        id: review[0],
        author: authorAddress,
        journalId: review[1],
        publisher: review[2],
        manuscriptId: review[3],
        manuscripthash: review[4],
        timestamp: review[5].toNumber(), // Handle BigNumber
        recommendation: review[6].toNumber(),
        url: review[7],
        verified: review[8],
        vouchers: review[9]
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

module.exports = reviewLogger;