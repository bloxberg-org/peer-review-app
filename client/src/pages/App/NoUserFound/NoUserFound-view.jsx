import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center
`;

const Text = styled.span`
  font-size: 1.4rem
`;
export default function NoUserFoundView() {
  return (
    <Wrapper>
      <Text>
        No user found :(
      </Text>
      <Text>
        Please register or switch users
      </Text>
    </Wrapper>
  );
} 