import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, ScrollView, TouchableOpacity } from "react-native";
import { collection, getDocs, Timestamp } from "firebase/firestore";
import { db } from "@/firebase/clientApp";
import { formatRelativeDate } from "@/common/utils";
import Ionicons from "@expo/vector-icons/Ionicons";
import { globalStyles } from "@/common/style";
import Loading from "@/components/Loading";

type Announcement = {
  title: string;
  message: string;
  date: Timestamp;
}

export default function ManageAnnouncements() {
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

  if(loading) return <Loading />;

  // TODO: Add error display
  
  return (
    <ScrollView>
      <View style={globalStyles.container}>
        <Text style={globalStyles.header}>Announcements</Text>
        <Text style={globalStyles.subHeader}>View and manage all announcements.</Text>
        {announcements.length > 0 ? (
          <>
            <Text style={styles.listTitle}>All Announcements</Text>
            <View style={styles.listContainer}>
              {announcements.map((item, index) => {
                const isLast = index === announcements.length - 1;
                return (
                  <View key={index} style={[styles.item, isLast && styles.lastItem]}>
                    <View style={styles.itemContent}>
                      <View style={styles.itemHeader}>
                        <Text style={styles.itemTime}>{formatRelativeDate(item.date)}</Text>
                        <Text style={styles.itemTitle}>{item.title}</Text>
                      </View>
                      <Text style={styles.itemMessage}>{item.message}</Text>
                    </View>
                    <TouchableOpacity style={styles.editIconContainer}>
                      <Ionicons name="information-circle-outline" size={25} color="#000" />
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
            <Text style={styles.footerText}>End of announcements! 🎉</Text>
          </>
        ) : ( <Text style={styles.footerText}>No announcements yet!</Text> )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
    flexDirection: "column",
    alignItems: "flex-start",
    marginBottom: 5,
    gap: 5
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
  editIconContainer: {
    width: 70,
    padding: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  footerText: {
    textAlign: "center",
    fontSize: 14,
    color: "#888",
    marginTop: 15,
  },
});
