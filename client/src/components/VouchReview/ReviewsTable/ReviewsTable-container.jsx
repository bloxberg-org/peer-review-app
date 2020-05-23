import React, { useEffect, useState } from 'react';
import { getAllAuthorNames } from '../../../utils/authors';
import { getIndexedReviews, vouchReview } from '../../../utils/review';
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
    // TODO: Paginate reviews with search. For now just fetch 100 reviews.
    let reviewsAndAuthorsPromises = [getIndexedReviews({}, 1, 100), getAllAuthorNames()]; // Fetch reviews and authors paralelly.
    Promise.all(reviewsAndAuthorsPromises)
      .then(valuesArray => {
        setReviews(valuesArray[0]);
        setAuthorsMap(valuesArray[1]); // Save to state. Do the mapping in each row.
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