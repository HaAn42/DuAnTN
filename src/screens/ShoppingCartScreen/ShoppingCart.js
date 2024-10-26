import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import ShoppinCartItem from '../../components/ShoppinCartItem';
import Icon from 'react-native-vector-icons/AntDesign';
import {ScrollView} from 'react-native-gesture-handler';

const ShoppingCart = ({navigation}) => {
  const [select, setSelection] = useState(false);

  const selecCheckBox = () => {
    setSelection(!select);
  };

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Icon name="left" size={25} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Giỏ hàng</Text>
        <TouchableOpacity>
          <Text style={styles.editText}>Chỉnh sửa</Text>
        </TouchableOpacity>
      </View>
      <View></View>

      <ShoppinCartItem />

      <View
        style={{
          
          marginHorizontal: 20,
          height: 50,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={selecCheckBox}
            style={{marginEnd: 5, marginHorizontal: 5}}>
            <Icon name={select ? 'checkcircle' : 'checkcircleo'} size={20} />
          </TouchableOpacity>
          <Text>Chọn tất cả</Text>
        </View>
        <View>
          <Text style={{color:'black'}}>Giá:25.000.000</Text>
        </View>
        {/**buttom */}
        <View>
          <TouchableOpacity style={styles.button}>
            <Text style={{color: 'white'}}>Thanh toán (2)</Text>
          </TouchableOpacity>
        </View>
        
      </View>
    </SafeAreaView>
  );
};

export default ShoppingCart;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginEnd: 10,
    padding: 10,
  },
  backButton: {
    // Thêm kiểu dáng nếu cần
  },
  title: {
    fontSize: 20,
    color: 'black',
  },
  editText: {
    fontSize: 16,
    color: 'blue',
  },
  button: {
    backgroundColor: 'red',
    height: 40,
    width: 130,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
