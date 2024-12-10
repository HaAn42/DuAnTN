import React, { useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
const EmailOTP = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handleSubmit = async () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (emailRegex.test(email)) {
      try {
        setIsLoading(true);
        console.log('Đang kiểm tra email...');
        
        const checkEmailResponse = await axios.post('http://192.168.1.229:3000/reset-password/check-email', { email });
        console.log("Kết quả kiểm tra email: ", checkEmailResponse.data);
  
        if (checkEmailResponse.data.exists) {
          const response = await axios.post('http://192.168.1.229:3000/reset-password/send-otp', { email });
          console.log("Kết quả gửi OTP: ", response.data);
  
          if (response.data.message === 'Mã OTP đã được gửi đến email của bạn.') {
            // Lưu email vào AsyncStorage
            await AsyncStorage.setItem('userEmail', email);
            Alert.alert("Mã OTP đã được gửi", "Vui lòng kiểm tra hộp thư đến của bạn.");
            console.log("Đang điều hướng đến màn hình CodeMail...");
            // Điều hướng đến CodeMail
            navigation.navigate('CodeMail');
          }
        } else {
          Alert.alert("Lỗi", "Email này không tồn tại trong hệ thống.");
        }
      } catch (error) {
        console.error("Lỗi khi gửi OTP: ", error);
        Alert.alert("Lỗi", "Có lỗi xảy ra khi gửi OTP. Vui lòng thử lại.");
      } finally {
        setIsLoading(false);
      }
    } else {
      Alert.alert("Lỗi", "Vui lòng nhập địa chỉ email hợp lệ.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" size={25} color="black" />
        </TouchableOpacity>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={styles.title}>Đổi mật khẩu</Text>
        </View>
      </View>
      <Text style={styles.title}>Nhập Gmail của bạn để nhận mã OTP</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập Gmail của bạn"
        keyboardType="email-address"
        value={email}
        onChangeText={handleEmailChange}
      />
      <TouchableOpacity title={isLoading ? "Đang gửi..." : "Gửi mã OTP"} onPress={handleSubmit} disabled={isLoading} style={styles.button}>
        <Text style={{color: 'white', alignSelf: 'center', paddingTop: 5}}>Xác nhận</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
    borderRadius: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  button: {
    alignItems:'center',  
    width: 90,
    height: 30,
    backgroundColor: '#14AB87',
    borderRadius: 10,
  },
});

export default EmailOTP;
