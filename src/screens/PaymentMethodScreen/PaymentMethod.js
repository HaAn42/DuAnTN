import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import React, { useMemo, useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';

const PaymentMethod = ({ navigation }) => {
  const radioButtons = useMemo(
    () => [
      {
        id: '1',
        value: 'option1',
        label: 'Thanh toán bằng tiền mặt',
        image: require('../../assets/img/logoMonney.png'),
      },
      {
        id: '2',
        value: 'option2',
        label: 'Thanh toán bằng ví momo',
        image: require('../../assets/img/logoMoMo.png'),
      },
    ],
    [],
  );

  const [selectedValue, setSelectedValue] = useState('');

  return (
   
      <View style={styles.paymentContainer}>
        <Text style={styles.title}>Chọn phương thức thanh toán</Text>
        {radioButtons.map(button => (
          <TouchableOpacity
            key={button.id}
            style={styles.buttonContainer}
            onPress={() => setSelectedValue(button.value)}>
            <View style={styles.radioButton}>
              {selectedValue === button.value && (
                <View style={styles.selected} />
              )}
            </View>
            <Image source={button.image} style={styles.icon} />
            <Text style={styles.label}>{button.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      
     
  );
};

export default PaymentMethod;

const styles = StyleSheet.create({
 
  
  paymentContainer: {
    borderWidth: 1,
    height:120,
    borderRadius: 5,
    borderColor: 'gray',
    padding: 10,
    alignItems:'flex-start',
    flexDirection: 'column',
  },
  title: {
    fontSize: 16,
    color: 'black',
    paddingBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
   
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  selected: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#000',
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  label: {
    flex: 1,
    textAlign: 'left',
  },
 
});
