import { FETCH_OVERVIEW_REVIEWS } from '../types';

const initialState = {};
export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_OVERVIEW_REVIEWS:
      return action.payload;

    default:
      return state;
  }
}
