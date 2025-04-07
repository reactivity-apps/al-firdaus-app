import React, { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl, Alert } from "react-native";
import { collection, getDocs, Timestamp, doc, updateDoc, deleteDoc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/clientApp";
import { formatRelativeDate } from "@/common/utils";
import Ionicons from "@expo/vector-icons/Ionicons";
import { style as globalStyles } from "@/styles/global";
import Loading from "@/components/Loading";
import AnnouncementModal from "@/components/AnnouncementModal";

type Announcement = {
  id: string;
  title: string;
  message: string;
  date: Timestamp;
}

export default function ManageAnnouncements() {
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
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);

  const openEditModal = (announcement: Announcement) => {
    setSelectedAnnouncement(announcement);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedAnnouncement(null);
  };

  const handleSaveAnnouncement = async (id: string, title: string, message: string) => {
    try {
      const announcementRef = doc(db, "announcements", id);
      await updateDoc(announcementRef, {
        title,
        message,
        updatedAt: Timestamp.now()
      });
      
      // Update local state
      setAnnouncements(prev => 
        prev.map(item => 
          item.id === id ? { ...item, title, message } : item
        )
      );
      
      Alert.alert("Success", "Announcement updated successfully");
    } catch (error) {
      console.error("Error updating announcement:", error);
      throw error;
    }
  };

  const handleDeleteAnnouncement = async (id: string) => {
    try {
      const announcementRef = doc(db, "announcements", id);
      await deleteDoc(announcementRef);
      
      // Update local state
      setAnnouncements(prev => prev.filter(item => item.id !== id));
      
      Alert.alert("Success", "Announcement deleted successfully");
    } catch (error) {
      console.error("Error deleting announcement:", error);
      throw error;
    }
  };

  useEffect(() => {
    const getAnnouncements = async () => {
      try {
        const data = await getDocs(collection(db, "announcements"));
        const announcementsList: Array<Announcement> = data.docs.map((item) => ({
          id: item.id,
          title: item.get("title"),
          message: item.get("message"),
          date: item.get("createdAt"),
        }));
        
        // Sort announcements by date (newest first)
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

  return (
    <>
      <ScrollView refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
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
                          <Text style={styles.itemTime}>Posted {formatRelativeDate(item.date)}</Text>
                          <Text style={styles.itemTitle}>{item.title}</Text>
                        </View>
                        <Text style={styles.itemMessage}>{item.message}</Text>
                      </View>
                      <TouchableOpacity 
                        style={styles.editIconContainer}
                        onPress={() => openEditModal(item)}
                      >
                        <Ionicons name="ellipsis-horizontal-outline" size={25} color="#000" />
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

      {/* Edit Modal */}
      <AnnouncementModal
        visible={modalVisible}
        announcement={selectedAnnouncement}
        onClose={closeModal}
        onSave={handleSaveAnnouncement}
        onDelete={handleDeleteAnnouncement}
      />
    </>
  );
}

const styles = StyleSheet.create({
  listTitle: {
    fontSize: 18,
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
    marginVertical: 20,
  },
});