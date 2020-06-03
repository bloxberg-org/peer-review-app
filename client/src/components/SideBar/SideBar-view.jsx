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

const SubButton = styled(Button)`
  font-size: 0.8em;
  margin-left: 10px;
        padding: 0; /* collapse margins in subbutton. Remove padding and insert margin instead*/

  .link-wrapper  {
    margin-top: 10px;
  }
`;

export default function Navbar() {
  return (
    <Background>
      <LogoWrapper>
        <Logo src={logo} />
        <Caption>Peer Review</Caption>
      </LogoWrapper>
      <ButtonsWrapper>
        <Button to='/Overview' title='Overview' />
        <Button to='/Reviews' title='Reviews'>
          <SubButton to='/Reviews/AddReview' title='Add Review' />
          <SubButton to='/Reviews/MyReviews' title='My Reviews' />
          <SubButton to='/Reviews/VouchReview' title='Vouch a Review' />
        </Button>
      </ButtonsWrapper>
    </Background>
  );
}