import React, { useEffect } from "react";
import { Stack } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import { headerStyle } from "@/common/style";
import { fetchHaramWeatherDetails, fetchPrayerTimings } from "@/api/prayerDataApi";
import { locations } from "@/types/prayer";
import cache from "@/api/cache";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {

  // Will only run once when the app is loaded
  useEffect(() => {

      const cachePrayerRelatedData = async () => {
        
        for(const location of locations){
          try {
            const weatherData = await fetchHaramWeatherDetails(location.lat, location.long);
            
            if (!weatherData.coord) {
              throw new Error(weatherData.message);
            }
            console.log(`Weather data fetched for ${location.name}`);
            
            // Cache the weather data
            await cache.set(`${location.name}_weather`, JSON.stringify(weatherData))
              .catch((err) => {
                console.log(`Error caching weather data for ${location.name}:`, err);
              });
          } catch (error) {
            console.log(`Error fetching weather data for ${location.name}:`, error);
          }


          try {
            const prayerTimings = await fetchPrayerTimings(location.address);
            if (!prayerTimings || prayerTimings.code !== 200) {
              throw new Error(`Failed to fetch prayer timings for ${location.name}`);
            }

            await cache.set(location.name, JSON.stringify(prayerTimings))
              .catch(() => {
                throw Error();
              });

          } catch (error) {
            console.log(`Error caching data for ${location.name}:`, error);
            await cache.set(location.name, "failed").catch(console.log);
          } 
        }
      };
      
      cachePrayerRelatedData();
  }, []);
      
  return (
    <GestureHandlerRootView>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ 
          title: "Home",
          headerShown: false
        }} />
        <Stack.Screen name="admin" options={{ headerShown: false }} />
        <Stack.Screen name="admin-login" options={{
          title: "Admin Login",
          ...headerStyle
        }} />
        <Stack.Screen name="settings" options={{
          title: "Settings",
          ...headerStyle
        }} />
        <Stack.Screen name="extended-prayer-view" options={{
          title: "Prayer Times",
          ...headerStyle
        }} />
      </Stack>
      <StatusBar style="dark" />
    </GestureHandlerRootView>
  );
}
