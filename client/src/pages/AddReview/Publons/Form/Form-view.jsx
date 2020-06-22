import Button from 'components/Button';
import FormField from 'components/FormField';
import PropTypes from 'prop-types';
import React from 'react';
import useForm from 'react-hook-form';
import styled from 'styled-components';


FormView.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  error: PropTypes.string
};

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ErrorText = styled.span`
  color: red;
`;

export default function FormView(props) {
  const { register, handleSubmit, errors } = useForm();

  return (
    <form onSubmit={handleSubmit(props.onSubmit)}>
      <FormField
        noBorder
        title='Enter Publons ID, ORCID, Web of Science ResearcherID or TRUID'
        name='academicId'
        placeholder='e.g. 0000-0002-1825-0097'
        errors={errors.academicId}
        register={register({ required: true })}
      />
      <ErrorText>{props.error}</ErrorText>
      <ButtonWrapper>
        <Button primary>Submit</Button>
      </ButtonWrapper>
    </form>
  );
}