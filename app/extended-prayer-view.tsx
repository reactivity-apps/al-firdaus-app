import React, { useState } from "react";
import { globalStyles } from "@/common/style";
import Menu from "@/components/Menu";
import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator, Text, View, StyleSheet } from "react-native";

const PrayerTimes = () => {
    return (
        <View style={styles.prayerTimesContainer}>
       
            <View style={styles.prayerItemContainer}>
                <Text style={styles.prayerName}>Fajr</Text>
                <Text style={styles.prayerTime}>6:30AM</Text>
            </View>
            <View style={styles.prayerItemContainer}>
                <Text style={styles.prayerName}>Fajr</Text>
                <Text style={styles.prayerTime}>6:30AM</Text>
            </View>
            <View style={styles.prayerItemContainer}>
                <Text style={styles.prayerName}>Fajr</Text>
                <Text style={styles.prayerTime}>6:30AM</Text>
            </View>
            <View style={styles.prayerItemContainer}>
                <Text style={styles.prayerName}>Fajr</Text>
                <Text style={styles.prayerTime}>6:30AM</Text>
            </View>
            <View style={[styles.prayerItemContainer, styles.lastRow]}>
                <Text style={styles.prayerName}>Fajr</Text>
                <Text style={styles.prayerTime}>6:30AM</Text>
            </View>
        </View>
    );
};

const PrayerCard = () => {
    const [prayerData, setPrayerData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    return (
        <>
            {loading ? (
                <ActivityIndicator size="small" color="black" />
            ) : (
                <View style={styles.card}>
                <View style={styles.content}>
                    {!error ? (
                        <PrayerTimes />
                    ) : (
                        <Text style={styles.errorText}>Network error: cannot load current prayer times!</Text>
                    )}
                </View>
                </View>
            )}
        </>
    );
};


const ExtendedPrayerView = () => {
    const { city } = useLocalSearchParams<{ city: string }>();

    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.header}>Prayer Times</Text>

            <PrayerCard />
        </View>
    );
};

export default ExtendedPrayerView;

const styles = StyleSheet.create({
    card: {
        backgroundColor: "white",
        marginBottom: 20,
        borderRadius: 8,
        flexDirection: "column",
    },
    errorText: {
        color: "red",
        alignSelf: "center",
        padding: 15
    },
    
    // Prayer Card
    

    // Content
    content: {
        flexGrow: 1, // Allow content to grow
        flexDirection: "column",
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        justifyContent: "flex-end", // Pushes prayer times to bottom
    },
 
    // Prayer Times
    prayerTimesContainer: {
        flexDirection: "column",
        justifyContent: "center",
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

