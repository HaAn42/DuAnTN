import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

const Notification = ({ route }) => {
  const { paidProducts = [] } = route.params || {};  // Nhận thông tin sản phẩm từ params

  // Render một sản phẩm trong danh sách
  const renderProductItem = ({ item }) => (
    <View style={styles.itemProduct}>
      <View style={{ width: 80, height: 100 }}>
        <Image
          source={item.image ? { uri: item.image } : require('../../assets/img/produt1.png')}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ color: 'black' }}>Tên sản phẩm: {item.name_pr || 'N/A'}</Text>
        <Text>Giá: {item.price ? item.price.toLocaleString() : 'N/A'} VND</Text>
       
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.boxHeader}>
        <TouchableOpacity>
          <Icon name="search1" size={25} color="black" />
        </TouchableOpacity>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={{ color: 'black', fontSize: 19 }}>Thông báo</Text>
        </View>
      </View>

      <Text style={{ fontSize: 18, fontWeight: 'bold', marginVertical: 10 }}>Danh sách sản phẩm đã thanh toán</Text>

      {/* Hiển thị danh sách sản phẩm đã thanh toán */}
      <FlatList
        data={paidProducts}
        renderItem={renderProductItem}
        keyExtractor={item => item._id || item.name}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
  },
  boxHeader: {
    marginVertical: 10,
    flexDirection: 'row',
  },
  itemProduct: {
    marginVertical: 10,
    borderWidth: 0.5,
    height: 97,
    borderRadius: 5,
    flexDirection: 'row',
  },
  image: {
    width: 70,
    height: 96,
    alignSelf: 'center',
  },
});

export default Notification;
