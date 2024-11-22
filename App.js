import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Splash from './src/screens/Splash/splash';
import ChangePasswordScreen from './src/screens/ChangePasswordScreenChangePasswordScreen/ChangePasswordScreen';

import AuthNavigator from './src/navigation/AuthNavigator';
import Register from './src/screens/RegisterScreen/Register';
import Home from './src/screens/HomeScreen/Home';
import ButtomTab from './src/navigation/ButtomTab';
import ProductManagement from './src/Admin/screen/Admin/ProductManagement';
import DetailProduct from './src/screens/DetailProductScreen/DetailProduct';
import ShoppinCartItem from './src/components/ShoppinCartItem';
import ProductEdit from './src/Admin/screen/ProductEdit';
import ShoppingCart from './src/screens/ShoppingCartScreen/ShoppingCart';
import Profiler from './src/screens/ProfilerScreen/Profiler';
import SuccessfulPay from './src/screens/SuccessfulPayScreen/SuccessfulPay';
import PaymentMethod from './src/screens/PaymentMethodScreen/PaymentMethod';
import RadioButtonGroup from './src/components/RadioButton';
import Address from './src/screens/DeliveryAddressScreen/Address';
import Pay from './src/screens/PayScreen/Pay';
import Setting from './src/screens/SettingScreen/Setting';
import Notification from './src/screens/NotificationScreen/Notification';
import Navigation from './src/Admin/navigation/Navigation';
import ProductItem from './src/components/ProductItem';
import store from './src/redux/store';
import { Provider } from 'react-redux';


const App = () => {
  return (
 
 //<Register/>
 //<ChangePasswordScreen/>
 //<Home/>
 //<ButtomTab/>
 //<Draw/>
// <ProductManagement/>
 //<DetailProduct/>
//<ShoppinCartItem/>
//<ProductEdit/>
//<ShoppingCart/>
//<Profiler/>
//<SuccessfulPay/>
//<RadioButtonGroup/>
//<PaymentMethod/>
//<Address/>
//<Pay/>
//<Setting/>
//<ProductItem/>

<Provider store={store}>
<AuthNavigator/>
</Provider>

  )
}

export default App

const styles = StyleSheet.create({})