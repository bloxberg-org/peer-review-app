import React from 'react';    
import styled from 'styled-components';

const Wrapper = styled.div`
  flex: 0 1 18%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background-color: white;
  text-align: center;
  margin: 5px;
  padding: 20px;
  border: 1px solid ${props => props.theme.border};
  &:hover {
    border-color: ${ props => props.theme.primary};
    color: ${props => props.theme.primary};
    cursor: pointer;
  };
`;

const Title = styled.h2`
  font-size: 1em;
  font-weight: bold;
  color: ${props => props.theme.gray};
  ${Wrapper}:hover & {
    color: ${props => props.theme.primary};
  };
  `;

const Value = styled.div`
  font-size: 1.8em;
  font-weight: 600;
  `;

export default function OverviewCard(props){     
  
  return (  
    <Wrapper>
      <Title>{props.title}</Title>
      <Value>{props.value}</Value>
    </Wrapper>
  );

}