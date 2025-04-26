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
import { auth } from "../firebase/clientApp";
import { useRouter } from "expo-router";
import { style as globalStyles } from "@/styles/global";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter(); // Initialize router

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);

      try {
        if (Platform.OS === "web") {
          window.location.href = "/admin";
        } else {
          router.replace("/admin");
        }
      } catch(error: any) {
        console.log(error);
        Alert.alert("Error", "Could not redirect. Please try again.");
      }
      
    } catch (error: any) {
      console.log(error.message);
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

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
    
      <View style={globalStyles.container}>
        
        <Text style={globalStyles.header}>Admin Login</Text>
        <Text style={globalStyles.subHeader}>Login to access further administration controls.</Text>
        
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
          style={{ flex: 1 }}>
          <View style={styles.signInForm}>
            <View style={styles.card}>
              <Text style={styles.header}>Sign In</Text>

              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor="grey"
                value={email}
                onChangeText={setEmail}
              />
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                placeholderTextColor="grey"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />

              <TouchableOpacity style={globalStyles.button} onPress={handleLogin}>
                {loading ? (
                  <ActivityIndicator color="#FFF" />
                ) : (
                  <Text style={globalStyles.buttonText}>Sign In</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </ScrollView>
  );
};

export default AdminLogin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 16,
    marginBottom: 25,
    color: "#666",
  },
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
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
    width: "100%",
  },
  button: {
    backgroundColor: "black",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#DDD",
    margin: 20,
  },
  orText: {
    marginBottom: 10,
    textAlign: "center",
    color: "#666",
  },
  googleButton: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  googleText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#666",
  },
  signupText: {
    textAlign: "center",
    marginTop: 15,
    color: "#666",
  },
  signupLink: {
    color: "blue",
    fontWeight: "bold",
  },
  helpText: {
    marginTop: 20,
    color: "blue",
  },
});
