const Author = require('../models/ReviewAuthor');
// const mongo = require('../utils/mongo');
// const db = mongo.getDb();

// Get /accounts
exports.getAccount = async (req, res) => {
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