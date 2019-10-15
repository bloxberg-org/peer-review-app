import React from 'react';    
import styled from 'styled-components';

const Title = styled.h1`
  font-size: 100px;
  margin: 10px
  `;

class Dashboard extends React.Component {    
    constructor(props) {  
      super(props);  
          
      this.state = {  
         userName: "Max Planck"  
      }  
   }  
   render() {    
      return (  
        <div>    
          <Title>Overview</Title>
         </div>  
      );    
   }  
     
}    

export default Dashboard;   