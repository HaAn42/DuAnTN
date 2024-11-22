import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {TouchableOpacity} from 'react-native';

const BackButton = () => {
  return (
    <View style={{flexDirection: 'row',}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={25} color="black" />
        </TouchableOpacity>
    </View>
  );
};


export default BackButton;

