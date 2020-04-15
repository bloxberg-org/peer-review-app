import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router';
import { getOneBlockchainReview, getOneDatabaseReview, vouchReview } from '../../utils/review';
import Loader from '../Loader';
import SingleReviewView from './SingleReview-view';

class SingleReviewContainer extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    user: PropTypes.shape({ _id: PropTypes.string.isRequired })
  }

  constructor(props) {
    super(props);
    this.state = {
      isVouching: false,
      isReviewLoading: true,
      DBreview: {},
      blockchainReview: {}
    };
  }

  componentDidMount() {
    this.fetchAndLoadReview();
  }

  fetchAndLoadReview = () => {
    this.fetchReview().then(reviewArr => {
      this.setState({ DBreview: reviewArr[0], blockchainReview: reviewArr[1], isReviewLoading: false });
    });
  }

  fetchReview = () => {
    let address = this.props.user._id;
    let id = this.props.match.params.id;

    return Promise.all([getOneDatabaseReview(address, id), getOneBlockchainReview(id)]);
  }

  vouchReview = () => {
    let id = this.state.blockchainReview.id;
    this.setState({ isVouching: true });
    vouchReview(id)
      .then(() => {
        return this.fetchAndLoadReview();
      })
      .then(() => this.setState({ isVouching: false }))
      .catch(console.error);
  }

  render() {
    if (this.state.isReviewLoading)
      return <Loader />;

    return (
      <SingleReviewView {...this.state} {...this.props} vouchReview={this.vouchReview} />
    );
  }
}

export default withRouter(SingleReviewContainer);