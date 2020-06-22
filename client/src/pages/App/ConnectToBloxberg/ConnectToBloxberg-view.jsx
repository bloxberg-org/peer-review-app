import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Text = styled.span`
`;

export default function ConnectToBloxberg() {

  return (
    <Wrapper>
      <Text> Seems you are connected to another network. Please connect to bloxberg network. </Text>
    </Wrapper>
  );
}