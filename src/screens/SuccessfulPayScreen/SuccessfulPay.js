import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const SuccessfulPay = () => {
  return (
    <View style={styles.container}>
      <Text style={{fontSize: 40, color: 'black', alignSelf: 'center'}}>
        Thành Công!
      </Text>
      <View style={styles.image}>
        <Image source={require('../../assets/img/logo.png')}/>
      </View>
      <View>
        <Text style={styles.text}>
          Đơn hàng của bạn sẽ được giao sớm. Cảm ơn bạn đã chọn ứng dụng của
          chúng tôi!
        </Text>
      </View>
      <View>
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
            width:300}}>
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
    marginVertical:40,
    flex:1,
    justifyContent:'space-evenly'
  },
  image: {
    height: 280,
    width: 280,
    
    alignSelf: 'center',
    
  },

  text: {
    color: 'black',
    fontSize: 18,
    marginHorizontal:30,
    
  },
});
