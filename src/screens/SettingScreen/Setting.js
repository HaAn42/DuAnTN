import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import CusttomTextInput from '../../components/CusttomTextInput';

const Setting = () => {
  return (
    <View style={styles.container}>

      <View style={styles.boxHeader}>
        <TouchableOpacity>
          <Icon name="arrow-left" size={25} color="black" />
        </TouchableOpacity>
        <View style={{flex: 1, alignItems: 'center'}}>
          <Text style={{color: 'black', fontSize: 19}}>Cài đặt</Text>
        </View>
      </View>

      <View>
        <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          marginVertical:20
        }}>
        <Text style={{color:'black'}}>Thông tin cá nhân</Text>
        <TouchableOpacity>
          <Icon name="edit-3" size={20} color="blue"/>
        </TouchableOpacity>
      </View>
      <View style={styles.itemInput}>
        <CusttomTextInput label={'vo cong nghiep'} />
      </View>
      <View style={styles.itemInput}>
        <CusttomTextInput label={'vocongnghiep03@gmail.com'} />
      </View>
      <View style={styles.itemInput}>
        <CusttomTextInput label={'0378834756'} />
      </View>
      </View>
      
      <View>
        <TouchableOpacity style={styles.button}>
          <Text style={{color: '#D3D3D3', fontSize: 20, alignSelf: 'center'}}>
            Xác nhận
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Setting;

const styles = StyleSheet.create({
  container: {
    
   
  },
  boxHeader: {
    marginVertical: 10,
    alignSelf: 'flex-start',
    flexDirection: 'row',
  },
  itemInput: {
    height: 50,
    borderColor: 'black',
    borderWidth: 1,
    flexDirection: 'row',
    borderRadius: 5,
    marginVertical: 10,
    marginHorizontal: 20,
    paddingHorizontal: 10,
  },
  button: {
    height: 50,
    backgroundColor: '#14AB87',
    width: '80%',
    justifyContent: 'center',
    borderRadius: 10,
    alignSelf: 'center',
    elevation: 5,
    marginVertical: 20,
  },
});
