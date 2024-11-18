import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';

const ProductItem = ({product}) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageItem}>
        {/* Thay thế hình ảnh tĩnh bằng dữ liệu từ props */}
        <Image
          resizeMode="cover" // Đảm bảo hình ảnh sẽ phủ toàn bộ container mà không bị méo
          source={{uri: product.image_url[0]}} // Giả sử mỗi sản phẩm có ít nhất một ảnh
          style={styles.image}
        />
      </View>

      <View>
        {/* Hiển thị tên sản phẩm từ props */}
        <Text style={styles.nameProduct}>
          {String(product.name_pr || '')}
        </Text>{' '}
        {/* Đảm bảo là chuỗi */}
      </View>

      <View style={styles.itemCapacity}>
        {/* Nếu có capacity, hiển thị */}
        <TouchableOpacity style={styles.capacity}>
          <Text>{String(product.capacity || 'Chưa có dung lượng')}</Text>{' '}
          {/* Đảm bảo là chuỗi */}
        </TouchableOpacity>
      </View>

      <View style={styles.priceItem}>
        {/* Hiển thị giá sản phẩm từ props */}
        <Text style={styles.price}>
          {product.price
            ? String(product.price.toLocaleString())
            : 'Chưa có giá'}{' '}
          đ
        </Text>
        {/* Giỏ hàng - thêm chức năng nếu cần */}
        <TouchableOpacity style={styles.cartButton}>
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
    backgroundColor: 'white', // Thêm nền trắng cho sản phẩm
  },
  imageItem: {
    width: 150,
    height: 140,
    alignSelf: 'center',
    marginTop: 10, // Thêm khoảng cách trên để ảnh không dính vào phía trên
  },
  image: {
    width: '100%', // Đảm bảo ảnh chiếm hết chiều rộng của container
    height: '100%', // Đảm bảo ảnh chiếm hết chiều cao của container
    borderRadius: 5, // Thêm bo góc cho ảnh
  },
  nameProduct: {
    fontSize: 16,
    color: 'black',
    paddingStart: 10,
    marginTop: 5, // Thêm khoảng cách để tên không dính vào ảnh
    fontWeight: 'bold', // Làm đậm tên sản phẩm
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
    fontSize: 14,
    padding: 5,
    borderRadius: 4,
  },
  priceItem: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold', // Làm đậm giá để dễ nhìn hơn
    color: 'green', // Màu sắc cho giá
  },
  cartButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
