/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  width: 140px;
  height: 48px;
  color: white;
  outline: none;
  border: none;
  font-weight: bold;
  font-family: 'Muli', sans-serif;
  font-size: 1.05em;
  background-color: ${props => {
    if (props.primary)
      return props.theme.primary;
    else if (props.secondary)
      return props.theme.secondary;
    else
      return '#000000';
  }};
  text-align: center;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  -webkit-filter: drop-shadow(0px 2px 2px black);
  &:hover {
    cursor: pointer;
    background-color: ${props => {
    if (props.primary)
      return props.theme.primaryDark;
    else if (props.secondary)
      return props.theme.secondaryDark;
    else
      return '#000000';
  }};
  };
  &:active {
    transform: translateY(4px);
    -webkit-filter: drop-shadow(0px 0px 2px black);
  }
  &:disabled {
    filter: none;
    opacity: 50%;
    cursor: default;
  }
  `;

export default function Button(props) {
  return (
    <StyledButton {...props}>{props.children}</StyledButton>
  );
}