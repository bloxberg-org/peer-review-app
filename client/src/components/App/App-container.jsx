import React from 'react';
import { getAllReviews } from '../../utils/review';
import AppView from './App-view';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Hold the user information here.
      // TODO: This shall be retrieved from DB using the Web3 account address.
      user: {
        firstName: 'Max',
        lastName: 'Planck',
        email: 'planck@mpg.de',
        // TODO: addresses
        // TODO: profilePic 
      },
      isLoading: true
    };
  }

  componentDidMount() {
    this.fetchReviews().then((reviews) => {
      this.setState({ isLoading: false, reviews: reviews });
    }).catch(err => console.log(err));
  }
  fetchReviews = () => {
    // return new Promise((resolve) => {
    //   setTimeout(resolve, 3000);
    // }
    // );
    return getAllReviews();
  }
  render() {
    return (
      <AppView {...this.state} />
    );
  }
}