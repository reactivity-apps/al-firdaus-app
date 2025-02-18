import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from "react-native";

// Timeline Component
const Timeline = () => {
  return (
    <View style={styles.timelineContainer}>
      <Text style={styles.timelineTitle}>Trip Timeline</Text>
      <View style={styles.timelineBox}>
        <Text style={styles.timelineHeader}>Arrive at King AbdulAziz Airport</Text>
        <Text style={styles.timelineDots}>...</Text>
        <ItineraryDay location="Jeddah" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit." />
        <ItineraryDay location="Madinah" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit." />
        <ItineraryDay location="Makkah" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit." />
      </View>
    </View>
  );
};

// Reusable Clickable Component for Itinerary Days
const ItineraryDay = ({ location, description, onPress }) => {
  return (
    <TouchableOpacity style={styles.itineraryItem} onPress={onPress}>
      <View style={styles.circle} />
      <View style={styles.itineraryTextContainer}>
        <Text style={styles.itineraryText}>{location}</Text>
        <Text style={styles.itineraryDescription}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default function ItineraryScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Itinerary</Text>
      <TextInput style={styles.searchBar} placeholder="Search" />
      <Timeline />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
  },
  searchBar: {
    backgroundColor: "#000",
    color: "#fff",
    padding: 10,
    borderRadius: 8,
    marginVertical: 10,
  },
  timelineContainer: {
    marginVertical: 10,
  },
  timelineTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  timelineBox: {
    backgroundColor: "#f5f5f5",
    padding: 15,
    borderRadius: 10,
  },
  timelineHeader: {
    fontSize: 16,
    fontWeight: "bold",
  },
  timelineDots: {
    fontSize: 20,
    textAlign: "center",
  },
  itineraryItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginVertical: 5,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "gray",
    marginRight: 10,
  },
  itineraryTextContainer: {
    flex: 1,
  },
  itineraryText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  itineraryDescription: {
    fontSize: 14,
    color: "gray",
  },
});

