const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new mongoose.Schema({
  id: String,
  author: { type: Schema.Types.String, ref: 'ReviewAuthor' },
  articleTitle: String,
  articleDOI: String,
  index: Number, // index on the blockchain storage Reviews[address][index]
  content: String
});

module.exports = mongoose.model('Review', ReviewSchema);