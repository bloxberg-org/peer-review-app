import Button from 'components/Button';
import CardWrapper from 'components/CardWrapper';
import Context from 'components/Context';
import FormField from 'components/FormField';
import { getCurrentAccount } from 'connection/reviewConnection';
import React, { useContext, useState } from 'react';
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
  const { fortmaticMetadata } = useContext(Context);
  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      email: fortmaticMetadata ? fortmaticMetadata.email : null
    }
  });
  let history = useHistory();
  console.log(fortmaticMetadata);
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

  const signInToOrcid = () => {
    const CLIENT_ID = process.env.REACT_APP_ORCID_CLIENT_ID;
    const redirect_uri = window.location.origin;
    const scope = '/authenticate';
    const url = `https://sandbox.orcid.org/oauth/authorize?client_id=${CLIENT_ID}&response_type=code&scope=${scope}&redirect_uri=${redirect_uri}`;
    alert(url);
    window.open(url);
  };

  return (
    <CardWrapper title='Register'>
      <Wrapper>
        <Button onClick={signInToOrcid}>
          Orcid
        </Button>
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
              disabled={fortmaticMetadata}
              register={register({ required: true, pattern: /^\S+@\S+$/i })} />
            <FormField
              type="text"
              placeholder="0x...."
              name="_id"
              title="Ethereum Address"
              errors={errors._id}
              register={register({ required: true })} value={account}
              disabled />
            <ButtonWrapper>
              <Button primary>Submit</Button>
            </ButtonWrapper>
          </form>
        </FormWrapper>
      </Wrapper>
    </CardWrapper>
  );
}
