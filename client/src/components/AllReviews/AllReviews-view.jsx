/* eslint-disable react/prop-types */
import moment from 'moment';
import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../Button';
import CardWrapper from '../CardWrapper';

const Wrapper = styled.div`
    display: flex;
    height: 100%
  `;

// ========== Base Components ============
const ReviewsTable = styled.table`
    width: 100%;
    border-spacing: 0
  `;

const ButtonWrapper = styled.div`
  display:flex;
  flex-direction: row-reverse;
  margin: 10px 32px;
`;

const StyledButton = styled(Button)`
  font-size: 0.9rem
`;

// ========== Compound Components ==========
const ReviewHeader = styled(({ className }) => {
  return (
    <thead> {/*thead needed for jsPDF.autoTable() */}
      <tr className={className}>
        <th>Publisher</th>
        <th>Year</th>
        <th>Verified</th>
      </tr>
    </thead>
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
    <tr className={props.className} onClick={() => { props.history.push(`/Reviews/${props.id}`); }}>
      <td>{props.publisher}</td>
      <td>{moment.unix(props.timestamp).format('YYYY')}</td>
      <td>{props.verified ? 'Verified' : 'Not Verified'}</td>
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
    };
    &:hover {
      cursor: pointer;
      background-color: #eee;
    }
  `;

export default function AllReviewsView(props) {
  let history = useHistory(); // Use history to route to the review page onClick

  const reviews = props.blockchainReviews.map((blockchainReview, i) => {
    return (
      <ReviewRow key={i} {...blockchainReview} history={history} />
    );
  });

  return (
    <Wrapper>
      <CardWrapper title='All Reviews' >
        <ButtonWrapper>
          <StyledButton onClick={props.savePDF} primary>Export all as PDF</StyledButton>
        </ButtonWrapper>
        <ReviewsTable ref={props.tableRef} >
          <ReviewHeader />
          <tbody> {/* needed for jsPDF.autoTable()  */}
            {reviews}
          </tbody>
        </ReviewsTable>
      </CardWrapper>
    </Wrapper>
  );
}