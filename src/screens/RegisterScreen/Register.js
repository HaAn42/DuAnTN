import { ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, {useState} from 'react'
import Icon from 'react-native-vector-icons/Feather';
import CusttomTextInput from '../../components/CusttomTextInput';

const Register = ({ navigation }) => {
  const [isPasswordVisible, setPasswordVisible]=useState(false);
  const [username, setUsername] = useState('');
  const [isEmail, setEmail] = useState('');
  const [isPassword, setPassword] = useState('');
  const [RePassword, setRePassword]= useState('');
  const [isRePasswordVisible, setRePasswordVisible]=useState(false);
  
  const showPassword = ()=>{
    setPasswordVisible(!isPasswordVisible)
  }
  const showRePassword = ()=>{
    setRePasswordVisible(!isRePasswordVisible)
  }
  return (
  
    <ScrollView>
    <ImageBackground
      source={require('../../assets/img/backgroud.png')}
      style={styles.container}>
      <View style={{marginTop: '40%'}}>
        <Text style={styles.textHeader}>Đăng ký </Text>
        

        {/* Input */}

        <View
          style={{
            marginTop: 30,
            marginHorizontal: '8%',
            height:'60%',
            justifyContent:'space-between'
          }}>
             
            {/* Input Tên đăng nhập*/}
            <Text style={styles.text}>Tên đăng nhập</Text>
            <View style={styles.itemInput}>
            <View style={styles.icon}>
              <Icon name="user" color="black" size={24} />
            </View>
            <View>
              <CusttomTextInput
                value={username}
                onChangeText={setUsername}
                label=" Tên đăng nhập:"
              />
            </View>
          </View>
            {/* Input Email*/}
          <Text style={styles.text}>Email</Text>
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
          <Text style={styles.text}>Mật khẩu</Text>
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
          {/* Input nhập lại mật khẩu */}
          <Text style={styles.text}>Nhập lại mật khẩu</Text>
          <View style={styles.itemInput}>
            <View style={styles.icon}>
              <Icon name="lock" color="black" size={24} />
            </View>

            <View>
              <CusttomTextInput
                value={RePassword}
                onChangeText={setRePassword}
                label="Nhập lại mật khẩu:"
                secureTextEntry={!isRePasswordVisible}
              />
            </View>
           
            <TouchableOpacity style={styles.icon} onPress={showRePassword}>
              <Icon name={isRePasswordVisible ? 'eye-off':'eye'}
               color="black" size={24} />
            </TouchableOpacity>
          </View>
        </View>
     
        <View style={styles.itemButton}>
          {/** button dang nhap */}
          <TouchableOpacity style={styles.button}>
            <Text style={{fontSize: 25, color: 'white',}}>Đăng ký</Text>
          </TouchableOpacity>

          {/**buttonText dang ky */}
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Text>Nếu đã có tài khoản!</Text>
            <TouchableOpacity onPress={()=> navigation.navigate('Login')}>
              <Text style={{color: 'blue'}}> Đăng nhập</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  </ScrollView>
  )
}

export default Register

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
 text:{
  color:'black'
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
})