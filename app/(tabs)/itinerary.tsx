import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";

// Timeline Component
const Timeline = () => {
  return (
    <View style={styles.timelineContainer}>
      <View style={styles.timelineIndicator} />
      <Text style={styles.timelineText}>Your Itinerary</Text>
    </View>
  );
};

// Reusable Clickable Component for Itinerary Days
const ItineraryDay = ({ location, onPress }) => {
  return (
    <TouchableOpacity style={styles.itineraryItem} onPress={onPress}>
      <Text style={styles.itineraryText}>{location}</Text>
    </TouchableOpacity>
  );
};

export default function ItineraryScreen() {
  const itineraryDays = [
    { id: "1", location: "Jeddah" },
    { id: "2", location: "Madina" },
    { id: "3", location: "Makkah" },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Itinerary</Text>
      <Timeline />
      <FlatList
        data={itineraryDays}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ItineraryDay location={item.location} onPress={() => console.log(`${item.location} clicked`)} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  text: {
    color: "#000",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  timelineContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  timelineIndicator: {
    width: 10,
    height: 10,
    backgroundColor: "#007AFF",
    borderRadius: 5,
    marginBottom: 5,
  },
  timelineText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  itineraryItem: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    alignItems: "center",
  },
  itineraryText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
