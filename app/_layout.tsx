import React, { useEffect } from "react";
import { Stack } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import { headerStyle } from "@/common/style";
import { fetchPrayerTimings } from "./api/prayerDataApi";
import { Location } from "@/types/prayer";
import cache from "./api/cache";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {

  // Will only run once when the app is loaded
  // If already ran, will not run again until the next day
  useEffect(() => {
      const locations: Location[] = [
        { name: "Makkah", address: "Al Haram, Makkah 24231, Saudi Arabia" },
        { name: "Madina", address: "Al Haram, Madinah 42311, Saudi Arabia" },
        { name: "Hilliard", address: "Davidson Rd, Hilliard, OH" }
      ];

      const cachePrayerData = async () => {
        // const today = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD
        // const lastUpdated = await cache.get("lastUpdateDate");

        // if (lastUpdated === today) {
        //   console.log("Prayer timings already updated today.");
        //   return; // Exit if data is already updated today
        // }

        for(const location of locations){
          try {
            const prayerTimings = await fetchPrayerTimings(location.address);
            if (!prayerTimings || prayerTimings.code !== 200) {
              throw new Error(`Failed to fetch prayer timings for ${location.name}`);
            }

            await cache.set(location.name, JSON.stringify(prayerTimings))
              .catch((err) => {
                throw Error();
              });

              // await cache.set("lastUpdateDate", today); // Save today's date
              // console.log("Prayer timings updated successfully.");
          } catch (error) {
            console.error(`Error caching data for ${location.name}:`, error);
            await cache.set(location.name, "failed").catch(console.error);
          } 
        }
      };
      
      cachePrayerData();
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
