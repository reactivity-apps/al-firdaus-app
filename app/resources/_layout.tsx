import React from "react";
import { headerStyle } from "@/common/style";
import { Stack } from "expo-router";

export default function ResourcesLayout() {
  return (
    <Stack>
        <Stack.Screen name="essential-prep" options={{ 
            title: "Essential Preparations",
            ...headerStyle
        }}/>
    </Stack>
  );
}
