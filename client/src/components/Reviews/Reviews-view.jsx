import React from 'react';
import Datepicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled, { css } from 'styled-components';
import Button from '../Button';

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

const FormField = styled((props) => (
  <div className={props.className}>
    <InputTitle> {props.title} </InputTitle>
    <Input placeholder={props.placeholder} />
  </div>
))`
  width: 100%;
  padding: 16px 0px;
  border-bottom: 1px solid ${props => props.theme.border}
`;

const DateInput = styled(Datepicker)`
`;

const DateField = styled((props) => (
  <div className={props.className}>
    <InputTitle> {props.title} </InputTitle>
    <DateInput placeholder={props.placeholder} {...props} />
  </div>
))``;

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
export default function Reviews(props) {
  return (
    <Wrapper>
      <CardWrapper>
        <TitleWrapper>
          <Title>Add a Review</Title>
        </TitleWrapper>
        <FormWrapper>
          <Form>
            <FormField title='Journal Identifier' placeholder='Typically the ISSN' />
            <FormField title='Manuscript Identifier' placeholder='Internal identifier of the journal' />
            <FormField title='Manuscript Hash' placeholder='Hash of the review file' />
            <FormField title='Timestamp' placeholder='Timestamp in Unix time (Change to Datepicker)' />
            <DateField title='Manuscript Date' selected={props.review.timestamp} onChange={props.onDateChange} />
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