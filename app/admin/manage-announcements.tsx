import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from "react-native";
import {
  collection,
  getDocs,
  Timestamp,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import Ionicons from "@expo/vector-icons/Ionicons";

import { db } from "@/firebase/clientApp";
import { formatRelativeDate } from "@/common/utils";
import { globalStyles } from "@/styles/global";
import Loading from "@/components/Loading";
import EditAnnouncementModal from "@/components/EditAnnouncementModal";
import DeleteAnnouncementModal from "@/components/DeleteAnnouncementModal";

type Announcement = {
  id: string;
  title: string;
  message: string;
  date: Timestamp;
};

export default function ManageAnnouncements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  const openEditModal = (announcement: Announcement) => {
    setSelectedAnnouncement(announcement);
    setEditModalVisible(true);
  };

  const closeEditModal = () => {
    setEditModalVisible(false);
    setSelectedAnnouncement(null);
  };

  const openDeleteModal = (announcement: Announcement) => {
    setSelectedAnnouncement(announcement);
    setDeleteModalVisible(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalVisible(false);
    setSelectedAnnouncement(null);
  };

  const handleSaveAnnouncement = async (id: string, title: string, message: string) => {
    try {
      const announcementRef = doc(db, "announcements", id);
      await updateDoc(announcementRef, {
        title,
        message,
        updatedAt: Timestamp.now(),
      });

      setAnnouncements(prev =>
        prev.map(item =>
          item.id === id ? { ...item, title, message } : item
        )
      );

      Alert.alert("Success", "Announcement updated successfully");
    } catch (error) {
      console.error("Error updating announcement:", error);
      Alert.alert("Error", "Could not update the announcement.");
    }
  };

  const handleDeleteAnnouncement = async (id: string) => {
    try {
      await deleteDoc(doc(db, "announcements", id));

      setAnnouncements(prev => prev.filter(item => item.id !== id));

      Alert.alert("Success", "Announcement deleted successfully");
    } catch (error) {
      console.error("Error deleting announcement:", error);
      Alert.alert("Error", "Could not delete the announcement.");
    }
  };

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const snapshot = await getDocs(collection(db, "announcements"));
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          title: doc.get("title"),
          message: doc.get("message"),
          date: doc.get("createdAt"),
        })) as Announcement[];

        data.sort((a, b) => b.date.toDate().getTime() - a.date.toDate().getTime());
        setAnnouncements(data);
      } catch (error) {
        console.error("Error fetching announcements:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, [refreshing]);

  if (loading) return <Loading />;

  return (
    <>
      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <View style={globalStyles.container}>
          <Text style={globalStyles.header}>Announcements</Text>
          <Text style={globalStyles.subHeader}>View and manage all announcements.</Text>

          {announcements.length > 0 ? (
            <>
              <Text style={styles.listTitle}>All Announcements</Text>
              <View style={styles.listContainer}>
                {announcements.map((item, index) => (
                  <View
                    key={item.id}
                    style={[styles.item, index === announcements.length - 1 && styles.lastItem]}
                  >
                    <View style={styles.itemContent}>
                      <View style={styles.itemHeader}>
                        <Text style={styles.itemTime}>Posted {formatRelativeDate(item.date)}</Text>
                        <Text style={styles.itemTitle}>{item.title}</Text>
                      </View>
                      <Text style={styles.itemMessage}>{item.message}</Text>
                    </View>
                    <View style={styles.actionIconsContainer}>
                      <TouchableOpacity onPress={() => openEditModal(item)} style={styles.iconButton}>
                        <Ionicons name="create-outline" size={20} />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => openDeleteModal(item)} style={styles.iconButton}>
                        <Ionicons name="trash-outline" size={20} />
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </View>
              <Text style={styles.footerText}>End of announcements! 🎉</Text>
            </>
          ) : (
            <Text style={styles.footerText}>No announcements yet!</Text>
          )}
        </View>
      </ScrollView>

      <EditAnnouncementModal
        visible={editModalVisible}
        announcement={selectedAnnouncement}
        onClose={closeEditModal}
        onSave={handleSaveAnnouncement}
      />

      <DeleteAnnouncementModal
        visible={deleteModalVisible}
        announcement={selectedAnnouncement}
        onClose={closeDeleteModal}
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
  lastItem: {
    borderBottomWidth: 0,
  },
  itemContent: {
    flex: 1,
    padding: 15,
  },
  itemHeader: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginBottom: 5,
    gap: 5,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  itemTime: {
    fontSize: 14,
    color: "#888",
  },
  itemMessage: {
    fontSize: 14,
    color: "#444",
  },
  actionIconsContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  iconButton: {
    marginHorizontal: 10,
  },
  footerText: {
    textAlign: "center",
    fontSize: 14,
    color: "#888",
    marginVertical: 20,
  },
});
