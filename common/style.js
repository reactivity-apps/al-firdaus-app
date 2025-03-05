"use strict";
import { StyleSheet } from "react-native";

const globalStyles = StyleSheet.create({
    // Containers
    container: {
        flex: 1,
        padding: 20,
    },

    // Headers
    header: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 10,
    },
    subHeader: {
        fontSize: 16,
        marginBottom: 25,
        color: "#666",
    },

    // Buttons
    button: {
        backgroundColor: "#000",
        borderRadius: 8,
        padding: 15,
        alignItems: "center",
        marginTop: 10,
    },
    buttonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "600",
    },
    signOutButton: {
        backgroundColor: "#FFFFFF",
        borderRadius: 8,
        padding: 15,
        alignItems: "center",
    },
    signOutText: {
        fontSize: 16,
        color: "#FF3B30",
    },
});

const headerStyle = {
    headerStyle: {
        backgroundColor: "#fff",
    },
    headerTintColor: "#000",
    tabBarStyle: {
        backgroundColor: "#fff",
    },
};

export { globalStyles, headerStyle };
