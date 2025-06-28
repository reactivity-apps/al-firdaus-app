import React, { useCallback, useState } from "react";
import { View, Text, StyleSheet, ScrollView, RefreshControl } from "react-native";
import { globalStyles } from "@/styles/global";
import { formatRelativeDate } from "@/common/utils";
import Loading from "@/components/Loading";
import { useAnnouncements } from "@/hooks/useAnnouncements";
import Error from "@/components/Error";

export default function AllAnnouncements() {
  const [loading, setLoading] = useState(true);

  // Pull up to refresh
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
      setRefreshing(true);
      setTimeout(() => {
          setRefreshing(false);
      }, 1000);
  }, []);

  const { announcements, error } = useAnnouncements(refreshing, setLoading);

  if(loading) return <Loading />;
    
  return (
     <ScrollView refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
        <View style={globalStyles.container}>       
            {error.status ? 
              <Error error={error.message} />
            : announcements.length > 0 ? (
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
