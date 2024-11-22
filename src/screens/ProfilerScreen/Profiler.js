import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';

const Profiler = ({navigation}) => {
  return (
    <View>
      {/**Header */}
      <View style={styles.header}>
        <View style={{flex: 1, alignItems: 'center'}}>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black'}}>
            Hồ sơ
          </Text>
        </View>
        <View>
         <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Icon name="log-out" size={25} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
      {/**Avatar */}
      <View style={styles.imageBox}>
        <View style={{alignSelf:'center',borderRadius:30,paddingHorizontal:10}}>
          <Image
            source={require('../../assets/img/logo.png')}
            style={styles.image}
          />
        </View>
        <View style={{alignSelf:'center',}}>
          <Text style={{fontSize:14, color:'black'}}>Võ Công Nghiệp</Text>
          <Text style={{fontSize:12}}>vocongnghiep03@gmail.com</Text>

        </View>
      </View>
      {/**Button */}
      <View style={{height:"60%",justifyContent:'space-evenly'}}>
     
        <TouchableOpacity style={styles.button}>
          <Text style={styles.text}>Đơn hàng của tôi</Text>
          <Icon name="chevron-right" size={25} color={"black"}/>
        </TouchableOpacity>
     
        <TouchableOpacity style={styles.button}>
          <Text style={styles.text}>Địa chỉ giao hàng</Text>
          <Icon name="chevron-right" size={25} color={"black"}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.text}>Phương thức thanh toán</Text>
          <Icon name="chevron-right" size={25} color={"black"}/>
        </TouchableOpacity>
        <View style={styles.button}>
          <Text style={styles.text}>Cài đặt</Text>
          <TouchableOpacity>
          
          <Icon name="chevron-right" size={27} color={"black"}/>
        </TouchableOpacity>
        </View>
        
      
      </View>
      
    </View>
  );
};

export default Profiler;

const styles = StyleSheet.create({
  header: {
    borderWidth: 0.2,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  imageBox: {
    height: 80,
   
    marginTop: 10,
     flexDirection: 'row'
  },
  image: {
    height: 60,
    width: 60,
    
    
  },
  button:{
    flexDirection:'row',
    justifyContent:'space-between',
    borderWidth:0.1,
    backgroundColor:'white',
    height:50,
    width:'80%',
    alignSelf:'center',
    padding:10,
    alignItems:'center',
   
    // Thêm bóng cho Android
    elevation: 10, // Độ dày bóng
  }, 
  text:{
    color:'black'
  }
});
