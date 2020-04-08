import React, { useEffect, useState } from 'react';
import { getIndexedReviews } from '../../../utils/review';
import ReviewsTableView from './ReviewsTable-view';

// Using functional component to be able to use react-table hooks.
export default function ReviewsTableContainer(props) {
  const [reviews, setReviews] = useState([]);

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

  return (
    <ReviewsTableView reviews={reviews} {...props} />
  );
}