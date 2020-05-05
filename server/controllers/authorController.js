const Author = require('../models/ReviewAuthor');
// const mongo = require('../utils/mongo');
// const db = mongo.getDb();

// GET /authors/:address
exports.getAuthor = async (req, res) => {
  let address = req.params.address;
  console.log('Address is');
  console.log(address);

  Author.findById(address).then(author => {
    console.log(`Returning the author: ${author}`);
    if (author)
      res.status(200).json(author);
    else
      res.status(404).send('No author found');
  }).catch(err => {
    res.status(500).send(err);
  });

  // console.log(review);
  // review.save().then(
  //   console.log('Successfully saved the review')
  // ).catch(err => console.log(err));
};

// GET /authors/
exports.getAllAuthorNames = (_, res) => {
  Author.find({}).select({ _id: 1, firstName: 1, lastName: 1 })
    .then(authors => {
      console.log(`Returning ${authors.length} authors`);
      let authorsMap = {} // All authors as an object with address as keys and {fistName, lastName} as values.
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