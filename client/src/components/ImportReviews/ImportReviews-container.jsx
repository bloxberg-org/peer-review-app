import React from 'react';
import ImportReviewsView from './ImportReviews-view';

export default class ImportReviewsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      fetchedReviews: [],
      fetchedReviewsMeta: {
        // totalReviewCount
        // totalPages (for 10 items per)
        // academicId
      }
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
   * Marks the clicked review on the table checked by flipping the checked value under the review object. Creates the checked field if does not exist.
   * 
   * @param index - index of the review in the array.
   */
  toggleCheckReview = (index) => {
    console.log(`Checking index ${index}`);
    this.setState((state) => {
      let tempReviews = state.fetchedReviews;
      if (tempReviews[index].checked === undefined)
        tempReviews[index].checked = true;
      else {
        tempReviews[index].checked = !tempReviews[index].checked;
      }
      return { fetchedReviews: tempReviews };
    });
  }

  /**
   * Takes an array of reviews that are fetched from Publons API 
   * Pushes them to the reviews in the state
   * @param reviews - Review array from Publons
   */
  appendToReviews = (reviewsToAdd) => {
    let checkedReviews = reviewsToAdd.map(review => {
      review.checked = false;
      return review;
    }); // Add checked field to avoid the checkbox input in TableRow to be initally uncontrolled.
    this.setState((state) => {
      return { fetchedReviews: state.fetchedReviews.concat(checkedReviews) };
    });
  }

  setFetchedReviewsMeta = (reviewsMeta) => {
    this.setState({ fetchedReviewsMeta: reviewsMeta });
  }

  render() {
    return (
      <ImportReviewsView {...this.state} {...this.props}
        handleModalOpen={this.handleModalOpen}
        handleModalClose={this.handleModalClose}
        appendToReviews={this.appendToReviews}
        toggleCheckReview={this.toggleCheckReview}
        setFetchedReviewsMeta={this.setFetchedReviewsMeta}
      />
    );
  }
}