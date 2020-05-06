const winston = require('winston');

// ===== Set winston logger up ======

var options = {
  infofile: {
    level: 'info',
    filename: 'logs/combined.log',
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5
  },
  errorfile: {
    level: 'error',
    filename: 'logs/error.log',
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5
  }
};

// code from: https://github.com/winstonjs/winston
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    //
    // - Write all logs with level `error` and below to `error.log`
    // - Write all logs with level `info` and below to `combined.log`
    //
    new winston.transports.File(options.errorfile),
    new winston.transports.File(options.infofile)
  ]
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
// 
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

// By default, morgan outputs to the console only, so let’s define a stream function that will be able to get morgan-generated output into the winston log files. 
// from: https://jojozhuang.github.io/tutorial/express-js/express-combine-morgan-and-winston/
logger.stream = {
  write: function (message, encoding) {
    // use the 'info' log level so the output will be picked up by both transports
    logger.info(message);
  }
};

logger.combinedFormat = function (err, req, res) {
  // Similar combined format in morgan
  // :remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"
  return `${req.ip} - - [${clfDate(
    new Date()
  )}] \"${req.method} ${req.originalUrl} HTTP/${req.httpVersion}\" ${err.status ||
  500} - ${req.headers["user-agent"]}`;
};

module.exports = logger;