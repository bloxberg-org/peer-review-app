const fetch = require('node-fetch');
const { publonsAuthToken } = require('../config');
const logger = require('winston');

exports.getXML = (url) => {
  return fetch(url, {
    method: 'get',
    headers: {
      'Content-Type': 'application/xml'
    }
  })
    .then(checkStatus)
    .then(res => res.text());
};

exports.getPDF = (url) => {
  return fetch(url, {
    method: 'get',
    headers: {
      'Content-Type': 'application/pdf'
    }
  })
    .then(res => res.blob())
    .catch(logger.error);
};

exports.getWithPublonsAuth = (url) => {
  logger.info(publonsAuthToken);
  return fetch(url, {
    method: 'get',
    headers: {
      'Authorization': publonsAuthToken,
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .catch(logger.error);
};

// from https://www.npmjs.com/package/node-fetch#handling-client-and-server-errors
function checkStatus(res) {
  if (res.ok) { // res.status >= 200 && res.status < 300
    return res;
  } else {
    throw new CustomError(res.status, res);
  }
}

// similar to what has done here https://levelup.gitconnected.com/the-definite-guide-to-handling-errors-gracefully-in-javascript-58424d9c60e6
// include res in case verbose errors are sent such as a json with { description: 'invalid input'}. Use this res in the following handlers. restUtils.js should be generic.
class CustomError extends Error {
  constructor(status = 500, res) {
    super();

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }
    this.status = status;
    this.res = res;
  }
}