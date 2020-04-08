import PropTypes from 'prop-types';
import React from 'react';
import { useTable } from 'react-table';
import styled from 'styled-components';
import Loader from '../../Loader';

ReviewsTableView.propTypes = {
  columns: PropTypes.array.isRequired,
  reviews: PropTypes.array.isRequired
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;


export default function ReviewsTableView(props) {
  console.log(props);
  const { getTableProps, getTableBodyProps, headerGroups,
    rows, prepareRow } = useTable({ columns: props.columns, data: props.reviews });
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
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr key={i} {...row.getRowProps()}>
                {row.cells.map((cell, i) => {
                  return <td key={i} {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </Wrapper>
  );
}