import PropTypes from 'prop-types';
import React from 'react';
import Loader from '../../Loader';
import ListCardView from './ListCard-view';

export default class ListCardContainer extends React.Component {
  static propTypes = {
    reviews: PropTypes.array.isRequired
  }

  constructor(props) {
    super(props);
  }

  render() {
    const { reviews, title, type } = this.props;
    if (!reviews)
      return <Loader />;
    return (
      <ListCardView
        reviews={reviews}
        title={title}
        type={type}
      />
    );
  }
}