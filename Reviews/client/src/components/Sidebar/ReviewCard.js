import React from 'react';
import Moment from 'moment';
import {
  getRatingLabel,
  getAgeGroup,
  getTravelerType
} from '../../utils/helpers';

const ReviewCard = ({
  text,
  username,
  propertyResponse,
  age,
  created_at,
  rate,
  numOfReviews,
  country,
  status
}) => {
  return (
    <div className="row review-card py-5 px-2">
      {/* userinfo half */}
      <div className="col-md-3 user-detail">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-2 user-detail_user-avatar">
              <div className="user-avatar">
                <i className="fa fa-user-circle-o" aria-hidden="true" />
              </div>
            </div>
            <div className="col-md-12 col-10 d-flex flex-column justify-content-center">
              <div>
                <strong>{username}</strong>
              </div>
              <div className="user-detail_user-info">
                <div>
                  {country}, {status}, {getAgeGroup(age)}&nbsp;
                </div>
                <div className="travelerType">{getTravelerType(numOfReviews)}</div>
              </div>
              <div className="numOfReviews moreThan1Reviews">
                {numOfReviews} review{numOfReviews > 1 && 's'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* user comment half */}
      <div className="col-md-9 review-detail">
        <div className="container">
          <div className="row">
            <div className="col d-flex justify-content-between p-0">
              <div>
                <span className="btn btn-hostelworld btn-sm">
                  {rate.toFixed(1)}
                </span>
                <span className="ratingColumn mx-1">
                  <span className="ratingLabel">{getRatingLabel(rate)}</span>
                </span>
              </div>
              <div className="review-detail-date">
                <i className="fa fa-calendar" aria-hidden="true" />{' '}
                {Moment(created_at).format('DD MMM YYYY')}
              </div>
            </div>

            {/* review text */}
            <div className="review-text">{text}</div>

            {/* property response */}
            <div className="col p-0">
              {propertyResponse && (
                <div className="review-property-response">
                  <div className="row">
                    <div className="col">{propertyResponse}</div>
                  </div>
                  <div className="d-flex justify-content-end">
                    <div className="review-propperty-response-label">
                      <i className="fa fa-comments-o" aria-hidden="true" />
                      <span>Property reply</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
