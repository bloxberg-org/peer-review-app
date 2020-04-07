const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const BlockchainReviewSchema = new mongoose.Schema({
  author: { type: Schema.Types.String, ref: 'Author' },
  id: String,
  journalId: String,
  publisher: String,
  manuscriptId: String,
  manuscriptHash: String,
  timestamp: Number,
  recommendation: String,
  url: String,
  verified: Boolean,
  vouchers: [String]
});

BlockchainReviewSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('BlockchainReview', BlockchainReviewSchema);