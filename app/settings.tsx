import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Menu from "@/components/Menu";
import { Link } from "expo-router";
import { globalStyles } from "@/common/style";

export default function Index() {
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.header}>Settings</Text>

      <Menu
        title="Settings"
        content={[
          { label: "Setting 1", link: "/", showIcon: true },
          { label: "Setting 2", link: "/", showIcon: true },
      
        ]}
      />

      <Link href="/" asChild>
        <TouchableOpacity style={globalStyles.signOutButton}>
          <Text style={globalStyles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}
