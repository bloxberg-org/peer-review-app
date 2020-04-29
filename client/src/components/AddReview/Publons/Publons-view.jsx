import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import Button from '../../Button';
import CardWrapper from '../../CardWrapper';
import Loader from '../../Loader';
import Form from './Form';
import ReviewsTable from './ReviewsTable';

PublonsView.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  isUploading: PropTypes.bool.isRequired,
  handleModalClose: PropTypes.func.isRequired,
  handleModalOpen: PropTypes.func.isRequired,
  appendToReviews: PropTypes.func.isRequired,
  fetchedReviews: PropTypes.array.isRequired,
  fetchedReviewsMeta: PropTypes.object.isRequired,
  toggleCheckReview: PropTypes.func.isRequired,
  setFetchedReviewsMeta: PropTypes.func.isRequired,
  selectReview: PropTypes.func.isRequired,
  saveSelectedReviews: PropTypes.func.isRequired
};

// ======== Basic Components ==========
const Wrapper = styled.div`
    display: flex;
    flex: 1;
    height: 100%
  `;

const ImportButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;

const CardContentWrapper = styled.div`

`;

const TableAndButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const StyledCardWrapper = styled(CardWrapper)`
  display:flex;
  flex: 1;
`;

const StyledButton = styled(Button)`
  font-size: 0.98rem;
`;

export default function PublonsView(props) {
  if (props.isUploading) {
    return (
      <Loader />
    );
  }
  return (
    <Wrapper>
      <StyledCardWrapper title='Import Reviews from Publons'>
        <CardContentWrapper>
          {
            // Render Table if reviews are fetched. Render Form if not yet fetched.
            props.fetchedReviews.length > 0
              ?
              <TableAndButtonsWrapper>
                <ImportButtonsWrapper>
                  <StyledButton primary onClick={props.saveSelectedReviews}>Import Selected</StyledButton>
                </ImportButtonsWrapper>
                <ReviewsTable
                  reviews={props.fetchedReviews}
                  reviewsMeta={props.fetchedReviewsMeta}
                  toggleCheckReview={props.toggleCheckReview}
                  appendToReviews={props.appendToReviews}
                  selectReview={props.selectReview}
                />
              </TableAndButtonsWrapper>
              :
              <Form
                handleModalOpen={props.handleModalOpen}
                handleModalClose={props.handleModalClose}
                appendToReviews={props.appendToReviews}
                setFetchedReviewsMeta={props.setFetchedReviewsMeta}
              />
          }
        </CardContentWrapper>
      </StyledCardWrapper>
    </Wrapper>

  );
}