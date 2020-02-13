import PropTypes from 'prop-types';
import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import GlobalStyle, { theme } from '../../assets/theme';
import AddReview from '../AddReview';
import AllReviews from '../AllReviews';
import ImportReviews from '../ImportReviews';
import Loader from '../Loader';
import Overview from '../Overview';
import SideBar from '../SideBar';
import SingleReview from '../SingleReview';
import TopBar from '../TopBar';
import InstallMetamask from './InstallMetamask';
import Register from '../Register';

AppView.propTypes = {
  user: PropTypes.object,
  isUserLoading: PropTypes.bool.isRequired,
  isNoUserFound: PropTypes.bool.isRequired,
  isWeb3Available: PropTypes.bool.isRequired
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

  //let history = useHistory();

  if (!props.isWeb3Available)
    AppContent = <InstallMetamask />;
  else if (props.isUserLoading) // If loading user and reviews return the spinner
    AppContent = (<Loader />);
  else if (props.isNoUserFound ) {
    AppContent = <Register/>;
  }
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
              <TopBar title='Reviews' {...props} />
              <AddReview {...props} />
            </Route>
            <Route path="/Reviews/ImportReviews">
              <TopBar title='Reviews' {...props} />
              <ImportReviews {...props} />
            </Route>
            <Route path="/Reviews/YourReviews">
              <TopBar title='Reviews' {...props} />
              <AllReviews {...props} />
            </Route>
            <Route path="/Reviews/:id">
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
