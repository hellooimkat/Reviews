import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  showOnlyEnglishReviews,
  changeSortByTo,
  fetchReviewsOnPage
} from '../../actions/sidebarActions';
import sidebarReducer from '../../reducers/sidebarReducer';
class SidebarFilter extends Component {
  constructor(props) {
    super(props);
  }

  handleLanguageChange(e) {
    const { hostelId, sortBy } = this.props;
    if (e.target.value === 'english') {
      this.props.showOnlyEnglishReviews(true);
    } else {
      this.props.showOnlyEnglishReviews(false);
    }
    this.props.fetchReviewsOnPage(
      1,
      hostelId,
      sortBy,
      e.target.value === 'english'
    );
  }

  handleSortByChange(e) {
    const { hostelId, isEnglish } = this.props;
    this.props.changeSortByTo(e.target.value);
    this.props.fetchReviewsOnPage(1, hostelId, e.target.value, isEnglish);
  }

  render() {
    return (
      <div className="row" id="filter">
        {/* Language filter */}
        <div className="col-md-6 form-group">
          <label>SHOW:</label>
          <select
            name="show"
            id="show"
            onChange={e => this.handleLanguageChange(e)}
            className="form-control"
          >
            <option value="english">English Reviews</option>
            <option value="allLanguages">All languages</option>
          </select>
        </div>

        {/* Sort-by fiter */}
        <div className="col-md-6 form-group">
          <label>SORT BY:</label>
          <select
            name="sortBy"
            id="sortBy"
            value={this.props.sortBy}
            onChange={e => this.handleSortByChange(e)}
            className="form-control"
          >
            <option value="topRated">Top Rated</option>
            <option value="lowestRated">Lowest Rated</option>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="ageGroup">Age Group</option>
          </select>
        </div>

        <div />
      </div>
    );
  }
}

const mapStateToProps = ({ sidebarReducer, overviewReviews }) => ({
  sortBy: sidebarReducer.sortBy,
  isEnglish: sidebarReducer.isEnglish,
  hostelId: overviewReviews.id
});
export default connect(
  mapStateToProps,
  { showOnlyEnglishReviews, changeSortByTo, fetchReviewsOnPage }
)(SidebarFilter);
