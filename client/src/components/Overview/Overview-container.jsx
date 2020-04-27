import PropTypes from 'prop-types';
import React from 'react';
import LoaderView from '../Loader';
import OverviewView from './Overview-view';

export default class OverviewContainer extends React.Component {
  static propTypes = {
    reviewsOfUser: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      graphData: {
        'Reviews this year': this.getReviewsThisYear(),
        'Most Recent Review': this.getMostRecentReviewYear(),
        'Most Reviewed Publisher': this.getMostReviewedJournal()
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

  getReviewsThisYear = () => {
    return this.props.reviewsOfUser.reduce((accumulator, currentReview) => {
      let currentReviewYear = this.unixTimestampToUTCYear(currentReview.timestamp);
      if (currentReviewYear === new Date().getUTCFullYear())
        return ++accumulator;
      return accumulator;
    }, 0);
  }

  unixTimestampToUTCYear = (timestamp) => {
    return new Date(timestamp * 1000).getUTCFullYear(); // multiplied by 1000 so that the argument is in milliseconds, not seconds.
  }

  getMostReviewedJournal = () => {
    // from https://stackoverflow.com/questions/1053843/get-the-element-with-the-highest-occurrence-in-an-array
    function mode(array) {
      if (array.length == 0)
        return null;
      var modeMap = {};
      var maxEl = array[0].publisher, maxCount = 1;
      for (var i = 0; i < array.length; i++) {
        var el = array[i].publisher;
        if (modeMap[el] == null)
          modeMap[el] = 1;
        else
          modeMap[el]++;
        if (modeMap[el] > maxCount) {
          maxEl = el;
          maxCount = modeMap[el];
        }
      }
      console.log(maxEl);
      return maxEl;
    }

    return mode(this.props.reviewsOfUser);
  }

  getMostRecentReviewYear = () => {
    let largestTimestampedReview = this.props.reviewsOfUser.reduce((accumulator, currentReview) => {
      if (currentReview.timestamp > accumulator.timestamp)
        return currentReview;
      return accumulator;
    });
    return this.unixTimestampToUTCYear(largestTimestampedReview.timestamp);
  }

  getNumberOfReviews = () => {
    return this.props.reviewsOfUser.length;
  }
  getNumberOfVerifiedReviews = () => {
    return this.props.reviewsOfUser.filter(review => review.verified === true).length;
  }

  // Returns the number of unique publisher names in reviewsOfUser. 
  getNumberOfAffiliatedPublishers = () => {
    // Extract publisher names as an array.
    let publisherNames = this.props.reviewsOfUser.map((review) => {
      return review.publisher;
    });
    return new Set(publisherNames).size; // Create a set and return its size.
  }

  render() {
    if (this.props.isLoading)
      return (<LoaderView />);

    // Format data on the cards
    let cardsData = {
      'Peer Reviews': this.getNumberOfReviews(),
      'Verified Reviews': this.getNumberOfVerifiedReviews(),
      // 'H-Index': 75,
      'Affiliated Publishers': this.getNumberOfAffiliatedPublishers()
    };

    return (
      <OverviewView {...this.props} {...this.state} cardsData={cardsData} />
    );
  }
}
