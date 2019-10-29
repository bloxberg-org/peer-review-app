import PropTypes from 'prop-types';
import React from 'react';
import Loader from 'react-loader-spinner';
import styled, { withTheme } from 'styled-components';
import Graph from './Graph';
import ListCard from './ListCard';
import OverviewCard from './OverviewCard';

OverviewView.propTypes = {
  data: PropTypes.object,
  graphData: PropTypes.object,
  highlightedReviews: PropTypes.array,
  reviewVerification: PropTypes.array,
  isLoading: PropTypes.bool,
  userName: PropTypes.string,
  cardsData: PropTypes.object
};

const CardsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  margin: 20px 0px;
  `;

const BottomCardsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 32px 0px
  `;

const LoaderWrapper = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

// withTheme Higher Order Function to access props.theme.primary field
const StyledLoader = styled(withTheme((props) => {
  return (<Loader
    type='Grid'
    color={props.theme.primary}
  />);
}))``;

const Wrapper = styled.div`
  flex: 1;
  padding: 30px;
`;

export default function OverviewView(props) {

  let cardsData = props.cardsData;
  let cards = [];
  let i = 0;
  for (let key of Object.keys(cardsData)) {
    cards.push(<OverviewCard key={i++} title={key} value={cardsData[key]}></OverviewCard>);
  }

  if (props.isLoading) {
    return (
      <Wrapper>
        <LoaderWrapper>
          <StyledLoader />
        </LoaderWrapper>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <CardsWrapper>
        {
          cards
        }
      </CardsWrapper>
      <Graph userName={props.userName} data={props.graphData} />
      <BottomCardsWrapper>
        <ListCard title='Highlighted Reviews' expandLabel='View details' type='highlight'>
          {props.highlightedReviews}
        </ListCard>
        <ListCard title='Review Verification' expandLabel='View all' type='review'>
          {props.reviewVerification}
        </ListCard>
      </BottomCardsWrapper>
    </Wrapper>
  );
}