/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import CardWrapper from '../CardWrapper';

export default function AllReviewsView(props) {
  const Wrapper = styled.div`
    display: flex;
    height: 100%
  `;

  const ResultsWrapper = styled.div`
    background: blue;
    flex: 1;
  `;

  // ========== Base Components ============
  const ReviewsWrapper = styled.div`
    display: flex;
    flex-direction: column;
  `;

  const ReviewRowWrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex: 1;
  `;

  const Title = styled.span`
  `;

  const DOI = styled.span`
  `;

  const Verified = styled.span`
  `;

  // ========== Compound Components ==========
  const ReviewRow = styled((props) => {
    return (
      <ReviewRowWrapper>
        <Title> {props.articleTitle}</Title>
        <DOI>{props.articleDOI}</DOI>
        <Verified verified={props.verified} />
      </ReviewRowWrapper>
    );
  })``;

  ReviewRow.propTypes = {
    articleTitle: PropTypes.string.isRequired,
    articleDOI: PropTypes.string.isRequired,
    verified: PropTypes.bool.isRequired
  };

  const reviews = props.reviews.map((review, i) => {
    return (
      <ReviewRowWrapper key={i}>
        <ReviewRow  {...review} />
      </ReviewRowWrapper>
    );
  });

  return (
    <Wrapper>
      <CardWrapper title='All Reviews' >
        <ResultsWrapper>
          <ReviewsWrapper>
            {reviews}
          </ReviewsWrapper>
        </ResultsWrapper>
      </CardWrapper>
    </Wrapper>
  );
}