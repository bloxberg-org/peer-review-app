import React from 'react';
import { addReview } from '../../utils/review';
import AddReviewView from './AddReview-view';

export default class AddReviewContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      review: {
        'journalId': '',
        'manuscriptId': '',
        'manuscriptHash': '',
        'timestamp': new Date(),
        'recommendation': null
      },
      account: '0xb454b9e3fB8307AE28d2E0243c5e99A47236a2e0'
    };
  }

  handleDateChange = (date) => {
    let tempReview = { ...this.state.review };
    tempReview.timestamp = date;
    this.setState({
      review: tempReview
    });
  }

  handleSubmit = (data) => {
    console.log(data);
    addReview(data).then(res => console.log(res)).catch(err => console.log(err));
  }
  render() {
    return (
      <AddReviewView review={this.state.review} onDateChange={this.handleDateChange} onSubmit={this.handleSubmit} />
    );
  }
}