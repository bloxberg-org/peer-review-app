import PropTypes from 'prop-types';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import ConnectToBloxberg from '../ConnectToBloxberg';

// If not logged in to wallet, redirect to login
// else if not registered, redirect to register
// else if connected to wrong network, show wrong network
// else render component
const PrivateRoute = ({ children, isNoUserFound, isLoggedInWithWallet, isConnectedToBloxberg, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => {
        if (!isLoggedInWithWallet)
          return <Redirect to='/Login' />;
        else if (isNoUserFound)
          return <Redirect to='/Register' />;
        else if (!isConnectedToBloxberg)
          return <ConnectToBloxberg />;
        else
          return children;
      }}
    />
  );
};

PrivateRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  isNoUserFound: PropTypes.bool.isRequired,
  isLoggedInWithWallet: PropTypes.bool.isRequired,
  isConnectedToBloxberg: PropTypes.bool.isRequired
};

export default PrivateRoute;