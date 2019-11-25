import PropTypes from 'prop-types';
import React from 'react';
import useForm from 'react-hook-form';
import styled from 'styled-components';
import Button from '../../Button';
import FormField from '../FormField';

ImportModalView.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isDoneFetching: PropTypes.bool.isRequired,
  reviews: PropTypes.array,
  onChooseReview: PropTypes.func.isRequired
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 70%;
  justify-content: center;
  align-items: center;
`;

const ReviewBoxWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ReviewBox = styled((props) => {
  console.log('Review is:');
  console.log(props.review);
  return (
    <div className={props.className} onClick={props.onClick}>
      <span> Review from: </span>
      <span> {props.review.author.firstName} {props.review.author.lastName} </span>
      <a href={props.review.author.uri} target='_blank' rel='noopener noreferrer'>ORCiD</a>
      <span> Date: {props.review.date.day}/{props.review.date.month}/{props.review.date.year}</span>
    </div>
  );
})`
  flex: 0.5;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  min-width: 200px;
  border: 1px solid ${props => props.theme.gray};
  border-radius: 8px;
  text-align: center;
  margin: 32px;
  &:hover {
    color: ${ props => props.theme.primary};
    cursor: pointer;
    border: 1px solid ${props => props.theme.primary};  
  }
`;

export default function ImportModalView(props) {
  const { register, handleSubmit, errors } = useForm();

  // console.log(props.reviews)
  if (props.isDoneFetching) {
    return (
      <Wrapper>
        Which review do you want to import?
        <ReviewBoxWrapper>
          {
            // eslint-disable-next-line react/prop-types
            props.reviews.map((review, i) => {
              return <ReviewBox review={review} key={i} onClick={() => props.onChooseReview(i)} />;
            })}
        </ReviewBoxWrapper>
      </Wrapper>
    );
  }
  return (

    <Wrapper>
      <form onSubmit={handleSubmit(props.onSubmit)}>
        <FormField
          noBorder
          title='Enter DOI of the original article the peer review is done for'
          name='doi'
          placeholder='DOI of the article'
          errors={errors.doi}
          register={register({ required: true })}
        />
        <ButtonWrapper>
          <Button primary>Submit</Button>
        </ButtonWrapper>
      </form>
    </Wrapper>
  );
}