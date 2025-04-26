import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import { style as headerStyle } from "@/styles/header";
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
