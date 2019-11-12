import React from 'react';
import styled from 'styled-components';
import CardWrapper from '../CardWrapper';

export default function AllReviewsView() {
  const Wrapper = styled.div`
    display: flex;
    height: 100%
  `;

  const ResultsWrapper = styled.div`
    background: blue;
    flex: 1;
  `;
  return (
    <Wrapper>
      <CardWrapper title='All Reviews' >
        <ResultsWrapper>
          Hello World
        </ResultsWrapper>
      </CardWrapper>
    </Wrapper>
  );
}