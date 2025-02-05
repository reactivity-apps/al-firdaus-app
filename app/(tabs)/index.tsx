import React from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from "react-native";

// Define the type for announcements
interface Announcement {
  id: string;
  title: string;
  message: string;
  date: string;
  imageUrl?: string; // Optional
  link?: string; // Optional
}

// Placeholder announcement data
const announcements: Announcement[] = [
  {
    id: "announcement1",
    title: "Heading to Makkah Tomorrow",
    message:
      "Hello all, we will be heading to Makkah tomorrow on the coach. Please be ready by noon so we can arrive there on-time inshaAllah!",
    date: "2025-02-05T08:25:00Z",
  },
  {
    id: "announcement2",
    title: "Heading to Makkah Tomorrow",
    message:
      "Hello all, we will be heading to Makkah tomorrow on the coach. Please be ready by noon so we can arrive there on-time inshaAllah!",
    date: "2025-02-05T08:25:00Z",
  },
  {
    id: "announcement3",
    title: "Heading to Makkah Tomorrow",
    message:
      "Hello all, we will be heading to Makkah tomorrow on the coach. Please be ready by noon so we can arrive there on-time inshaAllah!",
    date: "2025-02-05T08:25:00Z",
  },
];

// Announcement item component
const AnnouncementItem: React.FC<Announcement> = ({ title, message, date }) => (
  <View style={styles.announcementContainer}>
    <View style={styles.row}>
      <View style={styles.avatarPlaceholder} />
      <View style={styles.textContainer}>
        <Text style={styles.announcementTitle}>{title}</Text>
        <Text style={styles.announcementMessage}>{message}</Text>
      </View>
      <Text style={styles.announcementTime}>{new Date(date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</Text>
    </View>
  </View>
);

export default function ItineraryScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Announcements</Text>
      <Text style={styles.subHeader}>All Announcements</Text>
      <FlatList
        data={announcements}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <AnnouncementItem {...item} />}
        ListFooterComponent={<Text style={styles.footerText}>End of announcements!</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  subHeader: {
    fontSize: 16,
    color: "gray",
    marginVertical: 10,
  },
  announcementContainer: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ddd",
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  announcementTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  announcementMessage: {
    fontSize: 14,
    color: "#444",
    marginTop: 4,
  },
  announcementTime: {
    fontSize: 12,
    color: "gray",
  },
  footerText: {
    textAlign: "center",
    color: "gray",
    marginTop: 10,
  },
});
