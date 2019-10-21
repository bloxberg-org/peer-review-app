import React from 'react';    
import styled from 'styled-components';
import TopBar from '../components/Overview/TopBar/TopBar';
import OverviewCard from '../components/Overview/OverviewCard/OverViewCard';
import Graph from '../components/Overview/Graph';
import ListCard from '../components/Overview/ListCard';

const CardsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20 10;
  `;

const BottomCardsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  `;

const Wrapper = styled.div`
  background-color: ${props => props.theme.background};
  flex: 1;
  padding: 30px;
`;
class Overview extends React.Component {    
  constructor(props) {  
    super(props);
    this.state = {  
        userName: "Max Planck",
        data: {
          'Peer Reviews': 60,
          'Verified Reviews': 16,
          'H-Index': 75,
          'Affiliated Journals': 25
        },
        graphData: {
          'Reviews this year': 17,
          'Average Review Length (words)': 325,
          'Most Recent Review': new Date('September 12, 2019'),
          'Most Reviewed Journal': 'Nature'
        },
        highlightedReviews:[
          {
            title: 'On an Improvement of Wien\'s Equation for the Spectrum',
            count: 4238
          },
          {
            title: 'On the Theory of the Energy Distribution Law of the Normal Spectrum',
            count: 1005
          },
          {
            title: 'Entropy and Temperatire of Radiant Heat',
            count: 914
          },
          {
            title: 'Eight Lectures on Theoretical Physics',
            count: 281
          }
        ],
        reviewVerification: [
          {
            title: 'Theory of Relatively Review',
            verified: true
          },
          {
            title: 'Thermodynamics Review',
            verified: false
          },
          {
            title: 'Statistical Mechanics',
            verified: false
          }
        ]
    }
  }
  
  render() {
    let data = this.state.data;
    let cards = [];
    let i = 0;
    for (let key of Object.keys(data)) {
      cards.push(<OverviewCard key={i++} title={key} value={data[key]}></OverviewCard>)
    }
    return (
      <Wrapper>
        <TopBar userName={this.state.userName}/>
        <CardsWrapper>
          {
            cards
          }
        </CardsWrapper>
        <Graph userName={this.state.userName} data={this.state.graphData}/>
        <BottomCardsWrapper>
          <ListCard title='Highlighted Reviews' expandLabel='View details' type='highlight'>
            {this.state.highlightedReviews}
          </ListCard>
          <ListCard title='Review Verification' expandLabel='View all' type='review'>
            {this.state.reviewVerification}
          </ListCard>
        </BottomCardsWrapper>
      </Wrapper>
    );
  }
}

export default Overview;   