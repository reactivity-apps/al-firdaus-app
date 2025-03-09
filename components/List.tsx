import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";

type ListProps = {
  title: string;
  items: ListItemProps[];
};

type ListItemProps = {
  label: string;
  subtext?: string; // Subtext positioned to the right
  link?: string; // Optional link prop
};

const ListItem = ({ label, subtext, isLast }: ListItemProps & { isLast?: boolean }) => {
  const itemStyle = isLast ? { ...styles.row, ...styles.lastRow } : styles.row;

  const content = (
    <View style={itemStyle}>
      <Text style={styles.label}>{label}</Text>
      {subtext && <Text style={styles.subtext}>{subtext}</Text>}
    </View>
  );

  return content;
};

const List = ({ title, items }: ListProps) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.rowContainer}>
        {items.map((item, index) => (
          <ListItem 
            key={index}
            label={item.label} 
            subtext={item.subtext}
            isLast={index === items.length - 1} // Mark last item
          />
        ))}
      </View>
    </View>
  );
};

export default List;

const styles = StyleSheet.create({
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    color: "gray",
    marginBottom: 10,
  },
  rowContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
  },
  row: {
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start", // Align items at the start for better wrap behavior
    borderBottomWidth: 1,
    borderBottomColor: "#CDCBCB",
    flexWrap: "wrap", // Allow the items to wrap
  },
  label: {
    fontSize: 16,
    color: "#333",
    flex: 1, // Allow the label to take up the available space
  },
  subtext: {
    fontSize: 14,
    color: "#888",
    flex: 1, // Allow the subtext to take up the available space and wrap
    textAlign: "right"
  },
  lastRow: {
    borderBottomWidth: 0, // Removes border from the last row
  },
});
