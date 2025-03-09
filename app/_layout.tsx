import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import { headerStyle } from "@/common/style";

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
    </>
  );
}
