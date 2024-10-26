import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';

const Notification = () => {
  return (
    <View style={styles.container}>
      <View style={styles.boxHeader}>
        <TouchableOpacity>
          <Icon name="search1" size={25} color="black" />
        </TouchableOpacity>
        <View style={{flex: 1, alignItems: 'center'}}>
          <Text style={{color: 'black', fontSize: 19}}>Cài đặt</Text>
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
          <Text style={{color:'black'}}>Điện thoại IPhone 15 </Text>
          <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Turpis pretium et in arcu adipiscing nec. Turpis pretium et in arcu adipiscing nec. </Text> 

        </View>
      </View>
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
  boxHeader: {
    marginVertical: 10,
    alignSelf: 'flex-start',
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
