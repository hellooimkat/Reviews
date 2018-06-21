import { GET_RANKED_FEATURES } from '../types';

const initialState = [];

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_RANKED_FEATURES:
      return action.payload;

    default:
      return state;
  }
}
