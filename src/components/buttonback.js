import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {TouchableOpacity} from 'react-native';

const BackButton = ({onPress}) => {
  return (
    <View style={{flexDirection: 'row',}}>
        <View>
     <TouchableOpacity style={styles.backButton} onPress={onPress}>
        <Icon name="angle-left" size={30} color="black" />
      </TouchableOpacity>
        </View>
    </View>
  );
};
const BackButtonView = ({onBackPress}) => {
  return (
    <View style={styles.container}>
      <BackButton onPress={onBackPress} />
    </View>
  );
};

export default BackButtonView;

const styles = StyleSheet.create({
  
  backButton: {
   borderColor:'gray',
   borderWidth:1, 
   width:40,
   height:40,
   justifyContent:'center',
   alignItems:'center',
   borderRadius:8   
  }
});
