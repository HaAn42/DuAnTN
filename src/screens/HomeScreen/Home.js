import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import {
  Alert,
  BackHandler,
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
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message'; // Import Toast

const Home = ({ navigation }) => {
  const [backPressedOnce, setBackPressedOnce] = useState(false); // State để theo dõi nhấn back lần đầu
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBrandId, setSelectedBrandId] = useState('all'); // Default to 'all'
  const [refreshing, setRefreshing] = useState(false);
  const scrollViewRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    require('../../assets/img/imageBanner.png'),
    require('../../assets/img/bannerSamSum.png'),
    require('../../assets/img/bannerVivo.png'),
    require('../../assets/img/bannerOppo.png'),
  ];

  const screenWidth = Dimensions.get('window').width;

  // Xử lý sự kiện back khi người dùng nhấn 2 lần liên tiếp
  useEffect(() => {
    const backAction = () => {
      if (backPressedOnce) {
        // Nếu nhấn back lần thứ 2 trong vòng 2 giây, thoát ứng dụng
        BackHandler.exitApp();
      } else {
        // Hiển thị Toast thay vì Alert
        setBackPressedOnce(true);
        Toast.show({
          type: 'info',
          position: 'bottom',
          text1: 'Nhấn lại lần nữa để thoát ứng dụng',
          visibilityTime: 2000,
        });

        // Reset lại trạng thái sau 2 giây nếu không nhấn back lần thứ 2
        setTimeout(() => setBackPressedOnce(false), 2000);
      }
      return true; // Ngăn ngừa hành động back mặc định
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    // Cleanup khi component unmount
    return () => backHandler.remove();
  }, [backPressedOnce]);

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
    const fetchData = async () => {
      try {
        // Lấy danh sách các thương hiệu
        const brandResponse = await axios.get('http://192.168.1.229:3000/brand/list');
        setBrands(brandResponse.data.data);

        // Lấy danh sách các sản phẩm
        const productResponse = await axios.get('http://192.168.1.229:3000/product/list');
        setProducts(productResponse.data.data);
        setFilteredProducts(productResponse.data.data);
        setLoading(false);
        setRefreshing(false);
      } catch (error) {
        setError('Có lỗi xảy ra khi lấy dữ liệu.');
        setLoading(false);
        setRefreshing(false);
      }
    };

    fetchData();
  }, []);

  const fetchProducts = () => {
    axios.get('http://192.168.1.229:3000/product/list')
      .then(response => {
        setProducts(response.data.data);
        setFilteredProducts(response.data.data);
        setLoading(false);
        setRefreshing(false);
      })
      .catch(error => {
        setError('Có lỗi xảy ra khi lấy dữ liệu.');
        setLoading(false);
        setRefreshing(false);
      });
  };

  const handleBrandClick = (brandId) => {
    setSelectedBrandId(brandId);

    if (brandId === 'all') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product => product.brand_id === brandId);
      setFilteredProducts(filtered);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    setSelectedBrandId('all'); // Set the brand filter back to "All" when refreshing
    fetchProducts();
  };

  const handleSearch = (query) => {
    setSearchQuery(query);

    let filtered = products;

    if (query) {
      filtered = filtered.filter(product =>
        product.name_pr.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (selectedBrandId && selectedBrandId !== 'all') {
      filtered = filtered.filter(product => product.brand_id === selectedBrandId);
    }

    setFilteredProducts(filtered);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setFilteredProducts(products);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <SafeAreaView style={styles.container}>
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.serchItem}>
            <View style={styles.iconSerch}>
              <Icon name="search" size={20} color="black" style={styles.icon} />
            </View>
            <View style={{ width: '80%' }}>
              <TextInput
                placeholder="Tìm kiếm"
                value={searchQuery}
                onChangeText={handleSearch}
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

        <View style={styles.brandMenu}>
          <FlatList
            data={[{ _id: 'all', name: 'All' }, ...brands]}
            horizontal
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.brandItem, selectedBrandId === item._id && styles.selectedBrand]}
                onPress={() => handleBrandClick(item._id)}
              >
                <Text style={styles.brandName}>{item.name}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={item => item._id.toString()}
          />
        </View>

        {error && <Text style={styles.errorText}>{error}</Text>}

        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />
        ) : (
          <View style={styles.productItem}>
            <FlatList
              data={filteredProducts}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.item}
                  onPress={() => navigation.navigate('DetailProduct', { product: item })}
                >
                  <View style={{ height: 120, width: 150, marginTop: 10 }}>
                    <Image
                      source={{ uri: item.image_url[0] }}
                      style={{ width: 90, height: '100%', resizeMode: 'cover', alignSelf: 'center' }}
                    />
                  </View>
                  <View>
                    <Text style={styles.name}>{item.name_pr}</Text>
                    <Text style={styles.price}>
                      {item.price ? `${item.price}.vnd` : 'Liên hệ'}
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
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
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
  brandItem: {
    borderRadius: 8,
    paddingHorizontal: 5,
  },
  brandName: {
    fontSize: 15,
    padding: 5,
  },
  selectedBrand: {
    borderBottomWidth: 2,
    borderBottomColor: 'gray',
  },
  brandMenu: {
    height: 30,
    marginTop: 5,
    alignSelf: 'center',
  },
  image: {
    height: 150,
    width: Dimensions.get('window').width,
  },
  productItem: {
    marginBottom: 5,
    height: '62%',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
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
