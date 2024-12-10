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
import CodeMail from '../screens/CodeMail';
import EmailOTP from '../screens/EmailOtp';


const AuthNavigator = () => {
  const Stack = createNativeStackNavigator();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [loading, setLoading] = React.useState(true); // Thêm trạng thái chờ

  useEffect(() => {
    const checkLogin = async () => {
      await dispatch(checkLoginStatus()); // Kiểm tra token từ AsyncStorage
      setLoading(false); // Dừng trạng thái chờ
    };
    checkLogin();
  }, [dispatch]);

  if (loading) {
    // Hiển thị màn hình chờ trong khi kiểm tra trạng thái đăng nhập
    return <Splash />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isLoggedIn ? 'ButtomTab' : 'Splash'}>
        <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
        <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} options={{ headerShown: false }} />
        <Stack.Screen name="CodeMail" component={CodeMail} options={{ headerShown: false }} />
        <Stack.Screen name="MailOtp" component={EmailOTP} options={{ headerShown: false }} />
        <Stack.Screen name="ButtomTab" component={ButtomTab} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default AuthNavigator;
