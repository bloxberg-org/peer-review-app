import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router';
import { getAllAuthorNames } from '../../utils/authors';
import { deleteReview, getOneBlockchainReview, getOneDatabaseReview, vouchReview } from '../../utils/review';
import Context from '../Context';
import Loader from '../Loader';
import SingleReviewView from './SingleReview-view';

class SingleReviewContainer extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    user: PropTypes.shape({ _id: PropTypes.string.isRequired }),
    deleteReviewFromState: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
  }

  static contextType = Context; // Access user Context

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      DBreview: {},
      blockchainReview: {},
      isVouchedByUser: false,
      isOwnReview: false, // Is the review owned by the current user?
    };
  }

  componentDidMount() {
    this.fetchAndLoadReview();
  }

  fetchAndLoadReview = () => {
    this.fetchReview()
      .then(reviewArr => {
        this.setState({
          isOwnReview: this.context.user._id === reviewArr[1].author, // Do this before fetchAllAuthorsAndReplaceAuthorField. Should be refactored. See function comments.
          DBreview: reviewArr[0],
          isVouchedByUser: this.checkIsVouchedByUser(this.context.user._id, reviewArr[1].vouchers)
        });
        return this.fetchAllAuthorsAndReplaceAuthorField(reviewArr[1]);
      })
      .then(blockChainReviewWithName => {
        this.setState({
          blockchainReview: blockChainReviewWithName,
          isLoading: false
        });
      })
      .catch(console.error);
  }

  /**
   * Function to replace author address with author name and surname in the current review.
   * TODO: It does not make sense to get all of the authors. There should be an endpoint where we query with an address and get the author firstName + lastName.
   * 
   * @param {Object} - blockchainReview the review object from blockchain
   * @returns {Object} - modified review with author names instead of address.
   */
  fetchAllAuthorsAndReplaceAuthorField = (blockchainReview) => {
    return getAllAuthorNames()
      .then(authorsMap => {
        let reviewAuthor = blockchainReview.author;
        if (authorsMap[reviewAuthor] !== undefined) {
          // Change author name in object
          blockchainReview.author = authorsMap[reviewAuthor].firstName + ' ' + authorsMap[reviewAuthor].lastName;
        }
        // Change voucher addresses to names
        for (const [i, voucher] of blockchainReview.vouchers.entries()) {
          if (authorsMap[voucher] !== undefined) {
            blockchainReview.vouchers[i] = authorsMap[voucher].firstName + ' ' + authorsMap[voucher].lastName;
          }
        }
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

  checkIsVouchedByUser = (address, array) => {
    return array.includes(address);
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
        isVouchedByUser={this.state.isVouchedByUser}
        isOwnReview={this.state.isOwnReview}
      />
    );
  }
}

export default withRouter(SingleReviewContainer);