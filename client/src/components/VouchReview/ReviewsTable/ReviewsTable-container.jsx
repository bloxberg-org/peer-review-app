import React, { useEffect, useState } from 'react';
import { getAllAuthorNames } from '../../../utils/authors';
import { getIndexedReviews, vouchReview } from '../../../utils/review';
import Loader from '../../Loader';
import ReviewsTableView from './ReviewsTable-view';

// Using functional component to be able to use react-table hooks.
export default function ReviewsTableContainer(props) {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    // TODO: Paginate reviews with search. For now just fetch 100 reviews.
    let reviewsAndAuthorsPromises = [getIndexedReviews({}, 1, 100), getAllAuthorNames()]; // Fetch reviews and authors paralelly.
    Promise.all(reviewsAndAuthorsPromises)
      .then(valuesArray => {
        let fetchedReviews = valuesArray[0];
        let authorsMap = valuesArray[1]; // An object with author addresses as keys and object {firstName, lastName} as values.
        let reviewsWithAuthorNames = replaceAuthorAddressWithNames(fetchedReviews, authorsMap);
        setReviews(reviewsWithAuthorNames);
        setIsLoading(false);
      });
  }, []); // Empty array passed as dependency to avoid calling every time i.e. call useEffect once.

  // console.log reviews after state change
  useEffect(() => {
    console.log(reviews);
  }, [reviews]);

  /**
   * Function that takes an array of revies and returns a new array of reviews. Each review of the new array has the author field firstName + ' ' + lastName instead of the Ethereum address.
   * 
   * @param {Array} reviews 
   * @param {Object} authorsMap 
   * 
   * @returns {array} A new array of reviews with author field as names instead of address.
   */
  const replaceAuthorAddressWithNames = (reviews, authorsMap) => {
    console.log(authorsMap);
    return reviews.map(review => {
      let authorAddress = review.author;
      review.author = authorsMap[authorAddress].firstName + ' ' + authorsMap[authorAddress].lastName;
      return review;
    });
  };

  const vouchReviewWithId = (id) => {
    setIsLoading(true);
    vouchReview(id)
      .then(() => {
        setIsLoading(false);
      })
      .catch(console.error);
  };

  if (isLoading)
    return <Loader />;

  return (
    <ReviewsTableView reviews={reviews} {...props} vouchReviewWithId={vouchReviewWithId} />
  );
}