import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router';
import { deleteReview, getOneBlockchainReview, getOneDatabaseReview, vouchReview } from '../../utils/review';
import SingleReviewView from './SingleReview-view';

class SingleReviewContainer extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    user: PropTypes.shape({ _id: PropTypes.string.isRequired }),
    deleteReviewFromState: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      DBreview: {},
      blockchainReview: {}
    };
  }

  componentDidMount() {
    this.fetchAndLoadReview();
  }

  fetchAndLoadReview = () => {
    this.fetchReview().then(reviewArr => {
      this.setState({ DBreview: reviewArr[0], blockchainReview: reviewArr[1], isLoading: false });
    });
  }

  fetchReview = () => {
    let address = this.props.user._id;
    let id = this.props.match.params.id;

    return Promise.all([getOneDatabaseReview(address, id), getOneBlockchainReview(id)]);
  }

  vouchReview = () => {
    let id = this.state.blockchainReview.id;
    this.setState({ isLoading: true });
    vouchReview(id)
      .then(() => {
        return this.fetchAndLoadReview();
      })
      .then(() => this.setState({ isLoading: false }))
      .catch(console.error);
  }

  deleteReview = () => {
    let id = this.state.blockchainReview.id;
    this.setState({ isLoading: true });
    deleteReview(id)
      .then((response) => {
        console.log(response);
        this.props.deleteReviewFromState(id);
        this.setState({ isLoading: false });
        console.log(`Review ${id} deleted`);
        this.props.history.goBack();
      })
      .catch(console.error);
  }

  render() {
    return (
      <SingleReviewView
        isLoading={this.state.isLoading}
        DBreview={this.state.DBreview}
        blockchainReview={this.state.blockchainReview}
        deleteReview={this.deleteReview}
        vouchReview={this.vouchReview}
      />
    );
  }
}

export default withRouter(SingleReviewContainer);