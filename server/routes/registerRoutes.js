const { Router } = require('express');
const registerController = require('../controllers/registerController');

const routes = Router({ mergeParams: true }); // Merge to access parent params i.e. :addr

routes.post('/:address', registerController.addScholar);
module.exports = routes;
