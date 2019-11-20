const { Router } = require('express');
const reviewController = require('../controllers/reviewController');

const routes = Router({ mergeParams: true }); // Merge to access parent params i.e. :addr

routes.get('/xml/:source', reviewController.getReviewXML); // e.g. /xml/f1000research/?doi=10.12688/f1000research.19542.1
routes.get('/:address/:index', reviewController.getReview);
routes.get('/:address', reviewController.getAllReviews);
routes.post('/:address', reviewController.addReview);
module.exports = routes;