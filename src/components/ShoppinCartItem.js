import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons'; // Kiểm tra biểu tượng có tồn tại

const ShoppinCartItem = ({ item, handleRemoveProduct, selected, setSelection }) => {
  const [quantity, setQuantity] = useState(item.quantity);

  const selecCheckBox = () => {
    setSelection(item._id); // Gửi ID của sản phẩm để cập nhật trạng thái chọn/deselect
  };

  const increaseQuantity = () => {
    if (quantity < 30) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ alignSelf: 'center', marginHorizontal: 10, width: 25 }}>
        <TouchableOpacity onPress={selecCheckBox}>
          <Icon name={selected ? "radio-button-on" : "radio-button-off"} size={20} />
        </TouchableOpacity>
      </View>
      <View>
        <Image
          style={styles.image}
          source={require('../assets/img/produt1.png')} // Use the dynamic image URL from the product
        />
      </View>

      <View style={styles.itemContent}>
        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
           <Text style={styles.name}>{item.name_pr}</Text>
        <TouchableOpacity onPress={() => handleRemoveProduct(item._id)}>
        <Icon name="close-outline" color="red" size={25}/>
      </TouchableOpacity>
        </View>
       
        <View style={styles.configurationItem}>
          <View style={styles.configuration}>
            <Text>{item.capacity}</Text>
          </View>
        </View>
        <View style={styles.quantityItem}>
          <TouchableOpacity onPress={decreaseQuantity}>
            <Icon name="remove-circle-outline" size={20} />
          </TouchableOpacity>
          <Text style={{ color: 'black', alignSelf: 'center' }}>{quantity}</Text>
          <TouchableOpacity onPress={increaseQuantity}>
            <Icon name="add-circle-outline" size={20} />
          </TouchableOpacity>
        </View>
        <View style={{ justifyContent: 'space-between' }}>
          <Text style={styles.price}>{item.price.toLocaleString()} VND</Text>
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
    alignItems: 'center',
  },
});
