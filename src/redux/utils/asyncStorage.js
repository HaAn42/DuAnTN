// src/utils/asyncStorage.js

import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveUserData = async (user, token) => {
  try {
    await AsyncStorage.setItem('token', token);
    await AsyncStorage.setItem('user', JSON.stringify(user));
  } catch (error) {
    console.error("Lỗi khi lưu thông tin người dùng vào AsyncStorage: ", error);
  }
};

export const getUserData = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    const user = await AsyncStorage.getItem('user');
    return { token, user: JSON.parse(user) };
  } catch (error) {
    console.error("Lỗi khi lấy thông tin người dùng từ AsyncStorage: ", error);
    return null;
  }
};
