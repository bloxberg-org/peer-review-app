import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import styled from 'styled-components';
import Overview from './views/Overview';
import SideBar from './components/SideBar/SideBar';

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
  flex: 0.3;
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
    );
  }
}

export default App;