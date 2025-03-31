import React, { useEffect } from "react";
import { Stack } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import { style as headerStyle } from "@/styles/header";
import { fetchHaramWeatherDetails, fetchPrayerTimings } from "@/api/prayerDataApi";
import { locations } from "@/types/prayer";
import cache from "@/api/cache";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  // Will only run once when the app is loaded
  useEffect(() => {
    const cachePrayerRelatedData = async () => {
      // Check last cached data
      const lastCacheTimeString = await cache.get('lastPrayerDataCacheTime');
      const currentTime = new Date().getTime();
      const oneDayInMs = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
      let shouldRefreshCache = true;
      
      // If cache data, check if more than a day
      if (lastCacheTimeString) {
        const lastCacheTime = parseInt(lastCacheTimeString);
        shouldRefreshCache = (currentTime - lastCacheTime) >= oneDayInMs;
      }
      
      // If less than a day, skip refresh
      if (!shouldRefreshCache) {
        console.log('Prayer data cache is less than a day old. Skipping refresh.');
        return;
      }
      
      console.log('Refreshing prayer data cache...');
      
      // Otherwise, proceed with fetching and caching data
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
      
      // After successfully updating the cache, update the timestamp
      await cache.set('lastPrayerDataCacheTime', currentTime.toString())
        .catch(err => console.log('Error saving cache timestamp:', err));
    };
    
    cachePrayerRelatedData();
  }, []);
      
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ 
            title: "Home",
            headerShown: false
          }} />
          <Stack.Screen name="docs" options={{ 
            title: "Docs",
            headerShown: false
          }} />
          <Stack.Screen name="resources" options={{ 
            title: "Resources",
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
    </SafeAreaProvider>
  );
}
