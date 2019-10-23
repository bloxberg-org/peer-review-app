import React from 'react';
import Review from './Reviews-view';

export default class ReviewsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      review: {
        'journalId': '',
        'manuscriptId': '',
        'manuscriptHash': '',
        'timestamp': new Date(),
        'recommendation': null
      }
    };
  }

  handleDateChange = (date) => {
    let tempReview = { ...this.state.review };
    tempReview.timestamp = date;
    this.setState({
      review: tempReview
    });
  }
  render() {
    return (
      <Review review={this.state.review} onDateChange={this.handleDateChange} />
    );
  }
}