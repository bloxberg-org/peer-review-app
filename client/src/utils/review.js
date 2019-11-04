import getWeb3 from '../connection/web3';
import { get } from './endpoint';

export const addReview = (data) => {
  // return (post(`/users/${account}/reviews`, data));
};

export const getAllReviews = () => {
  return new Promise((resolve, reject) => {
    getWeb3().then((web3) => {
      web3.eth.getAccounts().then((accounts) => {
        let URI = `/users/${accounts[0]}/reviews`;
        console.log(URI);
        get(URI).then(res => res.json()).then(obj => {
          console.log(obj.reviews);
          resolve(obj.reviews);
        });
      })
    }).catch(e => reject(e));
  })
};