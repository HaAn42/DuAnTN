import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import CusttomTextInput from '../../components/CusttomTextInput';
import axios from 'axios';

const Login = ({ navigation }) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isEmail, setEmail] = useState('');
  const [isPassword, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Hàm hiển thị/ẩn mật khẩu
  const showPassword = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  // Hàm xử lý đăng nhập
  const handleLogin = async () => {
    // Kiểm tra nếu email hoặc mật khẩu bị bỏ trống
    if (!isEmail) {
      setError('Vui lòng nhập email.');
      return;
    }

    if (!isPassword) {
      setError('Vui lòng nhập mật khẩu.');
      return;
    }

    setLoading(true);
    try {
      // Gửi yêu cầu POST đến server
      const response = await axios.post('http://192.168.1.38:3000/login/checklogin', {
        email: isEmail,
        password: isPassword,
      });

      const { token, user, message } = response.data;

      if (response.data.status === 200) {
        // Lưu token và thông tin người dùng vào AsyncStorage hoặc Redux (nếu cần)
        console.log('Đăng nhập thành công', token, user);

        // Sau khi đăng nhập thành công, điều hướng đến màn hình chính
        navigation.navigate('ButtomTab'); // Đảm bảo bạn có màn hình 'ButtomTab' trong navigator
      } else {
        // Nếu đăng nhập thất bại, hiển thị thông báo lỗi
        setError(message);
      }
    } catch (err) {
      // Xử lý lỗi nếu email/mật khẩu không đúng
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
        <View style={{ marginTop: '40%' }}>
          <Text style={styles.textHeader}>Đăng nhập</Text>
          <Text style={{ marginTop: 30, marginHorizontal: 30, fontSize: 18 }}>
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
            {/* Input Email */}
            <Text style={{ color: 'black' }}>Email</Text>
            <View style={styles.itemInput}>
              <View style={styles.icon}>
                <Icon name="mail" color="black" size={24} />
              </View>
              <View>
                <CusttomTextInput
                  value={isEmail}
                  onChangeText={setEmail}
                  label="Nhập email:"
                  
                />
              </View>
            </View>

            {/* Input Password */}
            <Text style={{ color: 'black' }}>Mật khẩu</Text>
            <View style={styles.itemInput}>
              <View style={styles.icon}>
                <Icon name="lock" color="black" size={24} />
              </View>

              <View>
                <CusttomTextInput
                  value={isPassword}
                  onChangeText={setPassword}
                  label="Nhập mật khẩu:"
                  secureTextEntry={!isPasswordVisible}
                />
              </View>

              <TouchableOpacity style={styles.iconEye} onPress={showPassword}>
                <Icon
                  name={isPasswordVisible ? 'eye-off' : 'eye'}
                  color="black"
                  size={24}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{alignItems:'flex-end',marginHorizontal:25, marginVertical:10}}>
              {/**quen mat khau */}
              <TouchableOpacity onPress={()=> navigation.navigate('ChangePassword')}>
                <Text style={{color: '#FF622E'}}>Quên mật khẩu!</Text>
              </TouchableOpacity>
            </View>
          {/* Login Button */}
          <View style={styles.itemButton}>
            <TouchableOpacity
              style={styles.button}
              onPress={handleLogin}
              disabled={loading}>
              <Text style={{ fontSize: 25, color: 'white' }}>
                {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
              </Text>
            </TouchableOpacity>

            {/* Hiển thị thông báo lỗi nếu có */}
            {error ? <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text> : null}

            {/* Register Link */}
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Text>Nếu chưa có tài khoản!</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={{ color: 'blue' }}> Đăng ký</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Login;

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
