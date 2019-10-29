import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useForm from 'react-hook-form';
import styled, { css } from 'styled-components';
import Button from '../Button';

AddReviewView.propTypes = {
  review: PropTypes.object,
  onDateChange: PropTypes.func,
  onSubmit: PropTypes.func
};

const Wrapper = styled.div`
  display: flex;
  flex: 1
  `;

const CardWrapper = styled.div`
  margin: 24px;
  background-color: white;
  border: 1px solid ${props => props.theme.border};
  border-radius: 5px;
  width: 100%;
  flex-direction: column;
  `;

const TitleWrapper = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  `;

const Title = styled.span`
  font-size: 1.5em;
  font-weight: bold;
  margin: 32px;
  flex:1;
  `;

const FormWrapper = styled.div`
  flex: 1;
  margin: 0px 32px;
  `;

const Form = styled.form`
`;

// Input and textarea styles are shared
const inputStyle = css`
  outline: none;
  border: 1px solid ${props => props.theme.border};
  border-radius: 5px;
  color: ${props => props.theme.gray};
  font-family: 'Muli', sans-serif;
  width: 100%;
  padding: 8px 0px;
  margin-top: 8px;
  &::placeholder {
    padding-left: 8px;
  }
`;
const Input = styled.input`
  ${inputStyle}
  `;

const InputTitle = styled.div`
  font-weight: bold;
  font-size: 1.1em;
  `;

const Select = styled.select`
  ${inputStyle};
  width: 50%;
  background: #fff;
  color: #000;
  option {
    color: #000;
    background: #fff;
    display: flex;
    min-height: 20px;
    padding: 0px 2px 1px;
  }
  `;

const SelectField = styled((props) => {
  return (
    <div className={props.className}>
      <InputTitle> {props.title} </InputTitle>
      <Select ref={props.register} {...props}>
        {props.children}
      </Select>
    </div>
  );
})``;

const FormField = styled((props) => {
  return (
    // Use ref from react-hook-form
    <div className={props.className}>
      <InputTitle> {props.title} </InputTitle>
      {props.errors && props.errors.type === 'required' && <ErrorText>This field is required</ErrorText>}
      <Input ref={props.register} {...props} />
    </div>
  );
})`
  width: 100%;
  padding: 16px 0px;
  border-bottom: 1px solid ${props => props.theme.border}
`;

const DateInput = styled((props) => {
  return (
    <DatePicker
      customInput={<Input {...props} />}
      {...props}
    />);
}
)``;

const DateField = styled((props) => (
  <div className={props.className}>
    <InputTitle> {props.title} </InputTitle>
    {props.errors && props.errors.type === 'required' && <ErrorText>This field is required</ErrorText>}
    <DateInput {...props} />
  </div>
))``;

const ErrorText = styled.span`
  color: red;
  font-size: 0.8em;
`;
// const TextArea = styled.textarea.attrs((props) => ({
//   rows: 10,
//   placeholder: props.placeholder
// }))`
//   ${inputStyle}
// `;

// const ContentField = styled((props) => (
//   <div className={props.className}>
//     <InputTitle> {props.title} </InputTitle>
//     <TextArea placeholder={props.placeholder} />
//   </div>
// ))`
//   width: 100%;
//   padding: 16px 0px;
// `;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 16px;
  `;

export default function AddReviewView(props) {
  const { register, handleSubmit, setValue, errors } = useForm();

  register(
    { name: 'timestamp' },
    { required: true }
  ); // Register timestamp field manually. Can't reach ref field in Datepicker.
  setValue('timestamp', moment(props.review.timestamp).unix()); // Set initial value for useForm

  return (
    <Wrapper>
      <CardWrapper>
        <TitleWrapper>
          <Title>Add a Review</Title>
        </TitleWrapper>
        <FormWrapper>
          <Form onSubmit={handleSubmit(props.onSubmit)}>
            <FormField
              name='journalId'
              title='Journal Identifier'
              placeholder='Typically the ISSN'
              errors={errors.journalId}
              register={register({ required: true })} />
            <FormField
              name='manuscriptId'
              title='Manuscript Identifier'
              placeholder='Internal identifier of the journal'
              errors={errors.manuscriptId}
              register={register({ required: true })} />
            <FormField
              name='manuscriptHash'
              title='Manuscript Hash'
              placeholder='Hash of the review file'
              errors={errors.manuscriptHash}
              register={register({ required: true })} />
            <SelectField
              name='recommendation'
              title='Recommendation'
              placeholder='0, 1, or 2'
              errors={errors.manuscriptHash}
              register={register({ required: true })}>
              <option value="0">Accept</option>
              <option value="1">Review</option>
              <option value="2">Reject</option>
            </SelectField>
            <DateField
              name='timestamp'
              title='Manuscript Date'
              selected={props.review.timestamp}
              onChange={(date) => {
                props.onDateChange(date);
                let unixDate = moment(date).unix();
                setValue('timestamp', unixDate);
              }
              }
              errors={errors.timestamp} />
            {/* <ContentField title='Content' placeholder='Add the content of your review in this field' /> */}
            <ButtonWrapper>
              <Button primary>Add Review</Button>
            </ButtonWrapper>
          </Form>
        </FormWrapper>
      </CardWrapper>
    </Wrapper>
  );
}