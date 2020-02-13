import { getCurrentAccount } from  '../../connection/reviewConnection';
import React, { useState } from 'react';
import useForm from 'react-hook-form';
import FormField from '../FormField';
import Button from '../Button';
import styled from 'styled-components';
import { addScholar } from '../../utils/register';
import uniqid from 'uniqid';
import CardWrapper from '../CardWrapper';
import { useHistory } from 'react-router-dom';

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

  const onSubmit = data => {
    console.log(data);

    let scholar = {
      id: uniqid(),
      ...data
    };

    addScholar(scholar)
      .then((response) => {
        console.log(response);
        setAccount(scholar.id);
        history.push('/', scholar._id);
        window.location.reload();
      })
      .catch(err => console.log(err));

  };
  console.log(errors);

  getCurrentAccount().then((address) => {
    setAccount(address);
  });

  return (
    <CardWrapper title='Register account'>
      <Wrapper>
        <FormWrapper>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormField
              type="text"
              placeholder="First name"
              name="name"
              title="Name"
              errors={errors.name}
              register={register({required: true, maxLength: 80})} />
            <FormField
              type="text"
              placeholder="Last name"
              name="surname"
              title="Surname"
              errors={errors.title}
              register={register({required: true, maxLength: 100})} />
            <FormField
              type="text"
              placeholder="Email"
              name="email"
              title="Email"
              errors={errors.email}
              register={register({required: true, pattern: /^\S+@\S+$/i})} />
            <FormField
              type="text"
              placeholder="0x...."
              name="_id"
              title="Ethereum Address"
              errors={errors._id}
              register={register({required: true})} value={account} disabled />
            <ButtonWrapper>
              <Button primary>Register</Button>
            </ButtonWrapper>
          </form>
        </FormWrapper>
      </Wrapper>
    </CardWrapper>
  );
}
