import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  openSidebarAndFetchFullReviews,
  openSidebar,
  fetchReviewsOnPage
} from '../../actions/sidebarActions';

class ReadAllReviewsButton extends Component {
  handleOnClick() {
    const { hostelId, isEnglish, sortBy } = this.props;
    this.props.fetchReviewsOnPage(1, hostelId, sortBy, isEnglish);
  }

  render() {
    return (
      <div id="readAllReviews">
        <button
          type="button"
          className="btn btn-readAllReviews px-3"
          data-toggle="modal"
          data-target="#sidebarModal"
          onClick={() => this.handleOnClick()}
          id="readAllReviewsBtn"
        >
          Read all reviews
        </button>
      </div>
    );
  }
}

ReadAllReviewsButton.propTypes = {
  openSidebarAndFetchFullReviews: PropTypes.func.isRequired,
  hostelId: PropTypes.number.isRequired,
};

const mapStateToProps = ({ overviewReviews, sidebarReducer }) => ({
  hostelId: overviewReviews.id || '',
  isEnglish: sidebarReducer.isEnglish,
  sortBy: sidebarReducer.sortBy
});

export default connect(
  mapStateToProps,
  { openSidebarAndFetchFullReviews, openSidebar, fetchReviewsOnPage }
)(ReadAllReviewsButton);
