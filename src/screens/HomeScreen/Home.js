import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import axios from 'axios'; // Thêm Axios
import Icon from 'react-native-vector-icons/Ionicons';
import ProductItem from '../../components/ProductItem'; // Đảm bảo bạn đã có component ProductItem

const Home = ({navigation}) => {
  const [products, setProducts] = useState([]); // Khởi tạo state cho sản phẩm
  const [error, setError] = useState(null); // Khởi tạo state cho lỗi

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://192.168.1.38:3000/product/list');
        
        // Kiểm tra nếu response.data hợp lệ trước khi xử lý
        if (response.data && response.data.data) {
          // Kiểm tra và xử lý dữ liệu sản phẩm
          const validData = response.data.data.map(item => ({
            ...item,
            name_pr: item.name_pr || 'Không có tên',  // Đảm bảo có tên sản phẩm
            capacity: item.capacity || 'Chưa có dung lượng',  // Đảm bảo có dung lượng
            price: item.price || 0,  // Đảm bảo giá hợp lệ
          }));
          setProducts(validData); // Cập nhật sản phẩm hợp lệ
        } else {
          setError('Dữ liệu sản phẩm không hợp lệ');
          console.error('Dữ liệu sản phẩm không hợp lệ:', response.data);
        }
      } catch (err) {
        setError('Lỗi khi tải sản phẩm');
        console.error('Lỗi:', err);
      }
    };
  
    fetchProducts();
  }, []); // Chạy một lần khi component mount
  
  
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <ScrollView>
          {/* Banner */}
          <View style={styles.imageItem}>
            <Image
              style={{
                height: '100%',
                width: '100%',
                resizeMode: 'cover',
                borderRadius: 5,
              }}
              source={require('../../assets/img/imageBanner.png')}
            />
          </View>

          {/* Tìm kiếm và giỏ hàng */}
          <View style={{flexDirection: 'row'}}>
            <View style={styles.serchItem}>
              <View style={styles.iconSerch}>
                <TouchableOpacity>
                  <Icon
                    name="search"
                    size={20}
                    color="black"
                    style={styles.icon}
                  />
                </TouchableOpacity>
              </View>
              <View style={{width: '80%'}}>
                <TextInput placeholder="Tìm kiếm" style={{paddingLeft: 10}} />
              </View>
            </View>
            <View>
              <TouchableOpacity
                style={{flexDirection: 'row'}}
                onPress={() => navigation.navigate('ShopCart')}>
                <Icon
                  name="cart-outline"
                  size={24}
                  color="black"
                  style={styles.iconChatbuble}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Dữ liệu sản phẩm */}
          <View style={styles.productItem}>
            <FlatList
              data={products}
              renderItem={({item}) => <ProductItem product={item} />}
              keyExtractor={item => item._id} // Sử dụng _id làm key cho từng sản phẩm
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginTop: 10,
    height: '100%',
  },
  serchItem: {
    backgroundColor: '#f0f0f0',
    height: 45,
    width: '88%',
    borderRadius: 10,
    flexDirection: 'row',
    marginTop: 10,
  },
  iconSerch: {
    alignItems: 'center',
    width: 40,
  },
  iconChatbuble: {
    height: 50,
    width: 24,
    paddingTop: 10,
    marginStart: 10,
  },
  icon: {
    alignSelf: 'center',
    marginTop: 11,
  },
  imageItem: {
    height: 135,
    flex: 1,
    borderColor: 'black',
    marginTop: 10,
    borderRadius: 5,
  },
  productItem: {
    marginTop: 10,
  },
});
