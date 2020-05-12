var logger = require('winston');
require('winston-daily-rotate-file');

// ===== Set winston logger up ======
// Use default logger of the library
// logger.createLogger(options)
// instead of declaring a new logger below with:
// var logger = logger.createLogger(....) as in the examples
var options = {
  infofile: {
    level: 'info',
    handleExceptions: true,
    json: true,
    // winston-daily-rotate-file options
    filename: 'logs/combined-%DATE%.log',
    datePattern: 'YYYY-MM-DD', // rotate every day
    maxFiles: '14d', // Keep biweekly logs 
  },
  errorfile: {
    level: 'error',
    handleExceptions: true,
    json: true,
    // winston-daily-rotate-file options
    filename: 'logs/error-%DATE%.log',
    datePattern: 'YYYY-MM-DD', // rotate every day
    maxFiles: '14d', // Keep biweekly logs 
  }
};

// code from: https://github.com/winstonjs/winston
var mainLoggers = logger.createLogger({
  level: 'info',
  format: logger.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new logger.transports.DailyRotateFile(options.errorfile),
    new logger.transports.DailyRotateFile(options.infofile)
  ]
});

logger.add(mainLoggers);

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
// 
if (process.env.NODE_ENV !== 'production') {
  logger.add(new logger.transports.Console({
    format: logger.format.combine(
      logger.format.colorize(),
      logger.format.timestamp({
        format: 'HH:mm:ss'
      }),
      logger.format.align(),
      logger.format.printf(info => `${info.timestamp} [${info.level}]: ${info.message}`),
    ),
    level: 'info'
  }));
}

// By default, morgan outputs to the console only, so let’s define a stream function that will be able to get morgan-generated output into the winston log files. 
// from: https://jojozhuang.github.io/tutorial/express-js/express-combine-morgan-and-winston/
logger.stream = {
  write: function (message) {
    logger.info(message);
  }
};

// from: https://jojozhuang.github.io/tutorial/express-js/express-combine-morgan-and-winston/
logger.combinedFormat = function (err, req) {
  return `${req.ip} - - [${clfDate(
    new Date()
  )}] "${req.method} ${req.originalUrl} HTTP/${req.httpVersion}" ${err.status ||
  500} - ${req.headers['user-agent']}`;
};

module.exports = logger;