import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchOverviewReviews } from './actions/reviewActions';
import WhoIsStaying from './components/WhoIsStaying/WhoIsStaying';
import ReviewsAndRatings from './components/ReviewsAndRating/ReviewsAndRatings';
import LatestReviews from './components/LatestReviews/LatestReviews';
import Sidebar from './components/Sidebar/Sidebar';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    let hostelId = window.location.pathname;
    if (hostelId === '/hostels/' || hostelId === '/') {
      hostelId = 1;
    } else {
      hostelId = hostelId.replace(/\/hostels/g, '');
      hostelId = hostelId.replace(/\//g, '');
    }
    this.props.fetchOverviewReviews(Number(hostelId));
  }

  render() {
    return (
      <div>
        <Sidebar />
        <WhoIsStaying />
        <ReviewsAndRatings />
        <LatestReviews />
      </div>
    );
    s;
  }
}

App.propTypes = {
  fetchOverviewReviews: PropTypes.func.isRequired
};
export default connect(
  null,
  { fetchOverviewReviews }
)(App);
