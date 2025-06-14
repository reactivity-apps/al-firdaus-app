import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Alert,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { auth } from "@/firebase/clientApp";
import { globalStyles } from "@/styles/global";
import { 
  updateProfile, 
  updateEmail, 
  updatePassword, 
  EmailAuthProvider, 
  reauthenticateWithCredential, 
  deleteUser 
} from "firebase/auth";
import { useRouter } from "expo-router";
import Dropdown from "@/components/Dropdown";

interface FormErrors {
  fullName?: string;
  email?: string;
  currentPassword?: string;
  newPassword?: string;
}

const EditAccount = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  
  // Form states
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  
  // Section loading states
  const [savingName, setSavingName] = useState(false);
  const [savingEmail, setSavingEmail] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Form errors
  const [errors, setErrors] = useState<FormErrors>({});

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = auth.currentUser;
        if (!currentUser) {
          setLoading(false);
          return;
        }

        setFullName(currentUser.displayName || "");
        setEmail(currentUser.email || "");
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        Alert.alert("Error", "Failed to load account information");
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const validateName = () => {
    if (!fullName.trim()) {
      setErrors(prev => ({ ...prev, fullName: "Name is required" }));
      return false;
    }
    setErrors(prev => ({ ...prev, fullName: undefined }));
    return true;
  };

  const validateEmail = () => {
    if (!email.trim()) {
      setErrors(prev => ({ ...prev, email: "Email is required" }));
      return false;
    }
    if (!currentPassword.trim()) {
      setErrors(prev => ({ ...prev, currentPassword: "Current password is required to change email" }));
      return false;
    }
    setErrors(prev => ({ ...prev, email: undefined, currentPassword: undefined }));
    return true;
  };

  const validatePassword = () => {
    if (!currentPassword.trim()) {
      setErrors(prev => ({ ...prev, currentPassword: "Current password is required" }));
      return false;
    }
    if (!newPassword.trim()) {
      setErrors(prev => ({ ...prev, newPassword: "New password is required" }));
      return false;
    }
    if (newPassword.length < 6) {
      setErrors(prev => ({ ...prev, newPassword: "Password must be at least 6 characters" }));
      return false;
    }
    setErrors(prev => ({ ...prev, currentPassword: undefined, newPassword: undefined }));
    return true;
  };

  const handleUpdateName = async () => {
    if (!auth.currentUser) return;
    if (!validateName()) return;

    setSavingName(true);
    try {
      await updateProfile(auth.currentUser, {
        displayName: fullName
      });
      Alert.alert("Success", "Name updated successfully");
    } catch (error: any) {
      console.error("Error updating name:", error);
      Alert.alert("Error", error.message || "Failed to update name");
    } finally {
      setSavingName(false);
    }
  };

  const handleUpdateEmail = async () => {
    if (!auth.currentUser) return;
    if (!validateEmail()) return;

    setSavingEmail(true);
    try {
      const credential = EmailAuthProvider.credential(
        auth.currentUser.email!,
        currentPassword
      );
      await reauthenticateWithCredential(auth.currentUser, credential);
      await updateEmail(auth.currentUser, email);
      Alert.alert("Success", "Email updated successfully");
      setCurrentPassword("");
      setEmail(""); // Clear the email field after successful update
    } catch (error: any) {
      console.error("Error updating email:", error);
      if (error.code === "auth/wrong-password") {
        Alert.alert("Error", "Incorrect password");
      } else if (error.code === "auth/email-already-in-use") {
        Alert.alert("Error", "This email is already in use by another account");
      } else {
        Alert.alert("Error", error.message || "Failed to update email");
      }
    } finally {
      setSavingEmail(false);
    }
  };

  const handleUpdatePassword = async () => {
    if (!auth.currentUser) return;
    if (!validatePassword()) return;

    setSavingPassword(true);
    try {
      const credential = EmailAuthProvider.credential(
        auth.currentUser.email!,
        currentPassword
      );
      await reauthenticateWithCredential(auth.currentUser, credential);
      await updatePassword(auth.currentUser, newPassword);
      Alert.alert("Success", "Password updated successfully");
      setCurrentPassword("");
      setNewPassword("");
    } catch (error: any) {
      console.error("Error updating password:", error);
      if (error.code === "auth/wrong-password") {
        Alert.alert("Error", "Incorrect current password");
      } else {
        Alert.alert("Error", error.message || "Failed to update password");
      }
    } finally {
      setSavingPassword(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!auth.currentUser) return;
    
    if (deleteConfirmation.toLowerCase() !== "delete my account") {
      Alert.alert("Error", 'Please type "delete my account" to confirm');
      return;
    }

    if (!currentPassword) {
      Alert.alert("Error", "Please enter your current password");
      return;
    }

    setDeleting(true);
    try {
      const credential = EmailAuthProvider.credential(
        auth.currentUser.email!,
        currentPassword
      );
      await reauthenticateWithCredential(auth.currentUser, credential);
      await deleteUser(auth.currentUser);
      router.replace("/?message=account-deleted");
    } catch (error: any) {
      console.error("Error deleting account:", error);
      if (error.code === "auth/wrong-password") {
        Alert.alert("Error", "Incorrect password");
      } else {
        Alert.alert("Error", error.message || "Failed to delete account");
      }
    } finally {
      setDeleting(false);
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

  const dropdownItems = [
    {
      title: "Update Name",
      content: [
        {
          label: (
            <View style={styles.formSection}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Full Name</Text>
                <TextInput
                  style={[styles.input, errors.fullName && styles.inputError]}
                  value={fullName}
                  onChangeText={setFullName}
                  placeholder="Enter your full name"
                  placeholderTextColor="#999"
                />
                {errors.fullName && (
                  <Text style={styles.errorText}>{errors.fullName}</Text>
                )}
              </View>
              <TouchableOpacity
                style={[globalStyles.outlinedButton, savingName && styles.disabledButton]}
                onPress={handleUpdateName}
                disabled={savingName}
              >
                <Text style={globalStyles.outlinedButtonText}>
                  {savingName ? "Updating..." : "Update Name"}
                </Text>
              </TouchableOpacity>
            </View>
          ),
        },
      ],
    },
    {
      title: "Update Email (Coming Soon)",
      content: [
        {
          label: (
            <View style={styles.formSection}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>New Email</Text>
                <TextInput
                  style={[styles.input, styles.disabledInput]}
                  placeholder="Enter new email"
                  placeholderTextColor="#999"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  editable={false}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Current Password</Text>
                <TextInput
                  style={[styles.input, styles.disabledInput]}
                  placeholder="Enter current password"
                  placeholderTextColor="#999"
                  secureTextEntry
                  autoCapitalize="none"
                  editable={false}
                />
              </View>
              <TouchableOpacity
                style={[globalStyles.outlinedButton, styles.disabledButton]}
                disabled={true}
              >
                <Text style={[globalStyles.outlinedButtonText, styles.disabledText]}>
                  Coming Soon
                </Text>
              </TouchableOpacity>
            </View>
          ),
        },
      ],
    },
    {
      title: "Update Password",
      content: [
        {
          label: (
            <View style={styles.formSection}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Current Password</Text>
                <TextInput
                  style={[styles.input, errors.currentPassword && styles.inputError]}
                  value={currentPassword}
                  onChangeText={setCurrentPassword}
                  placeholder="Enter current password"
                  placeholderTextColor="#999"
                  secureTextEntry
                  autoCapitalize="none"
                />
                {errors.currentPassword && (
                  <Text style={styles.errorText}>{errors.currentPassword}</Text>
                )}
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>New Password</Text>
                <TextInput
                  style={[styles.input, errors.newPassword && styles.inputError]}
                  value={newPassword}
                  onChangeText={setNewPassword}
                  placeholder="Enter new password"
                  placeholderTextColor="#999"
                  secureTextEntry
                  autoCapitalize="none"
                />
                {errors.newPassword && (
                  <Text style={styles.errorText}>{errors.newPassword}</Text>
                )}
              </View>
              <TouchableOpacity
                style={[globalStyles.outlinedButton, savingPassword && styles.disabledButton]}
                onPress={handleUpdatePassword}
                disabled={savingPassword}
              >
                <Text style={globalStyles.outlinedButtonText}>
                  {savingPassword ? "Updating..." : "Update Password"}
                </Text>
              </TouchableOpacity>
            </View>
          ),
        },
      ],
    },
    {
      title: "Delete Account",
      content: [
        {
          label: (
            <View style={styles.formSection}>
              <Text style={styles.deleteWarning}>
                This action cannot be undone. All your data will be permanently deleted.
              </Text>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Current Password</Text>
                <TextInput
                  style={[styles.input, styles.deleteInput]}
                  value={currentPassword}
                  onChangeText={setCurrentPassword}
                  placeholder="Enter current password"
                  placeholderTextColor="#999"
                  secureTextEntry
                  autoCapitalize="none"
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Type <Text style={styles.boldText}>delete my account</Text> to confirm:</Text>
                <TextInput
                  style={[styles.input, styles.deleteInput]}
                  value={deleteConfirmation}
                  onChangeText={setDeleteConfirmation}
                  placeholder="Type delete my account"
                  placeholderTextColor="#999"
                  autoCapitalize="none"
                />
              </View>
              <TouchableOpacity 
                style={[styles.deleteButton, 
                  (deleteConfirmation.toLowerCase() !== "delete my account" || !currentPassword) && styles.deleteButtonDisabled
                ]} 
                onPress={handleDeleteAccount}
                disabled={deleting || deleteConfirmation.toLowerCase() !== "delete my account" || !currentPassword}
              >
                <Text style={styles.deleteButtonText}>
                  {deleting ? "Deleting..." : "Delete Account"}
                </Text>
              </TouchableOpacity>
            </View>
          ),
        },
      ],
    },
  ];

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView>
        <View style={globalStyles.container}>
          <Text style={globalStyles.header}>Edit Account</Text>
          <Text style={globalStyles.subHeader}>
            Update your account information
          </Text>

          <Dropdown title="Account Settings" items={dropdownItems} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default EditAccount;

const styles = StyleSheet.create({
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  formSection: {
    padding: 15,
  },
  inputContainer: {
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    color: "#555",
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    backgroundColor: "white",
    color: "#333",
  },
  inputError: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
  },
  deleteInput: {
    borderColor: "#FF3B30",
  },
  disabledButton: {
    opacity: 0.5,
  },
  deleteButton: {
    backgroundColor: "#FF3B30",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  deleteButtonDisabled: {
    backgroundColor: "#FFCCCC",
  },
  deleteButtonText: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: 16,
  },
  deleteWarning: {
    color: "#666",
    marginBottom: 15,
  },
  boldText: {
    fontWeight: "bold",
  },
  disabledInput: {
    backgroundColor: "#F5F5F5",
    borderColor: "#DDD",
  },
  disabledText: {
    color: "#999",
  },
});