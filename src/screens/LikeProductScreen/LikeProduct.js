import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector, useDispatch } from 'react-redux';
import { addProductToCart } from '../../redux/slices/cartSlice'; // Import action cho giỏ hàng

const LikeProduct = ({ navigation }) => {
  // Lấy danh sách yêu thích từ Redux
  const likedProducts = useSelector(state => state.likeProducts.likedItems);
  const dispatch = useDispatch();

  // Hàm xử lý thêm sản phẩm vào giỏ hàng
  const handleAddToCart = (product) => {
    dispatch(addProductToCart(product));
    alert(`${product.name_pr} đã được thêm vào giỏ hàng`);
  };

  // Render sản phẩm yêu thích
  const renderItem = ({ item }) => (
    <View style={styles.itemProduct}>
      <View style={{ width: 80, height: 100 }}>
        <Image
          source={{ uri: item.image_url[0] }} // Sử dụng ảnh từ URL
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View>
        <Text>Tên sản phẩm: {item.name_pr}</Text>
        <Text>Màu: {item.color}</Text>
        <Text style={{ borderWidth: 0.5, width: 52, padding: 3, borderRadius: 6 }}>
          {item.capacity}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: 200,
          }}
        >
          <Text>Giá: {item.price} VND</Text>
          <TouchableOpacity onPress={() => handleAddToCart(item)}>
            <Icon name="cart-outline" size={25} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <View style={styles.boxHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" size={25} color="black" />
        </TouchableOpacity>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={{ color: 'black', fontSize: 19 }}>Yêu thích</Text>
        </View>
      </View>

      {/* Danh sách sản phẩm yêu thích */}
      <FlatList
        data={likedProducts}
        renderItem={renderItem}
        keyExtractor={(item) => item._id.toString()}
      />
    </View>
  );
};

export default LikeProduct;

const styles = StyleSheet.create({
  boxHeader: {
    marginVertical: 10,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  itemProduct: {
    marginVertical: 10,
    backgroundColor: '#F5F5F6',
    height: 115,
    borderRadius: 5,
    flexDirection: 'row',
    marginHorizontal: 20,
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  image: {
    width: 70,
    height: 96,
    alignSelf: 'center',
  },
});
