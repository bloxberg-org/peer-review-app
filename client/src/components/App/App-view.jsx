import PropTypes from 'prop-types';
import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import GlobalStyle, { theme } from '../../assets/theme';
import AddReview from '../AddReview';
import AllReviews from '../AllReviews';
import Loader from '../Loader';
import Overview from '../Overview';
import SideBar from '../SideBar';
import SingleReview from '../SingleReview';
import TopBar from '../TopBar';
import NoUserFound from './NoUserFound';

AppView.propTypes = {
  user: PropTypes.object,
  isUserLoading: PropTypes.bool.isRequired,
  isNoUserFound: PropTypes.bool.isRequired
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
  let AppContent;

  if (props.isNoUserFound) // Inform if no user found.
    AppContent = <NoUserFound />;
  else if (props.isUserLoading) // If loading user and reviews return the spinner
    AppContent = (<Loader />);
  else {
    AppContent = (
      <Switch>
        <Route path="/Overview">
          <TopBar title='Overview' {...props} />
          <Overview {...props} />
        </Route>
        <Route path="/Reviews">
          <Switch>
            <Route path="/Reviews/AddReview">
              <TopBar title='Add Review' {...props} />
              <AddReview {...props} />
            </Route>
            <Route path="/Reviews/YourReviews">
              <TopBar title='Your Reviews' {...props} />
              <AllReviews {...props} />
            </Route>
            <Route path="/Reviews/:index">
              <TopBar title='Review' {...props} />
              <SingleReview {...props} />
            </Route>

            {/* Redirect to AddReview at route /Review/ */}
            <Redirect to='/Reviews/AddReview' />
          </Switch>
        </Route>
        <Route path="/">
          <Redirect to="/Overview" />
        </Route>
      </Switch>
    );
  }
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Wrapper>
        <Router>
          <SideBarWrapper>
            <SideBar />
          </SideBarWrapper>
          <MainWrapper>
            {
              AppContent
            }
          </MainWrapper>
        </Router>
      </Wrapper>
    </ThemeProvider>
  );
}