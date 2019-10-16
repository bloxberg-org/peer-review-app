import React from 'react';
import styled from 'styled-components';
import Search from './Search';

const Title = styled.h1`
font-size: 16;
margin: 10px
`;

const TitleWrapper = styled.div`
flex:0.5;
`;

const TopBarRightWrapper = styled.div`
flex:0.5;
`;

const TopBarWrapper = styled.div`
align-items: center;
flex-direction: row;
display:flex;
flex: 1;
`;

export default function TopBar(props) {
  return(
    <TopBarWrapper>
      <TitleWrapper>
        <Title>Overview</Title>
      </TitleWrapper>
      <TopBarRightWrapper>
        <Search/>
      </TopBarRightWrapper>
    </TopBarWrapper>
  )
}