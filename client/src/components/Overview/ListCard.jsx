import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  background-color: white;
  margin: 20px;
  border-radius: 10px;
  flex-direction: column;
  display: flex;
  flex: 1;
  `;

const Title = styled.h2`
  font-weight: 600;
  font-size: 12pt;
  `;

const ExpandButton = styled.a`
  color: blue;
  text-decoration: none;
  `;

const TopWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  `;

const ItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 20px;
  margin: 5px;
  `;

const ItemTitle = styled.div`
  font-size: 8pt;
  `;

const ItemValue = styled.div`
  font-size: 7pt;
  color: gray;
  `;

const ItemVerifyStatus = styled.div`
  background-color: ${(props) => props.verified ? 'green' : 'pink'};
  padding: 5px;
  border-radius: 3px;
  font-size: 5pt;
  color: white;
  width: 50px;
  text-align: center;
  `;

const CreateNewTitle = styled(ItemTitle)`
  color: gray;
`

const CreateNewButton = styled.div`
  height:15px;
  width: 15px;
  border-radius: 7.5px;
  color: white;
  background-color: gray;
`;

const Item = (props) => (
  <ItemWrapper>
    <ItemTitle>{props.title}</ItemTitle>
    {props.type == 'highlight' ? 
      <ItemValue>{props.value}</ItemValue> :
      <ItemVerifyStatus verified={props.verified}>
        {props.verified ? 'Verified' : 'Not Verified'}
      </ItemVerifyStatus>
    }
  </ItemWrapper>
);

const CreateNewVerificationItem = (props) => (
  <ItemWrapper>
    <CreateNewTitle> Create new verification </CreateNewTitle>
    <CreateNewButton>+</CreateNewButton>
  </ItemWrapper>
)
const Items = (props) => {
  let type = props.type;
  let items = props.children;
  return (
    <ItemsWrapper>
      {
        type == 'review' ?
        <CreateNewVerificationItem/> : null
      }
      { 
        items.map( (item) => {
          return type == 'highlight' ?
            <Item title={item.title} value={item.count} type={type}/> :
            <Item title={item.title} verified={item.verified} type={type}/>
        })
      }
    </ItemsWrapper>
  )
}
export default function ListCard(props) {
  return(
    <Wrapper>
      <TopWrapper>
        <Title>{props.title}</Title>
        <ExpandButton>{props.expandLabel}</ExpandButton>
      </TopWrapper>
      <ItemsWrapper>
        <Items type={props.type}>
          {props.children}
        </Items>
      </ItemsWrapper>
    </Wrapper>
  )
}