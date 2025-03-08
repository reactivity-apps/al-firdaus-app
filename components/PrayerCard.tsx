import React from "react";
import { View, Text, StyleSheet } from "react-native";

const PrayerTimes = () => {
    const lastRowItemStyle = {...styles.prayerItemContainer, ...styles.lastRow};
    return (
        <View style={styles.prayerTimesContainer}>
            <View style={styles.prayerItemContainer}>
                <Text style={styles.prayerName}>Fajr</Text>
                <Text style={styles.prayerTime}>6:50am</Text>
            </View>

            <View style={styles.prayerItemContainer}>
                <Text style={styles.prayerName}>Fajr</Text>
                <Text style={styles.prayerTime}>6:50am</Text>
            </View>

            <View style={styles.prayerItemContainer}>
                <Text style={styles.prayerName}>Fajr</Text>
                <Text style={styles.prayerTime}>6:50am</Text>
            </View>

            <View style={styles.prayerItemContainer}>
                <Text style={styles.prayerName}>Fajr</Text>
                <Text style={styles.prayerTime}>6:50am</Text>
            </View>

            <View style={lastRowItemStyle}>
                <Text style={styles.prayerName}>Fajr</Text>
                <Text style={styles.prayerTime}>6:50am</Text>
                
            </View>
        </View>
    );
}

const PrayerCard = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.dateGroup}>
                    <Text>Rajab 20, 1445</Text>
                    <Text>January 20, 2025</Text>
                </View>
                <Text style={styles.locationName}>Madina</Text>
            </View>
            <View style={styles.content}>
                <View style={styles.reciterInfo}>
                    <View style={styles.reciterIcon}></View>
                    <Text>Sheikh Abdul Rahman al-Sudais</Text>
                </View>

                <PrayerTimes />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        marginBottom: 20,
        borderRadius: 8,
        flexDirection: "column",
    },

    // Header
    header: {
        flexDirection: "column", // Stack location and dateGroup vertically
        backgroundColor: "#e8e8e8",
        padding: 15,
        paddingTop: 15,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        position: "relative", // Allows precise control if needed
    },
    locationName: {
        fontSize: 34,
        fontWeight: "bold",
    },
    dateGroup: {
        alignSelf: "flex-end", // Moves the date to the top right
        alignItems: "flex-end", // Ensures text is aligned to the right
        marginBottom: 8, 
    },

    // Content
    content: {
        flexGrow: 1, // Allow content to grow
        flexDirection: "column",
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        padding: 15,
        justifyContent: "flex-end", // Pushes prayer times to bottom
    },
    reciterInfo: {
        flexDirection: "row",
        gap: 10
    },
    reciterIcon: {
        width: 20,
        height: 20, 
        backgroundColor: "#EDEDED",
        borderRadius: 10
    },

    // Prayer Times
    prayerTimesContainer: {
        flexDirection: "column",
        justifyContent: "center",
        marginTop: 20,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#CDCBCB",
    },
    prayerItemContainer: {
        flexDirection: "row",
        alignItems: "center",
        height: 40,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderColor: "#CDCBCB",
        justifyContent: "space-between", // Pushes time to left and name to right
    },
    lastRow: {
        borderBottomWidth: 0, // Removes border from the last row
    },
    prayerName: {
        fontWeight: "bold",
        fontSize: 15
    },
    prayerTime: {
        color: "#515151",
        fontSize: 15,
    }   
});

export default PrayerCard;