/* eslint-disable indent */
// const connection = require('../connection/reviewConnection');
const Scholar = require('../models/Scholar');

// POST /reviews
exports.addScholar = (req, res) => {
  console.log('IN ADD SCHOLAR');
  console.log(req.body);

  let address = req.params.address;
  let scholar = new Scholar(req.body);

  console.log(scholar);
  // Mutual field for scholar and review to "join"
  Scholar.findById(address).then(author => {
    console.error('Scholar with address' + author + ' already registered!');
    return;
  });

  scholar.save().then(() => {
    console.log('Successfully saved the scholar');
    res.status(200).json(scholar);
  }
  ).catch(err => console.log(err));

};
