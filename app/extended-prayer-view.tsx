import React, { useEffect, useState } from "react";
import { globalStyles } from "@/common/style";
import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator, Text, View, StyleSheet } from "react-native";
import cache from "./api/cache";
import { PrayerTimingsResponse, PrayerTimings } from "./api/prayerDataApi";
import { convertTo12HourFormat } from "@/common/utils";
import List from "@/components/List";
import { ScrollView } from "react-native-gesture-handler";

// TODO: Handle case if timings is null
const PrayerTimes = ({timings}: PrayerTimings) => { 
    const lastRowItemStyle = { ...styles.prayerItemContainer, ...styles.lastRow };
    const prayerNames = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

    if (!timings) {
        return <Text style={styles.errorText}>Network error: cannot load prayer times!</Text>;
    }

    return (
        <View style={styles.prayerTimesContainer}>
            {prayerNames.map((prayerName, index) => {
                const time = timings[prayerName as keyof typeof timings];

                // Apply the last row style to the last item
                const prayerItemStyle = index === prayerNames.length - 1 ? lastRowItemStyle : styles.prayerItemContainer;

                return (
                    <View key={prayerName} style={prayerItemStyle}>
                        <Text style={styles.prayerName}>{prayerName}</Text>
                        <Text style={styles.prayerTime}>{convertTo12HourFormat(time)}</Text>
                    </View>
                );
            })}
        </View>
    );
};

const PrayerCard = ({ city }: {city: string}) => {
    const [prayerData, setPrayerData] = useState<PrayerTimingsResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const getCityPrayerData = async (city: string) => {
            try {
                setLoading(true);
                const value = await cache.get(city);
                if(value !== undefined) {
                    const data: PrayerTimingsResponse = JSON.parse(value);
                    setPrayerData(data);
                } else {
                    console.error(`Cached data for ${city} does not exists!`);
                    setError(true);
                }
            } catch (error) {
                setError(true); 
                console.error(`Failed to retrive cached data for ${city}:`, error);
            } finally {
                setLoading(false);
            }
        }

        getCityPrayerData(city);
    },[]);

    return (
        <>
            {loading ? (
                <ActivityIndicator size="small" color="black" />
            ) : (
                <View style={styles.card}>
                    <View style={styles.content}>
                        {!error ? (
                            <PrayerTimes timings={prayerData?.data.timings}  />
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
        <ScrollView>
            <View style={globalStyles.container}>
                <Text style={globalStyles.header}>Prayer Times in {city}</Text>
                <Text style={globalStyles.subHeader}>See more prayer information.</Text>
                <PrayerCard city={city} />

                <List
                    title="Prayer Detail"
                    items={[
                        { label: "Next Prayer", subtext: "Asr" },
                        { label: "Current Imam", subtext: "Imam Abdul Rahman ibn Abdul Aziz al-Sudais" },
                        { label: "Time Until Next Prayer", subtext: "1:30" },
                    ]}
                />

                {/* TODO: Add link capability so the address can redirect to maps */}
                <List
                    title="Location Detail"
                    items={[
                        { label: "Address", subtext: "Al Haram, Makkah 24231, Saudi Arabia" },
                        { label: "Current Temperature", subtext: "38°C/100°F" },
                        { label: "Current Weather", subtext: "Sunny" },
                    ]}
                />
            </View>
        </ScrollView>
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

