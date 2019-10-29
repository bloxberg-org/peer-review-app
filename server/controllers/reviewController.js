const connection = require('../connection/reviewConnection');

exports.getAllReviews = async (req, res) => {
  let addr = req.params.addr;
  let reviewCount;
  try {
    reviewCount = await connection.getReviewCount(addr);
  } catch (e) {
    console.log('Error getting review count');
    res.status(500).send({ error: e });
  }

  let reviewPromises = [];
  for (let i = 0; i < reviewCount; i++) {
    reviewPromises.push(connection.getReview(addr, i));
  }

  Promise.all(reviewPromises).then((reviewArr => {
    let response = reviewArr.map((review) => {
      return {
        journalId: review[0],
        manuscriptId: review[1],
        manuscripthash: review[2],
        timestamp: review[3].toNumber(), // Handle BigNumber
        recommendation: review[4].toNumber(),
        verified: review[5],
        vouchers: review[6]
      };
    });
    res.status(200).json({ reviews: response });
  })).catch((e) => {
    console.log('Error fetching reviews');
    res.status(500).send(e);
  });
};

exports.addReview = async (req, res) => {
  console.log('IN ADD REVIEW');
  console.log(req.body);
  let review = req.body;
  let author = req.params.addr;

  try {
    let result = await connection.addReview(author, review);
    console.log(`Tx hash is ${result.tx}`);
    res.status(200).json(result);
  } catch (e) {
    res.status(500).send({ error: e });
  }
};

exports.getReview = async (req, res) => {
  let review;
  try {
    review = await connection.getReview(req.params.addr, req.params.reviewIndex);
    console.log(review);

    let response = {
      journalId: review[0],
      manuscriptId: review[1],
      manuscripthash: review[2],
      timestamp: review[3].toNumber(), // Handle BigNumber
      recommendation: review[4].toNumber(),
      verified: review[5],
      vouchers: review[6]
    };
    res.json(response);
  } catch (e) {
    console.log(e);
    res.status(404).json({ message: 'Review not found' });
  }
};

exports.vouchReview = async (req, res) => {
  let voucher = req.params.addr;
  let index = req.params.reviewIndex;
  try {
    await connection.vouchReview(voucher, index);
    res.status(200).json({ author: voucher, index: index });
  } catch (e) {
    console.log('Error vouching review');
    res.status(500).send(e);
  }
};