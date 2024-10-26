import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const RadioButtonGroup = () => {
    const radioButtons = useMemo(() => ([
        {
            id: '1',
            label: 'Thanh toán bằng tiền mặt',
            value: 'option1',
        },
        {
            id: '2',
            label: 'Thanh toán bằng ví momo',
            value: 'option2',
        }
    ]), []);

    const [selectedValue, setSelectedValue] = React.useState('');

    return (
        <View>
            {radioButtons.map(button => (
                <TouchableOpacity
                    key={button.id}
                    style={styles.buttonContainer}
                    onPress={() => setSelectedValue(button.value)}
                >
                    <View style={styles.radioButton}>
                        {selectedValue === button.value && <View style={styles.selected} />}
                    </View>
                    <Text>{button.label}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
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
        marginBottom:20
    },
    selected: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#000',
    },
});

export default RadioButtonGroup;
