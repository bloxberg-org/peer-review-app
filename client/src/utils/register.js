import { getCurrentAccount } from '../connection/reviewConnection';
import { post } from './endpoint';

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
    return post(`/register/${address}`, dbData);
  });
};
