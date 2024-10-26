
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import ProductManagement from '../Admin/screen/Admin/ProductManagement'

const Draw = () => {
    const Drawer = createDrawerNavigator(); 
  return (
   <NavigationContainer>
    <Drawer.Navigator>
        <Drawer.Screen name='Product' component={ProductManagement}/>
        
    </Drawer.Navigator>
    
   </NavigationContainer>
  )
}

export default Draw
