// Edit and name this file as config.js

exports.database = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: process.env.NODE_ENV === 'development' ? 'test' : 'peer-review' // change db name accordingly
};

// Default: 
exports.databaseURI = process.env.MONGO_URL || 'mongodb://localhost:27017';

// publons token
exports.publonsAuthToken = process.env.PUBLONS_AUTH_TOKEN;
