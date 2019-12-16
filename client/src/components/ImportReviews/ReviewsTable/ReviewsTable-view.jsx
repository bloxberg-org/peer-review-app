import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

ReviewsTableView.defaultProps = {
  titles: [
    ' ',
    'Publisher',
    'Date',
    'Verified Status',
    'URL'
  ]
};

ReviewsTableView.propTypes = {
  reviews: PropTypes.array.isRequired,
  titles: PropTypes.array,
  toggleCheckReview: PropTypes.func.isRequired
};

// ========== Basic Components =============
const Wrapper = styled.div`

`;

const ReviewsTable = styled.table`
    width: 100%;
    border-spacing: 0
  `;

// ========== Compound Components ==========
const ColumnTitles = styled((props) => {
  return (
    <tr className={props.className}>
      {
        props.titles.map((title, i) => {
          return (<th key={i}>{title}</th>);
        })
      }

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

const TableRow = styled((props) => {
  return (
    <tr className={props.className} onClick={() => props.toggleCheckReview(props.index)}>
      <td> <input type='checkbox' checked={props.checked} /> </td>
      <td>{props.publisher.name}</td>
      <td>{props.date_reviewed}</td>
      <td>{props.verification.verified ? 'Verified' : 'Not Verified'}</td>
      <td><a href={props.ids.academic.url} rel='noopener noreferrer' target='_blank'> Link </a> </td>
    </tr >
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
    &:hover {
      cursor: pointer;
      background-color: #eee;
    }
  `;


export default function ReviewsTableView(props) {
  if (props.reviews.length === 0) {
    return (
      null
    );
  }

  const reviewRows = props.reviews.map((review, i) => {
    return (
      <TableRow key={i} index={i} {...review} toggleCheckReview={props.toggleCheckReview} />
    );
  });

  return (
    <Wrapper>
      <ReviewsTable>
        <ColumnTitles titles={props.titles} />
        {reviewRows}
      </ReviewsTable>
    </Wrapper>
  );
}