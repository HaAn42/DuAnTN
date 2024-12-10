import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import CusttomTextInput from '../../components/CusttomTextInput';
import { Picker } from '@react-native-picker/picker'; 
import axios from 'axios';

const Register = ({ navigation }) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [isPassword, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const showPassword = () => setPasswordVisible(!isPasswordVisible);

  // Clear error message when the user starts typing
  useEffect(() => {
    if (error) {
      setError('');
    }
  }, [username, email, isPassword]);

  // Validate email format
  const validateEmail = (email) => {
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return emailRegex.test(email);
  };

  // Validate password strength
  const validatePassword = (password) => {
    return password.length >= 5; // Basic validation, you can enhance it
  };

  const handleRegister = async () => {
    // Validate fields
    if (!username || !email || !isPassword) {
      setError("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Email không hợp lệ.");
      return;
    }

    if (!validatePassword(isPassword)) {
      setError("Mật khẩu phải có ít nhất 8 ký tự.");
      return;
    }

    setLoading(true);
    setError(''); // Clear any previous error

    try {
      const response = await axios.post('http://192.168.1.229:3000/users/add', {
        username,
        email,
        password: isPassword,
        role,
      });

      if (response.data.status === 200) {
        navigation.navigate('Login');
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError('Đã xảy ra lỗi, vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView>
      <ImageBackground source={require('../../assets/img/backgroud.png')} style={styles.container}>
        <View style={{ marginTop: '20%' }}>
          <Text style={styles.textHeader}>Đăng ký</Text>

          {/* Display error message */}
          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          {/* Input Fields */}
          <View style={{ marginTop: 30, height: '60%', justifyContent: 'space-between' }}>

            {/* Input Tên đăng nhập */}
            <Text style={styles.text}>Tên đăng nhập</Text>
            <View style={styles.itemInput}>
              <View style={styles.icon}>
                <Icon name="user" color="black" size={24} />
              </View>
              <View>
                <CusttomTextInput
                  value={username}
                  onChangeText={setUsername}
                  label="Tên đăng nhập"
                  style={styles.input}
                />
              </View>
            </View>

            {/* Input Email */}
            <Text style={styles.text}>Email</Text>
            <View style={styles.itemInput}>
              <View style={styles.icon}>
                <Icon name="mail" color="black" size={24} />
              </View>
              <View>
                <CusttomTextInput
                  value={email}
                  onChangeText={setEmail}
                  label="Nhập email"
                  style={styles.input}
                />
              </View>
            </View>

            {/* Input Mật khẩu */}
            <View style={styles.inputContainer}>
              <Text style={styles.text}>Mật khẩu</Text>
            <View style={styles.itemInput}>
              <View style={styles.icon}>
                <Icon name="lock" color="black" size={24} />
              </View>
              <View>
                <CusttomTextInput
                  value={isPassword}
                  onChangeText={setPassword}
                  label="Nhập mật khẩu"
                  secureTextEntry={!isPasswordVisible}
                  style={styles.input}
                />
              </View>
              <TouchableOpacity style={styles.iconEye} onPress={showPassword}>
                <Icon name={isPasswordVisible ? 'eye-off' : 'eye'} color="black" size={24} />
              </TouchableOpacity>
            </View>

            </View>
            
            {/* Chọn vai trò */}
            <Text style={styles.text}>Chọn vai trò</Text>
            <View style={styles.itemInput}>
              <Picker
                selectedValue={role}
                onValueChange={(itemValue) => setRole(itemValue)}
                style={{ height: 50, width: '100%' }}
              >
                <Picker.Item label="Người dùng" value="user" />
                <Picker.Item label="Người bán" value="seller" />
              </Picker>
            </View>
          </View>

          <View style={styles.itemButton}>
            {/* Button đăng ký */}
            <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
              <Text style={{ fontSize: 20, color: 'white' }}>
                {loading ? 'Đang đăng ký...' : 'Đăng ký'}
              </Text>
            </TouchableOpacity>

            {/* Button đăng nhập */}
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Text>Nếu đã có tài khoản! </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={{ color: 'blue' }}>Đăng nhập</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    </ScrollView>
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
  inputContainer: {
    
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
  
  itemButton: {
    justifyContent: 'space-evenly',
    height: 170,
  },
  text: {
    marginBottom:10,
    color: 'black',
    marginHorizontal: 20,
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
    marginBottom: 10,
  },
});

export default Register;
