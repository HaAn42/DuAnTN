import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/AntDesign'; // Kiểm tra biểu tượng có tồn tại

const ShoppinCartItem = () => {
  const [select, setSelection] = useState(false);
  
  const selecCheckBox = () => {
    setSelection(!select);
  };

  return (
    <View style={styles.container}>
      <View style={{ alignSelf: 'center', marginHorizontal: 10, width:25}}>
        <TouchableOpacity onPress={selecCheckBox}>
          <Icon name={select ? "checkcircle" : "checkcircleo"} size={20} />
        </TouchableOpacity>
      </View>
      <View>
        <Image
          style={styles.image}
          source={require('../assets/img/produt1.png')}
        />
      </View>

      <View style={styles.itemContent}>
        <Text style={styles.name}>IPhone 1</Text>
        <View style={styles.configurationItem}>
          <View style={styles.configuration}>
            <Text>128GB</Text>
          </View>
        </View>
        <View style={styles.quantityItem}>
          <TouchableOpacity>
            <Icon name="minuscircleo" size={20} />
          </TouchableOpacity>
          <Text style={{ color: 'black', alignSelf: 'center' }}>1</Text>
          <TouchableOpacity>
            <Icon name="pluscircleo" size={20} />
          </TouchableOpacity>
        </View>
        <View style={{ justifyContent: 'space-between' }}>
          <Text style={styles.price}>15.000.000đ</Text>
        </View>
      </View>
    </View>
  );
};

export default ShoppinCartItem;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: 'gray',
    height: 130,
    margin: 10,
    borderRadius: 6,
    flexDirection: 'row',
  },
  image: {
    height: 120,
    width: 90,
    margin: 5,
  },
  itemContent: {
    justifyContent: 'space-evenly',
    marginStart: 20,
  },
  name: {
    fontSize: 18,
    color: 'black',
  },
  configurationItem: {
    flexDirection: 'row',
    width: 200,
    justifyContent: 'space-between',
  },
  configuration: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 5,
    borderRadius: 5,
  },
  price: {
    color: 'black',
    fontSize: 18,
  },
  quantityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 30,
    width: 90,
    borderRadius: 5,
    alignItems:'center'
  },
});
