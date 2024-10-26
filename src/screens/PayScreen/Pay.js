import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import PaymentMethod from '../PaymentMethodScreen/PaymentMethod';

const Pay = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.boxHeader}>
        <TouchableOpacity>
          <Icon name="arrow-left" size={25} color="black" />
        </TouchableOpacity>
        <View style={{flex: 1, alignItems: 'center'}}>
          <Text style={{color: 'black', fontSize: 19}}>
            Xác nhận thanh toán
          </Text>
        </View>
      </View>
      <Text style={{color: 'black', marginVertical: 15}}>
        Thông tin đơn hàng
      </Text>
      <View style={styles.itemProduct}>
        <View style={{width: 80, height: 100}}>
          <Image
            source={require('../../assets/img/produt1.png')}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        <View>
          <Text>Tên sản phẩm: Iphone 15</Text>
          <Text>Màu: Xanh</Text>
          <Text
            style={{borderWidth: 0.5, width: 52, padding: 3, borderRadius: 6}}>
            128GB{' '}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: 200,
            }}>
            <Text style={{width: 120}}>Số lượng: 1</Text>
            <Text>Giá: 18.000.000</Text>
          </View>
        </View>
      </View>
      <View style={styles.address}>
        <Text style={styles.text}>Địa chỉ giao hàng</Text>
        <TouchableOpacity style={{alignSelf: 'flex-end'}}>
          <Text style={{color: 'blue', paddingEnd: 10}}>Thay đổi </Text>
        </TouchableOpacity>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.text}>Nghiệp - </Text>
          <Text style={styles.text}>0378834756</Text>
        </View>
        <Text>Thôn Trường định 2 Xã Bình Hòa Huyện Tây Sơn Tỉnh Bình Định</Text>
        <View
          style={{
            alignSelf: 'center',
            width: 150,
            borderWidth: 1,
            borderColor: 'gray',
            marginVertical: 4,
          }}></View>
        <Text style={styles.text}>Hình thức giao hàng</Text>
        <Text>Giao hàng tiết kiệm</Text>
      </View>

      <PaymentMethod/>
      <View style={styles.price}>
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <Text>Tạm tính:</Text>
            <Text>15.000.000</Text>
        </View>
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <Text>Phí vận chuyển:</Text>
            <Text>0</Text>
        </View>
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <Text>Thành tiền:</Text>
            <Text style={styles.text}>15.000.000</Text>
        </View>
      </View>
      <View>
        <TouchableOpacity style={styles.button}>
          <Text style={{color:'#D3D3D3', fontSize:20, alignSelf:'center'}}>Thanh toán </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Pay;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    flexDirection: 'column',
    height: '95%',
    
  },
  boxHeader: {
    marginVertical: 10,
    alignSelf: 'flex-start',
    flexDirection: 'row',
  },
  itemProduct: {
    marginVertical: 10,
    borderWidth: 0.5,
    height: 97,
    borderRadius: 5,
    flexDirection: 'row',
  },
  image: {
    width: 70,
    height: 96,
    alignSelf: 'center',
    
  },
  address: {
    borderWidth: 0.5,
    height: 155,
    padding: 5,
    borderRadius: 5,
    marginVertical: 10,

  },
  text: {
    color: 'black',
    fontSize:16
  },
  payment: {
    height: 90,
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 20,

  },
  price: {
    borderRadius: 8,
    borderWidth: 0.5,
    height: 90,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginVertical: 20,

  },
  button:{
    height:50,
    backgroundColor:'#14AB87',
    width:'80%',
    justifyContent:'center',
    borderRadius:10,
    alignSelf:'center',
    elevation: 5,
    marginVertical: 20,

  }
});
