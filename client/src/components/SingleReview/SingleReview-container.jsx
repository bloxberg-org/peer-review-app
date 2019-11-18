import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router';
import { getOneBlockchainReview, getOneDatabaseReview } from '../../utils/review';
import Loader from '../Loader';
import SingleReviewView from './SingleReview-view';

class SingleReviewContainer extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    user: { id: PropTypes.string.isRequired }
  }

  constructor(props) {
    super(props);
    this.state = {
      isReviewLoading: true,
      DBreview: [],
      blockchainReview: []
    };
  }

  componentDidMount() {
    this.fetchReview().then(reviewArr => {
      this.setState({ DBreview: reviewArr[0], blockchainReview: reviewArr[1], isReviewLoading: false });
    });
  }

  fetchReview() {
    let address = this.props.user._id;
    let index = this.props.match.params.index;

    return Promise.all([getOneDatabaseReview(address, index), getOneBlockchainReview(index)]);
  }

  render() {
    if (this.state.isReviewLoading)
      return <Loader />;

    return (
      <SingleReviewView {...this.state} {...this.props} />
    );
  }
}

export default withRouter(SingleReviewContainer);