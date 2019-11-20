import PropTypes from 'prop-types';
import React from 'react';
import { getReviewXML } from '../../../utils/review';
import Loader from '../../Loader';
import ImportModalView from './ImportModal-view';

export default class ImportModalContainer extends React.Component {
  static propTypes = {
    source: PropTypes.oneOf(['f1000research'])
  }

  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
      isDoneFetching: false
    };
  }

  handleSubmit = (data) => {
    let source = this.props.source;
    console.log(data);

    this.setState({ isFetching: true });

    this.getXMLDoc(source, data.doi).then((xmldoc) => {
      console.log(xmldoc);
      this.setState({ isFetching: false, isDoneFetching: true });
    });
  }

  getXMLDoc = (source, doi) => {
    return getReviewXML(source, doi).then((data) => {
      return new Promise((resolve, reject) => {
        if (!data)
          reject('XML is empty');
        let parser = new DOMParser();
        let xmlDoc = parser.parseFromString(data, 'text/xml');
        resolve(xmlDoc);
      });
    });
  }

  render() {
    if (this.state.isFetching) {
      return (
        <Loader />
      );
    }

    return (
      <ImportModalView
        onSubmit={this.handleSubmit}
        {...this.state} {...this.props} />
    );
  }
}