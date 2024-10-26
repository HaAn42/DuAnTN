import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/EvilIcons';
import AwesomeAlert from 'react-native-awesome-alerts';

const CustomProductAd = ({navigation}) => {
  const data = [
    {
      id: 1,
      name: 'iPhone 1',
      brand: 'Apple',
      type: 'Smartphone',
      price: 10,
      color: 'Blue',
      image: require('../assets/img/produt1.png'),
      description: 'lorem ipsum dolor sit amet',
      capacity: '128GB',
    },
    {
      id: 2,
      name: 'Nokia 3310',
      brand: 'Nokia',
      type: 'Feature Phone',
      price: 5,
      color: 'Gray',
      image: require('../assets/img/produt1.png'),
      description: 'Classic feature phone',
      capacity: '16MB',
    },
    {
      id: 3,
      name: 'Xiaomi Mi 11',
      brand: 'Xiaomi',
      type: 'Smartphone',
      price: 9,
      color: 'Green',
      image: require('../assets/img/produt1.png'),
      description: 'Flagship smartphone with great features',
      capacity: '128GB',
    },
    {
      id: 4,
      name: 'Samsung Galaxy S21',
      brand: 'Samsung',
      type: 'Smartphone',
      price: 12,
      color: 'Black',
      image: require('../assets/img/produt1.png'),
      description: 'High performance smartphone',
      capacity: '256GB',
    },
  ];
  const [currentProduct, setCurrentProduct] = useState(null);
const handDelete = (item) =>{

    setCurrentProduct(item)
    setShowAlert(true)
}
  const [showAlert, setShowAlert] = useState(false);
  const renderItem = ({item}) => (
    <View style={styles.item}>
      <View style={{height: '100%', width: 100}}>
        <Image resizeMode="cover" source={item.image} style={styles.image} />
      </View>
      <View style={styles.content}>
        <Text>Tên: {item.name}</Text>
        <Text>Giá: {item.price} USD</Text>
        <Text>Màu: {item.color}</Text>
        <Text>Dung lượng: {item.capacity}</Text>
        <Text>Thương hiệu: {item.brand}</Text>
      </View>
      <View style={styles.button}>
        <TouchableOpacity onPress={()=> navigation.navigate('Edit')}>
          <Icon name="pencil" size={28} color="black" />
         

        </TouchableOpacity>
        <TouchableOpacity onPress={() => handDelete(item)}>
          <Icon name="trash" size={28} color="black" />
          <View>
            
            <AwesomeAlert 
              show={showAlert}
              title="Thong bao"
              titleStyle={{fontSize: 20, color: 'red'}}
              message="Ban muon xoa san pham nay khong?"
              showCancelButton={true}
              cancelText='Không'
              cancelButtonStyle={{backgroundColor:'red', width:60, }}
             
              showConfirmButton={true}
              /** xử lý sự kiện alert cancel */
              onCancelPressed={
                ()=>{console.log('Khong')
                    setShowAlert(false)
                }
                
            }
              confirmText='Có'
              confirmButtonStyle={{backgroundColor:'blue', width:60,paddingStart:20 }}
              onConfirmPressed={()=>{
                /** xử lý sự kiện xóa  */
                console.log('Xoa thanh cong',currentProduct)
                setShowAlert(false)
              }} 
              
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
    />
  );
};

export default CustomProductAd;

const styles = StyleSheet.create({
  item: {
    marginTop: 10,
    borderWidth: 0.5,
    height: 130,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginHorizontal: 10,
  },

  image: {
    width: 90,
    height: 120,
    marginTop: 2,
    alignSelf: 'center',
  },

  content: {
    height: '100%',
    width: '50%',
    paddingStart: 10,
    justifyContent: 'center',
  },
  button: {
    width: 70,
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 100, // Căn chỉnh các nút ở dưới cùng
  },
});
