import PropTypes from 'prop-types';
import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import GlobalStyle, { theme } from '../../assets/theme';
import AddReview from '../AddReview';
import Overview from '../Overview';
import SideBar from '../SideBar';
import TopBar from '../TopBar';

AppView.propTypes = {
  user: PropTypes.object
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
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Wrapper>
        <Router>
          <SideBarWrapper>
            <SideBar />
          </SideBarWrapper>
          <MainWrapper>
            <Switch>
              <Route path="/Overview">
                <TopBar title='Overview' {...props} />
                <Overview {...props} />
              </Route>
              <Route path="/AddReview">
                <TopBar title='Add Review' {...props} />
                <AddReview {...props} />
              </Route>
              <Route path="/">
                <Redirect to="/Overview" />
              </Route>
            </Switch>
          </MainWrapper>
        </Router>
      </Wrapper>
    </ThemeProvider>
  );
}