import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import BackButtonView from '../../components/buttonback';
import Icon from 'react-native-vector-icons/EvilIcons';

const DetailProduct = () => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  return (
    <View style={styles.container}>
      {/**phan1 */}
      <View style={{flexDirection: 'row'}}>
        <View
          style={{
            borderColor: 'gray',
            borderWidth: 1,
            height: 50,
            marginTop: 20,
            left: 10,
            borderRadius: 8,
          }}>
          <BackButtonView />
        </View>
        <View
          style={{
            width:'94.8%',
            alignContent: 'center',
            borderBottomLeftRadius: 30,
            height: 350,
           
         
          }}>
          <Image
            source={require('../../assets/img/produt1.png')}
            style={{alignSelf: 'center', width:240, height: 340}}
          />
        </View>
      </View>

      {/**phan2 */}
      <View style={{marginVertical:10}}>
        <Text style={styles.text}>Iphone</Text>
        <Text style={styles.text}>12000d</Text>
      </View>

      {/**phan3 */}
      <View style={styles.itemText}>
      <Text>Tên sản phẩm: </Text>
      <Text>Loại sản phẩm: </Text>
      <Text >Kích thước:</Text>
      <Text >Dung lượng: </Text>
      <Text >Màu: </Text>
      <Text >Thông tin chi tiết: </Text>

      </View>
      {/**phan4*/}
      <View style={styles.itemButton}>
        <View >
        <TouchableOpacity style={styles.button}>
            <Text style={{fontSize: 25, color: 'white',}}>Đăng ký</Text>
          </TouchableOpacity>
        </View>
        <View>
            <TouchableOpacity>
                <Icon name='heart' style={styles.icon}/>
            </TouchableOpacity>
        </View>
      </View>
    </View>
  );

};

export default DetailProduct;

const styles = StyleSheet.create({
    container:{
        
        borderWidth:1,
        flex:1
    },
    text:{
        fontSize:20,
        fontWeight:'800',
        marginHorizontal:20,
        
    },
    itemText:{
        borderWidth:1,
        marginHorizontal:20,
        height:190,
        borderColor:'gray',
        borderRadius:10,
        padding:10
    },
    itemButton:{
        flexDirection:'row',
        marginVertical:20,
       marginTop:40,
        justifyContent:'space-evenly'
    },
    button: {
        height: 50,
        backgroundColor: '#14AB87',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 30,
        borderRadius: 10,
        width:250
      },
    icon:{
        fontSize:50,
    }
});
