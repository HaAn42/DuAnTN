import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  removeProductFromCart,
  setCartItems,
} from '../../redux/slices/cartSlice';
import ShoppinCartItem from '../../components/ShoppinCartItem';
import axios from 'axios'; // Assuming you're using axios for API requests

const ShoppingCart = ({navigation}) => {
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);

  const cartProducts = useSelector(state => state.cart.cartItems);
  const dispatch = useDispatch();

  const userId = useSelector(state => state.user.id);

  // Fetch cart data from the server on component mount
  useEffect(() => {
    const fetchCart = async () => {
      if (userId) {
        try {
          const response = await axios.get(
            `http://192.168.1.142:3000/cart/list/${userId}`,
          );
          dispatch(setCartItems(response.data)); // Lưu vào Redux
        } catch (error) {
          console.error('Error fetching cart data:', error);
        }
      }
    };

    fetchCart();
  }, [userId, dispatch]);

  // Calculate total price based on selected items
  const updateTotalPrice = () => {
    const newTotalPrice = cartProducts.reduce((total, item) => {
      if (selectedItems[item._id] === true) {
        return total + item.price * item.quantity;
      }
      return total;
    }, 0);
    setTotalPrice(newTotalPrice); // Cập nhật state totalPrice
  };

  useEffect(() => {
    updateTotalPrice();
  }, [selectedItems, cartProducts]); // Cập nhật totalPrice khi selectedItems hoặc cartProducts thay đổi

  // Handle select all items
  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);

    const updatedSelectedItems = {};
    cartProducts.forEach(item => {
      updatedSelectedItems[item._id] = newSelectAll;
    });
    setSelectedItems(updatedSelectedItems);
  };

  // Handle individual item selection
  const handleSelectItem = productId => {
    const updatedSelectedItems = {...selectedItems};
    updatedSelectedItems[productId] = !updatedSelectedItems[productId];
    setSelectedItems(updatedSelectedItems);
  };

  // Handle product removal
  const handleRemoveProduct = async productId => {
    try {
      dispatch(removeProductFromCart(productId));
      console.log('Product ID:', productId); // Kiểm tra giá trị productId
      await axios.delete(`http://192.168.1.212:3000/cart/remove/${productId}`);
    } catch (error) {
      console.error('Error removing product from cart:', error);
    }
  };

  // Navigate to payment screen
  const handleNavigateToPay = () => {
    const selectedProducts = cartProducts.filter(
      item => selectedItems[item._id] === true,
    );
    if (selectedProducts.length === 0) {
      Alert.alert('Thông báo', 'Vui lòng chọn sản phẩm cần thanh toán!', [
        {text: 'OK'},
      ]);
    } else {
      navigation.navigate('Pay', {products: selectedProducts, totalPrice});
    }
  };

  // Check if cart is empty
  const isCartEmpty = cartProducts.length === 0;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" size={25} color="black" />
        </TouchableOpacity>
        <View style={{flex: 1, alignItems: 'center'}}>
          <Text style={styles.title}>Giỏ hàng</Text>
        </View>
      </View>

      {isCartEmpty ? (
        <View style={styles.emptyCartContainer}>
          <Text style={styles.emptyCartText}>
            Giỏ hàng của bạn hiện đang trống.
          </Text>
        </View>
      ) : (
        <FlatList
          data={cartProducts}
          renderItem={({item}) => (
            <ShoppinCartItem
              item={item}
              handleRemoveProduct={handleRemoveProduct}
              selected={selectedItems[item._id]}
              setSelection={handleSelectItem}
            />
          )}
          keyExtractor={item => item._id}
        />
      )}

      <View style={styles.footer}>
        {!isCartEmpty && (
          <>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={handleSelectAll}
                style={{marginEnd: 5, marginHorizontal: 5}}>
                <Icon
                  name={selectAll ? 'checkbox' : 'checkbox-outline'}
                  size={20}
                />
              </TouchableOpacity>
              <Text>Chọn tất cả</Text>
            </View>
            <View>
              <Text style={{color: 'black'}}>
                Giá: {totalPrice.toLocaleString()} VND
              </Text>
            </View>
            <View>
              <TouchableOpacity
                style={styles.button}
                onPress={handleNavigateToPay}>
                <Text style={{color: 'white'}}>
                  Thanh toán (
                  {
                    cartProducts.filter(
                      item => selectedItems[item._id] === true,
                    ).length
                  }
                  )
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
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
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCartText: {
    fontSize: 18,
    color: 'gray',
  },
});
