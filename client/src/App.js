import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import GlobalStyle, { theme } from './assets/theme';
import Overview from './components/Overview';
import Reviews from './components/Reviews';
import SideBar from './components/SideBar';
import TopBar from './components/TopBar';

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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: 'Max Planck'
    };
  }

  render() {
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
                  <TopBar title='Overview' userName={this.state.userName} />
                  <Overview {...this.state} />
                </Route>
                <Route path="/Reviews">
                  <TopBar title='Reviews' userName={this.state.userName} />
                  <Reviews />
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
}

export default App;