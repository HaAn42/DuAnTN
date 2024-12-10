// authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  user: null,
  token: null,
  isLoggedIn: false, // Trạng thái mặc định là chưa đăng nhập
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true; // Đánh dấu là đã đăng nhập
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
    },
  },
});


// Hàm lưu thông tin người dùng vào AsyncStorage
const saveUserData = async (user, token) => {
  try {
    await AsyncStorage.setItem('token', token);
    await AsyncStorage.setItem('user', JSON.stringify(user));
  } catch (error) {
    console.error("Lỗi khi lưu thông tin người dùng vào AsyncStorage: ", error);
  }
};

// Action kiểm tra trạng thái đăng nhập (bất đồng bộ)
export const checkLoginStatus = () => async (dispatch) => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      // Lấy thông tin người dùng từ AsyncStorage
      const user = await AsyncStorage.getItem('user');
      const parsedUser = user ? JSON.parse(user) : null;

      dispatch(setLoginStatus({
        isLoggedIn: true,
        token,
        user: parsedUser,
      }));
    } else {
      dispatch(setLoginStatus({
        isLoggedIn: false,
      }));
    }
  } catch (error) {
    console.error("Lỗi khi kiểm tra trạng thái đăng nhập: ", error);
  }
};

export const { loginSuccess, logout, setLoginStatus } = authSlice.actions;
export default authSlice.reducer;
 