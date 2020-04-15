import React, { useEffect, useState } from 'react';
import { getIndexedReviews, vouchReview } from '../../../utils/review';
import Loader from '../../Loader';
import ReviewsTableView from './ReviewsTable-view';

// Using functional component to be able to use react-table hooks.
export default function ReviewsTableContainer(props) {
  const [reviews, setReviews] = useState([]);
  const [isVouching, setIsVouching] = useState(false);

  useEffect(() => {
    getIndexedReviews({}, 1, 10)
      .then(fetchedReviews => {
        setReviews(fetchedReviews);
      });
  }, []); // Empty array as dependency to avoid calling every time.

  // console.log reviews after state change
  useEffect(() => {
    console.log(reviews);
  }, [reviews]);


  const vouchReviewWithId = (id) => {
    setIsVouching(true);
    vouchReview(id)
      .then(setIsVouching(false))
      .catch(console.error);
  };

  if (isVouching)
    return <Loader />;
  return (
    <ReviewsTableView reviews={reviews} {...props} vouchReviewWithId={vouchReviewWithId} />
  );
}