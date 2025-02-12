import React from "react";
import { View, Text, Button } from "react-native";
import { auth } from "../../firebase/clientApp";
import { signOut } from "firebase/auth";

const AdminDashboard = ({ navigation }) => {
  const handleLogout = async () => {
    await signOut(auth);
    navigation.replace("AdminLogin");
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>Admin Dashboard</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default AdminDashboard;
