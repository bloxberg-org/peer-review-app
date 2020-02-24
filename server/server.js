const express = require('express');
const bodyParser = require('body-parser');

const reviewRoutes = require('./routes/reviewRoutes');
const accountRoutes = require('./routes/accountRoutes');
const registerRoutes = require('./routes/registerRoutes');
const mongo = require('./utils/mongo');

const app = express();
const port = process.env.PORT || 3000;

mongo.connectToServer();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:3001'); // update to match the client domain
  res.header('Access-Control-Allow-Origin', 'http://localhost:3001'); // update to match the client domain
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// parse application/json
app.use(bodyParser.json());

app.use('/reviews', reviewRoutes);
app.use('/accounts', accountRoutes);
app.use('/register', registerRoutes);

app.listen(port, () => {

  // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
  // truffle_connect.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));

  console.log('Express Listening at http://localhost:' + port);

});

module.exports = app; // For testing
