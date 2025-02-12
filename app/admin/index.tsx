import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Menu from "@/components/Menu";
import { Link } from "expo-router";

export default function Index() {

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Admin</Text>

      <Menu
        title="Announcements"
        content={[
          { label: "Create Announcement", link: "/admin/create-announcement", showIcon: true },
          { label: "Manage Announcements", link: "/admin/manage-announcements", showIcon: true },
        ]}
      />

      {/* Sign Out Button */}
      <Link href="/" asChild>
        <TouchableOpacity style={styles.signOutButton}>
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
    padding: 20,
    paddingTop: 30,
  },
  header: {
    fontSize: 38,
    fontWeight: "bold",
    marginBottom: 20,
  },
  signOutButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
  },
  signOutText: {
    fontSize: 16,
    color: "#FF3B30",
  },
});
