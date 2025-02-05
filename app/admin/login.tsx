import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Link, useRouter } from 'expo-router';

export default function AdminLogin() {
    const router = useRouter();

    const onPress = () => router.replace("/admin");

    return (
        <View style={styles.container}>
            <Text>Login Form Here</Text>
            <Pressable style={styles.button} onPress={onPress}>
                <Text>Login Button</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center'
    },
    button: {
        padding: 10,
        borderWidth: 1,
        fontColor: 'white'
    }
});