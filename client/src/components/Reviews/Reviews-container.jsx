import React from 'react';
import Review from './Reviews-view';

const URL = 'http://localhost:3000';

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
      },
      account: '0xb454b9e3fB8307AE28d2E0243c5e99A47236a2e0'
    };
  }
  sendPostRequestToEndpoint = (URL, endpoint, body) => {
    console.log(body);
    return fetch(URL + endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
  }

  addReview = (data) => {
    let account = this.state.account;
    return (this.sendPostRequestToEndpoint(URL, `/users/${account}/reviews`, data));
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
    this.addReview(data).then(res => console.log(res)).catch(err => console.log(err));
  }
  render() {
    return (
      <Review review={this.state.review} onDateChange={this.handleDateChange} onSubmit={this.handleSubmit} />
    );
  }
}