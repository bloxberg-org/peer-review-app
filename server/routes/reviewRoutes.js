const { Router } = require('express');
const reviewController = require('../controllers/reviewController');

const routes = Router({ mergeParams: true }); // Merge to access parent params i.e. :addr

routes.get('/import/:source/', reviewController.importReviews);
routes.get('/xml/:source', reviewController.getReviewXML); // e.g. /xml/f1000research/?doi=10.12688/f1000research.19542.1
routes.get('/all', reviewController.getAllReviews);
routes.get('/:address/:id', reviewController.getReview);
routes.get('/:address', reviewController.getAllReviewsOfAddress);
routes.post('/:address', reviewController.addReview);
module.exports = routes;