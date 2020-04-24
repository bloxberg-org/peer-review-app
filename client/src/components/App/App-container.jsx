import Fortmatic from 'fortmatic';
import React from 'react';
import Web3 from 'web3';
import { getCurrentAccount } from '../../connection/reviewConnection';
import getWeb3 from '../../connection/web3';
import { get } from '../../utils/endpoint';
import { getAllBlockchainReviews } from '../../utils/review';
import AppView from './App-view';

const customNodeOptions = {
  rpcUrl: 'https://core.bloxberg.org/', // your own node url
  chainId: 8995 // chainId of your own node
};

// const fmPhantom = new Fortmatic.Phantom('pk_live_F9432691E398BB8E', customNodeOptions); // Live.
const fmPhantom = new Fortmatic.Phantom('pk_test_11959EA492A48695', customNodeOptions);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isConnectedToBloxberg: false,
      isLoggedInWithFm: false,
      isLoggedInWithMetamask: false,
      isNoUserFound: false,
      reviewsOfUser: [],
      user: {},
    };
  }

  componentDidMount() {
    // Check if Metamask is there.
    if (typeof window.ethereum !== 'undefined') {
      getWeb3()
        .then(web3 => { // TODO: Redundant with ethereum.enable().
          return web3.eth.net.getId();
        })
        .then(id => {
          // Check which network is connected.
          let netwId = parseInt(id);
          this.checkConnectedNetwork(netwId);
        });
      // TODO: Metamask does not recommend calling enable upon loading.
      window.ethereum.enable()
        .then(accounts => {
          this.setState({ isLoggedInWithMetamask: true });
          console.log(`The account address is ${accounts[0]}`);
          return window.web3.toChecksumAddress(accounts[0]); // ethereum.enable returns lower case addresses. Adresses saved checksumed in DB.
        })
        .then(this.init)
        .catch(err => console.log(err));

      // Event listener for when the account is changed.
      // Fetch new user when address changes.
      window.ethereum.on('accountsChanged', () => {
        this.setState({ isLoading: true });
        this.getUserAddress()
          .then(this.init) // Fetch user.
          .catch(err => console.log(err));
      });
    }
    else { // Use fortmatic
      window.web3 = new Web3(fmPhantom.getProvider()); // Inject Fortmatic.

      let token = localStorage.getItem('didToken');
      console.log(`Token: ${token}`);
      if (token) {
        console.log('Logged in with Fortmatic!');
        this.getUserAddress().then(address => {
          console.log('User address is');
          console.log(address);
        });
        this.setState({ isLoggedInWithFm: true, isConnectedToBloxberg: true });
        fmPhantom.user.getMetadata().then(metadata => {
          let addr = metadata.publicAddress;
          this.init(addr);
        });
      } else {
        this.setState({ isLoading: false });
        // Login with fortmatic
      }
    }
  }

  /** 
   * Logs the user in using Fortmatic.
   */
  handleLoginWithMagicLink = async (data) => {
    const email = data.email;
    const user = await fmPhantom.loginWithMagicLink({ email });
    this.setState({ isLoggedInWithFm: true, isConnectedToBloxberg: true });
    let token = await user.getIdToken(86400); // 86400 sec = 24 hours lifespan.
    localStorage.setItem('didToken', token);
    let addr = (await user.getMetadata()).publicAddress;
    console.log(addr);
    this.init(addr);
  };

  /**
   * Logs user out from fortmatic
   */
  handleLogoutUser = () => {
    console.log('Logging out');
    fmPhantom.user.logout().then(() => {
      console.log('Logged out');
      localStorage.removeItem('didToken');
      this.setState({ isLoggedInWithFm: false });
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

  /**
   * Removes the review from the state. Called when reviews are successfully removed to the DB and Blockchain. 
   * @param id - Id of the review to be deleted.
   */
  deleteReviewFromState = (id) => {
    this.setState((state) => {
      let index = state.reviewsOfUser.findIndex((review) => review.id === id);
      state.reviewsOfUser.splice(index, 1);
      return state;
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
        this.setState({ isLoading: false, isNoUserFound: true });
        return Promise.reject('reject'); // Break the chain, avoid entering next then. (Is there a better practice?)
      })
      .then(reviewsOfUser => {
        this.setState({
          isLoading: false,
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

  // Checks if the network id is of bloxberg's. Sets the state var isConnectedToBloxberg accordingly.
  checkConnectedNetwork = (id) => {
    console.log('Checking network id: ' + id);
    (id === 8995 || id === 5777)
      ? this.setState({ isConnectedToBloxberg: true })
      : this.setState({ isConnectedToBloxberg: false });
  }

  render() {
    return (
      <AppView
        addReviewsToState={this.addReviewsToState}
        deleteReviewFromState={this.deleteReviewFromState}
        handleLoginWithMagicLink={this.handleLoginWithMagicLink}
        handleLogout={this.handleLogoutUser}
        {...this.state} />
    );
  }
}