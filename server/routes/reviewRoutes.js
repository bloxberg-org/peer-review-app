const { Router } = require('express');
const reviewController = require('../controllers/reviewController');

const routes = Router({ mergeParams: true }); // Merge to access parent params i.e. :addr

routes.get('/reviews', reviewController.getAllReviews);
routes.post('/reviews', reviewController.addReview);
routes.get('/reviews/:reviewIndex', reviewController.getReview);
routes.post('/reviews/:reviewIndex/vouch', reviewController.vouchReview); 

module.exports = routes;