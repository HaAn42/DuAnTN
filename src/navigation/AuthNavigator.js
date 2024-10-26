import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import Login from '../screens/LoginScreen/Login'
import Register from '../screens/RegisterScreen/Register'
import Splash from '../screens/Splash/splash'
import ChangePasswordScreen from '../screens/ChangePasswordScreenChangePasswordScreen/ChangePasswordScreen'
import Home from '../screens/HomeScreen/Home';
import LikeProduct from '../screens/LikeProductScreen/LikeProduct'
import ButtomTab from './ButtomTab';
import ShoppingCart from '../screens/ShoppingCartScreen/ShoppingCart'

const AuthNavigator = () => {
    const Stack = createNativeStackNavigator()
    return (
       <NavigationContainer>
        <Stack.Navigator initialRouteName='Splash'>
            <Stack.Screen name="Splash" component={Splash} options={{headerShown:false}}/>
            <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
            <Stack.Screen name="Register" component={Register} options={{headerShown:false}}/>
            <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} options={{headerShown:false}}/>
            <Stack.Screen name="ButtomTab"component={ButtomTab}options={{headerShown:false}}/>
            
        </Stack.Navigator>
       </NavigationContainer>
    )
}

export default AuthNavigator

const styles = StyleSheet.create({})