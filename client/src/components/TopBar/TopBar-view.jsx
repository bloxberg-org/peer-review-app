import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Proptypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import FAIconButton from '../Button/FAIconButton';
import Search from './Search';
import UserIcon from './UserIcon';

TopBarView.propTypes = {
  title: Proptypes.string,
  user: Proptypes.object,
  isUserLoading: Proptypes.bool,
  handleLogout: Proptypes.func.isRequired,
  isLoggedInWithFm: Proptypes.bool.isRequired
};

const Title = styled.h1`
  font-size: 1.5em;
  margin: 10px
`;

const TitleWrapper = styled.div`
  flex:0.5;
`;

const TopBarRightWrapper = styled.div`
  flex:0.5;
  flex-direction: row;
  display: flex;
  justify-content: space-between;
  align-items: stretch;
`;

const TopBarWrapper = styled.div`
  align-items: stretch;
  flex-direction: row;
  display:flex;
  margin: 8px 30px;
`;

export default function TopBarView(props) {
  if (props.isUserLoading)
    return null;
  return (
    <TopBarWrapper>
      <TitleWrapper>
        <Title>{props.title}</Title>
      </TitleWrapper>
      <TopBarRightWrapper>
        <Search />
        <UserIcon user={props.user} />
        {
          props.isLoggedInWithFm
            ? <FAIconButton tooltip="Logout" onClick={props.handleLogout} icon={faSignOutAlt} />
            : null
        }
      </TopBarRightWrapper>
    </TopBarWrapper>
  );
}