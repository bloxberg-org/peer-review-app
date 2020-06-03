import PropTypes from 'prop-types';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import AddReview from '../../AddReview';
import AllReviews from '../../AllReviews';
import Overview from '../../Overview';
import SingleReview from '../../SingleReview';
import TopBar from '../../TopBar';
import VouchReview from '../../VouchReview';

RoutesView.propTypes = {
  refreshReviews: PropTypes.func.isRequired
};


export default function RoutesView(props) {
  return (
    <Switch>
      <Route path="/Overview">
        <TopBar title='Overview' {...props} />
        <Overview {...props} />
      </Route>
      <Route path="/Reviews/AddReview">
        <TopBar title='Reviews' {...props} />
        <AddReview {...props} refreshReviews={props.refreshReviews} />
      </Route>
      <Route path="/Reviews/YourReviews">
        <TopBar title='Reviews' {...props} />
        <AllReviews {...props} />
      </Route>
      <Route path="/Reviews/VouchReview">
        <TopBar title='Reviews' {...props} />
        <VouchReview {...props} />
      </Route>
      <Route path="/Reviews/:id">
        <TopBar title='Review' {...props} />
        <SingleReview {...props} />
      </Route>
      <Route path="/Reviews/">
        {/* Redirect to AddReview at route /Review/ */}
        <Redirect to='/Reviews/AddReview' />
      </Route>
      <Route path="/">
        <Redirect to="/Overview" />
      </Route>
    </Switch>
  );
}