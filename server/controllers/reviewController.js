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
    await connection.addReview(author, review)
    return res.status(200);
  } catch (e) {
    return res.status(500).json({message: 'A problem occured'})
  }
}