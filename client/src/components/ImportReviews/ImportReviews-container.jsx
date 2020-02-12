import moment from 'moment';
import React from 'react';
import uniqid from 'uniqid';
import { addMultipleReviewsFromPublons } from '../../utils/review';
import ImportReviewsView from './ImportReviews-view';

export default class ImportReviewsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      isUploading: false,
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
      let checked = this.state.fetchedReviews[index].checked;
      this.selectReview(index, !checked); // toggle
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
   * Sets the checked field of all reviews in state.fetchedReviews false.
   */
  clearSelected = () => {
    this.setState((prevState) => {
      let clearedReviews = prevState.fetchedReviews.map((review) => {
        review.checked = false;
        return review;
      });
      return { fetchedReviews: clearedReviews };
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

  /**
   * Saves the reviews to blockchain.
   * Takes the array of reviews selected and formats them in the standard format.
   * Calls addMultipleReviews to save the formatted reviews.
   * 
   * @param {array} reviews - The array of reviews to be saved.
   */
  saveSelectedReviews = () => {
    this.setState({ isUploading: true });
    let selectedReviews = this.state.fetchedReviews.filter(review => review.checked); // Reviews that are marked selected. 
    let formattedReviews = this.formatPublonsReviews(selectedReviews);
    addMultipleReviewsFromPublons(formattedReviews).then(() => {
      this.setState({ isUploading: false });
      this.clearSelected();
      window.location.reload();
    });
  }

  /**
   * Function to convert fetched data from Publons API to the according Review format in the smart contract.
   * 
   * @param {array} reviews - The array of reviews fetched and selected from Publons API.
   * @returns {array} Smart contract formatted array of reviews.
   */
  formatPublonsReviews = (reviews) => {
    return reviews.map((review) => {
      return {
        id: uniqid(),
        journalId: '',
        publisher: review.publisher ? review.publisher.name : '',
        manuscriptId: '',
        manuscriptHash: '',
        timestamp: moment(review.date_reviewed).unix(),
        recommendation: '',
        url: review.ids.academic.url,
        verified: review.verification.verified
      };
    });
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
        saveSelectedReviews={this.saveSelectedReviews}
      />
    );
  }
}