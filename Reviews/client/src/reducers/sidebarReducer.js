import {
  OPEN_SIDEBAR_AND_FETCH_FULL_REVIEWS,
  FETCH_REVIEWS_ON_PAGE,
  TOGGLE_ENGLISH_ONLY_REVIEW_OPTION,
  CHANGE_SORTBY,
  OPEN_SIDEBAR
} from '../types';

const initialState = {
  sidebarOn: false,
  isEnglish: true,
  pageNum: 1,
  sortBy: 'newest'
};

export default function(state = initialState, action) {
  switch (action.type) {
    case OPEN_SIDEBAR_AND_FETCH_FULL_REVIEWS:
      // return { ...state, ...action.payload, sidebarOn: true };
      // console.log(action.payload)
      return {
        ...state,
        ...action.payload,
        minPageIndex: 1,
        maxPageIndex: Math.ceil(action.payload.total / 10)
      };

    case OPEN_SIDEBAR:
      return {
        ...state,
        sidebarOn: true
      };

    case FETCH_REVIEWS_ON_PAGE:
      return {
        ...state,
        ...action.payload,
        minPageIndex: 1,
        maxPageIndex: Math.ceil(action.payload.total / 10)
      };

    case TOGGLE_ENGLISH_ONLY_REVIEW_OPTION:
      return { ...state, isEnglish: action.payload };

    case CHANGE_SORTBY:
      return { ...state, sortBy: action.payload };

    default:
      return state;
  }
}
