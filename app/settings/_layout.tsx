import React from "react";
import { Stack } from "expo-router";
import { headerStyles } from "@/styles/header";

export default function SettingsLayout() {      
  return (
    <Stack>
        <Stack.Screen name="index" options={{
            title: "Settings",
            ...headerStyles
        }} />
        <Stack.Screen name="location-details" options={{
            title: "Location Details",
            ...headerStyles
        }} />
    </Stack>
  );
}
