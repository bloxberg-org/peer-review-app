const { Router } = require('express');
const reviewController = require('../controllers/reviewController');

const routes = Router({ mergeParams: true }); // Merge to access parent params i.e. :addr

// routes.get('/', reviewController.getAllReviews);
routes.post('/', reviewController.addReview);
// routes.get('/:reviewIndex', reviewController.getReview);

module.exports = routes;