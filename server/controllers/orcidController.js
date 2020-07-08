const fetch = require('node-fetch');
const logger = require('winston');

const ORCiD_URL = process.env.NODE_ENV === 'development' ? 'https://sandbox.orcid.org' : 'https://orcid.org';

// POST /authors/oauth/token
exports.requestAccessToken = (req, res) => {
  let { code } = req.body;
  logger.info('Received ORCiD acces token req with code: ', code);

  let URL = ORCiD_URL + '/oauth/token';
  let CLIENT_ID = process.env.NODE_ENV === 'development' ? process.env.ORCID_SANDBOX_CLIENT_ID : process.env.ORCID_CLIENT_ID;
  let CLIENT_SECRET = process.env.NODE_ENV === 'development' ? process.env.ORCID_SANDBOX_CLIENT_SECRET : process.env.ORCID_CLIENT_SECRET;
  let data =
    'client_id=' + CLIENT_ID +
    '&client_secret=' + CLIENT_SECRET +
    '&grant_type=authorization_code' +
    '&code=' + code;

  logger.info('POST ' + URL + ' with ' + data);
  return fetch(URL, {
    method: 'post',
    body: data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json'
    }
  })
    .then(response => response.json())
    .then(userData => {
      logger.info('Sending ORCiD user data: ', userData);
      res.status(200).json(userData);
    })
    .catch(err => {
      res.status(500).send(err);
      logger.error(err);
    });
};

// GET /authors/orcid/:orcid/:endpoint
exports.requestRecord = (req, res) => {
  let auth = req.get('Authorization');
  let orcid = req.params.orcid;
  let endpoint = req.params.endpoint;
  let headers = {
    'Authorization': auth,
    'Accept': 'application/json'
  };
  fetch(ORCiD_URL + '/' + orcid + '/' + endpoint, {
    method: 'GET',
    headers: headers
  })
    .then(response => response.json())
    .then(json => res.status(200).json(json))
    .catch(err => {
      logger.error(err);
      res.status(500).send(err);
    });
}