import PropTypes from 'prop-types';
import React from 'react';
import Loader from '../../Loader';
import AddReviewForm from './AddReviewForm';
import DOIInput from './DOIInput';

F1000RView.propTypes = {
  review: PropTypes.object, // Can be null
  handleReview: PropTypes.func.isRequired,
  handleDateChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isAddingReview: PropTypes.bool.isRequired,
};

//===================================================
// ================ Define Wrappers =================
//===================================================

export default function F1000RView(props) {


  // If loading, show the loader/spinner whatever you call it.
  if (props.isAddingReview) {
    return (
      <Loader description='Your transaction is being processed' />
    );
  }

  if (!props.review) { // Show DOI input if review is not yet retrieved
    return <DOIInput
      handleReview={props.handleReview} />;
  } else {
    return <AddReviewForm
      handleDateChange={props.handleDateChange}
      handleSubmit={props.handleSubmit}
      review={props.review} />;
  }
}