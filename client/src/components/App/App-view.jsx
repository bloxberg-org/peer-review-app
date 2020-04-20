import PropTypes from 'prop-types';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import GlobalStyle, { theme } from '../../assets/theme';
import Loader from '../Loader';
import Register from '../Register';
import LoginPage from '../LoginPage';
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
  handleLogout: PropTypes.func.isRequired
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

export default function AppView(props) {
  let AppContent = <Loader />;

  // if (!props.isLoggedInWithFm && !props.isLoggedInWithMetamask)
  //   AppLayout = (<LoginPage/>)

  if (props.isLoading) // If loading user and reviews return the spinner
    AppContent = (<Loader />);
  // Show Fortmatic login if not logged in with fm or metamask.
  else if (!props.isLoggedInWithFm && !props.isLoggedInWithMetamask)
    // AppContent = <LoginWithFortmatic
    //   handleLogin={props.handleLoginWithMagicLink}
    //   handleLogout={props.handleLogout}
    // />;
    console.log('test')
  else if (!props.isConnectedToBloxberg)
    AppContent = (<ConnectToBloxberg />);
  else if (props.isNoUserFound) {
    AppContent = <LoginPage {...props} />;
  }
  else {
    AppContent = <Routes {...props} />;
  }
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Wrapper>
        <Router>
          <LoginPage handleLogin={props.handleLoginWithMagicLink}
            handleLogout={props.handleLogout} >
          <SideBarWrapper>
            <SideBar />
          </SideBarWrapper>
          <MainWrapper>
            {
              AppContent
            }
          </MainWrapper>
          </LoginPage>
        </Router>
      </Wrapper>
    </ThemeProvider>
  );
}
