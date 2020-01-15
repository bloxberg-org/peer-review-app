import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router-dom';
import uniqid from 'uniqid';
import { addReview } from '../../utils/review';
import AddReviewView from './AddReview-view';

class AddReviewContainer extends React.Component {
  static propTypes = {
    reviewsOfUser: PropTypes.array,
    history: PropTypes.object,
    addReviewsToState: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      review: {
        'journalId': '',
        'manuscriptId': '',
        'manuscriptHash': '',
        'timestamp': new Date(),
        'recommendation': ''
      },
      isUploading: false,
      isF1000ModalOpen: false
    };
  }

  // Open F1000 import modal
  handleF1000Open = () => {
    this.setState({ isF1000ModalOpen: true });
  }

  // Close F1000 import modal
  handleF1000Close = () => {
    this.setState({ isF1000ModalOpen: false });
  }

  // Date change in the form
  handleDateChange = (date) => {
    let tempReview = { ...this.state.review };
    tempReview.timestamp = date;
    this.setState({
      review: tempReview
    });
  }

  handleSubmit = (data) => {
    console.log(data);
    this.setState({ isLoading: true });
    let review = {
      id: uniqid(),
      ...data
    };
    addReview(review)
      .then((response) => {
        console.log(response);
        this.setState({ isLoading: false });
        let id = response.chainData.id; // Get the index to show the review page.
        this.props.addReviewsToState([response.chainData]); // Add to App.js state explicitly as userReviews are only retrieved when refreshing.
        const { history } = this.props;
        // redirect to review page after adding
        history.push(`/Reviews/${id}`);
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <AddReviewView review={this.state.review} handleF1000Open={this.handleF1000Open} handleF1000Close={this.handleF1000Close} onDateChange={this.handleDateChange} onSubmit={this.handleSubmit} isUploading={this.state.isUploading} {...this.state} {...this.props} />
    );
  }
}

export default withRouter(AddReviewContainer);