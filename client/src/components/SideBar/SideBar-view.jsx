import React from 'react';
import styled from 'styled-components';
import logo from '../../assets/logo.png';
import Button from './SideBarButton';

const Background = styled.div`
  background-color: ${props => props.theme.sidebarBackground};
  flex-direction: column;
  height: 100%;
  flex: 0.5;
  `;

const ButtonsWrapper = styled.div`
  margin-bottom: 30px;
  `;

const Logo = styled.img`

`;

const LogoWrapper = styled.div`
  padding: 30px 20px;
  flex-direction: column;
  align-items: center;
  text-align: center;
  `;

const Caption = styled.div`
  color: white;
  font-family: 'Muli';  
  font-weight: bold;
`;
export default function Navbar() {
  return (
    <Background>
      <LogoWrapper>
        <Logo src={logo} />
        <Caption>Peer Review</Caption>
      </LogoWrapper>
      <ButtonsWrapper>
        <Button to='/Overview'>Overview</Button>
        <Button to='/AddReview'>Add Review</Button>
        <Button to='/Publications'>Publications</Button>
        <Button to='/Colleagues'>Colleagues</Button>
        <Button to='/Affiliations'>Affiliations</Button>
      </ButtonsWrapper>
      <Button to='/Settings'>Settings</Button>
    </Background>
  );
}