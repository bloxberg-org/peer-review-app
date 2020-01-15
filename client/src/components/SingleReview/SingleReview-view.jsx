import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import lock from '../../assets/lock.png';
import CardWrapper from '../CardWrapper';

SingleReviewView.propTypes = {
  DBreview: PropTypes.shape({
    articleTitle: PropTypes.string.isRequired,
    articleDOI: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired
  }),
  blockchainReview: PropTypes.shape({
    id: PropTypes.string.isRequired,
    journalId: PropTypes.string.isRequired,
    publisher: PropTypes.string.isRequired,
    manuscriptId: PropTypes.string.isRequired,
    manuscriptHash: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired,
    recommendation: PropTypes.oneOf([0, 1, 2, 3]),
    url: PropTypes.string.isRequired
  })
};

const Wrapper = styled.div`
    display: flex;
    flex: 1;
  `;

const InnerCardWrapper = styled.div`
  padding: 32px;
`;

const UpperHalfWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1
`;

const UpperHalfLeftWrapper = styled.div`
  width: 50%;
`;

const UpperHalfRightWrapper = styled.div`
  width: 50%;
  overflow-wrap: break-word;
  border: 1px solid black;
  border-radius: 8px;
  box-sizing: border-box;
  padding: 8px 24px;
`;

const JournalIdLockIconWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center; // avoid strech
`;

const TimeStampRecommendationWrapper = styled.div`
  display: flex;
  flex-direction: row;
  & div {
    flex: 0.5;  
  }
` ;

const ContentWrapper = styled.div`
  flex: 1;
  margin: 32px 0
`;
const ReviewFieldTitle = styled.span`
  font-size: 1.1em;
  font-weight: bold;
`;

const ReviewFieldText = styled.span`
  `;

const ReviewField = styled(props => {
  return (
    <div className={props.className}>
      <ReviewFieldTitle> {props.title} </ReviewFieldTitle>
      <ReviewFieldText> {props.value} </ReviewFieldText>
    </div>
  );
})`
  display: flex;
  flex-direction: column;
  margin: 8px 0;
`;

export default function SingleReviewView(props) {
  console.log(props);
  return (
    <Wrapper>
      <CardWrapper title={props.DBreview ? props.DBreview.articleTitle : 'No title given'}>
        <InnerCardWrapper>
          <UpperHalfWrapper>
            <UpperHalfLeftWrapper>
              <ReviewField title='Article DOI' value={props.DBreview ? props.DBreview.articleDOI : 'N/A'} />
            </UpperHalfLeftWrapper>
            <UpperHalfRightWrapper>
              <JournalIdLockIconWrapper>
                <ReviewField title='Journal ID' value={props.blockchainReview.journalId} />
                <img style={{ 'width': '35px' }} src={lock} alt='hanging lock' />
              </JournalIdLockIconWrapper>
              <ReviewField title='Publisher' value={props.blockchainReview.publisher} />
              <ReviewField title='Manuscript ID' value={props.blockchainReview.manuscriptId} />
              <ReviewField title='Manuscript Hash' value={props.blockchainReview.manuscriptHash} />
              <TimeStampRecommendationWrapper>
                <ReviewField title='Timestamp' value={props.blockchainReview.timestamp} />
                <ReviewField title='Recommendation' value={props.blockchainReview.recommendation} />
              </TimeStampRecommendationWrapper>
              <ReviewField title='URL' value={props.blockchainReview.url} />
            </UpperHalfRightWrapper>
          </UpperHalfWrapper>
          <ContentWrapper>
            <ReviewField title='Content' value={props.DBreview ? props.DBreview.content : 'N/A'} />
          </ContentWrapper>
        </InnerCardWrapper>
      </CardWrapper>
    </Wrapper>
  );
}