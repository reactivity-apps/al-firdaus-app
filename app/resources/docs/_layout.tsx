import React from "react";
import { style as headerStyle } from "@/styles/header";
import { Stack } from "expo-router";

export default function ResourcesDocsLayout() {
  return (
    <Stack>
      <Stack.Screen name="spiritual-1" options={{ 
            title: "Resource",
            ...headerStyle
      }}/>  
    </Stack>
  );
}