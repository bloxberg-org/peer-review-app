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
    flex: 1;
  `;

  // ========== Base Components ============
  const ReviewsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 10px 32px;
  `;

  const ReviewsTable = styled.table`
    width: 100%;
  `;

  // ========== Compound Components ==========
  const ReviewHeader = styled(({ className }) => {
    return (
      <tr className={className}>
        <th>Title</th>
        <th>Article DOI</th>
        <th>Timestamp</th>
        <th>Verified</th>
      </tr>
    );
  })`
    & > th {
      padding: 8px;
      padding-top: 12px;
      padding-bottom: 12px;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }
  `;

  const ReviewRow = styled((props) => {
    return (
      <tr className={props.className}>
        <td>{props.articleTitle}</td>
        <td>{props.articleDOI}</td>
        <td>{props.timestamp}</td>
        <td>{props.verified ? 'Yes' : 'No'}</td>
      </tr>
    );
  })`
    & > td {
      padding: 8px;
      border-bottom: 1px solid #ddd;
      max-width: 150px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    };
    & > td:first-child { 
      // Wider text for title <td>
      max-width: 300px;
    }
  `;

  ReviewRow.propTypes = {
    articleTitle: PropTypes.string.isRequired,
    articleDOI: PropTypes.string.isRequired,
    verified: PropTypes.bool.isRequired
  };

  const reviews = props.DBreviews.map((DBreview, i) => {
    return (
      <ReviewRow key={i} {...DBreview} {...props.blockchainReviews[i]} />
    );
  });

  return (
    <Wrapper>
      <CardWrapper title='All Reviews' >
        <ResultsWrapper>
          <ReviewsWrapper>
            <ReviewsTable>
              <ReviewHeader />
              {reviews}
            </ReviewsTable>
          </ReviewsWrapper>
        </ResultsWrapper>
      </CardWrapper>
    </Wrapper>
  );
}