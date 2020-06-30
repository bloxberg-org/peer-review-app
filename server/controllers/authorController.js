const Author = require('../models/ReviewAuthor');
// const mongo = require('../utils/mongo');
// const db = mongo.getDb();
const logger = require('winston');


// GET /authors/:address
exports.getAuthor = async (req, res) => {
  let address = req.params.address;
  logger.info('Address is');
  logger.info(address);

  Author.findById(address).then(author => {
    logger.info(`Returning the author: ${author}`);
    if (author)
      res.status(200).json(author);
    else
      res.status(404).send('No author found');
  }).catch(err => {
    res.status(500).send(err);
  });

  // logger.info(review);
  // review.save().then(
  //   logger.info('Successfully saved the review')
  // ).catch(err => logger.info(err));
};

// GET /authors/
exports.getAllAuthorNames = (_, res) => {
  Author.find({}).select({ _id: 1, firstName: 1, lastName: 1 })
    .then(authors => {
      logger.info(`Returning ${authors.length} authors`);
      let authorsMap = {}; // All authors as an object with address as keys and {fistName, lastName} as values.
      for (const author of authors) {
        authorsMap[author._id] = {
          firstName: author.firstName,
          lastName: author.lastName
        };
      }
      if (authors) // check no authors case.
        res.status(200).json(authorsMap); // Return the map.
      else
        res.status(404).send('No authors found');
    }).catch(err => {
      res.status(500).send(err);
    });
};

// POST /authors/
exports.addAuthor = (req, res) => {
  logger.info('IN ADD Author');
  logger.info(JSON.stringify(req.body));

  let address = req.params.address;
  let author = new Author(req.body);

  Author.findById(address)
    .then(foundAuthor => {
      if (foundAuthor) {
        res.status(400).json({ message: 'Author with address already registered' });
        throw new Error('Author with address' + address + ' already registered!');
      }
      return author.save();
    })
    .then(() => {
      logger.info('Successfully saved the author');
      res.status(200).json(author);
    })
    .catch(err => logger.error(err));
};

// PUT /authors/
exports.updateAuthor = (req, res) => {
  logger.info('In PUT Author');
  logger.info('Request body: ');
  let { _id, ...newAuthor } = req.body; // Strip _id off
  logger.info(JSON.stringify(newAuthor));
  let address = req.params.address;
  res.status(200);
  return Author.findByIdAndUpdate(address, newAuthor)
    .then(updatedAuthor => {
      res.status(200).json(updatedAuthor);
    })
    .catch(err => {
      res.status(404).send(err);
      logger.error(err);
    });
};
