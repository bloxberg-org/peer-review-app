import React from 'react';
import ImportReviewsView from './ImportReviews-view';

export default class ImportReviewsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      reviews: []
    };
  }

  // Opens the ImportModal
  handleModalOpen = () => {
    this.setState({ isModalOpen: true });
  }

  // Closes the ImportModal
  handleModalClose = () => {
    this.setState({ isModalOpen: false });
  }

  /**
   * Takes an array of reviews that are fetched from Publons API 
   * Pushes them to the reviews in the state
   * @param reviews - Review array from Publons
   */
  appendToReviews = (reviewsToAdd) => {
    this.setState((state) => {
      return { reviews: state.reviews.concat(reviewsToAdd) };
    });
  }

  render() {
    return (
      <ImportReviewsView {...this.state} {...this.props}
        handleModalOpen={this.handleModalOpen}
        handleModalClose={this.handleModalClose}
        appendToReviews={this.appendToReviews}
      />
    );
  }
}