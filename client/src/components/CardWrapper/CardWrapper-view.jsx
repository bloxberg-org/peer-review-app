import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

CardWrapper.propTypes = {
  children: PropTypes.any,
  title: PropTypes.string,
  blurb: PropTypes.string
};

const Wrapper = styled.div`
  margin: 24px;
  background-color: white;
  border: 1px solid ${props => props.theme.border};
  border-radius: 5px;
  width: 100%;
  flex-direction: column;
  display: flex;
  `;

const TitleWrapper = styled.div`
  margin: 32px 32px 8px;
  `;

const Title = styled.span`
  font-size: 1.5em;
  font-weight: bold;
  `;

const BlurbWrapper = styled.div`
  margin: 0px 32px;
`;

const BlurbText = styled.h3`
  font-size: 10pt;
  font-weight: 400;
  margin: 0;
`;

const ChildrenWrapper = styled.div`
  margin: 0 32px;
  display: flex;
  flex: 1;
  flex-direction: column;
`;
export default function CardWrapper(props) {
  return (
    <Wrapper>
      <TitleWrapper>
        <Title>{props.title}</Title>
      </TitleWrapper>
      {
        props.blurb
          ? <BlurbWrapper>
            <BlurbText>{props.blurb}</BlurbText>
          </BlurbWrapper>
          : null
      }
      <ChildrenWrapper>
        {props.children}
      </ChildrenWrapper>
    </Wrapper>
  );
}