import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router-dom';
import uniqid from 'uniqid';
import { addReview } from 'utils/review';
import AddManuallyView from './AddManually-view';

class AddManuallyContainer extends React.Component {
  static propTypes = {
    reviewsOfUser: PropTypes.array,
    history: PropTypes.object,
    refreshReviews: PropTypes.func.isRequired,
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
      isAddingReview: false,
    };
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
    this.setState({ isAddingReview: true });
    let review = {
      id: uniqid(),
      ...data
    };
    addReview(review)
      .then((response) => {
        console.log(response);
        this.setState({ isAddingReview: false });
        let id = response.chainData.id; // Get the index to show the review page.
        this.props.refreshReviews(); // Load the review to App state
        const { history } = this.props;
        // redirect to review page after adding
        history.push(`/Reviews/${id}`);
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <AddManuallyView review={this.state.review} onDateChange={this.handleDateChange} onSubmit={this.handleSubmit} isAddingReview={this.state.isAddingReview} {...this.state} {...this.props} />
    );
  }
}

export default withRouter(AddManuallyContainer); // needed to use history.push.