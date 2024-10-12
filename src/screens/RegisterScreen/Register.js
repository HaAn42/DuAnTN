import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Register = ({ navigation }) => {
  return (
  
    <SafeAreaView>
      
        <View>
         <Text style ={styles.textHeader}> Đăng ký </Text>
        </View>
    </SafeAreaView>
  )
}

export default Register

const styles = StyleSheet.create({
  textHeader: {
    fontSize: 35,
    color: 'black',
    alignSelf: 'center',
    fontWeight: '500',
  },
})