import PropTypes from 'prop-types';
import React from 'react';
import AddReviewView from './AddReview-view';

class AddReviewContainer extends React.Component {
  static propTypes = {
    refreshReviews: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      selectedInput: 'F1000R'
    };
  }

  handleSelectedChange = (value) => {
    this.setState({ selectedInput: value });
  }

  render() {
    return (
      <AddReviewView refreshReviews={this.props.refreshReviews} handleSelectedChange={this.handleSelectedChange} {...this.state} {...this.props} />
    );
  }
}

export default AddReviewContainer;