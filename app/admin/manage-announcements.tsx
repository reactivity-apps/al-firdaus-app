import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, ScrollView, TouchableOpacity } from "react-native";
import BackButton from "@/components/BackButton";
import { collection, getDocs, Timestamp } from "firebase/firestore";
import { db } from "@/firebase/clientApp";
import { formatRelativeDate } from "@/common/utils";
import Ionicons from "@expo/vector-icons/Ionicons";

type Announcement = {
  title: string;
  message: string;
  date: Timestamp;
}
export default function ManageAnnouncements() {
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
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <BackButton route={"/admin"} />
        <Text style={styles.header}>Announcements</Text>
        <Text style={styles.subHeader}>View all recent announcements.</Text>

        {announcements.length ? 
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
                      <TouchableOpacity style={styles.editIconContainer}>
                        <Ionicons name="information-circle-outline" size={25} color="#000" />
                      </TouchableOpacity>
                    </View>
                  );
                }}
              />
            </View>
            <Text style={styles.footerText}>End of announcements! 🎉</Text>
          </>
          : <Text style={styles.footerText}>No announcements yet!</Text>}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "#F7F7F7", 
  },
  container: {
    flex: 1,
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
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#CDCBCB",
  },
  itemContent: {
    flex: 1,
    padding: 20,
    borderRightWidth: 1,
    borderRightColor: "#CDCBCB",
  },
  editIconContainer: {
    width: 80,
    padding: 20,
    justifyContent: "center",
    alignItems: "center"
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
