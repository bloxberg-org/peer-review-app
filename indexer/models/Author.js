const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AuthorSchema = new mongoose.Schema({
  _id: String,
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }]
});

module.exports = mongoose.model('Author', AuthorSchema);
