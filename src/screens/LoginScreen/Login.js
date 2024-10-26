import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Switch,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import CusttomTextInput from '../../components/CusttomTextInput';

const Login = ({ navigation }) => {
  const [isPasswordVisible, setPasswordVisible]=useState(false);
  const [isSelected, setSelection] = useState(false);
  const [isEmail, setEmail] = useState('');
  const [isPassword, setPassword] = useState('');
  const showPassword = ()=>{
    setPasswordVisible(!isPasswordVisible)
  }
  return (
    <SafeAreaView>
      <ImageBackground
        source={require('../../assets/img/backgroud.png')}
        style={styles.container}>
        <View style={{marginTop: '40%'}}>
          <Text style={styles.textHeader}>Đăng nhập</Text>
          <Text style={{marginTop: 30, marginHorizontal: 30, fontSize:18}}>
            Rất vui được gặp bạn!
          </Text>

          {/* Input */}

          <View
            style={{
              marginTop: 30,
              height: 160,
              marginHorizontal: '8%',
              
              justifyContent:'space-between'
            }}>
              {/* Input Email*/}
            <Text style={{color: 'black'}}>Email</Text>
            <View style={styles.itemInput}>
              <View style={styles.icon}>
                <Icon name="mail" color="black" size={24} />
              </View>
              <View>
                <CusttomTextInput
                  value={isEmail}
                  onChangeText={setEmail}
                  label=" Nhập email:"
                />
              </View>
            </View>
            {/* Input mật khẩu */}
            <Text style={{color: 'black'}}>Mật khẩu</Text>
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
             
              <TouchableOpacity style={styles.icon} onPress={showPassword}>
                <Icon name={isPasswordVisible ? 'eye-off':'eye'}
                 color="black" size={24} />
              </TouchableOpacity>
            </View>
          </View>
          {/*Luu tai khoan */}
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: '8%',
              marginTop: 20,
              justifyContent: 'space-between',
            }}>
            <View style={{flexDirection: 'row'}}>
              <Switch
                value={isSelected}
                onValueChange={setSelection}
                style={styles.switch}
              />
              <Text>Nhớ tài khoản!</Text>
            </View>
            <View>
              {/**quen mat khau */}
              <TouchableOpacity onPress={()=> navigation.navigate('ChangePassword')}>
                <Text style={{color: '#FF622E'}}>Quên mật khẩu!</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.itemButton}>
            {/** button dang nhap */}
            <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate('ButtomTab')}>
              <Text style={{fontSize: 25, color: 'white',}}>Đăng nhập</Text>
            </TouchableOpacity>

            {/**buttonText dang ky */}
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Text>Nếu chưa có tài khoản!</Text>
              <TouchableOpacity onPress={()=> navigation.navigate('Register')}>
                <Text style={{color: 'blue'}}> Đăng ký</Text>
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
  switch: {
    alignSelf: 'flex-start',
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
  itemInput: {
    height: 50,
    borderColor: 'black',
    borderWidth: 1,
    flexDirection: 'row',
    borderRadius: 5,
 
  },
  icon: {
    justifyContent: 'center',

    marginHorizontal:10
  },
  
});
