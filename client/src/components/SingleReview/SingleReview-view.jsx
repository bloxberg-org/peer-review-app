import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import CardWrapper from '../CardWrapper';

SingleReviewView.propTypes = {
  DBreview: {
    articleTitle: PropTypes.string.isRequired
  }
};

const Wrapper = styled.div`
    display: flex;
    flex: 1;
  `;

const UpperHalfWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1
`;

const ContentWrapper = styled.div`
  flex: 1
`;
const ReviewFieldTitle = styled.span`
font - size: 1.2em;
font - weight: 400;
`;

const ReviewFieldText = styled.span`

  `;
const ReviewField = styled(props => {
  return (
    <div>
      <ReviewFieldTitle> {props.title} </ReviewFieldTitle>
      <ReviewFieldText> {props.value} </ReviewFieldText>
    </div>
  )
})``;
export default function SingleReviewView(props) {
  console.log(props);
  return (
    <Wrapper>
      <CardWrapper title={props.DBreview.articleTitle}>
        <UpperHalfWrapper>

        </UpperHalfWrapper>
        <ContentWrapper>
          <ReviewField title='Content' value={props.DBreview.content} />
        </ContentWrapper>
      </CardWrapper>
    </Wrapper>
  );
}