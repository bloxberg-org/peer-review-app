import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import ErrorText from './ErrorText';
import Input from './Input';
import InputTitle from './InputTitle';

const FormField = styled((props) => {
  let { className, children, ...otherProps } = props;
  console.log(otherProps.errors);
  return (
    // Use ref from react-hook-form
    <div className={className}>
      <InputTitle> {props.title} </InputTitle>
      {otherProps.errors
        ? otherProps.errors.type === 'required'
          ? <ErrorText>This field is required</ErrorText>
          : <ErrorText>Enter a valid input</ErrorText>
        : null}
      <div className='input-wrapper'>
        <Input ref={props.register} {...otherProps} />
        {children}
      </div>
    </div>
  );
})`
  width: 100%;
  padding: 16px 0px;
  border-bottom: ${ props =>
    !props.noBorder && '1px solid' + props.theme.border
  };
  & .input-wrapper {
    margin: 4px 0;
    display: flex;
    flex-direction: row;
  }
`;

FormField.propTypes = {
  noBorder: PropTypes.bool
};

export default FormField;