import PropTypes from 'prop-types';
import React from 'react';
import useForm from 'react-hook-form';
import styled from 'styled-components';
import Button from '../../../Button';
import FormField from '../../../FormField';


FormView.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

const Wrapper = styled.div`
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export default function FormView(props) {
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