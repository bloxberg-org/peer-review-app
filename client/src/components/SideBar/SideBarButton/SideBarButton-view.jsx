import PropTypes from 'prop-types';
import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

SideBarButton.propTypes = {
  to: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.any,
  className: PropTypes.string
};

const Wrapper = styled.div`
  color: white;
  :hover {
    background-color: ${props => props.theme.sidebarHover};
    color: ${props => props.theme.sidebarActiveText}
  }
  padding-top: 10px;
  padding-bottom: 10px;
  `;

const SubLinkWrapper = styled(Wrapper)``;

const StyledLink = styled(NavLink).attrs(props => ({
  activeStyle: {
    fontWeight: 'bold',
    color: props.theme.sidebarActiveText
  }
}))`
  color: ${props => props.active ? props.theme.sidebarActiveText : props.theme.sidebarInactiveText};
  text-decoration: none;
  font-weight: 300;
`;

const LinkWrapper = styled.div`
  margin-left: 72px;
`;
export default function SideBarButton(props) {

  return (
    <Wrapper className={props.className}>
      <LinkWrapper className='link-wrapper'>
        <StyledLink className='link' to={props.to}>{props.title}</StyledLink>
      </LinkWrapper>
      {
        props.children ?
          <SubLinkWrapper>
            {props.children}
          </SubLinkWrapper>
          : null
      }
    </Wrapper>
  );
}