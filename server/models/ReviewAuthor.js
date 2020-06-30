const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewAuthorSchema = new mongoose.Schema({
  _id: String,
  firstName: String,
  lastName: String,
  email: String,
  profilePicture: Buffer,
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
  orcid: String,
  orcidAccessToken: String,
  blockchainReviews: [{ type: Schema.Types.ObjectId, ref: 'BlockchainReview' }]
}, { timestamps: true });

module.exports = mongoose.model('ReviewAuthor', ReviewAuthorSchema);
