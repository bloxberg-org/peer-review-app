import React from 'react';
import styled from 'styled-components';

const Form = styled.form`
  background-color: white;
  box-shadow: 3px;
  border-radius: 2px;
  width: 5rem;
  height: 20px;
  `;

const Input = styled.input`
  color: gray;
  `;
export default function Search(props) {

  return(
    <Form>
      <Input placeholder='Try: \"Max Planck\"'>
      </Input>
    </Form>
  );
}