const { Router } = require('express');
const reviewController = require('../controllers/reviewController');

const routes = Router({ mergeParams: true }); // Merge to access parent params i.e. :addr

routes.get('/reviews/:reviewIndex', reviewController.getReview);
routes.post('/reviews/:reviewIndex/vouch', reviewController.vouchReview); 
routes.post('/reviews', reviewController.addReview);

module.exports = routes;