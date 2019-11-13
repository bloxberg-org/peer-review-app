import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useForm from 'react-hook-form';
import styled, { css } from 'styled-components';
import Button from '../Button';
import CardWrapper from '../CardWrapper';
import Loader from '../Loader';

AddReviewView.propTypes = {
  review: PropTypes.object,
  onDateChange: PropTypes.func,
  onSubmit: PropTypes.func,
  isUploading: PropTypes.bool,
  isUserLoading: PropTypes.bool
};


// ================ Define Wrappers =================
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

// ============= Define base components =============

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

const Form = styled.form`
`;

const ErrorText = styled.span`
  color: red;
  font-size: 0.8em;
`;

const Input = styled.input`
  ${inputStyle}
  `;

const TextArea = styled.textarea.attrs((props) => ({
  rows: 10,
  placeholder: props.placeholder
}))`
  ${inputStyle}
`;

const InputTitle = styled.span`
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

// =============== Define compound components ===========
// The components make use of react-hook-form. Thus pass all props to the base components and make sure to bind register() prop to the ref field. This adds the field to form validation and adds the field to submitted object.

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

const DateInputField = styled((props) => {
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
    <DateInputField {...props} />
  </div>
))``;


const ContentField = styled((props) => (
  <div className={props.className}>
    <InputTitle> {props.title} </InputTitle>
    {props.errors && props.errors.type === 'required' && <ErrorText>This field is required</ErrorText>}
    <TextArea placeholder={props.placeholder} ref={props.register} {...props} />
  </div>
))`
  width: 100%;
  padding: 16px 0px;
`;


export default function AddReviewView(props) {

  const { register, handleSubmit, setValue, errors } = useForm();
  if (props.isUploading) {
    return (
      <Loader />
    );
  }
  register(
    { name: 'timestamp' },
    { required: true }
  ); // Register timestamp field manually. Can't reach ref field in Datepicker.
  setValue('timestamp', moment(props.review.timestamp).unix()); // Set initial value for useForm

  return (
    <Wrapper>
      <CardWrapper title='Add a Review'>
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
            <FormField
              name='articleDOI'
              title='Article DOI'
              placeholder='DOI'
              errors={errors.articleDOI}
              register={register({ required: true })} />
            <SelectField
              name='recommendation'
              title='Recommendation'
              placeholder='0, 1, or 2'
              errors={errors.recommendation}
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
            <ContentField
              name='content'
              title='Content'
              placeholder='Add the content of your review in this field'
              errors={errors.content}
              register={register({ required: true })} />
            <ButtonWrapper>
              <Button primary>Add Review</Button>
            </ButtonWrapper>
          </Form>
        </FormWrapper>
      </CardWrapper>
    </Wrapper>
  );
}