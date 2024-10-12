import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Splash from './src/screens/Splash/splash';
import ChangePasswordScreen from './src/screens/ChangePasswordScreenChangePasswordScreen/ChangePasswordScreen';
import Itemproduct from './src/components/itemproduct';
import Login from './src/screens/LoginScreen/Login';
import AuthNavigator from './src/navigation/AuthNavigator';
import Register from './src/screens/RegisterScreen/Register';
const App = () => {
  return (
  <AuthNavigator/>
 //<Register/>
 //<ChangePasswordScreen/>
  )
}

export default App

const styles = StyleSheet.create({})