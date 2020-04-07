// Utility functions used by the reviewController.js
const moment = require('moment');
const crypto = require('crypto');
const { getPDF } = require('../../utils/restUtils');

exports.extractReviewFromJsonDoc = (jsonDoc, index) => {
  console.log('REQUESTED REVIEW WITH ID ' + index);
  // Relevant fields of the whole json
  let reviewDoc = jsonDoc['article']['sub-article'][index];
  let articleMeta = jsonDoc['article']['front']['article-meta'];
  let journalMeta = jsonDoc['article']['front']['journal-meta'];
  let reviewBody = reviewDoc['body'];

  let response = {
    articleTitle: articleMeta['title-group']['article-title']['_text'],
    publisher: journalMeta['publisher']['publisher-name']['_text'],
    journalId: journalMeta['issn']['_text'],
    manuscriptId: articleMeta['article-id']['_text'],
    articleDOI: articleMeta['article-id']['_text'],
    url: 'http://www.doi.org/' + reviewDoc['front-stub']['article-id']['_text'],
    // TODO: Check for other formats of recommentdation.
    recommendation: extractRecommendation(reviewDoc),
    timestamp: extractReviewTimestamp(reviewDoc),
    content: extractReviewBody(reviewBody)
  };
  return response;
};

exports.downloadAndHashPdf = (URL) => {
  return new Promise((resolve, reject) => {
    console.log('DOWNLOADING PDF');
    getPDF(URL).then((blob) => {
      console.log('SUCCESSFULLY DONWLOADED PDF');
      let stream = blob.stream();
      let hash = crypto.createHash('sha256');
      hash.setEncoding('hex');
      stream.pipe(hash);

      // Event listener on when reading end.
      stream.on('end', function () {
        console.log('ENDED HASHING');
        hash.end();
        resolve(hash.read());
      });
    }).catch(err => reject(err));
  });
};

exports.extractListOfReviews = (jsonDoc) => {
  console.log('ASKING USER TO CHOOSE A REVIEW');
  let reviews = jsonDoc['article']['sub-article']; // Returns an array of reviews when there are 2 or more reivews.
  // TODO: What does it return when there's only 1 review? 
  console.log('Here are the unformatted reviews:');
  console.log(reviews);
  // Just format the response 
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
  console.log('Returning reviews:');
  console.log(reviews);
  return reviews;
};


// ============ Util functions for functions above ===========

function extractReviewBody(reviewBody) {

  // Extract the review content from the converted json file. 
  // reviewBody object is of the following format:
  // 
  // p: [
  //   {
  //     _text: 'This is a well selected review that covers most of the essential 2018 works on Tourette syndrome.'
  //   },
  //   {
  //     _text: ' These measures are related to SMA and basal ganglia functioning which is pretty consistent with neuroimaging and electrophysio....
  // 
  // We need the content of the review text under p.
  // So we reduce the array under the field 'p'.
  // First set an empty string to be the initial value of the accumulator.
  // Then accumulate _text fields of each subsequent element , with a new line, into a single string.
  let reviewContent = reviewBody['p'].reduce((accumulator, currentVal) => {
    // TODO: Handle Arrays. We assume just one level of depth and Array of strings get concatenated via toString() automatically. This leaves emptry strings in the text for some reason.
    return accumulator + currentVal['_text'] + '\n';
  }, '');

  return reviewContent;
}

function extractRecommendation(reviewDoc) {
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
}

function extractReviewTimestamp(reviewDoc) {
  let reviewPubDate = reviewDoc['front-stub']['pub-date']; // JSON object with day, month, year.
  let reviewPubTimestamp = moment(`${reviewPubDate['year']['_text']} ${reviewPubDate['month']['_text']} ${reviewPubDate['day']['_text']}`, 'YYYY MM DD');
  return reviewPubTimestamp;
}