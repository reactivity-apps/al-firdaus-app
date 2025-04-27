import React from "react";
import { headerStyles } from "@/styles/header";
import { Stack } from "expo-router";

export default function ItineraryDocsLayout() {
  return (
    <Stack>
        <Stack.Screen name="makkah-stay" options={{ 
            title: "Makkah",
            ...headerStyles
        }}/>
        <Stack.Screen name="jeddah-stay" options={{ 
            title: "Jeddah",
            ...headerStyles
        }}/>
        <Stack.Screen name="madinah-stay" options={{ 
            title: "Madinah",
            ...headerStyles
        }}/>

    </Stack>
  );
}
