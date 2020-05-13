/* eslint-disable indent */
// const connection = require('../connection/reviewConnection');
const Review = require('../models/Review');
const BlockchainReview = require('../models/BlockchainReview');
const Author = require('../models/ReviewAuthor');
const { getXML, getWithPublonsAuth } = require('../utils/restUtils');
const { xml2json } = require('xml-js');
const { extractReviewFromJsonDoc, downloadAndHashPdf, extractListOfReviews } = require('./utils/reviewControllerUtils');
const logger = require('winston');

// GET /reviews/all
/**
 * Function to get blockchain reviews that are indexed by indexer listening to events.
 */
exports.getIndexedReviews = (req, res) => {
  let page = req.query.page || 1; // Default page 1.
  let limit = req.query.limit || 10; // Default limit to 10.
  let sortBy = req.query.sortBy;
  let queryType = req.query.queryType;
  let queryValue = req.query.queryValue;
  let options = {
    page: parseInt(page),
    limit: parseInt(limit),
  };
  if (sortBy)
    options.sort = { createdAt: -1 };
  logger.info('Options are');
  logger.info(JSON.stringify(options));
  let query;
  // Assign query value if exists. E.g. name, email, _id
  query = queryType ? query[queryType] = queryValue : {};

  if (sortBy === 'vouchers') { //TODO: Write a seperate handler/controller for sort by vouchers
    // from https://stackoverflow.com/questions/9040161/mongo-order-by-length-of-array
    BlockchainReview.aggregate([
      {
        $addFields: { vouchersCount: { $size: { '$ifNull': ['$vouchers', []] } } }
      },
      {
        $sort: { 'vouchersCount': -1 }
      },
      { '$limit': options.limit }
    ])
      .then((results) => {
        res.status(200).json(results);
      })
      .catch(logger.error);

  } else {
    BlockchainReview.paginate(query, options)
      .then((results) => {
        res.status(200).json(results.docs);
      })
      .catch(logger.error);
  }
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
  logger.info('IN ADD REVIEW');
  logger.info(req.body);

  let address = req.params.address;
  let review = new Review(req.body);
  logger.info(review);
  // Mutual field for author and review to "join"
  Author.findById(address).then(author => {
    author.reviews.push(review._id); // Add review ID to author field
    author.save();
  });

  review.save().then(() => {
    logger.info('Successfully saved the review');
    res.status(200).json(review);
  }
  ).catch(err => logger.info(err));

};

// GET /reviews/:address
exports.getAllReviewsOfAddress = (req, res) => {
  logger.info('IN GET ALL REVIEWS');

  let address = req.params.address;
  logger.info(`Address is: ${address}`);

  Author.findById(address).populate('reviews').then(author => {
    res.status(200).json(author.reviews);
  }).catch(err => res.status(500).send(err));
};

// GET /reviews/:address/:index
exports.getReview = (req, res) => {
  let address = req.params.address;
  let id = req.params.id;
  logger.info('IN GET ONE REVIEW');

  Review.findOne({ author: address, id: id }).then(review => {
    logger.info(review);
    res.status(200).json(review);
  }).catch(err => res.status(404).send(err));
};

// GET /reviews/xml/f1000research/?doi=10.12688/f1000research.19542.1
exports.getReviewXML = (req, res) => {
  logger.info('IN getReviewXML');
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

  getXML(`${xmlURL}${doi}`)
    .then(async (data) => {
      logger.info('Entered here!!!');
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
        }).catch(err => logger.info(err));
      } else {
        let reviews = extractListOfReviews(jsonDoc);
        if (!reviews)
          throw new Error('No peer reviews found for this article');
        res.status(200).json(reviews);
      }
    }).catch(err => {
      err.status === 404 // getXML Not found
        ? res.status(404).json({ description: 'Invalid DOI or article not found in F1000R' })
        : res.status(404).json({ description: err.message });
      // send the status code from fetch request or generic 500 code.
    });
};

// exports.getReview = async (req, res) => {
//   let review;
//   try {
//     review = await connection.getReview(req.params.addr, req.params.reviewIndex);
//     logger.info(review);

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
//     logger.info(e);
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
//     logger.info('Error vouching review');
//     res.status(500).send(e);
//   }
// };

