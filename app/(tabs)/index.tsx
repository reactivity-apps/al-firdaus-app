import { collection, getDocs, Timestamp } from "firebase/firestore";
import React, { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, RefreshControl, TouchableOpacity } from "react-native";
import { globalStyles } from "@/styles/global";
import { db } from "@/firebase/clientApp";
import Loading from "@/components/Loading";
import Menu from "@/components/Menu";
import PrayerCarousel from "@/components/PrayerCarousel";
import { Link } from "expo-router";
import { formatRelativeDate } from "@/common/utils";
import SignIn from "@/components/SignIn";
import { auth } from "@/firebase/clientApp";
import { onAuthStateChanged, User } from "firebase/auth";

// Define the type for announcements
interface Announcement {
  title: string;
  message: string;
  date: Timestamp;
}

const INITIAL_DISPLAY_COUNT = 5;

export default function ForYou() {
  // Pull up to refresh
  const [refreshing, setRefreshing] = useState(false);
  const [announcements, setAnnouncements] = useState<Array<Announcement>>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [isSignedIn, setIsSignedIn] = useState(false);
  
  // Check if user is logged in
  useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
          setUser(user);
          setLoading(false);
      });

      return () => unsubscribe();
  }, []);

  useEffect(() => {
      if (!loading && user) {
          setIsSignedIn(true)
      }
  }, [user, loading]);

  // handle page refresh
  const onRefresh = useCallback(() => {
      setRefreshing(true);
      setTimeout(() => {
          setRefreshing(false);
      }, 1000);
  }, []);

  // TODO: Add caching
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

  const displayedAnnouncements = announcements.slice(0, INITIAL_DISPLAY_COUNT);
  const hasMoreAnnouncements = announcements.length > INITIAL_DISPLAY_COUNT;

  if (loading) return <Loading />;
  if(!isSignedIn) return <SignIn />;
  
  return (
    <ScrollView 
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={globalStyles.container}>    
        <Text style={globalStyles.header}>For You</Text>    
        <Menu
          title="Navigation"
          content={[
            { label: "Settings", link: "/settings", showIcon: true },
            { label: "Admin Controls", link: "/admin", showIcon: true },
          ]}
        />

        <PrayerCarousel />

        {/* Useful Links */}
        <Menu
          title="Useful Resources"
          content={[
            { label: "Trip Itinerary", link: "/itinerary", showIcon: true },
            { label: "Umrah Guide", link: "/", showIcon: true },
            { label: "Important Resources", link: "/resources", showIcon: true },
          ]}
        />
    
        {announcements.length > 0 ? (
          <>
            <Text style={styles.listTitle}>Recent Announcements</Text>
            <View style={styles.listContainer}>
              {displayedAnnouncements.map((item, index) => {
                const isLast = index === displayedAnnouncements.length - 1 && !hasMoreAnnouncements;

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
              
              {hasMoreAnnouncements && (
                <Link href="/all-announcements" asChild>
                  <TouchableOpacity >
                    <View style={styles.itemContent}>
                      <Text style={styles.seeAllText}>See All Announcements</Text>
                    </View>
                  </TouchableOpacity>
                </ Link>
              )}
            </View>
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
  },
  seeAllText: {
    textAlign: "center",
  }
});