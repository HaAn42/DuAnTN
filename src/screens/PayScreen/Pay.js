import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import PaymentMethod from '../PaymentMethodScreen/PaymentMethod';

const Pay = ({route, navigation}) => {
  // Destructure products and totalPrice from route.params with fallback
  const {products = [], totalPrice = 0} = route.params || {};

  // Render each product item in the list
  const renderProductItem = ({item}) => (
    <View style={styles.itemProduct}>
      <View style={{width: 80, height: 100}}>
        <Image
          source={
            item.image
              ? {uri: item.image}
              : require('../../assets/img/produt1.png')
          }
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.productText}>
          Tên sản phẩm: {item.name || 'N/A'}
        </Text>
        <Text style={styles.productText}>Màu: {item.color || 'N/A'}</Text>
        <Text style={styles.productText}>{item.storage || '128GB'}</Text>
        <Text style={styles.productText}>Số lượng: {item.quantity || 1}</Text>
        <Text style={styles.productText}>
          Giá: {item.price ? item.price.toLocaleString() : 'N/A'} VND
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.boxHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={25} color="black" />
        </TouchableOpacity>
        <View style={{flex: 1, alignItems: 'center'}}>
          <Text style={styles.headerTitle}>Xác nhận thanh toán</Text>
        </View>
      </View>

      <Text style={styles.orderInfo}>Thông tin đơn hàng</Text>

      {/* Render the list of products */}
      <FlatList
        data={products}
        renderItem={renderProductItem}
        keyExtractor={item => item._id || item.name}
        showsVerticalScrollIndicator={false}
      />

      <PaymentMethod />

      <View style={styles.price}>
        <View style={styles.priceItem}>
          <Text>Tạm tính:</Text>
          <Text>{totalPrice.toLocaleString()} VND</Text>
        </View>
        <View style={styles.priceItem}>
          <Text>Phí vận chuyển:</Text>
          <Text>0 VND</Text>
        </View>
        <View style={styles.priceItem}>
          <Text style={styles.totalAmount}>Thành tiền:</Text>
          <Text style={styles.totalAmount}>
            {totalPrice.toLocaleString()} VND
          </Text>
        </View>
      </View>

      <TouchableOpacity
  style={styles.paymentButton}
  onPress={() => {
    // Truyền thông tin sản phẩm và tổng tiền thanh toán
    navigation.navigate('Notification', {
      paidProducts: products, // Danh sách sản phẩm đã thanh toán
      totalPrice: totalPrice, // Tổng giá trị thanh toán
    });
  }}>
  <Text style={styles.paymentText}>Thanh toán</Text>
</TouchableOpacity>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 10},
  boxHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  headerTitle: {fontSize: 20, color: 'black'},
  orderInfo: {fontSize: 18, marginVertical: 10},
  itemProduct: {
    flexDirection: 'row',
    borderWidth: 1,
    marginVertical: 10,
    padding: 10,
    borderRadius: 5,
    borderColor: '#ccc',
  },
  image: {width: 70, height: 96},
  productInfo: {marginLeft: 10, flex: 1},
  productText: {fontSize: 14, color: 'black', marginVertical: 2},
  price: {marginVertical: 20},
  priceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  totalAmount: {fontWeight: 'bold', fontSize: 18, color: '#14AB87'},
  paymentButton: {
    backgroundColor: '#14AB87',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 20,
    elevation: 5,
  },
  paymentText: {color: 'white', fontSize: 20},
});

export default Pay;
