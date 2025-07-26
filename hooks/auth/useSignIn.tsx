import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/clientApp";
import { Alert } from "react-native";

interface FormErrors {
  email: string;
  password: string;
}

export const useSignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({
    email: "",
    password: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const validateForm = (email: string, password: string) => {
    const newErrors = {
      email: email.trim() ? "" : "Email is required.",
      password: password.trim() ? "" : "Password is required."
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== "");
  };

  const handleSignIn = async (email: string, password: string) => {
    setFormSubmitted(true);
    const isValid = validateForm(email, password);
    
    if (!isValid) return;

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      switch (error.code) {
        case "auth/network-request-failed":
          Alert.alert("Error", "Network request failed. Please try again!");
          break;

        case "auth/invalid-email":
          Alert.alert(
            "Error",
            "Invalid email format. Please enter a valid email, i.e, name@email.com."
          );
          break;

        case "auth/user-not-found":
          Alert.alert(
            "Error",
            "No user found with this email. Please check and try again."
          );
          break;

        case "auth/wrong-password":
          Alert.alert("Error", "Incorrect password. Please try again.");
          break;

        case "auth/user-disabled":
          Alert.alert(
            "Error",
            "This user account has been disabled. Contact support for help."
          );
          break;

        case "auth/invalid-id-token":
          Alert.alert(
            "Error",
            "Invalid authentication token. Please try logging in again."
          );
          break;

        case "auth/too-many-requests":
          Alert.alert("Error", "Too many failed attempts. Try again later.");
          break;

        case "auth/operation-not-allowed":
          Alert.alert(
            "Error",
            "This sign-in method is currently disabled. Contact support."
          );
          break;

        case "auth/invalid-credential":
          Alert.alert(
            "Error",
            "Invalid credentials. Please check your email and password and try again."
          );
          break;

        default:
          Alert.alert(
            "Error",
            "An unknown error occurred. Please try again."
          );
      }     
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    Alert.alert("Info", "Google sign-in not implemented yet.");
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setErrors({ email: "", password: "" });
    setFormSubmitted(false);
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    errors,
    formSubmitted,
    handleSignIn,
    handleGoogleSignIn,
    resetForm,
  };
}; 