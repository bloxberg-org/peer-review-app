import React from 'react';
import ImportModalView from './ImportModal-view';

export default class ImportModalContainer extends React.Component {
  static propTypes = {

  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ImportModalView {...this.state} {...this.props} />
    );
  }
}