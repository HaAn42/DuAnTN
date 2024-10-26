import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import CusttomTextInput from '../../components/CusttomTextInput';

const Address = () => {
  return (
    <SafeAreaView>
        <View style={styles.container}>

        
      <View style={styles.boxHeader}>
        <TouchableOpacity>
          <Icon name="arrow-left" size={25} color="black" />
        </TouchableOpacity>
        <View style={{flex: 1, alignItems: 'center'}}>
          <Text style={{color: 'black', fontSize: 19}}>Địa chỉ giao hàng</Text>
        </View>
      </View>

      <View style={{ flexDirection:'column'}}>
        
        <View style={styles.itemInput}>
          <CusttomTextInput label={'Tên người nhận'} />
        </View>

        <View style={styles.itemInput}>
          <CusttomTextInput label={'Địa chỉ giao hàng'} />
        </View>

        <View style={styles.itemInput}>
          <CusttomTextInput label={'Tỉnh/ Thành Phố'} />
        </View>

        <View style={styles.itemInput}>
          <CusttomTextInput label={'Quận/ Huyện'} />
        </View>

        <View style={styles.itemInput}>
          <CusttomTextInput label={'Xã/ phường'} />
        </View>
      </View>
      <View>
        <TouchableOpacity style={styles.button}>
          <Text style={{color:'#D3D3D3', fontSize:20, alignSelf:'center'}}>Lưu địa chỉ</Text>
        </TouchableOpacity>
      </View>
      </View>
    </SafeAreaView>
  );
};

export default Address;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    height: '95%',
    justifyContent:'space-between'
  },
  boxHeader: {
    marginTop: 10,
    alignSelf: 'flex-start',
    flexDirection: 'row',
  },
  itemInput: {
    height: 50,
    borderColor: 'black',
    borderWidth: 1,
    flexDirection: 'row',
    borderRadius: 5,
    marginVertical:10
  },
  button:{
    height:50,
    backgroundColor:'#14AB87',
    width:'80%',
    justifyContent:'center',
    borderRadius:10,
    alignSelf:'center',
    elevation: 5,
  }
});
