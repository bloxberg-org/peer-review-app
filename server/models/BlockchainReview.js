const mongoose = require('mongoose');

const BlockchainReviewSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.String, ref: 'ReviewAuthor' },
  id: String,
  journalId: String,
  publisher: String,
  manuscriptId: String,
  manuscriptHash: String,
  reviewHash: String,
  timestamp: Number,
  recommendation: String,
  url: String,
  verified: Boolean,
  vouchers: [String],
  blockNumber: Number, // Block height when mined
  transactionIndex: Number // Tx id in the block
}, { timestamps: true });

module.exports = mongoose.model('BlockchainReview', BlockchainReviewSchema);