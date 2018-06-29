import axios from 'axios';
import {
  FETCH_REVIEWS_ON_PAGE,
  TOGGLE_ENGLISH_ONLY_REVIEW_OPTION,
  CHANGE_SORTBY,
  OPEN_SIDEBAR,
  CLOSE_SIDEBAR
} from '../types';

export const fetchReviewsOnPage = (
  pageNumber,
  hostelId,
  sortBy,
  isEnglish
) => dispatch => {
  const url = `/api/get/reviews/${hostelId}/all?pageNum=${pageNumber}&eng=${isEnglish}&sortBy=${sortBy}`;
  axios.get(url).then(res => {
    console.log('sidebarData:', res)
    dispatch({
      type: FETCH_REVIEWS_ON_PAGE,
      payload: { ...res.data, pageNum: pageNumber }
    });
  });
};

export const showOnlyEnglishReviews = boolean => ({
  type: TOGGLE_ENGLISH_ONLY_REVIEW_OPTION,
  payload: boolean
});

export const changeSortByTo = str => ({
  type: CHANGE_SORTBY,
  payload: str
});

export const openSidebar = () => ({
  type: OPEN_SIDEBAR
});

export const closeSidebar = () => ({
  type: CLOSE_SIDEBAR
});
