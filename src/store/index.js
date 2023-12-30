import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

// Initial state
const initialState = {
  counter: 0,
  toggle: false,
  text: ''
};

// Example reducer
const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, counter: state.counter + 1 };
    case 'DECREMENT':
      return { ...state, counter: state.counter - 1 };
    case 'TOGGLE':
      return { ...state, toggle: !state.toggle };
    case 'SET_TEXT':
      return { ...state, text: action.payload };
    default:
      return state;
  }
};

// Configure store
const makeStore = () => configureStore({
  reducer: {
    app: appReducer
  }
});

export const wrapper = createWrapper(makeStore);
