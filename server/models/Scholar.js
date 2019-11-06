const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ScholarSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  addresses: [String],
  profilePicture: Buffer,
  reviews: { type: Schema.Types.ObjectId, ref: 'Review' }
});

module.exports = mongoose.model('Review', ScholarSchema);