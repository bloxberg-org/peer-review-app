import PropTypes from 'prop-types';
import React from 'react';
import Loader from 'react-loader-spinner';
import styled from 'styled-components';
import Graph from './Graph';
import ListCard from './ListCard';
import OverviewCard from './OverviewCard';

OverviewView.propTypes = {
  data: PropTypes.object,
  graphData: PropTypes.object,
  highlightedReviews: PropTypes.array,
  reviewVerification: PropTypes.array,
  isLoading: PropTypes.bool
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

  let data = props.data;
  let cards = [];
  let i = 0;
  for (let key of Object.keys(data)) {
    cards.push(<OverviewCard key={i++} title={key} value={data[key]}></OverviewCard>);
  }

  if (props.isLoading) {
    return (
      <Wrapper>
        <Loader
          type='Grid'
        />
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
      <Graph userName={this.props.userName} data={this.state.graphData} />
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