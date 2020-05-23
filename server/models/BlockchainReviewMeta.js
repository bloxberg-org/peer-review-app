const mongoose = require('mongoose');

// Metadata on BlockchainReview. 
// Mainly needed for keeping track of the block of the last event synced. So that the indexer doesn't have to sync from the very first block each time it runs.
// TODO: How to store this information without declaring a whole model i.e. a whole collection? One way is to add a document with _id: 'meta' in BlockchainReview collection but this turns out to be difficult via mongoose. It does not fit the Schema. Need to install MongoDB js driver. Or add this collection as a workaround and update this. 
const BlockchainReviewMetaSchema = new mongoose.Schema({
  blockOfLastEvent: Number
}, { timestamps: true });

module.exports = mongoose.model('BlockchainReviewMeta', BlockchainReviewMetaSchema);