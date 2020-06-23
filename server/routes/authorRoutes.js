const { Router } = require('express');
const authorController = require('../controllers/authorController');

const routes = Router({ mergeParams: true }); // Merge to access parent params i.e. :addr

// /authors/
routes.get('/:address', authorController.getAuthor);
routes.post('/:address', authorController.addAuthor);
routes.put('/:address', authorController.updateAuthor);
routes.get('/', authorController.getAllAuthorNames);
module.exports = routes;