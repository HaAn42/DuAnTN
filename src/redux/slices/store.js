// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import likeProductReducer from './';

const store = configureStore({
  reducer: {
    likeProduct: likeProductReducer,
  },
});

export default store;
