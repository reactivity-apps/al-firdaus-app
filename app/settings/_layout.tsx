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
        <Stack.Screen name="juristic-method" options={{
            title: "Juristic Method",
            ...headerStyles
        }} />
        <Stack.Screen name="account-details" options={{
            title: "Account Details",
            ...headerStyles
        }} />
        <Stack.Screen name="edit-account" options={{
            title: "Edit Account",
            ...headerStyles
        }} />
    </Stack>
  );
}
