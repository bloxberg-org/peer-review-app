import React from 'react';
import Loader from 'react-loader-spinner';
import styled, { withTheme } from 'styled-components';

const LoaderWrapper = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

// withTheme Higher Order Function to access props.theme.primary field
const StyledLoader = styled(withTheme((props) => {
  return (<Loader
    type='Grid'
    color={props.theme.primary}
  />);
}))``;

export default function SpinnerView() {
  return (
    <LoaderWrapper>
      <StyledLoader />
    </LoaderWrapper>
  )
}