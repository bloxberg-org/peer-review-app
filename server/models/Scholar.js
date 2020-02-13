const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ScholarSchema = new mongoose.Schema({
  _id: String,
  firstName: String,
  lastName: String,
  email: String,
  profilePicture: Buffer,
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }]
});

module.exports = mongoose.model('Scholar', ScholarSchema);
