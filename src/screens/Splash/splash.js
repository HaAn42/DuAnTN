import React from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Splash = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/img/logo.png')}
                style={styles.image}
            />
            <Text style={styles.title}>Mobile Store</Text>
            <Text style={styles.subtitle}>
                Chào mừng quý khách đến với {"\n"} cửa hàng chúng tôi
            </Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Register')}
            >
                <Text style={styles.buttonText}>Bắt đầu</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Register')} style={styles.registerContainer}>
                <Text style={styles.registerText}>
                    Chuyển đến trang đăng ký
                </Text>
                <Icon name='arrow-circle-right' size={20} style={styles.icon} />
            </TouchableOpacity>
        </View>
    );
}

export default Splash;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    image: {
        width: 150,
        height: 150,
        marginBottom: 20,
    },
    button: {
        width: 300,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#14AB87',
        borderRadius: 5,
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    title: {
        marginTop: 50,
        fontSize: 40,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 8,
    },
    subtitle: {
        textAlign: 'center',
        fontSize: 15,
        color: '#888',
        marginBottom: 30,
    },
    registerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
    },
    registerText: {
        fontSize: 16,
        textDecorationLine: 'underline',
    },
    icon: {
        marginLeft: 5,
        color: '#14AB87',
    },
});
