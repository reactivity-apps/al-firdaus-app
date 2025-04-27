import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import { headerStyles } from "@/styles/header";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {      
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ 
            title: "Home",
            headerShown: false
          }} />
          <Stack.Screen name="itinerary-docs" options={{ 
            title: "Itinerary Docs",
            headerShown: false
          }} />
          <Stack.Screen name="resources" options={{ 
            title: "Resources",
            headerShown: false
          }} />
          <Stack.Screen name="admin" options={{ headerShown: false }} />

          <Stack.Screen name="settings" options={{
            title: "Settings",
            ...headerStyles
          }} />
          <Stack.Screen name="extended-prayer-view" options={{
            title: "Prayer Times",
            ...headerStyles
          }} />
          <Stack.Screen name="all-announcements" options={{
            title: "All Announcements",
            ...headerStyles
          }} />
           <Stack.Screen name="sign-up" options={{
            title: "Sign Up",
            ...headerStyles
          }} />
        </Stack>
        <StatusBar style="dark" />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
