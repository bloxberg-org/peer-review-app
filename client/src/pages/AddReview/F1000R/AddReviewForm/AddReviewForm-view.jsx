import Button from 'components/Button';
import FormField from 'components/FormField';
import ErrorText from 'components/FormField/ErrorText';
import Input from 'components/FormField/Input';
import inputStyle from 'components/FormField/Input/inputStyle';
import InputTitle from 'components/FormField/InputTitle';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useForm from 'react-hook-form';
import styled from 'styled-components';
// TODO: Reduntant code with ../../AddManually. Refactor.

AddReviewFormView.propTypes = {
  review: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleDateChange: PropTypes.func.isRequired,
};

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 16px;
  `;

//====================================================
// ============= Define base components =============
//====================================================

const TextArea = styled.textarea.attrs((props) => ({
  rows: 10,
  placeholder: props.placeholder
}))`
  ${inputStyle}
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

//=======================================================
// =============== Define compound components ===========
//=======================================================
// The components make use of react-hook-form. Thus we pass all props to the base components and make sure to bind register() prop to the ref field. This adds the field to form validation and adds the field to submitted object. The object is automatically generated according to name fields by react-hook-form. Object passed via onSubmit.

const SelectField = styled((props) => {
  return (
    <div className={props.className}>
      <InputTitle> {props.title} </InputTitle>
      <Select ref={props.register} {...props} readonly>
        {props.children}
      </Select>
    </div>
  );
})`
  padding: 16px 0px;
  border-bottom: 1px solid#DFE0EB;
`;

const DateInputField = styled((props) => {
  return (
    <DatePicker
      dateFormat='dd/MMM/yyy'
      showYearDropdown
      dropdownMode='select'
      customInput={<Input {...props} readonly />}
      {...props}
    />);
}
)``;

const DateField = styled((props) => (
  <div className={props.className}>
    <InputTitle> {props.title} </InputTitle>
    {props.errors && props.errors.type === 'required' && <ErrorText>This field is required</ErrorText>}
    <DateInputField {...props} readonly />
  </div>
))`
  padding: 16px 0px;
  border-bottom: 1px solid#DFE0EB;
`;


const ContentField = styled((props) => {
  let { className, ...otherProps } = props;
  return (
    <div className={className}>
      <InputTitle> {props.title} </InputTitle>
      {props.errors && props.errors.type === 'required' && <ErrorText>This field is required</ErrorText>}
      <TextArea placeholder={props.placeholder} ref={props.register} {...otherProps} readonly />
    </div>
  );
}
)`
  width: 100%;
  padding: 16px 0px;
`;

export default function AddReviewFormView(props) {
  const { register, handleSubmit, setValue, errors, reset } = useForm();

  // Fill the form with fetched review data once ../DOIInput fetches and saves into parent state.
  useEffect(() => {
    reset(props.review);
  }, [props.review, reset]);

  // Register timestamp field manually. Can't reach ref field in Datepicker.
  register(
    { name: 'timestamp' },
    { required: true }
  );
  // Set initial value for useForm
  setValue('timestamp', moment(props.review.timestamp).unix());

  return (
    <form onSubmit={handleSubmit(props.handleSubmit)}>
      <FormField
        name='articleTitle'
        title='Article Title'
        placeholder='Title of the reviewed article'
        errors={errors.articleTitle}
        register={register({ required: true })} />
      <FormField
        name='publisher'
        title='Name of the Publisher'
        placeholder='Publisher'
        errors={errors.publisher}
        register={register({ required: false })} />
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
        placeholder='Hash of the manuscript file'
        errors={errors.manuscriptHash}
        register={register({ required: true })} />
      <FormField
        name='reviewHash'
        title='Review Hash'
        placeholder='Hash of the review file'
        errors={errors.reviewHash}
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
      <FormField
        name='url'
        title='Url to the review'
        placeholder='URL'
        errors={errors.url}
        register={register({ required: false })} />
      <DateField
        name='timestamp'
        title='Manuscript Date'
        selected={props.review.timestamp}
        onChange={(date) => {
          props.handleDateChange(date);
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
    </form >
  );
}