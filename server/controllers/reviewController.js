const connection = require('../connection/reviewConnection');

exports.getReview = async (req, res) => {
  let review;
  try {
    review = await connection.getReview(req.params.addr, req.params.index);
    console.log(review);
    // TODO: Format the returning array
    res.send(review);
  } catch (e) {
    return res.status(404).json({message: 'Review not found'});
  }
}

exports.addReview = async (req, res) => {
  console.log(`IN ADD REVIEW`);
  console.log(req.body);
  let review = req.body;
  let author = req.params.addr;

  try {
    let result = await connection.addReview(author, review);
    console.log(`Tx hash is ${result.tx}`);
    return res.status(200);
  } catch (e) {
    return res.status(500).json({error: e})
  }
}