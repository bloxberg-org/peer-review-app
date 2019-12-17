import PropTypes from 'prop-types';
import React from 'react';
import { getReviewsOfAcademicFromPublons } from '../../../utils/review';
import ReviewsTableView from './ReviewsTable-view';

export default class ReviewsTableContainer extends React.Component {
  static propTypes = {
    reviewsMeta: PropTypes.object.isRequired,
    appendToReviews: PropTypes.func.isRequired,
    reviews: PropTypes.array.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      discoveredPage: 1, // Page that is last fetched.
      isLoadingPage: false,
      reviewsToShow: [],
      startIndex: 0 // Index of the first review shown in table.
    };
  }

  componentDidMount() {
    this.setState((state) => {
      let tmp10review = this.show10Reviews(state.page);
      return {
        reviewsToShow: tmp10review
      };
    });
  }

  changePage = (page) => {
    // If page is opened for first time, fetch the reviews.
    if (page > this.state.discoveredPage) {
      this.setState({ isLoadingPage: true, discoveredPage: page });
      let academicId = this.props.reviewsMeta.academicId;
      getReviewsOfAcademicFromPublons(academicId, page).then(reviewsObj => {
        console.log(`Page: ${page}`);
        console.log(reviewsObj);
        this.setState({ isLoadingPage: false });
        this.props.appendToReviews(reviewsObj.results);
        this.setState({ page: page, reviewsToShow: this.show10Reviews(page) });
      });
    } else {
      this.setState({ page: page, reviewsToShow: this.show10Reviews(page) });
    }
  }

  show10Reviews = (page) => {
    let totReviews = this.props.reviewsMeta.totalReviewCount;
    // Show 10 reviews from the complete reviews array.
    // Index of the first item to show.
    let startIndex = (page - 1) * 10;
    // Index of the last item to show, +1 for slice().
    // Check if index out of bounds. If yes set totalCount to final index.
    let endIndex = (page) * 10 < totReviews ? (page) * 10 : totReviews;
    // Return the 10 reviews to show.
    this.setState({ startIndex });
    return this.props.reviews.slice(startIndex, endIndex);
  }

  render() {
    console.log(this.props.reviews);
    return (
      <ReviewsTableView {...this.props} {...this.state}
        changePage={this.changePage}
      />
    );
  }
}