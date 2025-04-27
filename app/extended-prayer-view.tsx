import React, { useCallback, useEffect, useState } from "react";
import { globalStyles } from "@/styles/global";
import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator, Text, View, StyleSheet, RefreshControl, Image } from "react-native";
import cache from "../api/cache";
import { PrayerDataResponse, PrayerTimings, WeatherDataResponse, getNextPrayer, getTimeUntilNextPrayer } from "@/types/prayer";
import List from "@/components/List";
import { ScrollView } from "react-native-gesture-handler";
import PrayerTimes from "@/components/PrayerTimes";
import { capitalizeFirstLetter, getImageForLocation } from "@/common/utils";

const ExtendedPrayerView = () => {
    // Pull up to refresh
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    }, []);

    const {city, address} = useLocalSearchParams<{ city: string, address: string }>();
    const [timings, setTimings] = useState<PrayerTimings | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    // Weather state variables
    const [weatherData, setWeatherData] = useState<WeatherDataResponse | null>(null); 
    const [weatherLoading, setWeatherLoading] = useState(true);

    useEffect(() => {
        const getCityPrayerData = async (city: string) => {
            try {
                const value = await cache.get(city);
                if (value) {
                    const data: PrayerDataResponse = JSON.parse(value);
                    setTimings(data.data.timings);
                } else {
                    throw new Error(`Cached data for ${city} does not exist!`);
                }
            } catch (err) {
                setError(true);
                console.log("Error fetching prayer data:", err);
            } finally {
                setLoading(false);
            }
        };

        const getCityWeatherData = async (city: string) => {
            setWeatherLoading(true);
            try {
                const weatherCacheKey = `${city}_weather`;
                const value = await cache.get(weatherCacheKey);
                
                if (value) {
                    const data: WeatherDataResponse = JSON.parse(value);
                    setWeatherData(data);
                } else {
                    throw new Error(`Cached weather data for ${city} does not exist!`);
                }
            } catch (err) {
                console.log(`Error fetching weather data for ${city}:`, err);
            } finally {
                setWeatherLoading(false);
            }
        };
    

        if (city) {
            getCityPrayerData(city);
            getCityWeatherData(city);
        }
    }, [city, refreshing]);

    const imageSource = getImageForLocation(city);

    return (
        <ScrollView refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
            <View style={globalStyles.container}>
                <Text style={globalStyles.header}>
                    Prayer Times in {city}
                </Text>
                <Text style={globalStyles.subHeader}>
                    See more prayer information.
                </Text>

                <Image source={imageSource} style={styles.image} resizeMode="cover"/>

                {loading || !timings ? (
                    <ActivityIndicator size="small" color="black" />
                ) : (
                    <View style={styles.card}>
                        <View style={styles.content}>
                            {error ? (
                                <Text style={styles.errorText}>
                                    Unable to load prayer times.
                                </Text>
                            ) : (
                                <PrayerTimes timings={timings} />
                            )}
                        </View>
                    </View>
                )}

                <List
                    title="Prayer Detail"
                    items={[
                        { 
                            label: "Next Prayer", 
                            subtext: timings ? getNextPrayer(timings) : "Unable to retrieve",
                            isLoading: loading 
                        },
                        { 
                            label: "Time Until Next Prayer", 
                            subtext: timings ? getTimeUntilNextPrayer(timings) : "Unable to retrieve",
                            isLoading: loading 
                        },
                    ]}
                />

                <List
                    title="Location Detail"
                    items={[
                        {
                            label: "Address of Haram",
                            subtext: address,
                        },
                        {
                            label: "Current Temperature",
                            subtext: weatherData ? `${weatherData.main.temp}°C/${Math.round(weatherData.main.temp * 9/5 + 32)}°F` : "Temperature unavailable",
                            isLoading: weatherLoading
                        },
                        {
                            label: "Current Weather",
                            subtext: weatherData ? capitalizeFirstLetter(weatherData.weather[0].description) : "Weather data unavailable",
                            isLoading: weatherLoading
                        },
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
    },
    image: {
        width: '100%',
        height: 200, // Bigger image for a more immersive experience
        marginBottom: 15,
        resizeMode: 'cover',
        borderRadius: 10,
      },
});