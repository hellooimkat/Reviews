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
    let id = window.location.pathname;
    if (id === '/hostels/' || id === '/') {
      id = 1;
    } else {
      id = id.replace(/\/hostels/g, '');
      id = id.replace(/\//g, '');
    }
    this.props.fetchOverviewReviews(id);
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
