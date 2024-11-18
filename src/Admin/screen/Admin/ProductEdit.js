import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';

const ProductEdit = () => {
  return (
    <ScrollView>
      <View style={{marginTop: 10, alignItems: 'center',flexDirection:'row'}}>
        
        <View style={{height:50,width:40, bottom:20, marginStart:20}}>
          <TouchableOpacity>
              <Icon name="chevron-left" size={30} color="black"/>
          </TouchableOpacity>
        
        </View>
        <View style={{ marginStart:'20%' }}>
          <TouchableOpacity style={{height:140, borderWidth:1, width:140, justifyContent:'center', alignItems:'center', borderRadius:70,}}>
            <Icon name="camera" size={60} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{justifyContent: 'space-evenly'}}>
        <View>
          <TextInput style={styles.textInput} placeholder="Tên sản phẩm" />
        </View>
        <View>
          <TextInput style={styles.textInput} placeholder="Thương hiệu" />
        </View>
        <View>
          <TextInput style={styles.textInput} placeholder="Dung lượng" />
        </View>
        <View></View>

        <View>
          <TextInput style={styles.textInput} placeholder="Giá" />
        </View>
        <View style={styles.textInput}>
          <TextInput placeholder="Màu" />
        </View>
        <View style={styles.textInputChiTiet}>
          <TextInput placeholder="Chi tiet san pham:" />
        </View>

          
          <View style={{
            
            justifyContent: 'space-between',
            marginVertical: 50,
            marginHorizontal: 20,
            alignSelf:'flex-end',
            width: '50%',
          }}>
            <TouchableOpacity style={styles.button}>
              <Text style={{fontSize:20, color:'#D9D9D9'}}> Thêm</Text>
            </TouchableOpacity>
          </View>
         
      </View>
    </ScrollView>
  );
};

export default ProductEdit;

const styles = StyleSheet.create({
  textInput: {
    marginVertical: 10,
    borderWidth: 1,
    height: 50,
    marginHorizontal: 20,
    borderRadius: 6,
    paddingStart: 10,
  },
  textInputChiTiet: {
    marginTop: 10,
    borderWidth: 1,
    height: 150,
    marginHorizontal: 20,
    borderRadius: 6,
  },
  button: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor:'#14AB87'
  },
});
