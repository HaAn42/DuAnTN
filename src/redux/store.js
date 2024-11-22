// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import likeProductReducer from './slices/likeProductSlice';
import cartReducer from './slices/cartSlice';
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';  

const store = configureStore({
  reducer: {
    auth: authReducer,
    likeProducts: likeProductReducer,
    cart: cartReducer, 
    user: userReducer,  // Thêm reducer user vào đây
  },
});

export default store;
