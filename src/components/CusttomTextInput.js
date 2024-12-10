import { StyleSheet, TextInput, View } from 'react-native';
import React from 'react';

const CusttomTextInput = ({ value, onChangeText, label, secureTextEntry, style }) => {
  return (
    <View style={[styles.inputContainer, style]}>
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
  
  input: {
    height: 45,
    
     // Default border color, will be changed if necessary
    borderRadius: 5,
    paddingLeft: 10,       // Padding for the left side
    paddingRight: 10,      // Padding for the right side
  },
});

export default CusttomTextInput;
