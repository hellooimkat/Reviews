import React from 'react';
import Top4Reviews from './Top4Reviews';
import ReadAllReviewsButton from './ReadAllReviewsButton';

const LatestReviews = () => (
  <div id="latestReviews">
    <div className="container">
      <div className="header">Latest Reviews</div>
      <Top4Reviews />
      <ReadAllReviewsButton />
    </div>
  </div>
);

export default LatestReviews;
