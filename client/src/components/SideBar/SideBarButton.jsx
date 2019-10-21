import React from 'react';    
import styled from 'styled-components';
import { NavLink } from "react-router-dom";

const Wrapper = styled.div`
  color: white;
  :hover {
    background-color: ${props => props.theme.sidebarHover};
    color: ${props => props.theme.sidebarActiveText}
  }
  `;

const StyledLink = styled(NavLink).attrs(props => ({
  activeStyle :{
    fontWeight: "bold",
    color: props.theme.sidebarActiveText
  }
}))`
  color: ${props => props.active ? props.theme.sidebarActiveText : props.theme.sidebarInactiveText};
  text-decoration: none;
  font-weight: 300;
`

const LinkWrapper = styled.div `
  margin-left: 72px;
  padding-top: 10px;
  padding-bottom: 10px;
`
export default function SideBarButton (props){  
  
  return(
    <Wrapper>
      <LinkWrapper>
        <StyledLink to={props.to}>{props.children}</StyledLink>
      </LinkWrapper>
    </Wrapper>
  )
};