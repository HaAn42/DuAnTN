import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import BackButtonView from '../../../components/buttonback';
import CustomProductAd from '../../../components/CustomProductAd';

const ProductManagement = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackButtonView onBackPress={() => navigation.goBack()} />
        <Text
          style={{
            alignSelf: 'center',
            marginStart: 90,
            color: 'black',
            fontSize: 20,
          }}>
          Quản lý sản phẩm
        </Text>
      </View>
      <View>
        <CustomProductAd />
      </View>
      <View style={{marginVertical:'20%'}}>
        <TouchableOpacity style={styles.button}>
          <Text style={{fontSize: 25, color: 'white'}}>Thêm sản phẩm </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProductManagement;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    borderWidth: 1,
    height: 50,
  },
  button: {
    height: 50,
    backgroundColor: '#14AB87',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 30,
    borderRadius: 10,
  },
});
