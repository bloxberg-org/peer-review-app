import React from 'react';    
import styled from 'styled-components';
import { Link } from "react-router-dom";
import theme from '../../assets/theme';

const Wrapper = styled.div`
  color: white;
  :hover {
    background-color: ${theme.SIDEBAR_HOVER};
  }
  `;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
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