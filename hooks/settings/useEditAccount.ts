import { useState } from "react";
import { auth, db } from "@/firebase/clientApp";
import { 
  updateProfile, 
  updateEmail, 
  updatePassword, 
  EmailAuthProvider, 
  reauthenticateWithCredential, 
  deleteUser 
} from "firebase/auth";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { Alert } from "react-native";
import { useRouter } from "expo-router";

interface FormErrors {
  fullName?: string;
  email?: string;
  currentPassword?: string;
  newPassword?: string;
}

export const useAccount = () => {
  const [loading, setLoading] = useState(true);
  const [savingName, setSavingName] = useState(false);
  const [savingEmail, setSavingEmail] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const router = useRouter();

  const validateName = (fullName: string) => {
    if (!fullName.trim()) {
      setErrors(prev => ({ ...prev, fullName: "Name is required" }));
      return false;
    }
    setErrors(prev => ({ ...prev, fullName: undefined }));
    return true;
  };

  const validateEmail = (email: string, currentPassword: string) => {
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

  const validatePassword = (currentPassword: string, newPassword: string) => {
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

  const handleUpdateName = async (fullName: string) => {
    if (!auth.currentUser) return;
    if (!validateName(fullName)) return;

    setSavingName(true);
    try {
      // Update in Firebase Auth
      await updateProfile(auth.currentUser, {
        displayName: fullName
      });

      // Update in Firestore
      await updateDoc(doc(db, "users", auth.currentUser.uid), {
        fullName: fullName
      });

      Alert.alert("Success", "Name updated successfully");
      return true;
    } catch (error: any) {
      console.error("Error updating name:", error);
      Alert.alert("Error", error.message || "Failed to update name");
      return false;
    } finally {
      setSavingName(false);
    }
  };

  const handleUpdateEmail = async (email: string, currentPassword: string) => {
    if (!auth.currentUser) return;
    if (!validateEmail(email, currentPassword)) return;

    setSavingEmail(true);
    try {
      const credential = EmailAuthProvider.credential(
        auth.currentUser.email!,
        currentPassword
      );
      await reauthenticateWithCredential(auth.currentUser, credential);
      await updateEmail(auth.currentUser, email);
      Alert.alert("Success", "Email updated successfully");
      return true;
    } catch (error: any) {
      console.error("Error updating email:", error);
      if (error.code === "auth/wrong-password") {
        Alert.alert("Error", "Incorrect password");
      } else if (error.code === "auth/email-already-in-use") {
        Alert.alert("Error", "This email is already in use by another account");
      } else {
        Alert.alert("Error", error.message || "Failed to update email");
      }
      return false;
    } finally {
      setSavingEmail(false);
    }
  };

  const handleUpdatePassword = async (currentPassword: string, newPassword: string) => {
    if (!auth.currentUser) return;
    if (!validatePassword(currentPassword, newPassword)) return;

    setSavingPassword(true);
    try {
      const credential = EmailAuthProvider.credential(
        auth.currentUser.email!,
        currentPassword
      );
      await reauthenticateWithCredential(auth.currentUser, credential);
      await updatePassword(auth.currentUser, newPassword);
      Alert.alert("Success", "Password updated successfully");
      return true;
    } catch (error: any) {
      console.error("Error updating password:", error);
      if (error.code === "auth/wrong-password") {
        Alert.alert("Error", "Incorrect current password");
      } else {
        Alert.alert("Error", error.message || "Failed to update password");
      }
      return false;
    } finally {
      setSavingPassword(false);
    }
  };

  const handleDeleteAccount = async (currentPassword: string, deleteConfirmation: string) => {
    if (!auth.currentUser) return;
    
    if (deleteConfirmation.toLowerCase() !== "delete my account") {
      Alert.alert("Error", 'Please type "delete my account" to confirm');
      return false;
    }

    if (!currentPassword) {
      Alert.alert("Error", "Please enter your current password");
      return false;
    }

    setDeleting(true);
    try {
      const credential = EmailAuthProvider.credential(
        auth.currentUser.email!,
        currentPassword
      );
      await reauthenticateWithCredential(auth.currentUser, credential);
      
      // Delete from Firestore first
      await deleteDoc(doc(db, "users", auth.currentUser.uid));
      
      // Then delete from Firebase Auth
      await deleteUser(auth.currentUser);
      
      router.replace("/?message=account-deleted");
      return true;
    } catch (error: any) {
      console.error("Error deleting account:", error);
      if (error.code === "auth/wrong-password") {
        Alert.alert("Error", "Incorrect password");
      } else {
        Alert.alert("Error", error.message || "Failed to delete account");
      }
      return false;
    } finally {
      setDeleting(false);
    }
  };

  return {
    loading,
    savingName,
    savingEmail,
    savingPassword,
    deleting,
    errors,
    handleUpdateName,
    handleUpdateEmail,
    handleUpdatePassword,
    handleDeleteAccount
  };
}; 