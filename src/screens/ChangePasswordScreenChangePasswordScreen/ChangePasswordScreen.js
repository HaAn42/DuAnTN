import Icon from 'react-native-vector-icons/FontAwesome';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import BackButtonView from '../../components/buttonback';

const ChangePasswordScreen = ({ navigation }) => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChangePassword = () => {
        if (newPassword === confirmPassword) {
            console.log('Đã thay đổi mật khẩu');
        } else {
            console.log('Mật khẩu không khớp');
        }
    };

    return (
        <View style={styles.container}>
            <BackButtonView onBackPress={() => navigation.goBack()} />

            <Text style={styles.otpConfirmationText}>Xác nhận OTP</Text>
            <Text style={styles.otpSentText}>
                Mã OTP đã được gửi đến Mail:
            </Text>
            <Text style={styles.emailText}>
                example@mail.com
            </Text>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Mật khẩu mới"
                    secureTextEntry={!showNewPassword}
                    value={newPassword}
                    onChangeText={setNewPassword}
                />
                <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)} style={styles.eyeIconContainer}>
                    <Icon name={showNewPassword ? 'eye' : 'eye-slash'} size={20} style={styles.eyeIcon} />
                </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Xác nhận lại mật khẩu"
                    secureTextEntry={!showConfirmPassword}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />
                <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.eyeIconContainer}>
                    <Icon name={showConfirmPassword ? 'eye' : 'eye-slash'} size={20} style={styles.eyeIcon} />
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.confirmButton} onPress={handleChangePassword}>
                <Text style={styles.buttonText}>Xác nhận đổi mật khẩu</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ChangePasswordScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginBottom: 20,
    },
    input: {
        height: 50,
        flex: 1,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingRight: 40,
    },
    eyeIconContainer: {
        position: 'absolute',
        right: 10,
        top: 15,
    },
    eyeIcon: {
        color: '#888',
    },
    otpConfirmationText: {
        marginLeft: 15,
        marginTop: 100,
        fontSize: 18,
        marginBottom: 10,
        fontWeight: 'bold'
    },
    otpSentText: {
        marginLeft: 15,
        fontSize: 16,
        color: '#888',
        marginBottom: 5,
        fontWeight: '600'
    },
    emailText: {
        marginLeft: 15,
        fontSize: 16,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        marginBottom: 20,
    },
    confirmButton: {
        marginTop: 50,
        backgroundColor: '#14AB87',
        padding: 15,
        borderRadius: 5,
    },
    buttonText: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
