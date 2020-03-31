exports.database = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'blockchain-reviews-test' // change db name accordingly
};

// Default: 
exports.databaseURI = process.env.MONGO_URL || 'mongodb://localhost:27017';
