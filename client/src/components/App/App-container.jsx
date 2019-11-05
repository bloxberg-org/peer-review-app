import React from 'react';
import { getAllReviews } from '../../utils/review';
import AppView from './App-view';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: 'Max Planck',
      isLoading: true
    };
  }

  componentDidMount() {
    console.log(this.fetchReviews());
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