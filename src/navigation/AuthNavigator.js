import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Splash from '../screens/Splash/splash';
import Login from '../screens/LoginScreen/Login';
import Register from '../screens/RegisterScreen/Register';
import ChangePasswordScreen from '../screens/ChangePasswordScreenChangePasswordScreen/ChangePasswordScreen';
import ButtomTab from './ButtomTab';
import { checkLoginStatus } from '../redux/slices/authSlice';

const AuthNavigator = () => {
  const Stack = createNativeStackNavigator();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn); // Kiểm tra trạng thái đăng nhập từ Redux

  // Kiểm tra trạng thái đăng nhập khi AuthNavigator được load
  useEffect(() => {
    dispatch(checkLoginStatus()); // Kiểm tra token từ AsyncStorage
  }, [dispatch]);

  return (
    
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isLoggedIn ? 'ButtomTab' : 'Splash'}>
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ChangePassword"
          component={ChangePasswordScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ButtomTab"
          component={ButtomTab}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthNavigator;
