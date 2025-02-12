import React from "react";
import { useForm, Controller } from "react-hook-form";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import BackButton from "@/components/BackButton";

type NotificationFormData = {
  title: String;
  message: String;
}

export default function CreateAnnouncement() {
  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      title: "",
      message: "",
    },
  });

  const message = watch("message"); // Watch message length

  const onSubmit = (data: NotificationFormData) => {
    // Alert.alert("Notification Sent", `Title: ${data.title}\nMessage: ${data.message}`);
    console.log(`Title: ${data.title}\nMessage: ${data.message}`);
  };

  return (
    <View style={styles.container}>
      <BackButton route={"/admin"} />

      <Text style={styles.header}>Create Announcement</Text>
      <Text style={styles.subHeader}>Use this form to create new announcements. These announcements will appear on the Announcements page and will be sent to users as a notification.</Text>
      <View style={styles.formContainer}>
        {/* Title Input */}
        <Text style={styles.label}>Title</Text>
        <Controller
          control={control}
          name="title"
          rules={{ required: "Title is required" }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Enter title"
              placeholderTextColor="grey"
              value={value}
              onChangeText={onChange}
            />
          )}
        />

        {/* Message Input */}
        <Text style={styles.label}>Message</Text>
        <Controller
          control={control}
          name="message"
          rules={{ required: "Message is required", maxLength: 150 }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.textArea}
              placeholder="Enter message (max 150 characters)"
              placeholderTextColor="grey"
              value={value}
              onChangeText={onChange}
              multiline
              maxLength={150}
            />
          )}
        />
        <Text style={styles.charCount}>{message.length}/150</Text>

        {/* Submit Button */}
        <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.buttonText}>Send Notification</Text>
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