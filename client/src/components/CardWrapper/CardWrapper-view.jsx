import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

CardWrapper.propTypes = {
  children: PropTypes.any,
  title: PropTypes.string
};

const Wrapper = styled.div`
  margin: 24px;
  background-color: white;
  border: 1px solid ${props => props.theme.border};
  border-radius: 5px;
  width: 100%;
  flex-direction: column;
  `;

const TitleWrapper = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  `;

const Title = styled.span`
  font-size: 1.5em;
  font-weight: bold;
  margin: 32px;
  flex:1;
  `;

export default function CardWrapper(props) {
  return (
    <Wrapper>
      <TitleWrapper>
        <Title>{props.title}</Title>
      </TitleWrapper>
      {props.children}
    </Wrapper>
  );
}