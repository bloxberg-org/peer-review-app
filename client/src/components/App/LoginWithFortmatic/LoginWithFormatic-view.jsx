import PropTypes from 'prop-types';
import React from 'react';
import useForm from 'react-hook-form';
import styled from 'styled-components';
import Button from '../../Button';
import FormField from '../../FormField/';

LoginWithFortmaticView.propTypes = {
  handleLogin: PropTypes.func.isRequired
};

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;


const Text = styled.span`
`;

export default function LoginWithFortmaticView(props) {
  const { register, handleSubmit, errors } = useForm();

  return (
    <Wrapper>
      <Text> Login with Fortmatic </Text>
      <form onSubmit={handleSubmit(props.handleLogin)}>
        <FormField
          name='email'
          title='E-Mail'
          placeholder='planck@mail.com'
          errors={errors.email}
          register={register({ required: true })} />
        <Button> Login </Button>
      </form>
    </Wrapper>
  );
}