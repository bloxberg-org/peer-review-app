import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import Button from '../../Button';
import Loader from '../../Loader';

ReviewsTableView.defaultProps = {
  titles: [
    'Add',
    'Publisher',
    'Date',
    'Verified Status',
    'URL'
  ]
};

ReviewsTableView.propTypes = {
  reviewsToShow: PropTypes.array.isRequired,
  reviewsMeta: PropTypes.object.isRequired,
  titles: PropTypes.array,
  toggleCheckReview: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  changePage: PropTypes.func.isRequired,
  isLoadingPage: PropTypes.bool.isRequired,
  startIndex: PropTypes.number.isRequired,
  handleToggleSelectAllOfPage: PropTypes.func.isRequired,
  isCheckedAllOfPage: PropTypes.array.isRequired
};

// ========== Basic Components =============
const Wrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const ReviewsTable = styled.table`
    width: 100%;
    border-spacing: 0
  `;

const StyledButton = styled(Button)`
  width: auto;
  padding: 0 16px;
  font-size: 0.98rem;
`;

// ========== Compound Components ==========
const SelectAllCheckbox = styled((props) => { // Each page has its own select all checkbox.
  return (
    <input type='checkbox' checked={props.isCheckedAllOfPage[props.page]} onClick={() => props.handleToggleSelectAllOfPage(props.page)} />
  );
})`
`;

const ColumnTitles = styled((props) => {
  return (
    <tr className={props.className}>
      {
        props.titles.map((title, i) => {
          if (i === 0) { // Render checkbox.
            return <SelectAllCheckbox
              page={props.page}
              handleToggleSelectAllOfPage={props.handleToggleSelectAllOfPage}
              isCheckedAllOfPage={props.isCheckedAllOfPage}
            />;
          }
          // Render titles.
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
      <td>{props.publisher ? props.publisher.name : 'N/A'}</td>
      <td>{props.date_reviewed ? props.date_reviewed : 'N/A'}</td>
      <td>{props.verification.verified ? 'Verified' : 'Not Verified'}</td>
      <td><a href={props.ids.academic.url ? props.ids.academic.url : null} rel='noopener noreferrer' target='_blank'> Link </a> </td>
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

const EndRow = styled((props) => {
  return (
    <div className={props.className}>
      <div className='totalReviews'>
        <span> Total reviews: {props.totalReviewCount} </span>
      </div>
      <PageIndicator page={props.page} totalPages={props.totalPages} changePage={props.changePage} />
      <div className='buttonWrapper'>
        <StyledButton secondary>Import All {props.totalReviewCount} Reviews</StyledButton>
      </div>
    </div>
  );
})`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 8px 0;

  & .buttonWrapper { // Center page indicator and send button to end.
    flex: 1;
    display: flex;
    flex-direction: row-reverse;
  }

  & .totalReviews { // Center page indicator
    flex: 1
  }
`;

// < Page 1 of 22 >
const PageIndicator = styled((props) => {
  return (
    <div className={props.className}>
      <div className='arrow' onClick={() => props.page > 1 ? props.changePage(props.page - 1) : null}> &lt; </div>
      <span> Page {props.page} of {props.totalPages} </span>
      <div className='arrow' onClick={() => props.page < props.totalPages ? props.changePage(props.page + 1) : null}> &gt;  </div>
    </div>
  );
})`
  flex-direction: row;
  display: flex;
  align-items: center;
  & .arrow {
    font-weight: bold;
    padding: 8px;
    border-radius: 16px; 
    :hover {
      cursor: pointer
    }
  }
`;

const StyledLoader = styled((props) => {
  return (
    <div className={props.className}>
      <Loader />
    </div>
  );
})`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function ReviewsTableView(props) {
  if (props.reviewsToShow.length === 0) {
    return (
      null
    );
  }

  const reviewRows = props.reviewsToShow.map((review, i) => {
    return (
      <TableRow key={i} index={props.startIndex + i} {...review} toggleCheckReview={props.toggleCheckReview} />
    );
  });

  return (
    <Wrapper>
      <ReviewsTable>
        <ColumnTitles
          titles={props.titles}
          page={props.page}
          handleToggleSelectAllOfPage={props.handleToggleSelectAllOfPage} // Used by select all checkbox.
          isCheckedAllOfPage={props.isCheckedAllOfPage} // Used by select all checkbox.
        />
        {props.isLoadingPage ? null : reviewRows}
      </ReviewsTable>
      {props.isLoadingPage ?
        <StyledLoader /> :
        <EndRow page={props.page} changePage={props.changePage} {...props.reviewsMeta} />
      }
    </Wrapper>
  );
}