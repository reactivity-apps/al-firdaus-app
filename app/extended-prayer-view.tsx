import React, { useEffect, useState } from "react";
import { globalStyles } from "@/common/style";
import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator, Text, View, StyleSheet } from "react-native";
import cache from "./api/cache";
import { PrayerDataResponse, getNextPrayer, getTimeUntilNextPrayer } from "./api/prayerDataApi";
import List from "@/components/List";
import { ScrollView } from "react-native-gesture-handler";
import PrayerTimes from "@/components/PrayerTimes";

const ExtendedPrayerView = () => {
    const {city, address} = useLocalSearchParams<{ city: string, address: string }>();
    const [prayerData, setPrayerData] = useState<PrayerDataResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const getCityPrayerData = async (city: string) => {
            try {
                setLoading(true);
                const value = await cache.get(city);
                if (value) {
                    const data: PrayerDataResponse = JSON.parse(value);
                    setPrayerData(data);
                } else {
                    throw new Error(`Cached data for ${city} does not exist!`);
                }
            } catch (err) {
                setError(true);
                console.error("Error fetching prayer data:", err);
            } finally {
                setLoading(false);
            }
        };

        if (city) {
            getCityPrayerData(city);
        }
    }, [city]);

    const timings = prayerData?.data.timings;

    return (
        <ScrollView>
            <View style={globalStyles.container}>
                <Text style={globalStyles.header}>
                    Prayer Times in {city}
                </Text>
                <Text style={globalStyles.subHeader}>
                    See more prayer information.
                </Text>

                {loading ? (
                    <ActivityIndicator size="small" color="black" />
                ) : (
                    <View style={styles.card}>
                        <View style={styles.content}>
                            {error || !timings ? (
                                <Text style={styles.errorText}>
                                    Unable to load prayer times. Please try again later.
                                </Text>
                            ) : (
                                <PrayerTimes timings={timings} />
                            )}
                        </View>
                    </View>
                )}

                {(city === "Makkah" || city === "Madina") ? (
                    <>  
                        <List
                            title="Prayer Detail"
                            items={[
                                { label: "Next Prayer", subtext: getNextPrayer(timings) },
                                {
                                    label: "Current Imam", 
                                    subtext: "Imam Abdul Rahman ibn Abdul Aziz al-Sudais",
                                },
                                { label: "Time Until Next Prayer", subtext: getTimeUntilNextPrayer(timings) },
                            ]}
                        />
                        
                        <List
                            title="Location Detail"
                            items={[

                                { label: "Address of Haram", subtext: address },
                                { label: "Current Temperature", subtext: "38°C/100°F" },
                                { label: "Current Weather", subtext: "Sunny" },
                            ]}
                        />
                    </>
                ) : (
                    <List
                        title="Prayer Detail"
                        items={[
                            { label: "Next Prayer", subtext: getNextPrayer(timings) },
                            { label: "Time Until Next Prayer", subtext: getTimeUntilNextPrayer(timings) },
                        ]}
                    />
                )}
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
    },
    errorText: {
        color: "red",
        alignSelf: "center",
        padding: 15,
    },
    content: {
        flexDirection: "column",
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
    }
});