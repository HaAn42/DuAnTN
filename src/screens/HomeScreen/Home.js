// Sửa lại phần của màn hình Home:

import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
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
  ActivityIndicator,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

const Home = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState(''); // Trạng thái cho query tìm kiếm
  const [products, setProducts] = useState([]); // Sản phẩm từ API
  const [filteredProducts, setFilteredProducts] = useState([]); // Sản phẩm đã lọc theo tìm kiếm
  const [brands, setBrands] = useState([]); // Thêm state cho danh sách thương hiệu
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const scrollViewRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    require('../../assets/img/imageBanner.png'),
    require('../../assets/img/bannerSamSum.png'),
    require('../../assets/img/bannerVivo.png'),
    require('../../assets/img/bannerOppo.png'),
  ];

  const screenWidth = Dimensions.get('window').width;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: currentIndex * screenWidth,
        animated: true,
      });
    }
  }, [currentIndex]);

  useEffect(() => {
    // Lấy danh sách thương hiệu
    axios.get('http://192.168.1.5:3000/brand/list')
      .then(response => {
        setBrands(response.data.data); // Lưu thương hiệu vào state
      })
      .catch(error => {
        setError('Có lỗi xảy ra khi lấy danh sách thương hiệu.');
      });

    // Lấy danh sách sản phẩm
    axios.get('http://192.168.1.5:3000/product/list')
      .then(response => {
        setProducts(response.data.data); // Lưu sản phẩm vào state
        setFilteredProducts(response.data.data); // Ban đầu hiển thị tất cả sản phẩm
        setLoading(false);
      })
      .catch(error => {
        setError('Có lỗi xảy ra khi lấy dữ liệu.');
        setLoading(false);
      });
  }, []);

  // Hàm tìm kiếm sản phẩm
  const handleSearch = (query) => {
    setSearchQuery(query); // Cập nhật giá trị tìm kiếm

    if (query) {
      const filtered = products.filter(product =>
        product.name_pr.toLowerCase().includes(query.toLowerCase()) // Kiểm tra sản phẩm theo tên
      );
      setFilteredProducts(filtered); // Cập nhật danh sách sản phẩm đã lọc
    } else {
      setFilteredProducts(products); // Hiển thị tất cả sản phẩm nếu không có từ khóa tìm kiếm
    }
  };

  const handleClearSearch = () => {
    setSearchQuery(''); // Xóa nội dung trong ô tìm kiếm
    setFilteredProducts(products); // Hiển thị tất cả sản phẩm
  };

  // Hàm xử lý khi click vào một brand
  const handleBrandClick = (brandId) => {
    if (brandId === 'all') {
      // Nếu chọn 'All', hiển thị tất cả sản phẩm
      setFilteredProducts(products);
    } else {
      // Lọc sản phẩm theo thương hiệu
      const filtered = products.filter(product => product.brand === brandId);
      setFilteredProducts(filtered);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <SafeAreaView style={styles.container}>
        {/* Search and Cart */}
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.serchItem}>
            <View style={styles.iconSerch}>
              <Icon name="search" size={20} color="black" style={styles.icon} />
            </View>
            <View style={{ width: '80%' }}>
              <TextInput
                placeholder="Tìm kiếm"
                value={searchQuery}
                onChangeText={handleSearch} // Gọi handleSearch mỗi khi giá trị thay đổi
                style={{ paddingLeft: 10 }}
              />
            </View>
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={handleClearSearch} style={styles.clearButton}>
                <Icon name="close-circle" size={20} color="black" />
              </TouchableOpacity>
            )}
          </View>
          <View>
            <TouchableOpacity
              style={{ flexDirection: 'row' }}
              onPress={() => navigation.navigate('ShopCart')}
            >
              <Icon
                name="cart-outline"
                size={24}
                color="black"
                style={styles.iconChatbuble}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Banner */}
        <View style={styles.bannerContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            ref={scrollViewRef}
            contentContainerStyle={styles.scrollViewContent}
          >
            {images.map((image, index) => (
              <View key={index} style={styles.imageItem}>
                <Image source={image} style={styles.image} />
              </View>
            ))}
          </ScrollView>
        </View>
     
        {/* Error Message */}
        {error && <Text style={styles.errorText}>{error}</Text>}

        {/* Loading Spinner */}
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />
        ) : (
          <View style={styles.productItem}>
            {/* Hiển thị danh sách sản phẩm đã lọc */}
            <FlatList
              data={filteredProducts} // Dữ liệu hiển thị là danh sách đã lọc
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.item}
                  onPress={() => navigation.navigate('DetailProduct', { product: item })}
                >
                  <View style={{ height: 120, width: 150, marginTop: 10 }}>
                    <Image
                      source={require('../../assets/img/produt1.png')}
                      style={{ width: 90, height: '100%', resizeMode: 'cover', alignSelf:'center'}}
                    />
                  </View>
                  <View>
                    <Text style={styles.name}>{item.name_pr}</Text>
                    <Text style={styles.price}>
                      {item.price ? `$${item.price}` : 'Liên hệ'}
                    </Text>
                    <TouchableOpacity>
                      <Text style={styles.capacity}>{item.capacity}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.cartButton}>
                      <Icon name="cart-outline" color="black" size={24} />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={item => item._id.toString()}
              numColumns={2}
              columnWrapperStyle={styles.columnWrapper}
            />
          </View>
        )}
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginTop: 10,
    height: '100%',
  },
  // Các style khác ...
  serchItem: {
    backgroundColor: '#E5E5E5',
    height: 45,
    width: '88%',
    borderRadius: 10,
    flexDirection: 'row',
    marginStart: 10,
  },
  iconSerch: {
    alignItems: 'center',
    width: 35,
  },
  
  iconChatbuble: {
    height: 50,
    width: 24,
    marginHorizontal: 5,
    paddingTop: 10,
  },
  icon: {
    alignSelf: 'center',
    marginTop: 11,
  },
  clearButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 10,
  },
  imageItem: {
    borderColor: 'black',
    marginTop: 10,
    borderRadius: 5,
  },
  brandItem:{
    height:30,
  },
  brandName:{
    fontSize:20
  },
  image: {
    height: 150,
    width: Dimensions.get('window').width,
  },
  productItem: {
    marginTop: 10,
    height: '65%',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  brandMenu:{
    height:90,
    borderWidth:1,
    marginTop:10
  },
  loading: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    width: 170,
    height: 240,
    marginVertical: 5,
    borderRadius: 7,
    flexDirection: 'column',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  name: {
    fontSize: 16,
    color: 'black',
    fontWeight: '350',
    marginBottom: 5,
  },
  capacity: {
    borderColor: 'gray',
    borderWidth: 1,
    color: 'gray',
    fontSize: 14,
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderRadius: 4,
    width: 70,
  },
  price: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cartButton: {
    alignSelf: 'flex-end',
    alignItems: 'center',
    width: 24,
  },
  columnWrapper: {
    justifyContent: 'space-evenly',
  },
});

export default Home;
