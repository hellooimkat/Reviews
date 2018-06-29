import axios from 'axios';
import { FETCH_OVERVIEW_REVIEWS, GET_RANKED_FEATURES } from '../types';

export const fetchOverviewReviews = hostelId => (dispatch) => {
  axios.get(`/api/get/reviews/overview/${hostelId}`).then((res) => {
    const { data } = res;

    // rank rated features and eliminate features with low rating
    let { ratedFeatures } = data;
    const compare = (f1, f2) => f2.rating - f1.rating;
    ratedFeatures = ratedFeatures
      .sort(compare)
      // .filter(each => each.rating > 8)
      .slice(0, 6);

    dispatch({
      type: FETCH_OVERVIEW_REVIEWS,
      payload: {hostelId, ...data},
    });
    dispatch({
      type: GET_RANKED_FEATURES,
      payload: ratedFeatures,
    });
  });
};

export const a = 1;
