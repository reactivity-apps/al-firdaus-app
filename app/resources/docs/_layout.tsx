import React from "react";
import { style as headerStyle } from "@/styles/header";
import { Stack } from "expo-router";

export default function ResourcesDocsLayout() {
  return (
    <Stack>
      <Stack.Screen name="resource-1" options={{ 
            title: "Resource 1",
            ...headerStyle
      }}/>  
    </Stack>
  );
}