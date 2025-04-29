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
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/clientApp";
import { globalStyles } from "@/styles/global";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors = {
      email: email.trim() ? "" : "Email is required.",
      password: password.trim() ? "" : "Password is required."
    };

    setErrors(newErrors);
    
    return !Object.values(newErrors).some(error => error !== "");
  };


  const handleLogin = async () => {
    setFormSubmitted(true);
    const isValid = validateForm();
    
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
    }
    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    // TODO: implement Google sign-in flow
    Alert.alert("Info", "Google sign-in not implemented yet.");
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={globalStyles.container}>
        <Text style={globalStyles.header}>Sign In</Text>
        <Text style={globalStyles.subHeader}>
          Access your account to explore personalized features.
        </Text>

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <View style={styles.signInForm}>
            <View style={styles.card}>
              <Text style={styles.header}>Sign In</Text>

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

              <TouchableOpacity
                style={[globalStyles.button]}
                onPress={handleLogin}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#FFF" />
                ) : (
                  <Text style={globalStyles.buttonText}>Sign In</Text>
                )}
              </TouchableOpacity>

              {/* divider + continue with */}
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
                  Log in with Google
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.forgotPasswordContainer}
                onPress={() => {
                  Alert.alert("Info", "Forgot password not implemented yet.");
                }}
              >
                <Text style={styles.linkText}>
                  Forgot Password?
                </Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.signUpLinkContainer}>
              <Link href="/sign-up" asChild>
                    <Text style={styles.linkText}>Don't have an account? Sign up</Text>
              </Link>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </ScrollView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  signInForm: {
    alignItems: "center",
  },
  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#DDD",
    width: "100%",
    maxWidth: 400,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
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
  forgotPasswordContainer: {
    marginTop: 15,
    alignSelf: "center",
  },
  linkText: {
    color: "#007AFF",
    fontSize: 14,
    textDecorationLine: "underline"
  },
  signUpLinkContainer: {
    alignItems: "center",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#DDD",
    width: "100%",
    maxWidth: 400,
    marginVertical: 10
  },
  
});
