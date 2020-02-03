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
      isWeb3Available: false,
      reviewsOfUser: [],
      user: {}
    };
  }

  componentDidMount() {
    // Check if a web3 provider is injected (Metamask).
    if (typeof window.ethereum !== 'undefined') {
      this.setState({ isWeb3Available: true });

      // TODO: Metamask does not recommend calling enable upon loading.
      window.ethereum.enable()
        .then(accounts => {
          console.log(`The account address is ${accounts[0]}`);
          return window.web3.toChecksumAddress(accounts[0]); // ethereum.enable returns lower case addresses. Adresses saved checksumed in DB.
        })
        .then(this.init)
        .catch(err => console.log(err));

      // Event listener for when the account is changed.
      // Fetch new user when address changes.
      window.ethereum.on('accountsChanged', () => {
        this.setState({ isUserLoading: true });
        this.getUserAddress()
          .then(this.init) // Fetch user.
          .catch(err => console.log(err));
      });

    }
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

  /**
   * Function to initialize the user after web3 is injected and the accounts are unlocked.
   * Gets the user object using the address.
   * Then gets all reviews saved to blockchain of this user.
   */
  init = (address) => {
    this.getUserObj(address)
      // Get the user object from database.
      .then(user => {
        console.log('Found user:');
        console.log(user);
        this.setState({
          user: user
        });
        return getAllBlockchainReviews(); // Then fetch the reviews if the user.
      })
      .catch(error => { // No user found.
        console.log(error);
        this.setState({ isUserLoading: false, isNoUserFound: true });
        return Promise.reject('reject'); // Break the chain, avoid entering next then. (Is there a better practice?)
      })
      .then(reviewsOfUser => {
        this.setState({
          isUserLoading: false,
          isNoUserFound: false,
          reviewsOfUser: reviewsOfUser,
        });
      });
  }

  /**
   * Takes and address and returns a Promise resolving to the user object from the database.
   */
  getUserObj = (address) => {
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