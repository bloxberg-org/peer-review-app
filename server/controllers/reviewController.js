// const connection = require('../connection/reviewConnection');
const Review = require('../models/Review');
const Scholar = require('../models/Scholar');

// POST /review
exports.addReview = async (req, res) => {
  console.log('IN ADD REVIEW');
  console.log(req.body);

  let address = req.body.author;
  let review = new Review(req.body);
  Scholar.findById(address).then(author => {
    author.reviews.push(review._id);
    author.save();
  });

  review.save().then(
    console.log('Successfully saved the review')
  ).catch(err => console.log(err));


  res.status(200).send('SUCCESS');
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