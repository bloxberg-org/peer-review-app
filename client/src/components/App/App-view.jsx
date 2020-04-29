import PropTypes from 'prop-types';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import GlobalStyle, { theme } from '../../assets/theme';
import Loader from '../Loader';
import LoginPage from '../LoginPage';
import Register from '../Register';
import SideBar from '../SideBar';
import ConnectToBloxberg from './ConnectToBloxberg';
// import InstallMetamask from './InstallMetamask';
// import LoginWithFortmatic from './LoginWithFortmatic';
import Routes from './Routes';

AppView.propTypes = {
  user: PropTypes.object,
  isConnectedToBloxberg: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isNoUserFound: PropTypes.bool.isRequired,
  isLoggedInWithFm: PropTypes.bool.isRequired,
  isLoggedInWithMetamask: PropTypes.bool.isRequired,
  handleLoginWithMagicLink: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
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
    <Wrapper>
      <Router>
        {props.children}
      </Router>
    </Wrapper>
  );
})``;

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
  let AppContent =
    <AppContentWithSideBar>
      <Loader />
    </AppContentWithSideBar>;
  if (props.isLoading) // If loading user and reviews return the spinner
    AppContent = (
      <AppContentWithSideBar>
        <Loader />
      </AppContentWithSideBar>
    );
  // Show Fortmatic login if not logged in with fm or metamask.
  else if (!props.isLoggedInWithFm && !props.isLoggedInWithMetamask)
    AppContent =
      <AppContentWithoutSideBar>
        <LoginPage handleLogin={props.handleLoginWithMagicLink}
          handleLogout={props.handleLogout} />
      </AppContentWithoutSideBar>;
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
