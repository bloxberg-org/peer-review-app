import React from 'react';
import ImportModalView from './ImportModal-view';

export default class ImportModalContainer extends React.Component {
  static propTypes = {

  }

  constructor(props) {
    super(props);
  }

  handleSubmit(data) {
    console.log(data);
  }

  render() {
    return (
      <ImportModalView
        onSubmit={this.handleSubmit}
        {...this.state} {...this.props} />
    );
  }
}