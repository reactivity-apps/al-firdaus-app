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
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/clientApp";
import Alert from "@/components/Alert";
import { useRouter } from "expo-router";
import { globalStyles } from "@/common/style";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    type: "",
    message: ""
  });

  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      setAlert({
        type: "Error",
        message: "Please enter both email and password."
      });
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      
      // Redirect user to the main app page after login
      router.replace("/for-you");

    } catch (error: any) {
      console.log(error.message);
      switch (error.code) {
        case "auth/network-request-failed":
          setAlert({ type: "Error", message: "Network request failed. Try again!" });
          break;
        case "auth/invalid-email":
          setAlert({ type: "Error", message: "Invalid email format." });
          break;
        case "auth/user-not-found":
          setAlert({ type: "Error", message: "No user found with this email." });
          break;
        case "auth/wrong-password":
          setAlert({ type: "Error", message: "Incorrect password. Try again." });
          break;
        case "auth/user-disabled":
          setAlert({ type: "Error", message: "Account disabled. Contact support." });
          break;
        case "auth/too-many-requests":
          setAlert({ type: "Error", message: "Too many failed attempts. Try later." });
          break;
        default:
          setAlert({ type: "Error", message: "An error occurred. Please try again." });
      }
    }
    setLoading(false);
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={globalStyles.container}>
        <Text style={globalStyles.header}>Sign In</Text>
        <Text style={globalStyles.subHeader}>Access your account to explore features.</Text>

        <Alert alert={alert} />

        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
          <View style={styles.signInForm}>
            <View style={styles.card}>
              <Text style={styles.header}>Welcome Back</Text>

              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor="grey"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
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
                {loading ? <ActivityIndicator color="#FFF" /> : <Text style={globalStyles.buttonText}>Sign In</Text>}
              </TouchableOpacity>

              <TouchableOpacity onPress={() => router.push('/forgot-password')}>
                <Text style={styles.helpText}>Forgot password?</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => router.push('/sign-up')}>
                <Text style={styles.signupText}>
                  Don't have an account? <Text style={styles.signupLink}>Sign Up</Text>
                </Text>
              </TouchableOpacity>

            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </ScrollView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
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
    textAlign: "center",
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
  helpText: {
    marginTop: 10,
    color: "#007AFF",
    textAlign: "center",
  },
  signupText: {
    textAlign: "center",
    marginTop: 15,
    color: "#666",
  },
  signupLink: {
    color: "#007AFF",
    fontWeight: "bold",
  },
});
