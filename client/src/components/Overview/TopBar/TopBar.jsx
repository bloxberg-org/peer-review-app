import React from 'react';
import styled from 'styled-components';
import Search from './Search';
import UserIcon from './UserIcon';

const Title = styled.h1`
  font-size: 1.5em;
  margin: 10px
`;

const TitleWrapper = styled.div`
  flex:0.5;
`;

const TopBarRightWrapper = styled.div`
  flex:0.5;
  flex-direction: row;
  display: flex;
  justify-content: space-between;
  align-items: stretch;
`;

const TopBarWrapper = styled.div`
  align-items: stretch;
  flex-direction: row;
  display:flex;
`;

export default function TopBar(props) {
  return(
    <TopBarWrapper>
      <TitleWrapper>
        <Title>Overview</Title>
      </TitleWrapper>
      <TopBarRightWrapper>
        <Search/>
        <UserIcon userName={props.userName}/>
      </TopBarRightWrapper>
    </TopBarWrapper>
  )
}