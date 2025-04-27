import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, ScrollView, KeyboardAvoidingView, Platform, Alert } from "react-native";
import { addDoc, collection, getDocs } from "firebase/firestore"; 
import { db } from "@/firebase/clientApp";
import { get_today } from "@/common/utils";
import { globalStyles } from "@/styles/global";

export default function CreateAnnouncement() {
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    title: "",
    message: "",
  });

  const onSubmit = async () => {
    setLoading(true);

    if (!values.message || !values.title) {
      Alert.alert("Error", "Please enter both a title and a message.");
      setLoading(false);
      return;
    }

    const timeout = new Promise((_, reject) => {
      setTimeout(() => reject("Network request timed out."), 10000);
    });

    // Requests times out after 10 seconds
    await Promise.race([ 
      addDoc(collection(db, "announcements"), {
        title: values.title.trim(),
        message: values.message.trim(),
        createdAt: get_today()  
      }),
      timeout
    ]).then(() => {
      Alert.alert("Success", "Successfully created announcement!");
      setValues({ title: "", message: "" }); // Reset form here

    }).catch((error) => {
      console.log(`Error occured when creating announcement: ${error}`);
      Alert.alert("Error", "Error occured when creating announcement. Please try again!");
    });

    setLoading(false);
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
    <View style={globalStyles.container}>
      <Text style={globalStyles.header}>Create Announcement</Text>
      <Text style={globalStyles.subHeader}>
        Use this form to create new announcements. They will appear on the For You page and will be sent to users as a notification.
      </Text>
    
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <View style={styles.formContainer}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter title"
            placeholderTextColor="grey"
            onChange={(e) => setValues({ ...values, title: e.nativeEvent.text })}
          />
  
          <Text style={styles.label}>Message</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Enter message (max 150 characters)"
            placeholderTextColor="grey"
            onChange={(e) => setValues({ ...values, message: e.nativeEvent.text })}
            multiline
            maxLength={150}
          />
          <Text style={styles.charCount}>{values.message.length}/150</Text>
  
          <TouchableOpacity disabled={loading} style={globalStyles.button} onPress={onSubmit}>
            <Text style={globalStyles.buttonText}>
              {loading ? <ActivityIndicator color="#FFF" /> : "Send Announcement"}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  </ScrollView>
  
  );
}
const styles = StyleSheet.create({
  formContainer: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#DDD",
    padding: 20,
    backgroundColor: "#FFF",
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#DDD",
    marginBottom: 15,
  },
  textArea: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#DDD",
    minHeight: 100,
    textAlignVertical: "top",
  },
  charCount: {
    textAlign: "right",
    fontSize: 14,
    color: "#888",
    marginTop: 5,
    marginBottom: 15,
  }
});