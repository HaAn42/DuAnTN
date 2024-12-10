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
import {loginSuccess} from '../../redux/slices/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {
  const dispatch = useDispatch();
  const {isLoggedIn} = useSelector(state => state.auth);

  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isEmail, setEmail] = useState('');
  const [isPassword, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Chuyển đổi hiển thị mật khẩu
  const showPassword = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  useEffect(() => {
    console.log('Kiểm tra trạng thái đăng nhập:', isLoggedIn);
    if (isLoggedIn) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'ButtomTab' }],
      });
    }
  }, [isLoggedIn]);
  
  // Xử lý logic đăng nhập
  const handleLogin = async () => {
    if (!isEmail || !isPassword) {
      setError('Vui lòng nhập email và mật khẩu.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        'http://192.168.1.229:3000/login/checklogin',
        {
          email: isEmail,
          password: isPassword,
        }
      );
    
      console.log('Phản hồi từ server:', response.data);
    
      const { status, token, user, message } = response.data;
    
      if (status === 200 && token && user) {
        console.log('User:', user);
        console.log('Token:', token);
    
        // Lưu token vào AsyncStorage
        await AsyncStorage.setItem('token', token);
    
        // Lưu user nếu hợp lệ
        if (user) {
          await AsyncStorage.setItem('user', JSON.stringify(user));
        } else {
          console.log('User không hợp lệ:', user);
        }
    
        // Lưu Redux state
        dispatch(loginSuccess({ user, token }));
    
        // Điều hướng sau khi đăng nhập thành công
        navigation.navigate('ButtomTab');
      } else {
        setError(message || 'Thông tin đăng nhập không hợp lệ');
      }
    } catch (err) {
      console.error('Lỗi đăng nhập:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Đăng nhập thất bại');
    } finally {
      setLoading(false);
    }
    
  };

  // Xóa email khi người dùng bấm vào biểu tượng "x"
  const clearEmail = () => setEmail('');

  return (
    <SafeAreaView>
      <ImageBackground
        source={require('../../assets/img/backgroud.png')
        }
          style={styles.container}
      >
        <View style={{marginTop: '20%',}}>
          <Text style={styles.textHeader}>Đăng nhập</Text>
          <Text style={{marginVertical: 30,  fontSize: 18, marginHorizontal:20}}>
            Rất vui được gặp bạn!
          </Text>

          {/* Các ô nhập */}
          <View style={styles.inputContainer}>
            <Text style={styles.text}>Email</Text>
            <View style={styles.itemInput}>
              <View style={styles.icon}>
                <Icon name="mail" color="black" size={24} />
              </View>
              <CusttomTextInput
                value={isEmail}
                onChangeText={setEmail}
                label="Nhập email:"
                style={styles.input}
              />
              {isEmail ? (
                <TouchableOpacity style={styles.clearIcon} onPress={clearEmail}>
                  <Icon name="x" size={20} color="gray" />
                </TouchableOpacity>
              ) : null}
            </View>

            <Text style={styles.text}>Mật khẩu</Text>
            <View style={styles.itemInput}>
              <View style={styles.icon}>
                <Icon name="lock" color="black" size={24} />
              </View>
              <CusttomTextInput
                value={isPassword}
                onChangeText={setPassword}
                label="Nhập mật khẩu:"
                secureTextEntry={!isPasswordVisible}
                style={styles.input}
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

          {/* Liên kết quên mật khẩu */}
          <View style={styles.forgotPasswordLink}>
            <TouchableOpacity onPress={() => navigation.navigate('MailOtp')}>
              <Text style={{color: '#FF622E'}}>Quên mật khẩu!</Text>
            </TouchableOpacity>
          </View>

          {/* Nút đăng nhập */}
          <View style={styles.itemButton}>
            <TouchableOpacity
              style={styles.button}
              onPress={handleLogin}
              disabled={loading}>
              <Text style={{fontSize: 25, color: 'white'}}>
                {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
              </Text>
            </TouchableOpacity>

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            {/* Liên kết đăng ký */}
            <View style={styles.registerLink}>
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
    height:'100%',
   
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
    flexDirection: 'row',
    borderRadius: 5,
    alignItems: 'center',
    borderWidth: 1,
    marginHorizontal: 20,
    marginBottom: 15,
    width:"90%",
    
  },
  icon: {
    justifyContent: 'center',
    marginStart: 5,
    
  },
  iconEye: {
    alignItems: 'flex-end',
    flex:1,
    marginRight:5
    
  },
  
  input: {
    flex: 1,
    height: 40, // Adjust height as needed
    width:220
    
  },
  clearIcon: {
    justifyContent: 'center',
    marginRight: 10,
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
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
  forgotPasswordLink: {
    alignItems: 'flex-end',
    marginHorizontal: 25,
    marginVertical: 10,
  },
  registerLink: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  text:{
    color: 'black', 
    marginHorizontal:20,
    marginBottom:10,
  }
});

export default Login;
