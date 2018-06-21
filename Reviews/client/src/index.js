import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import App from './App';
import rootReducer from './reducers';
import ReviewsAndRatings from './components/ReviewsAndRating/ReviewsAndRatings';

const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  // compose(
    applyMiddleware(...middleware),
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  // )
);
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('reviews')
);