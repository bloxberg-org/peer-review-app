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
   * Toggles the clicked review in the table by flipping the checked value under the review object. Creates the checked field if does not exist.
   * 
   * @param {number} index - index of the review in the array.
   */
  toggleCheckReview = (index) => {
    console.log(`Checking index ${index}`);
    if (this.state.fetchedReviews[index].checked === undefined)
      this.selectReview(index, true);
    else {
      let value = !this.state.fetchedReviews[index].checked;
      this.selectReview(index, value); // toggle
    }
  }

  /**
   * Marks the review checked or unchecked according to @param value.
   * @param {number} index - index of the review in fetchedReviews.
   * @param {boolean} value - value of isSelected.
   */
  selectReview = (index, value) => {
    this.setState((prevState) => {
      let tempReviews = prevState.fetchedReviews;
      tempReviews[index].checked = value;
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
        selectReview={this.selectReview}
        setFetchedReviewsMeta={this.setFetchedReviewsMeta}
      />
    );
  }
}