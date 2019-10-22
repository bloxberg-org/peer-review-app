import React from 'react';
import styled from 'styled-components';
import example from '../../../assets/example.png';

const Name = styled.div`
  font-weight: bold;
  font-size: 0.8em
  `;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex: 0.5;
  justify-content: flex-end;
  align-items: center;
  `;

const Picture = styled.img`
  height: 20px;
  width: 20px;
  border-radius: 10px;
  margin: auto 10px;
  `;

export default function UserIcon(props) {
  return(
    <Wrapper>
      <Name>{props.userName}</Name>
      <Picture src={example}/>
    </Wrapper>
  )
}