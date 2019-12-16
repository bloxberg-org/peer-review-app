import PropTypes from 'prop-types';
import React from 'react';
import LoaderView from '../Loader';
import OverviewView from './Overview-view';

export default class OverviewContainer extends React.Component {
  static propTypes = {
    reviewsOfUser: PropTypes.array.isRequired,
    isUserLoading: PropTypes.bool.isRequired
  };

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


  getNumberOfReviews = () => {
    return this.props.reviewsOfUser.length;
  }
  getNumberOfVerifiedReviews = () => {
    return this.props.reviewsOfUser.filter(review => review.verified === true).length;
  }

  render() {
    if (this.props.isUserLoading)
      return (<LoaderView />);

    // Format data on the cards
    let cardsData = {
      'Peer Reviews': this.getNumberOfReviews(),
      'Verified Reviews': this.getNumberOfVerifiedReviews(),
      'H-Index': 75,
      'Affiliated Journals': 25
    };

    return (
      <OverviewView {...this.props} {...this.state} cardsData={cardsData} />
    );
  }
}
