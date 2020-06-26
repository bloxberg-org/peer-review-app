import TopBar from 'components/TopBar';
import AddReview from 'pages/AddReview';
import AllReviews from 'pages/AllReviews';
import Overview from 'pages/Overview';
import Settings from 'pages/Settings';
import SingleReview from 'pages/SingleReview';
import VouchReview from 'pages/VouchReview';
import PropTypes from 'prop-types';
import React from 'react';
import { Redirect, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

RoutesView.propTypes = {
  refreshReviews: PropTypes.func.isRequired,
  isLoggedInWithMetamask: PropTypes.bool.isRequired,
  isLoggedInWithFm: PropTypes.bool.isRequired,
  isNoUserFound: PropTypes.bool.isRequired,
  isConnectedToBloxberg: PropTypes.bool.isRequired
};

export default function RoutesView({ isLoggedInWithFm, isLoggedInWithMetamask, isNoUserFound, isConnectedToBloxberg, ...props }) {

  // Don't repeat props isLoggedInWithWallet, isNoUserFound, and isConnectedToBloxberg
  // Logged in to wallet if logged in to Fortmatic or Metamask.
  const PrivateRouteWithAuth = (props) => {
    return <PrivateRoute isLoggedInWithWallet={isLoggedInWithFm || isLoggedInWithMetamask} isNoUserFound={isNoUserFound} isConnectedToBloxberg={isConnectedToBloxberg} {...props} />;
  };

  const TopBarWithFm = (props) => {
    return <TopBar isLoggedInWithFm={isLoggedInWithFm} {...props} />;
  };

  return (
    <Switch>
      <PrivateRouteWithAuth path="/Overview">
        <TopBarWithFm title='Overview' {...props} />
        <Overview {...props} />
      </PrivateRouteWithAuth>
      <PrivateRouteWithAuth path="/Reviews/AddReview">
        <TopBarWithFm title='Reviews' {...props} />
        <AddReview {...props} refreshReviews={props.refreshReviews} />
      </PrivateRouteWithAuth>
      <PrivateRouteWithAuth path="/Reviews/MyReviews">
        <TopBarWithFm title='Reviews' {...props} />
        <AllReviews {...props} />
      </PrivateRouteWithAuth>
      <PrivateRouteWithAuth path="/Reviews/VouchReview">
        <TopBarWithFm title='Reviews' {...props} />
        <VouchReview {...props} />
      </PrivateRouteWithAuth>
      <PrivateRouteWithAuth path="/Reviews/:id">
        <TopBarWithFm title='Review' {...props} />
        <SingleReview {...props} />
      </PrivateRouteWithAuth>
      <PrivateRouteWithAuth path="/Reviews/">
        {/* Redirect to AddReview at route /Review/ */}
        <Redirect to='/Reviews/AddReview' />
      </PrivateRouteWithAuth>
      <PrivateRouteWithAuth path="/Settings">
        <TopBarWithFm title='Settings' {...props} />
        <Settings {...props} />
      </PrivateRouteWithAuth>
      <PrivateRouteWithAuth path="/">
        <Redirect to="/Overview" />
      </PrivateRouteWithAuth>
    </Switch>
  );
}