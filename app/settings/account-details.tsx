import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Alert,
} from "react-native";
import { auth, db } from "@/firebase/clientApp";
import { globalStyles } from "@/styles/global";
import { doc, getDoc } from "firebase/firestore";

interface UserData {
  fullName: string;
  email: string;
  createdAt: string;
  lastSignIn: string;
  providerId: string;
}

const AccountSettings = () => {
  const [userData, setUserData] = useState<UserData>({
    fullName: "",
    email: "",
    createdAt: "",
    lastSignIn: "",
    providerId: "password"
  });
  const [userStatus, setUserStatus] = useState("User");
  const [loading, setLoading] = useState(true);

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = auth.currentUser;
        
        if (!currentUser) {
          setLoading(false);
          return;
        }

        // First get data from Firebase Auth
        const userInfo = {
          fullName: currentUser.displayName || "",
          email: currentUser.email || "",
          createdAt: currentUser.metadata.creationTime || "",
          lastSignIn: currentUser.metadata.lastSignInTime || "",
          providerId: currentUser.providerData[0]?.providerId || "password",
        };

        // Then try to get user status from Firestore
        try {
          const statusDoc = await getDoc(doc(db, "statuses", currentUser.uid));
          if (statusDoc.exists()) {
            setUserStatus(statusDoc.data().status || "user");
          }
        } catch (error) {
          console.error("Error fetching user status:", error);
          setUserStatus("user");
        }

        setUserData(userInfo);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        Alert.alert("Error", "Failed to load account information");
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Format date in a readable format
  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString();
  };

  // Helper to get initial for avatar
  const getInitial = () => {
    return userData.fullName.charAt(0).toUpperCase() || 'U';
  };

  if (loading) {
    return (
      <View style={[globalStyles.container, styles.centered]}>
        <ActivityIndicator size="large" color="#000" />
        <Text style={styles.loadingText}>Loading account information...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={globalStyles.container}>
        <Text style={globalStyles.header}>Account Details</Text>
        <Text style={globalStyles.subHeader}>
          Your account information and preferences.
        </Text>

        {/* Profile Card */}
        <View style={styles.card}>
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{getInitial()}</Text>
              </View>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{userData.fullName || "Unknown"}</Text>
              <Text style={styles.profileEmail}>{userData.email}</Text>
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>{userStatus}</Text>
              </View>
            </View>
          </View>

          {/* Account Details Section */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Account Information</Text>
            
              <View style={styles.row}>
                <Text style={styles.label}>Full Name</Text>
                <Text style={styles.value}>{userData.fullName || "Not set"}</Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>Email</Text>
                <Text style={styles.value}>{userData.email}</Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>Account Created</Text>
                <Text style={styles.value}>{formatDate(userData.createdAt)}</Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>Last Sign In</Text>
                <Text style={styles.value}>{formatDate(userData.lastSignIn)}</Text>
              </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default AccountSettings;

const styles = StyleSheet.create({
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#DDD",
    width: "100%",
    maxWidth: 400,
    alignSelf: "center",
    marginBottom: 20,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#EFEFEF",
  },
  avatarContainer: {
    marginRight: 15,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "#FFF",
    fontSize: 28,
    fontWeight: "bold",
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: "#666",
    marginBottom: 6,
  },
  statusBadge: {
    backgroundColor: "#E8E8E8",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  statusText: {
    color: "#333",
    fontSize: 12,
    fontWeight: "500",
    textTransform: "capitalize",
  },
  sectionContainer: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
  },
  row: {
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexWrap: "wrap",
  },
  label: {
    fontSize: 16,
    color: "#333",
    flex: 1,
  },
  value: {
    fontSize: 14,
    color: "#888",
    flex: 1,
    textAlign: "right"
  }
});