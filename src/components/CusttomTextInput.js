import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';

const CusttomTextInput = ({value, onChangeText, label,secureTextEntry}) => {
  return (
   <View>
        <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        placeholder={label}
        />
      </View>
  );
};

const styles = StyleSheet.create({
  input:{
    width:240,
    paddingStart:5
  }
});
export default CusttomTextInput;
