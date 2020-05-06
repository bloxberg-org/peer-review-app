const express = require('express');
const bodyParser = require('body-parser');
var winston = require('./config/winston');
var morgan = require('morgan');
var cors = require('cors');

const reviewRoutes = require('./routes/reviewRoutes');
const authorRoutes = require('./routes/authorRoutes');
const registerRoutes = require('./routes/registerRoutes');
const mongo = require('./utils/mongo');

const app = express();
const port = process.env.PORT || 3000;



// ====== Connect Mongo ========
mongo.connectToServer();


// ====== Connect morgan HTTP logger to winston 
app.use(morgan('combined', { stream: winston.stream }));

// ======== CORS Policy =======
const whitelist = ['http://127.0.0.1:3001', 'http://localhost:3001', 'http://127.0.0.1', 'http://localhost'];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 // Allow if origin found in whitelist
      || (process.env.NODE_ENV === 'development' && !origin)) { // or a REST tool (postman) is being used in development environment.
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS ' + origin));
    }
  },
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// Apply CORS policy
app.all('*', cors(corsOptions), function (req, res, next) {
  next();
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use('/api/reviews', reviewRoutes);
app.use('/api/authors', authorRoutes);
app.use('/api/register', registerRoutes);

app.listen(port, () => {

  winston.info('Express Listening at http://localhost:' + port);

});

winston.info('Running indexer:');
require('./indexer/index'); // Run the indexer

module.exports = app; // For testing
