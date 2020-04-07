import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
export default function ReviewsTableView(props) {
  return (
    <Wrapper>
      <table>Table</table>
    </Wrapper>
  );
}