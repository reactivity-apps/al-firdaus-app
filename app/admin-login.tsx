import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/clientApp";
import BackButton from "@/components/BackButton";

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
        message: "Please enter both email and password."
      });
      return;
    }
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setAlert({
        type: "Error",
        message: "Logged in successfully!"
      });
      // Alert.alert("Success", "Logged in successfully!");
      
    } catch (error: any) {
      setAlert({
        type: "Error",
        message: "Username/password incorrect. Please try again!"
      });
      console.log(error.message);
      // Alert.alert("Username/password incorrect. Please try again!", error.message);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <BackButton route={"/"} />
      
      <Text style={styles.title}>Admin Login</Text>
      <Text style={styles.subTitle}>Use this form to create new announcements. These announcements will appear on the Announcements page and will be sent to users as a notification.</Text>
      

      {/* Sign In Form */}
      <View style={styles.signInForm}>
        <View style={styles.card}>
          <Text style={styles.header}>Sign In</Text>

          <TextInput
            style={styles.input}
            placeholder="Username"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
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
    marginBottom: 35,
    color: "#666",
  },
  signInForm: {
    alignItems: "center",
  },
  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
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
