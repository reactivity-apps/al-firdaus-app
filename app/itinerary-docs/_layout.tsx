import React from "react";
import { headerStyle } from "@/common/style";
import { Stack } from "expo-router";

export default function ItineraryDocsLayout() {
  return (
    <Stack>
        <Stack.Screen name="makkah-stay" options={{ 
            title: "Makkah",
            ...headerStyle
        }}/>
        <Stack.Screen name="jeddah-stay" options={{ 
            title: "Jeddah",
            ...headerStyle
        }}/>
        <Stack.Screen name="madinah-stay" options={{ 
            title: "Madinah",
            ...headerStyle
        }}/>

    </Stack>
  );
}
