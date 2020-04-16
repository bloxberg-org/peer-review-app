import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { useHistory, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import F1000Logo from '../../assets/F1000R_logo.png';
import PublonsLogo from '../../assets/publons_logo.png';
import CardWrapper from '../CardWrapper';
import InputTitle from '../FormField/InputTitle';

AddReviewView.propTypes = {
};

//===================================================
// ================ Define Wrappers =================
//===================================================

const Wrapper = styled.div`
  display: flex;
  flex: 1
  `;

const ImportButtonsWrapper = styled.div`
  display: flex;
  & > div {
    margin: 8px 0;
    margin-right: 16px; /*left align first element*/
  }
`;

const ImportButton = styled((props) => {
  return (
    <div className={props.className} onClick={props.onClick}>
      <img src={props.img} alt='Import via DOI' />
    </div>
  );
})`
  padding: 16px;
  border-radius: 8px;
  &:hover {
    cursor: pointer
  }
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.backgroundColor};
  & > img {
    max-width: 130px;
  }
`;

const TextButton = styled(props => {
  return (
    <div className={props.className} onClick={props.onClick}>
      {props.children}
    </div>
  );
})`
  font-weight: bold;
  &:hover {
    cursor: pointer
  }
`;

//====================================================
// ============= Define base components =============
//====================================================

export default function AddReviewView(props) {
  let history = useHistory();
  let { url } = useRouteMatch();

  return (
    <Wrapper>
      <CardWrapper title="Add Review">
        How would you like to add your review?
        <div style={{ margin: '24px 0' }}>
          <InputTitle>Import From:</InputTitle>
          <ImportButtonsWrapper>
            <ImportButton img={F1000Logo} backgroundColor='#f2673c' onClick={() => history.push(`${url}/F1000R`)} />
            <ImportButton img={PublonsLogo} backgroundColor='#336599' onClick={() => history.push(`${url}/Publons`)} />
          </ImportButtonsWrapper>
        </div>
        <div style={{ margin: '24px 0' }}>
          <TextButton onClick={() => history.push(`${url}/Email`)}>
            Email Import
          </TextButton>
        </div>
        <div style={{ margin: '24px 0' }}>
          <TextButton onClick={() => history.push(`${url}/Manual`)}>
            Add Manually
          </TextButton>
        </div>
      </CardWrapper>
    </Wrapper>
  );
}