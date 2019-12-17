import PropTypes from 'prop-types';
import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import PublonsLogo from '../../assets/publons_logo.png';
import CardWrapper from '../CardWrapper';
import InputTitle from '../FormField/InputTitle';
import ImportModal from './ImportModal';
import ImportedReviewsTable from './ReviewsTable';

ImportReviewsView.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  handleModalClose: PropTypes.func.isRequired,
  handleModalOpen: PropTypes.func.isRequired,
  appendToReviews: PropTypes.func.isRequired,
  fetchedReviews: PropTypes.array.isRequired,
  fetchedReviewsMeta: PropTypes.object.isRequired,
  toggleCheckReview: PropTypes.func.isRequired,
  setFetchedReviewsMeta: PropTypes.func.isRequired,
  selectReview: PropTypes.func.isRequired
};

// ======== Basic Components ==========
const Wrapper = styled.div`
    display: flex;
    flex: 1;
    height: 100%
  `;

const ImportWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 16px 0;
`;

const CardContentWrapper = styled.div`
  margin: 0 32px;
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const StyledCardWrapper = styled(CardWrapper)`
  display:flex;
  flex: 1;
`;

// =========== Compound Components ===========
const ImportButton = styled((props) => {
  return (
    <div className={props.className} onClick={props.onClick}>
      <img src={props.img} alt='Import via DOI' />
    </div>
  );
})`
  background-color: ${props => props.backgroundColor};
  padding: 16px;
  border-radius: 8px;
  margin: 0 16px;
  &:hover {
    cursor: pointer
  }
  & > img {
    max-width: 130px;
  }
`;

export default function ImportReviewsView(props) {
  return (
    <Wrapper>
      <Modal
        isOpen={props.isModalOpen}
        onRequestClose={props.handleModalClose}
        ariaHideApp={false} // see http://reactcommunity.org/react-modal/accessibility/#app-element
        style={{
          overlay: {
            background: 'rgba(0,0,0,0.75)',
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex'
          },
          content: {
            top: '25%',
            bottom: '25%',
            right: '15%',
            left: '15%',
            display: 'flex',
            justifyContent: 'center'
          }
        }}
      >
        <ImportModal
          handleModalOpen={props.handleModalOpen}
          handleModalClose={props.handleModalClose}
          appendToReviews={props.appendToReviews}
          setFetchedReviewsMeta={props.setFetchedReviewsMeta}
        />
      </Modal>
      <StyledCardWrapper title='Import Your Reviews'>
        <CardContentWrapper>
          {
            // Render Table if reviews are fetched. Render Import if not yet fetched.
            props.fetchedReviews.length > 0 ?
              <ImportedReviewsTable
                reviews={props.fetchedReviews}
                reviewsMeta={props.fetchedReviewsMeta}
                toggleCheckReview={props.toggleCheckReview}
                appendToReviews={props.appendToReviews}
                selectReview={props.selectReview}
              /> :
              <ImportWrapper>
                <InputTitle>Import From:</InputTitle>
                <ImportButton img={PublonsLogo} backgroundColor='#336599' onClick={props.handleModalOpen} />
              </ImportWrapper>
          }

        </CardContentWrapper>
      </StyledCardWrapper>
    </Wrapper>

  );
}