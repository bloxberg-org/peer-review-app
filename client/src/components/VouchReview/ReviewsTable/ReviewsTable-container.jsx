import React, { useEffect, useState } from 'react';
import { getAllIndexedReviews, vouchReview } from '../../../utils/review';
import Loader from '../../Loader';
import ReviewsTableView from './ReviewsTable-view';

// Using functional component to be able to use react-table hooks.
export default function ReviewsTableContainer(props) {
  const [reviews, setReviews] = useState([]);
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
    <ReviewsTableView reviews={reviews} {...props} vouchReviewWithId={vouchReviewWithId} />
  );
}