/* eslint-disable indent */
// const connection = require('../connection/reviewConnection');
const Review = require('../models/Review');
const Scholar = require('../models/Scholar');
const { getXML } = require('../utils/restUtils');
const { xml2json } = require('xml-js');
const moment = require('moment');

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
  let index = req.query.index;
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

    // Parse XML to JSON
    let jsonText = xml2json(data, { compact: true, spaces: 2 }); // convert to json
    let jsonDoc = JSON.parse(jsonText);

    // If the specific review tied to this article is requested, just send the reivew information.
    // Else, first ask user which review to return 
    if (index) {
      console.log('REQUESTED REVIEW WITH ID ' + index);
      // Don't send the whole json, not needed. Filter out required fields.
      let reviewDoc = jsonDoc['article']['sub-article'][index];
      let articleMeta = jsonDoc['article']['front']['article-meta'];
      let journalMeta = jsonDoc['article']['front']['journal-meta'];
      let reviewBody = reviewDoc['body'];

      // Extract the review content from the converted json file. reviewBody object is of the following format:
      // 
      // p: [
      //   {
      //     _text: 'This is a well selected review that covers most of the essential 2018 works on Tourette syndrome.'
      //   },
      //   {
      //     _text: ' These measures are related to SMA and basal ganglia functioning which is pretty consistent with neuroimaging and electrophysio....
      // 
      // So we reduce the array under the field 'p'.
      // First set an empty string to be the initial value of the accumulator.
      // Then accumulate _text fields of each subsequent element , with a new line, into a single string.
      let reviewContent = reviewBody['p'].reduce((accumulator, currentVal) => {
        // TODO: Handle Arrays. We assume just one level of depth and Array of strings get concatenated via toString() automatically. This leaves emptry strings in the text for some reason.
        return accumulator + currentVal['_text'] + '\n';
      }, '');

      let reviewRecommendation = (() => {
        let reccommendationStr = reviewDoc['front-stub']['custom-meta-group']['custom-meta']['meta-value']['_text'];
        // TODO: Check returned strings for review and reject.
        // TODO: Change strings to numbers in accordance to the blockchain.
        console.log(reccommendationStr);
        switch (reccommendationStr) {
          case ('approve'):
            return 0;
          case ('review'):
            return 1;
          case ('reject'):
            return 2;
        }
      })(); // () to invoke immediately.

      let reviewPubDate = reviewDoc['front-stub']['pub-date']; // JSON object with day, month, year.
      let reviewPubTimestamp = moment(`${reviewPubDate['year']['_text']} ${reviewPubDate['month']['_text']} ${reviewPubDate['day']['_text']}`, 'YYYY MM DD');
      let response = {
        articleTitle: articleMeta['title-group']['article-title']['_text'],
        journalId: journalMeta['issn']['_text'],
        manuscriptID: articleMeta['article-id']['_text'],
        manuscriptHash: null,
        articleDOI: articleMeta['article-id']['_text'],
        // TODO: Check for other formats of recommentdation.
        recommendation: reviewRecommendation,
        timestamp: reviewPubTimestamp,
        content: reviewContent
      };
      res.status(200).json(response);
    } else {
      console.log('ASKING USER TO CHOOSE A REVIEW');
      let reviews = jsonDoc['article']['sub-article'];
      reviews = reviews.map(review => {
        return {
          author: {
            firstName: review['front-stub']['contrib-group']['contrib']['name']['given-names']['_text'],
            lastName: review['front-stub']['contrib-group']['contrib']['name']['surname']['_text'],
            uri: review['front-stub']['contrib-group']['contrib']['uri']['_text'],
          },
          date: {
            day: review['front-stub']['pub-date']['day']['_text'],
            month: review['front-stub']['pub-date']['month']['_text'],
            year: review['front-stub']['pub-date']['year']['_text']
          }
        };
      });
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