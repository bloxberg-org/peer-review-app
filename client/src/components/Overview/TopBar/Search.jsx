import React from 'react';
import styled from 'styled-components';

const Form = styled.form`
  background-color: white;
  box-shadow: 3px;
  border-radius: 2px;
  width: 5rem;
  height: 20px;
  width: 100%;
  `;

const Input = styled.input`
  color: gray;
  `;

const Wrapper = styled.div`
  display:flex;
  flex: 0.5;
  align-items: center
`;

export default function Search(props) {

  return(
    <Wrapper>
      <Form>
        <Input placeholder='Try: \"Max Planck\"'>
        </Input>
      </Form>
    </Wrapper>
  );
}