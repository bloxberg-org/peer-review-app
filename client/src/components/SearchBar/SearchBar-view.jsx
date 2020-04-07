import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

SearchBar.propTypes = {
  placeholder: PropTypes.string,
  className: PropTypes.string
};

const Input = styled.input`
  width: 100%;
  height: 25px;
  color: ${props => props.theme.gray};
  font-size: 0.65em;
  border-radius: 5px;
  font-family: 'Muli', sans-serif;
  padding: 4px;
  outline: none;
  border-width: 1px;
  border-style: solid;
  border-color: ${props => props.theme.gray};
  `;

const Wrapper = styled.div`
  display:flex;
  flex: 0.5;
  align-items: center;
  
`;

export default function SearchBar(props) {

  return (
    <Wrapper className={props.className}>
      <Input placeholder={props.placeholder} />
    </Wrapper>
  );
}