import PropTypes from 'prop-types';
import React from 'react';
import { getReviewsOfAcademicFromPublons } from '../../../utils/review';
import ReviewsTableView from './ReviewsTable-view';

export default class ReviewsTableContainer extends React.Component {
  static propTypes = {
    reviewsMeta: PropTypes.object.isRequired,
    appendToReviews: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      discoveredPage: 1, // Page that is last fetched.
      isLoadingPage: false
    };
  }

  changePage = (page) => {
    if (page > this.state.discoveredPage) {
      this.setState({ isLoadingPage: true });
      let academicId = this.props.reviewsMeta.academicId;
      getReviewsOfAcademicFromPublons(academicId, page).then(reviewsObj => {
        console.log(`Page: ${page}`);
        console.log(reviewsObj);
        this.setState({ isLoadingPage: false });
        this.props.appendToReviews(reviewsObj.results);
      });
    }

    this.setState({ page: page });
  }

  render() {

    return (
      <ReviewsTableView {...this.props} {...this.state}
        changePage={this.changePage}
      />
    );
  }
}