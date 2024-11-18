import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import ProductItem from '../../components/ProductItem'
import Icon from 'react-native-vector-icons/Feather';

const LikeProduct = () => {
  return (
    <View>
      <View style={styles.boxHeader}>
        <TouchableOpacity>
          <Icon name="arrow-left" size={25} color="black" />
        </TouchableOpacity>
        <View style={{flex: 1, alignItems: 'center'}}>
          <Text style={{color: 'black', fontSize: 19}}>
            Yêu thích
          </Text>
        </View>
      </View>
      <View style={styles.itemProduct}>
        <View style={{width: 80, height: 100}}>
          <Image
            source={require('../../assets/img/produt1.png')}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        <View>
          <Text>Tên sản phẩm: Iphone 15</Text>
          <Text>Màu: Xanh</Text>
          <Text
            style={{borderWidth: 0.5, width: 52, padding: 3, borderRadius: 6}}>
            128GB
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: 200,
            }}>
              <Text>Giá: 18.000.000</Text>
              <TouchableOpacity>
                <Icon name="shopping-cart" size={25}/>
              </TouchableOpacity>
              
          </View>
        </View>
      </View>
    </View>
  )
}

export default LikeProduct

const styles = StyleSheet.create({
  boxHeader: {
    marginVertical: 10,
    alignSelf: 'flex-start',
    flexDirection: 'row',
  },
  itemProduct: {
    marginVertical: 10,
    backgroundColor:'#F5F5F6',
    height:115,
    borderRadius: 5,
    flexDirection: 'row',
    marginHorizontal:20,
    paddingTop:10,
    paddingHorizontal:10
  },
  image: {
    width: 70,
    height: 96,
    alignSelf: 'center',
    
  },
})