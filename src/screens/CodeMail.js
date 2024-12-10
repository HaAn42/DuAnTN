// screens/CodeMail.js
import React, { useState, useRef } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CodeMail = ({ route, navigation }) => {
  const email = route.params?.email || ''; // Lấy email từ tham số được truyền
 // Nhận email từ màn hình trước
  const [otp, setOtp] = useState(['', '', '', '']); // 4 ký tự OTP
  const [isOtpValid, setIsOtpValid] = useState(false); // Trạng thái mã OTP hợp lệ

  const otpInputs = useRef([]);

  // Hàm xử lý thay đổi mã OTP
  const handleOtpChange = (text, index) => {
    let newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
  };

  // Tự động di chuyển sang trường tiếp theo khi người dùng nhập
  const focusNextField = (nextFieldIndex) => {
    if (nextFieldIndex < otpInputs.current.length && otpInputs.current[nextFieldIndex]) {
      otpInputs.current[nextFieldIndex].focus();
    }
  };

  // Tự động di chuyển về trường trước đó khi người dùng xóa
  const focusPreviousField = (previousFieldIndex) => {
    if (previousFieldIndex >= 0 && otpInputs.current[previousFieldIndex]) {
      otpInputs.current[previousFieldIndex].focus();
    }
  };

  // Xử lý khi nhấn phím trong ô nhập mã OTP
  const handleKeyPress = (text, index) => {
    handleOtpChange(text, index);
    if (text && index < otp.length - 1) {
      focusNextField(index + 1);
    }
  };

  // Xử lý khi nhấn phím Backspace
  const handleBackspace = (index) => {
    if (otp[index] === '' && index > 0) {
      focusPreviousField(index - 1);
    }
  };

  // Gửi yêu cầu xác nhận OTP
  const verifyOtp = async () => {
    const enteredOtp = otp.join(''); // Nối các ký tự OTP lại thành chuỗi
    try {
      // Lấy email từ AsyncStorage
      const email = await AsyncStorage.getItem('userEmail');
      if (!email) {
        Alert.alert("Lỗi", "Không tìm thấy email. Vui lòng thử lại.");
        return;
      }
  
      console.log('Gửi email:', email);
      console.log('Gửi OTP:', enteredOtp);
      const response = await axios.post(
        'http://192.168.1.229:3000/reset-password/verify-otp', 
        { email, otp: enteredOtp },
        { headers: { 'Content-Type': 'application/json' } }
      );
  
      if (response.data.message === "OTP xác thực thành công") {
        setIsOtpValid(true);
        // Điều hướng đến màn hình nhập mật khẩu
        navigation.navigate("ChangePassword");
      } else {
        Alert.alert("Lỗi", "Mã OTP không hợp lệ");
      }
    } catch (error) {
      console.error("Lỗi xác thực OTP: ", error);
      Alert.alert("Lỗi", "Có lỗi khi xác thực OTP. Vui lòng thử lại.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" size={25} color="black" />
        </TouchableOpacity>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={styles.title}>Đổi mật khẩu</Text>
        </View>
      </View>

      {/* Nội dung */}
      <View style={styles.content}>
        <Text style={styles.description}>Vào kiểm tra hộp thư của gmail và nhập mã OTP</Text>

        {/* Mã OTP */}
        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              style={styles.otpInput}
              value={digit}
              onChangeText={(text) => handleKeyPress(text, index)}
              keyboardType="numeric"
              maxLength={1}
              onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key === 'Backspace') {
                  handleBackspace(index);
                }
              }}
              ref={(input) => { otpInputs.current[index] = input }} // Lưu tham chiếu các ô nhập liệu
            />
          ))}
        </View>

        {/* Gửi mã OTP */}
        <TouchableOpacity style={styles.submitButton} onPress={verifyOtp}>
          <Text style={styles.submitButtonText}>Xác nhận</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CodeMail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  title: {
    fontSize: 20,
    color: 'black',
  },
  content: {
    alignItems: 'center',
    marginTop: 30,
  },
  description: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 20,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: '#14AB87',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
  },
});
