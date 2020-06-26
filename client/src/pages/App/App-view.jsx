import GlobalStyle, { theme } from 'assets/theme';
import Loader from 'components/Loader';
import SideBar from 'components/SideBar';
import LoginPage from 'pages/LoginPage';
import Register from 'pages/Register';
import PropTypes from 'prop-types';
import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
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
      {props.children}
    </Wrapper>
  );
})`
  align-items: center;
  justify-content: center;
`;

const AppContentWithSideBar = styled((props) => {
  return (
    <Wrapper>
      <SideBarWrapper>
        <SideBar />
      </SideBarWrapper>
      <MainWrapper>
        {props.children}
      </MainWrapper>
    </Wrapper>
  );
})``;

export default function AppView(props) {

  if (props.isLoading) { // If loading return the spinner
    console.log('Show default loading');
    return (
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <AppContentWithoutSideBar>
          <Loader />
        </AppContentWithoutSideBar>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <Switch>
          <Route path='/Login'>
            {props.isLoggedInWithFm || props.isLoggedInWithMetamask // Don't render login if loggedIn
              ? <Redirect to='/' />
              : <AppContentWithoutSideBar>
                <LoginPage
                  loginWithFortmatic={props.loginWithFortmatic}
                  logoutFromFortmatic={props.logoutFromFortmatic}
                  loginWithMetamask={props.loginWithMetamask}
                />
              </AppContentWithoutSideBar>
            }
          </Route>

          <Route path='/Register'>
            {props.isNoUserFound // Don't render register if registered
              ? (<AppContentWithSideBar>
                <Register {...props} />
              </AppContentWithSideBar>)
              : <Redirect to='/' />
            }
          </Route>

          <AppContentWithSideBar>
            <Routes
              isNoUserFound={props.isNoUserFound}
              isLoggedInWithFm={props.isLoggedInWithFm}
              isLoggedInWithMetamask={props.isLoggedInWithMetamask}
              refreshReviews={props.refreshReviews}
              isConnectedToBloxberg={props.isConnectedToBloxberg}
              {...props} />
          </AppContentWithSideBar>;
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

