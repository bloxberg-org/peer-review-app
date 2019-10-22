import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  background-color: white;
  max-width: 50%;
  max-height: 300px;
  border-radius: 10px;
  flex-direction: column;
  display: flex;
  flex: 1;
  margin-right: 2%;
  border: 1px solid ${props => props.theme.border};

  &:last-child { 
    margin: 0px;
  }
  `;

const Title = styled.h2`
  font-weight: 600;
  font-size: 0.85em;
  `;

const ExpandButton = styled.a`
  color: blue;
  text-decoration: none;
  font-size: 0.55em;
  &:hover{
    cursor: pointer;
  }
  `;

const TopWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 24px;
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
  padding: 10px 24px;
  border-bottom: 1px solid ${props => props.theme.border};
  &:last-child {
    border: none;
  }
  `;

const ItemTitle = styled.div`
  font-size: 8pt;
  font-weight: 300;
  `;

const ItemValue = styled.div`
  font-size: 7pt;
  color: gray;
  `;

const ItemVerifyStatus = styled.div`
  background-color: ${(props) => props.verified ? 'green' : 'pink'};
  padding: 5px;
  border-radius: 3px;
  font-size: 0.55em;
  color: white;
  width: 70px;
  text-align: center;
  `;

const CreateNewTitle = styled(ItemTitle)`
  color: ${props => props.theme.gray};
`

const CreateNewButton = styled(ItemTitle)`
  color: ${props => props.theme.gray};
  margin: 0px 5px;
`;

const CreateNewVerificationItemWrapper = styled(ItemWrapper)`
  justify-content: center;
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
  <CreateNewVerificationItemWrapper>
    <CreateNewButton>+</CreateNewButton>
    <CreateNewTitle> Create new verification </CreateNewTitle>
  </CreateNewVerificationItemWrapper>
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