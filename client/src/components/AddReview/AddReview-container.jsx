import PropTypes from 'prop-types';
import React from 'react';
import { addReview } from '../../utils/review';
import AddReviewView from './AddReview-view';

export default class AddReviewContainer extends React.Component {
  static propTypes = {
    reviews: PropTypes.array
  }

  constructor(props) {
    super(props);
    this.state = {
      review: {
        'journalId': '',
        'manuscriptId': '',
        'manuscriptHash': '',
        'timestamp': new Date(),
        'recommendation': null
      },
      isUploading: false,
      isF1000ModalOpen: false
    };
  }

  handleF1000Open = () => {
    this.setState({ isF1000ModalOpen: true });
  }
  handleF1000Close = () => {
    this.setState({ isF1000ModalOpen: false });
  }

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
      index: this.props.reviews.length,
      ...data
    };
    addReview(review).then(res => {
      console.log(res);
      this.setState({ isLoading: false });
    }).catch(err => console.log(err));
  }
  render() {
    return (
      <AddReviewView review={this.state.review} handleF1000Open={this.handleF1000Open} handleF1000Close={this.handleF1000Close} onDateChange={this.handleDateChange} onSubmit={this.handleSubmit} isUploading={this.state.isUploading} {...this.state} {...this.props} />
    );
  }
}