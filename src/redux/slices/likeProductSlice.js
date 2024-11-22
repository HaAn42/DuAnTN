// likeProductSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  likedItems: [],
};

const likeProductSlice = createSlice({
  name: 'likeProducts',
  initialState,
  reducers: {
    addProductToLike: (state, action) => {
      const newProduct = action.payload;
      const productExists = state.likedItems.find(item => item._id === newProduct._id);
      if (!productExists) {
        state.likedItems.push(newProduct);
      }
    },
    removeProductFromLike: (state, action) => {
      state.likedItems = state.likedItems.filter(item => item._id !== action.payload._id);
    },
  },
});

export const { addProductToLike, removeProductFromLike } = likeProductSlice.actions;
export default likeProductSlice.reducer;
