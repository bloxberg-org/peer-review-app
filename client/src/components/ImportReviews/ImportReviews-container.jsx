import React from 'react';
import ImportReviewsView from './ImportReviews-view';

export default class ImportReviewsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false
    }
  }

  handleModalOpen = () => {
    this.setState({ isModalOpen: true });
  }
  handleModalClose = () => {
    this.setState({ isModalOpen: false });
  }
  render() {
    return (
      <ImportReviewsView {...this.state} {...this.props}
        handleModalOpen={this.handleModalOpen}
        handleModalClose={this.handleModalClose}
      />
    );
  }
}