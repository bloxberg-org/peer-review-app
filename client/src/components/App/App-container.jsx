import React from 'react';
import { getCurrentAccount } from '../../connection/reviewConnection';
import { get } from '../../utils/endpoint';
import { getAllBlockchainReviews } from '../../utils/review';
import AppView from './App-view';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isUserLoading: true
    };
  }

  componentDidMount() {
    let promises = [];
    promises.push(getAllBlockchainReviews()); // Get all reviews from blockchain.
    promises.push(this.getUserAddress().then(address => this.getUser(address))); // Get account details.

    Promise.all(promises).then(([reviews, account]) => {
      console.log(account);
      console.log(reviews);
      this.setState({
        isUserLoading: false,
        reviews: reviews,
        user: account
      });
    });
  }

  handleReviewAdded = (review) => {
    let reviews = this.state.reviews;
    reviews.push(review);
    this.setState({ reviews });
  }

  getUser = (address) => {
    return get(`/accounts/${address}`);
  }

  getUserAddress = () => {
    return getCurrentAccount();
  }

  render() {
    return (
      <AppView addReviewToState={this.handleReviewAdded} {...this.state} />
    );
  }
}