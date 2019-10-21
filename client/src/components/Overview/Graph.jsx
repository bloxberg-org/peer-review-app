import React from 'react'
import styled from 'styled-components'
import figure from '../../assets/full_graph.png';

const Wrapper = styled.div`
  margin: 5;
  display: flex;
  flex-direction: row;
  flex: 1;
  `;

const GraphWrapper = styled.div`
  flex: 0.7;
  background-color: white;
  flex-direction: column;
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
  background-color: blue;
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  margin: 15;
  text-align: center;
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

const ExportButton = styled.button`
  width: 100px;
  height: 35px;
  color: white;
  background-color: blue;
  padding: 10;
  `;

export default function Graph(props){
  let data = props.data;
  let cards = [];
  let i = 0;
  for (let key of Object.keys(data)) {
    cards.push(<StatsCard key={i++} title={key} value={data[key]}></StatsCard>)
  }
  
  return(
    <Wrapper>
      <GraphWrapper>
        <FigureTitle>{props.userName}'s Reviews</FigureTitle>
        <FigureDate> as of October 21st, 2019</FigureDate>
        <Figure src={figure}/>
      </GraphWrapper>
      <StatsWrapper>
        {cards}
        <StatsCardWrapper>
          <ExportButton>Export</ExportButton>
        </StatsCardWrapper>
      </StatsWrapper>
    </Wrapper>
  );
}