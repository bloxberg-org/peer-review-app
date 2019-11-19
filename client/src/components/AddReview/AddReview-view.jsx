import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useForm from 'react-hook-form';
import Modal from 'react-modal';
import styled from 'styled-components';
import F1000Logo from '../../assets/F1000R_logo.png';
import Button from '../Button';
import CardWrapper from '../CardWrapper';
import Loader from '../Loader';
import FormField from './FormField';
import ErrorText from './FormField/ErrorText';
import Input from './FormField/Input';
import inputStyle from './FormField/inputStyle';
import InputTitle from './FormField/InputTitle';
import ImportModal from './ImportModal';

AddReviewView.propTypes = {
  review: PropTypes.object.isRequired,
  onDateChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isUploading: PropTypes.bool.isRequired,
  isUserLoading: PropTypes.bool.isRequired,
  isF1000ModalOpen: PropTypes.bool.isRequired,
  handleF1000Open: PropTypes.func.isRequired,
  handleF1000Close: PropTypes.func.isRequired
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

const ImportWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center
`;
// ============= Define base components =============

const Form = styled.form`
`;

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

const ImportButton = styled((props) => {
  return (
    <div className={props.className} onClick={props.onClick}>
      <img src={props.img} alt='Import via DOI' />
    </div>
  );
})`
  background-color: ${props => props.backgroundColor};
  padding: 16px;
  border-radius: 8px;
  margin: 0 16px;
  &:hover {
    cursor: pointer
  }
  & > img {
    max-width: 130px;
  }
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
    <Wrapper id='wrapper'>
      <Modal
        isOpen={props.isF1000ModalOpen}
        onRequestClose={props.handleF1000Close}
        parentSelector={() => document.querySelector('#wrapper')}
        ariaHideApp={false} // see http://reactcommunity.org/react-modal/accessibility/#app-element
        style={{
          overlay: {
            background: 'rgba(0,0,0,0.75)'
          },
          content: {
            top: '25%',
            bottom: '25%',
            right: '25%',
            left: '25%'
          }
        }}
      >
        <ImportModal />
      </Modal>
      <CardWrapper title='Add a Review'>
        <FormWrapper>
          <ImportWrapper>
            <InputTitle>Import From:</InputTitle>
            <ImportButton img={F1000Logo} backgroundColor='#f2673c' onClick={props.handleF1000Open} />
          </ImportWrapper>
          <Form onSubmit={handleSubmit(props.onSubmit)}>
            <FormField
              name='articleTitle'
              title='Article Title'
              placeholder='Title of the reviewed article'
              errors={errors.articleTitle}
              register={register({ required: true })} />
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