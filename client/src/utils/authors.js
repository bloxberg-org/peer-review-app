import { getCurrentAccount } from 'connection/reviewConnection';
import { get, post, put } from './endpoint';

export const getAllAuthorNames = () => {
  return get('/authors/');
};

/**
 * Function to add a single author.
 * Takes the object created by the form in Register page.
 *
 * @param {Object} data
 */
export const addAuthor = (data) => {
  return getCurrentAccount().then((address) => {
    // Prepare DB data.
    let dbData = {
      ...data,
      reviews: []
    };
    console.log(`User data to be saved: ${dbData}`);
    return post(`/authors/${address}`, dbData);
  });
};

export const updateAuthor = (author) => {
  console.log(author);
  return getCurrentAccount().then((address) => {
    console.log(`Sending put to /authors/${address}`);
    return put(`/authors/${address}`, author);
  });
};