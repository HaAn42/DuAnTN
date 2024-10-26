import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import AwesomeAlert from 'react-native-awesome-alerts'

const Alert = () => {
    const [showAlert, setShowAlert] = useState(false)
  return (
    <View>
      <Text>Alert</Text>
      <AwesomeAlert show={showAlert}
      title='Thong bao'
      titleStyle={{fontSize:20, color:'red'}}
      message='Ban muon xoa san pham nay khong?'
      showCancelButton ={true}
      showConfirmButton={true}
      />
    </View>
  )
}

export default Alert

const styles = StyleSheet.create({})