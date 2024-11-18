import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ProductManagement from '../screen/Admin/ProductManagement'
import OrderManagement from '../screen/Admin/OrderManagement'
import RevenueStatistics from '../screen/Admin/RevenueStatistics'
import WarehouseManagement from '../screen/Admin/WarehouseManagement'
import ProductEdit from '../screen/ProductEdit'

const Navigation = () => {
    const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
        <Stack.Navigator rotationHandlerName='Product'>
            <Stack.Screen name='Product' component={ProductManagement}/>
            <Stack.Screen name='Oder' component={OrderManagement}/>
            <Stack.Screen name='RevenueStatic' component={RevenueStatistics}/>
            <Stack.Screen name='WareHouse' component={WarehouseManagement}/>
            <Stack.Screen name='Edit' component={ProductEdit}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation
