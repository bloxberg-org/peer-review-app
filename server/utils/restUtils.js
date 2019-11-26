const fetch = require('node-fetch');

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
