import F1000Logo from 'assets/F1000R_logo.png';
import PublonsLogo from 'assets/publons_logo.png';
import Button from 'components/Button/Button-view';
import CardWrapper from 'components/CardWrapper';
import InputTitle from 'components/FormField/InputTitle';
import PropTypes from 'prop-types';
import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
import AddManually from './AddManually';
import F1000R from './F1000R';
import Publons from './Publons';

AddReviewView.propTypes = {
  selectedInput: PropTypes.string.isRequired,
  handleSelectedChange: PropTypes.func.isRequired,
  refreshReviews: PropTypes.func.isRequired
};

//===================================================
// ================ Define Wrappers =================
//===================================================

const Wrapper = styled.div`
  display: flex;
  flex: 1
  `;

const StyledInput = styled(props => {
  return (
    <div className={props.className}>
      <input type='radio' checked={props.checked} readOnly />
      {props.children}
    </div>
  );
})`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ImportButton = styled((props) => {
  return (
    <div className={props.className} onClick={props.onClick}>
      <img src={props.img} alt='Import Button' />
    </div>
  );
})`
  display: flex; // center img
  height: 60px;
  width: 150px;
  box-sizing: border-box;
  padding: 12px;
  border-radius: 8px;
  &:hover {
    cursor: pointer
  }
  background-color: ${props => props.backgroundColor};
  & > img {
    max-width: 100%;
    max-height: 100%;
    display: block;
    margin: auto;
  }
`;


//====================================================
// ============= Define base components =============
//====================================================

export default function AddReviewView(props) {
  // const blurbText = 'You can add your peer review by importing from integrated journals and platforms, using review submission emails or manually.';
  const blurbText = 'You can add your peer review by importing from integrated journals and platforms or manually.';
  return (
    <Wrapper>
      <CardWrapper title="Add Review" blurb={blurbText}>
        <div style={{ marginTop: '24px' }}>
          <InputTitle>Import From:</InputTitle>
          <div style={{ display: 'flex', justifyContent: 'space-around', margin: '16px 0' }}>
            <StyledInput checked={props.selectedInput === 'F1000R'}>
              <ImportButton img={F1000Logo} backgroundColor='#f2673c' onClick={() => props.handleSelectedChange('F1000R')} />
            </StyledInput>
            <StyledInput checked={props.selectedInput === 'Publons'}>
              <ImportButton img={PublonsLogo} backgroundColor='#336599' onClick={() => props.handleSelectedChange('Publons')} />
            </StyledInput>
            <StyledInput checked={props.selectedInput === 'Manual'}>
              <Button onClick={() => props.handleSelectedChange('Manual')}>
                Add Manually
              </Button>
            </StyledInput>
          </div>
        </div>
        <div style={{ height: '100%' }}>
          {props.selectedInput === 'F1000R' ? <F1000R refreshReviews={props.refreshReviews} /> : null}
          {props.selectedInput === 'Publons' ? <Publons refreshReviews={props.refreshReviews} /> : null}
          {props.selectedInput === 'Manual' ? <AddManually refreshReviews={props.refreshReviews} /> : null}
        </div>
        {/* <div style={{ margin: '24px 0' }}>
          <Button onClick={() => history.push(`${url}/Email`)}>
            Email Import
          </Button>
        </div> */}
      </CardWrapper>
    </Wrapper>
  );
}