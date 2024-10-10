import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native';

const BackButton = ({ onPress }) => {
    return (
        <TouchableOpacity style={styles.backButton} onPress={onPress}>
            <Icon name='angle-left' size={20} color="#14AB87" />
            <Text style={styles.buttonText}>Quay lại</Text>
        </TouchableOpacity>
    );
};
const BackButtonView = ({ onBackPress }) => {
    return (
        <View style={styles.container}>
            <BackButton onPress={onBackPress} />
        </View>
    );
};

export default BackButtonView;

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 16,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonText: {
        marginLeft: 8,
        fontSize: 16,
        color: '#14AB87',
    },
});
