import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const Error = ({error}: {error: string | null}) => (
    <View style={styles.container}>
        <Text style={styles.text}>Something went wrong</Text>
        <Text style={styles.subText}>{error || "Unknown error occurred. Please try again!"}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        borderRadius: 8,
        padding: 20,
        borderWidth: 1,
        borderColor: '#DDD',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#666',
        marginBottom: 8,
    },
    subText: {
        fontSize: 14,
        color: '#888',
        textAlign: 'center',
    },
});

export default Error;