import CardWrapper from 'components/CardWrapper';
import React from 'react';
import styled from 'styled-components';
import ReviewsTable from './ReviewsTable';

// ======== Base Components =============
const Wrapper = styled.div`
  display: flex;
  flex: 1;
  height: 100%
`;

// ========== Compound Components ==========\


export default function VouchReviewView(props) {
  console.log(props);
  const blurbText = 'By vouching for a review, you are confirming that the review took place. Once a submitted review has been vouched, it is then marked as verified which enhances the authenticity of the review.';
  return (
    <Wrapper>
      <CardWrapper title="Vouch Reviews" blurb={blurbText}>
        <ReviewsTable />
      </CardWrapper>
    </Wrapper>
  );
}