import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Menu from "@/components/Menu";
import { globalStyles } from "@/styles/global";
import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/clientApp";

export default function Settings() {
  const router = useRouter();
   
  const handleLogout = async () => {
    await signOut(auth)
    .then(() => {
      router.replace("/");
    })
    .catch((err) => {
      // Add error
      console.log(`Logout failed: ${err}`);
    })
  };

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

      <TouchableOpacity style={globalStyles.signOutButton} onPress={handleLogout}>
        <Text style={globalStyles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}
