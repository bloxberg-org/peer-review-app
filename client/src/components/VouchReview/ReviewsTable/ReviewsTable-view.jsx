import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import { useTable } from 'react-table';
import styled from 'styled-components';
import ReviewsTableRow from './ReviewsTableRow';

ReviewsTableView.propTypes = {
  columns: PropTypes.array.isRequired,
  reviews: PropTypes.array.isRequired,
  vouchReviewWithId: PropTypes.func.isRequired
};

// =========== Base Components ===================
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const NoReviews = styled(props => {
  return (
    <div className={props.className}>
      No Reviews found
    </div>
  )
})`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export default function ReviewsTableView(props) {

  const columns = React.useMemo(() => [
    { Header: 'id', accessor: 'id' }, // This is hidden in the table.
    { Header: 'Author', accessor: 'author' },
    { Header: 'Publisher', accessor: 'publisher' },
    { Header: 'Publish Date', accessor: 'timestamp', Cell: ({ cell: { value } }) => moment.unix(value).format('YYYY') }],
    []);

  const tableOptions = {
    columns: columns,
    data: props.reviews,
    initialState: {
      hiddenColumns: ['id'] // Don't show id. ID needed for creating links when clicked.
    }
  };

  const { getTableProps, getTableBodyProps, headerGroups,
    rows, prepareRow } = useTable(tableOptions);

  if (props.reviews.length === 0)
    return <NoReviews />;

  return (
    <Wrapper>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup, i) => (
            <tr key={i} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, i) => (
                <th key={i} {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
              <th> </th>
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return <ReviewsTableRow key={i} row={row} vouchReviewWithId={props.vouchReviewWithId} />;
          })}
        </tbody>
      </table>
    </Wrapper>
  );
}