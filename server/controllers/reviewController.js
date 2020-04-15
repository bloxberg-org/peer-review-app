/* eslint-disable indent */
// const connection = require('../connection/reviewConnection');
const Review = require('../models/Review');
const BlockchainReview = require('../models/BlockchainReview');
const Author = require('../models/ReviewAuthor');
const { getXML, getWithPublonsAuth } = require('../utils/restUtils');
const { xml2json } = require('xml-js');
const { extractReviewFromJsonDoc, downloadAndHashPdf, extractListOfReviews } = require('./utils/reviewControllerUtils');

// GET /reviews/all
/**
 * Function to get blockchain reviews that are indexed by indexer listening to events.
 */
exports.getIndexedReviews = (req, res) => {
  let page = req.query.page || 1; // Default page 1.
  let limit = req.query.limit || 10; // Default limit to 10.
  let queryType = req.query.queryType;
  let queryValue = req.query.queryValue;
  let options = {
    page: parseInt(page),
    limit: parseInt(limit)
  };
  console.log('Options are');
  console.log(options);
  let query;
  // Assign query value if exists. E.g. name, email, _id
  query = queryType ? query[queryType] = queryValue : {};
  BlockchainReview.paginate(query, options)
    .then((results) => {
      res.status(200).json(results.docs);
    })
    .catch(console.error);
};

// GET /reviews/import/publons/?academicId=${academicId}&page=${page}
exports.importReviews = (req, res) => {
  let source = req.params.source; // 'publons'
  let publonsURL = 'https://publons.com/api/v2/academic/review';
  let academicId = req.query.academicId;
  let page = req.query.page;
  if (source === 'publons') {
    let url = `${publonsURL}/?academic=${academicId}&page=${page}`;
    getWithPublonsAuth(url).then((reviews) => {
      res.status(200).json(reviews);
    }).catch((err) => res.send(err));
  } else {
    res.status(403).send('Bad source');
  }
};

// POST /reviews
exports.addReview = (req, res) => {
  console.log('IN ADD REVIEW');
  console.log(req.body);

  let address = req.params.address;
  let review = new Review(req.body);
  console.log(review);
  // Mutual field for author and review to "join"
  Author.findById(address).then(author => {
    author.reviews.push(review._id); // Add review ID to author field
    author.save();
  });

  review.save().then(() => {
    console.log('Successfully saved the review');
    res.status(200).json(review);
  }
  ).catch(err => console.log(err));

};

// GET /reviews/:address
exports.getAllReviewsOfAddress = (req, res) => {
  console.log('IN GET ALL REVIEWS');

  let address = req.params.address;
  console.log(`Address is: ${address}`);

  Author.findById(address).populate('reviews').then(author => {
    res.status(200).json(author.reviews);
  }).catch(err => res.status(500).send(err));
};

// GET /reviews/:address/:index
exports.getReview = (req, res) => {
  let address = req.params.address;
  let id = req.params.id;
  console.log('IN GET ONE REVIEW');

  Review.findOne({ author: address, id: id }).then(review => {
    console.log(review);
    res.status(200).json(review);
  }).catch(err => res.status(404).send(err));
};

// GET /reviews/xml/f1000research/?doi=10.12688/f1000research.19542.1
exports.getReviewXML = (req, res) => {
  console.log('IN getReviewXML');
  let source = req.params.source; // f1000research, orchid etc.
  let doi = req.query.doi;
  let index = req.query.index;
  let xmlURL = '';
  let pdfURL = '';

  if (!source || !doi)
    res.status(400).send('Bad Request');

  if (source === 'f1000research') {
    xmlURL = 'https://f1000research.com/extapi/article/xml?doi=';
    pdfURL = 'https://f1000research.com/extapi/article/pdf?doi=';
  } else {
    res.status(400).send('Unsupported Source');
  }

  getXML(`${xmlURL}${doi}`).then(async (data) => {
    if (!data)
      res.status(404).send('XML is empty');
    // Parse XML to JSON
    let jsonText = xml2json(data, { compact: true, spaces: 2 }); // convert to json
    let jsonDoc = JSON.parse(jsonText);
    // If the specific review tied to this article is requested, send the review information.
    // Else, first send the list of reviews of this article to ask user which review to return 
    if (index) {
      downloadAndHashPdf(`${pdfURL}${doi}`).then((hash) => {
        let response = extractReviewFromJsonDoc(jsonDoc, index);
        response.manuscriptHash = hash;
        res.status(200).json(response);
      }).catch(err => console.log(err));
    } else {
      let reviews = extractListOfReviews(jsonDoc);
      res.status(200).json(reviews);
    }
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

