import React from 'react';    
import styled from 'styled-components';
import TopBar from '../components/TopBar/TopBar';
import OverviewCard from '../components/OverviewCard/OverViewCard';

const CardsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20 10;
  `;

const Wrapper = styled.div`
  background-color: gray;
  flex: 1;
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
        }
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
      </Wrapper>
    );
  }
}

export default Overview;   