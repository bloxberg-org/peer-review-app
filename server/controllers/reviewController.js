/* eslint-disable indent */
// const connection = require('../connection/reviewConnection');
const Review = require('../models/Review');
const BlockchainReview = require('../models/BlockchainReview');
const Author = require('../models/ReviewAuthor');
const { getXML, getWithPublonsAuth } = require('../utils/restUtils');
const { xml2json } = require('xml-js');
const { extractReviewFromJsonDoc, downloadAndHashPdf, extractListOfReviews } = require('./utils/reviewControllerUtils');
const logger = require('winston');

/**
 * GET /reviews/all
 * 
 * Middleware function to get blockchain reviews that are indexed by the indexer listening to events.
 */
exports.getIndexedReviews = (req, res) => {

  logger.info('Requested all reviews');
  // Commenting these lines out as we stop paginating server side. Instead we fetch all indexed reviews and filter client-side. 

  // Parse queries.
  // let page = req.query.page || 1; // Default page 1.
  let limit = req.query.limit;
  let sortOrder = req.query.sortOrder || 'desc';
  // let search = req.query.search;
  let sortBy = req.query.sortBy || 'createdAt';

  // mongoose-paginate options
  let sort = { [sortBy]: sortOrder };
  // let query = buildReviewSearchQuery(search);

  if (sortBy === 'vouchers') {
    // from https://stackoverflow.com/questions/9040161/mongo-order-by-length-of-array
    BlockchainReview.aggregate([
      {
        $addFields: { vouchersCount: { $size: { '$ifNull': ['$vouchers', []] } } }
      },
      {
        $sort: { 'vouchersCount': -1 }
      },
      { '$limit': limit }
    ])
      .then((results) => {
        res.status(200).json(results);
      })
      .catch(logger.error);
  } else {
    BlockchainReview.find({}).sort(sort).populate('author')
      .then((results) => {
        logger.info(`Sending ${results.length} reviews`);
        res.status(200).json(results);
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

/**
 * Commented out for the same reason above: not server-side paginating anymore. Fetching all indexed reviews and filtering client-side isntead.
 * Builds the mongoose query object for text search in review fields publisher, url...
 *
 * @param {String} searchedString - text to search
 */
// function buildReviewSearchQuery(searchedString) {
//   if (!searchedString)
//     return {};

//   return {
//     $or: [
//       { 'publisher': { $regex: '.*' + searchedString + '.*' } },
//       { 'url': { $regex: '.*' + searchedString + '.*' } }
//     ]
//   };
// }

/**
 * Commented out for the same reason above: not server-side paginating anymore. Fetching all indexed reviews and filtering client-side isntead.
 * Builds the mongoose query object for text search in author fields: firstName, lastName, email,
 *
 * @param {String} searchedString - Text to search
 */
// function buildAuthorSearchQuery(searchedString) {
//   if (!searchedString)
//     return {};

//   return {
//     $or: [
//       { 'firstName': { $regex: '.*' + searchedString + '.*' } },
//       { 'lastName': { $regex: '.*' + searchedString + '.*' } },
//       { 'email': { $regex: '.*' + searchedString + '.*' } }
//     ]
//   };
// }
