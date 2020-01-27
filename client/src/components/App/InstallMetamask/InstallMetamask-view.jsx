import React from 'react';
import styled from 'styled-components';
import logo from '../../../assets/metamask.png';

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const MetamaskLogo = styled.img.attrs({
  src: logo
})`
  margin: 32px;
  width: 20vw;
  height: auto;
`;

const Text = styled.span`
`;

export default function InstallMetamask() {

  return (
    <Wrapper>
      <MetamaskLogo />
      <Text>Metamask not detected. Please install Metamask <a href='https://metamask.io/'>here</a>. </Text>
    </Wrapper>
  );
}