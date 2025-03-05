import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ 
          title: "Home",
          headerShown: false
        }} />
        <Stack.Screen name="admin" options={{ headerShown: false }} />
        <Stack.Screen name="admin-login" options={{
          title: "Admin Login",
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTintColor: '#000',
          tabBarStyle: {
              backgroundColor: '#fff',
          },
        }} />
        <Stack.Screen name="settings" options={{
          title: "Settings",
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTintColor: '#000',
          tabBarStyle: {
              backgroundColor: '#fff',
          },
        }} />
      </Stack>
      <StatusBar style="dark" />
    </>
  );
}
