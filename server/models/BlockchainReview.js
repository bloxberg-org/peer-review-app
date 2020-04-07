const mongoose = require('mongoose');
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

module.exports = mongoose.model('BlockchainReview', BlockchainReviewSchema);