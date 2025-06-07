import React from "react";
import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import Menu from "@/components/Menu";
import { globalStyles } from "@/styles/global";
import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/clientApp";
import List from "@/components/List";

export default function Settings() {
  const router = useRouter();
   
  const handleLogout = async () => {
    await signOut(auth)
    .then(() => {
      router.replace("/?message=user-logged-out");
    })
    .catch((err) => {
      // TODO: Add error
      console.log(`Logout failed: ${err}`);
    })
  };

  return (
    <ScrollView>
      <View style={globalStyles.container}>
        <Text style={globalStyles.header}>Settings</Text>

        <Menu
          title="Prayer Details"
          content={[
            { label: "Location Details", link: "settings/location-details", showIcon: true },
            { label: "Juristic Method", link: "settings/juristic-method", showIcon: true },
        
          ]}
        />
        
        <Menu
          title="User Account"
          content={[
            { label: "Account Details", link: "/settings/account-details", showIcon: true },
            { label: "Edit Account Information", link: "/account/edit-account", showIcon: true },
            { label: "Delete Account", link: "/account/delete-account", showIcon: true },
        
          ]}
        />

        <List
          title="About"
          items={[
            { label: "Version", subtext: "0.0.1", },      
          ]}
        />  

        <TouchableOpacity style={globalStyles.signOutButton} onPress={handleLogout}>
          <Text style={globalStyles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
