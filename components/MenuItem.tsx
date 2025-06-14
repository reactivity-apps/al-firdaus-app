import React, { ReactNode } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { Link } from "expo-router";

type MenuItemProps = {
  label: string | ReactNode;
  link?: string;
  showIcon?: boolean;
  isLast?: boolean;
};

const MenuItem = ({ label, link, showIcon, isLast }: MenuItemProps) => {
  const itemStyle = isLast ? { ...styles.row, ...styles.lastRow } : styles.row;

  const content = (
    <TouchableOpacity style={itemStyle}>
      {typeof label === 'string' ? (
        <Text style={styles.label}>{label}</Text>
      ) : (
        <View style={styles.labelContainer}>{label}</View>
      )}
      {showIcon && <Ionicons name="chevron-forward-outline" style={styles.icon} />}
    </TouchableOpacity>
  );

  return link ? <Link href={link} asChild>{content}</Link> : content;
};

const styles = StyleSheet.create({
  row: {
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#CDCBCB",
  },
  label: {
    fontSize: 16,
    color: "#333",
  },
  labelContainer: {
    flex: 1,
  },
  icon: {
    fontSize: 16,
    color: "#888",
  },
  lastRow: {
    borderBottomWidth: 0, // Removes border from the last row
  },
});

export default MenuItem;
