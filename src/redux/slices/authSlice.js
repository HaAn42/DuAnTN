// authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  isLoggedIn: false,
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.token = action.payload.token;

      // Lưu thông tin người dùng vào AsyncStorage khi đăng nhập thành công
      saveUserData(action.payload.user, action.payload.token);
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.token = null;

      // Xóa thông tin người dùng và token khỏi AsyncStorage khi logout
      AsyncStorage.removeItem('token');
      AsyncStorage.removeItem('user');
    },
    setLoginStatus: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.token = action.payload.token || null;
      state.user = action.payload.user || null;
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
 