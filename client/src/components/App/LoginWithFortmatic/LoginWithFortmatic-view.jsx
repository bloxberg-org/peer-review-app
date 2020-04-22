import PropTypes from 'prop-types';
import React from 'react';
import useForm from 'react-hook-form';
import styled from 'styled-components';
import Button from '../../Button';
import FormField from '../../FormField/';

LoginWithFortmaticView.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
};

const CustomFormField = styled(FormField)`
  border-bottom: 0px;
`;

const Wrapper = styled.div`
display: flex;
text-align: center;
justify-content: center;
flex-direction: column;
align-items: center;
margin-top: 20vh;
`;

const FormWrapper = styled.div`
  width: 75%;
  text-align: center;
  justify-content: center;
  align-items: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex: 0.4;
`;

const Text = styled.span`
`;

export default function LoginWithFortmaticView(props) {
  const { register, handleSubmit, errors } = useForm();

  return (
    <Wrapper>
      <FormWrapper>
      <form onSubmit={handleSubmit(props.handleLogin)}>
        <CustomFormField
          name='email'
          placeholder='Email'
          errors={errors.email}
          register={register({ required: true, pattern: /^\S+@\S+$/i })} />
          <ButtonWrapper>
            <Button primary> Login </Button>     
          </ButtonWrapper>
          </form>
      </FormWrapper>
    </Wrapper>
  );
}