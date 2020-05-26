import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import { useAsyncDebounce, useGlobalFilter, useSortBy, useTable } from 'react-table';
import styled from 'styled-components';
import ReviewsTableRow from './ReviewsTableRow';

ReviewsTableView.propTypes = {
  columns: PropTypes.array.isRequired,
  reviews: PropTypes.array.isRequired,
  vouchReviewWithId: PropTypes.func.isRequired,
  getAuthorNameFromAddress: PropTypes.func.isRequired
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
  );
})`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

// ============ Compound components ===============

// Define a default UI for filtering
// from https://codesandbox.io/s/github/tannerlinsley/react-table/tree/master/examples/filtering?file=/src/App.js:681-1348
const GlobalFilter = styled(({
  className,
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) => {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <span className={className}>
      Search:{' '}
      <input
        value={value || ''}
        onChange={e => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={'first name, last name, publisher...'}
      />
    </span>
  );
})`
  margin: 16px 0;
  & input { 
    border: 1px solid ${props => props.theme.gray};
    border-radius: 8px;
    padding: 4px;
    outline: none;
    width: 50%;
  }
`;

export default function ReviewsTableView(props) {

  const columns = React.useMemo(() => [
    { Header: 'id', accessor: 'id' }, // This is hidden in the table.
    {
      Header: 'Author', columns: [
        { Header: 'First Name', accessor: 'author.firstName' },
        { Header: 'Last Name', accessor: 'author.lastName' },
      ]
    }, // Display name instead of address on the table.
    { Header: 'Publisher', accessor: 'publisher' },
    { Header: 'Publish Date', accessor: 'timestamp', Cell: ({ cell: { value } }) => moment.unix(value).format('YYYY') },
    { Header: 'Created At', accessor: 'createdAt', Cell: ({ cell: { value } }) => moment(value).format('DD MMM YYYY') },]
    , []);
  const tableOptions = {
    columns: columns,
    data: props.reviews,
    initialState: {
      hiddenColumns: ['id'], // Don't show id. ID needed for creating links when clicked.
      sortBy: React.useMemo(() => [{ id: 'createdAt', desc: true }], []),
    }
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    state,
    prepareRow,
    preGlobalFilteredRows,
    setGlobalFilter, } = useTable(tableOptions, useGlobalFilter, useSortBy);

  if (props.reviews.length === 0)
    return <NoReviews />;

  return (
    <Wrapper>
      <GlobalFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={state.globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup, i) => (
            <tr key={i} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, i) => (
                <th key={i} {...column.getHeaderProps()}>
                  {column.render('Header')}
                </th>
              ))}
              <th> {/*empty Vouch column*/} </th>

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