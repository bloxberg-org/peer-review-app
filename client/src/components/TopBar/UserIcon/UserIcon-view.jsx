import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import userIcon from '../../../assets/user.png';

UserIconView.propTypes = {
  user: PropTypes.object,
  onClick: PropTypes.func
};

const Name = styled.div`
  font-weight: bold;
  font-size: 0.8em;
  /* Remove the small inherent padding of the font. Alings the text with the icon centered */
  line-height: 100%; 
  `;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  cursor: pointer;
  `;

const Picture = styled.img`
  height: 20px;
  width: 20px;
  border-radius: 10px;
  margin: auto 10px;
  `;

export default function UserIconView(props) {
  return (
    <Wrapper onClick={props.onClick}>
      <Name>{props.user.firstName} {props.user.lastName}</Name>
      <Picture src={userIcon} />
    </Wrapper>
  );
}