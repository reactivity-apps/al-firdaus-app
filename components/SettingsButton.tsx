import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { useRef, useState } from "react";
import { Animated, Easing, Pressable, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Platform } from "react-native";
import { Link } from "expo-router";

export default function SettingsButton() {
    const [menuVisible, setMenuVisible] = useState(false);

    const scaleAnim = useRef(new Animated.Value(0)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;
  
    const toggleMenu = () => {
      if (menuVisible) {
        Animated.parallel([
          Animated.timing(scaleAnim, {
            toValue: 0,
            duration: 200,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 0,
            duration: 150,
            useNativeDriver: true,
          }),
        ]).start(() => setMenuVisible(false));
      } else {
        setMenuVisible(true);
        Animated.parallel([
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 250,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }),
        ]).start();
      }
    };

    return (
        <>
         <Pressable
            onPress={toggleMenu}
            style={[styles.settingsButton, Platform.OS === "web" ? { cursor: "pointer" } : {}]}>
            <Ionicons name="settings-outline" size={24} color="black" />
            </Pressable>
    
            <Animated.View
            style={[
                styles.dropdownMenu,
                {
                opacity: opacityAnim,
                transform: [
                    { scale: scaleAnim }, 
                    { translateY: scaleAnim.interpolate({ inputRange: [0, 1], outputRange: [-10, 0] }) }, // Grow downward
                    { translateX: scaleAnim.interpolate({ inputRange: [0, 1], outputRange: [20, 0] }) }, // Grow leftward
                ],
                },
            ]}
            >
            <Link href="/settings" asChild>
                <TouchableOpacity style={styles.menuItem}>
                    <Text style={styles.menuText}>Settings</Text>
                </TouchableOpacity>
            </Link>
            <Link href="/admin-login" asChild>
                <TouchableOpacity style={styles.menuItem}>
                    <Text style={styles.menuText}>Admin</Text>
                </TouchableOpacity>
            </Link>
            <TouchableOpacity style={[styles.menuItem, styles.lastItem]}>
                <Text style={styles.menuText}>Logout</Text>
            </TouchableOpacity>
            </Animated.View>
        </>
    )

}

const styles = StyleSheet.create({
    settingsButton: {
        position: "absolute",
        top: 20,
        right: 20,
        padding: 15,
        backgroundColor: "#eee",
        borderRadius: 30,
    },
    dropdownMenu: {
        position: "absolute",
        top: 50,
        right: 50,
        backgroundColor: "white",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
        paddingVertical: 5,
        width: 150,
        zIndex: 5
    },
    menuItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    menuText: {
        fontSize: 16,
    },
    lastItem: {
        borderBottomWidth: 0,
    }
});