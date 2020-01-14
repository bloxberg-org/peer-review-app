import React from 'react';
import { getCurrentAccount } from '../../connection/reviewConnection';
import { get } from '../../utils/endpoint';
import { getAllBlockchainReviews } from '../../utils/review';
import AppView from './App-view';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isUserLoading: true,
      isNoUserFound: false,
      reviewsOfUser: []
    };
  }

  componentDidMount() {

    // Event listener for when the account is changed
    window.ethereum.on('accountsChanged', () => {
      this.getUserAddress().then(address => this.getUser(address)).then((user) => {
        this.setState({ user: user });
      });
    });

    let promises = [];
    promises.push(getAllBlockchainReviews()); // Get all reviews from blockchain.
    promises.push(this.getUserAddress().then(address => this.getUser(address))); // Get account details.

    Promise.all(promises).then(([reviewsOfUser, user]) => {
      this.setState({
        isUserLoading: false,
        isNoUserFound: false,
        reviewsOfUser: reviewsOfUser,
        user: user
      });
    });
  }

  /**
   * Adds the review to the state. Called when reviews are successfully added to the DB and Blockchain. 
   * @param reviewsAdded - Array of the reviews added.
   */
  addReviewsToState = (reviewsAdded) => {
    this.setState((state) => {
      return state.reviewsOfUser.concat(reviewsAdded);
    });
  }

  getUser = (address) => {
    return get(`/accounts/${address}`);
  }

  getUserAddress = () => {
    return getCurrentAccount();
  }

  render() {
    return (
      <AppView addReviewsToState={this.addReviewsToState} {...this.state} />
    );
  }
}