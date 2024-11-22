import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const SuccessfulPay = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={{fontSize: 25, color: 'black', alignSelf: 'center'}}>
        Đặt hàng thành công!
      </Text>
      <View style={styles.image}>
        <Image style={{width:150, height:150}} source={require('../../assets/img/logo.png')}/>
      </View>
      <View>
        <Text style={styles.text}>
          Đơn hàng của bạn sẽ được giao sớm. Cảm ơn bạn đã chọn ứng dụng của
          chúng tôi!
        </Text>
      </View>
      <View >
        <TouchableOpacity
          style={{
            backgroundColor: 'black',
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 10,
            borderRadius: 10,
          }}>
          <Text style={{fontSize: 20, color: 'white'}}>Theo dõi đơn hàng</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{backgroundColor: '#14AB87',
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 10,
            borderRadius: 10,
            width:300}}
            onPress={()=>navigation.navigate('HomeScreen')}>
          <Text style={{fontSize: 20, color: 'white'}}>Quay lại trang chủ</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SuccessfulPay;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center', // Căn giữa theo chiều ngang
    backgroundColor: 'white',
    
    flex:1,
    justifyContent:'space-evenly'
  },
  image: {
    height: 150,
    width: 150,
    borderWidth:1,
    alignSelf: 'center',
    
  },

  text: {
    color: 'black',
    fontSize: 18,
   
    
  },
});
