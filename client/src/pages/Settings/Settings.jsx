import { faEdit } from '@fortawesome/free-solid-svg-icons';
import Button from 'components/Button';
// import styled from 'styled-components';
import FAIconButton from 'components/Button/FAIconButton';
import CardWrapper from 'components/CardWrapper';
import Context from 'components/Context';
import FormField from 'components/FormField';
import Loader from 'components/Loader';
import React, { useContext, useEffect, useState } from 'react';
import useForm from 'react-hook-form';
import styled from 'styled-components';
import { updateAuthor } from 'utils/authors';

const EditButton = styled(props => {
  return <FAIconButton
    className={props.className}
    icon={faEdit}
    tooltip='Edit'
    type="button"
    onClick={props.onClick}>
  </FAIconButton>;
})`
  margin: 0 8px;
  color: ${props => props.theme.sidebarBackground}
`;

export default function Settings() {
  const { user, refreshUser } = useContext(Context);
  const { register, handleSubmit, errors, reset } = useForm({
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      _id: user._id
    }
  });
  // Hold disabled states of three fields in an array
  // 0: firstName
  // 1: lastName
  // 2: email
  const [areDisabled, setAreDisabled] = useState(new Array(3).fill(true)); // 3 fields, all disabled by default.
  const [isLoading, setIsLoading] = useState(false);

  // Update fields if user changes after submit.
  useEffect(() => {
    console.log('NEW USER ', user);
    reset({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      _id: user._id
    });
  }, [user, reset]);

  const resetAreDisabled = () => {
    setAreDisabled(new Array(3).fill(true));
  };

  const toggleDisabled = (i) => {
    let temp = [...areDisabled]; // Shallow copy
    temp[i] = !temp[i];
    setAreDisabled(temp);
  };

  const submit = (data) => {
    setIsLoading(true);
    updateAuthor(data)
      .then(refreshUser)
      .then(() => {
        resetAreDisabled();
        setIsLoading(false);
      })
      .catch(err => console.error(err));
  };

  if (isLoading)
    return (<Loader />);

  return (
    <div style={{ height: '100%', display: 'flex' }}>
      <CardWrapper>
        <form onSubmit={handleSubmit(submit)}>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <FormField
              type="text"
              placeholder="First name"
              name="firstName"
              title="First Name"
              errors={errors.firstName}
              disabled={areDisabled[0]}
              register={register({ required: true, maxLength: 80 })}>
              <EditButton onClick={() => toggleDisabled(0)} />
            </FormField>
          </div>
          <FormField
            type="text"
            placeholder="Last Name"
            name="lastName"
            title="Last Name"
            errors={errors.lastName}
            disabled={areDisabled[1]}
            register={register({ required: true, maxLength: 100 })}>
            <EditButton onClick={() => toggleDisabled(1)} />
          </FormField>
          <FormField
            type="text"
            placeholder="E-mail"
            name="email"
            title="Email"
            errors={errors.email}
            disabled={areDisabled[2]}
            register={register({ required: true, pattern: /^\S+@\S+$/i })}>
            <EditButton onClick={() => toggleDisabled(2)} />
          </FormField>
          <FormField
            type="text"
            placeholder="0x...."
            name="_id"
            title="Ethereum Address"
            errors={errors._id}
            defaultValue={user._id}
            register={register({ required: true })} value={user.address} disabled />
          <div>
            <Button type='submit' primary >
              Submit
            </Button>
          </div>
        </form>
      </CardWrapper>
    </div>
  );
}