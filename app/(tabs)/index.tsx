import { collection, getDocs, Timestamp } from "firebase/firestore";
import React, { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, RefreshControl, Alert } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { style as globalStyles } from "@/styles/global";
import { db } from "@/firebase/clientApp";
import { formatRelativeDate } from "@/common/utils";
import Loading from "@/components/Loading";
import Menu from "@/components/Menu";

// Define the type for announcements
interface Announcement {
  title: string;
  message: string;
  date: Timestamp;
}

export default function Index() {
   // Pull up to refresh
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    }, []);
  
  const [announcements, setAnnouncements] = useState<Array<Announcement>>([]);
  const [loading, setLoading] = useState(true);

  const { message } = useLocalSearchParams<{ message?: string }>();

  // TODO: message does not clear after navigating away from page
  useEffect(() => {
    if(message) {
      switch(message) {
        case "unauthorized-user":
          Alert.alert("Unauthorized access", "You do not have access to this page. Please login to continue.");
          break;
        case "user-logged-out":
          Alert.alert("Successful logout", "You have been successfully logged!");
          break;
      }
    }
  }, [message]);

  useEffect(() => {
    const getAnnouncements = async () => {
      try {
        const data = await getDocs(collection(db, "announcements"));
        const announcementsList: Array<Announcement> = data.docs.map((item) => ({
          title: item.get("title"),
          message: item.get("message"),
          date: item.get("createdAt"),
        }));
        
        announcementsList.sort((a, b) => b.date.toDate().getTime() - a.date.toDate().getTime());

        setAnnouncements(announcementsList);
      } catch (error) {
        console.log(`Error fetching announcements: ${error}`);
      } finally {
        setLoading(false);
      }
    };

    getAnnouncements();
  }, [refreshing]);


  if(loading) return <Loading />;
  
  // TODO: Add error display
  
  return (
     <ScrollView refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={globalStyles.container}>        
        <Menu
          title="Navigation"
          content={[
            { label: "Settings", link: "/settings", showIcon: true },
            { label: "Admin", link: "/admin-login", showIcon: true },
        
          ]}
        />
    
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
                          <Text style={styles.itemTime}>Posted {formatRelativeDate(item.date)}</Text>
                          <Text style={styles.itemTitle}>{item.title}</Text>
                        </View>
                        <Text style={styles.itemMessage}>{item.message}</Text>
                      </View>
                    </View>
                  );
                })}
            </View>
            <Text style={styles.footerText}>End of announcements! 🎉</Text>
          </>
        ) : (
          <Text style={styles.footerText}>No announcements yet!</Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  listTitle: {
    fontSize: 15,
    color: "gray",
    marginBottom: 15,
  },
  listContainer: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#CDCBCB",
  },
  item: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#CDCBCB",
  },
  itemContent: {
    flex: 1,
    padding: 15,
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
  footerText: {
    textAlign: "center",
    color: "gray",
    marginTop: 20,
    fontSize: 14,
  }
});
