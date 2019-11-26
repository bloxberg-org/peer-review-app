import PropTypes from 'prop-types';
import React from 'react';
import { getReviewOfArticle, getReviewsOfArticle } from '../../../utils/review';
import Loader from '../../Loader';
import ImportModalView from './ImportModal-view';

export default class ImportModalContainer extends React.Component {
  static propTypes = {
    source: PropTypes.oneOf(['f1000research']),
    fillForm: PropTypes.func.isRequired
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
    let source = this.props.source;
    console.log(data);

    this.setState({ isFetching: true });

    getReviewsOfArticle(source, data.doi).then((rawReviews) => {
      let reviews = JSON.parse(rawReviews);
      this.setState({ doi: data.doi, reviews: reviews, isFetching: false, isDoneFetching: true });
    });
  }

  handleChooseReview = (index) => {
    let source = this.props.source;
    let doi = this.state.doi;

    this.setState({ isFetching: true });

    getReviewOfArticle(source, doi, index).then(data => {
      this.props.fillForm(JSON.parse(data));
    });
  }

  render() {
    if (this.state.isFetching) {
      return (
        <Loader />
      );
    }

    return (
      <ImportModalView
        onSubmit={this.handleSubmit}
        onChooseReview={this.handleChooseReview}
        {...this.state} {...this.props} />
    );
  }
}