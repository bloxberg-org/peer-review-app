import React from 'react';
import styled from 'styled-components';
import CardWrapper from '../CardWrapper';

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  height: 100%
`;

const SearchBar = styled.input`
`;
export default function VouchReviewView(props) {
  return (
    <Wrapper>
      <CardWrapper title="Vouch Reviews">
        <SearchBar></SearchBar>
      </CardWrapper>
    </Wrapper>
  );
}