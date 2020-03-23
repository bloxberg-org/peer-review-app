import PropTypes from 'prop-types';
import React from 'react';
import LoginWithFortmaticView from './LoginWithFormatic-view';

export default class LoginWithFortmaticContainer extends React.Component {
  static propTypes = {
    handleLoginWithMagicLink: PropTypes.func.isRequired,
    handleLogout: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <LoginWithFortmaticView {...this.state}
        handleLogout={this.props.handleLogout}
        handleLogin={this.props.handleLoginWithMagicLink} />
    );
  }
}

