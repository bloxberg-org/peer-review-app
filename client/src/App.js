import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import styled, {ThemeProvider} from 'styled-components';
import Overview from './views/Overview';
import SideBar from './components/SideBar/SideBar';
import GlobalStyle, { theme } from "./assets/theme";

const Wrapper = styled.div`
   display: flex;
   flex: 1;
`;

const OverviewWrapper = styled.div`
  flex : 1;
  display: flex;
  flex-direction: column;
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
          <Switch>
            <Route path="/">
              <OverviewWrapper>
                <Overview/>
              </OverviewWrapper>
            </Route>
          </Switch>
          </Router>
        </Wrapper>
      </ThemeProvider>
    );
  }
}

export default App;