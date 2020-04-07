import React from 'react';
import ReviewsTableView from './ReviewsTable-view';

export default class ReviewsTableContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ReviewsTableView {...this.state} {...this.props} />
    );
  }
}