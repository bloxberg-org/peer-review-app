import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import CardWrapper from '../../CardWrapper';
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

const Wrapper = styled.div`
  display: flex;
  flex: 1
  `;

export default function F1000RView(props) {


  // If loading, show the loader/spinner whatever you call it.
  if (props.isAddingReview) {
    return (
      <Loader description='Your transaction is being processed' />
    );
  }

  return (
    <Wrapper id='wrapper'>
      <CardWrapper title='Add a Review from F1000R'>
        {
          !props.review // Show DOI input if review is not yet retrieved
            ?
            <DOIInput
              handleReview={props.handleReview} />
            :
            <AddReviewForm
              handleDateChange={props.handleDateChange}
              handleSubmit={props.handleSubmit}
              review={props.review} />
        }
      </CardWrapper>
    </Wrapper>
  );
}