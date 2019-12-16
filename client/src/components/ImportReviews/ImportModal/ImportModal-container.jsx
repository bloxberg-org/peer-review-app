import PropTypes from 'prop-types';
import React from 'react';
import { getReviewsOfAcademicFromPublons } from '../../../utils/review';
import Loader from '../../Loader';
import ImportModalView from './ImportModal-view';

export default class ImportModalContainer extends React.Component {

  static propTypes = {
    handleModalClose: PropTypes.func.isRequired,
    handleModalOpen: PropTypes.func.isRequired,
    appendToReviews: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      isFetching: false
    };
  }

  /**
   * Submit function to retrieve reviews from Publons API, given the researcher ID
   * Gets the academicId from the form as parameter. Sets page/cursor to 1 when fetchin from Publons API. Appends the retrieved reviews to parent state, which is empty.  
   * 
   * @param data - data object consisting of the form fields. Specifically the academic ID
   */
  handleSubmit = (data) => {
    this.setState({ isFetching: true });
    console.log(data);
    let academicId = data.academicId;
    let page = 1;
    getReviewsOfAcademicFromPublons(academicId, page).then((reviews) => {
      this.setState({ isFetching: false });
      this.props.appendToReviews(reviews.results);
      this.props.handleModalClose();
      console.log(reviews);
    });
  }

  render() {
    if (this.state.isFetching) {
      return (
        <Loader />
      );
    }

    return (
      <ImportModalView {...this.state} {...this.props}
        onSubmit={this.handleSubmit}
      />
    );
  }
}