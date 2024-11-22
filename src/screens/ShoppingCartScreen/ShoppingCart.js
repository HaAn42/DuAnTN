import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Alert, // Thêm Alert để hiển thị thông báo
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { removeProductFromCart } from '../../redux/slices/cartSlice';
import ShoppinCartItem from '../../components/ShoppinCartItem';

const ShoppingCart = ({ navigation }) => {
  const [selectAll, setSelectAll] = useState(false); // Theo dõi trạng thái "Chọn tất cả"
  const [selectedItems, setSelectedItems] = useState({}); // Theo dõi trạng thái chọn của từng sản phẩm

  const cartProducts = useSelector(state => state.cart.cartItems);
  const dispatch = useDispatch();

  // Khởi tạo tổng giá trị của giỏ hàng
  const [totalPrice, setTotalPrice] = useState(0);

  // Hàm cập nhật tổng giá trị giỏ hàng
  const updateTotalPrice = () => {
    const newTotalPrice = cartProducts.reduce((total, item) => {
      if (selectedItems[item._id] === true) {
        // Chỉ cộng giá của những sản phẩm đã chọn
        return total + item.price * item.quantity;
      }
      return total;
    }, 0);
    setTotalPrice(newTotalPrice); // Cập nhật tổng giá trị
  };

  // Khi người dùng nhấn "Chọn tất cả"
  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);

    // Cập nhật trạng thái chọn của tất cả các sản phẩm
    const updatedSelectedItems = {};
    cartProducts.forEach(item => {
      updatedSelectedItems[item._id] = newSelectAll;
    });
    setSelectedItems(updatedSelectedItems);
  };

  // Khi người dùng chọn hoặc bỏ chọn một sản phẩm
  const handleSelectItem = productId => {
    const updatedSelectedItems = { ...selectedItems };
    updatedSelectedItems[productId] = !updatedSelectedItems[productId];
    setSelectedItems(updatedSelectedItems);
  };

  // Kiểm tra xem tất cả các sản phẩm đã được chọn hay chưa
  const checkAllSelected = () => {
    return cartProducts.every(item => selectedItems[item._id] === true);
  };

  useEffect(() => {
    updateTotalPrice(); // Cập nhật tổng giá khi thay đổi lựa chọn
  }, [selectedItems, cartProducts]); // Cập nhật khi thay đổi lựa chọn hoặc giỏ hàng

  const handleRemoveProduct = productId => {
    dispatch(removeProductFromCart(productId));
  };

  const renderItem = ({ item }) => (
    <ShoppinCartItem
      item={item}
      handleRemoveProduct={handleRemoveProduct}
      selected={selectedItems[item._id]} // Truyền trạng thái chọn của sản phẩm
      setSelection={handleSelectItem} // Xử lý chọn/bỏ chọn sản phẩm
    />
  );

  const handleNavigateToPay = () => {
    // Lọc ra các sản phẩm đã chọn
    const selectedProducts = cartProducts.filter(item => selectedItems[item._id] === true);

    if (selectedProducts.length === 0) {
      // Nếu không có sản phẩm nào được chọn, hiển thị thông báo
      Alert.alert('Thông báo', 'Vui lòng chọn sản phẩm cần thanh toán!', [
        { text: 'OK' },
      ]);
    } else {
      // Điều hướng tới màn hình Thanh toán và truyền các sản phẩm đã chọn và tổng giá trị
      navigation.navigate('Pay', {
        products: selectedProducts,
        totalPrice: totalPrice,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" size={25} color="black" />
        </TouchableOpacity>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={styles.title}>Giỏ hàng</Text>
        </View>
      </View>

      <FlatList
        data={cartProducts}
        renderItem={renderItem}
        keyExtractor={item => item._id}
      />

      {/* Footer */}
      <View style={styles.footer}>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            onPress={handleSelectAll}
            style={{ marginEnd: 5, marginHorizontal: 5 }}>
            <Icon
              name={checkAllSelected() ? 'checkbox' : 'checkbox-outline'}
              size={20}
            />
          </TouchableOpacity>
          <Text>Chọn tất cả</Text>
        </View>
        <View>
          <Text style={{ color: 'black' }}>
            Giá: {totalPrice.toLocaleString()} VND
          </Text>
        </View>
        <View>
          <TouchableOpacity style={styles.button} onPress={handleNavigateToPay}>
            <Text style={{ color: 'white' }}>
              Thanh toán ({cartProducts.filter(item => selectedItems[item._id] === true).length})
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ShoppingCart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#E5E5E5',
  },
  title: {
    fontSize: 20,
    color: 'black',
  },
  editText: {
    fontSize: 16,
    color: 'blue',
  },
  footer: {
    marginHorizontal: 20,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  button: {
    backgroundColor: 'red',
    height: 40,
    width: 130,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
