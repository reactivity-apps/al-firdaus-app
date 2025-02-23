import { formatRelativeDate } from "@/common/utils";
import SettingsButton from "@/components/SettingsButton";
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

export default function Itinerary() {
  const [announcements, setAnnouncements] = useState<Array<Announcement>>([]);
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
      }
    };

    getAnnouncements();
  }, []);


  if(loading) return <Text>Loading...</Text>;
  
  // TODO: Add error display
  
  return (
    <View style={styles.container}>
      <SettingsButton />
      <Text style={styles.header}>Announcements</Text>
  
      {announcements.length > 0 ? (
        <>
          <Text style={styles.listTitle}>All Announcements</Text>
          <View style={styles.listContainer}>
            <FlatList
              data={announcements}
              renderItem={({ item, index }) => {
                const isLast = index === announcements.length - 1;
                return (
                  <View key={index} style={[styles.item, isLast && styles.lastItem]}>
                    <View style={styles.itemContent}>
                      <View style={styles.itemHeader}>
                        <Text style={styles.itemTitle}>{item.title}</Text>
                        <Text style={styles.itemTime}>{formatRelativeDate(item.date)}</Text>
                      </View>
                      <Text style={styles.itemMessage}>{item.message}</Text>
                    </View>
                  </View>
                );
              }}
            />
          </View>
          <Text style={styles.footerText}>End of announcements! 🎉</Text>
        </>
      ) : (
        <Text style={styles.footerText}>No announcements yet!</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
    paddingTop: 30,
  },
  header: {
    fontSize: 38,
    fontWeight: "bold",
    marginBottom: 10,
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
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#CDCBCB",
  },
  itemContent: {
    flex: 1,
    padding: 20,
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  itemHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
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
    color: "gray",
    marginTop: 20,
    fontSize: 14,
  }
});
