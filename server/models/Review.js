const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new mongoose.Schema({
  author: { type: Schema.Types.ObjectId, ref: 'Scholar' },
  articleDOI: String,
  index: Number, // index on the blockchain storage Reviews[address][index]
  content: { data: Buffer, contentType: String }, // Binary file or text
  contentFormat: String // pdf, text etc.
});

module.exports = mongoose.model('Review', ReviewSchema);