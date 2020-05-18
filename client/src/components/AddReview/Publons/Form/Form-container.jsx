import PropTypes from 'prop-types';
import React from 'react';
import { getReviewsOfAcademicFromPublons } from '../../../../utils/review';
import Loader from '../../../Loader';
import FormView from './Form-view';

export default class FormContainer extends React.Component {

  static propTypes = {
    handleModalClose: PropTypes.func.isRequired,
    handleModalOpen: PropTypes.func.isRequired,
    appendToReviews: PropTypes.func.isRequired,
    setFetchedReviewsMeta: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
      error: null
    };
  }

  /**
   * Submit function to retrieve reviews from Publons API, given the researcher ID
   * Gets the academicId from the form as parameter. Sets page/cursor to 1 when fetchin from Publons API. Appends the retrieved reviews to parent state, which is empty.  
   * 
   * @param {object} data - data object consisting of the form fields. Specifically the academic ID
   */
  handleSubmit = (data) => {
    this.setState({ isFetching: true });
    console.log(data);
    let page = 1; // Modal fetches page 1.
    getReviewsOfAcademicFromPublons(data.academicId, page)
      .then((reviews) => {
        this.setState({ isFetching: false });
        console.log(reviews);
        if (reviews.detail) {
          this.setState({ error: reviews.detail });
          throw new Error(reviews.detail);
        }
        let reviewsMeta = {
          totalReviewCount: reviews.count,
          totalPages: reviews.count % 10 === 0 ? reviews.count / 10 : Math.floor(reviews.count / 10 + 1),
          academicId: data.academicId
        };
        this.props.setFetchedReviewsMeta(reviewsMeta);
        this.props.appendToReviews(reviews.results);
        this.props.handleModalClose();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    if (this.state.isFetching) {
      return (
        <Loader />
      );
    }

    return (
      <FormView {...this.state} {...this.props}
        onSubmit={this.handleSubmit} error={this.state.error}
      />
    );
  }
}