import React from 'react';
import VouchReviewView from './VouchReview-view';

export default class VouchReviewContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <VouchReviewView {...this.state} {...this.props} />
    );
  }
}