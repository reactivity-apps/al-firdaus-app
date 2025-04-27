import React from "react";
import { View, Text } from "react-native";
import Menu from "@/components/Menu";
import { useRouter } from "expo-router";
import { globalStyles } from "@/styles/global";

export default function Index() {
  const router = useRouter();

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
    </View>
  );
}
