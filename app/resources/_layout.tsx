import React from "react";
import { style as headerStyle } from "@/styles/header";
import { Stack } from "expo-router";

export default function ResourcesLayout() {
  return (
    <Stack>
       <Stack.Screen name="docs" options={{ 
            title: "Docs",
            headerShown: false
        }}/>
        <Stack.Screen name="essential-prep" options={{ 
            title: "Essential Preparations",
            ...headerStyle
        }}/>
    </Stack>
  );
}
