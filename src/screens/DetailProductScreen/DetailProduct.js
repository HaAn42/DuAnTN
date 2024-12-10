import React, {useState, useEffect} from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import BackButtonView from '../../components/buttonback';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux'; // Import useDispatch, useSelector
import {
  addProductToLike,
  removeProductFromLike,
} from '../../redux/slices/likeProductSlice'; // Import actions for like products

import {
  addProductToCart, // Make sure to import this action
} from '../../redux/slices/cartSlice';

const DetailProduct = ({route, navigation}) => {
  const {product} = route.params; // Lấy sản phẩm từ params
  const dispatch = useDispatch(); // Hook dispatch action
  const likedProducts = useSelector(state => state.likeProducts.likedItems); // Lấy danh sách sản phẩm yêu thích từ Redux
  const [isLiked, setIsLiked] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  // Kiểm tra xem sản phẩm đã được yêu thích chưa
  useEffect(() => {
    const isProductLiked = likedProducts.some(item => item._id === product._id);
    setIsLiked(isProductLiked);
  }, [likedProducts, product._id]);

  // Toggle trạng thái yêu thích
  const toggleLike = () => {
    if (isLiked) {
      dispatch(removeProductFromLike(product)); // Nếu đã yêu thích, bỏ sản phẩm khỏi danh sách yêu thích
    } else {
      dispatch(addProductToLike(product)); // Nếu chưa yêu thích, thêm sản phẩm vào danh sách yêu thích
    }
    setIsLiked(!isLiked); // Cập nhật lại trạng thái yêu thích
  };
  // Xử lý thêm sản phẩm vào giỏ hàng
  const handleAddToCart = () => {
    dispatch(addProductToCart(product)); // Dispatch action thêm sản phẩm vào giỏ
    alert(`${product.name_pr}${title ='Thong bao'} đã được thêm vào giỏ hàng`); // Hiển thị thông báo
    setIsAddedToCart(true); // Cập nhật trạng thái giỏ hàng đã được thêm sản phẩm
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Phần 1 - Back button và hình ảnh sản phẩm */}
      <View style={{flexDirection: 'row'}}>
        <View
          style={{
            borderColor: 'gray',
            
            height: 50,
           
            borderRadius: 8,
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="chevron-back" size={25} color="black" />
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: '94.8%',
            alignContent: 'center',
            borderBottomLeftRadius: 30,
            height: 350,
          }}>
          <Image
            source={{uri: product.image_url[0]}} // Hiển thị ảnh sản phẩm
            style={{alignSelf: 'center', width: 240, height: 340}}
          />
        </View>
      </View>

      {/* Phần 2 - Thông tin sản phẩm */}
      <View style={{marginVertical: 10}}>
        <Text style={styles.text}>{product.name_pr}</Text>
        <Text style={styles.text}>{product.price} VND</Text>
      </View>

      {/* Phần 3 - Mô tả chi tiết */}
      <View style={styles.itemText}>
        <Text>Tên sản phẩm: {product.name_pr}</Text>
        <Text>Loại sản phẩm: {product.type_id}</Text>
        <Text>Kích thước: {product.size}</Text>
        <Text>Dung lượng: {product.capacity}</Text>
        <Text>Màu: {product.color}</Text>
        <Text>Thông tin chi tiết: {product.description}</Text>
      </View>

      {/* Phần 4 - Nút đăng ký và yêu thích */}
      <View style={styles.itemButton}>
        <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
          <Text style={{fontSize: 18, color: 'white'}}>
            {isAddedToCart ? 'Đã thêm vào giỏ' : 'Thêm vào giỏ hàng'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={toggleLike}>
          <Icon
            name={isLiked ? 'heart-sharp' : 'heart-outline'}
            size={40}
            color="red"
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
  },
  text: {
    fontSize: 20,
    fontWeight: '800',
    marginHorizontal: 20,
  },
  itemText: {
    borderWidth: 1,
    marginHorizontal: 20,
    height: 190,
    borderColor: 'gray',
    borderRadius: 10,
    padding: 10,
  },
  itemButton: {
    flexDirection: 'row',
    marginVertical: 20,
    justifyContent: 'space-evenly',
  },
  button: {
    height: 50,
    backgroundColor: '#14AB87',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 30,
    borderRadius: 10,
    width: 250,
  },
  icon: {
    fontSize: 50,
  },
});

export default DetailProduct;
