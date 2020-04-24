import PropTypes from 'prop-types';
import React from 'react';
import { getReviewOfArticleFromF1000R, getReviewsOfArticleFromF1000R } from '../../../../utils/review';
import Loader from '../../../Loader';
import DOIInputView from './DOIInput-view';

export default class DOIInputContainer extends React.Component {
  static propTypes = {
    handleReview: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
      isDoneFetching: false,
      doi: 'default',
      reviews: [],
    };
  }

  handleSubmit = (data) => {
    console.log(data);
    this.setState({ isFetching: true });
    getReviewsOfArticleFromF1000R(data.doi).then((rawReviews) => {
      let reviews = JSON.parse(rawReviews);
      this.setState({ doi: data.doi, reviews: reviews, isFetching: false, isDoneFetching: true });
    });
  }

  handleChooseReview = (index) => {
    let doi = this.state.doi;
    this.setState({ isFetching: true });
    getReviewOfArticleFromF1000R(doi, index).then(data => {
      this.props.handleReview(JSON.parse(data));
    });
  }

  render() {
    if (this.state.isFetching) {
      return (
        <Loader />
      );
    }

    return (
      <DOIInputView
        handleSubmit={this.handleSubmit}
        onChooseReview={this.handleChooseReview}
        {...this.state} {...this.props} />
    );
  }
}