const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const BlockchainReviewSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.String, ref: 'Author' },
  id: String,
  journalId: String,
  publisher: String,
  manuscriptId: String,
  manuscriptHash: String,
  timestamp: Number,
  recommendation: String,
  url: String,
  verified: Boolean,
  vouchers: [String],
  blockNumber: Number, // Block height when mined
  transactionIndex: Number // Tx id in the block
}, { timestamps: true });

BlockchainReviewSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('BlockchainReview', BlockchainReviewSchema);