import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Alert,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { auth, db } from "@/firebase/clientApp";
import { globalStyles } from "@/styles/global";
import { doc, getDoc } from "firebase/firestore";
import { Ionicons } from "@expo/vector-icons";
import { sendEmailVerification } from "firebase/auth";

interface UserData {
  fullName: string;
  email: string;
  createdAt: string;
  lastSignIn: string;
  providerId: string;
  emailVerified: boolean;
}

const AccountSettings = () => {
  const [userData, setUserData] = useState<UserData>({
    fullName: "",
    email: "",
    createdAt: "",
    lastSignIn: "",
    providerId: "password",
    emailVerified: false
  });
  const [userStatus, setUserStatus] = useState("User");
  const [loading, setLoading] = useState(true);
  const [sendingVerification, setSendingVerification] = useState(false);
  const [cooldownTimer, setCooldownTimer] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  // Add cooldown timer effect
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (cooldownTimer > 0) {
      interval = setInterval(() => {
        setCooldownTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [cooldownTimer]);

  const fetchUserData = async () => {
    try {
      const currentUser = auth.currentUser;
      
      if (!currentUser) {
        setLoading(false);
        return;
      }

      // Force reload user to get latest verification status
      await currentUser.reload();
      const updatedUser = auth.currentUser;

      // First get data from Firebase Auth
      const userInfo = {
        fullName: updatedUser?.displayName || "",
        email: updatedUser?.email || "",
        createdAt: updatedUser?.metadata.creationTime || "",
        lastSignIn: updatedUser?.metadata.lastSignInTime || "",
        providerId: updatedUser?.providerData[0]?.providerId || "password",
        emailVerified: updatedUser?.emailVerified || false
      };

      // Then try to get user status from Firestore
      try {
        const statusDoc = await getDoc(doc(db, "statuses", updatedUser?.uid || ""));
        if (statusDoc.exists()) {
          setUserStatus(statusDoc.data().status || "user");
        }
      } catch (error) {
        console.error("Error fetching user status:", error);
        setUserStatus("user");
      }

      setUserData(userInfo);
    } catch (error) {
      console.error("Error fetching user data:", error);
      Alert.alert("Error", "Failed to load account information");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Fetch user data on component mount
  useEffect(() => {
    fetchUserData();
  }, []);

  // handle page refresh
  const onRefresh = useCallback(() => {
    setRefreshing(true);
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

  const handleResendVerification = async () => {
    if (!auth.currentUser || cooldownTimer > 0) return;
    
    setSendingVerification(true);
    try {
      await sendEmailVerification(auth.currentUser);
      setCooldownTimer(60); // Start 60 second cooldown
      Alert.alert(
        "Verification Email Sent",
        "Please check your email for the verification link."
      );
    } catch (error: any) {
      console.error("Error sending verification email:", error);
      Alert.alert(
        "Error",
        error.message || "Failed to send verification email. Please try again."
      );
    } finally {
      setSendingVerification(false);
    }
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
    <ScrollView 
      contentContainerStyle={{ flexGrow: 1 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
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
              <View style={styles.badgeContainer}>
                <View style={styles.statusBadge}>
                  <Text style={styles.statusText}>{userStatus}</Text>
                </View>
                {userData.emailVerified ? (
                  <View style={styles.verifiedBadge}>
                    <Ionicons name="checkmark-circle" size={12} color="#34C759" />
                    <Text style={styles.verifiedText}>Email verified</Text>
                  </View>
                ) : (
                  <View style={styles.verificationContainer}>
                    <View style={styles.verificationBadge}>
                      <Ionicons name="warning" size={12} color="#FF3B30" />
                      <Text style={styles.verificationText}>Email not verified</Text>
                    </View>
                    <TouchableOpacity 
                      onPress={handleResendVerification}
                      disabled={sendingVerification || cooldownTimer > 0}
                      style={styles.resendLink}
                    >
                      <Text style={[
                        styles.resendText,
                        (sendingVerification || cooldownTimer > 0) && styles.resendTextDisabled
                      ]}>
                        {sendingVerification 
                          ? "Sending..." 
                          : cooldownTimer > 0 
                            ? `Resend in ${cooldownTimer}s`
                            : "Resend verification email"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
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
  badgeContainer: {
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap",
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
  verificationContainer: {
    flexDirection: "column",
    gap: 4,
  },
  verificationBadge: {
    backgroundColor: "#FFE5E5",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  verificationText: {
    color: "#FF3B30",
    fontSize: 12,
    fontWeight: "500",
  },
  verifiedBadge: {
    backgroundColor: "#E5F9E5",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  verifiedText: {
    color: "#34C759",
    fontSize: 12,
    fontWeight: "500",
  },
  resendLink: {
    marginLeft: 2,
  },
  resendText: {
    color: "#007AFF",
    fontSize: 12,
    textDecorationLine: "underline",
  },
  resendTextDisabled: {
    color: "#999",
    textDecorationLine: "none",
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