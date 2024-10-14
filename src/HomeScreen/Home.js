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
  import React from 'react';
  import Icon from 'react-native-vector-icons/Ionicons';
import ProductItem from '../components/ProductItem';
 
  
  const Home = () => {
    // const [serch, setSerch] = React.createState()
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <ScrollView>
            <View style={{flexDirection:'row'}}>
  
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
                <View style={{width:'80%'}}>
                  <TextInput placeholder="Tìm kiếm " />
                </View>
              </View>
              <View>
              <TouchableOpacity style={{flexDirection:'row'}}>
                    <Icon
                      name="chatbubble-ellipses-outline"
                      size={24}
                      color="black"
                      style={styles.iconChatbuble}
                    />
                    <Text style={{color:'red',left:-4,paddingTop:3}}>15</Text>
                  </TouchableOpacity>
              </View>
  
            </View>
  
            <View style={styles.imageItem}>
              <Image
                style={{
                  height: '100%',
                  width: '100%',
                  resizeMode: 'cover',
                  borderRadius: 5,
                }}
                source={require('../assets/img/imageBanner.png')}
              />
            </View>
  
            <View>
              <ScrollView
                style={{
                  borderColor: 'black',
                  borderWidth: 1,
                  height: 50,
                  borderRadius: 5,
                  marginTop: 5,
                }}>
                  
                </ScrollView>
            </View>
  
            <View style={styles.productItem}>
                
                    <ProductItem   />
                
              
              
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
      backgroundColor:'#f0f0f0',
      height: 45,
      width:'88%',
      borderRadius: 10,
  
      flexDirection: 'row',
    },
    iconSerch: {
      alignItems: 'center',
      width: 40,
    },
    iconChatbuble:{
     
      height:50,
      width:24,
      paddingTop:10,
      marginStart:10
    },
    icon: {
      alignSelf: 'center',
      marginTop: 11,
    },
    imageItem: {
      height: 135,
      borderWidth: 1,
      borderColor: 'black',
      marginTop: 10,
      borderRadius: 5,
    },
    menuItem: {
      padding: 5,
      borderRadius: 7,
      margin: 10,
    },
    productItem: {
      borderWidth: 1,
      borderColor: 'black',
      height:500,
      marginTop: 5,
      justifyContent:'space-between'
    },
  
  });
  