import Button from 'components/Button';
import CardWrapper from 'components/CardWrapper';
import FormField from 'components/FormField';
import { getCurrentAccount } from 'connection/reviewConnection';
import React, { useState } from 'react';
import useForm from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { addAuthor } from 'utils/authors';

const Wrapper = styled.div`
  display: flex;
  flex: 1
  `;

const FormWrapper = styled.div`
  flex: 1;
  margin: 0px 32px;
  `;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 16px;
  `;

export default function App() {
  const [account, setAccount] = useState(0);

  const { register, handleSubmit, errors } = useForm();
  let history = useHistory();

  const onSubmit = author => {
    console.log(author);

    addAuthor(author)
      .then((response) => {
        console.log(response);
        setAccount(author._id);
        history.push('/', author._id);
        window.location.reload();
      })
      .catch(err => console.log(err));

  };

  getCurrentAccount().then((address) => {
    setAccount(address);
  });

  return (
    <CardWrapper title='Account Settings'>
      <Wrapper>
        <FormWrapper>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormField
              type="text"
              placeholder="First name"
              name="firstName"
              title="First Name"
              errors={errors.firstName}
              register={register({ required: true, maxLength: 80 })} />
            <FormField
              type="text"
              placeholder="Last Name"
              name="lastName"
              title="Surname"
              errors={errors.lastName}
              register={register({ required: true, maxLength: 100 })} />
            <FormField
              type="text"
              placeholder="E-mail"
              name="email"
              title="Email"
              errors={errors.email}
              register={register({ required: true, pattern: /^\S+@\S+$/i })} />
            <FormField
              type="text"
              placeholder="0x...."
              name="_id"
              title="Ethereum Address"
              errors={errors._id}
              register={register({ required: true })} value={account} disabled />
            <ButtonWrapper>
              <Button primary>Submit</Button>
            </ButtonWrapper>
          </form>
        </FormWrapper>
      </Wrapper>
    </CardWrapper>
  );
}
