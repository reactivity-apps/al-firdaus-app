import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/firebase/clientApp";
import { Alert } from "react-native";
import { useRouter } from "expo-router";

interface SignUpFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const useSignUp = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const router = useRouter();

  const validateForm = (formData: SignUpFormData) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const MIN_PW_LEN = 7;          // > 6 characters
  
    const emailError =
      !formData.email.trim()
        ? "Email is required."
        : !emailRegex.test(formData.email.trim())
        ? "Invalid email format."
        : "";
  
    const passwordError =
      !formData.password.trim()
        ? "Password is required."
        : formData.password.length < MIN_PW_LEN
        ? `Password must be at least ${MIN_PW_LEN} characters.`
        : "";
  
    const confirmPasswordError =
      !formData.confirmPassword.trim()
        ? "Confirmation password is required."
        : formData.password !== formData.confirmPassword
        ? "Passwords do not match."
        : "";
  
    const newErrors = {
      fullName: formData.fullName.trim() ? "" : "Full name is required.",
      email: emailError,
      password: passwordError,
      confirmPassword: confirmPasswordError,
    };
  
    setErrors(newErrors);
  
    return Object.values(newErrors).every(err => err === "");
  };
  
  const handleSignUp = async (formData: SignUpFormData) => {
    setFormSubmitted(true);
    const isValid = validateForm(formData);
    if (!isValid) return;
    setLoading(true);

    try {
      const userCred = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      
      // Send verification email
      await sendEmailVerification(userCred.user);
      
      // Update user profile with name, and add user status to firestore
      await updateProfile(userCred.user, { displayName: formData.fullName })
        .then(() => {
            setDoc(doc(db, "users", userCred.user.uid), { 
                email: formData.email,
                fullName: formData.fullName,
                createdAt: new Date().toISOString(),
                status: "user" 
            });
        });

      Alert.alert(
        "Verification Email Sent",
        "Please check your email to verify your account.",
        [
          {
            text: "OK",
            onPress: () => router.replace("/?message=new-user")
          }
        ]
      );
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
    // TODO: implement Google sign-in flow
    Alert.alert("Info", "Google sign-in not implemented yet.");
  };

  return {
    loading,
    errors,
    formSubmitted,
    handleSignUp,
    handleGoogleSignIn
  };
}; 