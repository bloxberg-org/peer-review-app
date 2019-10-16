import React from 'react';
import styled from 'styled-components';
import theme from '../../assets/theme';
import logo from '../../assets/logo.png';
import Button from './SideBarButton';

const Background = styled.div`
  background-color: ${theme.SIDEBAR_BACKGROUND};
  flex-direction: column;
  height: 100%;
  flex: 0.5;
  `;

const ButtonsWrapper = styled.div`
  margin-bottom: 30px;
  `;

export default function Navbar (props){  
  return(
    <Background>
      <img src={logo}>
    
      </img>
      <p> Peer Review</p>
      <ButtonsWrapper>
        <Button to='/Overview'>Overview</Button>
        <Button to='/Reviews'>Reviews</Button>
        <Button to='/Publications'>Publications</Button>
        <Button to='/Colleagues'>Colleagues</Button>
        <Button to='/Affiliations'>Affiliations</Button>
      </ButtonsWrapper>
      <Button to='/Settings'>Settings</Button>
    </Background>
  )
};