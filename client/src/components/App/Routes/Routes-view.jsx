import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import AddReview from '../../AddReview';
import AllReviews from '../../AllReviews';
import ImportReviews from '../../ImportReviews';
import Overview from '../../Overview';
import SingleReview from '../../SingleReview';
import TopBar from '../../TopBar';
import VouchReview from '../../VouchReview';
export default function RoutesView(props) {
  return (
    <Switch>
      <Route path="/Overview">
        <TopBar title='Overview' {...props} />
        <Overview {...props} />
      </Route>
      <Route path="/Reviews/AddReview">
        <TopBar title='Reviews' {...props} />
        <AddReview {...props} />
      </Route>
      <Route path="/Reviews/ImportReviews">
        <TopBar title='Reviews' {...props} />
        <ImportReviews {...props} />
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

      {/* Redirect to AddReview at route /Review/ */}
      <Redirect to='/Reviews/AddReview' />
      <Route path="/">
        <Redirect to="/Overview" />
      </Route>
    </Switch>
  );
}