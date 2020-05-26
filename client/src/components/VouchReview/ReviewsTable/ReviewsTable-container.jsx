import React, { useEffect, useState } from 'react';
import { getAllIndexedReviews, vouchReview } from '../../../utils/review';
import Loader from '../../Loader';
import ReviewsTableView from './ReviewsTable-view';

// Using functional component to be able to use react-table hooks.
export default function ReviewsTableContainer(props) {
  const [reviews, setReviews] = useState([]);
  const [authorsMap, setAuthorsMap] = useState({}); // An object with author addresses as keys and object { firstName, lastName } as values.
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    init();
  }, []); // Empty array passed as dependency to avoid calling every time i.e. call useEffect once.

  // console.log reviews after state change
  useEffect(() => {
    console.log(reviews);
  }, [reviews]);

  const init = () => {
    setIsLoading(true);
    getAllIndexedReviews()
      .then(reviews => {
        setReviews(reviews);
        setIsLoading(false);
      });
  };
  /**
   * Function that takes an author address and returns the corresponding firstName + ' ' + lastName
   * 
   * @param {String} adress - author address
   * 
   * @returns {String} - concatanated first name and last name of author.
   */
  const getAuthorNameFromAddress = (address) => {
    console.log(authorsMap);
    return authorsMap[address].firstName + ' ' + authorsMap[address].lastName;
  };

  const vouchReviewWithId = (id) => {
    setIsLoading(true);
    vouchReview(id)
      .then(() => {
        init(); // refresh to turn vouch button to disabled;
      })
      .catch(console.error);
  };

  if (isLoading)
    return <Loader />;

  return (
    <ReviewsTableView reviews={reviews} {...props} vouchReviewWithId={vouchReviewWithId} getAuthorNameFromAddress={getAuthorNameFromAddress} />
  );
}