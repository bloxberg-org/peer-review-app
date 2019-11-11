const { Router } = require('express');
const accountController = require('../controllers/accountController');

const routes = Router({ mergeParams: true }); // Merge to access parent params i.e. :addr

routes.get('/:address', accountController.getAccount);

module.exports = routes;