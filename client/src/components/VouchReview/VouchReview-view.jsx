import React from 'react';
import styled from 'styled-components';
import CardWrapper from '../CardWrapper';

const Wrapper = styled.div`
  display: flex;
`;

export default function VouchReviewView(props) {
  return (
    <Wrapper>
      <CardWrapper title="Vouch Reviews">
      </CardWrapper>
    </Wrapper>
  );
}