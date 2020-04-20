import React from 'react';
import styled from 'styled-components';
import logo from '../../assets/laboratory_analyst.svg';
import PropTypes from 'prop-types';
import LoginWithFortmatic from '../App/LoginWithFortmatic';

LoginPage.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
};

const Background = styled.div`
  display: flex;
  flex: 1;
  min-height: 100vh;
  max-width: 100vw;
  justify-content: center;
  align-items: center;
`;

const WrapperContainer = styled.div`
  display: flex;
  flex: 0.50;
  min-height: 90vh;
  background: #FFFFFF;
`;

const LeftWrapper = styled.div`
  background-color: ${props => props.theme.background};
  display: flex;
  flex: 0.5;
  text-align: center;
  justify-content: center;
  width: 100%;
  padding: 50px 0px 50px;
  `;

const RightWrapper = styled.div`
  background-color: ${props => props.theme.background};
  display: flex;
  flex: 0.5;
  text-align: center;
  justify-content: center;
  width: 100%;
  `;


const Text = styled.span`
`;

const Logo = styled.img`

`;

const Caption = styled.div`

  font-family: 'Muli';  
  font-weight: bold;
`;

const LogoWrapper = styled.div`
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        width: 60%;
        text-align: center;
        min-height: 200px;
        padding: 0px 50px 0px;
        border: 8px solid #AF1578;
  `;


const TitleWrapper = styled.div`
        display: flex;
        flex-direction: column;
        width: 50%;
        text-align: center;
        align-items: center;

  `;

const Title = styled.h2`
      color: ${props => props.theme.primary};
      font-size: 1em;
      font-weight: bold;
      font-size: 36px;
      line-height: 62px;
      margin-top: 30%;
      font-family: Lusitana;
`;

const subTitle = styled.text`
    font-family: Open Sans;
    font-style: normal;
    font-weight: 800;
    font-size: 16px;
    line-height: 22px;
    text-align: center;
    letter-spacing: 0.4px;
    color: rgba(37, 39, 51, 0.65);
`;

export default function LoginPage(props) {
  return (
  <Background>
    <WrapperContainer>
      <LeftWrapper>
          <LogoWrapper>
            <Logo src={logo} />
            <Caption>Peer Review</Caption>
          </LogoWrapper>
      </LeftWrapper>
      <RightWrapper>
          <TitleWrapper>
            <Title>
              Welcome to PeerView
            </Title>
            <subTitle>
              Manage, organize, verify, and share your Peer Reviews
            </subTitle>
          </TitleWrapper>
          <LoginWithFortmatic
            handleLogin={props.handleLoginWithMagicLink}
            handleLogout={props.handleLogout}
          />
        </RightWrapper>
      </WrapperContainer>
    </Background>


  );
}