const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const reviewRoutes = require('./routes/reviewRoutes');
const config = require('./config');

const app = express();
const port = 3000 || process.env.PORT;

// Connect to DB
const dbConfig = config.database;
const dbURI = config.databaseURI;
console.log(dbConfig);
console.log(dbURI);
mongoose.connect(dbURI, dbConfig, (err) => {
  if (err)
    console.log(err);
  else
    console.log('Should be connected...')
});
const db = mongoose.connection;
db.on("error", () => {
  console.log("> error occurred from the database");
});
db.once("open", () => {
  console.log("> successfully opened the database");
});


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3001'); // update to match the client domain
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// parse application/json
app.use(bodyParser.json());

app.use('/reviews', reviewRoutes);

app.listen(port, () => {

  // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
  // truffle_connect.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));

  console.log('Express Listening at http://localhost:' + port);

});

module.exports = app; // For testing 