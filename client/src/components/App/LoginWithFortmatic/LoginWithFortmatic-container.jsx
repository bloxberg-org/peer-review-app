import Fortmatic from 'fortmatic';
import React from 'react';
import LoginWithFortmaticView from './LoginWithFormatic-view';
const fmPhantom = new Fortmatic.Phantom('pk_test_04AE794995EB0751'); // ✨

export default class LoginWithFortmaticContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  handleLoginWithMagicLink = async (data) => {
    const email = data.email;
    const user = await fmPhantom.loginWithMagicLink({ email });
    console.log(await user.isLoggedIn()); // => true
    console.log((await user.getMetadata()).publicAddress); // You should use this as a unique user Id.
  };

  render() {
    return (
      <LoginWithFortmaticView {...this.state} handleLogin={this.handleLoginWithMagicLink} />
    );
  }
}