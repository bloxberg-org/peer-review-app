/* eslint-disable indent */
// const connection = require('../connection/reviewConnection');
const Author = require('../models/ReviewAuthor');

// POST /reviews
exports.addAuthor = (req, res) => {
  console.log('IN ADD Author');
  console.log(req.body);

  let address = req.params.address;
  let author = new Author(req.body);

  console.log(author);
  // Mutual field for author and review to "join"
  Author.findById(address).then(author => {
    console.error('Author with address' + author + ' already registered!');
    return;
  });

  author.save().then(() => {
    console.log('Successfully saved the author');
    res.status(200).json(author);
  }
  ).catch(err => console.log(err));

};
