import React from 'react';
import RankedRating from '../ReviewsAndRating/RankedRating';
import RatingSummary from '../ReviewsAndRating/RatingSummary';

const SidebarRankedRating = () => (
  <div id="sidebarRankedRating">
    <RatingSummary key="ratingSummary" sidebar={true} />
    <RankedRating key="rankedRating" sidebar={true} />
  </div>
);

export default SidebarRankedRating;
