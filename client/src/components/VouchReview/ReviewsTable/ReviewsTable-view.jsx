import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useTable } from 'react-table';
import styled from 'styled-components';
import Button from '../../Button';
import Loader from '../../Loader';

ReviewsTableView.propTypes = {
  columns: PropTypes.array.isRequired,
  reviews: PropTypes.array.isRequired
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ReviewRow = styled((props) => {
  const { row, key } = props;
  const history = useHistory(); // to create links onClick to row.
  return (
    // Create link at onClick to /Reviews/<id>. id is a hidden column and can be accessed by allCells[0].value.
    <tr key={key} className={props.className} onClick={() => { history.push(`/Reviews/${row.allCells[0].value}`) }} {...row.getRowProps()}>
      { // Create each cell.
        row.cells.map((cell, i) => {
          return <td key={i} {...cell.getCellProps()}>{cell.render('Cell')}</td>;
        })
      }
      <td><Button onClick={() => console.log('Click!')} primary>Vouch</Button></td>
    </tr>
  );
  // return (
  //   <tr className={props.className}>
  //     <td>{props.publisher}</td>
  //     <td>{moment.unix(props.timestamp).format('YYYY')}</td>
  //     <td>{props.verified ? 'Verified' : 'Not Verified'}</td>
  //   </tr >
  // );
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

export default function ReviewsTableView(props) {
  const tableOptions = {
    columns: props.columns,
    data: props.reviews,
    initialState: {
      hiddenColumns: ['id'] // Don't show id. ID needed for creating links when clicked.
    }
  };
  const { getTableProps, getTableBodyProps, headerGroups,
    rows, prepareRow } = useTable(tableOptions);

  if (!props.reviews.length)
    return <Loader />;

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
            return <ReviewRow key={i} row={row} />
          })}
        </tbody>
      </table>
    </Wrapper>
  );
}