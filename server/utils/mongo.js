const mongoose = require('mongoose');
const config = require('../config');
const logger = require('winston');

var _db;

exports.connectToServer = () => {
  const dbConfig = config.database;
  const dbURI = config.databaseURI;
  // Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
  // by default, you need to set it to false. See https://mongoosejs.com/docs/deprecations.html#-findandmodify-
  mongoose.set('useFindAndModify', false);
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
