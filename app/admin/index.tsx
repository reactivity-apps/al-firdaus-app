import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Menu from "@/components/Menu";
import { Link } from "expo-router";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/clientApp";
import { globalStyles } from "@/common/style";


export default function Index() {
  const handleLogout = async () => {
    await signOut(auth)
    .catch((err) => {
      console.log(`Logout failed: ${err}`);
    })
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.header}>Admin</Text>

      <Menu
        title="Manage Announcements"
        content={[
          { label: "Create Announcement", link: "/admin/create-announcement", showIcon: true },
          { label: "Manage Announcements", link: "/admin/manage-announcements", showIcon: true },
      
        ]}
      />

      <Link href="/" asChild>
        <TouchableOpacity style={globalStyles.signOutButton} onPress={handleLogout}>
          <Text style={globalStyles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}
