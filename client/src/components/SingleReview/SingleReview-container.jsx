import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router';
import { getAllAuthorNames } from '../../utils/authors';
import { deleteReview, getOneBlockchainReview, getOneDatabaseReview, vouchReview } from '../../utils/review';
import Loader from '../Loader';
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
    this.fetchReview()
      .then(reviewArr => {
        this.setState({ DBreview: reviewArr[0] });
        return this.fetchAllAuthorsAndReplaceAuthorField(reviewArr[1]);
      })
      .then(blockChainReviewWithName => {
        this.setState({ blockchainReview: blockChainReviewWithName, isLoading: false });
      })
      .catch(console.error);
  }

  /**
   * Function to replace author address with author name and surname in the current review.
   * 
   * @param {Object} - blockchainReview the review object from blockchain
   * @returns {Object} - modified review with author names instead of address.
   */
  fetchAllAuthorsAndReplaceAuthorField = (blockchainReview) => {
    return getAllAuthorNames()
      .then(authorsMap => {
        let addr = blockchainReview.author;
        blockchainReview.author = authorsMap[addr].firstName + ' ' + authorsMap[addr].lastName;
        return blockchainReview;
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
    if (this.state.isLoading)
      return <Loader />;
    return (
      <SingleReviewView
        DBreview={this.state.DBreview}
        blockchainReview={this.state.blockchainReview}
        deleteReview={this.deleteReview}
        vouchReview={this.vouchReview}
      />
    );
  }
}

export default withRouter(SingleReviewContainer);