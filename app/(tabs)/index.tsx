import { formatRelativeDate } from "@/common/utils";
import { db } from "@/firebase/clientApp";
import { collection, getDocs, Timestamp } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

// Define the type for announcements
interface Announcement {
  title: string;
  message: string;
  date: Timestamp;
}

// Announcement item component
const AnnouncementItem: React.FC<Announcement> = ({ title, message, date }) => (
  <View style={styles.announcementContainer}>
    <View style={styles.row}>
      <View style={styles.avatarPlaceholder} />
      <View style={styles.textContainer}>
        <Text style={styles.announcementTitle}>{title}</Text>
        <Text style={styles.announcementMessage}>{message}</Text>
      </View>
      <Text style={styles.announcementTime}>{formatRelativeDate(date)}</Text>
    </View>
  </View>
);

export default function ItineraryScreen() {
  const [announcements, setAnnouncements] = useState<Array<Announcement>>([]);

  useEffect(() => {
    const getAnnouncements = async () => {
      try {
        const data = await getDocs(collection(db, "announcements"));
        const announcementsList: Array<Announcement> = data.docs.map((item) => ({
          title: item.get("title"),
          message: item.get("message"),
          date: item.get("createdAt"),
        }));
        setAnnouncements(announcementsList);
      } catch (error) {
        console.log(`Error fetching announcements: ${error}`);
      }
    };

    getAnnouncements();
  }, []); 

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Announcements</Text>
      {announcements.length ? 
        <>
          <Text style={styles.subHeader}>All Announcements</Text>
          <FlatList
            data={announcements}
            renderItem={({ item }) => <AnnouncementItem {...item} />}
            ListFooterComponent={<Text style={styles.footerText}>End of announcements!</Text>}
          />
        </>
      : <Text style={styles.footerText}>No announcements yet!</Text>}
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
