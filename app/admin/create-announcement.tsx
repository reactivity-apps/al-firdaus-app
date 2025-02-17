import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import BackButton from "@/components/BackButton";
import { addDoc, collection, getDocs } from "firebase/firestore"; 
import { db } from "@/firebase/clientApp";
import { get_today } from "@/common/utils";

export default function CreateAnnouncement() {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    type: "",
    message: ""
  });
  const [values, setValues] = useState({
    title: "",
    message: "",
  });

  const onSubmit = async () => {
    setLoading(true);

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
      setAlert({
        type: "Success",
        message: "Successfully created announcement!"
      })
    }).catch((error) => {
      console.log(`Error occured when creating announcement: ${error}`);
      setAlert({
        type: "Error",
        message: `Error occured when creating announcement. Please try again!` 
      })
    });

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <BackButton route={"/admin"} />

      <Text style={styles.header}>Create Announcement</Text>
      <Text style={styles.subHeader}>Use this form to create new announcements. These announcements will appear on the Announcements page and will be sent to users as a notification.</Text>


      {alert.message && <View style={(alert.type == "Success") ? styles.successAlertContainer : styles.errorAlertContainer}>
        <Text style={styles.alert}>{alert.message}</Text>
      </View>}

      <View style={styles.formContainer}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter title"
          placeholderTextColor="grey"
          onChange={(e) => {
            setValues({
              ...values,
              title: e.nativeEvent.text
            })
         }}/>
        
        <Text style={styles.label}>Message</Text>
        <TextInput
          style={styles.textArea}
          placeholder="Enter message (max 150 characters)"
          placeholderTextColor="grey"
          onChange={(e) => {
            setValues({
              ...values,
              message: e.nativeEvent.text
            })
          }}
          multiline
          maxLength={150} />
        <Text style={styles.charCount}>{values.message.length}/150</Text>

        <TouchableOpacity disabled={loading} style={styles.button} onPress={onSubmit}>
          <Text style={styles.buttonText}>{(loading) ? "Loading" : "Send Announcement"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F7F7F7",
    paddingTop: 30,
  },
  header: {
    fontSize: 38,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 16,
    marginBottom: 25,
    color: "#666",
  },
  successAlertContainer: {
    marginBottom: 20,
    backgroundColor: "#69d173",
    borderRadius: 8,
    padding: 15,
  },
  errorAlertContainer: {
    marginBottom: 20,
    backgroundColor: "#F19797",
    borderRadius: 8,
    padding: 15,
  },
  alert: {
    color: "#fff",
    fontWeight: "500"
  },
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
  },
  button: {
    backgroundColor: "#000",
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
});