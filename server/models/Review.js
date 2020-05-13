const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const ReviewSchema = new mongoose.Schema({
  id: String,
  author: { type: Schema.Types.String, ref: 'ReviewAuthor' },
  articleTitle: String,
  articleDOI: String,
  index: Number, // index on the blockchain storage Reviews[address][index]
  content: String
}, { timestamps: true });

ReviewSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Review', ReviewSchema);