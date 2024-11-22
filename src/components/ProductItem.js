import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const ProductItem = ({product}) => {
  // Kiểm tra đường dẫn hình ảnh
  if (!product || !product.image_url) {
    console.log('Product or image_url is undefined');
    return null; // Hoặc bạn có thể render một fallback UI nào đó
  }
  console.log('Product image_url:', product.image_url);

  return (
    <View style={styles.container}>
      <View style={styles.imageItem}>
        <Image
          resizeMode="cover"
          source={require('../assets/img/produt1.png')}   // Kiểm tra đúng URL
          style={styles.image}
        />
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.nameProduct}>{product.name_pr}</Text>
        <View style={styles.itemCapacity}>
          <TouchableOpacity style={styles.capacity}>
            <Text>{product.capacity}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.priceItem}>
          <Text style={styles.priceText}>
            {product.price ? `${product.price.toLocaleString()}đ` : 'Liên hệ'}
          </Text>
          <TouchableOpacity style={styles.cartButton}>
            <Icon name="shopping-cart" color="black" size={24} />
          </TouchableOpacity>
        </View>
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
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  imageItem: {
    width: 150,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  image: {
    width: 100,
    height: 130,
    borderRadius: 8,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingTop: 5,
  },
  nameProduct: {
    fontSize: 18, // Giảm size nếu quá lớn
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemCapacity: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 5,
  },
  capacity: {
    borderColor: 'gray',
    borderWidth: 1,
    color: 'gray',
    fontSize: 14,
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderRadius: 4,
  },
  priceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  cartButton: {
    padding: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 50,
  },
});


