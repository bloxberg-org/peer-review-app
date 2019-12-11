import React from 'react';
import { getReviewsOfAcademicFromPublons } from '../../../utils/review';
import Loader from '../../Loader';
import ImportModalView from './ImportModal-view';

export default class ImportModalContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false
    };
  }

  handleSubmit = (data) => {
    this.setState({ isFetching: true });
    console.log(data);
    let academicId = data.academicId;
    let page = 1;
    getReviewsOfAcademicFromPublons(academicId, page).then((reviews) => {
      this.setState({ isFetching: false });
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