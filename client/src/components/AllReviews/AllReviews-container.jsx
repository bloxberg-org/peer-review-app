import React from 'react';
import AllReviewsView from './AllReviews-view';

export default class AllReviewsContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <AllReviewsView {...this.props} />
    );
  }
}