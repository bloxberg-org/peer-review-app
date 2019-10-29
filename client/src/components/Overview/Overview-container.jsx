import PropTypes from 'prop-types';
import React from 'react';
import LoaderView from '../Loader';
import OverviewView from './Overview-view';

export default class OverviewContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      graphData: {
        'Reviews this year': 17,
        'Average Review Length (words)': 325,
        'Most Recent Review': new Date('September 12, 2019'),
        'Most Reviewed Journal': 'Nature'
      },
      highlightedReviews: [
        {
          title: 'On an Improvement of Wien\'s Equation for the Spectrum',
          count: 4238
        },
        {
          title: 'On the Theory of the Energy Distribution Law of the Normal Spectrum',
          count: 1005
        },
        {
          title: 'Entropy and Temperatire of Radiant Heat',
          count: 914
        },
        {
          title: 'Eight Lectures on Theoretical Physics',
          count: 281
        }
      ],
      reviewVerification: [
        {
          title: 'Theory of Relatively Review',
          verified: true
        },
        {
          title: 'Thermodynamics Review',
          verified: false
        },
        {
          title: 'Statistical Mechanics',
          verified: false
        }
      ]
    };
  }

  numberOfReviews = () => {
    return this.props.reviews.length;
  }
  numberOfVerifiedReviews = () => {
    return this.props.reviews.filter(review => review.verified === true).length;
  }
  render() {

    if (this.props.isLoading)
      return (<LoaderView />);
    let cardsData = {
      'Peer Reviews': this.numberOfReviews(),
      'Verified Reviews': this.numberOfVerifiedReviews(),
      'H-Index': 75,
      'Affiliated Journals': 25
    };

    return (
      <OverviewView {...this.props} {...this.state} cardsData={cardsData} />
    );
  }
}

OverviewContainer.propTypes = {
  reviews: PropTypes.array,
  isLoading: PropTypes.bool
};