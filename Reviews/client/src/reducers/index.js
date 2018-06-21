import { combineReducers } from 'redux';
import overviewReviews from './overviewReviews';
import rankedFeatures from './rankedFeatures';
import sidebarReducer from './sidebarReducer';

export default combineReducers({
  overviewReviews,
  rankedFeatures,
  sidebarReducer,
});
