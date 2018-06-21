import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'moment';
import { getRatingLabel, getAgeGroup } from '../../utils/helpers';

const Top4Reviews = ({ reviews }) => {
  return (
    <div className="row" id="top4Reviews">
      {reviews.map(({ _id, rate, text, created_at, user }) => (
        <div key={_id} className="col-md-3 pb-5">
          <div className="row">
            <div className="col-6">
              <span className="btn btn-hostelworld btn-sm">{rate.toFixed(1)}</span>
              <span className="ratingLabel pl-2">{getRatingLabel(rate)}</span>
            </div>
            <div className="col-6 text-right">
              {' '}
              <i className="fa fa-calendar" aria-hidden="true" />{' '}
              {Moment(created_at).format('DD MMM YYYY')}
            </div>
          </div>
          <div className="top4Reviews-text top4Reviews-truncate">
            <span>{text}</span>
          </div>

          <div className="row">
            <div className="col">
              <div className="border-top-gray">
                {user.country}, {user.status}, {getAgeGroup(user.age)}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = state => ({
  reviews: state.overviewReviews.reviews ? state.overviewReviews.reviews : []
});

Top4Reviews.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      rate: PropTypes.number,
      text: PropTypes.string,
      created_at: PropTypes.string
    })
  ).isRequired
};

export default connect(
  mapStateToProps,
  {}
)(Top4Reviews);
