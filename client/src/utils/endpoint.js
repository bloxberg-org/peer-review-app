const URL = (process.env.REACT_APP_SERVER_ADDRESS || 'http://localhost:3000') + '/api';

export const post = (endpoint, body) => {
  console.log('IN POST');
  return fetch(URL + endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
    .then(handleErrors);
};

export const get = (endpoint) => {
  return fetch(URL + endpoint, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  })
    .then(handleErrors)
    .then(res => res.json());
};

export const put = (endpoint, body) => {
  console.log('IN PUT');
  console.log(body);
  return fetch(URL + endpoint, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
    .then(handleErrors);
};

export const getXML = (endpoint) => {
  return fetch(URL + endpoint, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/xml'
    },
  })
    .then(handleErrors)
    .then(res => res.text());
};

// Fetch does not `catch` HTTP statuses >3xx but has a handy ok flag. 
// Throw Error to be caught if HTTP status is not OK. 
// from https://www.tjvantoll.com/2015/09/13/fetch-and-errors/
function handleErrors(response) {
  if (!response.ok) {
    return response.json().then(errObj => {
      console.log(errObj);
      throw new Error(errObj.description);
    });
  }
  return response;
}