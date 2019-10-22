import React from 'react';
import styled from 'styled-components';

const Form = styled.form`
  width: 100%;
  `;

const Input = styled.input`
  width: 100%;
  height: 25px;
  color: ${props => props.theme.gray};
  font-size: 0.65em;
  border: none;
  border-radius: 5px;
  font-family: 'Muli', sans-serif;
  padding: 4px;
  -webkit-filter: drop-shadow(0px 0px 8px rgba(0,0,0,0.25));
  outline: none;
  `;

const Wrapper = styled.div`
  display:flex;
  flex: 0.5;
  align-items: center;
  
`;

export default function Search(props) {

  return(
    <Wrapper>
      <Form>
        <Input placeholder='Try: "Max Planck"'>
        </Input>
      </Form>
    </Wrapper>
  );
}