import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";

type MenuItemProps = {
  label: string;
  link?: string;
  showIcon?: boolean;
  isLast?: boolean;
};

const MenuItem = ({ label, link, showIcon, isLast }: MenuItemProps) => {
  const itemStyle = isLast ? { ...styles.row, ...styles.lastRow } : styles.row;

  const content = (
    <TouchableOpacity style={itemStyle}>
      <Text style={styles.label}>{label}</Text>
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
  icon: {
    fontSize: 16,
    color: "#888",
  },
  lastRow: {
    borderBottomWidth: 0, // Removes border from the last row
  },
});

export default MenuItem;
