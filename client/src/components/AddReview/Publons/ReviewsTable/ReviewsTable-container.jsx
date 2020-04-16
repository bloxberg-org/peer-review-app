import PropTypes from 'prop-types';
import React from 'react';
import { getReviewsOfAcademicFromPublons } from '../../../../utils/review';
import ReviewsTableView from './ReviewsTable-view';

export default class ReviewsTableContainer extends React.Component {
  static propTypes = {
    reviewsMeta: PropTypes.object.isRequired,
    appendToReviews: PropTypes.func.isRequired,
    reviews: PropTypes.array.isRequired,
    selectReview: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      discoveredPage: 1, // Page that is last fetched.
      isLoadingPage: false,
      reviewsToShow: [],
      startIndex: 0, // Index of the first review shown in table.
      endIndex: 0, // Last review index + 1. 
      isCheckedAllOfPage: [undefined, false] // Holds the value of the checkbox of each page. Select all checkbox of first page 1 not checked. Page 0 does not exist thus undef.
    };
  }

  componentDidMount() {
    // Show 10 initial reviews.
    this.setState((state) => {
      return {
        reviewsToShow: this.show10Reviews(state.page)
      };
    });
  }

  /**
   * Handler for the 'Select All' checkbox on top of every page.
   * 
   * @param {number} - page number the checkbox belongs to
   */
  handleToggleSelectAllOfPage = (page) => {
    // Both set at show10Reviews.
    let start = this.state.startIndex;
    let end = this.state.endIndex;
    // Check all if unchecked. Vice versa.
    if (this.state.isCheckedAllOfPage[page] === false) {
      for (let i = start; i < end; i++) {
        this.props.selectReview(i, true);
      }
    } else { // Uncheck all reviews of page.
      for (let i = start; i < end; i++) {
        this.props.selectReview(i, false);
      }
    }

    // Finally toggle the value.
    this.setState((prevState) => {
      prevState.isCheckedAllOfPage[page] = !prevState.isCheckedAllOfPage[page];
      return {
        isCheckedAllOfPage: prevState.isCheckedAllOfPage
      };
    });
  }

  /**
   * Function called when prev or next page is opened. 
   * If the page is already fetched, shows the page.
   * Else first fetches the page from Publons, then renders it.
   * 
   * @param {number} page - page number opened.
   */
  changePage = (page) => {
    // If page is opened for first time, fetch the reviews.
    if (page > this.state.discoveredPage) {
      // Mark select all checkbox false.
      // Show loader
      // Set discovered Page
      this.setState((prevState) => {
        prevState.isCheckedAllOfPage[page] = false;
        return {
          isLoadingPage: true,
          discoveredPage: page,
          isCheckedAllOfPage: prevState.isCheckedAllOfPage
        };
      });
      let academicId = this.props.reviewsMeta.academicId;
      // Fetch Reviews.
      getReviewsOfAcademicFromPublons(academicId, page).then(reviewsObj => {
        console.log(`Page: ${page}`);
        console.log(reviewsObj);
        this.setState({ isLoadingPage: false });
        this.props.appendToReviews(reviewsObj.results); // Append fetched reviews at parent.
        // Show the new page and new reviews.
        this.setState({ page: page, reviewsToShow: this.show10Reviews(page) });
      });
    } else {
      // Don't fetch just show page and reviews.
      this.setState({ page: page, reviewsToShow: this.show10Reviews(page) });
    }
  }

  /**
   * Function to retrieve reviews to be shown on each page.
   * 
   * @param {number} page - Page number.
   * @returns {Array} array of 10 reviews.
   */
  show10Reviews = (page) => {
    console.log('Extracting 10 reviews to be shown.');
    let totReviews = this.props.reviewsMeta.totalReviewCount;
    // Show 10 reviews from the complete reviews array.
    // Index of the first item to show.
    let startIndex = (page - 1) * 10;
    // Index of the last item to show, +1 for slice().
    // Check if index out of bounds. If yes set totalCount to final index.
    let endIndex = page * 10 < totReviews ? page * 10 : totReviews;
    // Return the 10 reviews to show.
    this.setState({ startIndex, endIndex });
    return this.props.reviews.slice(startIndex, endIndex);
  }

  render() {
    return (
      <ReviewsTableView {...this.props} {...this.state}
        changePage={this.changePage}
        handleToggleSelectAllOfPage={this.handleToggleSelectAllOfPage}
      />
    );
  }
}