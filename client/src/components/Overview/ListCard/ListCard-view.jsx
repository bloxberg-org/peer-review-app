import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Loader from '../../Loader';

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

const ItemTitle = styled.a`
  font-size: 8pt;
  font-weight: 300;
  color: inherit;
  text-decoration: none;
  &:hover {
    cursor: pointer;
  }
  `;

const ItemValue = styled.div`
  font-size: 7pt;
  color: gray;
  `;

const ItemVerifyStatus = styled.div`
  background-color: ${(props) => props.verified ? 'green' : 'rgba(0, 0, 0, 0.5)'};
  padding: 5px;
  border-radius: 3px;
  font-size: 0.55em;
  color: white;
  width: 70px;
  text-align: center;
  `;

const Item = (props) => {
  let history = useHistory();
  return (
    <ItemWrapper>
      <ItemTitle onClick={() => history.push(`/Reviews/${props.id}`)}>{props.publisher}</ItemTitle>
      {
        props.type === 'highlight'
          ?
          <ItemValue>{props.vouchersCount} voucher{/*add plural -s*/props.vouchersCount > 1 ? 's' : null}</ItemValue>
          :
          <ItemVerifyStatus verified={props.verified}>
            {props.verified ? 'Verified' : 'Not Verified'}
          </ItemVerifyStatus>
      }
    </ItemWrapper>
  );
};

Item.propTypes = {
  id: PropTypes.string.isRequired,
  publisher: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  vouchersCount: PropTypes.number.isRequired,
  verified: PropTypes.bool.isRequired,
};

const Items = (props) => {
  let type = props.type;
  let items = props.children;
  return (
    <ItemsWrapper>
      {
        items.map((item, i) => {
          return <Item publisher={item.publisher} verified={item.verified} vouchersCount={item.vouchers.length} type={type} key={i} id={item.id} />;
        })
      }
    </ItemsWrapper>
  );
};
Items.propTypes = {
  type: PropTypes.string.isRequired,
  children: PropTypes.array.isRequired
};

ListCardView.propTypes = {
  reviews: PropTypes.array,
  title: PropTypes.string,
  type: PropTypes.string,
};

export default function ListCardView(props) {
  if (!props.reviews)
    return <Loader />;
  return (
    <Wrapper>
      <TopWrapper>
        <Title>{props.title}</Title>
      </TopWrapper>

      <ItemsWrapper>
        {props.reviews.length === 0
          ? <div style={{ textAlign: 'center' }}>No reviews found</div>
          : <Items type={props.type}>
            {props.reviews}
          </Items>
        }
      </ItemsWrapper>

    </Wrapper>
  );
}