const fetch = require('node-fetch');
const { publonsAuthToken } = require('../config');

exports.getXML = (url) => {
  return fetch(url, {
    method: 'get',
    headers: {
      'Content-Type': 'application/xml'
    }
  }).then(res => res.text());
};

exports.getPDF = (url) => {
  return fetch(url, {
    method: 'get',
    headers: {
      'Content-Type': 'application/pdf'
    }
  }).then(res => res.blob());
};

exports.getWithPublonsAuth = (url) => {
  console.log(publonsAuthToken);
  return fetch(url, {
    method: 'get',
    headers: {
      'Authorization': publonsAuthToken,
      'Content-Type': 'application/json'
    }
  }).then(res => res.json());
};