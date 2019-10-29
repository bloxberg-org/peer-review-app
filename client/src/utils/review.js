import { get, post } from './endpoint';

const account = '0xb454b9e3fB8307AE28d2E0243c5e99A47236a2e0';

export const addReview = (data) => {
  return (post(URL, `/users/${account}/reviews`, data));
};

export const getAllReviews = () => {
  return (get(`/users/${account}/reviews`));
};