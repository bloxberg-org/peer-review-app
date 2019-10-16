import React from 'react';    
import styled from 'styled-components';
import TopBar from '../components/TopBar/TopBar';

class Overview extends React.Component {    
  constructor(props) {  
    super(props);
    this.state = {  
        userName: "Max Planck"
    }
  }
  
  render() {    
    return (  
      <TopBar/>
    );
  }
}

export default Overview;   