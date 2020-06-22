import GlobalStyle, { theme } from 'assets/theme';
import Loader from 'components/Loader';
import SideBar from 'components/SideBar';
import LoginPage from 'pages/LoginPage';
import Register from 'pages/Register';
import PropTypes from 'prop-types';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import ConnectToBloxberg from './ConnectToBloxberg';
// import InstallMetamask from './InstallMetamask';
import Routes from './Routes';

AppView.propTypes = {
  isConnectedToBloxberg: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isNoUserFound: PropTypes.bool.isRequired,
  isLoggedInWithFm: PropTypes.bool.isRequired,
  isLoggedInWithMetamask: PropTypes.bool.isRequired,
  loginWithFortmatic: PropTypes.func.isRequired,
  logoutFromFortmatic: PropTypes.func.isRequired,
  loginWithMetamask: PropTypes.func.isRequired,
  refreshReviews: PropTypes.func.isRequired
};

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  min-height: 100vh;
  max-width: 100vw;
`;

const MainWrapper = styled.div`
  flex : 1;
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.background};
  `;

const SideBarWrapper = styled.div`
  flex: 0.25;
  `;

const AppContentWithoutSideBar = styled((props) => {
  return (
    <Wrapper className={props.className}>
      <Router>
        {props.children}
      </Router>
    </Wrapper>
  );
})`
  align-items: center;
  justify-content: center;
`;

const AppContentWithSideBar = styled((props) => {
  return (
    <Wrapper>
      <Router>
        <SideBarWrapper>
          <SideBar />
        </SideBarWrapper>
        <MainWrapper>
          {props.children}
        </MainWrapper>
      </Router>
    </Wrapper>
  );
})``;

export default function AppView(props) {

  let AppContent;
  if (props.isLoading) { // If loading user and reviews return the spinner
    AppContent = (
      <AppContentWithoutSideBar>
        <Loader />
      </AppContentWithoutSideBar>
    );
    console.log('Show default loading');
  }
  // Show Fortmatic login if not logged in with fm or metamask.
  else if (!props.isLoggedInWithFm && !props.isLoggedInWithMetamask) {
    AppContent =
      <AppContentWithoutSideBar>
        <LoginPage
          loginWithFortmatic={props.loginWithFortmatic}
          logoutFromFortmatic={props.logoutFromFortmatic}
          loginWithMetamask={props.loginWithMetamask}
        />
      </AppContentWithoutSideBar>;
    console.log('Show Log In Screen');
  }
  else if (!props.isConnectedToBloxberg)
    AppContent =
      <AppContentWithSideBar>
        <ConnectToBloxberg />
      </AppContentWithSideBar>;
  else if (props.isNoUserFound)
    AppContent =
      <AppContentWithSideBar>
        <Register {...props} />
      </AppContentWithSideBar>;
  else // Normal flow
    AppContent =
      <AppContentWithSideBar>
        <Routes {...props} refreshReviews={props.refreshReviews} />
      </AppContentWithSideBar>;

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {
        AppContent
      }
    </ThemeProvider>
  );
}
