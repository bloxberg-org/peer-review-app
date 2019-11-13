import PropTypes from 'prop-types';
import React from 'react';
import { getAllDatabaseReviews } from '../../utils/review';
import AllReviewsView from './AllReviews-view';

export default class AllReviewsContainer extends React.Component {
  static propTypes = {
    user: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.fetchAllReviews().then(reviews => {
      console.log('Reviews are here!');
      console.log(reviews);
    });
  }

  fetchAllReviews = () => {
    let address = this.props.user._id;
    return getAllDatabaseReviews(address);
  }

  render() {
    return (
      <AllReviewsView {...this.props} />
    );
  }
}