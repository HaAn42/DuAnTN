import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import Home from '../screens/HomeScreen/Home';
import LikeProduct from '../screens/LikeProductScreen/LikeProduct';
import ShoppingCart from '../screens/ShoppingCartScreen/ShoppingCart';
import Notification from '../screens/NotificationScreen/Notification';
import Profiler from '../screens/ProfilerScreen/Profiler';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={Home}
        options={{
          headerShown: false,
          
        }}
      />
      <Stack.Screen
        name="ShopCart"
        component={ShoppingCart}
        options={{
          headerShown: false,
          
        }}
      />
    </Stack.Navigator>
    
  );
};

const ButtomTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: '#14AB87',
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          headerShown: false,
          tabBarLabel: () => null,
          tabBarIcon: ({color, size}) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="LikeProduct"
        component={LikeProduct}
        options={{
          headerShown: false,
          tabBarLabel: () => null,
          tabBarIcon: ({color, size}) => (
            <Icon name="heart" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Notification"
        component={Notification}
        options={{
          headerShown: false,
          tabBarLabel: () => null,
          tabBarIcon: ({color, size}) => (
            <Icon name="bell" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profiler}
        options={{
          tabBarLabel: () => null,
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Icon name="user" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  return <ButtomTab />;
};

export default App;
