import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import BackButton from "@/components/BackButton";

const announcements = [
  {
    id: "1",
    title: "Heading to Makkah Tomorrow",
    message:
      "Hello all, we will be heading to Makkah tomorrow on the coach. Please be ready by noon so we can arrive there on-time inshaAllah!",
    time: "8:25 AM",
  },
  {
    id: "2",
    title: "Heading to Makkah Tomorrow",
    message:
      "Hello all, we will be heading to Makkah tomorrow on the coach. Please be ready by noon so we can arrive there on-time inshaAllah!",
    time: "8:25 AM",
  },
  {
    id: "3",
    title: "Heading to Makkah Tomorrow",
    message:
      "Hello all, we will be heading to Makkah tomorrow on the coach. Please be ready by noon so we can arrive there on-time inshaAllah!",
    time: "8:25 AM",
  },
];

export default function ManageAnnouncements() {
  return (
    <View style={styles.container}>
      <BackButton route={"/admin"} />
      <Text style={styles.header}>Announcements</Text>
      <Text style={styles.subHeader}>View all recent announcements.</Text>

      <Text style={styles.listTitle}>All Announcements</Text>
      <View style={styles.listContainer}>
        <FlatList
          data={announcements}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => {
            const isLast = index === announcements.length - 1;
            return (
              <View style={[styles.item, isLast && styles.lastItem]}>
                <View style={styles.itemHeader}>
                  {/* Profile Icon Placeholder */}
                  <View style={styles.profileCircle} />
                  <Text style={styles.itemTitle}>{item.title}</Text>
                  <Text style={styles.itemTime}>{item.time}</Text>
                </View>
                <Text style={styles.itemMessage}>{item.message}</Text>
              </View>
            );
          }}
        />
      </View>
      <Text style={styles.footerText}>End of announcements!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
    padding: 20,
    paddingTop: 40,
  },
  header: {
    fontSize: 38,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 16,
    marginBottom: 25,
    color: "#666",
  },
  listTitle: {
    fontSize: 16,
    marginBottom: 15,
  },
  listContainer: {
    backgroundColor: "#FFF",
    borderRadius: 8,
  },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#CDCBCB",
  },
  lastItem: {
    borderBottomWidth: 0, // Removes bottom border for the last item
  },
  itemHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  profileCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#CCC",
    marginRight: 10,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "600",
    flex: 1,
  },
  itemTime: {
    fontSize: 14,
    color: "#888",
  },
  itemMessage: {
    fontSize: 14,
    color: "#444",
  },
  footerText: {
    textAlign: "center",
    fontSize: 14,
    color: "#888",
    marginTop: 15,
  },
});
