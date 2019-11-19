import PropTypes from 'prop-types';
import React from 'react';
import useForm from 'react-hook-form';
import styled from 'styled-components';
import Button from '../../Button';
import FormField from '../FormField';

ImportModalView.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

const Wrapper = styled.div`
`;

export default function ImportModalView(props) {
  const { register, handleSubmit, errors } = useForm();

  return (
    <Wrapper>
      <form onSubmit={handleSubmit(props.onSubmit)}>
        <FormField
          title='Enter Article DOI'
          name='doi'
          placeholder='DOI of the article'
          errors={errors.doi}
          register={register({ required: true })}
        />
        <Button primary>Submit</Button>
      </form>
    </Wrapper>
  );
}