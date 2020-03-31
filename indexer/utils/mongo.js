const mongoose = require('mongoose');
const config = require('../config');

var _db;

exports.connectToServer = () => {
  const dbConfig = config.database;
  const dbURI = config.databaseURI;
  mongoose.connect(dbURI, dbConfig, (err) => {
    if (err)
      console.log(err);
    else {
      _db = mongoose.connection;
      _db.on('error', () => {
        console.log('> error occurred from the database');
      });
      _db.once('open', () => {
        console.log('> successfully opened the database');
      });
      return _db;
    }
  });
};

exports.getDb = () => {
  return _db;
};
