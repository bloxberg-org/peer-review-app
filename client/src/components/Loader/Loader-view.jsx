import React from 'react';
import Loader from 'react-loader-spinner';
import styled, { withTheme } from 'styled-components';

const LoaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  > * { /* All Children */
    margin: 16px;
  }
`;

// withTheme Higher Order Function to access props.theme.primary field
export default withTheme(function SpinnerView(props) {
  return (
    <LoaderWrapper description={props.description} >
      <Loader
        type='Grid'
        color={props.theme.primary}
      />
      {props.description ? <span> {props.description} </span> : null}
    </LoaderWrapper>
  );
});