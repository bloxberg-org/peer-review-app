import PropTypes from 'prop-types';
import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import AddManually from './AddManually';
import AddReviewView from './AddReview-view';
import F1000R from './F1000R';
import Publons from './Publons';

class AddReviewContainer extends React.Component {
  static propTypes = {
    match: PropTypes.shape({
      path: PropTypes.string.isRequired
    }),
    refreshReviews: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    let path = this.props.match.path;
    return (
      // <AddReviewView review={this.state.review} handleF1000Open={this.handleF1000Open} handleF1000Close={this.handleF1000Close} onDateChange={this.handleDateChange} onSubmit={this.handleSubmit} isAddingReview={this.state.isAddingReview} {...this.state} {...this.props} />
      <Switch>
        <Route path={`${path}/Publons`}>
          <Publons {...this.props} refreshReviews={this.props.refreshReviews} />
        </Route>
        <Route path={`${path}/F1000R`}>
          <F1000R {...this.props} />
        </Route>
        <Route path={`${path}/Email`}>
          Email
        </Route>
        <Route path={`${path}/Manual`}>
          <AddManually {...this.props} />
        </Route>
        <Route path={`${path}/`}>
          <AddReviewView {...this.state} {...this.props} />
        </Route>
      </Switch>
    );
  }
}

export default withRouter(AddReviewContainer);