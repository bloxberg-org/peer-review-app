import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../../Button';

const ReviewsTableRow = styled((props) => {
  const { row, key } = props;
  const history = useHistory(); // to create links onClick to row.
  let id = row.allCells[0].value;
  return (
    // Create link at onClick to /Reviews/<id>. id is a hidden column and can be accessed by allCells[0].value.
    <tr key={key} className={props.className} onClick={() => { history.push(`/Reviews/${id}`); }} {...row.getRowProps()}>
      {
        // Create each cell.
        row.cells.map((cell, i) => {
          return <td key={i} {...cell.getCellProps()}>{cell.render('Cell')}</td>;
        })
      }
      <td>
        <Button
          onClick={(e) => {
            props.vouchReviewWithId(id);
            e.stopPropagation(); // Avoid clicking the row.
          }}
          primary>
          Vouch
        </Button>
      </td>
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

export default ReviewsTableRow;