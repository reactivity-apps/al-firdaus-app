import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

type AlertProps = {
  alert: {
    type: "Success" | "Error";
    message: string;
  };
};

const Alert: React.FC<AlertProps> = ({ alert }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (alert.message) {
      setIsVisible(true);
    }
  }, [alert]);

  if (!isVisible || !alert.message) return null;

  return (
    <View
      style={alert.type === "Success" ? styles.successAlert : styles.errorAlert}
    >
      <Text style={styles.alertText}>{alert.message}</Text>
      <TouchableOpacity onPress={() => setIsVisible(false)} style={styles.closeButton}>
        <Text style={styles.closeText}>Close</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Alert;

const baseAlertStyles = {
  marginBottom: 20,
  borderRadius: 8,
  padding: 15,
  flexDirection: "row" as const,
  alignItems: "center" as const,
  justifyContent: "space-between" as const,
};

const styles = StyleSheet.create({
  successAlert: {
    ...baseAlertStyles,
    backgroundColor: "#69d173",
  },
  errorAlert: {
    ...baseAlertStyles,
    backgroundColor: "#F19797",
  },
  alertText: {
    color: "#fff",
    fontWeight: "500",
    flex: 1,
  },
  closeButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5
  },
  closeText: {
    color: "#fff",
    fontWeight: "bold",
  },
});