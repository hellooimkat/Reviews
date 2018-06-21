import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getRatingLabel } from '../../utils/helpers';

const RatingSummary = ({ avgRating, totalReviewCount, sidebar }) => {
  return (
    <div id="ratingSummary">
      <div className="row">
        <div className="col d-flex">
          <div className="btn btn-avgRating btn-sm">{avgRating.toFixed(1)}</div>
          <div className="d-flex flex-column justify-content-end ml-2">
            <div className="ratingLabel">{getRatingLabel(avgRating)}</div>
            {!sidebar && <div>Based on: {totalReviewCount} reviews</div>}
            {sidebar && (
              <div id="ratingSummary-sidebar">
                <i className="fa fa-comment-o" aria-hidden="true" />{' '}
                {totalReviewCount} total reviews
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

RatingSummary.propTypes = {
  avgRating: PropTypes.number,
  totalReviewCount: PropTypes.number
};

RatingSummary.defaultProps = {
  avgRating: 0,
  totalReviewCount: 0
};

const mapStateToProps = ({ overviewReviews }) => ({
  avgRating: overviewReviews.avgRating,
  totalReviewCount: overviewReviews.totalReviewCount
});

export default connect(
  mapStateToProps,
  {}
)(RatingSummary);
