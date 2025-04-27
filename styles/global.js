import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
    // Containers
    container: {
        flex: 1,
        padding: 20,
        paddingBottom: 40
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
        borderWidth: 1,
        borderColor: "#CDCBCB",
        padding: 15,
        alignItems: "center",
    },
    signOutText: {
        fontSize: 16,
        color: "#FF3B30",
    },
    outlinedButton: {
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#CDCBCB",
        borderRadius: 8,
        padding: 15,
        alignItems: "center",
    }
});