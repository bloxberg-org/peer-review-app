/* eslint-disable indent */
// const connection = require('../connection/reviewConnection');
const Author = require('../models/ReviewAuthor');
const logger = require('winston');

// POST /reviews
exports.addAuthor = (req, res) => {
  logger.info('IN ADD Author');
  logger.info(req.body);

  let address = req.params.address;
  let author = new Author(req.body);

  logger.info(author);
  // Mutual field for author and review to "join"
  Author.findById(address).then(author => {
    logger.error('Author with address' + author + ' already registered!');
    return;
  });

  author.save().then(() => {
    logger.info('Successfully saved the author');
    res.status(200).json(author);
  }
  ).catch(err => logger.info(err));

};
