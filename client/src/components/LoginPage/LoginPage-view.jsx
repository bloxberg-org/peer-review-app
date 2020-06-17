import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import logo from '../../assets/laboratory_analyst.svg';
import bloxberglogo from '../../assets/logo2.png';
import metamaskBanner from '../../assets/metamask-full.svg';
import LoginWithFortmatic from './LoginWithFortmatic';


LoginPage.propTypes = {
  loginWithFortmatic: PropTypes.func.isRequired,
  logoutFromFortmatic: PropTypes.func.isRequired,
  loginWithMetamask: PropTypes.func.isRequired,
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
  margin: 50px 0;
  flex: 0.50;
  border-radius: 10px;
  min-height: 90vh;
  background-color: ${props => props.theme.background};
  box-shadow: 0 100px 100px 0 rgba(0,0,0,0.2);
`;

const LeftWrapper = styled.div`
  display: flex;
  flex: 0.5;
  text-align: center;
  justify-content: center;
  `;

const RightWrapper = styled.div`
  display: flex;
  flex: 0.5;
  text-align: center;
  justify-content: flex-start;
  flex-direction: column;
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
        padding: 0px 50px 0px;
        border: 8px solid #AF1578;
  `;


const TitleWrapper = styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;
        flex: 0.2;
        margin-top: 10vh;
  `;

const Title = styled.span`
      color: ${props => props.theme.primary};
      font-weight: bold;
      font-size: 2em;
      line-height: 48px;
      font-family: 'Lusitana';
      padding: 0 0 0;
`;

const SubTitle = styled.span`
    font-family: Open Sans;
    font-style: normal;
    font-weight: 800;
    font-size: 1em;
    line-height: 22px;
    text-align: center;
    letter-spacing: 0.2px;
    color: rgba(37, 39, 51, 0.65);
`;

const RegisterText = styled.span`
    font-family: Open Sans;
    font-style: normal;
    font-weight: 800;
    font-size: 14px;
    line-height: 22px;
    text-align: center;
    letter-spacing: 0.4px;
    color: rgba(37, 39, 51, 0.65);
`;

const BloxbergLogo = styled.img`
    width: 50%;
`;

const BloxbergLogoWrapper = styled.div`
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        flex-direction: column;
        flex: 0.4;
  `;

export default function LoginPage(props) {
  return (
    <Background>
      <WrapperContainer>
        <LeftWrapper>
          <LogoWrapper>
            <Logo src={logo} />
            <Caption></Caption>
          </LogoWrapper>
        </LeftWrapper>
        <RightWrapper>
          <TitleWrapper>
            <Title>
              Welcome to PeerView
            </Title>
            <SubTitle>
              Manage, organize, verify, and share your Peer Reviews
            </SubTitle>
          </TitleWrapper>
          <LoginWithFortmatic
            handleLogin={props.loginWithFortmatic}
            handleLogout={props.logoutFromFortmatic}
          />
          {/* <RegisterText>Don't have an account? <SignUpText>Sign Up!</SignUpText></RegisterText> */}
          <BloxbergLogoWrapper>
            <RegisterText>Powered By</RegisterText>
            <BloxbergLogo src={bloxberglogo} />
          </BloxbergLogoWrapper>
          <div>
            <RegisterText>Prefer to use</RegisterText><br />
            <Logo
              src={metamaskBanner}
              style={{ height: '40px', cursor: 'pointer' }}
              onClick={props.loginWithMetamask}
            /> <br />
            <RegisterText style={{ cursor: 'pointer' }}>or another Wallet?</RegisterText>
          </div>
        </RightWrapper>
      </WrapperContainer>
    </Background>
  );
}