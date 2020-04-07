import { faSearch } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import styled from 'styled-components';
import FAIconButton from '../Button/FAIconButton';
import CardWrapper from '../CardWrapper';
import SearchBar from '../SearchBar';
import ReviewsTable from './ReviewsTable';

// ======== Base Components =============
const Wrapper = styled.div`
  display: flex;
  flex: 1;
  height: 100%
`;

const SearchBarWrapper = styled.div`
  width: 50%;
  display: flex;
  flex-direction: row;
`;

// ========== Compound Components ==========\
const StyledSearchBar = styled(SearchBar)`
  flex: 1;
  input {
    font-size: 0.8em;
    padding: 16px 0;
  }
`;

const SearchButton = styled(FAIconButton)`
  margin: 0 8px;
`;

export default function VouchReviewView(props) {
  return (
    <Wrapper>
      <CardWrapper title="Vouch Reviews">
        <SearchBarWrapper>
          <StyledSearchBar placeholder='Search by email, name, or address' />
          <SearchButton icon={faSearch} />
        </SearchBarWrapper>
        <ReviewsTable />
      </CardWrapper>
    </Wrapper>
  );
}