const mongoose = require('mongoose');
const config = require('../config');
const logger = require('winston')

var _db;

exports.connectToServer = () => {
  const dbConfig = config.database;
  const dbURI = config.databaseURI;
  mongoose.connect(dbURI, dbConfig, (err) => {
    if (err)
      logger.log(err);
    else {
      _db = mongoose.connection;
      _db.on('error', () => {
        logger.log('> error occurred from the database');
      });
      _db.once('open', () => {
        logger.log('> successfully opened the database');
      });
      return _db;
    }
  });
};

exports.getDb = () => {
  return _db;
};
