import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import CusttomTextInput from '../../components/CusttomTextInput';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {loginSuccess} from '../../redux/slices/authSlice'; // Ensure you import the correct action
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {
  const dispatch = useDispatch();
  const {isLoggedIn} = useSelector(state => state.auth); // Get login state from Redux

  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isEmail, setEmail] = useState('');
  const [isPassword, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Toggle password visibility
  const showPassword = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  // Check if already logged in
  useEffect(() => {
    if (isLoggedIn) {
      navigation.navigate('ButtomTab'); // Redirect to main screen if logged in
    }
  }, [isLoggedIn]);

  // Handle login logic
  const handleLogin = async () => {
    if (!isEmail || !isPassword) {
      setError('Vui lòng nhập email và mật khẩu.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        'http://192.168.1.5:3000/login/checklogin',
        {
          email: isEmail,
          password: isPassword,
        },
      );

      const {token, user, message} = response.data;

      if (response.data.status === 200) {
        // Lưu thông tin người dùng và token vào Redux store và AsyncStorage
        await AsyncStorage.setItem('token', token);
        dispatch(loginSuccess({user, token}));

        // Điều hướng đến màn hình chính sau khi đăng nhập
        navigation.navigate('ButtomTab');
      } else {
        setError(message);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Đăng nhập thất bại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView>
      <ImageBackground
        source={require('../../assets/img/backgroud.png')}
        style={styles.container}>
        <View style={{marginTop: '40%'}}>
          <Text style={styles.textHeader}>Đăng nhập</Text>
          <Text style={{marginTop: 30, marginHorizontal: 30, fontSize: 18}}>
            Rất vui được gặp bạn!
          </Text>

          {/* Input Fields */}
          <View
            style={{
              marginTop: 30,
              height: 160,
              marginHorizontal: '8%',
              justifyContent: 'space-between',
            }}>
            <Text style={{color: 'black'}}>Email</Text>
            <View style={styles.itemInput}>
              <View style={styles.icon}>
                <Icon name="mail" color="black" size={24} />
              </View>
              <CusttomTextInput
                value={isEmail}
                onChangeText={setEmail}
                label="Nhập email:"
              />
            </View>

            <Text style={{color: 'black'}}>Mật khẩu</Text>
            <View style={styles.itemInput}>
              <View style={styles.icon}>
                <Icon name="lock" color="black" size={24} />
              </View>
              <CusttomTextInput
                value={isPassword}
                onChangeText={setPassword}
                label="Nhập mật khẩu:"
                secureTextEntry={!isPasswordVisible}
              />
              <TouchableOpacity style={styles.iconEye} onPress={showPassword}>
                <Icon
                  name={isPasswordVisible ? 'eye-off' : 'eye'}
                  color="black"
                  size={24}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Forgot Password Link */}
          <View
            style={{
              alignItems: 'flex-end',
              marginHorizontal: 25,
              marginVertical: 10,
            }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('ChangePassword')}>
              <Text style={{color: '#FF622E'}}>Quên mật khẩu!</Text>
            </TouchableOpacity>
          </View>

          {/* Login Button */}
          <View style={styles.itemButton}>
            <TouchableOpacity
              style={styles.button}
              onPress={handleLogin}
              disabled={loading}>
              <Text style={{fontSize: 25, color: 'white'}}>
                {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
              </Text>
            </TouchableOpacity>

            {/* Display error message if any */}
            {error ? (
              <Text style={{color: 'red', textAlign: 'center'}}>{error}</Text>
            ) : null}

            {/* Register Link */}
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Text>Nếu chưa có tài khoản!</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={{color: 'blue'}}> Đăng ký</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  textHeader: {
    fontSize: 35,
    color: 'black',
    alignSelf: 'center',
    fontWeight: '500',
  },
  itemInput: {
    height: 50,
    borderColor: 'black',
    borderWidth: 1,
    flexDirection: 'row',
    borderRadius: 5,
  },
  icon: {
    justifyContent: 'center',
    marginStart: 10,
  },
  iconEye: {
    justifyContent: 'center',
    marginHorizontal: -5,
  },
  itemButton: {
    justifyContent: 'space-evenly',
    height: 170,
  },
  button: {
    height: 50,
    backgroundColor: '#14AB87',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 30,
    borderRadius: 10,
  },
});

export default Login;
