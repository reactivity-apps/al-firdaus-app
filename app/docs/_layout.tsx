import React from "react";
import { style as headerStyle } from "@/styles/header";
import { Stack } from "expo-router";

export default function DocsLayout() {
  return (
    <Stack>
        <Stack.Screen name="makkah-screen" options={{ 
            title: "Makkah",
            ...headerStyle
        }}/>
        <Stack.Screen name="jeddah-screen" options={{ 
            title: "Jeddah",
            ...headerStyle
        }}/>
        <Stack.Screen name="madinah-screen" options={{ 
            title: "Madinah",
            ...headerStyle
        }}/>

    </Stack>
  );
}
