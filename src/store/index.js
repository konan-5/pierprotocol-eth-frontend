import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

const initialState = {
  sellList: [],
  counter: 0,
  toggle: false,
  text: '',
  network: "Ethereum",
};

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
    case 'ADD_SELL_LIST':
      return {...state, sellList: [...state.sellList, action.payload]};
    case 'REMOVE_SELL_LIST':
      return { ...state, sellList: state.sellList.filter(item => item !== action.payload) };
    case 'SET_NETWORK':
      return {...state, network: action.payload}
    default:
      return state;
  }
};

const makeStore = () => configureStore({
  reducer: {
    app: appReducer
  }
});

export const wrapper = createWrapper(makeStore);
