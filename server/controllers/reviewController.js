// const connection = require('../connection/reviewConnection');
const Review = require('../models/Review');
const Scholar = require('../models/Scholar');
const { getXML } = require('../utils/restUtils');

// POST /reviews
exports.addReview = (req, res) => {
  console.log('IN ADD REVIEW');
  console.log(req.body);

  let address = req.params.address;
  let review = new Review(req.body);

  // "join" scholar and review through review id
  Scholar.findById(address).then(author => {
    author.reviews.push(review._id); // Add review ID to scholar field
    author.save();
  });

  review.save().then(
    console.log('Successfully saved the review')
  ).catch(err => console.log(err));

  res.status(200).send('SUCCESS');
};

// GET /reviews/:address
exports.getAllReviews = (req, res) => {
  console.log('IN GET ALL REVIEWS');

  let address = req.params.address;
  console.log(`Address is: ${address}`);

  Scholar.findById(address).populate('reviews').then(scholar => {
    res.status(200).json(scholar.reviews);
  }).catch(err => res.status(500).send(err));
};

// GET /reviews/:address/:index
exports.getReview = (req, res) => {
  let address = req.params.address;
  let index = req.params.index;
  console.log('IN GET ONE REVIEW');

  Review.findOne({ author: address, index: index }).then(review => {
    console.log(review);
    res.status(200).json(review);
  }).catch(err => res.status(404).send(err));
};

// GET /reviews/xml/f1000research/?doi=10.12688/f1000research.19542.1
exports.getReviewXML = (req, res) => {
  console.log('IN getReviewXML');
  let source = req.params.source; // f1000research, orchid etc.
  let doi = req.query.doi;
  let URL = '';

  if (!source || !doi)
    res.status(400).send('Bad Request');

  if (source === 'f1000research') {
    URL = 'https://f1000research.com/extapi/article/xml?doi=';
  } else {
    res.status(400).send('Unsupported Source');
  }

  getXML(`${URL}${doi}`).then((data) => {
    if (!data)
      res.status(404).send('XML is empty');
    res.status(200).type('application/xml').send(data);
  }).catch(err => res.status(500).send(err));
};

// exports.getReview = async (req, res) => {
//   let review;
//   try {
//     review = await connection.getReview(req.params.addr, req.params.reviewIndex);
//     console.log(review);

//     let response = {
//       journalId: review[0],
//       manuscriptId: review[1],
//       manuscripthash: review[2],
//       timestamp: review[3].toNumber(), // Handle BigNumber
//       recommendation: review[4].toNumber(),
//       verified: review[5],
//       vouchers: review[6]
//     };
//     res.json(response);
//   } catch (e) {
//     console.log(e);
//     res.status(404).json({ message: 'Review not found' });
//   }
// };

// exports.vouchReview = async (req, res) => {
//   let voucher = req.params.addr;
//   let index = req.params.reviewIndex;
//   try {
//     await connection.vouchReview(voucher, index);
//     res.status(200).json({ author: voucher, index: index });
//   } catch (e) {
//     console.log('Error vouching review');
//     res.status(500).send(e);
//   }
// };