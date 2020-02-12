import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import Graph from './Graph';
import ListCard from './ListCard';
import OverviewCard from './OverviewCard';

OverviewView.propTypes = {
  data: PropTypes.object,
  graphData: PropTypes.object,
  highlightedReviews: PropTypes.array,
  reviewVerification: PropTypes.array,
  isUserLoading: PropTypes.bool,
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


const Wrapper = styled.div`
  flex: 1;
  padding: 30px;
`;

export default function OverviewView(props) {

  // Render cards e.g. 'H-Index': 75, (Number of ) 'Peer Reviews': 32...
  let cardsData = props.cardsData;
  let cards = [];
  let i = 0;
  for (let key of Object.keys(cardsData)) {
    cards.push(<OverviewCard key={i++} title={key} value={cardsData[key]}></OverviewCard>);
  }

  return (
    <Wrapper>
      <CardsWrapper>
        {
          cards
        }
      </CardsWrapper>
      <Graph userName={props.user.firstName + ' ' + props.user.lastName} data={props.graphData} />
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