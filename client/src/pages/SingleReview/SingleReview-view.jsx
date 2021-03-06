import { faCheck, faFileImport, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import chain from 'assets/chain-tick.png';
import Button from 'components/Button/Button-view';
import CardWrapper from 'components/CardWrapper';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import ReactTooltip from 'react-tooltip';
import styled from 'styled-components';

const PUBLONS_ADDRESS = '0x14B3a00C89BDdB6C0577E518FCA87eC19b1b2311';

SingleReviewView.propTypes = {
  vouchReview: PropTypes.func.isRequired,
  deleteReview: PropTypes.func.isRequired,
  isVouchedByUser: PropTypes.bool.isRequired,
  isOwnReview: PropTypes.bool.isRequired,
  DBreview: PropTypes.shape({
    articleTitle: PropTypes.string,
    articleDOI: PropTypes.string,
    content: PropTypes.string
  }),
  blockchainReview: PropTypes.shape({
    author: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    journalId: PropTypes.string,
    publisher: PropTypes.string,
    manuscriptId: PropTypes.string,
    manuscriptHash: PropTypes.string,
    reviewHash: PropTypes.string,
    timestamp: PropTypes.number,
    recommendation: PropTypes.oneOf([0, 1, 2, 3]),
    url: PropTypes.string,
    vouchers: PropTypes.array
  }),
  handleFileChange: PropTypes.func.isRequired,
  hash: PropTypes.string,
  fileName: PropTypes.string
};

const FlexDiv = styled.div`
  display: flex;
  flex: 1;
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

const ReviewFieldTitle = styled.span`
  font-size: 1.1em;
  font-weight: bold;
`;

const ChainIconWrapper = styled.div`
  .tooltip{
    font-size: 10px;
  }
`;

const ReviewField = styled(props => {
  return (
    <div className={props.className} style={props.style}>
      <ReviewFieldTitle> {props.title} </ReviewFieldTitle>
      {props.children}
    </div>
  );
})`
  display: flex;
  flex-direction: column;
  margin: 8px 0;
  overflow: auto;
`;


const FileInput = styled((props) => {
  return (
    <div className={props.className}>
      <label id='file-label' htmlFor="file-input" className="custom-file-upload">
        <FontAwesomeIcon icon={faFileImport} /> {props.fileName ? props.fileName : 'Upload review file'}
      </label>
      <input id='file-input' type='file' onChange={props.handleFileChange} />
    </div>
  );
})`
  padding-top: 8px;
  & input {
      display: none;
  }
  & .custom-file-upload {
      border: 1px solid #ccc;
      display: inline-block;
      padding: 6px 12px;
      cursor: pointer;
      font-size: 10pt
  }
`;



export default function SingleReviewView(props) {
  // Don't show vouch button for own reviews.
  const VouchButton =
    props.isOwnReview
      ? null
      : <Button primary onClick={props.vouchReview} disabled={props.isVouchedByUser}>
        {
          props.isVouchedByUser
            ? 'Vouched'
            : 'Vouch'
        }
      </Button>;

  // Don't show delete button for not owned reviews.
  const DeleteButton =
    props.isOwnReview
      ? <Button onClick={props.deleteReview}>
        Delete
      </Button>
      : null;

  let hashCheck;
  if (props.hash && props.hash === props.blockchainReview.reviewHash) {
    hashCheck = <span style={{ color: 'green' }}><FontAwesomeIcon icon={faCheck} /> Reviews match!</span>;
  }
  if (props.hash && props.hash !== props.blockchainReview.reviewHash) {
    hashCheck = <span style={{ color: 'red' }}><FontAwesomeIcon icon={faTimes} /> Reviews don&apos;t match!</span>;
  }

  return (
    <FlexDiv>
      <CardWrapper style={{ padding: '32px' }} title={props.DBreview ? props.DBreview.articleTitle : 'No title given'}>
        <UpperHalfWrapper>
          <UpperHalfLeftWrapper>
            <ReviewField title='Article DOI'>{props.DBreview ? props.DBreview.articleDOI : 'N/A'}</ReviewField>
          </UpperHalfLeftWrapper>
          <UpperHalfRightWrapper>
            <JournalIdLockIconWrapper>
              <ReviewField title='Journal ID'>{props.blockchainReview.journalId}</ReviewField>
              <ChainIconWrapper>
                <img
                  style={{ 'width': '35px' }}
                  src={chain}
                  alt='chain approved'
                  data-tip='Secured by bloxberg blockchain' />
                <ReactTooltip className='tooltip' place='bottom' effect='solid' />
              </ChainIconWrapper>
            </JournalIdLockIconWrapper>
            <ReviewField title='Author'>{props.blockchainReview.author}</ReviewField>
            <ReviewField title='Publisher'>{props.blockchainReview.publisher}</ReviewField>
            <ReviewField title='Manuscript ID'>{props.blockchainReview.manuscriptId}</ReviewField>
            <ReviewField title='Manuscript Hash'>{props.blockchainReview.manuscriptHash}</ReviewField>
            <TimeStampRecommendationWrapper>
              <ReviewField title='Year'>{moment.unix(props.blockchainReview.timestamp).format('YYYY')}</ReviewField>
              <ReviewField title='Recommendation'>{props.blockchainReview.recommendation}</ReviewField>
            </TimeStampRecommendationWrapper>
            <ReviewField title='URL'>{props.blockchainReview.url}</ReviewField>
            <ReviewField title='Review Hash'>
              {props.blockchainReview.reviewHash}
              {hashCheck}
            </ReviewField>
            <ReviewField title='Check review hash'>
              {props.hash}
              <FileInput
                fileName={props.fileName}
                handleFileChange={props.handleFileChange}
              />
            </ReviewField>
            <FlexDiv style={{ flexDirection: 'row' }}>
              <ReviewField title='Vouchers' style={{ flex: 0.5 }}>
                {
                  props.blockchainReview.vouchers.length > 0 ?
                    props.blockchainReview.vouchers.map((address) => {
                      return address === PUBLONS_ADDRESS ? <span> Publons </span> : <span>{address}</span>; // Display 'Publons' if addresses match, show the address otherise.
                    })
                    : 'N/A' // Return null if no vouchers
                }
              </ReviewField>
              <FlexDiv style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center' }}>
                {VouchButton}
              </FlexDiv>
            </FlexDiv>
          </UpperHalfRightWrapper>
        </UpperHalfWrapper>
        <div style={{
          flex: 1,
          margin: '32px 0'
        }}>
          <ReviewField title='Content'>{props.DBreview ? props.DBreview.content : 'N/A'} </ReviewField>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
          {DeleteButton}
        </div>
      </CardWrapper>
    </FlexDiv >
  );
}