import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import FAIconButton from 'components/Button/FAIconButton';
import Proptypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import UserIcon from './UserIcon';

TopBarView.propTypes = {
  title: Proptypes.string,
  user: Proptypes.object,
  isLoading: Proptypes.bool,
  logoutFromMagic: Proptypes.func.isRequired,
  isLoggedInWithMagic: Proptypes.bool.isRequired
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
  justify-content: flex-end;
  align-items: stretch;
`;

const TopBarWrapper = styled.div`
  align-items: stretch;
  flex-direction: row;
  display:flex;
  margin: 8px 30px;
`;


// ========== Compound Components ==========\

export default function TopBarView(props) {
  const history = useHistory();

  if (props.isLoading)
    return null;
  return (
    <TopBarWrapper>
      <TitleWrapper>
        <Title>{props.title}</Title>
      </TitleWrapper>
      <TopBarRightWrapper>
        {/* <StyledSearchBar placeholder='Try: "Max Planck"' /> */}
        <UserIcon user={props.user} onClick={() => history.push('/Overview')} />
        {
          props.isLoggedInWithMagic
            ? <FAIconButton tooltip="Logout" onClick={props.logoutFromMagic} icon={faSignOutAlt} />
            : null
        }
      </TopBarRightWrapper>
    </TopBarWrapper>
  );
}