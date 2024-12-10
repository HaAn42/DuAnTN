import Icon from 'react-native-vector-icons/Ionicons';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Thêm import này
import { useEffect } from 'react'; // Import useEffect nếu chưa có
import axios from 'axios';

const ChangePasswordScreen = ({ navigation }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState(''); // email người dùng

  useEffect(() => {
    const fetchEmail = async () => {
      const storedEmail = await AsyncStorage.getItem('userEmail');
      if (storedEmail) {
        setEmail(storedEmail);
      } else {
        alert("Không tìm thấy email. Vui lòng thử lại.");
        navigation.goBack();
      }
    };
    fetchEmail();
  }, []);

  const handleChangePassword = async () => {
    console.log("Gửi email cập nhật mật khẩu:", email);

    if (newPassword === confirmPassword) {
      try {
        const response = await axios.post('http://192.168.1.229:3000/reset-password/update-password', {
          email: email,
          newPassword: newPassword,
        });

        if (response.status === 200) {
          alert('Mật khẩu đã được cập nhật thành công');
          navigation.navigate('Login');
        } else {
          alert('Lỗi khi cập nhật mật khẩu');
        }
      } catch (error) {
        console.error('Lỗi Axios:', error.response ? error.response.data : error.message);
        alert('Có lỗi xảy ra. Vui lòng thử lại.');
      }
    } else {
      alert('Mật khẩu không khớp');
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-back-outline" size={25} color="black" />
        </TouchableOpacity>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={styles.title}>Đổi mật khẩu</Text>
        </View>
      </View>

      <View style={{ height: 150, alignSelf: 'center', marginVertical: 30 }}>
        <Image
          source={require('../../assets/img/domatk.png')}
          style={{ height: 150, width: 150, borderRadius: 50 }}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Mật khẩu mới"
          secureTextEntry={!showNewPassword}
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <TouchableOpacity
          onPress={() => setShowNewPassword(!showNewPassword)}
          style={styles.eyeIconContainer}>
          <Icon
            name={showNewPassword ? 'eye' : 'eye-off'}
            size={20}
            style={styles.eyeIcon}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Xác nhận lại mật khẩu"
          secureTextEntry={!showConfirmPassword}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity
          onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          style={styles.eyeIconContainer}>
          <Icon
            name={showConfirmPassword ? 'eye' : 'eye-off'}
            size={20}
            style={styles.eyeIcon}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.confirmButton}
        onPress={handleChangePassword}>
        <Text style={styles.buttonText}>Xác nhận đổi mật khẩu</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChangePasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: 'black',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: 10,
  },
  input: {
    height: 50,
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingRight: 40,
  },
  eyeIconContainer: {
    position: 'absolute',
    right: 10,
    top: 15,
  },
  eyeIcon: {
    color: '#888',
  },
  confirmButton: {
    marginTop: 50,
    backgroundColor: '#14AB87',
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
