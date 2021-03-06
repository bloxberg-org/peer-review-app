import Button from 'components/Button';
import FormField from 'components/FormField/';
import PropTypes from 'prop-types';
import React from 'react';
import useForm from 'react-hook-form';
import styled from 'styled-components';

LoginWithMagicView.propTypes = {
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
margin-bottom: 5vh;
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

export default function LoginWithMagicView(props) {
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