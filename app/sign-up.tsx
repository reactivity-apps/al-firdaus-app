import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from "firebase/auth";
import { auth, db } from "@/firebase/clientApp";
import { globalStyles } from "@/styles/global";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { doc, setDoc } from "firebase/firestore";

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const router = useRouter();

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const MIN_PW_LEN = 7;          // > 6 characters
  
    const emailError =
      !email.trim()
        ? "Email is required."
        : !emailRegex.test(email.trim())
        ? "Invalid email format."
        : "";
  
    const passwordError =
      !password.trim()
        ? "Password is required."
        : password.length < MIN_PW_LEN
        ? `Password must be at least ${MIN_PW_LEN} characters.`
        : "";
  
    const confirmPasswordError =
      !confirmPassword.trim()
        ? "Confirmation password is required."
        : password !== confirmPassword
        ? "Passwords do not match."
        : "";
  
    const newErrors = {
      fullName: fullName.trim() ? "" : "Full name is required.",
      email: emailError,
      password: passwordError,
      confirmPassword: confirmPasswordError,
    };
  
    setErrors(newErrors);
  
    return Object.values(newErrors).every(err => err === "");
  };
  
  const handleSignUp = async () => {
    setFormSubmitted(true);
    const isValid = validateForm();
    if (!isValid) return;
    setLoading(true);

    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      
      // Send verification email
      await sendEmailVerification(userCred.user);
      
      // Update user profile with name, and add user status to firestore
      await updateProfile(userCred.user, { displayName: fullName })
        .then(() => {
          setDoc(doc(db,"statuses",userCred.user.uid), { status:"user" });
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

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={globalStyles.container}>
        <Text style={globalStyles.header}>Sign Up</Text>
        <Text style={globalStyles.subHeader}>
          Create your account to get started.
        </Text>

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <View style={styles.formContainer}>
            <Text style={styles.header}>Sign Up</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Full Name</Text>
              <TextInput
                style={[
                  styles.input,
                  formSubmitted && errors.fullName && styles.inputError,
                ]}
                placeholder="Enter full name here"
                placeholderTextColor="grey"
                value={fullName}
                onChangeText={setFullName}
                autoCapitalize="words"
              />
              {formSubmitted && errors.fullName ? (
                <Text style={styles.errorText}>{errors.fullName}</Text>
              ) : null}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email Address</Text>
              <TextInput
                style={[
                  styles.input,
                  formSubmitted && errors.email && styles.inputError,
                ]}
                placeholder="Enter email here"
                placeholderTextColor="grey"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
              />
              {formSubmitted && errors.email ? (
                <Text style={styles.errorText}>{errors.email}</Text>
              ) : null}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={[
                  styles.input,
                  formSubmitted && errors.password && styles.inputError,
                ]}
                placeholder="Enter password here"
                placeholderTextColor="grey"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                autoCapitalize="none"
              />
              {formSubmitted && errors.password ? (
                <Text style={styles.errorText}>{errors.password}</Text>
              ) : null}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Confirm Password</Text>
              <TextInput
                style={[
                  styles.input,
                  formSubmitted && errors.confirmPassword && styles.inputError,
                ]}
                placeholder="Confirm password here"
                placeholderTextColor="grey"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                autoCapitalize="none"
              />
              {formSubmitted && errors.confirmPassword ? (
                <Text style={styles.errorText}>{errors.confirmPassword}</Text>
              ) : null}
            </View>

            <TouchableOpacity
              style={globalStyles.button}
              onPress={handleSignUp}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#FFF" />
              ) : (
                <Text style={globalStyles.buttonText}>Sign Up</Text>
              )}
            </TouchableOpacity>

            <View style={styles.dividerContainer}>
              <View style={styles.divider} />
              <Text style={styles.dividerText}>or continue with</Text>
              <View style={styles.divider} />
            </View>

            {/* Google sign-in */}
            <TouchableOpacity
              style={styles.googleButton}
              onPress={handleGoogleSignIn}
            >
              <Ionicons
                name="logo-google"
                size={20}
                style={{ marginRight: 8 }}
              />
              <Text style={styles.googleButtonText}>
                Sign up with Google
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </ScrollView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  formContainer: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#DDD",
    width: "100%",
    maxWidth: 400,
    alignSelf: "center",
  },
  inputContainer: {
    marginBottom: 12,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
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
  },
  inputError: {
    borderColor: "red",
  },
  errorText: {
    marginTop: 4,
    color: "red",
    fontSize: 12,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
  },
  dividerText: {
    marginHorizontal: 10,
    color: "#888",
    fontSize: 12,
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: 5,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#CDCBCB",
  },
  googleButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "600",
  },
});