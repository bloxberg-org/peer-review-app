const URL = 'http://localhost:3000';

export const post = (endpoint, body) => {
  console.log(`IN POST`)
  console.log(body);
  return fetch(URL + endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
};

export const get = (endpoint) => {
  return fetch(URL + endpoint, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  });
};