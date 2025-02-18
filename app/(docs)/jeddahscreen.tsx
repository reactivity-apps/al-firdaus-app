import React from "react";
import { View, Text, StyleSheet } from "react-native";

const JeddahScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Stay in Jeddah</Text>
      <Text style={styles.description}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. This is the Jeddah stay page.
      </Text>
    </View>
  );
};

export default JeddahScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "gray",
  },
});
