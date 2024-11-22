
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 
  email: '',
  // Các trường khác nếu có
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      
      state.email = action.payload.email;
    },
    clearUser: (state) => {
      
      state.email = '';
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
