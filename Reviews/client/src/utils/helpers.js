export const getRatingLabel = ratingScore => {
  if (ratingScore >= 9) return 'Superb';
  if (ratingScore >= 8) return 'Fabulous';
  if (ratingScore >= 7) return 'Very good';
  if (ratingScore >= 6) return 'Good';
  if (ratingScore > 5) return 'Rating';
  return 'No rating';
};

export const getAgeGroup = age => {
  if (age>=41) return '41+';
  if (age>=31) return '31-40';
  if (age>=25) return '25-30';
  return '18-24';
};

export const getTravelerType = numOfReviews => {
  if (numOfReviews >= 25) return 'Globetrotter';
  if (numOfReviews>10) return 'Avid Traveller';
  return 'Novice Nomad';
}