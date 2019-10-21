import React from 'react';    
import styled from 'styled-components';
import theme from '../../assets/theme';

const Wrapper = styled.div`
  width: 150px;
  height: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background-color: white;
  text-align: center;
  margin: 5px;
  border: 2px solid transparent;
  &:hover {
    border-color: ${theme.PRIMARY};
    color: ${theme.PRIMARY};
  };
`;

const Title = styled.h2`
  font-weight: 500
  `;

const Value = styled.div`
  font-size: 30px;
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