import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router-dom';
import uniqid from 'uniqid';
import { addReview } from '../../../utils/review';
import F1000RView from './F1000R-view';

// TODO: Redundant code with ../AddManually. Refactor.

class F1000RContainer extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    addReviewsToState: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      review: null,
      isAddingReview: false,
    };
  }

  handleReview = (data) => {
    let { timestamp, ...tempReview } = data;
    console.log(tempReview);
    this.setState({ review: tempReview }); // Everything except wrong Date format.
    this.handleDateChange(data.timestamp); // Change the date explicitly. Must send a Date object.
  }

  // Date change in the form
  handleDateChange = (date) => {
    let tempReview = { ...this.state.review };
    tempReview.timestamp = new Date(date);
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
        this.props.addReviewsToState([response.chainData]); // Add to App.js state explicitly as userReviews are only retrieved when refreshing.
        const { history } = this.props;
        // redirect to review page after adding
        history.push(`/Reviews/${id}`);
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <F1000RView
        review={this.state.review}
        handleReview={this.handleReview}
        handleDateChange={this.handleDateChange}
        handleSubmit={this.handleSubmit}
        isAddingReview={this.state.isAddingReview} />
    );
  }
}

export default withRouter(F1000RContainer); // needed to use history.push.