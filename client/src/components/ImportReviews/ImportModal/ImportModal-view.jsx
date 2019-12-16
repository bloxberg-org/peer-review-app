import PropTypes from 'prop-types';
import React from 'react';
import useForm from 'react-hook-form';
import styled from 'styled-components';
import Button from '../../Button';
import FormField from '../../FormField';


ImportModalView.propTypes = {
  onSubmit: PropTypes.func.isRequired
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

export default function ImportModalView(props) {
  const { register, handleSubmit, errors } = useForm();

  return (
    <Wrapper>
      <form onSubmit={handleSubmit(props.onSubmit)}>
        <FormField
          noBorder
          title='Enter Publons ID, ORCID, Web of Science ResearcherID or TRUID'
          name='academicId'
          placeholder='e.g. 0000-0002-1825-0097'
          errors={errors.academicId}
          register={register({ required: true })}
        />
        <ButtonWrapper>
          <Button primary>Submit</Button>
        </ButtonWrapper>
      </form>
    </Wrapper>
  );
}