import * as connection from '../connection/reviewConnection';
import getWeb3 from '../connection/web3';
import { get } from './endpoint';

// --------- ADDS REVIEW USING BACKEND ---------
// export const addReview = (data) => {
//   console.log('In Addreview');
//   return getWeb3().then((web3) => {
//     console.log('Got Web3');
//     web3.eth.getAccounts().then((accounts) => {
//       console.log('Got Accounts');
//       let URI = `/users/${accounts[0]}/reviews`;
//       return post(URI, data);
//     });
//   }).catch(e => console.log(e));

// };

// Add the review from frontend
export const addReview = (data) => {
  return connection.addReview(data);
}

export const getAllReviews = () => {
  console.log('In getAllRegviews');
  return new Promise((resolve, reject) => {
    getWeb3().then((web3) => {
      console.log('Got Web3');
      web3.eth.getAccounts().then((accounts) => {
        console.log('Got accounts');
        let URI = `/users/${accounts[0]}/reviews`;
        get(URI).then(res => res.json()).then(obj => {
          resolve(obj.reviews);
        });
      });
    }).catch(e => reject(e));
  });
};