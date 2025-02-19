import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/clientApp";
import BackButton from "@/components/BackButton";
import Alert from "@/components/Alert";


const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    type: "",
    message: ""
  });

  const handleLogin = async () => {
    if (!email || !password) {
      // Alert.alert("Error", "Please enter both email and password.");
      setAlert({
        type: "Error",
        message: "Please enter both email/password."
      });
      return;
    }
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // TODO: Add redirect
      setAlert({
        type: "Success",
        message: "Logged in successfully!"
      });
      
    } catch (error: any) {
      console.log(error.message);
      switch (error.code) {
        case "auth/network-request-failed":
          setAlert({
            type: "Error",
            message: "Network request failed. Please try again!"
          });
          break;
        
        case "auth/invalid-email":
          setAlert({
            type: "Error",
            message: "Invalid email format. Please enter a valid email, i.e, name@email.com."
          });
          break;
      
        case "auth/user-not-found":
          setAlert({
            type: "Error",
            message: "No user found with this email. Please check and try again."
          });
          break;
      
        case "auth/wrong-password":
          setAlert({
            type: "Error",
            message: "Incorrect password. Please try again."
          });
          break;
      
        case "auth/user-disabled":
          setAlert({
            type: "Error",
            message: "This user account has been disabled. Contact support for help."
          });
          break;
      
        case "auth/invalid-id-token":
          setAlert({
            type: "Error",
            message: "Invalid authentication token. Please try logging in again."
          });
          break;
      
        case "auth/too-many-requests":
          setAlert({
            type: "Error",
            message: "Too many failed attempts. Try again later."
          });
          break;
      
        case "auth/operation-not-allowed":
          setAlert({
            type: "Error",
            message: "This sign-in method is currently disabled. Contact support."
          });
          break;
      
        case "auth/invalid-credential":
          setAlert({
            type: "Error",
            message: "Invalid credentials. Please check your email and password and try again."
          });
          break;
      
        default:
          setAlert({
            type: "Error",
            message: "An unknown error occurred. Please try again."
          });
      }      
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <BackButton route={"/"} />
      
      <Text style={styles.title}>Admin Login</Text>
      <Text style={styles.subTitle}>Login to access further administration controls.</Text>
      
      <Alert alert={alert} />

      {/* Sign In Form */}
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

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            {loading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text style={styles.buttonText}>Sign In</Text>
            )}
          </TouchableOpacity>

          <View style={styles.divider}></View>

          <Text style={styles.orText}>Or continue with</Text>

          <TouchableOpacity style={styles.googleButton}>
            <Text style={styles.googleText}>Login With Google</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default AdminLogin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 20,
    paddingTop: 30,
  },
  title: {
    fontSize: 38,
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
