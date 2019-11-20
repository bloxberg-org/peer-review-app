import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import useForm from 'react-hook-form';
import styled from 'styled-components';
import Button from '../../Button';
import FormField from '../FormField';

ImportModalView.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isDoneFetching: PropTypes.bool.isRequired
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 70%;
  justify-content: center;
  align-items: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const SuccessText = styled.span`
  font-size: 1.4rem;
  font-weight: bold;
`;

export default function ImportModalView(props) {
  const { register, handleSubmit, errors } = useForm();
  if (props.isDoneFetching) {
    return (
      <Wrapper>
        <Icon icon={faCheckCircle} size='4x' color='green' />
        <SuccessText>Success!</SuccessText>
      </Wrapper>
    );
  }
  return (

    <Wrapper>
      <form onSubmit={handleSubmit(props.onSubmit)}>
        <FormField
          noBorder
          title='Enter DOI of the original article the peer review is done for'
          name='doi'
          placeholder='DOI of the article'
          errors={errors.doi}
          register={register({ required: true })}
        />
        <ButtonWrapper>
          <Button primary>Submit</Button>
        </ButtonWrapper>
      </form>
    </Wrapper>
  );
}