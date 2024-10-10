import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';

const Itemproduct = () => {
    return (
        <View style={styles.container}>
            <Image
                source={{ uri: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:0/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-16-pro_1.png' }}
                style={styles.image}
                resizeMode="cover"
            />
            <Text style={styles.productName}>iPhone 16 Pro</Text>
            <Text style={styles.productPrice}>20.000.000 VND</Text>
            <Text style={styles.productStorage}>128 GB</Text>
        </View>
    );
}

export default Itemproduct;

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        width: 140,
        height: 250,
        padding: 10,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    image: {
        width: '100%',
        height: 140,
        borderRadius: 5,
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 5,
        textAlign: 'center',
    },
    productPrice: {
        fontSize: 14,
        color: '#888',
        marginTop: 3,
        textAlign: 'center',
    },
    productStorage: {
        fontSize: 14,
        color: '#888',
        marginTop: 3,
        textAlign: 'center',
    },
});
