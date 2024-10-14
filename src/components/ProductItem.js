import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';

const ProductItem = ({ product }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageItem}>
        <Image
          resizeMode="cover"
          source={{ uri: product.image }} // Sử dụng URL từ props
          style={styles.image}
        />
      </View>

      <View>
        <Text style={styles.nameProduct}>{product.name}</Text>
      </View>

      <View style={styles.itemCapacity}>
        {product.capacities.map((capacity) => (
          <TouchableOpacity key={capacity} style={styles.capacity}>
            <Text>{capacity}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.priceItem}>
        <Text style={{ fontSize: 16 }}>
          {product.price}đ
        </Text>
        <TouchableOpacity>
          <Icon name="shopping-cart" color="black" size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  container: {
    width: 170,
    height: 240,
    borderColor: 'gray',
    borderWidth: 0.5,
    marginHorizontal: 5,
    marginVertical: 5,
    borderRadius: 7,
  },
  imageItem: {
    width: 150,
    height: 140,
    alignSelf: 'center',
  },
  image: {
    width: 90,
    height: 120,
    marginTop: 10,
    alignSelf: 'center',
  },
  nameProduct: {
    fontSize: 16,
    color: 'black',
    paddingStart: 10,
  },
  itemCapacity: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 2,
    marginTop: 10,
  },
  capacity: {
    borderColor: 'gray',
    borderWidth: 1,
    color: 'gray',
    fontSize: 15,
    padding: 2,
    borderRadius: 4,
  },
  priceItem: {
    flexDirection: 'row',
    margin: 10,
    justifyContent: 'space-between',
  },
});
