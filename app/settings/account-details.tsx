import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Alert,
} from "react-native";
import { auth, db } from "@/firebase/clientApp";
import { globalStyles } from "@/styles/global";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { doc, getDoc } from "firebase/firestore";

const AccountSettings = () => {
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    createdAt: "",
    lastSignIn: "",
    providerId: "password" // Default provider
  });
  const [userStatus, setUserStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("MySecurePassword123"); // Example password - in a real app, you'd need a different approach

  const router = useRouter();

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = auth.currentUser;
        
        if (!currentUser) {
          router.replace("/sign-in");
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
          // Default status if error
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
  }, [router]);

  // Format date in a readable format
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString();
  };

  // Helper to get initial for avatar
  const getInitial = () => {
    return userData.fullName.charAt(0).toUpperCase() || 'U';
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
              <Text style={styles.profileName}>{userData.fullName}</Text>
              <Text style={styles.profileEmail}>{userData.email}</Text>
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>{userStatus}</Text>
              </View>
            </View>
          </View>

          {/* Account Details Section */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Account Information</Text>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Full Name</Text>
              <Text style={styles.infoValue}>{userData.fullName || "Not set"}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoValue}>{userData.email}</Text>
            </View>
            
            {/* Password Field with Show/Hide Toggle */}
            {userData.providerId === "password" && (
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Password</Text>
                <View style={styles.passwordContainer}>
                  <Text style={styles.infoValue}>
                    {showPassword ? password : "••••••••••••••"}
                  </Text>
                  <TouchableOpacity 
                    onPress={togglePasswordVisibility}
                    style={styles.passwordToggle}
                  >
                    <Ionicons 
                      name={showPassword ? "eye-off-outline" : "eye-outline"} 
                      size={20} 
                      color="#007AFF" 
                    />
                  </TouchableOpacity>
                </View>
              </View>
            )}
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Account Created</Text>
              <Text style={styles.infoValue}>{formatDate(userData.createdAt)}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Last Sign In</Text>
              <Text style={styles.infoValue}>{formatDate(userData.lastSignIn)}</Text>
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
    padding: 20,
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
    marginBottom: 20,
    paddingBottom: 15,
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
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#EFEFEF",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    paddingVertical: 4,
  },
  infoLabel: {
    color: "#666",
    fontSize: 14,
  },
  infoValue: {
    fontWeight: "500",
    fontSize: 14,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  passwordToggle: {
    marginLeft: 10,
    padding: 4,
  }
});