import React from 'react';
import ReviewsTableView from './ReviewsTable-view';

export default class ReviewsTableContainer extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.reviews);
    return (
      <ReviewsTableView {...this.props}

      />
    );
  }
}