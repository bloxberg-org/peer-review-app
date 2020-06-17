import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import styled, { withTheme } from 'styled-components';
import Context from '../../Context';

Graph.propTypes = {
  theme: PropTypes.object,
  statsData: PropTypes.object.isRequired,
};

const GRAPH_DATE_FORMAT = 'MMM YYYY';

const Wrapper = styled.div`
  margin: 5;
  display: flex;
  background-color: white;
  flex-direction: row;
  flex: 1;
  border: 1px solid ${props => props.theme.border};
  border-radius: 8px
  `;

const Center = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const GraphWrapper = styled.div`
  flex: 0.7;
  flex-direction: column;
  padding: 32px;
  border-right: 1px solid ${props => props.theme.border};
  `;

const FigureTitle = styled.h2`
  font-weight: 400;
`;

const FigureDate = styled.div`
  font-size: 11;
  color: gray;
  `;

const StatsWrapper = styled.div`
  flex: 0.3;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-between;
`;

const StatsTitle = styled.h3`
  color: gray;
  font-size: 9pt;
  `;

const StatsValue = styled.div`
  font-weight: 700;
  font-size: 12pt;
  `;

const StatsCardWrapper = styled.div`
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 15;
  text-align: center;
  padding: 24px 32px;
  border-bottom: 1px solid ${props => props.theme.border};
  `;

const PrevNextYear = styled(props => {
  return (
    // avoid click function if disabled.
    <span {...props} onClick={props.disabled ? null : props.onClick} >
      {props.children}
    </span>
  );
})`
  color: ${props => props.disabled ? props.theme.gray : props.theme.secondary};
  font-size: 10px;
  cursor: ${props => props.disabled ? 'default' : 'pointer'};
  margin: 0 8px;
`;

const StatsCard = props => {
  let title = props.title;
  let value = props.value instanceof Date ? props.value.toLocaleDateString() : props.value;
  return (
    <StatsCardWrapper>
      <StatsTitle>{title}</StatsTitle>
      <StatsValue>{value}</StatsValue>
    </StatsCardWrapper>
  );
};
StatsCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired
};


function Graph(props) {
  const { user, reviews } = useContext(Context);
  const [yearsFromNow, setYearsFromNow] = useState(0);
  const allMonthsArray = monthlyGroupReviews(reviews);
  const chartData = get12MonthsDataOfYearsBefore(allMonthsArray, yearsFromNow);
  let statsData = props.statsData;
  // console.log(reviews);
  // console.log('Years from now in Graph: ', yearsFromNow);
  // console.log(chartData);

  let cards = [];
  let i = 0;
  for (let key of Object.keys(statsData)) {
    cards.push(<StatsCard key={i++} title={key} value={statsData[key]}></StatsCard>);
  }

  return (
    <Wrapper>
      {reviews.length === 0
        ? <GraphWrapper> <Center>No reviews to show yet </Center></GraphWrapper>
        :
        <GraphWrapper>
          <FigureTitle>{user.firstName + ' ' + user.lastName}&apos;s Reviews</FigureTitle>
          <FigureDate> as of {moment(new Date()).format('MMMM Do, YYYY')}</FigureDate>
          <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '0px 32px' }}>
            <PrevNextYear
              onClick={() => setYearsFromNow(yearsFromNow + 1)}
              // disable if prev 12 months retuns empty array. Even if there are no user reviews, a non-empty array is returned as long as in the range of the first and last review.
              disabled={get12MonthsDataOfYearsBefore(allMonthsArray, yearsFromNow + 1).length === 0}
            >
              Previous Year
            </PrevNextYear>
            <PrevNextYear
              onClick={() => setYearsFromNow(yearsFromNow - 1)}
              disabled={yearsFromNow === 0}>
              Next Year
            </PrevNextYear>
          </div>
          <LineChart width={600} height={400} data={chartData} margin={{ top: 16, right: 32, bottom: 16, left: 32 }}>
            <Line type="monotone" dataKey="count" stroke={props.theme.primary} />
            <CartesianGrid stroke="#ccc" strokeDasharray='5 5' />
            <XAxis dataKey="month" />
            <YAxis allowDecimals={false} domain={[0, 'dataMax + 1']} />
            <Tooltip />
          </LineChart>
        </GraphWrapper>
      }
      <StatsWrapper>
        {cards}
      </StatsWrapper>
    </Wrapper>
  );
}

// Sort reviews first to have monthly review count object array sorted. 
function sortReviews(reviews) {
  return reviews.sort((review1, review2) => {
    if (review1.timestamp < review2.timestamp)
      return -1;
    if (review1.timestamp > review2.timestamp)
      return 1;
    return 0;
  });
}

/**
 * Creates an object with months as keys and their occurances as values.
 * 
 * @param {Array} sortedReviews - e.g. [ {publisher: Springer, timestamp: 1552422...}, ...]
 * @returns {Object} - An object where keys are the MMM YYYY formatted months and values are number of reviews in that month. 
 * { Jan 2020: 5, Dec 2019: 1, ... , Apr 2017: 2}
 */
function countMonthlyReviews(sortedReviews) {
  let monthsMap = {};
  sortedReviews.forEach(review => {
    let month = moment.unix(review.timestamp).format(GRAPH_DATE_FORMAT);
    if (!Object.prototype.hasOwnProperty.call(monthsMap, month)) // Assign month if encountered first time
      return monthsMap[month] = 1;
    return monthsMap[month] += 1; // Increment otherwise.
  });

  return monthsMap;
}

/**
 * Transforms an object into an array of objects to feed to the graph. 
 * 
 * @param {Object} monthsMap An object where keys are the MMM YYYY formatted months and values are number of reviews in that month. { Jan 2020: 5, Dec 2019: 1, ... , Apr 2017: 2}
 * @return {Array} - [{month: 'May 2019', count: 2 }, {month: 'Jan 2019', count: 3}...]
 */
function formatMonthsMapToChart(monthsMap) {
  return Object.keys(monthsMap).map(mmmyyyy => {
    return { month: mmmyyyy, count: monthsMap[mmmyyyy] };
  });
}

/**
 * 
 * @param {Object} monthsMap - monthsMap An object where keys are the MMM YYYY formatted months and values are number of reviews in that month. { Jan 2020: 5, Dec 2019: 1, ... , Apr 2017: 2}
 * @returns {Object} - monthsMap with all months from the very first review month until the most recent. Months with no reviews given the value 0.
 *  { Jan 2020: 5, Dec 2019: 1, Nov 2019: 0, ... , Mar 2017: 0, Apr 2017: 2}
 */
function fillEmptyMonths(monthsMap, sortedReviews) {

  // console.log('Received months: ', monthsMap);

  if (sortedReviews.length === 1)
    return monthsMap;

  // Parse the first and last month
  let firstReviewDate = moment.unix(sortedReviews[0].timestamp);
  let lastReviewDate = moment.unix(sortedReviews[sortedReviews.length - 1].timestamp);

  // Iterate each month
  let currentReviewDate = firstReviewDate;
  let allMonthsMap = {};
  // Iterate from currentReviewMonth until lastReviewMonth
  while (moment(currentReviewDate).isSameOrBefore(lastReviewDate)) {
    let currentReviewMonth = currentReviewDate.format(GRAPH_DATE_FORMAT);
    // console.log('Current month is: ', currentReviewMonth);
    // If the month is empty
    if (!Object.prototype.hasOwnProperty.call(monthsMap, currentReviewMonth)) {
      allMonthsMap[currentReviewMonth] = 0;
    } else {
      allMonthsMap[currentReviewMonth] = monthsMap[currentReviewMonth];
    }
    // Check next month.
    currentReviewDate = moment(currentReviewDate).add(1, 'month');
  }
  let lastReviewMonth = lastReviewDate.format(GRAPH_DATE_FORMAT);
  // Assign last review month.
  allMonthsMap[lastReviewMonth] = monthsMap[lastReviewMonth];

  // console.log('Filled months: ', allMonthsMap);
  return allMonthsMap;
}


function monthlyGroupReviews(reviews) {
  if (reviews.length === 0)
    return [];
  let sortedReviews = sortReviews(reviews);
  let monthsMap = countMonthlyReviews(sortedReviews);
  let allMonthsMap = fillEmptyMonths(monthsMap, sortedReviews);
  let allMonthsArray = formatMonthsMapToChart(allMonthsMap);
  return allMonthsArray;
}

/**
 * Function to dynamically extract months to be shown on the yearly chart.
 * 
 * @param {Array} allMonthsArray - Formatted array of all months with review counts.
 * @param {Number} yearsBefore - Years ago to be shown. E.g. if last review was in Mar 2019, yearsBefore = 0 gives 12 months from Apr 2018 to Mar 2019 inclusive. yearsBefore = 2 gives Apr 2016 to Mar 2017.
 * @returns {Array} - Array of 12 review objects with format [{month: 'Apr 2018' count:0}, ... , {month: 'Mar 2019', count: 3}].
 */
function get12MonthsDataOfYearsBefore(allMonthsArray, yearsFromNow) {
  // console.log('All Months Array: ', allMonthsArray);
  // console.log('Years from now: ', yearsFromNow);
  let lastIndex = allMonthsArray.length - 1 - (yearsFromNow * 12);
  let firstIndex = lastIndex - 11; // slice() is first inclusive
  // console.log('First index: ', firstIndex, ' Last Index: ', lastIndex);
  if (yearsFromNow < 0)
    return [];
  if (lastIndex < 0)
    return [];
  if (firstIndex < 0)
    return allMonthsArray.slice(0, lastIndex + 1);
  return allMonthsArray.slice(firstIndex, lastIndex + 1);
}

export default withTheme(Graph); // access theme variables in Graph.