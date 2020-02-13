import { getCurrentAccount } from '../connection/reviewConnection';
import { post } from './endpoint';

/**
 * Function to add a single scholar.
 * Takes the object created by the form in Register page.
 *
 * @param {Object} data
 */
export const addScholar = (data) => {
  return getCurrentAccount().then((address) => {
    // Prepare DB data.
    let dbData = {
      //_id: address,
      ...data,
      reviews: []
    };
    return post(`/register/${address}`, dbData);
  });
};
