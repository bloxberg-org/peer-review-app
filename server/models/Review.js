const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new mongoose.Schema({
  author: { type: Schema.Types.String, ref: 'Scholar' },
  articleDOI: String,
  index: Number, // index on the blockchain storage Reviews[address][index]
  content: String
});

module.exports = mongoose.model('Review', ReviewSchema);