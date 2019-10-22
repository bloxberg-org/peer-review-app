import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
  
} from "react-router-dom";
import styled, {ThemeProvider} from 'styled-components';
import Overview from './components/Overview';
import SideBar from './components/SideBar';
import GlobalStyle, { theme } from "./assets/theme";
import Reviews from './components/Reviews';
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
        userName: "Max Planck"
    }
  }
  
  render() {    
    return (
      <ThemeProvider theme={theme}>
      <GlobalStyle/>      
        <Wrapper>
          <Router>
            <SideBarWrapper>
              <SideBar/>
            </SideBarWrapper>
            <MainWrapper>
              <Switch>
                <Route path="/Overview">
                  <TopBar title='Overview' userName={this.state.userName}/>
                  <MainWrapper>
                    <Overview {...this.state}/>
                  </MainWrapper>
                </Route>
                <Route path="/Reviews">
                  <TopBar title='Reviews' userName={this.state.userName}/>
                  <MainWrapper>
                    <Reviews/>
                  </MainWrapper>
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