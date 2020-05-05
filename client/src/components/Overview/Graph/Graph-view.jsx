import React from 'react';
import styled from 'styled-components';
import figure from '../../../assets/full_graph.png';

const Wrapper = styled.div`
  margin: 5;
  display: flex;
  background-color: white;
  flex-direction: row;
  flex: 1;
  border: 1px solid ${props => props.theme.border};
  border-radius: 8px
  `;

const GraphWrapper = styled.div`
  flex: 0.7;
  flex-direction: column;
  padding: 32px;
  border-right: 1px solid ${props => props.theme.border};
  `;

const Figure = styled.img`
  width: 100%;
`;

const FigureTitle = styled.h2`
  font-weight: 400;
`;

const FigureDate = styled.div`
  font-size: 11;
  color: gray;
  `;

const StatsWrapper = styled.div`
  flex: 0.3;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-between;
`;

const StatsTitle = styled.h3`
  color: gray;
  font-size: 9pt;
  `;

const StatsValue = styled.div`
  font-weight: 700;
  font-size: 12pt;
  `;

const StatsCardWrapper = styled.div`
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 15;
  text-align: center;
  padding: 24px 32px;
  border-bottom: 1px solid ${props => props.theme.border};
  `;


const StatsCard = props => {
  let title = props.title;
  let value = props.value instanceof Date ? props.value.toLocaleDateString() : props.value;
  return (
    <StatsCardWrapper>
      <StatsTitle>{title}</StatsTitle>
      <StatsValue>{value}</StatsValue>
    </StatsCardWrapper>
  )
};

export default function Graph(props) {
  let data = props.data;
  let cards = [];
  let i = 0;
  for (let key of Object.keys(data)) {
    cards.push(<StatsCard key={i++} title={key} value={data[key]}></StatsCard>)
  }

  return (
    <Wrapper>
      <GraphWrapper>
        <FigureTitle>{props.userName}'s Reviews</FigureTitle>
        <FigureDate> as of October 21st, 2019</FigureDate>
        <Figure src={figure} />
      </GraphWrapper>
      <StatsWrapper>
        {cards}
      </StatsWrapper>
    </Wrapper>
  );
}