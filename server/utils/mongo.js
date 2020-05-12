const mongoose = require('mongoose');
const config = require('../config');
const logger = require('winston')

var _db;

exports.connectToServer = () => {
  const dbConfig = config.database;
  const dbURI = config.databaseURI;
  mongoose.connect(dbURI, dbConfig, (err) => {
    if (err)
      logger.info(err);
    else {
      _db = mongoose.connection;
      _db.on('error', () => {
        logger.error('> error occurred from the database');
      });
      _db.once('open', () => {
        logger.info('> successfully opened the database');
      });
      return _db;
    }
  });
};

exports.getDb = () => {
  return _db;
};
