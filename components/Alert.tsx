import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

type Props = {
  alert: {
    type: string;
    message: string;
  };
};

const Alert = ({ alert }: Props) => {
  const [isVisible, setIsVisible] = useState(false);

  // Reset visibility whenever the alert changes
  useEffect(() => {
    if (alert.message) {
      setIsVisible(true);
    }
  }, [alert]);

  if (!isVisible || !alert.message) return null;

  return (
    <View
      style={[
        alert.type === "Success" ? styles.successAlertContainer : styles.errorAlertContainer,
      ]}
    >
      <Text style={styles.alert}>{alert.message}</Text>
      <TouchableOpacity onPress={() => setIsVisible(false)} style={styles.closeButton}>
        <Text style={styles.closeText}>Close</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Alert;

const styles = StyleSheet.create({
  successAlertContainer: {
    marginBottom: 20,
    backgroundColor: "#69d173",
    borderRadius: 8,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  errorAlertContainer: {
    marginBottom: 20,
    backgroundColor: "#F19797",
    borderRadius: 8,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  alert: {
    color: "#fff",
    fontWeight: "500",
    flex: 1,
  },
  closeButton: {
    padding: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#fff", // White border
    borderRadius: 5, // Slightly rounded corners for the button
    justifyContent: "center",
    alignItems: "center",
  },
  closeText: {
    color: "#fff",
  },
});
